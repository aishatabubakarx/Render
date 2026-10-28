/* 1 DARK LUXURY GOLD DUST FALLING + GLITTER + BOKEH  (opaque black, seamless loop) */
C[1]=()=>{newTL();const R=rng(11),gold=[[255,205,95],[255,226,150],[232,170,60],[255,244,205]],pad=140,HH=H+pad*2;
  const bokSpr={};const bok=c=>{const k=c.join();if(bokSpr[k])return bokSpr[k];const z=mk(256,256),x=z.getContext('2d'),g=x.createRadialGradient(128,128,0,128,128,126);
    g.addColorStop(0,rgba(c,.42));g.addColorStop(.78,rgba(c,.5));g.addColorStop(.92,rgba(c,.95));g.addColorStop(1,rgba(c,0));x.fillStyle=g;x.fillRect(0,0,256,256);return bokSpr[k]=z};
  const B=Array.from({length:30},(_,i)=>{const z=R();return{x:R()*W,y:R()*HH,r:34+z*z*170,cyc:z>.65?2:1,sw:30+R()*60,k:1+(R()*2|0),ph:R(),a:.06+R()*.12,c:gold[i%3],tw:1+(R()*3|0),tp:R()}});
  const D=Array.from({length:560},(_,i)=>{const z=R();return{x:R()*W,y:R()*HH,s:2+z*z*10,cyc:z<.45?1:z<.8?2:3,sw:12+R()*55,k:1+(R()*3|0),ph:R(),tw:2+(R()*10|0),tp:R(),a:.25+z*.6,c:gold[i%4],star:i%6===0}});
  draw=()=>{clear();const br=.85+.15*sinP(1,.2);
    let g=ctx.createRadialGradient(W*.5,H*.42,0,W*.5,H*.5,H*1.05);g.addColorStop(0,`rgba(58,38,10,${.9*br})`);g.addColorStop(.45,'rgba(24,15,4,.95)');g.addColorStop(1,'rgba(0,0,0,1)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    for(const b of B){const x=b.x+b.sw*sinP(b.k,b.ph),y=wrap(b.y+P()*b.cyc*HH,HH)-pad,a=b.a*(.65+.35*Math.sin(TAU*(b.tw*P()+b.tp)));ctx.globalAlpha=a;ctx.drawImage(bok(b.c),x-b.r,y-b.r,b.r*2,b.r*2)}
    for(const d of D){const x=d.x+d.sw*sinP(d.k,d.ph),y=wrap(d.y+P()*d.cyc*HH,HH)-pad,t=.5+.5*Math.sin(TAU*(d.tw*P()+d.tp)),a=d.a*(d.star?.35+.65*t*t:.7+.3*t);
      if(d.star){const r=d.s*2.6*(.5+.5*t);ctx.globalAlpha=a*.6;const s=d.s*4;ctx.drawImage(spr(d.c,64),x-s,y-s,s*2,s*2);flare(x,y,r+6,a,'#fff4d2')}
      else{ctx.globalAlpha=a;const s=d.s*(d.s>8?1.6:1.2);ctx.drawImage(spr(d.c,32),x-s,y-s,s*2,s*2)}}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
/* 2 AUTUMN LEAVES BORDER FRAME  (alpha) */
C[2]=()=>{newTL();const R=rng(22),SZ=Math.round(260*Math.max(1,S));
  const pal=[[[222,44,30],[140,16,22]],[[243,118,26],[176,58,12]],[[252,182,36],[206,112,16]],[[205,152,44],[126,80,22]],[[176,38,34],[96,18,20]],[[132,158,44],[72,98,24]],[[236,86,32],[158,34,18]]];
  const lobe=(x,len,w,a)=>{x.save();x.rotate(a);x.beginPath();x.moveTo(0,0);x.bezierCurveTo(-w,-len*.3,-w*.55,-len*.82,0,-len);x.bezierCurveTo(w*.55,-len*.82,w,-len*.3,0,0);x.fill();x.stroke();x.restore()};
  const mkLeaf=(type,[c0,c1])=>{const k=mk(SZ,SZ),x=k.getContext('2d'),u=SZ/260;x.scale(u,u);x.translate(130,150);
    const g=x.createLinearGradient(0,-120,0,90);g.addColorStop(0,rgba(c0,1));g.addColorStop(1,rgba(c1,1));x.fillStyle=g;x.strokeStyle=rgba(mixc(c1,[0,0,0],.35),1);x.lineWidth=2.2;x.lineJoin='round';
    const stem=(l)=>{x.strokeStyle='rgba(96,58,24,1)';x.lineWidth=5;x.lineCap='round';x.beginPath();x.moveTo(0,0);x.lineTo(0,l);x.stroke();x.strokeStyle=rgba(mixc(c1,[0,0,0],.35),1);x.lineWidth=2.2};
    const vein=(a,l)=>{x.beginPath();x.moveTo(0,0);x.lineTo(Math.sin(a)*l,-Math.cos(a)*l);x.stroke()};
    if(type===0){stem(70);lobe(x,118,34,0);lobe(x,96,30,-.95);lobe(x,96,30,.95);lobe(x,62,24,-2.0);lobe(x,62,24,2.0);
      x.strokeStyle=rgba(mixc(c1,[0,0,0],.2),.8);x.lineWidth=2;for(const [a,l] of [[0,108],[-.95,86],[.95,86],[-2,54],[2,54]])vein(a,l)}
    else{const L=type===1?150:140,wd=type===1?.34:.46,teeth=type===1?3.4:0;stem(60);
      const wf=t=>wd*L*Math.sin(Math.PI*Math.pow(t,.78))*(type===1?1+.34*Math.sin(t*TAU*teeth+.4):1+.07*(Math.round(t*34)%2?1:-1));
      x.beginPath();x.moveTo(0,0);for(let i=0;i<=40;i++){const t=i/40;x.lineTo(wf(t),-t*L)}for(let i=40;i>=0;i--){const t=i/40;x.lineTo(-wf(t),-t*L)}x.closePath();x.fill();x.stroke();
      x.strokeStyle=rgba(mixc(c1,[0,0,0],.2),.8);x.lineWidth=2.2;x.beginPath();x.moveTo(0,8);x.lineTo(0,-L*.95);x.stroke();x.lineWidth=1.4;
      for(let i=1;i<7;i++){const t=i/7.5,y=-t*L,w=wf(t)*.85;x.beginPath();x.moveTo(0,y+8);x.lineTo(w,y-16);x.moveTo(0,y+8);x.lineTo(-w,y-16);x.stroke()}}
    const hl=x.createRadialGradient(-20,-50,0,-20,-50,120);hl.addColorStop(0,'rgba(255,255,220,.22)');hl.addColorStop(1,'rgba(255,255,220,0)');x.globalCompositeOperation='source-atop';x.fillStyle=hl;x.fillRect(-130,-150,260,260);return k};
  const spr2=[];for(let t=0;t<3;t++){spr2[t]=pal.map(p=>mkLeaf(t,p))}
  const per=2*(W+H),band=Math.min(W,H)*.24,L=[];
  const add=(x,y,s)=>L.push({x,y,s,t:(R()*3)|0,c:(R()*pal.length)|0,r0:R()*TAU,amp:.07+R()*.14,k:1+(R()*3|0),ph:R(),dx:6+R()*16,k2:1+(R()*2|0),ph2:R(),wv:x/W});
  for(let i=0;i<330;i++){let u=R()*per,d=Math.pow(R(),1.7)*band*1.15-band*.12,x,y;
    if(u<W){x=u;y=d}else if(u<W+H){x=W-d;y=u-W}else if(u<2*W+H){x=u-W-H;y=H-d}else{x=d;y=u-2*W-H}add(x,y,80+R()*150)}
  for(const [cx,cy] of [[0,0],[W,0],[0,H],[W,H]])for(let i=0;i<26;i++){const a=R()*TAU,d=Math.pow(R(),1.3)*band*1.7;add(cx+Math.abs(Math.cos(a))*d*(cx?-1:1),cy+Math.abs(Math.sin(a))*d*(cy?-1:1),110+R()*150)}
  L.sort((a,b)=>a.s-b.s);
  draw=()=>{clear();for(const l of L){const rot=l.r0+l.amp*sinP(l.k,l.ph)+.06*sinP(2,l.wv*1.4),x=l.x+l.dx*sinP(l.k2,l.ph2),y=l.y+l.dx*.6*sinP(l.k2,l.ph2+.3),sc=l.s/SZ*(1+.025*sinP(2,l.ph));
    ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(sc,sc);ctx.drawImage(spr2[l.t][l.c],-SZ*.5,-SZ*.58,SZ,SZ);ctx.restore()}};
};
/* 3 WHITE SMOKE AND FOG MOVING  (alpha, seamless loop) */
C[3]=()=>{newTL();
  const nA=mkNoise(512,256,31,{oct:7,base:3,gain:.56,cut:[.42,.68],pw:1,col:[250,251,254]}),nAs=mkNoise(512,256,31,{oct:7,base:3,gain:.56,cut:[.42,.68],pw:1,col:[196,206,224]}),
    nB=mkNoise(512,256,32,{oct:7,base:3,gain:.55,cut:[.64,.96],pw:1.5,ridge:.9,col:[255,255,255]}),nC=mkNoise(512,256,33,{oct:7,base:4,gain:.56,cut:[.44,.68],pw:1,col:[244,247,252]}),nD=mkNoise(512,256,34,{oct:7,base:3,gain:.55,cut:[.66,.97],pw:1.3,ridge:.92,col:[255,255,255]});
  draw=()=>{clear();const main=ctx,L=layer();ctx=L;const p=P(),dy=30*sinP(1);
    tileScroll(nAs,3000,p*3000+30,-230+dy+30,.38);tileScroll(nA,3000,p*3000,-230+dy,1);
    tileScroll(nB,2200,-p*2*2200,-60-dy,.85);tileScroll(nC,1500,p*3*1500,40+dy*.5,.55);tileScroll(nD,3600,-p*3600,-180+dy,.7);
    L.globalCompositeOperation='destination-in';const m=L.createLinearGradient(0,0,0,H);m.addColorStop(0,'rgba(0,0,0,.3)');m.addColorStop(.35,'rgba(0,0,0,.55)');m.addColorStop(.7,'rgba(0,0,0,.97)');m.addColorStop(1,'rgba(0,0,0,1)');L.fillStyle=m;L.fillRect(0,0,W,H);
    ctx=main;ctx.drawImage(_lay,0,0,W,H)};
};
/* 4 HALLOWEEN DARK CLOUDY MIST + BATS  (alpha overlay, seamless loop) */
C[4]=()=>{newTL();const R=rng(44),nz=(seed,col,o={})=>mkNoise(512,256,seed,{oct:7,base:3,gain:.56,cut:[.43,.68],pw:1,col,...o});
  const dk=nz(41,[18,9,28]),rim=nz(41,[255,118,28]),dk2=nz(42,[24,12,34],{base:4,cut:[.45,.7]}),rim2=nz(42,[255,70,20],{base:4,cut:[.45,.7]}),gl=nz(43,[150,60,210],{cut:[.5,.72]});
  const bats=Array.from({length:10},()=>({y0:90+R()*H*.55,x0:R()*(W+400),cyc:R()<.5?1:2,dir:R()<.8?1:-1,s:.4+R()*1.05,fk:48+(R()*24|0),fp:R(),ak:1+(R()*3|0),amp:30+R()*90,ap:R()}));
  const bat=(f)=>{ctx.beginPath();ctx.ellipse(0,3,7,15,0,0,TAU);ctx.moveTo(-8,-10);ctx.lineTo(-5,-26);ctx.lineTo(-1,-14);ctx.lineTo(1,-14);ctx.lineTo(5,-26);ctx.lineTo(8,-10);ctx.closePath();ctx.fill();
    for(const sd of [-1,1]){ctx.save();ctx.scale(sd,1);const S0=[-5,-6],E1=[-44,-34-34*f],T=[-118,-12-64*f],F=[[-100,12-42*f],[-70,24-18*f],[-38,28-4*f],[-7,18]];
      ctx.beginPath();ctx.moveTo(...S0);ctx.quadraticCurveTo(-24,-30-18*f,E1[0],E1[1]);ctx.quadraticCurveTo(-84,-26-52*f,T[0],T[1]);let pr=T;
      for(const q of F){const mx=(pr[0]+q[0])/2,my=(pr[1]+q[1])/2;ctx.quadraticCurveTo(mx*.82-4,my*.8-6,q[0],q[1]);pr=q}ctx.closePath();ctx.fill();ctx.restore()}};
  draw=()=>{clear();const main=ctx,L=layer(),p=P(),dy=18*sinP(1);ctx=L;
    tileScroll(gl,3200,-p*3200,-100+dy,.35);
    tileScroll(rim,2600,p*2600-14,-190+dy-22,.75);tileScroll(dk,2600,p*2600,-190+dy,1);
    tileScroll(rim2,1900,-p*2*1900-10,-60-dy-16,.55);tileScroll(dk2,1900,-p*2*1900,-60-dy,.9);
    L.globalCompositeOperation='destination-in';const m=L.createLinearGradient(0,0,0,H);m.addColorStop(0,'rgba(0,0,0,.95)');m.addColorStop(.26,'rgba(0,0,0,.3)');m.addColorStop(.5,'rgba(0,0,0,.2)');m.addColorStop(.78,'rgba(0,0,0,.85)');m.addColorStop(1,'rgba(0,0,0,1)');L.fillStyle=m;L.fillRect(0,0,W,H);
    ctx=main;ctx.drawImage(_lay,0,0,W,H);
    for(const b of bats){const x=wrap(b.x0+b.dir*p*b.cyc*(W+400),W+400)-200,y=b.y0+b.amp*Math.sin(TAU*(b.ak*p+b.ap)),f=Math.sin(TAU*(b.fk*p+b.fp));
      ctx.save();ctx.translate(x,y);ctx.scale(b.s*b.dir,b.s);ctx.rotate(.12*Math.cos(TAU*(b.ak*p+b.ap)));ctx.fillStyle='rgba(8,4,14,1)';ctx.shadowColor='rgba(255,120,30,.6)';ctx.shadowBlur=16*S;bat(f);ctx.restore()}
    ctx.shadowBlur=0};
};
