/* 01 AURORA BOREALIS over a starry night, mirrored in a still lake */
C[1]=()=>{newTL();const R=rng(11),E={swell:0,pulse:0};
  tl.to(E,{swell:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  tl.to(E,{pulse:1,duration:2.2,ease:'power2.out'},8.5).to(E,{pulse:0,duration:3.8,ease:'sine.inOut'},10.7);
  const HZ=H*.84,sky=mkLayer(),bg=mkLayer(),fg=mkLayer(),st=stars(R,560,{h:.84,big:2});
  /* static backdrop: gradient sky, milky way, mountains, trees, lake */
  {const x=bg.x,g=x.createLinearGradient(0,0,0,HZ);g.addColorStop(0,'#01030a');g.addColorStop(.55,'#040c1e');g.addColorStop(.9,'#071a24');g.addColorStop(1,'#0d2c38');x.fillStyle=g;x.fillRect(0,0,W,H);
    const f=mkField(240,135);for(let j=0;j<135;j++)for(let i=0;i<240;i++){const X=i/240*W,Y=j/135*H,d=((X-W*.15)*.55+(Y-H*.1)*.84)/1000,band=Math.exp(-d*d*3.2),n=fbm(i*.05,j*.05,3,5)*.5+.5,v=band*Math.pow(n,1.6)*70,o=(j*240+i)*4;f.d[o]=v*.8;f.d[o+1]=v*.9;f.d[o+2]=v*1.2;f.d[o+3]=255}
    f.flush();x.globalCompositeOperation='lighter';x.globalAlpha=.8;x.imageSmoothingQuality='high';x.drawImage(f.k,0,0,W,H);x.globalCompositeOperation='source-over';x.globalAlpha=1;
    const xb=x;{const x=fg.x;const ridge=(base,amp,sc,col,seed)=>{x.fillStyle=col;x.beginPath();x.moveTo(0,H);for(let i=0;i<=W;i+=6)x.lineTo(i,base-amp*(.5+fbm(i*sc,seed,0,4)*.9)-amp*.3*Math.pow(Math.abs(n3(i*sc*2.2,seed,5)),1.5)*1.6);x.lineTo(W,H);x.fill()};
    ridge(HZ-6,95,.0022,'#08161f',2);ridge(HZ+2,48,.004,'#03070c',9);
    x.fillStyle='#02050a';x.beginPath();x.moveTo(0,HZ+10);for(let i=0;i<=W;i+=5){const tr=R()<.55?10+R()*36*(1+.7*Math.sin(i*.004)):4;x.lineTo(i,HZ+6-tr);x.lineTo(i+2.5,HZ+10)}x.lineTo(W,HZ+12);x.lineTo(0,HZ+12);x.fill();x.fillRect(0,HZ+8,W,6);
    /* lake */
    const lg=x.createLinearGradient(0,HZ,0,H);lg.addColorStop(0,'#0b2733');lg.addColorStop(1,'#020a12');x.fillStyle=lg;x.fillRect(0,HZ+10,W,H-HZ);}}
  /* aurora curtains */
  const CUR=[{base:.36,h:.46,hue:[[40,255,160],[20,200,150],[150,70,230]],a:1,sp:1,seed:1},{base:.28,h:.40,hue:[[90,255,210],[40,190,255],[190,60,220]],a:.75,sp:-1,seed:2},{base:.44,h:.34,hue:[[120,255,140],[60,230,170],[230,60,150]],a:.7,sp:2,seed:3}];
  const NC=300,dx=W/NC;
  function curtains(){const L=sky;L.clear();const x=L.x,p=ph();x.globalCompositeOperation='lighter';
    for(const c of CUR){for(let i=0;i<NC;i++){const u=i/NC,X=i*dx,
      yb=H*(c.base+.06*Math.sin(TAU*(1.3*u+c.sp*p)+c.seed)+.035*Math.sin(TAU*(3.1*u-c.sp*2*p)+c.seed*2.1)+.015*Math.sin(TAU*(7.3*u+3*c.sp*p)+c.seed*5))+E.pulse*40*Math.sin(u*TAU*2+c.seed);
      const ray=.5+.5*Math.sin(TAU*(9*u+c.seed*.3)+2.2*Math.sin(TAU*(c.sp*p))+n3(u*14,c.seed,0)*3),ray2=.55+.45*Math.sin(TAU*(23*u+c.sp*4*p)+c.seed),
      env=.35+.65*sm(.02,.2,u)*sm(.02,.2,1-u),bright=c.a*(.55+.5*E.swell+.55*E.pulse)*env*(.35+.65*ray)*(.65+.35*ray2),
      ht=H*c.h*(.7+.5*ray*(.6+.4*E.swell+.3*E.pulse));if(bright<.01)continue;
      const L2=ht+70,p0=ht/L2,g=x.createLinearGradient(0,yb-ht,0,yb+70);g.addColorStop(0,rgba(c.hue[2],0));g.addColorStop(.42*p0,rgba(c.hue[2],.1*bright));g.addColorStop(.7*p0,rgba(c.hue[1],.3*bright));g.addColorStop(.93*p0,rgba(c.hue[0],.85*bright));g.addColorStop(p0,rgba([220,255,235],.5*bright));g.addColorStop(p0+(1-p0)*.3,rgba(c.hue[0],.12*bright*ray));g.addColorStop(1,rgba(c.hue[0],0));
      x.fillStyle=g;x.fillRect(X,yb-ht,dx+1,L2)}}}
  draw=()=>{clear();curtains();ctx.drawImage(bg.k,0,0,W,H);
    ctx.save();ctx.beginPath();ctx.rect(0,0,W,HZ+12);ctx.clip();ctx.globalCompositeOperation='lighter';
    drawStars(st,1);ctx.globalCompositeOperation='lighter';{const ag=ctx.createLinearGradient(0,0,0,HZ);const a=.07+.08*E.swell;ag.addColorStop(0,'rgba(60,40,140,0)');ag.addColorStop(.3,`rgba(40,150,150,${a*.7})`);ag.addColorStop(.62,`rgba(40,190,140,${a})`);ag.addColorStop(1,'rgba(20,100,100,0)');ctx.globalAlpha=1;ctx.fillStyle=ag;ctx.fillRect(0,0,W,HZ)}put(sky,0,0,.9,'lighter',14);put(sky,0,0,.75,'lighter',3);ctx.restore();ctx.drawImage(fg.k,0,0,W,H);
    /* reflection */
    ctx.save();ctx.beginPath();ctx.rect(0,HZ+12,W,H);ctx.clip();ctx.translate(0,HZ+12+.2*HZ);ctx.scale(1,-.2);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.8;ctx.filter=`blur(${5*S}px)`;ctx.drawImage(sky.k,0,0,W,H);ctx.restore();
    ctx.save();ctx.globalCompositeOperation='source-over';ctx.fillStyle='#000';for(let r=0;r<60;r++){const y=HZ+16+Math.pow(r/60,1.5)*(H-HZ-16),a=.08+.1*Math.sin(TAU*(2*ph()+r*.37));ctx.globalAlpha=Math.max(0,a);ctx.fillRect(0,y,W,1+r*.05)}ctx.restore();
    /* silhouettes drawn above the aurora haze */
    ctx.save();ctx.globalCompositeOperation='source-over';const g2=ctx.createLinearGradient(0,HZ-60,0,HZ+14);g2.addColorStop(0,'rgba(0,0,0,0)');g2.addColorStop(1,'rgba(2,6,10,.55)');ctx.fillStyle=g2;ctx.fillRect(0,HZ-60,W,74);ctx.restore()};
};
