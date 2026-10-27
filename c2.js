/* 8 EID MUBARAK */
C[8]=()=>{const R=rng(88),L=mkL('Eid Mubarak','Playfair Display',700,170,W/2,6),ar={a:0,y:30},st=[],lan=[[W/2-760,230,0],[W/2-520,380,1.3],[W/2+520,340,2.1],[W/2+760,200,3.4]],mo={g:0,f:0};newTL();
  L.L.forEach((l,i)=>{l.y=26;tl.add(l,{a:[0,1],y:[26,0],duration:800,ease:'outCubic'},1500+i*80)});tl.add(ar,{a:[0,1],y:[30,0],duration:1200,ease:'outCubic'},3600);
  for(let i=0;i<70;i++)st.push({x:R()*W,y:R()*H*.9,r:6+R()*16,tw:0,big:R()<.3});
  for(let k=0;k<5;k++)tl.add(st,{tw:[{to:1,duration:600,ease:'inOutSine'},{to:0,duration:800,ease:'inOutSine'}],delay:stagger(55)},k*1900);
  tl.add(mo,{f:[0,1],duration:1400,ease:'outCubic'},200);tl.add(mo,{g:[{to:1,duration:2400,ease:'inOutSine'},{to:0,duration:2400,ease:'inOutSine'}]},0);tl.add(mo,{g:[{to:1,duration:2400,ease:'inOutSine'},{to:0,duration:2400,ease:'inOutSine'}]},5000);
  const gold=[255,200,100];
  draw=()=>{clear();const ms=now();ctx.globalCompositeOperation='lighter';
    for(const s of st)if(s.tw>.01)flare(s.x,s.y,s.r*(.6+s.tw*(s.big?1.4:.7)),s.tw*.9,'#ffe9b8');
    ctx.globalAlpha=mo.f*(.5+.3*mo.g);ctx.drawImage(spr(gold,256),W/2-320,150-320+60,640,640);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    ctx.save();ctx.globalAlpha=mo.f;ctx.translate(W/2,235);ctx.scale(.7+.3*mo.f,.7+.3*mo.f);const gr=ctx.createLinearGradient(-120,-120,120,120);gr.addColorStop(0,'#fff0c0');gr.addColorStop(.5,'#ffc85a');gr.addColorStop(1,'#d98a1f');
    ctx.shadowColor='rgba(255,190,80,.9)';ctx.shadowBlur=50*S;ctx.fillStyle=gr;ctx.beginPath();ctx.arc(0,0,125,0,TAU);ctx.arc(46,-14,104,0,TAU,true);ctx.fill('evenodd');ctx.shadowBlur=0;
    ctx.translate(120,-46);flare(0,0,36,1,'#fff3cc');ctx.restore();
    for(const [x,len,ph] of lan){const rot=.12*Math.sin(TAU*ms/5000+ph);ctx.save();ctx.translate(x,0);ctx.rotate(rot);ctx.strokeStyle='rgba(255,210,130,.55)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,len);ctx.stroke();ctx.translate(0,len);
      const fl=.8+.2*Math.sin(TAU*3*ms/10000+ph*3);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55*fl;ctx.drawImage(spr([255,170,70],128),-150,-30,300,300);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
      ctx.fillStyle='#e0a040';ctx.beginPath();ctx.moveTo(-30,0);ctx.lineTo(30,0);ctx.lineTo(0,-34);ctx.closePath();ctx.fill();ctx.beginPath();ctx.arc(0,-40,7,0,TAU);ctx.fill();
      const bg=ctx.createLinearGradient(0,0,0,180);bg.addColorStop(0,rgba([255,200,100],.95*fl));bg.addColorStop(1,rgba([220,120,40],.9*fl));ctx.fillStyle=bg;ctx.beginPath();ctx.moveTo(-42,6);ctx.lineTo(42,6);ctx.lineTo(58,90);ctx.lineTo(42,172);ctx.lineTo(-42,172);ctx.lineTo(-58,90);ctx.closePath();ctx.fill();
      ctx.strokeStyle='rgba(90,40,0,.75)';ctx.lineWidth=4;ctx.stroke();ctx.beginPath();ctx.moveTo(-14,6);ctx.lineTo(-22,172);ctx.moveTo(14,6);ctx.lineTo(22,172);ctx.moveTo(-56,60);ctx.lineTo(56,60);ctx.moveTo(-56,120);ctx.lineTo(56,120);ctx.stroke();
      ctx.fillStyle='#e0a040';ctx.beginPath();ctx.moveTo(-42,172);ctx.lineTo(42,172);ctx.lineTo(0,214);ctx.closePath();ctx.fill();ctx.restore()}
    drawL(L,H/2+110,{fill:l=>rgba(mixc([255,236,190],[255,190,80],l.k),1),glow:[['rgba(255,190,80,.8)',40]]});
    ctx.globalAlpha=ar.a;txt('عيد مبارك',W/2,H/2+300+ar.y,{f:'Amiri',w:700,size:130,fill:'#ffe9b8',glow:[['rgba(255,190,80,.8)',34]]});ctx.globalAlpha=1};
};
/* 9 HAPPY BIRTHDAY */
C[9]=()=>{const R=rng(99),L=mkL('Happy Birthday','Pacifico',400,220,W/2,0),sub=mkL('Make a wish!','Pacifico',400,72,W/2,0),bal=[],cf=[],pal=[[255,80,110],[255,190,60],[80,210,255],[150,120,255],[90,230,150],[255,130,60]];newTL();
  L.L.forEach((l,i)=>{l.y=-260;tl.add(l,{a:[0,1],duration:80},900+i*90);tl.add(l,{y:[-260,0],duration:1100,ease:'outElastic(1,.5)'},900+i*90)});sub.L.forEach((l,i)=>tl.add(l,{a:[0,1],duration:400},3800+i*50));
  for(let i=0;i<13;i++)bal.push({x:120+i*(W-240)/12+(R()-.5)*90,y0:R()*(H+500),sp:50+R()*70,c:pal[i%6],s:.8+R()*.5,ph:R()*TAU});
  for(let i=0;i<150;i++)cf.push({x:R()*W,y0:R()*(H+60),v:1+(R()*3|0),c:pal[(R()*6)|0],ph:R()*TAU,r:R()*TAU,w:12+R()*8});
  draw=()=>{clear();const ms=now();
    for(const b of bal){const y=H+260-((b.y0+ms/1000*b.sp)%(H+520)),x=b.x+28*Math.sin(ms/1000*.8+b.ph),s=b.s;ctx.save();ctx.translate(x,y);ctx.globalAlpha=.9;
      ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,64*s);ctx.quadraticCurveTo(14*Math.sin(ms/400+b.ph),110*s,0,170*s);ctx.stroke();
      const g=ctx.createRadialGradient(-16*s,-22*s,6,0,0,70*s);g.addColorStop(0,rgba(mixc(b.c,[255,255,255],.55),1));g.addColorStop(.45,rgba(b.c,1));g.addColorStop(1,rgba(mixc(b.c,[0,0,0],.45),1));ctx.fillStyle=g;ctx.shadowColor=rgba(b.c,.6);ctx.shadowBlur=30*S;
      ctx.beginPath();ctx.ellipse(0,0,50*s,62*s,0,0,TAU);ctx.fill();ctx.shadowBlur=0;ctx.beginPath();ctx.moveTo(0,60*s);ctx.lineTo(-8*s,72*s);ctx.lineTo(8*s,72*s);ctx.closePath();ctx.fillStyle=rgba(b.c,1);ctx.fill();ctx.restore()}
    for(const c of cf){const y=(c.y0+ms/10000*H*1.1*c.v*.5)%(H+60)-30,x=c.x+40*Math.sin(TAU*(ms/10000)*c.v+c.ph),fl=Math.cos(TAU*(ms/10000)*c.v*3+c.ph);ctx.save();ctx.translate(x,y);ctx.rotate(c.r+ms/1000);ctx.scale(1,fl);ctx.fillStyle=rgba(c.c,.95);ctx.fillRect(-c.w/2,-4,c.w,8);ctx.restore()}
    drawL(L,H/2-30,{fill:l=>hsl((l.k*330+20)|0,95,66),glow:[['rgba(0,0,0,.9)',40],['rgba(255,255,255,.5)',16]]});drawL(sub,H/2+150,{fill:'#fff',glow:[['rgba(0,0,0,.9)',30]]})};
};
/* 10 THANK YOU FOR WATCHING END SCREEN */
C[10]=()=>{const t1=mkL('THANK YOU','Montserrat',900,150,W/2,6),t2=mkL('FOR WATCHING','Montserrat',700,50,W/2,26),fr1={p:0},fr2={p:0},ci={p:0},orbs=[],lab={a:0};newTL();
  t1.L.forEach((l,i)=>{l.y=60;tl.add(l,{a:[0,1],y:[60,0],duration:700,ease:'outExpo'},300+i*60)});t2.L.forEach((l,i)=>tl.add(l,{a:[0,.9],duration:500},1100+i*35));
  tl.add(fr1,{p:[0,1],duration:1300,ease:'outExpo'},1700);tl.add(fr2,{p:[0,1],duration:1300,ease:'outExpo'},2000);tl.add(ci,{p:[0,1],duration:1000,ease:'outElastic(1,.6)'},2400);tl.add(lab,{a:[0,1],duration:600},3300);
  const oc=[[110,80,255],[0,200,255],[255,80,190]];for(let i=0;i<3;i++)orbs.push({c:oc[i],x:W*(.2+.3*i),y:H*(.35+.2*(i%2)),r:420,ph:i*2});
  const rects=[[210,430,700,394],[1010,430,700,394]],per=2*(700+394);
  const frame=(r,p,ms,off)=>{const [x,y,w,h]=r;ctx.save();ctx.lineWidth=4;ctx.lineJoin='round';ctx.shadowColor='rgba(120,170,255,.8)';ctx.shadowBlur=26*S;ctx.strokeStyle='rgba(170,200,255,.95)';ctx.setLineDash([per*1.2,per*2]);ctx.lineDashOffset=-per*(1-p)*1.2+per*1.2-per*1.2*0;
    ctx.lineDashOffset=per*(1-p);roundRect(x,y,w,h,26);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=`rgba(255,255,255,${.04*p})`;roundRect(x,y,w,h,26);ctx.fill();ctx.shadowBlur=0;
    if(p>.99){ctx.strokeStyle='rgba(255,255,255,.95)';ctx.lineWidth=5;ctx.setLineDash([140,per-140]);ctx.lineDashOffset=-(ms/10000*per*2+off);ctx.shadowColor='rgba(150,200,255,1)';ctx.shadowBlur=20*S;roundRect(x,y,w,h,26);ctx.stroke()}ctx.restore()};
  draw=()=>{clear();const ms=now();ctx.globalCompositeOperation='lighter';
    for(const o of orbs){const x=o.x+160*Math.sin(TAU*ms/10000+o.ph),y=o.y+90*Math.cos(TAU*ms/10000+o.ph);ctx.globalAlpha=.2;ctx.drawImage(spr(o.c,256),x-o.r,y-o.r,o.r*2,o.r*2)}ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    drawL(t1,190,{fill:l=>rgba(mixc([200,215,255],[255,255,255],l.k),1),glow:[['rgba(110,120,255,.8)',40]]});drawL(t2,305,{fill:'#bcd0ff'});
    frame(rects[0],fr1.p,ms,0);frame(rects[1],fr2.p,ms,per/2);
    if(lab.a>0){ctx.globalAlpha=lab.a*.8;txt('WATCH NEXT',210+350,455,{size:26,ls:8,fill:'#cfe0ff'});txt('LATEST VIDEO',1010+350,455,{size:26,ls:8,fill:'#cfe0ff'});ctx.globalAlpha=1}
    const cx=W/2,cy=935,r=72*Math.max(0,ci.p);ctx.save();ctx.strokeStyle='rgba(180,205,255,.95)';ctx.lineWidth=4;ctx.shadowColor='rgba(120,170,255,.8)';ctx.shadowBlur=24*S;ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.stroke();
    if(ci.p>.99){ctx.setLineDash([60,150]);ctx.lineDashOffset=-ms/10000*TAU*(r+14)*3;ctx.strokeStyle='#fff';ctx.beginPath();ctx.arc(cx,cy,r+14,0,TAU);ctx.stroke()}ctx.restore();
    if(lab.a>0){ctx.globalAlpha=lab.a*.85;txt('SUBSCRIBE',cx,cy,{size:20,ls:3,w:800});ctx.globalAlpha=1}};
};
/* 11 COMING SOON NEON */
C[11]=()=>{const L=mkL('COMING SOON','Bebas Neue',400,330,W/2,16),bd={p:0};newTL();
  const pat=[[0,0],[70,.9],[60,0],[90,.6],[60,0],[120,1],[80,.3],[100,1]];
  L.L.forEach((l,i)=>{const kf=pat.map(([d,v])=>({to:v,duration:Math.max(1,d)}));tl.add(l,{a:kf},700+i*120)});
  tl.add(bd,{p:[0,1],duration:1800,ease:'inOutQuad'},2600);
  const drop=[[6000,70],[6080,50],[6200,70],[8200,90],[8330,60]];
  const per=2*(1500+470);
  draw=()=>{clear();const ms=now();const hum=1-.05*Math.sin(TAU*14*ms/10000);
    const sg=l=>{let d=1;if(l.ch==='S'&&l.k>.5)for(const [t,dd] of drop)if(ms>t&&ms<t+dd)d=.12;return d};
    for(let pass=0;pass<2;pass++){ctx.save();if(pass===1){ctx.translate(0,H/2+80+260);ctx.scale(1,-1);ctx.translate(0,-(H/2+80));ctx.globalAlpha=.16}
      for(const l of L.L){if(l.ch===' '||l.a<.01)continue;const a=l.a*hum*sg(l),pk=[255,60,190],bl=[70,180,255],c=l.k<.5?pk:bl;
        ctx.save();ctx.globalAlpha*=a;ctx.font=`400 330px "Bebas Neue"`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineJoin='round';
        for(const [lw,b,al] of [[18,90,.5],[12,40,.8]]){ctx.shadowColor=rgba(c,1);ctx.shadowBlur=b*S;ctx.strokeStyle=rgba(c,al);ctx.lineWidth=lw;ctx.strokeText(l.ch,l.x,H/2-20)}
        ctx.shadowBlur=0;ctx.strokeStyle=rgba(mixc(c,[255,255,255],.75),1);ctx.lineWidth=4;ctx.strokeText(l.ch,l.x,H/2-20);ctx.restore()}ctx.restore()}
    if(bd.p>0){const x=W/2-L.tot/2-70,y=H/2-250,w=L.tot+140,h=460;ctx.save();ctx.shadowColor='rgba(70,220,255,1)';ctx.shadowBlur=30*S;ctx.strokeStyle='rgba(120,230,255,.95)';ctx.lineWidth=5;ctx.setLineDash([(2*(w+h))*1,(2*(w+h))*2]);ctx.lineDashOffset=(2*(w+h))*(1-bd.p);roundRect(x,y,w,h,36);ctx.stroke();ctx.restore()}};
};
/* 12 AUDIO SPECTRUM */
C[12]=()=>{const R=rng(12),N=64,bars=[],env={k:0},sh={e:1};newTL();
  for(let i=0;i<20;i++)tl.add(env,{k:[{to:1,duration:50,ease:'outQuad'},{to:0,duration:450,ease:'outCubic'}]},i*500);
  for(let i=0;i<5;i++)tl.add(sh,{e:[0,1],duration:1000,ease:'outCubic'},i*2000);
  for(let i=0;i<N;i++)bars.push({e:Math.pow(1-i/N,.7)*.8+.2,c:3+((R()*12)|0),ph:R()});
  draw=()=>{clear();const ms=now(),cx=W/2,cy=H/2,r0=270*(1+.04*env.k);ctx.globalCompositeOperation='lighter';
    ctx.globalAlpha=.25+.25*env.k;ctx.drawImage(spr([90,120,255],256),cx-520,cy-520,1040,1040);ctx.globalAlpha=1;
    for(let i=0;i<5;i++){}
    ctx.lineCap='round';for(let m=0;m<2;m++)for(let i=0;i<N;i++){const b=bars[i],v=clamp(b.e*(.5+.5*env.k)*(.45+.55*Math.abs(Math.sin(TAU*(b.c*ms/10000+b.ph)))),0,1),len=22+v*300,a=-Math.PI/2+(m?-1:1)*(i+.5)/N*Math.PI,hue=(a*57.3+ms*.03+200)%360,c=hsl(hue,95,62);
      ctx.strokeStyle=hsl(hue,95,60,.22);ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0);ctx.lineTo(cx+Math.cos(a)*(r0+len),cy+Math.sin(a)*(r0+len));ctx.stroke();
      ctx.strokeStyle=c;ctx.lineWidth=8;ctx.stroke()}
    ctx.globalCompositeOperation='source-over';ctx.beginPath();ctx.arc(cx,cy,r0-16,0,TAU);ctx.fillStyle='#05060c';ctx.fill();const gr=ctx.createLinearGradient(cx-r0,cy-r0,cx+r0,cy+r0);gr.addColorStop(0,'#19d3ff');gr.addColorStop(.5,'#7a5cff');gr.addColorStop(1,'#ff4fd8');
    ctx.strokeStyle=gr;ctx.lineWidth=5+4*env.k;ctx.shadowColor='rgba(120,150,255,.9)';ctx.shadowBlur=30*S;ctx.stroke();ctx.shadowBlur=0;
    for(let i=0;i<120;i++){const a=i/120*TAU+ms/10000*TAU*.5,rr=r0+320;ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);ctx.lineTo(cx+Math.cos(a)*(rr+(i%5?8:18)),cy+Math.sin(a)*(rr+(i%5?8:18)));ctx.stroke()}
    if(sh.e<1){ctx.strokeStyle=`rgba(150,170,255,${(1-sh.e)*.6})`;ctx.lineWidth=4;ctx.beginPath();ctx.arc(cx,cy,r0+sh.e*380,0,TAU);ctx.stroke()}};
};
/* 13 GOLD SPARKLE DUST OVERLAY (loop) */
C[13]=()=>{const R=rng(13),sp=[],bk=[],pu={};newTL();
  for(let i=0;i<230;i++)sp.push({x:R()*W,y0:R(),k:1+((R()*2)|0),c:2+((R()*5)|0),ph:R(),r:5+Math.pow(R(),2)*26,col:R()<.6?[255,214,140]:(R()<.5?[255,255,255]:[255,180,90]),flare:R()<.55,sc:1,sx:20+R()*40});
  for(let i=0;i<16;i++)bk.push({x:R()*W,y0:R(),k:1,r:80+R()*160,ph:R(),sc:1});
  tl.add(sp,{sc:[{to:1.5,duration:2500,ease:'inOutSine'},{to:1,duration:2500,ease:'inOutSine'}],delay:stagger(8)},0);tl.add(sp,{sc:[{to:1.5,duration:2500,ease:'inOutSine'},{to:1,duration:2500,ease:'inOutSine'}],delay:stagger(8)},5000);
  draw=()=>{clear();const ms=now(),u=ms/10000;ctx.globalCompositeOperation='lighter';
    for(const b of bk){const y=(fr(b.y0-u*b.k*.5)*(H+400))-200;ctx.globalAlpha=.07*(.5+.5*Math.sin(TAU*(2*u+b.ph)));ctx.drawImage(spr([255,200,120],128),b.x-b.r,y-b.r,b.r*2,b.r*2)}
    for(const s of sp){const y=fr(s.y0-u*s.k*.6)*(H+80)-40,x=s.x+s.sx*Math.sin(TAU*u*s.k+s.ph*TAU),tw=Math.pow(Math.max(0,Math.sin(TAU*(s.c*u+s.ph))),2),r=s.r*s.sc;if(tw<.01)continue;
      ctx.globalAlpha=tw*.7;ctx.drawImage(spr(s.col,64),x-r*1.4,y-r*1.4,r*2.8,r*2.8);if(s.flare)flare(x,y,r*1.5,tw,rgba(mixc(s.col,[255,255,255],.5),1));else{ctx.globalAlpha=tw;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,Math.max(1.2,r*.1),0,TAU);ctx.fill()}}ctx.globalAlpha=1};
};
/* 14 CONFETTI CANNONS */
C[14]=()=>{const R=rng(14),vol=[],pal=[[255,70,110],[255,200,60],[70,210,255],[140,110,255],[80,230,150],[255,140,50],[255,255,255]];newTL();
  [[300,0],[2000,1],[3700,2],[5400,3],[7000,4],[8400,5]].forEach(([t,k])=>{for(const side of [-1,1]){const ps=[];const x0=side<0?-20:W+20;for(let i=0;i<170;i++){const ang=(side<0?-(Math.PI/2.5):-(Math.PI-Math.PI/2.5))+(R()-.5)*1.0,v=1000+R()*1300;ps.push({vx:Math.cos(ang)*v,vy:Math.sin(ang)*v,c:pal[(R()*7)|0],ph:R()*TAU,f:3+R()*5,w:12+R()*10,rs:(R()-.5)*8,x0,y0:H+10})}vol.push({t,ps,x0})}});
  const fl=[];vol.forEach(v=>fl.push({a:0}));vol.forEach((v,i)=>tl.add(fl[i],{a:[1,0],duration:400,ease:'outCubic'},v.t));
  draw=()=>{clear();const ms=now();
    vol.forEach((v,i)=>{const t=(ms-v.t)/1000;if(t<0||t>7)return;if(fl[i].a>0){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=fl[i].a;ctx.drawImage(spr([255,220,150],128),v.x0-200,H-200,400,400);ctx.globalCompositeOperation='source-over'}
      for(const p of v.ps){const k=1.6,d=(1-Math.exp(-k*t))/k,x=p.x0+p.vx*d,y=p.y0+p.vy*d+.5*900*t*t*.6;if(y>H+60||x<-60||x>W+60)continue;const fl2=Math.cos(TAU*p.f*t+p.ph);ctx.save();ctx.translate(x,y);ctx.rotate(p.rs*t+p.ph);ctx.scale(1,fl2);ctx.globalAlpha=Math.min(1,(7-t)/1.2);ctx.fillStyle=rgba(p.c,1);ctx.fillRect(-p.w/2,-p.w*.28,p.w,p.w*.56);ctx.restore()}});ctx.globalAlpha=1};
};
