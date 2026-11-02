/* p5.js as a deterministic layer inside the canvas engine (p5 2.x, instance mode, never loops by itself).
   const L = await P5(seed)  ->  L.p is the p5 instance whose canvas is W*S x H*S (draw in 1920x1080 units, the layer pre-scales by S).
   Per frame:  L.frame(p => { p.clear(); p.noStroke(); ... p5 drawing calls ... });  ctx.drawImage(L.cv,0,0,cv.width,cv.height);  (L.blit('lighter') does that)
   Randomness and noise are locked to `seed` at every frame call (p.randomSeed/noiseSeed), so frame N is always identical. */
async function P5(seed=1){
  const host=document.createElement('div');host.style.cssText='position:absolute;left:-99999px;top:0';document.body.appendChild(host);
  let inst;await new Promise(res=>{inst=new p5(p=>{p.setup=async()=>{p.pixelDensity(1);p.createCanvas(W*S,H*S);p.noLoop();res()}},host)});
  const p=inst,L={p,cv:p.canvas||host.querySelector('canvas')};
  L.frame=fn=>{p.randomSeed(seed);p.noiseSeed(seed);p.resetMatrix();p.scale(S);fn(p)};
  L.blit=(mode='source-over',alpha=1)=>{ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation=mode;ctx.globalAlpha=alpha;ctx.drawImage(L.cv,0,0,cv.width,cv.height);ctx.restore()};
  return L}
