/* c0.js - shared helpers for the holiday pack (no clip is defined here). Everything is deterministic: rng(seed) only. */
const HP={};
/* 4-point glint = glow sprite + long thin cross + short diagonal cross. Rotation must keep 90 degree symmetry in loops. */
HP.glint=(x,y,r,a,sprite,rot=0,col='#fff')=>{
  ctx.globalAlpha=a*.75;ctx.drawImage(sprite,x-r*1.5,y-r*1.5,r*3,r*3);
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);HP.star4(r,a,col,.028);ctx.rotate(Math.PI/4);HP.star4(r*.55,a*.8,col,.04);ctx.restore()};
HP.star4=(r,a,col,t)=>{const q=r*t;ctx.globalAlpha=a;ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(0,-r);ctx.quadraticCurveTo(q,-q,r,0);ctx.quadraticCurveTo(q,q,0,r);ctx.quadraticCurveTo(-q,q,-r,0);ctx.quadraticCurveTo(-q,-q,0,-r);ctx.fill()};
/* soft dot sprite with a solid core (keeps edges clean on a green screen) */
HP.dot=(c,size=64,core=.55)=>{const key='dot'+c.join()+size+core;if(_sc[key])return _sc[key];
  const k=document.createElement('canvas');k.width=k.height=size;const x=k.getContext('2d'),h=size/2,g=x.createRadialGradient(h,h,0,h,h,h);
  g.addColorStop(0,`rgba(${c},1)`);g.addColorStop(core,`rgba(${c},.92)`);g.addColorStop(1,`rgba(${c},0)`);x.fillStyle=g;x.fillRect(0,0,size,size);return _sc[key]=k};
HP.heartP=(x,y,s)=>{ctx.beginPath();ctx.moveTo(x,y+s*.9);ctx.bezierCurveTo(x-s*1.25,y+s*.1,x-s*.7,y-s*.85,x,y-s*.35);ctx.bezierCurveTo(x+s*.7,y-s*.85,x+s*1.25,y+s*.1,x,y+s*.9);ctx.fill()};
/* white six-arm snowflake sprites (n variants), sized for the current scale S */
HP.flakes=(n,seed)=>{HP._f=HP._f||{};const key=n+'_'+seed+'_'+S;if(HP._f[key])return HP._f[key];
  const R=rng(seed),size=Math.round(128*S+64),out=[];
  for(let v=0;v<n;v++){const k=offscreen(size,size),x=k.getContext('2d'),L=size*.45;x.translate(size/2,size/2);x.lineCap='round';x.lineJoin='round';
    x.strokeStyle='#fff';x.fillStyle='#fff';const nb=2+(v%2),pos=[.3+R()*.08,.52+R()*.08,.74+R()*.06],tip=R()<.5,bl0=.3+R()*.08;
    for(let a=0;a<6;a++){x.save();x.rotate(a*Math.PI/3);x.lineWidth=L*.115;x.beginPath();x.moveTo(0,0);x.lineTo(0,-L);x.stroke();
      for(let b=0;b<nb;b++){const bl=L*(bl0-b*.07);x.lineWidth=L*.08;for(const s of[-1,1]){x.beginPath();x.moveTo(0,-L*pos[b]);x.lineTo(s*bl*.866,-L*pos[b]-bl*.5);x.stroke()}}
      if(tip){x.beginPath();x.arc(0,-L,L*.065,0,TAU);x.fill()}x.restore()}
    x.beginPath();for(let a=0;a<6;a++){const t=a*Math.PI/3;x.lineTo(Math.cos(t)*L*.15,Math.sin(t)*L*.15)}x.closePath();x.fill();out.push(k)}
  return HP._f[key]=out};
