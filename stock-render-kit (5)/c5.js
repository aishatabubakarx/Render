/* 11 GOLD SPARKLE BURSTS OVERLAY on pure black - gold #F6C453 / #FFE9A8 / #D9962A */
C[11]=()=>{const D=DUR/1000,R=rng(1111),g={fade:1};newTL();A(g,{fade:1},{fade:0},D-.8,.8,'power1.in');
  const cols=['#ffe9a8','#f6c453','#fff7dc','#d9962a'],B=[[W*.5,H*.55,.3,2400,900,6.4],[W*.25,H*.42,4.0,1800,720,6],[W*.76,H*.45,7.4,1800,780,6],[W*.5,H*.4,10.6,2400,1100,Math.min(4.2,D-10.6)]].map(([x,y,t0,n,sp,life])=>({x,y,t0,fn:makeBurst(R,{n,x,y,t0,sp,k:1.9,g:220,life,cols,size:4.4,trail:.08})}));
  const rain=Array.from({length:520},()=>({x:R()*W,y:R()*H,v:30+R()*90,ph:R()*TAU,k:2+R()*5,s:1+R()*2.2,a:.2+R()*.6,t:1+R()*9}));
  draw=()=>{clear();const ms=now(),t=ms/1000;ctx.globalCompositeOperation='lighter';
    for(const b of B){b.fn(t);const e=t-b.t0;if(e>=0&&e<1.2){ctx.globalAlpha=Math.exp(-e*5)*.9;ctx.drawImage(spr([255,214,120],256),b.x-420,b.y-420,840,840);star4(b.x,b.y,300*Math.exp(-e*4),Math.exp(-e*4),'#fff3cf')}}
    for(const r of rain){if(t<r.t)continue;const y=(r.y+(t-r.t)*r.v)%(H+40)-20,tw=(.5+.5*Math.sin(t*r.k+r.ph))**3,a=Math.min(1,(t-r.t)/1.5)*r.a*tw*g.fade;if(a<.03)continue;ctx.globalAlpha=a;ctx.fillStyle='#f6c453';ctx.fillRect(r.x+Math.sin(t*.7+r.ph)*20,y,r.s,r.s);if(r.s>2.4){star4(r.x,y,9,a*.7,'#fff3cf')}}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.9,[2,4]);grain(.015)}};

