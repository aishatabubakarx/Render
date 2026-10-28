/* 13 COLORFUL CONFETTI CELEBRATION FALLING  (alpha, seamless loop) */
C[13]=()=>{newTL();const R=rng(131),HH=H+300,pal=[[255,64,96],[255,160,30],[255,221,40],[60,214,120],[40,190,255],[120,90,255],[255,90,200],[255,255,255]];
  const P1=Array.from({length:420},()=>{const z=R();return{x:R()*W,y:R()*HH,w:12+z*22,h:7+z*12,c:pal[(R()*pal.length)|0],cyc:1+(z>.5?1:0)+(z>.85?1:0),sw:20+R()*80,k:1+(R()*3|0),ph:R(),rk:1+(R()*3|0)*(R()<.5?-1:1),r0:R()*TAU,fk:3+(R()*9|0),fp:R(),shape:R()<.18?1:0}});
  const ST=Array.from({length:22},()=>({x:R()*W,y:R()*HH,c:pal[(R()*7)|0],cyc:1+(R()*2|0),sw:30+R()*70,k:1+(R()*2|0),ph:R(),len:90+R()*120,wk:2+(R()*4|0),wp:R()}));
  P1.sort((a,b)=>a.w-b.w);
  draw=()=>{clear();const p=P();
    for(const s of ST){const y0=wrap(s.y+p*s.cyc*HH,HH)-150,x0=s.x+s.sw*sinP(s.k,s.ph);ctx.strokeStyle=rgba(s.c,1);ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();for(let i=0;i<=24;i++){const t=i/24,x=x0+Math.sin(TAU*(s.wk*p+s.wp)+t*7)*26,y=y0+t*s.len;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke()}
    for(const c of P1){const y=wrap(c.y+p*c.cyc*HH,HH)-150,x=c.x+c.sw*sinP(c.k,c.ph),f=Math.cos(TAU*(c.fk*p+c.fp)),sh=.7+.3*Math.abs(f),col=f>=0?c.c:mixc(c.c,[0,0,0],.28);
      ctx.save();ctx.translate(x,y);ctx.rotate(c.r0+TAU*c.rk*p);ctx.scale(1,Math.max(.06,Math.abs(f)));ctx.fillStyle=rgba(mixc(col,[255,255,255],(1-sh)*.0+(f>0?.12*(1-Math.abs(f)):0)),1);
      if(c.shape){ctx.beginPath();ctx.arc(0,0,c.h*.7,0,TAU);ctx.fill()}else{ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h)}ctx.restore()}};
};
/* 14 FIREWORKS DISPLAY NIGHT SKY  (black) */
C[14]=()=>{newTL();const R=rng(141),pc=[[255,80,90],[255,190,60],[90,200,255],[200,100,255],[120,255,170],[255,120,200],[255,255,255]],types=['peony','ring','willow','palm','crackle','heart'],bs=[];
  const sched=[[400,.5,.38,0,'peony',1.1],[1500,.28,.45,1,'ring',1],[2300,.72,.4,2,'willow',1.1],[3300,.5,.3,4,'crackle',1.2],[4200,.2,.5,5,'peony',.9],[4600,.8,.48,3,'peony',.9],[5700,.4,.34,6,'palm',1.1],[6600,.65,.36,1,'heart',1.2],[7500,.5,.45,0,'ring',1.2],[8300,.25,.35,2,'willow',1],[8700,.75,.3,4,'crackle',1],[9600,.5,.28,5,'palm',1.2],[10300,.3,.42,3,'peony',1],[10700,.7,.44,6,'peony',1],[11200,.5,.36,0,'peony',1.4],[11600,.35,.3,1,'willow',1.1],[11900,.65,.3,2,'ring',1.1],[12100,.5,.22,4,'crackle',1.3]];
  for(const [t,x,y,c,ty,sz] of sched)bs.push(mkBurst(R,t,W*x,H*y,pc[c],ty,sz));
  const stars=Array.from({length:140},()=>({x:R()*W,y:R()*H*.8,s:.6+R()*1.6,k:2+(R()*8|0),ph:R()}));
  draw=()=>{clear();const ms=now(),p=P();let g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#02030a');g.addColorStop(1,'#0a0d1c');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    for(const s of stars){ctx.globalAlpha=.25+.5*(.5+.5*Math.sin(TAU*(s.k*p+s.ph)));ctx.fillStyle='#cfd9ff';ctx.beginPath();ctx.arc(s.x,s.y,s.s,0,TAU);ctx.fill()}
    ctx.globalCompositeOperation='lighter';
    for(const b of bs){const dt=(ms-b.t0)/1000;if(dt>0&&dt<1.4){ctx.globalAlpha=Math.pow(1-dt/1.4,2)*.22;const s=W*.7;ctx.drawImage(spr(b.col,128),b.x-s,b.y-s*.8,s*2,s*1.6)}}
    drawBursts(bs,ms,true);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
/* 15 SOCIAL MEDIA NOTIFICATION POP-UPS: LIKES, COMMENTS, FOLLOWERS, SHARES  (alpha) */
C[15]=()=>{const cards=[{x:W*.27,y:H*.3,col:[255,60,110],kind:'like',label:'LIKES',t:600,to:128400,fmt:'k'},{x:W*.73,y:H*.3,col:[60,160,255],kind:'comment',label:'COMMENTS',t:2200,to:2480},{x:W*.27,y:H*.7,col:[60,220,140],kind:'follow',label:'NEW FOLLOWERS',t:3800,to:15630},{x:W*.73,y:H*.7,col:[170,110,255],kind:'share',label:'SHARES',t:5400,to:9870}].map(c=>({...c,sc:0,n:0,pop:0,out:0}));newTL();
  for(const c of cards){tl.add(c,{sc:[0,1],duration:900,ease:'outElastic(1,.6)'},c.t);tl.add(c,{n:[0,1],duration:3600,ease:'outCubic'},c.t+300);tl.add(c,{pop:[0,1],duration:900,ease:'outCubic'},c.t+120);tl.add(c,{out:[0,1],duration:500,ease:'inBack'},13300+cards.indexOf(c)*130)}
  const CW=640,CH=190,fmtN=n=>Math.round(n).toLocaleString('en-US');
  const icon=(k,col)=>{ctx.fillStyle='#fff';ctx.strokeStyle='#fff';ctx.lineWidth=7;ctx.lineCap='round';ctx.lineJoin='round';
    if(k==='like'){ctx.beginPath();heart(0,-22,46);ctx.fill()}
    else if(k==='comment'){roundRect(-26,-22,52,36,12);ctx.fill();ctx.beginPath();ctx.moveTo(-10,12);ctx.lineTo(-14,28);ctx.lineTo(6,12);ctx.closePath();ctx.fill();ctx.fillStyle=rgba(col,1);for(const dx of[-14,0,14]){ctx.beginPath();ctx.arc(dx,-4,4,0,TAU);ctx.fill()}}
    else if(k==='follow'){ctx.beginPath();ctx.arc(-6,-14,12,0,TAU);ctx.fill();ctx.beginPath();ctx.arc(-6,26,24,Math.PI,0);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(24,-10);ctx.lineTo(24,12);ctx.moveTo(13,1);ctx.lineTo(35,1);ctx.stroke()}
    else{ctx.beginPath();ctx.moveTo(-24,16);ctx.bezierCurveTo(-24,-8,-6,-14,12,-14);ctx.stroke();ctx.beginPath();ctx.moveTo(8,-30);ctx.lineTo(30,-14);ctx.lineTo(8,2);ctx.closePath();ctx.fill()}};
  draw=()=>{clear();const ms=now();
    for(const c of cards){const sc=Math.max(0,c.sc)*(1-c.out),a=1-c.out;if(sc<=.002)continue;ctx.save();ctx.translate(c.x,c.y);ctx.scale(sc,sc);ctx.globalAlpha=a;
      ctx.shadowColor='rgba(0,0,0,.45)';ctx.shadowBlur=40*S;ctx.shadowOffsetY=14*S;const g=ctx.createLinearGradient(0,-CH/2,0,CH/2);g.addColorStop(0,'rgba(34,38,52,.96)');g.addColorStop(1,'rgba(18,20,30,.96)');ctx.fillStyle=g;roundRect(-CW/2,-CH/2,CW,CH,CH/2);ctx.fill();ctx.shadowBlur=0;ctx.shadowOffsetY=0;
      ctx.strokeStyle=rgba(c.col,.55);ctx.lineWidth=3;ctx.stroke();
      const ix=-CW/2+CH/2;ctx.save();ctx.translate(ix,0);const pu=1+.06*Math.sin(ms/260);ctx.scale(pu,pu);ctx.shadowColor=rgba(c.col,.8);ctx.shadowBlur=28*S;const ig=ctx.createLinearGradient(-60,-60,60,60);ig.addColorStop(0,rgba(mixc(c.col,[255,255,255],.25),1));ig.addColorStop(1,rgba(c.col,1));ctx.fillStyle=ig;ctx.beginPath();ctx.arc(0,0,66,0,TAU);ctx.fill();ctx.shadowBlur=0;icon(c.kind,c.col);ctx.restore();
      txt(c.label,-CW/2+CH+12,-40,{f:'Montserrat',w:700,size:26,ls:6,al:'left',fill:'rgba(190,198,220,.9)'});
      txt((c.kind==='follow'||c.kind==='share'?'+':'')+fmtN(c.to*c.n),-CW/2+CH+12,24,{f:'Montserrat',w:900,size:84,al:'left',fill:'#fff'});
      ctx.restore();
      /* floating +1 */
      const q=wrap((ms-c.t-1000)/1500,1);if(ms>c.t+1000&&c.out<.1){ctx.globalAlpha=Math.sin(Math.PI*q)*.95;txt(c.kind==='like'?'+1':'+',c.x+CW/2-80,c.y-CH/2-q*70-10,{f:'Montserrat',w:900,size:48,fill:rgba(mixc(c.col,[255,255,255],.35),1),glow:[[rgba(c.col,.8),18]]})}}
    ctx.globalAlpha=1};
};
/* 16 GOD RAYS VOLUMETRIC LIGHT BEAMS WITH DUST MOTES  (alpha, seamless loop) */
C[16]=()=>{newTL();const R=rng(161),src=[W*.86,-160];
  const beams=Array.from({length:15},(_,i)=>({a:Math.PI*.5+.06+i*.052+(R()-.5)*.03,w:.012+R()*.05,al:.16+R()*.3,k:1+(R()*3|0),ph:R(),sk:1+(R()*2|0),sp:R(),len:H*1.9+R()*600}));
  const motes=Array.from({length:170},()=>({x:R()*W,y:R()*H,s:1.5+R()*4.5,k:1+(R()*3|0),ph:R(),dx:30+R()*80,dy:20+R()*60,tk:2+(R()*8|0),tp:R()}));
  draw=()=>{clear();const p=P(),main=ctx,L=layer();ctx=L;
    for(const b of beams){const ang=b.a+.035*Math.sin(TAU*(b.sk*p+b.sp)),al=b.al*(.5+.5*Math.sin(TAU*(b.k*p+b.ph))*.9+.1);
      const x1=src[0]+Math.cos(ang-b.w)*b.len,y1=src[1]+Math.sin(ang-b.w)*b.len,x2=src[0]+Math.cos(ang+b.w)*b.len,y2=src[1]+Math.sin(ang+b.w)*b.len,mx=src[0]+Math.cos(ang)*b.len,my=src[1]+Math.sin(ang)*b.len;
      const g=ctx.createLinearGradient(src[0],src[1],mx,my);g.addColorStop(0,`rgba(255,246,222,${al})`);g.addColorStop(.55,`rgba(255,240,205,${al*.45})`);g.addColorStop(1,'rgba(255,236,190,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(src[0],src[1]);ctx.lineTo(x1,y1);ctx.lineTo(x2,y2);ctx.closePath();ctx.fill()}
    ctx=main;ctx.filter=`blur(${10*S}px)`;ctx.drawImage(_lay,0,0,W,H);ctx.filter='none';
    ctx.globalCompositeOperation='lighter';const gs=520;ctx.globalAlpha=.55+.15*sinP(2);ctx.drawImage(spr([255,236,190],256),src[0]-gs,src[1]-gs,gs*2,gs*2);
    for(const m of motes){const x=m.x+m.dx*sinP(m.k,m.ph),y=m.y+m.dy*Math.cos(TAU*(m.k*p+m.ph)),t=.5+.5*Math.sin(TAU*(m.tk*p+m.tp));ctx.globalAlpha=.15+.6*t*t;const s=m.s*(1+t);ctx.drawImage(spr([255,244,220],32),x-s,y-s,s*2,s*2)}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
