#!/usr/bin/env python3
"""Upload finished videos to Adobe Stock (SFTP), Shutterstock (FTPS) and Pond5 (FTPS, falls back to FTP),
and collect CSV metadata files into the repo root.

  python stock_push.py output                        one pass, all configured targets
  python stock_push.py output --target pond5         only one target
  python stock_push.py output --watch                keep scanning
  python stock_push.py output --dry-run              show what would upload
  python stock_push.py --collect-csv tmp output --csv-dest . --label 12345
                                                     find every .csv under those folders and copy it,
                                                     labelled, into the destination folder

Environment variables (a target is skipped if its USER/PASS are not set):
  ADOBE_SFTP_HOST, ADOBE_SFTP_USER, ADOBE_SFTP_PASS
  SHUTTERSTOCK_USER, SHUTTERSTOCK_PASS, SHUTTERSTOCK_HOST (optional, default ftps.shutterstock.com)
  POND5_USER, POND5_PASS, POND5_HOST (optional, default ftp.pond5.com)

Each target keeps its own records, so a clip can succeed on one site and retry on the other:
  .adobe_uploaded/<file>.done  .shutterstock_uploaded/<file>.done  .pond5_uploaded/<file>.done
Clips uploaded by hand can be listed in <record folder>/seed.txt, one filename per line."""
import argparse, csv, os, shutil, sys, time, ftplib
from pathlib import Path

VIDEO = {'.mp4', '.mov', '.m4v', '.mpg', '.mpeg', '.avi'}
SHUTTERSTOCK_VIDEO = {'.mp4', '.mov'}  # Shutterstock accepts .mov / .mp4
POND5_VIDEO = {'.mp4', '.mov', '.m4v', '.mpg', '.mpeg', '.avi'}


def env(name):
    """Read an environment variable and remove stray spaces / line breaks (a common paste problem)."""
    return (os.environ.get(name) or '').strip()


def done_names(rec):
    names = {p.name[:-5] for p in rec.glob('*.done')} if rec.exists() else set()
    seed = rec / 'seed.txt'
    if seed.exists():
        names |= {l.strip() for l in seed.read_text().splitlines() if l.strip()}
    return names


def pending(folder, rec, settle, exts):
    done, out = done_names(rec), []
    for p in sorted(folder.iterdir()):
        if not p.is_file():
            continue
        if '.part' in p.name.lower() or p.name in done or p.stat().st_size == 0:
            continue
        if time.time() - p.stat().st_mtime < settle:
            continue
        if p.suffix.lower() in exts:
            out.append(p)
    return out


# ---------- CSV collection ----------
def collect_csvs(sources, dest, label):
    """Copy every .csv found under the source folders into dest, named <original>_<date>_run<label>.csv.
    Nothing already in dest is overwritten. Returns the list of files written."""
    dest = Path(dest)
    dest.mkdir(parents=True, exist_ok=True)
    stamp = time.strftime('%Y-%m-%d')
    written, seen = [], set()
    for src in sources:
        src = Path(src)
        if not src.exists():
            continue
        for f in sorted(src.rglob('*')):
            if not f.is_file() or f.suffix.lower() != '.csv' or f.stat().st_size == 0:
                continue
            if f.resolve() in seen:
                continue
            seen.add(f.resolve())
            stem = f.stem
            tag = f'_{stamp}' + (f'_run{label}' if label else '')
            name = f'{stem}{tag}.csv'
            n = 1
            while (dest / name).exists():  # same name twice: number it, never overwrite
                n += 1
                name = f'{stem}{tag}_{n}.csv'
            raw = f.read_bytes()
            try:
                text = raw.decode('utf-8-sig')
            except UnicodeDecodeError:
                text = raw.decode('latin-1')
            rows = list(csv.reader(text.splitlines()))
            if not rows:
                continue
            (dest / name).write_text(text if text.endswith('\n') else text + '\n', encoding='utf-8')
            print(f'[csv] {f} -> {dest / name}  ({len(rows) - 1} data rows, {len(rows[0])} columns)', flush=True)
            written.append(dest / name)
    if not written:
        print('[csv] no CSV files found', flush=True)
    summary = env('GITHUB_STEP_SUMMARY')
    if written and summary:
        repo, branch = env('REPO'), env('BRANCH') or 'main'
        with open(summary, 'a', encoding='utf-8') as s:
            s.write('### CSV files saved to the repo root\n\n')
            for w in written:
                link = f'https://raw.githubusercontent.com/{repo}/{branch}/{w.name}' if repo else w.name
                s.write(f'- `{w.name}`: [download]({link})\n')
    return written


# ---------- Adobe Stock: SFTP ----------
def adobe_creds():
    host, user, pw = env('ADOBE_SFTP_HOST'), env('ADOBE_SFTP_USER'), env('ADOBE_SFTP_PASS')
    if not (host and user and pw):
        return None
    return host.replace('sftp://', '').strip('/ '), user, pw


def adobe_session(c):
    import paramiko
    host, user, pw = c
    t = paramiko.Transport((host, 22))
    t.connect(username=user, password=pw)
    sftp = paramiko.SFTPClient.from_transport(t)
    def put(path):
        sftp.put(str(path), path.name)
    def close():
        sftp.close(); t.close()
    return put, close