/* 12 AURORA CURTAINS OVER STARS (loop) - navy #02040c, green #3CFF9E, teal, violet #8A5CFF */
C[12]=()=>{newTL();const R=rng(1212),hy=800;
  const mk=(stops)=>{const k=offscreen(4,256),x=k.getContext('2d'),gr=x.createLinearGradient(0,0,0,256);stops.forEach(([o,c])=>gr.addColorStop(o,c));x.fillStyle=gr;x.fillRect(0,0,4,256);return k};
  const SP=[mk([[0,'rgba(150,90,255,0)'],[.35,'rgba(110,100,255,.25)'],[.7,'rgba(60,255,170,.7)'],[.93,'rgba(180,255,220,.95)'],[1,'rgba(60,255,170,0)']]),
            mk([[0,'rgba(60,200,255,0)'],[.4,'rgba(40,200,220,.28)'],[.8,'rgba(60,255,200,.75)'],[1,'rgba(60,255,200,0)']]),
            mk([[0,'rgba(200,80,255,0)'],[.45,'rgba(160,70,255,.3)'],[.85,'rgba(120,120,255,.7)'],[1,'rgba(120,120,255,0)']])];
  const stars=Array.from({length:520},()=>({x:R()*W,y:R()*hy*.95,s:.6+R()*1.7,ph:R()*TAU,k:1+((R()*3)|0),a:.25+R()*.7}));
  const ridge=(x,o,a)=>hy-a*(.55+.45*fbm(x*.0018+o,o*3,3)*1.6)-a*.25*Math.abs(Math.sin(x*.0023+o));
  const aur=(th,refl)=>{for(let L=0;L<3;L++){const step=6;for(let x=0;x<W+step;x+=step){const base=hy-250-L*70+80*lnoise(x*.0014+L*5,L,th)+40*lnoise(x*.004,L*7,th*2),h=(400+L*70)*(.75+.5*lnoise(x*.002+L,9.1+L,th)),b=Math.max(0,.55+.6*lnoise(x*.0035+L*3,3.1,th*2)),ray=.55+.45*lnoise(x*.03+L,5+L,th*3),a=Math.min(1,b*ray)*(L===0?.95:.7);if(a<.04)continue;ctx.globalAlpha=a*(refl?.3:1);ctx.drawImage(SP[L],0,0,4,256,x,base-h,step+1,h)}}};
  draw=()=>{clear();const ms=now(),th=LOOP(ms);bgRad('#050a1c','#010206',W/2,hy*.6,H*1.3);ctx.globalCompositeOperation='lighter';
    for(const s of stars){ctx.globalAlpha=s.a*(.3+.7*Math.sin(th*s.k+s.ph)**2);ctx.fillStyle='#e3efff';ctx.fillRect(s.x,s.y,s.s,s.s)}
    aur(th,false);
    ctx.save();ctx.beginPath();ctx.rect(0,hy,W,H-hy);ctx.clip();ctx.translate(0,2*hy);ctx.scale(1,-1);aur(th,true);ctx.restore();
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=.92;const lk=ctx.createLinearGradient(0,hy,0,H);lk.addColorStop(0,'rgba(2,6,16,.35)');lk.addColorStop(1,'rgba(1,3,8,.9)');ctx.fillStyle=lk;ctx.fillRect(0,hy,W,H-hy);
    ctx.globalAlpha=.07;ctx.fillStyle='#bfffe0';for(let i=0;i<60;i++){const y=hy+8+i*(H-hy)/60*1.0,w=40+((i*37)%160),x=((i*211+Math.sin(th*(1+i%2)+i)*60)%(W+200))-100;ctx.fillRect(x,y,w,1.5)}
    ctx.globalAlpha=1;for(const [o,a,c] of [[3.1,150,'#03050c'],[7.7,100,'#010205']]){ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(0,hy+2);for(let x=0;x<=W;x+=12)ctx.lineTo(x,ridge(x,o,a));ctx.lineTo(W,hy+2);ctx.closePath();ctx.fill()}
    ctx.globalAlpha=1;bloom(.55,[2,4]);vignette(.5);grain(.03)}};

/* 13 DOT GRID WAVE TERRAIN (loop) - black-navy, ice white #DDE8FF, violet crest #B07CFF */
C[13]=()=>{newTL();const R=rng(1313),NX=118,NZ=50,star=Array.from({length:200},()=>({x:R()*W,y:R()*330,s:.6+R()*1.4,ph:R()*TAU,k:1+((R()*3)|0)}));
  const hgt=(X,Z,th)=>.55*Math.sin(X*1.7+Z*5-th*2)+.38*Math.sin(X*3.3-Z*3.5+th*3)+.4*Math.sin(5.2*Math.hypot(X,Z-.25)-th*3)+.2*Math.sin(X*7.4+Z*9+th*4);
  draw=()=>{clear();const ms=now(),th=LOOP(ms);bgRad('#0a0b26','#010108',W/2,330,H*1.2);ctx.globalCompositeOperation='lighter';
    for(const s of star){ctx.globalAlpha=.5*(.3+.7*Math.sin(th*s.k+s.ph)**2);ctx.fillStyle='#cfd8ff';ctx.fillRect(s.x,s.y,s.s,s.s)}
    ctx.globalAlpha=.3;const hg=ctx.createLinearGradient(0,230,0,450);hg.addColorStop(0,'rgba(120,90,255,0)');hg.addColorStop(.6,'rgba(120,90,255,.35)');hg.addColorStop(1,'rgba(120,90,255,0)');ctx.fillStyle=hg;ctx.fillRect(0,250,W,180);
    for(let j=0;j<NZ;j++){const Z=j/(NZ-1),d=1.8-1.3*Z,yb=360+650*(1/d-1/1.8)/(1/.5-1/1.8),k=1/d;
      for(let i=0;i<NX;i++){const X=(i/(NX-1)-.5)*4.2,h=hgt(X,Z,th),sx=W/2+X*(W*.55)*k*.62*2.2/2.2,sy=yb-h*95*k,e=sm(0,.12,Z)*sm(0,.05,.5-Math.abs(X/4.2))*1,hi=sm(.1,1.0,h);
        const a=(.25+.75*Z)*e*(.45+.55*hi);if(a<.03)continue;const sz=(1.1+3.2*k*.9)*(.7+.6*hi);ctx.globalAlpha=Math.min(1,a);ctx.fillStyle=hi>.55?'#e6d6ff':hi>.3?'#c3b0ff':'#9fb4ff';ctx.fillRect(sx-sz/2,sy-sz/2,sz,sz);
        if(hi>.7&&Z>.3){ctx.globalAlpha=a*.35;ctx.drawImage(spr([176,124,255],32),sx-sz*3,sy-sz*3,sz*6,sz*6)}}}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.7,[2,4]);vignette(.55);grain(.03)}};

