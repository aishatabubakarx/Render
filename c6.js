/* 15 MERRY CHRISTMAS - deep green-black, warm gold #F6C453, red #C8102E, snow white */
C[15]=()=>{const D=DUR/1000,R=rng(1515),g={fade:1,sub:0,drop:0};newTL();A(g,{drop:0},{drop:1},.2,2.4,'bounce.out');A(g,{sub:0},{sub:1},4.6,1.4,'power2.out');A(g,{fade:1},{fade:0},D-.9,.9,'power1.in');
  const bok=Array.from({length:40},()=>({x:R()*W,y:R()*H,r:30+R()*110,ph:R()*TAU,k:1+((R()*2)|0),a:.05+R()*.12,c:R()<.6?[246,196,83]:R()<.5?[255,226,170]:[220,40,60]}));
  const snow=[0,1,2].flatMap(L=>Array.from({length:[320,150,36][L]},()=>({x:R()*W,y:R()*H,v:[34,70,150][L]*(.8+R()*.4),s:[1.2,2.4,6][L]*(.7+R()*.6),sw:8+R()*30,ph:R()*TAU,L,a:[.55,.75,.5][L]})));
  const orn=[[250,190,'r'],[480,235,'g'],[1440,225,'g'],[1680,180,'r'],[800,130,'r'],[1130,105,'g']].map(([x,l,c],i)=>({x,l,c,ph:R()*TAU,i,r:34+R()*14}));
  const word=mkL('Merry Christmas','Great Vibes',400,270,W/2,6);word.L.forEach((l,i)=>A(l,{a:0,y:40,sc:.8},{a:1,y:0,sc:1},1.2+i*.11,.9,'power3.out'));
  const sp=Array.from({length:26},()=>({x:W/2+(R()-.5)*1250,y:H*.47+(R()-.5)*330,ph:R()*TAU,k:1+R()*3,s:10+R()*26}));
  draw=()=>{clear();const ms=now(),t=ms/1000;ctx.globalAlpha=1;bgRad('#0a2218','#010504',W/2,H*.5,H*1.2);ctx.globalCompositeOperation='lighter';
    for(const b of bok){ctx.globalAlpha=g.fade*b.a*(.7+.3*Math.sin(t*.8*b.k+b.ph));ctx.drawImage(spr(b.c,128),b.x+20*Math.sin(t*.3+b.ph)-b.r,b.y+14*Math.cos(t*.4+b.ph)-b.r,b.r*2,b.r*2)}
    ctx.globalAlpha=g.fade*.12;ctx.drawImage(spr([246,170,60],256),W/2-800,H*.47-420,1600,840);
    const flk=(L)=>{for(const s of snow){if(s.L!==L)continue;const y=(s.y+t*s.v)%(H+30)-15,x=s.x+Math.sin(t*.6+s.ph)*s.sw;ctx.globalAlpha=g.fade*s.a;if(L===2){ctx.drawImage(spr([255,255,255],32),x-s.s*1.6,y-s.s*1.6,s.s*3.2,s.s*3.2)}else{ctx.fillStyle='#fff';ctx.fillRect(x,y,s.s,s.s)}}};flk(0);flk(1);
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=g.fade;
    drawL(word,H*.47,{fill:l=>{const gr=ctx.createLinearGradient(0,H*.47-130,0,H*.47+130);gr.addColorStop(0,'#fff8e6');gr.addColorStop(.55,'#ffe3a0');gr.addColorStop(1,'#e8b14a');return gr},glow:[['rgba(246,196,83,.35)',34]]});
    txt('and a Happy New Year',W/2,H*.47+190,{f:'Playfair Display',w:800,size:50,ls:4,fill:'#f4dba0',a:g.sub*g.fade});
    for(const o of orn){const e=clamp(g.drop*1,0,1),len=o.l*(.2+.8*Math.min(1,g.drop)),ang=.07*Math.sin(t*1.1+o.ph)*(.4+.6*Math.min(1,g.drop)),x0=o.x,y0=-10,bx=x0+Math.sin(ang)*(len+o.r),by=y0+Math.cos(ang)*(len+o.r);
      ctx.globalAlpha=g.fade*.6;ctx.strokeStyle='#d8b565';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(bx,by-o.r);ctx.stroke();ctx.globalAlpha=g.fade;
      const col=o.c==='r'?['#ff4b5e','#c8102e','#4a0610']:['#fff0b8','#e8b14a','#7a4c0c'],rg=ctx.createRadialGradient(bx-o.r*.35,by-o.r*.4,o.r*.1,bx,by,o.r);rg.addColorStop(0,col[0]);rg.addColorStop(.45,col[1]);rg.addColorStop(1,col[2]);ctx.fillStyle=rg;ctx.beginPath();ctx.arc(bx,by,o.r,0,TAU);ctx.fill();
      ctx.fillStyle='#e8b14a';ctx.fillRect(bx-7,by-o.r-8,14,10);ctx.globalAlpha=g.fade*.85;ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(bx-o.r*.35,by-o.r*.4,o.r*.16,o.r*.1,-.6,0,TAU);ctx.fill();
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=g.fade*.25;ctx.drawImage(spr(o.c==='r'?[255,60,80]:[255,210,110],128),bx-o.r*2.4,by-o.r*2.4,o.r*4.8,o.r*4.8);ctx.globalCompositeOperation='source-over'}
    ctx.globalCompositeOperation='lighter';for(const p of sp){const a=(.5+.5*Math.sin(t*p.k+p.ph))**3;ctx.globalAlpha=g.fade*a*clamp((t-2)/1.5,0,1);star4(p.x,p.y,p.s,a*g.fade*clamp((t-2)/1.5,0,1),'#fff3cf')}
    flk(2);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.5,[2,4]);vignette(.55);grain(.03)}};

