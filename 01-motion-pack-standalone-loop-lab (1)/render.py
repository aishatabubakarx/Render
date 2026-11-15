#!/usr/bin/env python3
"""Render the clips in catalog.json exactly as they play in the preview page.

Every clip is the original animation code, run in headless Chromium on a virtual clock (so every render is identical),
one frame every 1/fps second, piped to ffmpeg.

  python render.py                      all clips in this pack, 1080p ProRes MOV
  python render.py --res 2160           4K (clips are re-laid out at 4K; gallery clips are scaled up from their 1280x720 viewer)
  python render.py --ids 7,51 --seconds 2    quick test of two clips, 2 s each
  python render.py --csv clips.csv      write the clip list

Transparent clips (catalog mode alpha/luma) are always written as ProRes 4444 .mov with a real alpha channel.
"""
import argparse, csv, datetime, io, json, os, subprocess, sys, time, pathlib

HERE = pathlib.Path(__file__).resolve().parent
CAT = json.load(open(HERE / 'catalog.json', encoding='utf-8'))

# Same background-removal patch used in the preview: a full-canvas black fill becomes "erase", so the page really is transparent.
PATCH_JS = r"""(function(){const P=CanvasRenderingContext2D.prototype,fr=P.fillRect;
function dk(s){if(typeof s!=='string')return -1;s=s.replace(/\s/g,'').toLowerCase();let m;if(/^(#000|#000000|black)$/.test(s))return 1;
if(m=s.match(/^rgba?\((\d+),(\d+),(\d+)(?:,([\d.]+))?\)$/)){if(+m[1]<=14&&+m[2]<=18&&+m[3]<=24)return m[4]===undefined?1:+m[4]}return -1}
P.fillRect=function(a,b,w,h){const c=this.canvas,k=this.getTransform().a||1;
if(w*k>=c.width*.95&&h*k>=c.height*.95){const d=dk(this.fillStyle);if(d>=0){this.save();this.setTransform(1,0,0,1,0,0);this.globalCompositeOperation='destination-out';this.fillStyle='#000';this.globalAlpha=d;fr.call(this,0,0,c.width,c.height);this.restore();return}}
return fr.apply(this,arguments)}})();
const gc=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,o){if(/webgl/.test(t))o=Object.assign({},o,{preserveDrawingBuffer:true});return gc.call(this,t,o)};"""

# Glow/shadow sizes are not scaled by canvas transforms, so scale them with the drawing when a clip is drawn at 4K.
SHADOW_JS = r"""(()=>{const P=CanvasRenderingContext2D.prototype;for(const n of ['shadowBlur','shadowOffsetX','shadowOffsetY']){const d=Object.getOwnPropertyDescriptor(P,n);Object.defineProperty(P,n,{get(){return d.get.call(this)/(this.__k||1)},set(v){d.set.call(this,v*(this.__k||1))}})}})();"""

ISOLATE_JS = r"""([bg])=>{
 const area=e=>{const r=e.getBoundingClientRect();return r.width*r.height};
 let el=document.querySelector('#stage');
 if(!el){const cs=[...document.querySelectorAll('canvas')].filter(c=>area(c)>40000);
  if(cs.length===1)el=cs[0];
  else if(cs.length>1){let a=cs[0];while(a&&!cs.every(c=>a.contains(c)))a=a.parentElement;el=a||cs[0]}
  else{const sv=[...document.querySelectorAll('svg')].sort((x,y)=>area(y)-area(x))[0];el=sv||document.body}}
 const s=document.createElement('style');
 s.textContent=`html,body{margin:0!important;padding:0!important;background:${bg}!important;overflow:hidden!important}:root{color-scheme:normal!important}
 ${bg==='transparent'?'canvas{background:transparent!important}':''}
 body *{visibility:hidden!important}
 .__t,.__t *{visibility:visible!important}
 .__t{position:fixed!important;inset:0!important;left:0!important;top:0!important;width:100vw!important;height:100vh!important;max-width:none!important;max-height:none!important;min-width:0!important;min-height:0!important;aspect-ratio:auto!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;transform:none!important;z-index:2147483647!important}
 .__t canvas,.__t svg{width:100%!important;height:100%!important}`;
 document.head.appendChild(s);el.classList.add('__t');
 window.dispatchEvent(new Event('resize'));
 return !!document.querySelector('#sc');}"""

def log(*a): print(*a, flush=True)

