/* After-Effects-style effects for the canvas engine. All take the finished frame in `cv` and modify it; call at the END of draw().
   Look menu taken from EffectCraft's effects list (glow, chromatic aberration, radial blur, glitch/displace, light sweep, scanlines, lens flare). */
function fxChroma(amount=3,angle=0){ /* chromatic aberration: split R/G/B by `amount` px (1920 units) */
  const w=cv.width,h=cv.height,src=offscreen(w,h),s=src.getContext('2d');s.drawImage(cv,0,0);const d=amount*S,dx=Math.cos(angle)*d,dy=Math.sin(angle)*d;
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#000';ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation='lighter';
  for(const [ch,sx,sy] of [['#f00',dx,dy],['#0f0',0,0],['#00f',-dx,-dy]]){const k=offscreen(w,h),x=k.getContext('2d');x.drawImage(src,0,0);x.globalCompositeOperation='multiply';x.fillStyle=ch;x.fillRect(0,0,w,h);ctx.drawImage(k,sx,sy)}
  ctx.restore()}
function fxRadialBlur(cx=W/2,cy=H/2,amount=.04,n=8){ /* zoom blur around (cx,cy): n scaled copies averaged */
  const w=cv.width,h=cv.height,src=offscreen(w,h);src.getContext('2d').drawImage(cv,0,0);ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#000';ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation='lighter';
  for(let i=0;i<n;i++){const sc=1+amount*(i/(n-1)-.5)*2;ctx.globalAlpha=1/n;ctx.setTransform(sc,0,0,sc,cx*S*(1-sc),cy*S*(1-sc));ctx.drawImage(src,0,0)}ctx.restore()}
function fxLightSweep(p,angle=-.35,width=260,alpha=.35,color='#fff'){ /* diagonal soft light bar moving across; p 0..1 */
  ctx.save();ctx.setTransform(S,0,0,S,0,0);ctx.globalCompositeOperation='lighter';const span=W+H,x=-span*.2+p*span*1.4;ctx.translate(x,H/2);ctx.rotate(angle);
  const g=ctx.createLinearGradient(-width,0,width,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,color);g.addColorStop(1,'rgba(255,255,255,0)');ctx.globalAlpha=alpha;ctx.fillStyle=g;ctx.fillRect(-width,-H*1.5,width*2,H*3);ctx.restore()}
function fxGlitch(seed,amount=.5,bands=10){ /* horizontal slice displacement, deterministic by seed (use Math.floor(ms/80) for stepped glitches) */
  const R=rng(seed),w=cv.width,h=cv.height,src=offscreen(w,h);src.getContext('2d').drawImage(cv,0,0);ctx.save();ctx.setTransform(1,0,0,1,0,0);
  for(let i=0;i<bands;i++){const y=(R()*h)|0,bh=((.01+R()*.06)*h)|0,dx=((R()-.5)*amount*.2*w)|0;ctx.drawImage(src,0,y,w,bh,dx,y,w,bh)}ctx.restore()}
function fxScanlines(a=.12,gap=4){ctx.save();ctx.setTransform(S,0,0,S,0,0);ctx.fillStyle=`rgba(0,0,0,${a})`;for(let y=0;y<H;y+=gap)ctx.fillRect(0,y,W,gap/2);ctx.restore()}
function fxStreakFlare(x,y,len=700,a=.6,col='#9cf'){ /* anamorphic horizontal streak */
  ctx.save();ctx.setTransform(S,0,0,S,0,0);ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(x-len,0,x+len,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.5,col);g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.globalAlpha=a;ctx.fillStyle=g;ctx.fillRect(x-len,y-2,len*2,4);ctx.globalAlpha=a*.5;ctx.fillRect(x-len*.6,y-9,len*1.2,18);ctx.restore()}
