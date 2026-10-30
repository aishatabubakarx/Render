/* 5 FACELESS HOODED HACKER + FLYING CODE (loop) - near-black, code green #00FF8C, alert red #FF2D4D */
C[5]=()=>{newTL();const R=rng(505),vpx=W/2,vpy=H*.4;
  const SYM='01010101ABCDEF23456789<>/{}[]#$%&*=+';
  const cols=Array.from({length:70},(_,i)=>({x:(i+.5)*W/70,sp:1+((R()*3)|0),off:R(),len:8+((R()*16)|0),sz:16+((R()*10)|0),al:.25+R()*.5}));
  const WORDS=['0x7F3A','root','sudo','1011','inject','bypass','DROP','0xFF','exec()','kernel','decrypt','payload','0x1A9C','ssh','SELECT *','10110','token','proxy','cipher','NULL','$_POST','rm -rf','0xDEAD','fetch','packet','1001'];
  const fl=Array.from({length:170},()=>({a:R()*TAU,p:R(),k:1+((R()*2)|0),t:WORDS[(R()*WORDS.length)|0],red:R()<.1,ft:R()<.4,sz:.6+R()*.8}));
  const lines=(n)=>Array.from({length:n},()=>({l:20+((R()*160)|0),x:((R()*3)|0)*18,red:R()<.1}));
  const pan=[{x:130,y:210,w:440,h:300,L:lines(11),ph:0},{x:1360,y:250,w:430,h:340,L:lines(12),ph:2}];
  const hood=by=>{ctx.beginPath();ctx.moveTo(960,by+240);ctx.bezierCurveTo(1100,by+240,1190,by+360,1180,by+520);ctx.bezierCurveTo(1176,by+610,1150,by+680,1130,by+740);ctx.bezierCurveTo(1280,by+780,1520,by+850,1600,by+1120);ctx.lineTo(320,by+1120);ctx.bezierCurveTo(400,by+850,640,by+780,790,by+740);ctx.bezierCurveTo(770,by+680,744,by+610,740,by+520);ctx.bezierCurveTo(730,by+360,820,by+240,960,by+240);ctx.closePath()};
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR,by=6*Math.sin(th*2),alert=Math.max(0,Math.sin(th*3-.4))**10;bgRad('#031208','#000203',W/2,H*.45,H*1.1);
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.5;ctx.drawImage(spr([0,200,110],256),vpx-760,vpy-560,1520,1120);
    ctx.globalAlpha=alert*.5;ctx.drawImage(spr([255,30,60],256),vpx-900,vpy-600,1800,1200);
    ctx.font='700 20px "JetBrains Mono"';ctx.textAlign='center';ctx.textBaseline='middle';
    for(const c of cols){const L=c.len,head=((c.off+u*c.sp)%1)*(H+L*c.sz*1.1);ctx.font=`700 ${c.sz}px "JetBrains Mono"`;for(let k=0;k<L;k++){const y=head-k*c.sz*1.1;if(y<-20||y>H+20)continue;const a=(1-k/L)**1.8*c.al;ctx.globalAlpha=a;ctx.fillStyle=k===0?'#d8ffe9':'#00ff8c';ctx.fillText(SYM[((Math.floor(u*Math.round(DUR/110))%Math.round(DUR/110))+k*7+Math.floor(c.x))%SYM.length],c.x,y)}}
    const fly=(front)=>{for(const f of fl){if(f.ft!==front)continue;const s=fr(u*f.k+f.p),d=s**2.3*1250,x=vpx+Math.cos(f.a)*d*1.5,y=vpy+Math.sin(f.a)*d*.95,sz=(10+s**2.2*70)*f.sz,al=Math.sin(Math.PI*Math.min(1,s*1.15))*(front?.9:.7);if(al<.03)continue;if(front&&Math.hypot(x-960,y-505)<250*(.6+f.sz*.4))continue;ctx.globalAlpha=al;ctx.font=`700 ${sz}px "JetBrains Mono"`;ctx.fillStyle=f.red?'#ff4560':(s>.85?'#eafff3':'#00ff8c');ctx.fillText(f.t,x,y)}};
    ctx.globalCompositeOperation='lighter';fly(false);
    for(const p of pan){const y=p.y+10*Math.sin(th*2+p.ph);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=.34;ctx.fillStyle='#02150b';ctx.fillRect(p.x,y,p.w,p.h);ctx.globalAlpha=.55;ctx.strokeStyle='#00ff8c';ctx.lineWidth=1.5;ctx.strokeRect(p.x,y,p.w,p.h);ctx.fillStyle='#00ff8c';ctx.fillRect(p.x,y,p.w,22);
      const nl=p.L.length,typ=(u*3+p.ph*.1)%1;p.L.forEach((l,i)=>{const w=l.l*Math.min(1,Math.max(0,typ*nl*1.3-i*.9));ctx.globalAlpha=.7;ctx.fillStyle=l.red?'#ff4560':'#00ff8c';ctx.fillRect(p.x+16+l.x,y+40+i*24,w,6)})}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    const g=ctx.createLinearGradient(0,by+240,0,by+1080);g.addColorStop(0,'#04100a');g.addColorStop(1,'#000');ctx.fillStyle=g;hood(by);ctx.fill();
    ctx.globalCompositeOperation='lighter';ctx.lineJoin='round';for(const [lw,al] of [[14,.05],[5,.14],[2,.6]]){ctx.lineWidth=lw;ctx.globalAlpha=al*(1+alert*.8);ctx.strokeStyle=alert>.4?'#ff5570':'#2dffa0';hood(by);ctx.stroke()}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(960,by+505,120,152,0,0,TAU);ctx.fill();
    ctx.globalCompositeOperation='lighter';ctx.strokeStyle='#00ff8c';ctx.lineWidth=2;ctx.globalAlpha=.45;ctx.beginPath();ctx.ellipse(960,by+505,120,152,0,0,TAU);ctx.stroke();ctx.globalAlpha=.16;ctx.lineWidth=9;ctx.stroke();
    ctx.save();ctx.beginPath();ctx.ellipse(960,by+505,116,148,0,0,TAU);ctx.clip();const fi=Math.floor(u*Math.round(DUR/70))%Math.round(DUR/70),rr=rng(fi*13+5);ctx.globalAlpha=.9;if(fi%5<2){for(let k=0;k<5;k++){const y=by+400+rr()*220,w=40+rr()*160;ctx.fillStyle=rr()<.2?'#ff3355':'#00ff8c';ctx.globalAlpha=.4+rr()*.4;ctx.fillRect(900+rr()*40-20+(rr()-.5)*60,y,w,2+rr()*5)}}
    ctx.globalAlpha=.07;ctx.fillStyle='#00ff8c';for(let y=by+350;y<by+660;y+=4)ctx.fillRect(820,y,280,1);ctx.restore();
        fly(true);ctx.globalAlpha=alert*.9;ctx.fillStyle='#ff2d4d';ctx.font='900 30px "Orbitron"';ctx.fillText('ALERT  //  INTRUSION DETECTED',W/2,120);
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.7,[2,4]);vignette(.62);grain(.035)}};