def build_ffmpeg(c, a, w, h, src_w, src_h, out_tmp, alpha):
    fps = a.fps
    vf = []
    if (src_w, src_h) != (w, h):
        vf.append(f'format=rgba,premultiply=inplace=1,scale={w}:{h}:flags=lanczos,unpremultiply=inplace=1' if alpha else f'scale={w}:{h}:flags=lanczos')
    meta = ['-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709']
    cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgba' if alpha else 'rgb24', '-s', f'{src_w}x{src_h}', '-framerate', str(fps), '-i', '-']
    if alpha:
        vf.append('format=yuva444p10le')
        cmd += ['-vf', ','.join(vf), '-c:v', 'prores_ks', '-profile:v', '4444', '-alpha_bits', '8', '-bits_per_mb', '700' if h <= 1080 else '400', '-pix_fmt', 'yuva444p10le', '-vendor', 'apl0'] + meta
    elif a.fmt == 'mp4':
        vf.append('scale=out_color_matrix=bt709:out_range=tv,format=yuv420p')
        cmd += ['-vf', ','.join(vf), '-c:v', 'libx264', '-preset', 'slow', '-crf', '13', '-movflags', '+faststart'] + meta
    else:
        vf.append('scale=out_color_matrix=bt709:out_range=tv,format=yuv422p10le')
        cmd += ['-vf', ','.join(vf), '-c:v', 'prores_ks', '-profile:v', '3', '-vendor', 'apl0'] + meta
    return cmd + [out_tmp]

def luma_key(arr):
    """Black background -> real alpha: alpha = brightest channel, colour = un-multiplied (same as the preview)."""
    import numpy as np
    rgb = arr[..., :3].astype(np.float32)
    mx = rgb.max(axis=2)
    out = np.zeros(arr.shape[:2] + (4,), np.uint8)
    nz = mx > 0
    k = np.where(nz, 255.0 / np.maximum(mx, 1), 0)[..., None]
    out[..., :3] = np.minimum(rgb * k, 255).astype(np.uint8)
    out[..., 3] = mx.astype(np.uint8)
    return out

def png_to_arr(png):
    import numpy as np
    from PIL import Image
    return np.array(Image.open(io.BytesIO(png)).convert('RGBA'))

