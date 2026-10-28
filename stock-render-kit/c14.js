/* 14 RAIN ON WINDOW: night city bokeh seen through water drops that refract the lights */
C[14]=()=>{newTL();const R=rng(140),E={s:0};
  tl.to(E,{s:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const LC=[[255,200,110],[255,140,60],[255,70,70],[255,240,220],[90,200,255],[120,255,170],[255,120,200]],LT=[];
  for(let i=0;i<92;i++){const y=H*(.12+.86*Math.pow(R(),.85));LT.push({x:R()*W,y,r:14+R()*58,c:LC[(R()*LC.length)|0],m:1+(R()*3|0),p:R()*TAU,A:10+R()*40,B:6+R()*18,pp:R()*TAU,a:.4+R()*.6})}
  const soft1=mkLayer(),sharp=mkLayer();
  const ST=[];for(let i=0;i<190;i++){const big=R()<.35;ST.push({x:R()*W,y:R()*H,r:big?12+R()*18:4+R()*8})}
  const RN=[];for(let i=0;i<26;i++)RN.push({x:60+R()*(W-120),y:R()*H,r:8+R()*10,m:3+(R()*3|0),ph:R()*TAU,k:1,len:120+R()*220});
  function lights(L,sharpMode,p){L.clear();const x=L.x;const bg=x.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#050a18');bg.addColorStop(.6,'#0a1226');bg.addColorStop(1,'#10141f');x.fillStyle=bg;x.fillRect(0,0,W,H);x.globalCompositeOperation='lighter';
    for(const l of LT){const X=l.x+l.A*Math.sin(TAU*p+l.p),Y=l.y+l.B*Math.sin(TAU*l.m*p+l.pp),f=.78+.22*Math.sin(TAU*l.m*2*p+l.pp);
      if(sharpMode){const r=l.r*.62;x.globalAlpha=l.a*f*.95;x.drawImage(bokeh(l.c,96,.7,.1),X-r,Y-r,r*2,r*2);x.globalAlpha=l.a*f*.8;const g=l.r*.4;x.drawImage(spr(l.c,64,1),X-g,Y-g,g*2,g*2)}
      else{x.globalAlpha=l.a*f*.9;x.drawImage(bokeh(l.c,128,.6,.08),X-l.r*1.15,Y-l.r*1.15,l.r*2.3,l.r*2.3)}}}
  function drop(x,y,r,k){const m=1.7,sw=2.5*r/m,rh=r*1.14;ctx.save();ctx.beginPath();ctx.ellipse(x,y,r,rh,0,0,TAU);ctx.clip();ctx.translate(x,y);ctx.scale(-1,-1);ctx.drawImage(sharp.k,(x-sw/2)*S,(y-sw/2)*S,sw*S,sw*S,-r*1.25,-r*1.25,r*2.5,r*2.5);
    const g=ctx.createRadialGradient(0,0,r*.4,0,0,rh);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.8,'rgba(0,0,10,.16)');g.addColorStop(1,'rgba(0,0,10,.45)');ctx.fillStyle=g;ctx.fillRect(-r*1.3,-rh*1.3,r*2.6,rh*2.6);ctx.restore();
    ctx.save();ctx.translate(x,y);ctx.globalCompositeOperation='lighter';{const lg=ctx.createRadialGradient(0,-rh*.2,0,0,0,rh);lg.addColorStop(0,'rgba(150,175,225,.22)');lg.addColorStop(1,'rgba(90,120,180,.06)');ctx.fillStyle=lg;ctx.beginPath();ctx.ellipse(0,0,r*.96,rh*.96,0,0,TAU);ctx.fill();ctx.strokeStyle='rgba(255,235,210,.5)';ctx.lineWidth=Math.max(1,r*.14);ctx.beginPath();ctx.arc(0,rh*.05,r*.8,.7,2.45);ctx.stroke()}ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=Math.max(1,r*.09);ctx.lineCap='round';ctx.beginPath();ctx.arc(0,0,r*.74,-2.6,-1.9);ctx.stroke();ctx.strokeStyle='rgba(180,210,255,.35)';ctx.lineWidth=Math.max(1,r*.08);ctx.beginPath();ctx.arc(0,0,r*.8,.5,1.2);ctx.stroke();ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,0,r,rh,0,0,TAU);ctx.stroke();ctx.restore()}
  draw=()=>{const p=ph();clear('#03060e');lights(soft1,false,p);lights(sharp,true,p);put(soft1,0,0,1,'source-over',4);
    /* misty glass */ctx.globalAlpha=.06;ctx.fillStyle='#9ab';ctx.fillRect(0,0,W,H);ctx.globalAlpha=1;
    for(const d of ST)drop(d.x,d.y,d.r,0);
    for(const q of RN){const t=p+.035*Math.sin(TAU*q.m*p+q.ph)/(TAU*q.m*.035+1e-9)*.0+.03*Math.sin(TAU*q.m*p+q.ph),y=mod(q.y+t*H+p*H*q.k,H+q.len)-q.len*.5,x=q.x+3*Math.sin(TAU*q.m*p+q.ph);
      const g=ctx.createLinearGradient(x,y-q.len,x,y);g.addColorStop(0,'rgba(200,225,255,0)');g.addColorStop(1,'rgba(200,225,255,.16)');ctx.strokeStyle=g;ctx.lineWidth=q.r*.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x,y-q.len);ctx.lineTo(x,y);ctx.stroke();drop(x,y,q.r,1)}
    const v=ctx.createRadialGradient(W/2,H/2,H*.45,W/2,H/2,W*.7);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,6,.5)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)};
};