/* 16 BLACK FRIDAY SALE - black, gold #F6C453 / #FFE9A8 / #B8741A, white */
C[16]=()=>{const D=DUR/1000,R=rng(1616),g={fade:1,ban:0,sub:0,pulse:0};newTL();CustomBounce.create('bf16',{strength:.55,squash:1.5});
  A(g,{ban:0},{ban:1},2.5,.9,'back.out(2.4)');A(g,{sub:0},{sub:1},3.4,.9,'power3.out');A(g,{fade:1},{fade:0},D-.8,.8,'power1.in');
  const bl=mkL('BLACK','Montserrat',900,300,W/2,14);bl.L.forEach((l,i)=>A(l,{a:0,y:-520,sc:1.15},{a:1,y:0,sc:1},.25+i*.1,1.1,'bf16'));
  const fr2=mkL('FRIDAY','Montserrat',900,300,W/2,14);fr2.L.forEach((l,i)=>A(l,{a:0,y:0,sc:1},{a:1,y:0,sc:1},1.2+i*.08,.7,'expo.out'));fr2.L.forEach((l,i)=>{const x=l.x;A(l,{x:x+900},{x:x},1.2+i*.08,.8,'expo.out')});
  const tags=Array.from({length:24},()=>({x:R()*W,y:R()*H,vy:(R()<.5?1:-1)*(30+R()*70),r:R()*TAU,vr:(R()-.5)*1.2,s:.6+R()*.9,t0:1.4+R()*3,a:.12+R()*.22}));
  const gold=(x,w,p)=>{const gr=ctx.createLinearGradient(x-w,0,x+w,0);gr.addColorStop(0,'#b8741a');gr.addColorStop(clamp(p-.15,.01,.98),'#f6c453');gr.addColorStop(clamp(p,.02,.99),'#fff7d8');gr.addColorStop(clamp(p+.15,.03,1),'#f6c453');gr.addColorStop(1,'#b8741a');return gr};
  draw=()=>{clear();const ms=now(),t=ms/1000,sw=((t-3.6)%5)/5;ctx.globalAlpha=1;bgRad('#17110a','#010101',W/2,H*.45,H*1.1);ctx.globalCompositeOperation='lighter';
    for(let i=0;i<3;i++){ctx.save();ctx.translate(W/2,H/2);ctx.rotate(-.5);const x=((t*40+i*700)%2600)-1300;const gr=ctx.createLinearGradient(x-140,0,x+140,0);gr.addColorStop(0,'rgba(246,196,83,0)');gr.addColorStop(.5,'rgba(246,196,83,.07)');gr.addColorStop(1,'rgba(246,196,83,0)');ctx.fillStyle=gr;ctx.fillRect(x-140,-1600,280,3200);ctx.restore()}
    ctx.globalAlpha=g.fade*.35;ctx.drawImage(spr([246,170,60],256),W/2-900,H/2-600,1800,1200);
    ctx.globalCompositeOperation='source-over';for(const tg of tags){if(t<tg.t0)continue;const e=t-tg.t0,y=((tg.y+e*tg.vy)%(H+200)+H+200)%(H+200)-100;ctx.globalAlpha=g.fade*tg.a*clamp(e,0,1);ctx.save();ctx.translate(tg.x+Math.sin(e*.6+tg.r)*30,y);ctx.rotate(tg.r+Math.sin(e*tg.vr)*.5);ctx.scale(tg.s,tg.s);ctx.fillStyle='#f6c453';ctx.beginPath();ctx.moveTo(-38,-20);ctx.lineTo(24,-20);ctx.lineTo(44,0);ctx.lineTo(24,20);ctx.lineTo(-38,20);ctx.closePath();ctx.fill();ctx.fillStyle='#000';ctx.beginPath();ctx.arc(26,0,5,0,TAU);ctx.fill();ctx.restore()}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=g.fade;const p=t>3.6&&sw<1?sw:-1;
    drawL(bl,H*.34,{fill:()=>gold(W/2,640,p>=0?p*1.2-.1:-1),glow:[['rgba(246,196,83,.15)',30]]});
    ctx.fillStyle='#000';drawL(fr2,H*.34+250,{fill:()=>gold(W/2,640,p>=0?(1-p)*1.2-.1:-1),glow:[['rgba(246,196,83,.15)',30]]});
    ctx.save();ctx.translate(W/2,H*.34+470);const bs=g.ban;ctx.scale(Math.max(.001,bs),Math.max(.001,bs));ctx.fillStyle=gold(0,520,.5);roundRect(-430,-52,860,104,14);ctx.fill();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.25*g.fade;ctx.strokeStyle='#fff3c8';ctx.lineWidth=3;roundRect(-446,-62,892,124,18);ctx.stroke();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=g.fade;txt('UP TO 70% OFF',0,4,{f:'Montserrat',w:900,size:68,ls:8,fill:'#0a0703'});ctx.restore();
    txt('LIMITED TIME ONLY  /  EVERYTHING MUST GO',W/2,H*.34+590,{f:'Montserrat',w:700,size:30,ls:12,fill:'#f2cf7a',a:g.sub*g.fade});
    ctx.globalAlpha=1;bloom(.3,[2,4]);vignette(.55);grain(.03)}};

