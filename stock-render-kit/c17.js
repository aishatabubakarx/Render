/* 17 LIGHT LEAKS & LENS FLARES: warm film-burn glows, anamorphic streaks, drifting flare bokeh (screen/add over footage) */
C[17]=()=>{newTL();const R=rng(170),E={s:0};
  tl.to(E,{s:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const PAL=[[255,120,30],[255,50,90],[255,190,60],[60,110,255],[255,40,170],[255,150,0],[150,70,255],[255,80,40]],BL=[];
  for(let i=0;i<9;i++)BL.push({cx:R()<.5?W*(R()*.3):W*(.7+R()*.3),cy:H*R(),rx:300+R()*420,ry:240+R()*360,c:PAL[i%PAL.length],ax:120+R()*260,ay:80+R()*220,px:R()*TAU,py:R()*TAU,m:1+(R()*2|0),rot:R()*TAU,a:.5+R()*.4});
  const SK=[{y:.34,c:[90,170,255],m:1,p:0,L:1},{y:.68,c:[255,150,90],m:2,p:1.7,L:.7},{y:.5,c:[170,120,255],m:1,p:3.5,L:.9}];
  const HX=[];for(let i=0;i<26;i++)HX.push({x:R()*W,y:R()*H,r:10+R()*60,c:PAL[(R()*PAL.length)|0],m:1+(R()*3|0),p:R()*TAU,A:40+R()*120,a:.1+R()*.3});
  draw=()=>{const p=ph();clear('#000');ctx.globalCompositeOperation='lighter';
    const fl=.82+.1*Math.sin(TAU*3*p+1)+.08*Math.sin(TAU*7*p+3);
    for(const b of BL){const x=b.cx+b.ax*Math.sin(TAU*b.m*p+b.px),y=b.cy+b.ay*Math.sin(TAU*p+b.py),k=.65+.35*Math.sin(TAU*b.m*p+b.px*2);ctx.save();ctx.translate(x,y);ctx.rotate(b.rot+.5*Math.sin(TAU*p+b.py));ctx.scale(1,b.ry/b.rx);ctx.globalAlpha=b.a*k*fl*(.7+.3*E.s);ctx.drawImage(soft(b.c,256,.05),-b.rx,-b.rx,b.rx*2,b.rx*2);ctx.restore()}
    /* anamorphic streaks */
    for(const s of SK){const x=W*(.5+.38*Math.sin(TAU*s.m*p+s.p)),y=H*(s.y+.06*Math.sin(TAU*p*2+s.p)),a=(.5+.5*Math.sin(TAU*p+s.p*1.3));ctx.save();ctx.translate(x,y);ctx.globalAlpha=.7*a*s.L;ctx.scale(1,.022);ctx.drawImage(soft(s.c,256,.2),-W*.7,-W*.7,W*1.4,W*1.4);ctx.restore();
      ctx.globalAlpha=.9*a*s.L;ctx.drawImage(spr([255,255,255],64,1),x-26,y-26,52,52);ctx.save();ctx.translate(x,y);ctx.scale(1,.01);ctx.globalAlpha=.55*a*s.L;ctx.drawImage(spr([255,255,255],64,1),-W*.4,-W*.4,W*.8,W*.8);ctx.restore()}
    /* flare bokeh polygons */
    for(const h of HX){const x=h.x+h.A*Math.sin(TAU*p+h.p),y=h.y+h.A*.5*Math.sin(TAU*h.m*p+h.p),a=h.a*(.5+.5*Math.sin(TAU*h.m*p+h.p));ctx.globalAlpha=a;ctx.fillStyle=rgba(h.c,1);ctx.beginPath();for(let i=0;i<6;i++){const q=i*Math.PI/3+.3;i?ctx.lineTo(x+Math.cos(q)*h.r,y+Math.sin(q)*h.r):ctx.moveTo(x+Math.cos(q)*h.r,y+Math.sin(q)*h.r)}ctx.closePath();ctx.fill();ctx.globalAlpha=a*.6;ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=1.5;ctx.stroke()}
    /* sweeping prism band */
    const bx=W*(-.2+1.4*fr(p)),g=ctx.createLinearGradient(bx-260,0,bx+260,0);g.addColorStop(0,'rgba(255,40,80,0)');g.addColorStop(.35,'rgba(255,90,40,.28)');g.addColorStop(.5,'rgba(255,230,160,.5)');g.addColorStop(.65,'rgba(60,160,255,.25)');g.addColorStop(1,'rgba(60,100,255,0)');ctx.globalAlpha=.7*Math.sin(Math.PI*fr(p));ctx.fillStyle=g;ctx.save();ctx.translate(bx,H/2);ctx.rotate(.18);ctx.translate(-bx,-H/2);ctx.fillRect(bx-260,-200,520,H+400);ctx.restore();
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
