/* 07 RAINBOW LIGHT RAYS converging to a focal point and spreading out again, seamless hue cycle */
C[7]=()=>{newTL();const R=rng(77),E={b:0};
  tl.to(E,{b:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const N=96,B=[],G=mkLayer(W,H,.5);for(let i=0;i<N;i++)B.push({t:i/(N-1),w:.7+R()*2.1,hs:R()*50,m:1+(R()*2|0),p:R()*TAU,q:R()*TAU,a:.45+R()*.55,sp:R()*.6,dm:1+(R()*3|0)});
  const K=56;
  draw=()=>{const p=ph();clear('#000');const fx=W*(.5+.035*Math.sin(TAU*p)),fy=H*(.5+.05*Math.sin(TAU*2*p+1));
    G.clear();const x=G.x;x.globalCompositeOperation='lighter';x.lineCap='round';x.lineJoin='round';
    for(const b of B){const A=(b.t-.5)*2,hue=b.hs+b.t*300+360*p,col=hue2rgb(hue,1,.58);const pts=[];
      for(let k=0;k<=K;k++){const s=k/K,X=-100+s*(W+200),u=2*s-1,bend=Math.sin(TAU*(1.4*s+b.m*p)+b.p)*(.5+.5*Math.sin(TAU*p*b.dm+b.q))*Math.pow(Math.abs(u),1.3)*H*.07,
        Y=fy+A*u*H*.78*(1+.14*Math.sin(TAU*(p*b.m)+b.p))+bend;pts.push([X+(fx-W/2)*(1-Math.abs(u)),Y])}
      const g=x.createLinearGradient(-100,0,W+100,0),al=b.a*(.55+.45*E.b);g.addColorStop(0,rgba(col,0));g.addColorStop(.3,rgba(col,.32*al));g.addColorStop(.5,rgba(mixc(col,[255,255,255],.35),.95*al));g.addColorStop(.7,rgba(col,.32*al));g.addColorStop(1,rgba(col,0));
      x.strokeStyle=g;for(const [lw,m] of [[b.w*8,.16],[b.w*2.6,.5],[b.w*.9,1]]){x.globalAlpha=m;x.lineWidth=lw;x.beginPath();pts.forEach((q,i)=>i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]));x.stroke()}}
    ctx.globalCompositeOperation='lighter';put(G,0,0,1,'lighter',22);put(G,0,0,.9,'lighter',5);put(G,0,0,.85,'lighter',0);
    /* travelling beads of light */
    ctx.globalCompositeOperation='lighter';for(const b of B){if(b.sp<.25)continue;const A=(b.t-.5)*2,hue=b.hs+b.t*300+360*p,s=fr(p*b.dm+b.q),u=2*s-1,X=-100+s*(W+200),Y=fy+A*u*H*.78*(1+.14*Math.sin(TAU*(p*b.m)+b.p))+Math.sin(TAU*(1.4*s+b.m*p)+b.p)*(.5+.5*Math.sin(TAU*p*b.dm+b.q))*Math.pow(Math.abs(u),1.3)*H*.07;
      ctx.globalAlpha=.85*(1-Math.abs(u)*.5)*Math.sin(Math.PI*s);ctx.drawImage(spr(hue2rgb(hue,1,.62),32,1),X-18,Y-18,36,36)}
    /* focal bloom */
    const br=300+120*E.b;ctx.globalAlpha=.55+.3*E.b;ctx.drawImage(spr([255,245,255],256,1),fx-br,fy-br,br*2,br*2);ctx.globalAlpha=.8;const r2=70;ctx.drawImage(spr([255,255,255],128,1),fx-r2,fy-r2,r2*2,r2*2);
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
