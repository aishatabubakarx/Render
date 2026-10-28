/* 20 PLASMA STORM: branching lightning bolts striking through dark storm cloud, electric blue-white glow, sky flashes */
C[20]=()=>{newTL();const R=rng(2020),E={g:0};
  tl.to(E,{g:1,duration:3.75,ease:'sine.inOut',yoyo:true,repeat:3},0);
  const DURS=DUR/1000;
  /* bolt generator: midpoint displacement with side branches, fully deterministic */
  function bolt(seed,x0,y0,x1,y1,depth){const r=rng(seed),segs=[];
    (function sub(ax,ay,bx,by,off,lvl,wd){if(lvl===0||Math.hypot(bx-ax,by-ay)<14){segs.push([ax,ay,bx,by,wd]);return}
      const mx=(ax+bx)/2+(r()-.5)*off,my=(ay+by)/2+(r()-.5)*off*.55;sub(ax,ay,mx,my,off*.52,lvl-1,wd);sub(mx,my,bx,by,off*.52,lvl-1,wd);
      if(wd>.5&&r()<.2&&lvl>2){const a=Math.atan2(by-ay,bx-ax)+(r()-.5)*1.5,L=(60+r()*220)*(wd>.9?1:.6);sub(mx,my,mx+Math.cos(a)*L,my+Math.sin(a)*L+L*.2,L*.5,lvl-2,wd*.55)}})(x0,y0,x1,y1,Math.hypot(x1-x0,y1-y0)*.38,depth,1);return segs}
  const STR=[];const N=9;
  for(let i=0;i<N;i++){const t0=(i+.15+R()*.55)*DURS/N,x0=W*(.12+R()*.76),x1=x0+(R()-.5)*420;STR.push({t0,segs:bolt(100+i*17,x0,-20,x1,H*(.62+R()*.3),7),x:x0,flick:R()*10,echo:R()<.5})}
  const cloud=mkField(256,144);
  const lay=mkLayer(),lay2=mkLayer(W,H,.5);
  draw=()=>{const u=ph(),t=secs(),d=cloud.d;
    /* brightest current flash drives sky illumination */
    let fl=0,fx=W/2;const env=[];for(const s of STR){const dt=mod(t-s.t0,DURS);let e=0;
      if(dt<.9){e=Math.exp(-dt*7)*(.6+.4*Math.abs(Math.sin(dt*38+s.flick)));if(s.echo&&dt>.16&&dt<.5)e+=.7*Math.exp(-(dt-.16)*18)*Math.abs(Math.sin(dt*55))}
      env.push(e);if(e>fl){fl=e;fx=s.x}}
    fl=Math.min(1.2,fl);
    for(let j=0;j<144;j++)for(let i=0;i<256;i++){const x=i/256*1.78,y=j/144,n=lfbm(x*1.5+.2*Math.sin(TAU*u),y*2.2,u,3,5)*.5+.5,m=lfbm(x*3.2+4,y*4.4,u,3,3)*.5+.5,
      c=Math.pow(clamp(n*.9+m*.25-.35,0,1),1.4),near=Math.exp(-Math.pow((i/256*W-fx)/760,2)),top=1-y*.55,
      base=7+c*16,lit=fl*c*near*top*230,o=(j*256+i)*4;
      d[o]=base*.55+lit*.55;d[o+1]=base*.7+lit*.72;d[o+2]=base+lit;d[o+3]=255}
    clear('#00030a');blitField(cloud,1);
    /* ambient violet plasma glow low in frame */
    ctx.globalCompositeOperation='lighter';const gg=ctx.createLinearGradient(0,H*.6,0,H);gg.addColorStop(0,'rgba(40,20,120,0)');gg.addColorStop(1,`rgba(70,40,190,${.1+.07*E.g+fl*.1})`);ctx.fillStyle=gg;ctx.fillRect(0,H*.6,W,H*.4);
    /* bolts: draw once crisp, once wide for glow */
    lay.clear();lay2.clear();let any=false;
    STR.forEach((s,k)=>{const e=env[k];if(e<.015)return;any=true;
      for(const [ax,ay,bx,by,wd] of s.segs){const jig=(Math.sin((ax+ay)*.07+t*70)*1.6)*(wd);
        for(const L of [lay2,lay]){const x=L.x;x.globalCompositeOperation='lighter';x.lineCap='round';
          if(L===lay2){x.strokeStyle=`rgba(90,140,255,${.55*e*wd})`;x.lineWidth=(16+wd*20);}else{x.strokeStyle=`rgba(235,245,255,${Math.min(1,e*1.1)*(.35+.65*wd)})`;x.lineWidth=.8+wd*3.4*Math.min(1,e+.3)}
          x.beginPath();x.moveTo(ax+jig,ay);x.lineTo(bx+jig,by);x.stroke()}}
      /* ground-hit bloom at the bolt's end */
      const last=s.segs[s.segs.length-1];ctx.globalAlpha=Math.min(1,e*.9);ctx.drawImage(spr([120,160,255],128),last[2]-260,last[3]-260,520,520)});
    ctx.globalAlpha=1;
    if(any){put(lay2,0,0,1,'lighter',26);put(lay2,0,0,1,'lighter',8);put(lay,0,0,1,'lighter');put(lay,0,0,.8,'lighter',2.5)}
    /* faint always-on St. Elmo corona drifting along the top so no frame is dead */
    ctx.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const x=W*(.1+.2*i)+60*Math.sin(TAU*(u*2+i*.2)),a=.05+.04*Math.sin(TAU*(u*3+i*.37));ctx.globalAlpha=a*(.6+.4*E.g);ctx.drawImage(spr([70,110,230],128),x-300,-250,600,500)}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