/* ---------- pine branch frames (clips 3-8) ---------- */
HP.pine=o=>()=>{newTL();const R=rng(o.seed),sz=Math.min(W,H),M=70,red=o.bg==='red',cx=W/2,cy=o.top?H*.18:H/2;
  const BR=[];const add=(x,y,ang,len,curve,nl,layer)=>BR.push({x,y,ang,len,curve,nl,layer,ph:R()*6});
  if(!o.top){for(const[px,py]of[[0,0],[W,0],[0,H],[W,H]]){const dx=px===0?1:-1,dyIn=py===0?1:-1,dxIn=dx;
      for(let layer=0;layer<2;layer++)for(let q=0;q<2;q++){
        const th=.015+R()*.05,hl=W*(.38+R()*.34),vl=H*(.42+R()*.2),nl=()=>sz*(.085+.028*layer+R()*.022);
        add(px-dx*70,py+dyIn*(4+R()*48+q*26),(dx>0?0:Math.PI)+dx*dyIn*th,hl,dx*dyIn*(.04+R()*.12)*(q?-1:1),nl(),layer);
        const hv=dyIn>0?Math.PI/2:-Math.PI/2;
        add(px+dxIn*(4+R()*48+q*26),py-dyIn*70,hv+(dyIn>0?-1:1)*dxIn*th,vl,(dyIn>0?-1:1)*dxIn*(.04+R()*.12)*(q?-1:1),nl(),layer)}}}
  else{for(const[px,dx]of[[0,1],[W,-1]])for(let layer=0;layer<2;layer++)for(let k=0;k<3;k++){
        const th=.03+R()*.1;add(px-dx*70,14+R()*46+k*34,(dx>0?0:Math.PI)+dx*th,W*(.5+R()*.28),dx*(.05+R()*.16)*(k%2?-1:1),sz*(.11+.03*layer+R()*.02),layer)}
      for(const[fx,fa]of[[.1,.35],[.24,.2],[.37,.1],[.5,0],[.63,-.1],[.76,-.2],[.9,-.35]])for(let layer=0;layer<2;layer++)add(W*fx+(R()-.5)*50,20,Math.PI/2+fa,H*(.13+R()*.1)*(o.vh?1:1.15),(R()-.5)*.5,sz*(.085+.025*layer),layer)}
  const LY=[offscreen((W+2*M)*S,(H+2*M)*S),offscreen((W+2*M)*S,(H+2*M)*S)],ANC=[[],[]];
  const lx=LY.map(k=>{const x=k.getContext('2d');x.setTransform(S,0,0,S,M*S,M*S);x.lineCap='round';return x});
  BR.sort((a,b)=>a.layer-b.layer);
  for(const b of BR){const x=lx[b.layer],N=Math.max(14,(b.len/7)|0),pts=[];let px=b.x,py=b.y;
    for(let i=0;i<=N;i++){const t=i/N,a=b.ang+b.curve*Math.pow(t,1.15)+Math.sin(t*5+b.ph)*.035;if(i>0){px+=Math.cos(a)*b.len/N;py+=Math.sin(a)*b.len/N}pts.push([px,py,a,t])}
    x.strokeStyle=b.layer?'#4a2c18':'#2c1a0e';x.lineWidth=4.6;x.beginPath();pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();
    for(let rank=0;rank<3;rank++)for(let i=1;i<=N;i++){const[nx,ny,a,t]=pts[i];
      for(const s of[-1,1]){const ang=a+s*(.58+.26*R()),len=b.nl*(1-t*.8)*(.8+.32*R())*(rank===2?.78:1);
        const hue=o.hue+R()*14,l=(b.layer?16:10)+rank*7+R()*8+(1-t)*3;x.strokeStyle=`hsl(${hue},${44+R()*12}%,${l}%)`;x.lineWidth=rank===2?1.9:2.5;
        const ex=nx+Math.cos(ang)*len,ey=ny+Math.sin(ang)*len;x.beginPath();x.moveTo(nx,ny);x.lineTo(ex,ey);x.stroke();
        if(rank===2&&R()<.4){x.strokeStyle=`hsla(${hue+6},50%,${l+22}%,.55)`;x.lineWidth=.8;x.beginPath();x.moveTo(nx,ny);x.lineTo(nx+(ex-nx)*.9,ny+(ey-ny)*.9-.6);x.stroke()}
        if(rank>=1&&R()<.07)ANC[b.layer].push([ex,ey])}}}
  const gc=o.sparkle,sprs=gc.map(c=>spr(c,128)),big=gc.map(c=>`rgb(${c})`);
  const mk=(n,layer,r0,r1)=>Array.from({length:n},()=>{const a=ANC[layer][(R()*ANC[layer].length)|0]||[W/2,H/2];return{x:a[0]+(R()-.5)*14,y:a[1]+(R()-.5)*14,r:r0+R()*(r1-r0)*(R()<.2?1.8:1),c:(R()*gc.length)|0,k:1+((R()*3)|0),ph:R()*TAU,rm:(R()<.5?1:-1)}});
  const GL=[mk(46,0,7,22),mk(58,1,9,30)],SP=[Array.from({length:520},()=>({...mk(1,0,1,2.6)[0]})),Array.from({length:700},()=>({...mk(1,1,1,3)[0]}))];
  const BG=Array.from({length:red?1500:0},()=>({x:R()*W,y:R()*H,s:1+R()*1.8,k:1+((R()*3)|0),ph:R()*TAU+0,a:.1+R()*.3}));
  const DU=Array.from({length:red?0:70},()=>({x:R(),y:R(),m:1+((R()*2)|0),r:2+R()*7,a:.08+R()*.25,ph:R()*TAU,k:1+((R()*2)|0)})),gold=spr([255,200,110],64);
  const sway=(l,th)=>{ctx.setTransform(S,0,0,S,0,0);ctx.translate(cx,cy);ctx.rotate((l?.0042:.0058)*Math.sin(th+(l?0:1.4)));ctx.translate(-cx+3.5*Math.sin(th*1+l*2),-cy+2.5*Math.cos(th+l))};
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;
    if(red){const g=ctx.createRadialGradient(W/2,H*.48,0,W/2,H*.48,Math.hypot(W,H)*.62);g.addColorStop(0,'#c1131f');g.addColorStop(.5,'#8d0b17');g.addColorStop(1,'#380409');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      ctx.globalCompositeOperation='lighter';ctx.fillStyle='#ffd9a0';for(const p of BG){const tw=Math.pow(Math.max(0,Math.sin(th*p.k+p.ph)),8);ctx.globalAlpha=p.a*.4+tw*.7;ctx.fillRect(p.x,p.y,p.s,p.s)}
      ctx.save();ctx.translate(W/2,H/2);ctx.rotate(-.55);const bx=((u%1)*1.5-.75)*(W+H);const sg=ctx.createLinearGradient(bx-260,0,bx+260,0);sg.addColorStop(0,'rgba(255,120,110,0)');sg.addColorStop(.5,'rgba(255,120,110,.16)');sg.addColorStop(1,'rgba(255,120,110,0)');ctx.fillStyle=sg;ctx.globalAlpha=1;ctx.fillRect(bx-260,-H*1.2,520,H*2.4);ctx.restore()}
    else{ctx.globalCompositeOperation='lighter';for(const d of DU){const y=((d.y-u*d.m*.5)%1+1)%1,x=d.x*W+30*Math.sin(th*d.k+d.ph),tw=.5+.5*Math.sin(th*2+d.ph);ctx.globalAlpha=d.a*(.4+.6*tw);ctx.drawImage(gold,x-d.r*2,y*H-d.r*2,d.r*4,d.r*4)}}
    for(let l=0;l<2;l++){ctx.setTransform(S,0,0,S,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=l?1:.9;sway(l,th);ctx.drawImage(LY[l],-M,-M,W+2*M,H+2*M);
      ctx.globalCompositeOperation='lighter';
      for(const p of SP[l]){const tw=Math.pow(Math.max(0,Math.sin(th*p.k+p.ph)),10);const al=.12+tw*.95;ctx.globalAlpha=al;ctx.fillStyle=big[p.c];ctx.fillRect(p.x-p.r*.5,p.y-p.r*.5,p.r,p.r)}
      for(const p of GL[l]){const tw=Math.pow(.5+.5*Math.sin(th*p.k+p.ph),2.4),rr=p.r*(.35+.65*tw);HP.glint(p.x,p.y,rr*1.5,.25+.75*tw,sprs[p.c],th/4*p.rm,big[p.c])}}
    ctx.setTransform(S,0,0,S,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(red?.18:.2,[2,4]);vignette(red?.45:.3);grain(.03)}};
/* ---------- pink luxury stars and dust (clips 9-10) ---------- */
HP.pink=o=>()=>{newTL();const R=rng(o.seed),cd=Math.cos(o.ang),sd=Math.sin(o.ang),D2=Math.hypot(W,H),L=D2+360;
  const COL=[[255,92,160],[255,168,200],[255,222,208],[255,255,255],[225,76,172]],FS=COL.map(c=>`rgb(${c})`),sp=COL.map(c=>spr(c,128));
  const P=[],N=Math.round(9500*W*H/(1920*1080));
  for(let i=0;i<N;i++){const z=R(),ly=z<.55?0:z<.9?1:2;P.push({s0:R(),off:(R()-.5)*D2*.95,amp:20+R()*150,k:1+((R()*2)|0),ph:R()*TAU,m:ly+1,sz:ly===0?1+R()*1.1:ly===1?1.5+R()*1.7:5+R()*7,a:ly===0?.3+R()*.4:ly===1?.45+R()*.5:.14+R()*.22,c:ly===2?(R()*3)|0:(R()*5)|0,tw:1+((R()*3)|0),twp:R()*TAU,ly})}
  P.sort((a,b)=>a.ly-b.ly||a.c-b.c);
  const ST=Array.from({length:62},()=>({s0:R(),off:(R()-.5)*D2*.8,amp:30+R()*100,k:1+((R()*2)|0),ph:R()*TAU,m:1+((R()*2)|0),r:12+R()*(R()<.14?64:30),c:(R()*4)|0,tw:1+((R()*2)|0),twp:R()*TAU,rm:R()<.5?1:-1}));
  const HT=Array.from({length:14},()=>({s0:R(),off:(R()-.5)*D2*.7,amp:40+R()*80,k:1,ph:R()*TAU,m:1+((R()*2)|0),r:7+R()*13,a:.35+R()*.4,tw:1+((R()*2)|0),twp:R()*TAU}));
  const HZ=Array.from({length:9},()=>({x:R()*W,y:R()*H,r:Math.max(W,H)*(.22+R()*.3),k:1+((R()*2)|0),ph:R()*TAU,c:R()<.7?[205,45,125]:[130,40,160],a:.03+R()*.035}));
  const pos=(p,u,th)=>{const s=(p.s0+p.m*u)%1,a=(s-.5)*L,perp=p.off+p.amp*Math.sin(s*TAU*2+th*p.k+p.ph);return[W/2+cd*a-sd*perp,H/2+sd*a+cd*perp,Math.pow(Math.sin(Math.PI*s),.6)]};
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;
    const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#14030e');bg.addColorStop(1,'#07020a');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    for(const h of HZ){const x=h.x+90*Math.sin(th*h.k+h.ph),y=h.y+70*Math.cos(th*h.k+h.ph*1.3);ctx.globalAlpha=h.a*(.7+.3*Math.sin(th*2+h.ph));const k=HP.dot(h.c,128,.04);ctx.drawImage(k,x-h.r,y-h.r,h.r*2,h.r*2)}
    let last=-1;for(const p of P){const[x,y,e]=pos(p,u,th),tw=Math.pow(.5+.5*Math.sin(th*p.tw+p.twp),3),al=p.a*e*(.22+.78*tw);if(al<.02)continue;
      if(p.ly===2){ctx.globalAlpha=al;ctx.drawImage(sp[p.c],x-p.sz,y-p.sz,p.sz*2,p.sz*2)}else if(p.ly===1){if(last!==p.c){ctx.strokeStyle=FS[p.c];ctx.fillStyle=FS[p.c];last=p.c}ctx.globalAlpha=al;ctx.lineWidth=p.sz*.7;const ln=7+p.sz*6;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-cd*ln,y-sd*ln);ctx.stroke()}else{if(last!==p.c){ctx.fillStyle=FS[p.c];last=p.c}ctx.globalAlpha=al;ctx.fillRect(x-p.sz/2,y-p.sz/2,p.sz,p.sz)}}
    for(const s of ST){const[x,y,e]=pos(s,u,th),tw=Math.pow(.5+.5*Math.sin(th*s.tw+s.twp),2.2);HP.glint(x,y,s.r*(.4+.6*tw),e*(.2+.8*tw),sp[s.c],th/4*s.rm,FS[s.c])}
    ctx.fillStyle='#ff6fa8';for(const h of HT){const[x,y,e]=pos(h,u,th),tw=.5+.5*Math.sin(th*h.tw+h.twp);ctx.globalAlpha=h.a*e*(.35+.65*tw);ctx.drawImage(sp[0],x-h.r*3,y-h.r*3,h.r*6,h.r*6);ctx.globalAlpha=h.a*e*(.5+.5*tw);HP.heartP(x,y,h.r*.55)}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.75,[2,4]);vignette(.55);grain(.03)}};
