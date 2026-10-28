#!/usr/bin/env python3
"""Upload finished videos from a folder to Adobe Stock over SFTP.
It only looks at files in the folder, so it works with any project that writes its results there.

  python adobe_push.py output             one pass over the folder
  python adobe_push.py output --watch     keep scanning and upload files as they appear
  python adobe_push.py output --dry-run   show what would upload

Needs the environment variables ADOBE_SFTP_HOST, ADOBE_SFTP_USER, ADOBE_SFTP_PASS.
Every upload leaves a record in .adobe_uploaded/<filename>.done. Clips uploaded by hand can be listed
in .adobe_uploaded/seed.txt, one filename per line, and they will be skipped."""
import argparse, os, sys, time
from pathlib import Path

VIDEO = {'.mp4', '.mov', '.m4v', '.mpg', '.mpeg', '.avi'}
REC = Path('.adobe_uploaded')


def done_names():
    names = {p.name[:-5] for p in REC.glob('*.done')} if REC.exists() else set()
    seed = REC / 'seed.txt'
    if seed.exists():
        names |= {l.strip() for l in seed.read_text().splitlines() if l.strip()}
    return names


def pending(folder, settle):
    files = [p for p in sorted(folder.iterdir()) if p.is_file()]
    done, out = done_names(), []
    for p in files:
        ext = p.suffix.lower()
        if '.part' in p.name.lower() or p.name in done or p.stat().st_size == 0:
            continue
        if time.time() - p.stat().st_mtime < settle:
            continue
        if ext in VIDEO:
            out.append(p)
    return out


def connect():
    import paramiko
    host = os.environ['ADOBE_SFTP_HOST'].replace('sftp://', '').strip('/ ')
    t = paramiko.Transport((host, 22))
    t.connect(username=os.environ['ADOBE_SFTP_USER'], password=os.environ['ADOBE_SFTP_PASS'])
    return t, paramiko.SFTPClient.from_transport(t)


def run_once(folder, dry, settle):
    todo = pending(folder, settle)
    if not todo:
        print('nothing new to upload', flush=True)
        return 0
    if dry:
        for p in todo:
            print('would upload', p.name)
        return 0
    REC.mkdir(exist_ok=True)
    fails = 0
    t, sftp = connect()
    try:
        for p in todo:
            for attempt in range(3):
                try:
                    sftp.put(str(p), p.name)
                    (REC / f'{p.name}.done').write_text(f'{p.stat().st_size} bytes, {time.strftime("%Y-%m-%d %H:%M:%S")}\n')
                    print('uploaded', p.name, flush=True)
                    break
                except Exception as e:
                    print(f'retry {attempt + 1} for {p.name}: {e}', flush=True)
                    time.sleep(5)
            else:
                fails += 1
    finally:
        sftp.close()
        t.close()
    return fails


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('folder', nargs='?', default='output')
    ap.add_argument('--watch', action='store_true')
    ap.add_argument('--dry-run', action='store_true')
    a = ap.parse_args()
    folder = Path(a.folder)
    folder.mkdir(exist_ok=True)
    if a.watch:
        while True:
            run_once(folder, a.dry_run, settle=10)
            time.sleep(15)
    sys.exit(1 if run_once(folder, a.dry_run, settle=0) else 0)
