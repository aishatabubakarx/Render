/* 15 NEON KALEIDOSCOPE: 12-fold mandala of glowing curves, petals and expanding dot rings */
C[15]=()=>{newTL();const R=rng(150),E={s:0};
  tl.to(E,{s:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const N=12,WD=Math.PI/N*.96,LY=[];for(let k=0;k<7;k++)LY.push({R:230+k*105,f:1+(k%4)*.75+((R()*2)|0)*.5,q:(k%2?1:-1)*(1+(k%3)),ph:R()*TAU,a:.55+R()*.45,h:k*38});
  const G=mkLayer(W,H,.6);
  const sectors=(x,fn)=>{for(let j=0;j<N;j++){x.save();x.rotate(j*TAU/N);fn(1);x.scale(1,-1);fn(-1);x.restore()}};
  draw=()=>{const p=ph(),cx=W/2,cy=H/2;clear('#03000a');G.clear();const x=G.x;x.save();x.translate(cx,cy);x.rotate(TAU*p/N);x.globalCompositeOperation='lighter';x.lineCap='round';x.lineJoin='round';
    const hb=360*p;
    LY.forEach((L,li)=>{const pts=[];for(let i=0;i<=60;i++){const t=i/60,r=L.R*(.12+.88*t),th=WD*Math.sin(TAU*(L.f*t-L.q*p/ (Math.abs(L.q)||1)*0+L.q*p)+L.ph)*(.25+.75*Math.sin(Math.PI*Math.min(1,t*1.1)));pts.push([Math.cos(th)*r,Math.sin(th)*r])}
      const col=hsl(hb+L.h,100,62,1);
      for(const [lw,a] of [[9,.1],[3,.4],[1.4,.95]]){x.strokeStyle=col;x.globalAlpha=a*L.a*(.7+.3*E.s);x.lineWidth=lw;sectors(x,()=>{x.beginPath();pts.forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));x.stroke()})}
      /* petals between rings */
      if(li%2===0){x.fillStyle=hsl(hb+L.h+40,100,60,1);x.globalAlpha=.1*L.a;const r1=L.R*.45,r2=L.R*(.8+.12*Math.sin(TAU*p*(li+1)/(li+1)));sectors(x,()=>{x.beginPath();x.moveTo(r1,0);x.quadraticCurveTo((r1+r2)/2,WD*r2*.55,r2,0);x.quadraticCurveTo((r1+r2)/2,-WD*r2*.55,r1,0);x.fill()})}});
    /* expanding dot rings */
    for(let i=0;i<5;i++){const t=fr(i/5+p),r=40+t*820,sz=1.5+t*7;x.fillStyle=hsl(hb+i*70+t*120,100,70,1);x.globalAlpha=Math.sin(Math.PI*t)*.9;sectors(x,s=>{x.beginPath();x.arc(r,0,sz,0,TAU);x.fill()});x.globalAlpha*=.4;x.lineWidth=1;x.strokeStyle=x.fillStyle;x.beginPath();x.arc(0,0,r,0,TAU);x.stroke()}
    x.restore();
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,W*.6);bg.addColorStop(0,hsl(hb+250,90,12,1));bg.addColorStop(1,'#020006');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    put(G,0,0,1,'lighter',14);put(G,0,0,1,'lighter',0);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55+.2*E.s;const cr=150;ctx.drawImage(soft(hue2rgb(hb+30,1,.6),128,.1),cx-cr,cy-cr,cr*2,cr*2);ctx.globalAlpha=.9;ctx.drawImage(spr([255,255,255],64,1),cx-26,cy-26,52,52);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
