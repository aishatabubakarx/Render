const PVB={},PVC={};
/* Adapter: runs an approved preview animation (authored on an 800x450 canvas, 640x360 for the first set) inside the render engine.
   Every frame is a pure function of time: u = fract(now/DUR*cycles). cycles = whole loops of the preview over the clip length. */
const PV=(b,title,o)=>async()=>{
  newTL();
  const clips=PVC[b]||(PVC[b]=PVB[b]());
  const k=clips.find(x=>x.t===title);
  if(!k)throw new Error('clip not found: '+title);
  const sc=b===1?3:2.4,cyc=o.cycles||1;
  draw=()=>{clear();const u=fr(now()/DUR*cyc);
    ctx.save();ctx.scale(sc,sc);
    if(b===1)k.f(ctx,u*6,640,360);else k.f(ctx,u,800,450);
    ctx.restore();
    if(!ALPHA)grain(.02)};
};