# ---------- FTP helpers (Shutterstock, Pond5) ----------
def ftp_put_close(ftp):
    def put(path):
        with open(path, 'rb') as f:
            ftp.storbinary(f'STOR {path.name}', f)
    def close():
        try:
            ftp.quit()
        except Exception:
            ftp.close()
    return put, close


# ---------- Shutterstock: FTPS (explicit TLS, port 21) ----------
def shutter_creds():
    user, pw = env('SHUTTERSTOCK_USER'), env('SHUTTERSTOCK_PASS')
    if not (user and pw):
        return None
    return env('SHUTTERSTOCK_HOST') or 'ftps.shutterstock.com', user, pw


def shutter_session(c):
    host, user, pw = c
    ftp = ftplib.FTP_TLS(host, timeout=120)
    ftp.login(user, pw)
    ftp.prot_p()  # encrypt the data channel too
    return ftp_put_close(ftp)


# ---------- Pond5: FTPS first, plain FTP only if the server refuses TLS ----------
def pond5_creds():
    user, pw = env('POND5_USER'), env('POND5_PASS')
    if not (user and pw):
        return None
    host = (env('POND5_HOST') or 'ftp.pond5.com').replace('ftp://', '').replace('ftps://', '').strip('/ ')
    return host, user, pw


def pond5_session(c):
    host, user, pw = c
    try:
        ftp = ftplib.FTP_TLS(host, timeout=120)
        ftp.login(user, pw)
        ftp.prot_p()
        return ftp_put_close(ftp)
    except ftplib.error_perm:
        raise  # wrong login: do not retry in the clear
    except Exception as e:
        print(f'[pond5] TLS not available ({e}); using plain FTP', flush=True)
        ftp = ftplib.FTP(host, timeout=120)
        ftp.login(user, pw)
        return ftp_put_close(ftp)


TARGETS = {
    'adobe': dict(rec=Path('.adobe_uploaded'), exts=VIDEO, creds=adobe_creds, session=adobe_session),
    'shutterstock': dict(rec=Path('.shutterstock_uploaded'), exts=SHUTTERSTOCK_VIDEO,
                         creds=shutter_creds, session=shutter_session),
    'pond5': dict(rec=Path('.pond5_uploaded'), exts=POND5_VIDEO, creds=pond5_creds, session=pond5_session),
}


def run_target(name, folder, dry, settle):
    cfg = TARGETS[name]
    c = cfg['creds']()
    if not c:
        print(f'[{name}] credentials not set, skipping', flush=True)
        return 0
    rec = cfg['rec']
    todo = pending(folder, rec, settle, cfg['exts'])
    if not todo:
        print(f'[{name}] nothing new to upload', flush=True)
        return 0
    if dry:
        for p in todo:
            print(f'[{name}] would upload', p.name)
        return 0
    rec.mkdir(exist_ok=True)

    sess = [None]  # holds (put, close) for the current connection

    def connect():
        if sess[0]:
            try:
                sess[0][1]()
            except Exception:
                pass
            sess[0] = None
        sess[0] = cfg['session'](c)

    try:
        connect()
    except Exception as e:
        print(f'[{name}] connection failed: {e}', flush=True)
        return len(todo)

    fails = 0
    try:
        for p in todo:
            for attempt in range(3):
                try:
                    if sess[0] is None:
                        connect()
                    sess[0][0](p)
                    (rec / f'{p.name}.done').write_text(
                        f'{p.stat().st_size} bytes, {time.strftime("%Y-%m-%d %H:%M:%S")}\n')
                    print(f'[{name}] uploaded', p.name, flush=True)
                    break
                except Exception as e:
                    print(f'[{name}] retry {attempt + 1} for {p.name}: {e}', flush=True)
                    time.sleep(5)
                    try:
                        connect()  # fresh connection, the old one may be dead
                    except Exception as e2:
                        print(f'[{name}] reconnect failed: {e2}', flush=True)
                        sess[0] = None
            else:
                fails += 1
    finally:
        if sess[0]:
            try:
                sess[0][1]()
            except Exception:
                pass
    return fails


def run_once(folder, targets, dry, settle):
    # each target runs independently, so one failing never blocks the others
    return sum(run_target(n, folder, dry, settle) for n in targets)


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('folder', nargs='?', default='output')
    ap.add_argument('--target', choices=['all', *TARGETS], default='all')
    ap.add_argument('--watch', action='store_true')
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--collect-csv', nargs='+', metavar='FOLDER',
                    help='copy every .csv found under these folders into --csv-dest, labelled')
    ap.add_argument('--csv-dest', default='.')
    ap.add_argument('--label', default='', help='run id added to CSV names')
    a = ap.parse_args()
    if a.collect_csv:
        collect_csvs(a.collect_csv, a.csv_dest, a.label)
        sys.exit(0)
    folder = Path(a.folder)
    folder.mkdir(exist_ok=True)
    targets = list(TARGETS) if a.target == 'all' else [a.target]
    if a.watch:
        while True:
            run_once(folder, targets, a.dry_run, settle=10)
            time.sleep(15)
    sys.exit(1 if run_once(folder, targets, a.dry_run, settle=0) else 0)