/* ---------- light leak flares on alpha (clips 11-12) ---------- */
HP.noiseTiles=(seed,w,h,n)=>{const R=rng(seed);return Array.from({length:n},()=>{const k=offscreen(w,h),x=k.getContext('2d'),d=x.createImageData(w,h);
  for(let i=0;i<w*h;i++){const v=R(),q=R()*R();d.data[i*4]=v<.55?255:0;d.data[i*4+1]=v<.55?255:0;d.data[i*4+2]=v<.55?255:0;d.data[i*4+3]=(v<.55?q*170:q*95)|0}x.putImageData(d,0,0);return k})};
HP.leak=o=>()=>{newTL();const R=rng(o.seed),CL=o.cols,glo=(i)=>spr(CL[i%CL.length],128);
  const BL=Array.from({length:6},(_,i)=>({x:o.bx[i][0],y:o.bx[i][1],r:o.bx[i][2],c:i%CL.length,k:1+((R()*2)|0),ph:R()*TAU,pk:o.pk[i%o.pk.length],pp:R()*TAU,a:o.a}));
  const ST=Array.from({length:o.nst},()=>({s0:R(),m:1+((R()*2)|0),w:o.sw*(.5+R()),a:.12+R()*.3,c:(R()*CL.length)|0,y:R()}));
  const GH=[-.75,-.35,.35,.7,1.25,1.7].map((k,i)=>({k,r:40+R()*110,a:.05+R()*.1,c:i%CL.length}));
  const TN=HP.noiseTiles(o.seed+5,640,360,6),sl=offscreen(2,4),sx=sl.getContext('2d');sx.fillStyle='rgba(0,0,0,.22)';sx.fillRect(0,0,2,1);
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR,fi=Math.floor(ms/33.333),rf=rng(fi*7919+o.seed),fl=1+.07*Math.sin(th*61)+.05*Math.sin(th*97+1)+(rf()-.5)*.08;
    ctx.globalCompositeOperation='lighter';
    for(const b of BL){const x=b.x*W+W*.06*Math.sin(th*b.k+b.ph),y=b.y*H+H*.08*Math.cos(th*b.k+b.ph),pu=Math.pow(.5+.5*Math.sin(th*b.pk+b.pp),1.5);ctx.globalAlpha=Math.min(1,b.a*(.03+1.05*pu)*fl);const R2=b.r*Math.max(W,H);ctx.drawImage(glo(b.c),x-R2,y-R2,R2*2,R2*2)}
    const pk=Math.pow(.5+.5*Math.sin(th*o.pk[0]+1),2);
    ctx.save();ctx.translate(W/2,H/2);ctx.rotate(o.rot);const span=Math.hypot(W,H);
    for(const s of ST){const bw=s.w,x=((s.s0+s.m*u)%1)*(span+2*bw)-bw-span/2;const c=CL[s.c],g=ctx.createLinearGradient(x-bw,0,x+bw,0);g.addColorStop(0,rgba(c,0));g.addColorStop(.5,rgba(c,1));g.addColorStop(1,rgba(c,0));ctx.fillStyle=g;ctx.globalAlpha=s.a*(.06+1.0*pk)*fl;ctx.fillRect(x-bw,-span/2,bw*2,span)}
    ctx.restore();
    const hx=W*(.5+.32*Math.sin(th)),hy=H*(.5+.12*Math.cos(th*2)),ly=H*o.ly;
    ctx.globalAlpha=Math.min(1,(.12+.88*pk)*fl*.9);const lg=ctx.createLinearGradient(0,0,W,0);lg.addColorStop(0,rgba(CL[0],0));lg.addColorStop(.5,rgba(CL[CL.length>2?3:0],1));lg.addColorStop(1,rgba(CL[0],0));ctx.fillStyle=lg;ctx.fillRect(0,ly-3+(hy-H/2)*.2,W,6);ctx.globalAlpha*=.4;ctx.fillRect(0,ly-14+(hy-H/2)*.2,W,28);
    ctx.globalAlpha=(.15+.85*pk)*fl;ctx.drawImage(spr(CL[CL.length>2?3:0],128),hx-W*.09,hy-W*.09,W*.18,W*.18);
    for(const g of GH){const gx=W/2+(hx-W/2)*g.k,gy=H/2+(hy-H/2)*g.k,gg=ctx.createRadialGradient(gx,gy,g.r*.55,gx,gy,g.r);gg.addColorStop(0,rgba(CL[g.c],0));gg.addColorStop(.85,rgba(CL[g.c],.6));gg.addColorStop(1,rgba(CL[g.c],0));ctx.fillStyle=gg;ctx.globalAlpha=g.a*(.1+pk)*fl;ctx.beginPath();ctx.arc(gx,gy,g.r,0,TAU);ctx.fill()}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.55,[2,4]);
    if(o.tv){ctx.save();ctx.setTransform(S,0,0,S,0,0);ctx.imageSmoothingEnabled=false;ctx.globalCompositeOperation='source-over';ctx.globalAlpha=o.tv;const t=TN[fi%6],ox=rf()*W*.4,oy=rf()*H*.4;ctx.drawImage(t,-ox,-oy,W*1.4,H*1.4);ctx.restore();
      ctx.save();ctx.globalAlpha=.9;ctx.fillStyle=ctx.createPattern(sl,'repeat');ctx.globalAlpha=.55;ctx.fillRect(0,0,W,H);ctx.restore();
      const ry=((u*2)%1)*(H+260)-130;const rg=ctx.createLinearGradient(0,ry-110,0,ry+110);rg.addColorStop(0,'rgba(255,255,255,0)');rg.addColorStop(.5,'rgba(255,255,255,.07)');rg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=rg;ctx.fillRect(0,ry-110,W,220);
      ctx.globalCompositeOperation='lighter';for(let q=0;q<2;q++)if(rf()<.1){ctx.globalAlpha=.25+rf()*.45;ctx.fillStyle='#fff';const bw=W*(.15+rf()*.5);ctx.fillRect(rf()*(W-bw),rf()*H,bw,1.5+rf()*12)}ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1}}};
