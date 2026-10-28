/* 10 GLASS DISCS: transparent 3D glass discs with iridescent rainbow edges, slowly tumbling */
C[10]=()=>{newTL();const R=rng(100),E={g:0};
  tl.to(E,{g:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const D=[];for(let i=0;i<10;i++){const z=R();D.push({x:W*(.06+.88*R()),y:H*(.1+.8*R()),r:90+(1-z*.5)*R()*250,ax:30+R()*80,ay:20+R()*60,my:1+(R()*2|0),px:R()*TAU,py:R()*TAU,tm:1+(R()*2|0),tp:R()*TAU,psi:R()*TAU,dpsi:(R()<.5?-1:1)*(R()<.5?1:2),z,hue:R()*360})}
  D.sort((a,b)=>b.z-a.z);const far=mkLayer(),near=mkLayer();
  function disc(x,q,p){const X=q.x+q.ax*Math.sin(TAU*p+q.px),Y=q.y+q.ay*Math.sin(TAU*q.my*p+q.py),ratio=.28+.72*Math.abs(Math.cos(TAU*q.tm*p+q.tp)),psi=q.psi+q.dpsi*TAU*p*.25*0+.6*Math.sin(TAU*p+q.px),r=q.r,al=.55+.45*(1-q.z*.6);
    x.save();x.translate(X,Y);x.rotate(psi);x.scale(1,ratio);
    let g=x.createRadialGradient(0,0,r*.1,0,0,r);g.addColorStop(0,'rgba(170,205,255,.02)');g.addColorStop(.75,'rgba(190,220,255,.07)');g.addColorStop(1,'rgba(235,245,255,.2)');x.fillStyle=g;x.beginPath();x.arc(0,0,r,0,TAU);x.fill();
    x.globalCompositeOperation='lighter';
    const mk=(h0,a0)=>{const cg=x.createConicGradient(TAU*p*(q.dpsi)+q.px,0,0);for(let k=0;k<=8;k++)cg.addColorStop(k/8,hsl(h0+(k%8)*45,100,60,a0));return cg};
    x.lineCap='round';
    for(const [lw,a] of [[r*.13,.1],[r*.055,.4],[r*.018,.95]]){x.strokeStyle=mk(q.hue+360*p,1);x.globalAlpha=a*al;x.lineWidth=lw;x.beginPath();x.arc(0,0,r*.985,0,TAU);x.stroke()}
    x.strokeStyle=mk(q.hue+180-360*p,1);x.globalAlpha=.32*al;x.lineWidth=r*.022;x.beginPath();x.arc(0,0,r*.9,0,TAU);x.stroke();
    x.globalAlpha=.16*al;x.lineWidth=r*.04;x.beginPath();x.arc(0,r*.035/Math.max(.3,ratio),r*.97,0,TAU);x.stroke();
    x.globalAlpha=.9*al;x.strokeStyle='rgb(255,255,255)';x.lineWidth=r*.022;x.beginPath();x.arc(0,0,r*.935,-2.75,-1.75);x.stroke();x.globalAlpha=.5*al;x.lineWidth=r*.012;x.beginPath();x.arc(0,0,r*.935,-1.5,-1.3);x.stroke();
    x.globalAlpha=.4*al;const cg2=x.createLinearGradient(-r,r*.6,r,-r*.2);cg2.addColorStop(0,'rgba(0,255,255,0)');cg2.addColorStop(.5,'rgba(120,200,255,.7)');cg2.addColorStop(1,'rgba(255,100,220,0)');x.strokeStyle=cg2;x.lineWidth=r*.05;x.beginPath();x.arc(0,0,r*.84,.4,1.5);x.stroke();
    x.globalAlpha=.8*al;x.fillStyle='rgba(255,255,255,.9)';x.beginPath();x.arc(-r*.55,-r*.55,r*.022,0,TAU);x.fill();
    x.restore()}
  draw=()=>{const p=ph();clear('#02030a');
    const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#071a33');bg.addColorStop(.5,'#050a1e');bg.addColorStop(1,'#16062a');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const x=W*(.15+.7*((i*.37)%1))+90*Math.sin(TAU*p+i),y=H*(.2+.6*((i*.61)%1))+60*Math.sin(TAU*p*2+i*2),r=420;ctx.globalAlpha=.3;ctx.drawImage(soft(i%2?[40,110,255]:[190,60,230],128,.1),x-r,y-r,r*2,r*2)}ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    far.clear();near.clear();for(const q of D){disc(q.z>.45?far.x:near.x,q,p)}
    put(far,0,0,.9,'lighter',7);put(near,0,0,1,'lighter',0);put(near,0,0,.45,'lighter',9);
    const v=ctx.createRadialGradient(W/2,H/2,H*.4,W/2,H/2,W*.7);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,6,.55)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)};
};
