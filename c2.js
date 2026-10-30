/* 2 - snowflake + glitter circle frame iris transition on chroma green, vertical (opens, holds as a circle frame, opens fully) */
C[2]=()=>{const R=rng(202),D=DUR/1000,g={r:0,rot:0},cx=W/2,cy=H*.5,R1=W*.4,RM=Math.hypot(W,H)/2+90;newTL();
  A(g,{r:0},{r:R1},.35,2.6,'expo.out');A(g,{r:R1},{r:RM},D-5.6,3.9,'power3.in');A(g,{rot:0},{rot:1.1},0,D,'sine.inOut');
  const FL=HP.flakes(6,22),sp=spr([255,255,255],128),gold=spr([200,230,255],128);
  const GL=Array.from({length:2300},()=>({x:R()*W,y:R()*H,s:1+R()*2.2,k:1+((R()*3)|0),ph:R()*TAU,a:.1+R()*.3}));
  const BK=Array.from({length:26},()=>({x:R()*W,y:R()*H,r:40+R()*140,a:.05+R()*.09,k:1+((R()*2)|0),ph:R()*TAU}));
  const RIM=Array.from({length:30},(_,i)=>({a:i/30*TAU,r:i%3===0?100:i%3===1?72:54,f:(R()*6)|0,rk:R()<.5?-1:1,ph:R()*TAU}));
  const RG=Array.from({length:240},()=>({a:R()*TAU,d:(R()-.5)*60,k:1+((R()*3)|0),ph:R()*TAU,s:1+R()*2.4}));
  const FS=Array.from({length:90},()=>({x0:R(),y0:R(),m:1+((R()*2)|0),r:4+R()*(R()<.25?26:5),ph:R()*TAU,f:(R()*6)|0,fl:R()<.2,a:.7+R()*.3}));
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR,r=Math.max(.5,g.r*(1+.01*Math.sin(th*6)*sm(0,R1,g.r)*(1-sm(R1,R1*1.2,g.r)))),a0=g.rot;
    ctx.save();ctx.beginPath();ctx.rect(0,0,W,H);ctx.arc(cx,cy,r,0,TAU,true);ctx.clip('evenodd');
    const bg=ctx.createRadialGradient(cx,cy,r*.6,cx,cy,Math.hypot(W,H)*.62);bg.addColorStop(0,'#2f84cf');bg.addColorStop(.55,'#154c8c');bg.addColorStop(1,'#07264f');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';for(const b of BK){ctx.globalAlpha=b.a*(.6+.4*Math.sin(th*b.k+b.ph));ctx.drawImage(gold,b.x-b.r,b.y-b.r,b.r*2,b.r*2)}
    ctx.fillStyle='#fff';for(const p of GL){const tw=Math.pow(Math.max(0,Math.sin(th*p.k+p.ph+p.x*.004+p.y*.003)),9);ctx.globalAlpha=Math.min(1,p.a+tw*.9);ctx.fillRect(p.x,p.y,p.s,p.s)}
    ctx.restore();
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    if(r>3&&r<RM*.98){ctx.strokeStyle='#e9f6ff';ctx.lineWidth=30;ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.stroke();ctx.strokeStyle='#ffffff';ctx.lineWidth=9;ctx.beginPath();ctx.arc(cx,cy,Math.max(1,r-6),0,TAU);ctx.stroke();ctx.strokeStyle='#9ccdf2';ctx.lineWidth=4;ctx.beginPath();ctx.arc(cx,cy,r+13,0,TAU);ctx.stroke();
      for(const q of RIM){const a=q.a+a0,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;ctx.save();ctx.translate(x,y);ctx.rotate(q.ph+q.rk*a0*1.5);ctx.drawImage(FL[q.f],-q.r,-q.r,q.r*2,q.r*2);ctx.restore()}
      ctx.globalCompositeOperation='lighter';for(const q of RG){const a=q.a+a0*.5,x=cx+Math.cos(a)*(r+q.d),y=cy+Math.sin(a)*(r+q.d),tw=Math.pow(Math.max(0,Math.sin(th*q.k+q.ph)),6);ctx.globalAlpha=.25+tw*.75;ctx.fillStyle='#fff';ctx.fillRect(x-q.s/2,y-q.s/2,q.s,q.s);if(q.s>2.6&&tw>.5)HP.glint(x,y,10+tw*12,tw,sp,th/4,'#fff')}
      ctx.globalCompositeOperation='source-over'}
    ctx.globalAlpha=1;for(const f of FS){const y=((f.y0+f.m*u)%1)*(H+160)-80,x=f.x0*W+30*Math.sin(th+f.ph);ctx.globalAlpha=f.a;if(f.fl){ctx.save();ctx.translate(x,y);ctx.rotate(f.ph+th*.5);ctx.drawImage(FL[f.f],-f.r*2,-f.r*2,f.r*4,f.r*4);ctx.restore()}else{const q=f.r*1.6;ctx.drawImage(sp,x-q,y-q,q*2,q*2)}}
    ctx.globalAlpha=1}};