/* 17 HAPPY ANNIVERSARY - burgundy-black #14060B, rose gold #E8B4AA, gold #F6C453 */
C[17]=()=>{const D=DUR/1000,R=rng(1717),g={fade:1,ring:0,sub:0,line:0};newTL();A(g,{ring:0},{ring:1},.4,2,'expo.out');A(g,{line:0},{line:1},3.6,1.5,'power3.inOut');A(g,{sub:0},{sub:1},4.4,1.4,'power2.out');A(g,{fade:1},{fade:0},D-.9,.9,'power1.in');
  const word=mkL('Happy Anniversary','Great Vibes',400,232,W/2,6);word.L.forEach((l,i)=>A(l,{a:0,y:34,sc:.85},{a:1,y:0,sc:1},1.6+i*.1,.9,'power3.out'));
  const dust=Array.from({length:700},()=>({x:R()*W,y:R()*H,v:6+R()*26,ph:R()*TAU,k:1+R()*3,s:.8+R()*2,sw:6+R()*28}));
  const bok=Array.from({length:30},()=>({x:R()*W,y:R()*H,r:30+R()*100,ph:R()*TAU,a:.04+R()*.1,c:R()<.6?[232,150,150]:[246,196,83]}));
  const hearts=Array.from({length:14},()=>({x:R()*W,y:R()*H,v:20+R()*30,s:10+R()*14,ph:R()*TAU,a:.2+R()*.35}));
  const rose=(x,w)=>{const gr=ctx.createLinearGradient(x-w,0,x+w,0);gr.addColorStop(0,'#c98780');gr.addColorStop(.35,'#f3cfc6');gr.addColorStop(.5,'#fff1e8');gr.addColorStop(.65,'#f3cfc6');gr.addColorStop(1,'#c98780');return gr};
  draw=()=>{clear();const ms=now(),t=ms/1000;ctx.globalAlpha=1;bgRad('#3a0f1e','#0a0306',W/2,H*.5,H*1.1);ctx.globalCompositeOperation='lighter';
    for(const b of bok){ctx.globalAlpha=g.fade*b.a*(.7+.3*Math.sin(t*.7+b.ph));ctx.drawImage(spr(b.c,128),b.x+16*Math.sin(t*.3+b.ph)-b.r,b.y-b.r,b.r*2,b.r*2)}
    ctx.globalAlpha=g.fade*.25;ctx.drawImage(spr([232,150,140],256),W/2-700,H*.5-380,1400,760);
    for(const d of dust){const y=((d.y-t*d.v)%H+H)%H,tw=(.5+.5*Math.sin(t*d.k+d.ph))**3;ctx.globalAlpha=g.fade*.7*tw;ctx.fillStyle=d.s>2?'#fff1e8':'#f0b9a8';ctx.fillRect(d.x+Math.sin(t*.5+d.ph)*d.sw,y,d.s,d.s)}
    for(const h of hearts){const y=((h.y-t*h.v)%(H+60)+H+60)%(H+60)-30;ctx.globalAlpha=g.fade*h.a*(.6+.4*Math.sin(t*1.2+h.ph));ctx.fillStyle='#f0a0a8';heart(h.x+Math.sin(t*.5+h.ph)*30,y,h.s);ctx.fill()}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=g.fade;
    const ry=250,rr=64*(.7+.3*g.ring),off=40*g.ring;ctx.save();ctx.globalAlpha=g.fade*g.ring;ctx.lineWidth=11;const rg=ctx.createLinearGradient(W/2-120,ry-70,W/2+120,ry+70);rg.addColorStop(0,'#fff3c8');rg.addColorStop(.5,'#e8b14a');rg.addColorStop(1,'#b8741a');ctx.strokeStyle=rg;ctx.shadowColor='rgba(246,196,83,.6)';ctx.shadowBlur=22*S;
    ctx.beginPath();ctx.arc(W/2-off,ry,rr,0,TAU);ctx.stroke();ctx.beginPath();ctx.arc(W/2+off,ry,rr,0,TAU);ctx.stroke();const ix=Math.sqrt(rr*rr-off*off);const a1=Math.atan2(-ix,off),a2=Math.atan2(ix,-off);ctx.beginPath();ctx.arc(W/2-off,ry,rr,a1-.28,a1+.28);ctx.stroke();ctx.beginPath();ctx.arc(W/2+off,ry,rr,a2-.28,a2+.28);ctx.stroke();ctx.restore();
    ctx.globalCompositeOperation='lighter';const gl=(.5+.5*Math.sin(t*2.2));star4(W/2,ry-rr-6,34*g.ring,g.fade*g.ring*(.5+.5*gl),'#fff6dc');ctx.globalCompositeOperation='source-over';
    ctx.globalAlpha=g.fade;drawL(word,H*.5+20,{fill:()=>rose(W/2,520),glow:[['rgba(232,150,140,.35)',30]]});
    ctx.globalAlpha=g.fade*g.line;ctx.strokeStyle='#e8b14a';ctx.lineWidth=2;const lw=330*g.line;ctx.beginPath();ctx.moveTo(W/2-lw,H*.5+190);ctx.lineTo(W/2-18,H*.5+190);ctx.moveTo(W/2+18,H*.5+190);ctx.lineTo(W/2+lw,H*.5+190);ctx.stroke();ctx.fillStyle='#e8b14a';ctx.beginPath();ctx.moveTo(W/2,H*.5+176);ctx.lineTo(W/2+10,H*.5+190);ctx.lineTo(W/2,H*.5+204);ctx.lineTo(W/2-10,H*.5+190);ctx.fill();
    txt('CELEBRATING LOVE TOGETHER',W/2,H*.5+262,{f:'Montserrat',w:700,size:36,ls:16,fill:'#f2c9bd',a:g.sub*g.fade});
    ctx.globalAlpha=1;bloom(.55,[2,4]);vignette(.55);grain(.03)}};

