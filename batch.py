#!/usr/bin/env python3
"""Render the concept library. One unique concept per clip.
  python batch.py                         all concepts, 1080p
  python batch.py --ids 4,5 --res 2160    selected concepts in 4K
  python batch.py --shard 0 --shards 8    every 8th concept (used by the GitHub workflow)
Resumable: finished clips are skipped."""
import argparse,base64,os,subprocess,time
from concurrent.futures import ProcessPoolExecutor,as_completed
HERE=os.path.dirname(os.path.abspath(__file__))
from concepts import CONCEPTS
def render(c,res,out):
    from playwright.sync_api import sync_playwright
    path=os.path.join(out,c['file']);tmp=path+'.part.mp4'
    if os.path.exists(path):return c['id'],'skip'
    t0=time.time()
    ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate','30','-i','-','-vf','scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
      '-c:v','libx264','-preset','slow','-crf','13','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-movflags','+faststart',tmp],stdin=subprocess.PIPE)
    with sync_playwright() as p:
        b=p.chromium.launch(args=['--disable-gpu']);pg=b.new_page(viewport={'width':1920,'height':1080});pg.goto('file://'+os.path.join(HERE,'index.html'))
        pg.evaluate(f"init({c['id']},{2 if res==2160 else 1})")
        for k in range(300):ff.stdin.write(base64.b64decode(pg.evaluate(f'renderAt({k*1000/30})')))
        b.close()
    ff.stdin.close();ff.wait();os.replace(tmp,path)
    subprocess.run(['ffmpeg','-y','-loglevel','error','-ss','5','-i',path,'-frames:v','1','-q:v','2',path[:-4]+'.jpg'])
    return c['id'],f'done {round(time.time()-t0)}s'
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--res',type=int,default=1080,choices=[1080,2160]);ap.add_argument('--ids',default='')
    ap.add_argument('--shard',type=int,default=0);ap.add_argument('--shards',type=int,default=1);ap.add_argument('--workers',type=int,default=1)
    ap.add_argument('--out',default=os.path.join(HERE,'output'));a=ap.parse_args();os.makedirs(a.out,exist_ok=True)
    want={int(x) for x in a.ids.replace(' ','').split(',') if x}
    jobs=[c for i,c in enumerate(CONCEPTS) if i%a.shards==a.shard and (not want or c['id'] in want)]
    print(f'shard {a.shard}/{a.shards}: {len(jobs)} clips at {a.res}p',flush=True)
    with ProcessPoolExecutor(a.workers) as ex:
        for f in as_completed([ex.submit(render,c,a.res,a.out) for c in jobs]):print(*f.result(),flush=True)