/* 6 DIGITAL CLOUD + 5G DATA EXCHANGE (loop) - navy #040a1e, cyan #36D8FF, violet #8E6BFF, white */
C[6]=()=>{newTL();const R=rng(606),cx=W/2,cy=H/2-30,CY='#36d8ff';
  const circ=[[-150,40,92],[-75,-20,118],[45,-52,140],[155,-8,104],[218,52,72]];
  const nodes=[{a:-2.55,g:'phone'},{a:-1.62,g:'chart'},{a:-.6,g:'laptop'},{a:.55,g:'server'},{a:1.57,g:'db'},{a:2.6,g:'tower'}].map(n=>({...n,x:cx+Math.cos(n.a)*660,y:cy+Math.sin(n.a)*340+(Math.sin(n.a)>.6?20:0),ph:R()*TAU,pk:R(),k:1+((R()*2)|0)}));
  const dust=Array.from({length:260},()=>({x:R()*W,y:R()*H,s:.7+R()*1.8,ph:R()*TAU,k:1+((R()*3)|0),a:.15+R()*.45}));
  const glyph=(g,x,y)=>{ctx.lineWidth=3;ctx.lineJoin='round';ctx.lineCap='round';ctx.beginPath();
    if(g==='phone'){ctx.roundRect(x-15,y-26,30,52,6);ctx.moveTo(x-5,y+19);ctx.lineTo(x+5,y+19)}
    else if(g==='laptop'){ctx.roundRect(x-27,y-20,54,34,4);ctx.moveTo(x-34,y+22);ctx.lineTo(x+34,y+22)}
    else if(g==='server'){for(let i=0;i<3;i++){ctx.roundRect(x-28,y-27+i*19,56,15,3);ctx.moveTo(x+14,y-19.5+i*19);ctx.lineTo(x+20,y-19.5+i*19)}}
    else if(g==='db'){ctx.ellipse(x,y-20,25,9,0,0,TAU);ctx.moveTo(x-25,y-20);ctx.lineTo(x-25,y+18);ctx.ellipse(x,y+18,25,9,0,0,Math.PI);ctx.moveTo(x+25,y+18);ctx.lineTo(x+25,y-20);ctx.moveTo(x-25,y);ctx.ellipse(x,y,25,9,0,0,Math.PI)}
    else if(g==='tower'){ctx.moveTo(x,y-6);ctx.lineTo(x-16,y+28);ctx.moveTo(x,y-6);ctx.lineTo(x+16,y+28);ctx.moveTo(x-9,y+14);ctx.lineTo(x+9,y+14);ctx.arc(x,y-8,13,-2.4,-.74);ctx.moveTo(x+19,y-8);ctx.arc(x,y-8,22,-2.5,-.64)}
    else{ctx.moveTo(x-26,y+24);ctx.lineTo(x+26,y+24);ctx.rect(x-22,y,10,24);ctx.rect(x-5,y-14,10,38);ctx.rect(x+12,y-28,10,52)}ctx.stroke()};
  const cloud=(fillTop)=>{for(const [x,y,r] of circ){ctx.beginPath();ctx.arc(cx+x,cy+y,r,0,TAU);fillTop?ctx.fill():ctx.stroke()}ctx.beginPath();ctx.roundRect(cx-230,cy+10,490,130,65);fillTop?ctx.fill():ctx.stroke()};
  draw=()=>{clear();const ms=now(),th=LOOP(ms);bgRad('#0a1536','#02040d');haze([60,70,220],.06,ms,1,th);
    ctx.globalCompositeOperation='lighter';
    for(const d of dust){ctx.globalAlpha=d.a*(.3+.7*Math.sin(th*d.k+d.ph)**2);ctx.fillStyle='#9fd8ff';ctx.fillRect(d.x,d.y,d.s,d.s)}
    for(let k=0;k<3;k++){const s=fr(th/TAU*3+k/3);ctx.globalAlpha=(1-s)*.35;ctx.strokeStyle=CY;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(cx+30,cy+40,260+s*620,150+s*330,0,0,TAU);ctx.stroke()}
    ctx.globalAlpha=.25;ctx.setLineDash([4,14]);ctx.strokeStyle='#8e9bff';ctx.lineWidth=1.6;ctx.beginPath();ctx.ellipse(cx,cy+10,660,350,0,th,th+TAU);ctx.stroke();ctx.setLineDash([]);
    for(const n of nodes){const by=Math.sin(th*2+n.ph)*10,ny=n.y+by,dx=n.x-cx,dy=ny-(cy+30),mx=cx+dx*.5+dy*.12,my=cy+30+dy*.5-dx*.08;
      ctx.globalAlpha=.4;ctx.strokeStyle='#58b8ff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx+dx*.2,cy+30+dy*.2);ctx.quadraticCurveTo(mx,my,n.x-dx*.12,ny-dy*.12);ctx.stroke();
      for(let p=0;p<5;p++){const s=fr(th/TAU*n.k*2+p/5+n.pk),dirOut=p%2===0,t2=dirOut?s:1-s,qx=(1-t2)**2*(cx+dx*.2)+2*(1-t2)*t2*mx+t2*t2*(n.x-dx*.12),qy=(1-t2)**2*(cy+30+dy*.2)+2*(1-t2)*t2*my+t2*t2*(ny-dy*.12);ctx.globalAlpha=Math.sin(s*Math.PI)*.95;ctx.drawImage(spr(dirOut?[54,216,255]:[170,130,255],64),qx-13,qy-13,26,26)}
      ctx.globalAlpha=.35;ctx.drawImage(spr([54,150,255],128),n.x-95,ny-95,190,190);ctx.globalAlpha=.9;ctx.strokeStyle=CY;ctx.lineWidth=3;ctx.beginPath();ctx.arc(n.x,ny,62,0,TAU);ctx.stroke();ctx.globalAlpha=.25;ctx.fillStyle='#0b2a60';ctx.fill();ctx.globalAlpha=.95;ctx.strokeStyle='#d8f6ff';glyph(n.g,n.x,ny)}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;const bob=Math.sin(th*2)*8;ctx.save();ctx.translate(0,bob);
    ctx.shadowColor=CY;ctx.shadowBlur=34*S;ctx.strokeStyle=CY;ctx.lineWidth=9;cloud(false);ctx.shadowBlur=0;
    const cg=ctx.createLinearGradient(0,cy-190,0,cy+140);cg.addColorStop(0,'#13306e');cg.addColorStop(1,'#071333');ctx.fillStyle=cg;cloud(true);
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.4;ctx.strokeStyle='#bfeeff';ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(cx+45,cy-52,126,-2.4,-1.1);ctx.stroke();ctx.globalCompositeOperation='source-over';
    ctx.globalAlpha=1;ctx.fillStyle='rgba(54,216,255,.14)';ctx.strokeStyle=CY;ctx.lineWidth=3;roundRect(cx-95,cy-26,230,106,22);ctx.fill();ctx.stroke();
    txt('5G',cx+20,cy+28,{f:'Orbitron',w:900,size:76,ls:6,fill:'#eaffff',glow:[[CY,26]]});ctx.restore();
    ctx.globalAlpha=1;bloom(.7,[2,4]);vignette(.5);grain(.03)}};
