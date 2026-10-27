/* 1 LOADING RING */
C[1]=()=>{const g={v:0,f:0,e:0};newTL();
  tl.add(g,{f:[0,1],duration:700,ease:'outCubic'},0);
  tl.add(g,{v:[{to:.34,duration:2100,ease:'inOutCubic'},{to:.39,duration:1000},{to:.76,duration:2000,ease:'inOutCubic'},{to:.83,duration:1100},{to:1,duration:900,ease:'inOutCubic'}]},700);
  tl.add(g,{e:[0,1],duration:1400,ease:'outCubic'},7900);tl.add(g,{f:[1,0],duration:600,ease:'inQuad'},9400);
  const dw=tw('LOADING...','Orbitron',700,40,18);
  draw=()=>{clear();const ms=now(),cx=W/2,cy=H/2-50,R=215,a0=-Math.PI/2,v=g.v;ctx.globalAlpha=g.f;
    for(let i=0;i<72;i++){const a=a0+i/72*TAU,on=i/72<=v,r1=R+48,r2=r1+(i%6===0?28:14);ctx.strokeStyle=on?'rgba(130,225,255,.95)':'rgba(255,255,255,.12)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);ctx.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2);ctx.stroke()}
    ctx.beginPath();ctx.arc(cx,cy,R,0,TAU);ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=18;ctx.stroke();
    if(v>.002){const gr=ctx.createConicGradient(a0,cx,cy);gr.addColorStop(0,'#19d3ff');gr.addColorStop(.55,'#7a5cff');gr.addColorStop(1,'#ff4fd8');ctx.lineCap='round';ctx.strokeStyle=gr;
      for(const [lw,al] of [[44,.1],[28,.22],[16,1]]){ctx.globalAlpha=g.f*al;ctx.lineWidth=lw;ctx.beginPath();ctx.arc(cx,cy,R,a0,a0+v*TAU);ctx.stroke()}
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=g.f;const ha=a0+v*TAU;ctx.drawImage(spr([255,120,230],128),cx+Math.cos(ha)*R-50,cy+Math.sin(ha)*R-50,100,100);ctx.globalCompositeOperation='source-over'}
    ctx.globalAlpha=g.f;txt(Math.round(v*100)+'%',cx,cy-6,{f:'Orbitron',w:900,size:128,glow:[['rgba(80,200,255,.8)',40]]});
    if(g.e>0&&g.e<1){ctx.strokeStyle=rgba([140,220,255],(1-g.e)*.9);ctx.lineWidth=6;ctx.beginPath();ctx.arc(cx,cy,R+g.e*260,0,TAU);ctx.stroke()}
    const s=v>=1?'COMPLETE':'LOADING'+'.'.repeat(Math.floor(ms/350)%4);
    txt(s,v>=1?cx:cx-dw/2,cy+R+150,{f:'Orbitron',w:700,size:40,ls:18,al:v>=1?'center':'left',fill:'rgba(190,210,255,.85)'})};
};
/* 2 SUBSCRIBE + BELL */
C[2]=()=>{const b={sc:0,press:0,done:0,rp:0},bl={sc:0,rot:0,dot:0,press:0},cu={x:W/2+520,y:H/2+420,sc:1,a:0},o={out:0};newTL();
  tl.add(b,{sc:[0,1],duration:1100,ease:'outElastic(1,.55)'},200);tl.add(bl,{sc:[0,1],duration:1100,ease:'outElastic(1,.55)'},500);
  tl.add(cu,{a:[0,1],duration:300},1200);tl.add(cu,{x:W/2-170,y:H/2+20,duration:1100,ease:'inOutCubic'},1300);
  tl.add(cu,{sc:[1,.82],duration:110},2500);tl.add(b,{press:[0,1],duration:110},2500);tl.add(b,{rp:[0,1],duration:800,ease:'outCubic'},2520);tl.add(cu,{sc:[.82,1],duration:160},2620);tl.add(b,{press:[1,0],duration:160},2620);
  tl.add(b,{done:[0,1],duration:300,ease:'inOutQuad'},2640);
  tl.add(cu,{x:W/2+372,y:H/2+28,duration:900,ease:'inOutCubic'},3300);
  tl.add(cu,{sc:[1,.82],duration:110},4300);tl.add(bl,{press:[0,1],duration:110},4300);tl.add(cu,{sc:[.82,1],duration:160},4410);tl.add(bl,{press:[1,0],duration:160},4410);
  tl.add(bl,{rot:[{to:.5,duration:140,ease:'outQuad'},{to:-.42,duration:260,ease:'inOutSine'},{to:.34,duration:240,ease:'inOutSine'},{to:-.26,duration:240,ease:'inOutSine'},{to:.18,duration:230,ease:'inOutSine'},{to:-.1,duration:220,ease:'inOutSine'},{to:0,duration:200,ease:'inOutSine'}]},4300);
  tl.add(bl,{dot:[0,1],duration:600,ease:'outElastic(1,.5)'},4400);tl.add(cu,{a:[1,0],duration:400},5200);tl.add(o,{out:[0,1],duration:600,ease:'inQuad'},9300);
  const bx=W/2-130,by=H/2,bw=540,bh=150,bellx=W/2+390,belly=H/2;
  const bellp=(s)=>{ctx.beginPath();ctx.moveTo(-.7*s,.45*s);ctx.lineTo(.7*s,.45*s);ctx.bezierCurveTo(.5*s,.3*s,.5*s,-.1*s,.45*s,-.3*s);ctx.bezierCurveTo(.35*s,-.65*s,.12*s,-.8*s,0,-.8*s);ctx.bezierCurveTo(-.12*s,-.8*s,-.35*s,-.65*s,-.45*s,-.3*s);ctx.bezierCurveTo(-.5*s,-.1*s,-.5*s,.3*s,-.7*s,.45*s);ctx.closePath()};
  draw=()=>{clear();ctx.globalAlpha=1-o.out;
    ctx.save();ctx.translate(bx,by);const sc=Math.max(0,b.sc)*(1-.06*b.press);ctx.scale(sc,sc);
    const col=mixc([232,32,32],[58,58,64],b.done);ctx.shadowColor=rgba(mixc([255,40,40],[90,90,100],b.done),.55);ctx.shadowBlur=40*S;ctx.fillStyle=rgba(col,1);roundRect(-bw/2,-bh/2,bw,bh,bh/2);ctx.fill();ctx.shadowBlur=0;
    ctx.fillStyle='rgba(255,255,255,.1)';roundRect(-bw/2+8,-bh/2+6,bw-16,bh/2-6,bh/4);ctx.fill();
    txt('SUBSCRIBE',0,4,{w:800,size:58,ls:5,a:1-b.done});txt('SUBSCRIBED',0,4,{w:800,size:56,ls:4,a:b.done,fill:'#d6d6dc'});ctx.restore();
    if(b.rp>0&&b.rp<1){ctx.strokeStyle=`rgba(255,255,255,${(1-b.rp)*.7})`;ctx.lineWidth=5;roundRect(bx-bw/2-b.rp*70,by-bh/2-b.rp*70,bw+b.rp*140,bh+b.rp*140,bh/2+b.rp*70);ctx.stroke()}
    ctx.save();ctx.translate(bellx,belly);const bs=Math.max(0,bl.sc)*(1-.08*bl.press);ctx.scale(bs,bs);
    ctx.fillStyle='rgba(255,255,255,.08)';ctx.beginPath();ctx.arc(0,0,92,0,TAU);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=3;ctx.stroke();
    ctx.save();ctx.translate(0,-62);ctx.rotate(bl.rot);ctx.translate(0,62-8);ctx.fillStyle='#fff';ctx.shadowColor='rgba(255,255,255,.4)';ctx.shadowBlur=24*S;bellp(70);ctx.fill();ctx.beginPath();ctx.arc(0,.62*70,12,0,Math.PI);ctx.fill();ctx.beginPath();ctx.arc(0,-.86*70,6,0,TAU);ctx.fill();ctx.restore();
    if(bl.dot>0){ctx.shadowColor='rgba(255,40,40,.8)';ctx.shadowBlur=20*S;ctx.fillStyle='#ff2d2d';ctx.beginPath();ctx.arc(52,-52,24*bl.dot,0,TAU);ctx.fill();ctx.shadowBlur=0;txt('1',52,-51,{size:28*bl.dot,w:800})}ctx.restore();
    if(cu.a>0){ctx.save();ctx.globalAlpha=(1-o.out)*cu.a;ctx.translate(cu.x,cu.y);ctx.scale(cu.sc*1.5,cu.sc*1.5);ctx.beginPath();[[0,0],[0,32],[8,25],[14,38],[20,35],[14,23],[24,23]].forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle='#fff';ctx.strokeStyle='#111';ctx.lineWidth=2;ctx.fill();ctx.stroke();ctx.restore()}};
};
/* 3 COUNTDOWN 10 TO 1 */
C[3]=()=>{const sec=[];newTL();for(let i=0;i<10;i++)sec.push({e:0,r:0,f:0,s:0});
  sec.forEach((q,i)=>{tl.add(q,{e:[0,1],duration:520,ease:'outExpo'},i*1000);tl.add(q,{r:[0,1],duration:1000},i*1000);tl.add(q,{f:[0,1],duration:100},i*1000);tl.add(q,{f:[1,0],duration:220,ease:'inQuad'},i*1000+770);tl.add(q,{s:[0,1],duration:700,ease:'outCubic'},i*1000)});
  draw=()=>{clear();const cx=W/2,cy=H/2,R=330,a0=-Math.PI/2;
    for(let i=0;i<10;i++){const q=sec[i],n=10-i;if(q.f<=.002&&q.e<=0)continue;const hot=n<=3,c1=hot?[255,90,60]:[40,220,255],c2=hot?[255,190,70]:[150,110,255];
      ctx.globalAlpha=q.f;ctx.lineCap='round';
      ctx.beginPath();ctx.arc(cx,cy,R,0,TAU);ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=14;ctx.stroke();
      const gr=ctx.createConicGradient(a0,cx,cy);gr.addColorStop(0,rgba(c1,1));gr.addColorStop(1,rgba(c2,1));ctx.strokeStyle=gr;
      for(const [lw,al] of [[36,.12],[22,.25],[12,1]]){ctx.globalAlpha=q.f*al;ctx.lineWidth=lw;ctx.beginPath();ctx.arc(cx,cy,R,a0,a0+q.r*TAU);ctx.stroke()}
      ctx.globalAlpha=q.f;for(let k=0;k<60;k++){const a=k/60*TAU+a0,on=k/60<=q.r;ctx.strokeStyle=on?rgba(c1,.9):'rgba(255,255,255,.1)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*(R+34),cy+Math.sin(a)*(R+34));ctx.lineTo(cx+Math.cos(a)*(R+(k%5?48:62)),cy+Math.sin(a)*(R+(k%5?48:62)));ctx.stroke()}
      if(q.s<1){ctx.strokeStyle=rgba(c1,(1-q.s)*.8);ctx.lineWidth=8;ctx.beginPath();ctx.arc(cx,cy,R+q.s*240,0,TAU);ctx.stroke()}
      ctx.globalAlpha=q.f;txt(String(n),cx,cy+10,{f:'Orbitron',w:900,size:430,sc:lerp(1.45,1,q.e),glow:[[rgba(c1,.9),70],[rgba(c1,.5),130]]})}};
};
/* 4 HAPPY MOTHER'S DAY */
C[4]=()=>{const R=rng(41),L=mkL("Happy Mother's Day",'Great Vibes',400,200,W/2,2),sub=mkL('with all my love','Playfair Display',700,54,W/2,4),hs=[],st=[],sh={p:-.3},su={a:0};newTL();
  const gold=[255,214,140],pink=[255,110,160];
  L.L.forEach((l,i)=>{l.y=46;l.sc=.55;tl.add(l,{a:[0,1],y:[46,0],sc:[.55,1],duration:900,ease:'outBack'},1100+i*75)});
  sub.L.forEach((l,i)=>{tl.add(l,{a:[0,.9],duration:500},4300+i*45)});
  for(let i=0;i<46;i++)hs.push({x:R()*W,y0:R()*(H+300),sp:30+R()*70,s:16+R()*44,ph:R()*TAU,c:R()<.7?pink:(R()<.5?[255,170,190]:gold),al:.25+R()*.6,pu:1});
  for(let i=0;i<26;i++)st.push({x:W/2+(R()-.5)*1300,y:H/2+(R()-.5)*420,r:10+R()*22,tw:0});
  tl.add(hs,{pu:[{to:1.2,duration:700,ease:'inOutSine'},{to:1,duration:700,ease:'inOutSine'}],delay:stagger(25)},0);
  for(let k=1;k<7;k++)tl.add(hs,{pu:[{to:1.2,duration:700,ease:'inOutSine'},{to:1,duration:700,ease:'inOutSine'}],delay:stagger(25)},k*1400);
  for(let k=0;k<5;k++)tl.add(st,{tw:[{to:1,duration:500,ease:'inOutSine'},{to:0,duration:700,ease:'inOutSine'}],delay:stagger(70)},1500+k*1700);
  tl.add(sh,{p:[-.3,1.3],duration:2200,ease:'inOutSine'},5200);
  draw=()=>{clear();const ms=now();ctx.globalCompositeOperation='lighter';
    for(const h of hs){const y=H+120-((h.y0+ms/1000*h.sp)%(H+300)),x=h.x+34*Math.sin(ms/1000*.9+h.ph),s=h.s*h.pu;ctx.globalAlpha=h.al*.5;ctx.drawImage(spr(h.c,96),x-s*1.4,y+s*.4-s*1.4,s*2.8,s*2.8);ctx.globalAlpha=h.al;ctx.fillStyle=rgba(h.c,1);heart(x,y,s)
      ;ctx.fill()}
    ctx.globalCompositeOperation='source-over';
    const g=(l)=>{const t=l.k,hh=Math.abs(t-sh.p);const base=mixc(pink,gold,t),k=Math.max(0,1-hh/.09);return rgba(mixc(base,[255,255,255],k),1)};
    drawL(L,H/2-20,{fill:g,glow:[['rgba(255,120,170,.8)',50],['rgba(255,200,150,.5)',90]]});drawL(sub,H/2+140,{fill:'#ffe3c4',glow:[['rgba(255,170,150,.6)',24]]});
    ctx.globalCompositeOperation='lighter';for(const s of st)if(s.tw>.01)flare(s.x,s.y,s.r*(.5+s.tw),s.tw,'#ffe6b0');ctx.globalAlpha=1};
};
/* 5 HAPPY NEW YEAR 2027 */
C[5]=()=>{const R=rng(55),bs=[],roll={p:0},hl=mkL('HAPPY NEW YEAR','Montserrat',800,64,W/2,22),dg={a:0},cols=[[255,200,90],[255,120,90],[110,200,255],[255,255,255],[190,130,255],[120,255,190]];newTL();
  const T=[500,1400,2300,3100,4000,4900,5700,6600,7400,8300,9000];T.forEach((t,i)=>bs.push(mkBurst(R,t+700,260+R()*1400,150+R()*420,cols[i%6],['peony','ring','willow','peony','palm','crackle','heart','peony','ring','willow','crackle'][i],.9+R()*.3)));
  tl.add(dg,{a:[0,1],duration:1200,ease:'outCubic'},300);tl.add(roll,{p:[0,1],duration:1000,ease:'inOutBack'},3600);hl.L.forEach((l,i)=>{l.y=-30;tl.add(l,{a:[0,1],y:[-30,0],duration:600,ease:'outCubic'},4600+i*60)});
  draw=()=>{clear();const ms=now();drawBursts(bs,ms,true);const g=ctx.createRadialGradient(W/2,H/2,100,W/2,H/2,800);g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    const size=360,fw=tw('2','Montserrat',900,size,0),total=fw*4+30,x0=W/2-total/2,cy=H/2+60;ctx.save();ctx.globalAlpha=dg.a;
    const grad=ctx.createLinearGradient(0,cy-180,0,cy+180);grad.addColorStop(0,'#fff3c4');grad.addColorStop(.5,'#ffc85a');grad.addColorStop(1,'#d98a1f');
    for(let i=0;i<3;i++)txt(['2','0','2'][i],x0+fw*(i+.5)+i*10,cy,{w:900,size,fill:grad,glow:[['rgba(255,190,70,.8)',60]]});
    ctx.save();ctx.beginPath();ctx.rect(x0+fw*3+30,cy-210,fw+20,420);ctx.clip();const dx=x0+fw*3.5+30;
    txt('6',dx,cy-roll.p*330,{w:900,size,fill:grad,a:1-roll.p,glow:[['rgba(255,190,70,.8)',60]]});txt('7',dx,cy+330-roll.p*330,{w:900,size,fill:grad,a:roll.p,glow:[['rgba(255,190,70,.8)',60]]});ctx.restore();ctx.restore();
    drawL(hl,H/2-250,{fill:'#fff',glow:[['rgba(255,220,150,.8)',26]]})};
};
/* 6 MERRY CHRISTMAS */
C[6]=()=>{const R=rng(66),L=mkL('Merry Christmas','Great Vibes',400,250,W/2,3),sub=mkL('and a Happy New Year','Playfair Display',700,56,W/2,3),sn=[],bulbs=[],pu={s:0},cc=[[255,60,60],[255,200,80],[70,220,120],[90,170,255]];newTL();
  L.L.forEach((l,i)=>{l.sc=1.7;tl.add(l,{a:[0,1],sc:[1.7,1],duration:1000,ease:'outCubic'},800+i*80)});sub.L.forEach((l,i)=>tl.add(l,{a:[0,.95],duration:500},3600+i*40));
  for(let i=0;i<280;i++)sn.push({x:R()*W,y0:R()*(H+80),v:1+(R()*3|0),s:1.5+R()*5,ph:R()*TAU,a:.3+R()*.7});
  for(let sw=0;sw<3;sw++)for(let i=0;i<=10;i++){const u=i/10,x=sw*W/3+u*W/3,y=40+90*(1-Math.pow(2*u-1,2));bulbs.push({x,y,c:cc[(i+sw)%4],ph:i*.7+sw,tw:0})}
  tl.add(pu,{s:[{to:1,duration:2500,ease:'inOutSine'},{to:0,duration:2500,ease:'inOutSine'}]},0);tl.add(pu,{s:[{to:1,duration:2500,ease:'inOutSine'},{to:0,duration:2500,ease:'inOutSine'}]},5000);
  draw=()=>{clear();const ms=now();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.25+.2*pu.s;const gs=520+60*pu.s;ctx.drawImage(spr([255,190,90],256),W/2-gs,H/2-gs*.55,gs*2,gs*1.1);
    for(const f of sn){const y=(f.y0+ms/10000*H*1.15*f.v*.5)%(H+80)-40,x=f.x+30*Math.sin(TAU*(ms/10000)*f.v+f.ph);ctx.globalAlpha=f.a;ctx.drawImage(spr([220,235,255],32),x-f.s*2,y-f.s*2,f.s*4,f.s*4)}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=.5;ctx.strokeStyle='#1c2a1f';ctx.lineWidth=3;for(let sw=0;sw<3;sw++){ctx.beginPath();for(let i=0;i<=40;i++){const u=i/40,x=sw*W/3+u*W/3,y=40+90*(1-Math.pow(2*u-1,2));i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke()}
    ctx.globalCompositeOperation='lighter';for(const b of bulbs){const br=.55+.45*Math.sin(TAU*2*ms/10000+b.ph);ctx.globalAlpha=br;ctx.drawImage(spr(b.c,64),b.x-34,b.y-34+14,68,68);ctx.globalAlpha=1;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(b.x,b.y+14,4,0,TAU);ctx.fill()}
    ctx.globalCompositeOperation='source-over';drawL(L,H/2-30,{fill:l=>rgba(mixc([255,235,200],[255,120,110],Math.abs(l.k-.5)*2),1),glow:[['rgba(255,70,70,.85)',44],['rgba(255,190,120,.5)',90]]});drawL(sub,H/2+170,{fill:'#ffe9c8',glow:[['rgba(255,150,100,.5)',20]]})};
};
/* 7 BLACK FRIDAY NEON */
C[7]=()=>{const L=mkL('BLACK FRIDAY','Bebas Neue',400,360,W/2,14),b={bar:0,off:0,sw:0},o={sl:0};newTL();
  L.L.forEach((l,i)=>{tl.add(l,{a:[{to:0,duration:1},{to:.95,duration:70},{to:.1,duration:60},{to:1,duration:90},{to:.35,duration:70},{to:1,duration:100}]},500+i*220)});
  tl.add(b,{bar:[0,1],duration:1000,ease:'outExpo'},300);tl.add(o,{sl:[0,1],duration:700,ease:'outExpo'},4200);tl.add(b,{sw:[0,1],duration:1400,ease:'inOutQuad'},5200);
  const fl=[[6200,90],[6290,70],[6420,50],[8100,60],[8190,50]];
  draw=()=>{clear();const ms=now();let dim=1;for(const [t,d] of fl)if(ms>t&&ms<t+d)dim=.35;ctx.globalAlpha=1;
    for(const yy of [H/2-300,H/2+110]){const w=b.bar*1100;ctx.shadowColor='rgba(255,40,70,.9)';ctx.shadowBlur=30*S;ctx.fillStyle='#ff4a6a';roundRect(W/2-w/2,yy-4,w,8,4);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#fff';roundRect(W/2-w/2,yy-1.5,w,3,2);ctx.fill()}
    drawL(L,H/2-100,{ga:dim,fill:'#ffe9ee',glow:[['rgba(255,30,80,.95)',90],['rgba(255,30,80,.8)',45],['rgba(255,120,150,.9)',14]]});
    const a=o.sl;ctx.save();ctx.globalAlpha=a;txt('SALE',W/2-440+(1-a)*-500,H/2+230,{w:800,f:'Montserrat',size:140,ls:12,fill:'#ffd84a',glow:[['rgba(255,190,0,.9)',50]]});
    txt('UP TO 70% OFF',W/2+300+(1-a)*500,H/2+230,{w:800,size:90,ls:4,fill:'#fff',glow:[['rgba(255,60,100,.8)',40]]});ctx.restore();
    if(b.sw>0&&b.sw<1){ctx.save();ctx.globalCompositeOperation='lighter';const x=lerp(-200,W+200,b.sw);const g=ctx.createLinearGradient(x-160,0,x+160,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,200,210,.22)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(x-160,H/2-300,320,420);ctx.restore()}};
};
