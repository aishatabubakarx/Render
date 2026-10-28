#!/usr/bin/env python3
"""Quick look. python preview.py 1,2,3 --times 1,5,9,13 [--scale .5]   -> preview/NN_contact.jpg + timing + loop-seam check
Renders only the requested seconds, so it is fast. Also renders frame 0 and the last frame (449) to measure the loop seam."""
import argparse,base64,io,os,sys,time
from PIL import Image,ImageChops,ImageStat
HERE=os.path.dirname(os.path.abspath(__file__))
def run(ids,times,scale,out,seam=True):
    from playwright.sync_api import sync_playwright
    os.makedirs(out,exist_ok=True)
    with sync_playwright() as p:
        b=p.chromium.launch(args=['--disable-gpu']);
        for i in ids:
            pg=b.new_page(viewport={'width':1920,'height':1080});errs=[]
            pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None)
            pg.goto('file://'+os.path.join(HERE,'index.html'))
            try:pg.evaluate(f'init({i},{scale})')
            except Exception as e:print(i,'INIT ERROR',str(e)[:400]);pg.close();continue
            ims=[];t0=time.time()
            for t in times:
                try:ims.append(Image.open(io.BytesIO(base64.b64decode(pg.evaluate(f'renderAt({t*1000})')))).convert('RGB'))
                except Exception as e:print(i,'RENDER ERROR @',t,str(e)[:400]);break
            dt=(time.time()-t0)/max(1,len(ims))
            if ims:
                w,h=ims[0].size;tw=640;th=int(tw*h/w);cols=2;rows=(len(ims)+1)//2
                sheet=Image.new('RGB',(tw*cols,th*rows))
                for k,im in enumerate(ims):sheet.paste(im.resize((tw,th),Image.LANCZOS),((k%cols)*tw,(k//cols)*th))
                sheet.save(f'{out}/{i:02d}_contact.jpg',quality=85)
            msg=f'{i:02d} {dt:.2f}s/frame'
            if seam and ims:
                a=Image.open(io.BytesIO(base64.b64decode(pg.evaluate('renderAt(0)')))).convert('L');z=Image.open(io.BytesIO(base64.b64decode(pg.evaluate(f'renderAt({449*1000/30})')))).convert('L')
                n=Image.open(io.BytesIO(base64.b64decode(pg.evaluate(f'renderAt({1000/30})')))).convert('L')
                d_wrap=ImageStat.Stat(ImageChops.difference(a,z)).mean[0];d_step=ImageStat.Stat(ImageChops.difference(a,n)).mean[0]
                msg+=f'  seam f449->f0 diff {d_wrap:.2f} vs normal step f0->f1 {d_step:.2f}'
            print(msg+('  ERR: '+' | '.join(errs)[:300] if errs else ''),flush=True);pg.close()
        b.close()
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('ids');ap.add_argument('--times',default='1,4,8,12');ap.add_argument('--scale',type=float,default=.5);ap.add_argument('--out',default=os.path.join(HERE,'preview'));ap.add_argument('--noseam',action='store_true')
    a=ap.parse_args();run([int(x) for x in a.ids.split(',')],[float(x) for x in a.times.split(',')],a.scale,a.out,not a.noseam)