/* 14 HAPPY NEW YEAR 2027 COUNTDOWN - black-navy, gold #F6C453 / #FFF0C0 / #B8741A */
C[14]=()=>{const D=DUR/1000,R=rng(1414),g={fade:1,fin:0,fl:0};newTL();const T0=.6,DT=.75,TE=T0+10*DT;CustomBounce.create('nyb',{strength:.5,squash:1});
  A(g,{fin:0},{fin:1},TE,1.4,'expo.out');A(g,{fl:1},{fl:0},TE,1,'power3.out');A(g,{fade:1},{fade:0},D-.9,.9,'power1.in');
  const cols=['#ffe9a8','#f6c453','#fff7dc','#e0a53a'],bursts=[[W*.3,H*.38,0,1500,820],[W*.72,H*.34,.55,1500,860],[W*.5,H*.3,1.2,2000,1000],[W*.18,H*.55,2.4,1100,640],[W*.86,H*.55,3.0,1100,660],[W*.5,H*.45,4.2,1800,900]].map(([x,y,dt,n,sp])=>makeBurst(R,{n,x,y,t0:TE+.1+dt,sp,k:1.5,g:380,life:2.8,cols,size:3.2,trail:.05}));
  const conf=Array.from({length:240},()=>({x:R()*W,v:120+R()*220,ph:R()*TAU,w:6+R()*8,h:3+R()*6,c:cols[(R()*4)|0],t0:TE+.3+R()*3,k:2+R()*5}));
  const dust=Array.from({length:280},()=>({x:R()*W,y:R()*H,s:.8+R()*1.6,ph:R()*TAU,k:1+R()*3,vy:5+R()*14}));
  const gold=(x,w)=>{const gr=ctx.createLinearGradient(x-w,0,x+w,0);gr.addColorStop(0,'#b8741a');gr.addColorStop(.3,'#f6c453');gr.addColorStop(.5,'#fff3c8');gr.addColorStop(.7,'#f6c453');gr.addColorStop(1,'#b8741a');return gr};
  const hello=mkL('HAPPY NEW YEAR','Montserrat',800,104,W/2,26);hello.L.forEach((l,i)=>A(l,{a:0,y:30},{a:1,y:0},TE+.35+i*.06,.7,'power3.out'));
  const yr=mkL('2027','Playfair Display',800,330,W/2,16);yr.L.forEach((l,i)=>A(l,{a:0,sc:1.7,y:-40},{a:1,sc:1,y:0},TE+.1+i*.12,.9,'expo.out'));
  draw=()=>{clear();const ms=now(),t=ms/1000;bgRad('#0b1126','#010207',W/2,H*.5,H*1.2);haze([200,150,60],.025,ms);ctx.globalCompositeOperation='lighter';
    for(const d of dust){ctx.globalAlpha=.5*(.3+.7*Math.sin(t*d.k+d.ph)**2)*g.fade;ctx.fillStyle='#f6c453';ctx.fillRect(d.x,(d.y-t*d.vy+H*5)%H,d.s,d.s)}
    ctx.globalAlpha=g.fade;ctx.globalCompositeOperation='source-over';
    if(t<TE+.2){const k=Math.floor((t-T0)/DT),f=(t-T0)/DT-k;if(k>=0&&k<10){const n=10-k,e=ez('nyb',clamp(f*1.8,0,1)),sc=.55+.45*e+.03*f,al=1-sm(.8,1,f)*0.6;
        ctx.globalAlpha=g.fade*al;ctx.save();ctx.translate(W/2,H/2+10);ctx.scale(sc,sc);txt(String(n),0,0,{f:'Playfair Display',w:800,size:520,fill:gold(0,200),glow:[['rgba(246,196,83,.28)',50]]});ctx.restore();
        ctx.globalCompositeOperation='lighter';ctx.strokeStyle='#f6c453';ctx.lineWidth=3;ctx.globalAlpha=g.fade*(1-f)*.8;ctx.beginPath();ctx.arc(W/2,H/2,300+f*420,0,TAU);ctx.stroke();ctx.globalAlpha=g.fade*.9;ctx.lineWidth=7;ctx.beginPath();ctx.arc(W/2,H/2,330,-Math.PI/2,-Math.PI/2+TAU*f);ctx.stroke();ctx.globalCompositeOperation='source-over'}
      const ci=Math.max(0,Math.min(1,(t-T0+.2)/.5));ctx.globalAlpha=g.fade*ci*.8;txt('COUNTDOWN TO',W/2,150,{f:'Montserrat',w:700,size:34,ls:20,fill:'#f2cf7a'});}
    ctx.globalCompositeOperation='lighter';for(const b of bursts)b(t);
    if(t>TE){const e=t-TE;ctx.globalAlpha=g.fl*.7*g.fade;ctx.drawImage(spr([255,214,120],256),W/2-900,H/2-700,1800,1400)}
    ctx.globalCompositeOperation='source-over';
    if(g.fin>0){const sw=fr((t-TE-1.2)/3.5);ctx.globalAlpha=g.fade;drawL(hello,300,{fill:()=>gold(W/2,520),glow:[['rgba(246,196,83,.28)',24]]});
      drawL(yr,590,{fill:l=>{const gr=ctx.createLinearGradient(W/2-560+sw*1700-300,0,W/2-560+sw*1700+300,0);gr.addColorStop(0,'#c98a22');gr.addColorStop(.42,'#f6c453');gr.addColorStop(.5,'#ffffff');gr.addColorStop(.58,'#f6c453');gr.addColorStop(1,'#c98a22');return t-TE>1.2&&sw>0&&sw<1?gr:gold(W/2,400)},glow:[['rgba(246,196,83,.28)',40]]});
      ctx.globalAlpha=g.fade*g.fin*.9;ctx.strokeStyle='#f6c453';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(W/2-300,830);ctx.lineTo(W/2+300,830);ctx.stroke();ctx.fillStyle='#f6c453';ctx.beginPath();ctx.moveTo(W/2,816);ctx.lineTo(W/2+14,830);ctx.lineTo(W/2,844);ctx.lineTo(W/2-14,830);ctx.fill();txt('WISHING YOU HAPPINESS AND SUCCESS',W/2,900,{f:'Montserrat',w:700,size:32,ls:12,fill:'#f2cf7a',a:g.fin*g.fade})}
    for(const c of conf){if(t<c.t0)continue;const e=t-c.t0,y=-30+e*c.v,x=c.x+Math.sin(e*1.3+c.ph)*50;if(y>H+30)continue;const sy=Math.abs(Math.cos(e*c.k+c.ph));ctx.globalAlpha=g.fade*.9;ctx.fillStyle=c.c;ctx.save();ctx.translate(x,y);ctx.rotate(e*c.k*.5+c.ph);ctx.fillRect(-c.w/2,-c.h*sy/2,c.w,Math.max(1,c.h*sy));ctx.restore()}
    ctx.globalAlpha=1;bloom(.45,[2,4]);vignette(.5);grain(.03)}};
