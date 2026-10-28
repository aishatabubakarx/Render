const eio=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,eo3=t=>1-Math.pow(1-clamp(t,0,1),3);
/* 17 HAND DRAWN DOODLE ARROWS AND CALLOUTS  (alpha) */
C[17]=()=>{newTL();const R=rng(171);
  const bez=(p0,p1,p2,n=48)=>Array.from({length:n+1},(_,i)=>{const t=i/n,u=1-t;return[u*u*p0[0]+2*u*t*p1[0]+t*t*p2[0],u*u*p0[1]+2*u*t*p1[1]+t*t*p2[1]]});
  const head=(pts,s=.28,sp=.5)=>{const a=pts[pts.length-1],b=pts[pts.length-4],ang=Math.atan2(a[1]-b[1],a[0]-b[0]);return[[[a[0]+Math.cos(ang+Math.PI-sp)*s,a[1]+Math.sin(ang+Math.PI-sp)*s],a,[a[0]+Math.cos(ang+Math.PI+sp)*s,a[1]+Math.sin(ang+Math.PI+sp)*s]]]};
  const ell=(rx,ry,t0,t1,n=90,w=.06)=>Array.from({length:n+1},(_,i)=>{const t=lerp(t0,t1,i/n)*TAU,k=1+w*Math.sin(t*2.3)+.05*(i/n);return[Math.cos(t)*rx*k,Math.sin(t)*ry*k]});
  const D=[];const add=(strokes,col,cx,cy,sz)=>D.push({strokes,col,cx,cy,sz});
  let a1=bez([-.95,.7],[-.2,-1.1],[.95,-.2]);add([a1,...head(a1)],[255,226,60],0,0,1);
  add([ell(.95,.62,-.1,1.12)],[255,255,255],0,0,1);
  add([Array.from({length:70},(_,i)=>[lerp(-1,1,i/69),.3*Math.sin(lerp(-1,1,i/69)*10)*(1-.2*Math.abs(lerp(-1,1,i/69)))])],[255,90,110],0,0,1);
  add([[[-.8,.05],[-.3,.7],[.95,-.75]]],[80,235,140],0,0,1);
  {const o=[0,2,4,1,3,0].map(i=>{const a=-Math.PI/2+i*TAU/5;return[Math.cos(a)*.95,Math.sin(a)*.95]});add([o],[255,214,60],0,0,1)}
  add([Array.from({length:100},(_,i)=>{const t=i/99*TAU;return[16*Math.sin(t)**3/17,-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))/17]})],[255,100,170],0,0,1);
  add([[[-.8,-.8],[.8,.8]],[[.8,-.8],[-.8,.8]]],[255,90,90],0,0,1);
  add(Array.from({length:8},(_,i)=>{const a=i/8*TAU+.2;return[[Math.cos(a)*.38,Math.sin(a)*.38],[Math.cos(a)*(.85+.1*(i%2)),Math.sin(a)*(.85+.1*(i%2))]]}),[255,255,255],0,0,1);
  add([ell(.9,.9,0,1.04,80,.03),[[-.35,-.25],[-.35,-.05]],[[.35,-.25],[.35,-.05]],Array.from({length:30},(_,i)=>{const t=lerp(.15,.85,i/29)*Math.PI;return[Math.cos(t)*.5,.1+Math.sin(t)*.38]})],[100,225,255],0,0,1);
  add([Array.from({length:110},(_,i)=>{const t=i/109,a=t*TAU*2.4;return[Math.cos(a)*t*.95,Math.sin(a)*t*.95]})],[190,140,255],0,0,1);
  let a2=bez([.9,-.8],[.9,.5],[-.9,.7]);add([a2,...head(a2)],[255,160,50],0,0,1);
  add([Array.from({length:50},(_,i)=>[lerp(-1,1,i/49),.04*Math.sin(i*.7)]),Array.from({length:50},(_,i)=>[lerp(-.85,.9,i/49),.35+.04*Math.sin(i*.8+1)])],[255,255,255],0,0,1);
  const cols=4,rowsN=3;D.forEach((d,i)=>{const c=i%cols,r=(i/cols)|0;d.cx=W*(.14+c*.24)+(R()-.5)*40;d.cy=H*(.2+r*.3)+(R()-.5)*30;d.sz=118+R()*30;d.rot=(R()-.5)*.3;d.tin=500+i*900;d.tout=12500+i*110;
    d.strokes=d.strokes.map(s=>s.map(([x,y])=>[x+(R()-.5)*.03,y+(R()-.5)*.03]));d.len=0;d.cum=d.strokes.map(s=>{let l=0;for(let k=1;k<s.length;k++)l+=Math.hypot(s[k][0]-s[k-1][0],s[k][1]-s[k-1][1]);const o=d.len;d.len+=l;return o})});
  draw=()=>{clear();const ms=now();ctx.lineCap='round';ctx.lineJoin='round';
    for(const d of D){const u=eio(clamp((ms-d.tin)/1000,0,1)),v=eio(clamp((ms-d.tout)/700,0,1)),a=d.len*v,b=d.len*u;if(b<=a+.001)continue;
      ctx.save();ctx.translate(d.cx,d.cy);ctx.rotate(d.rot);ctx.scale(d.sz,d.sz);ctx.strokeStyle=rgba(d.col,1);ctx.lineWidth=11/d.sz;ctx.shadowColor='rgba(0,0,0,.4)';ctx.shadowBlur=8*S;
      d.strokes.forEach((s,si)=>{let off=d.cum[si];ctx.beginPath();let started=false;for(let k=1;k<s.length;k++){const l=Math.hypot(s[k][0]-s[k-1][0],s[k][1]-s[k-1][1]),s0=off,s1=off+l;off=s1;if(s1<a||s0>b)continue;
        const t0=clamp((a-s0)/l,0,1),t1=clamp((b-s0)/l,0,1),x0=lerp(s[k-1][0],s[k][0],t0),y0=lerp(s[k-1][1],s[k][1],t0),x1=lerp(s[k-1][0],s[k][0],t1),y1=lerp(s[k-1][1],s[k][1],t1);if(!started){ctx.moveTo(x0,y0);started=true}ctx.lineTo(x1,y1)}ctx.stroke()});ctx.restore()}};
};
/* 18 VHS GLITCH RGB SPLIT DISTORTION OVERLAY  (black, screen blend) */
C[18]=()=>{newTL();
  draw=()=>{clear();const ms=now(),p=P(),slot=Math.floor(ms/110),sl=hash1(slot*3.7),big=ms%3750<260;
    ctx.fillStyle='rgba(255,255,255,.035)';for(let y=0;y<H;y+=4)ctx.fillRect(0,y,W,2);
    const by=wrap(p*4*H,H+300)-150,g=ctx.createLinearGradient(0,by-110,0,by+110);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.07)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(0,by-110,W,220);
    const inten=big?.7:sl>.66?(sl-.66)/.34*.85+.15:0;
    if(inten>0){const r=rng(slot*977+5),n=4+Math.floor(inten*26);ctx.globalCompositeOperation='lighter';
      for(let i=0;i<n;i++){const y=r()*H,h=3+r()*58*inten,w=W*(.12+r()*.7),x=r()*(W-w*.3),dx=8+r()*70*inten,al=.35+r()*.5;ctx.globalAlpha=al;ctx.fillStyle='rgb(255,0,70)';ctx.fillRect(x-dx,y,w,h);ctx.fillStyle='rgb(0,255,230)';ctx.fillRect(x+dx,y,w,h);ctx.globalAlpha=al*.5;ctx.fillStyle='rgb(40,60,255)';ctx.fillRect(x,y+h*.3,w*.7,h*.4)}
      for(let i=0;i<Math.floor(inten*18);i++){const s=8+r()*50;ctx.globalAlpha=.3+r()*.5;ctx.fillStyle=['#ff2d6f','#26ffe6','#fff','#3a4bff'][(r()*4)|0];ctx.fillRect(r()*W,r()*H,s*(1+r()*3),s*.5)}
      const ny=r()*H*.9,nh=40+r()*140*inten;ctx.fillStyle='#fff';for(let i=0;i<1100*inten;i++){ctx.globalAlpha=.15+r()*.6;ctx.fillRect(r()*W,ny+r()*nh,1+r()*3,1+r()*2)}
      if(big){ctx.globalAlpha=.55;ctx.fillStyle='#fff';ctx.fillRect(0,r()*H,W,3);ctx.fillStyle='rgb(255,0,70)';ctx.fillRect(0,r()*H,W,2)}ctx.globalCompositeOperation='source-over'}
    ctx.globalAlpha=1;const o=inten>0?6+inten*10:0,sec=Math.floor(ms/1000),tc=`00:00:${String(sec).padStart(2,'0')}`;
    for(const [dx,col] of [[-o,'rgba(255,0,70,.8)'],[o,'rgba(0,255,230,.8)'],[0,'#fff']]){if(!dx&&o===0&&col!=='#fff')continue;ctx.globalCompositeOperation=dx?'lighter':'source-over';
      ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(110+dx,86);ctx.lineTo(110+dx,134);ctx.lineTo(150+dx,110);ctx.closePath();ctx.fill();
      txt('PLAY',180+dx,110,{f:'JetBrains Mono',w:700,size:54,ls:4,al:'left',fill:col});txt('SP  '+tc,W-110+dx,110,{f:'JetBrains Mono',w:700,size:44,ls:3,al:'right',fill:col});
      if(Math.floor(ms/500)%2===0){ctx.fillStyle=col;ctx.beginPath();ctx.arc(W-560+dx,110,13,0,TAU);ctx.fill()}}
    ctx.globalCompositeOperation='source-over'};
};
/* 19 COLOR WIPE TRANSITION PACK: BARS, CIRCLES, COLUMNS  (alpha, cover point at 2.5 s / 7.5 s / 12.5 s) */
C[19]=()=>{newTL();const pal=[[124,58,237],[236,72,153],[251,146,60],[34,211,238],[250,204,21],[52,211,153]];
  const win=(u,d,dur=.3)=>clamp((u-d)/dur,0,1),out=(u,d,dur=.3)=>clamp((u-.5-d)/dur,0,1);
  draw=()=>{clear();const ms=now(),seg=Math.min(2,Math.floor(ms/5000)),u=(ms-seg*5000)/5000;
    if(seg===0){const n=6,sk=260;for(let i=0;i<n;i++){const d=i*.04,xl=lerp(-sk,W+sk,eio(out(u,d))),xr=lerp(-sk,W+sk,eio(win(u,d)));if(xr<=xl+1)continue;ctx.fillStyle=rgba(pal[i],1);ctx.beginPath();ctx.moveTo(xl,0);ctx.lineTo(xr+sk,0);ctx.lineTo(xr,H);ctx.lineTo(xl-sk,H);ctx.closePath();ctx.fill()}}
    else if(seg===1){const n=5,mr=Math.hypot(W,H)/2+60;for(let i=0;i<n;i++){const full=mr*(1-i*.14),rin=eio(win(u,i*.04)),rout=eio(out(u,(n-1-i)*.04)),r=full*rin*(1-rout);if(r<1)continue;ctx.fillStyle=rgba(pal[(i+1)%6],1);ctx.beginPath();ctx.arc(W/2,H/2,r,0,TAU);ctx.fill()}}
    else{const n=16,w=W/n;for(let j=0;j<n;j++){const d=(j/(n-1))*.2,y1=H*eio(win(u,d)),y0=H*eio(out(u,d));if(y1<=y0+.5)continue;ctx.fillStyle=rgba(pal[j%6],1);ctx.fillRect(j*w,y0,w+1,y1-y0)}}};
};
/* 20 BREAKING NEWS BANNER WITH SCROLLING TICKER  (alpha) */
C[20]=()=>{newTL();const msg='LIVE COVERAGE   \u2022   STAY TUNED FOR THE LATEST UPDATES   \u2022   BREAKING NEWS   \u2022   ',tx0=640,bh=104,by=H-230,tagW=500;
  const mw=tw(msg,'Montserrat',800,40,3)||2000;
  draw=()=>{clear();const ms=now(),qi=eo3((ms-200)/700),qt=eo3((ms-600)/700),qb=eo3((ms-1000)/600),qo=eio(clamp((ms-13400)/900,0,1)),qA=Math.max(0,qi-qo),
    live=eo3((ms-300)/500)*(1-qo);
    /* LIVE badge */
    ctx.save();ctx.globalAlpha=live;ctx.translate(-(1-live)*200,0);ctx.fillStyle='#e11d2e';roundRect(80,70,190,64,14);ctx.fill();const pu=.6+.4*Math.sin(ms/220);ctx.fillStyle=`rgba(255,255,255,${pu})`;ctx.beginPath();ctx.arc(116,102,10,0,TAU);ctx.fill();txt('LIVE',190,103,{f:'Montserrat',w:800,size:34,ls:4,al:'left'});ctx.restore();
    /* bar */
    const yoff=(1-qi)*220+qo*220;ctx.save();ctx.translate(0,yoff);ctx.globalAlpha=Math.max(0,qi-qo);
    ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=30*S;const g=ctx.createLinearGradient(0,by,0,by+bh);g.addColorStop(0,'#16254d');g.addColorStop(1,'#0a1230');ctx.fillStyle=g;ctx.fillRect(60,by+8,W-120,bh-8);ctx.shadowBlur=0;ctx.fillStyle='rgba(255,255,255,.85)';ctx.fillRect(60,by+8,W-120,3);
    ctx.save();ctx.beginPath();ctx.rect(tx0,by+8,W-60-tx0,bh-8);ctx.clip();const sc=wrap(ms*.16,mw);for(let x=-sc;x<W;x+=mw)txt(msg,tx0+x+20,by+bh/2+8,{f:'Montserrat',w:800,size:40,ls:3,al:'left',fill:'#fff'});ctx.restore();
    ctx.restore();
    /* tag */
    ctx.save();ctx.translate(-(1-eo3((ms-600)/700))*700-qo*700,0);ctx.globalAlpha=1;ctx.translate(0,0);const ty=by-14,th=bh+14;
    ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=24*S;const tg=ctx.createLinearGradient(0,ty,0,ty+th);tg.addColorStop(0,'#ff3347');tg.addColorStop(1,'#c40f23');ctx.fillStyle=tg;ctx.beginPath();ctx.moveTo(60,ty);ctx.lineTo(60+tagW+30,ty);ctx.lineTo(60+tagW-20,ty+th);ctx.lineTo(60,ty+th);ctx.closePath();ctx.fill();ctx.shadowBlur=0;
    ctx.save();ctx.clip();const sw=wrap(ms/3000,1),sx=lerp(-200,tagW+300,sw);const sg=ctx.createLinearGradient(sx-80,0,sx+80,0);sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(.5,'rgba(255,255,255,.35)');sg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sg;ctx.fillRect(0,ty,W,th);ctx.restore();
    txt('BREAKING NEWS',60+tagW/2-10,ty+th/2+3,{f:'Montserrat',w:900,size:38,ls:3,fill:'#fff'});ctx.restore();
    ctx.globalAlpha=1};
};