/* 18 PRODUCT REVEAL PODIUM SPOTLIGHT - charcoal #0A0B0E, warm white #FFF1D6, gold #F6C453 */
C[18]=()=>{const D=DUR/1000,R=rng(1818),g={beam:0,ring:0,fade:1,fl:1};newTL();A(g,{beam:0},{beam:1},1.2,1.4,'power2.out');A(g,{ring:0},{ring:1},3.2,2.6,'expo.out');A(g,{fade:1},{fade:0},D-.9,.9,'power1.in');
  const cx=W/2,py=760,prx=330,pry=74,top=-40;
  const dust=Array.from({length:520},()=>({u:R(),x:(R()-.5)*2,ph:R()*TAU,k:1+R()*3,v:.02+R()*.05,s:.8+R()*2.2}));
  const flick=t=>t<1.2?0:t<1.55?(Math.sin(t*90)>.2?.9:.1):t<1.75?.15:t<2.1?(Math.sin(t*70)>0?1:.35):1;
  draw=()=>{clear();const ms=now(),t=ms/1000,fl=flick(t)*g.beam*(t<1.2?0:1)+(t>=2.1?g.beam:0)*0,L=t<2.1?flick(t):1;ctx.globalAlpha=1;bgRad('#17181d','#020203',cx,H*.55,H*1.2);haze([90,80,60],.03,ms);
    ctx.globalCompositeOperation='lighter';
    const bw=60,bwb=prx*.95;ctx.save();const bg=ctx.createLinearGradient(0,top,0,py);bg.addColorStop(0,'rgba(255,241,214,.55)');bg.addColorStop(1,'rgba(255,230,180,.10)');ctx.globalAlpha=g.fade*L*.65;ctx.fillStyle=bg;ctx.beginPath();ctx.moveTo(cx-bw,top);ctx.lineTo(cx+bw,top);ctx.lineTo(cx+bwb,py);ctx.lineTo(cx-bwb,py);ctx.closePath();ctx.fill();
    for(let i=0;i<12;i++){const f=(i+.5)/12*2-1,sh=.5+.5*Math.sin(t*.8+i*1.7);ctx.globalAlpha=g.fade*L*.12*sh;ctx.fillStyle='#fff1d6';ctx.beginPath();ctx.moveTo(cx+f*bw-5,top);ctx.lineTo(cx+f*bw+5,top);ctx.lineTo(cx+f*bwb+10,py);ctx.lineTo(cx+f*bwb-10,py);ctx.closePath();ctx.fill()}ctx.restore();
    ctx.globalAlpha=g.fade*L*.3;ctx.drawImage(spr([255,225,170],256),cx-620,py-300,1240,520);
    for(const d of dust){const u=fr(d.u+t*d.v),y=top+(py-top)*u,half=lerp(bw,bwb,u),x=cx+d.x*half*.9+Math.sin(t*.6+d.ph)*18,tw=(.5+.5*Math.sin(t*d.k+d.ph))**2;ctx.globalAlpha=g.fade*L*tw*.8*Math.sin(Math.PI*u)**.6;ctx.fillStyle=d.s>2?'#fff3cf':'#f6c453';ctx.fillRect(x,y,d.s,d.s)}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=g.fade;
    const body=ctx.createLinearGradient(cx-prx,0,cx+prx,0);body.addColorStop(0,'#08090b');body.addColorStop(.55,'#23252b');body.addColorStop(.85,'#3d3a36');body.addColorStop(1,'#0b0b0c');ctx.fillStyle=body;ctx.beginPath();ctx.moveTo(cx-prx,py);ctx.lineTo(cx-prx,py+190);ctx.ellipse(cx,py+190,prx,pry,0,Math.PI,0,true);ctx.lineTo(cx+prx,py);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(cx-prx,py+30,prx*2,2);
    const tp=ctx.createRadialGradient(cx,py,10,cx,py,prx);tp.addColorStop(0,`rgba(235,222,196,${.8*L+.05})`);tp.addColorStop(.6,`rgba(190,170,140,${.55*L+.15})`);tp.addColorStop(1,'#1d1e22');ctx.fillStyle=tp;ctx.beginPath();ctx.ellipse(cx,py,prx,pry,0,0,TAU);ctx.fill();
    ctx.globalCompositeOperation='lighter';ctx.strokeStyle='#f6c453';ctx.lineWidth=4;ctx.globalAlpha=g.fade*(.5+.5*L);ctx.beginPath();ctx.ellipse(cx,py,prx,pry,0,0,TAU);ctx.stroke();
    const ga=t*1.3;ctx.globalAlpha=g.fade*L*.9;ctx.drawImage(spr([255,236,170],64),cx+Math.cos(ga)*prx-26,py+Math.sin(ga)*pry-26,52,52);
    for(let k=0;k<3;k++){const s=fr(g.ring*1.6-k*.28),e=g.ring>0?s:0,rise=ez('power2.out',e);ctx.globalAlpha=g.fade*L*(1-e)*.7*Math.min(1,g.ring*3);ctx.strokeStyle='#ffe3a0';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(cx,py-rise*420,prx*(1-.18*rise),pry*(1-.18*rise),0,0,TAU);ctx.stroke()}
    ctx.globalAlpha=g.fade*L*.5;ctx.drawImage(spr([255,200,120],256),cx-520,py+110,1040,260);
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.7,[2,4]);vignette(.62);grain(.03)}};