/* ---------- falling snow on green (clips 13-14) ---------- */
HP.snow=o=>()=>{newTL();const R=rng(o.seed),A=W*H/(1920*1080),FL=HP.flakes(6,o.seed),D1=HP.dot([255,255,255],64,.6),D2=HP.dot([228,242,255],64,.55);
  const mk=(n,kind,m,r0,r1,a0,a1)=>Array.from({length:Math.round(n*A)},()=>({x0:R(),y0:R(),r:r0+R()*(r1-r0),a:a0+R()*(a1-a0),m,ph:R()*TAU,sw:8+R()*(20+m*14),k:1+((R()*2)|0),f:(R()*6)|0,rot:R()*TAU,rk:(R()<.5?-1:1)*(1+((R()*2)|0)),kind,t:R()<.4,fk:1+((R()*2)|0)}));
  const LY=[mk(520,'dot',1,1.2,2.5,.6,.9),mk(230,'dot',2,2.6,5.4,.8,1),mk(64,'flake',3,11,27,.9,1),mk(16,'flake',4,34,58,.75,.9)];
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;ctx.globalCompositeOperation='source-over';
    for(const L of LY)for(const p of L){const pad=90,y=((p.y0+p.m*u)%1)*(H+2*pad)-pad,x=p.x0*(W+120)-60+p.sw*Math.sin(th*p.k+p.ph)+50*Math.sin(th+p.ph*.3)*(p.m*.45);ctx.globalAlpha=p.a;
      if(p.kind==='dot'){const r=p.r*2;ctx.drawImage(p.t?D2:D1,x-r,y-r,r*2,r*2)}
      else{ctx.save();ctx.translate(x,y);ctx.rotate(p.rot+p.rk*th*.5+.3*Math.sin(th*2+p.ph));ctx.scale(.62+.38*Math.cos(th*p.fk+p.ph),1);ctx.drawImage(FL[p.f],-p.r,-p.r,p.r*2,p.r*2);ctx.restore()}}
    ctx.globalAlpha=1}};
