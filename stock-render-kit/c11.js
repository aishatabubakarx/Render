/* 11 SILK WAVES: flowing gradient lines folding like liquid silk */
C[11]=()=>{newTL();const R=rng(110),E={s:0};
  tl.to(E,{s:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const NL=72,K=150,G=mkLayer(W,H,.5);
  draw=()=>{const p=ph();clear('#02010a');G.clear();const x=G.x;x.globalCompositeOperation='lighter';x.lineCap='round';x.lineJoin='round';
    const sh=.5+.5*E.s;
    for(let l=0;l<NL;l++){const t=l/(NL-1),hue=232+t*150+30*Math.sin(TAU*p+t*3),pts=[];
      for(let k=0;k<=K;k++){const s=k/K,X=-80+s*(W+160),
        c=H*.5+H*.13*Math.sin(TAU*(1.1*s+p)+.6)+H*.06*Math.sin(TAU*(2.3*s-2*p)+2),
        spread=H*(.1+.2*(.5+.5*Math.sin(TAU*(1.0*s+p)+1.2)))*(.55+.45*sh),
        tw=H*.09*Math.sin(TAU*(2.6*s+2*p)+t*TAU*1.25)*(.4+.6*Math.sin(Math.PI*s)),
        Y=c+(t-.5)*2*spread+tw;pts.push(X,Y)}
      const bright=.5+.5*Math.sin(TAU*(t*2.2-p)+1);
      const g=x.createLinearGradient(-80,0,W+80,0);g.addColorStop(0,hsl(hue,100,55,0));g.addColorStop(.2,hsl(hue,100,60,.6));g.addColorStop(.5,hsl(hue+25,100,68,.95));g.addColorStop(.8,hsl(hue+50,100,62,.6));g.addColorStop(1,hsl(hue+60,100,55,0));
      x.strokeStyle=g;for(const [lw,a] of [[7,.08],[2.2,.32+.3*bright],[.9,.85]]){x.globalAlpha=a;x.lineWidth=lw;x.beginPath();for(let k=0;k<=K;k++)k?x.lineTo(pts[k*2],pts[k*2+1]):x.moveTo(pts[0],pts[1]);x.stroke()}}
    put(G,0,0,1,'lighter',12);put(G,0,0,1,'lighter',0)};
};