def render_clip(pw, c, a):
    import numpy as np
    from PIL import Image
    mode = c['mode']
    alpha = mode in ('alpha', 'luma')
    ext = 'mov' if (alpha or a.fmt == 'mov') else 'mp4'
    stem = f"{c['id']:03d}_{c['slug']}"
    final = pathlib.Path(a.out) / f'{stem}.{ext}'
    if final.exists():
        return 'skip'
    dur = a.seconds if a.seconds else (float(c['dur']) if a.dur == 'auto' else float(a.dur))
    n = round(dur * a.fps)
    step = 1000.0 / a.fps
    H = 1080 if a.res == 1080 else 2160
    W = H * 16 // 9
    t0 = time.time()
    b = pw.chromium.launch(args=['--force-color-profile=srgb', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required', '--disable-lcd-text', '--font-render-hinting=none'])
    START = datetime.datetime(2026, 1, 1, 10, 8, 30)
    acc = [0.0]
    thumb = None
    try:
        if c['kind'] == 'gallery':
            vw, vh = 1400, 900
        else:
            vw, vh = W, H
        def tick(ms):
            acc[0] += ms
            whole = int(acc[0]); acc[0] -= whole
            if whole > 0:
                pg.clock.run_for(whole)
        pg = b.new_context(viewport={'width': vw, 'height': vh}, device_scale_factor=1).new_page()
        pg.clock.install(time=START)
        pg.clock.pause_at(START + datetime.timedelta(milliseconds=10))
        if c['kind'] == 'page' and mode == 'alpha' and c.get('patch', True):
            pg.add_init_script(PATCH_JS)
        elif c['kind'] == 'page':
            pg.add_init_script("const gc=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(t,o){if(/webgl/.test(t))o=Object.assign({},o,{preserveDrawingBuffer:true});return gc.call(this,t,o)};")
        if c['kind'] == 'gallery':
            pg.add_init_script(f'window.__OW={W};')
        if c['kind'] == 'gallery' and not c.get('no4k'):
            pg.add_init_script(SHADOW_JS)
        pg.goto((HERE / 'anims' / c['file']).as_uri())
        pg.clock.run_for(300)
        if c['kind'] == 'page':
            scrub = pg.evaluate(ISOLATE_JS, ['transparent' if mode == 'alpha' else '#000'])
            pg.clock.run_for(100)
            src_w, src_h = W, H
            if not scrub:
                for label in ('Restart', 'restart'):
                    btn = pg.get_by_role('button', name=label)
                    if btn.count():
                        btn.first.click(); break
            def grab(k):
                if scrub:
                    pg.evaluate("t=>{const s=document.querySelector('#sc');s.value=t;s.dispatchEvent(new Event('input',{bubbles:true}))}", k / a.fps)
                    pg.clock.run_for(20)
                else:
                    tick(step if k else 20)
                return png_to_arr(pg.screenshot(type='png', omit_background=(mode == 'alpha')))
        else:
            card = pg.locator(c['sel']).nth(c['idx'])
            card.scroll_into_view_if_needed()
            (card.locator('canvas').first if c['sel'] == '.cd' else card).click()
            pg.clock.run_for(100)
            viewer = pg.evaluate("""()=>{const cs=[...document.querySelectorAll('canvas')].filter(c=>{const r=c.getBoundingClientRect();return r.width>600});
              cs.forEach((c,i)=>c.dataset.vw='v'+i);return cs.length?[cs[cs.length-1].width,cs[cs.length-1].height,cs[cs.length-1].dataset.vw]:null}""")
            if not viewer:
                raise RuntimeError('viewer canvas not found')
            src_w, src_h, tag = viewer
            if not c.get('no4k'):
                # draw the clip at the output size (true resolution), not at the preview size and stretched
                pg.evaluate("([tag,tw])=>{const m=document.querySelector('canvas[data-vw=\"'+tag+'\"]');const k=tw/m.width;m.width=tw;m.height=Math.round(m.height*k);const x=m.getContext('2d');x.__k=k;x.setTransform(k,0,0,k,0,0)}", [tag, W])
                pg.clock.run_for(250)
            pg.evaluate("sel=>{const v=document.querySelector('canvas[data-vw]:last-of-type')||null;document.querySelectorAll(sel).forEach(e=>{if(!e.querySelector('canvas[data-vw]'))e.style.display='none'})}", c['sel'])
            pg.clock.run_for(100)
            loop_ms = float(c['dur']) * 1000
            now = pg.evaluate('performance.now()')
            adv = (-now) % loop_ms
            if adv > 1:
                tick(adv)
            def grab(k):
                if k:
                    tick(step)
                data = pg.evaluate(f"document.querySelector('canvas[data-vw=\"{tag}\"]').toDataURL('image/png')")
                import base64
                return png_to_arr(base64.b64decode(data.split(',', 1)[1]))
        os.makedirs(a.out, exist_ok=True)
        tmp = str(final) + '.part.' + ext
        first = grab(0)
        sh, sw = first.shape[:2]
        if c['kind'] == 'page':
            src_w, src_h = sw, sh
        cmd = build_ffmpeg(c, a, W, H, sw, sh, tmp, alpha)
        ff = subprocess.Popen(cmd, stdin=subprocess.PIPE)
        for k in range(n):
            arr = first if k == 0 else grab(k)
            if mode == 'luma':
                arr = luma_key(arr)
            if k == int(n * 0.4):
                thumb = arr
            ff.stdin.write(arr.tobytes() if alpha else arr[..., :3].tobytes())
        ff.stdin.close(); ff.wait()
        if ff.returncode:
            raise RuntimeError('ffmpeg failed')
        os.replace(tmp, final)
        if thumb is not None:
            im = Image.fromarray(thumb)
            if alpha:
                bg = Image.new('RGBA', im.size, (60, 60, 60, 255)); bg.alpha_composite(im); im = bg
            im.convert('RGB').resize((1280, 720)).save(pathlib.Path(a.out) / f'{stem}.jpg', quality=88)
    finally:
        b.close()
    return f'done {n} frames in {round(time.time() - t0)}s -> {final.name} ({round(final.stat().st_size / 1e6)} MB)'

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--res', type=int, default=2160, choices=[1080, 2160])
    ap.add_argument('--fmt', default='mov', choices=['mov', 'mp4'])
    ap.add_argument('--fps', type=int, default=30, choices=[24, 30])
    ap.add_argument('--dur', default='auto', help="'auto' = each clip's own loop length")
    ap.add_argument('--seconds', type=float, default=0, help='test: render only this many seconds')
    ap.add_argument('--ids', default='')
    ap.add_argument('--shard', type=int, default=0)
    ap.add_argument('--shards', type=int, default=1)
    ap.add_argument('--out', default=str(HERE / 'output'))
    ap.add_argument('--csv', default='')
    a = ap.parse_args()
    if a.csv:
        os.makedirs(os.path.dirname(os.path.abspath(a.csv)), exist_ok=True)
        with open(a.csv, 'w', newline='', encoding='utf-8') as f:
            w = csv.writer(f); w.writerow(['number', 'file', 'title', 'category', 'loop_seconds', 'transparent'])
            for c in CAT['clips']:
                alpha = c['mode'] in ('alpha', 'luma')
                w.writerow([c['id'], f"{c['id']:03d}_{c['slug']}.{'mov' if alpha or a.fmt == 'mov' else 'mp4'}", c['title'], c.get('cat', ''), c['dur'], 'yes (ProRes 4444 alpha)' if alpha else 'no'])
        return
    want = {int(x) for x in a.ids.replace(' ', '').split(',') if x}
    jobs = [c for i, c in enumerate(CAT['clips']) if i % a.shards == a.shard and (not want or c['id'] in want)]
    log(f"pack {CAT['name']}: shard {a.shard}/{a.shards}: {len(jobs)} clips, {a.res}p {a.fmt}")
    from playwright.sync_api import sync_playwright
    with sync_playwright() as pw:
        for c in jobs:
            try:
                log(c['id'], c['title'], render_clip(pw, c, a))
            except Exception as e:
                log(c['id'], c['title'], 'FAILED', repr(e)[:300])

if __name__ == '__main__':
    main()
