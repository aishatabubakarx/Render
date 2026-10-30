#!/usr/bin/env python3
"""Join frame-parts, make thumbnails, make Adobe-ready 4K derivatives for 6K/8K masters, write the CSVs.
  python finalize.py output
Adobe Stock accepts clips up to 4096 px wide and asks you not to upload above that, so for 6K/8K masters this writes
output/adobe_upload_4k/NAME.mp4 (H.264, Lanczos downscale to 3840x2160). Upload those to Adobe; keep the masters."""
import glob, os, subprocess, sys
from concepts import CONCEPTS

def run(*a): subprocess.run(a, check=True)

def probe_wh(path):
    r = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', path],
                       capture_output=True, text=True)
    w, h = (r.stdout.strip().split(',') + ['0', '0'])[:2]
    return int(w), int(h)

d = sys.argv[1] if len(sys.argv) > 1 else 'output'
for c in CONCEPTS:
    stem = c['file'].rsplit('.', 1)[0]
    final = next(iter(glob.glob(os.path.join(d, stem + '.mp4')) + glob.glob(os.path.join(d, stem + '.mov'))), None)
    if not final:
        parts = sorted(glob.glob(os.path.join(d, 'parts', stem + '.p*.*')), key=lambda p: int(p.rsplit('.p', 1)[1].split('.')[0]))
        parts = [p for p in parts if '.part.' not in p]
        if not parts:
            continue
        ext = parts[0].rsplit('.', 1)[1]
        lst = os.path.join(d, 'parts', stem + '.txt')
        open(lst, 'w').write(''.join(f"file '{os.path.abspath(p)}'\n" for p in parts))
        final = os.path.join(d, f'{stem}.{ext}')
        run('ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', final)
    jpg = os.path.join(d, stem + '.jpg')
    if not os.path.exists(jpg):
        run('ffmpeg', '-y', '-loglevel', 'error', '-ss', '7', '-i', final, '-frames:v', '1', '-vf', 'scale=1920:-2', '-q:v', '2', jpg)
    fw, fh = probe_wh(final)
    if max(fw, fh) > 4096:   # 6K / 8K master: make a 4K copy (vertical clips stay vertical)
        os.makedirs(os.path.join(d, 'adobe_upload_4k'), exist_ok=True)
        size = '2160:3840' if fh > fw else '3840:2160'
        if c.get('bg') == 'alpha':   # keep the alpha channel: ProRes 4444 .mov
            out4 = os.path.join(d, 'adobe_upload_4k', stem + '.mov')
            enc = ['-vf', 'scale=' + size + ':flags=lanczos,format=yuva444p10le', '-c:v', 'prores_ks', '-profile:v', '4444', '-alpha_bits', '16']
        else:
            out4 = os.path.join(d, 'adobe_upload_4k', stem + '.mp4')
            enc = ['-vf', 'scale=' + size + ':flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '13',
                   '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-movflags', '+faststart']
        if not os.path.exists(out4):
            run('ffmpeg', '-y', '-loglevel', 'error', '-i', final, *enc, out4)
    print('ok', os.path.basename(final), round(os.path.getsize(final) / 1e6), 'MB')
subprocess.run([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'adobe_csv.py'), d], check=True)
