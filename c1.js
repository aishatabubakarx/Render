/* 1 - red New Year glitter pattern, vertical, seamless loop */
C[1]=()=>{newTL();const R=rng(101),GS=14,P=[],FS=['#ffd27a','#fff1d0','#ff8aa0','#ffffff'];
  for(let j=0;j<=Math.ceil(H/GS);j++)for(let i=0;i<=Math.ceil(W/GS);i++){const x=(i+(j&1?.5:0)+(R()-.5)*.8)*GS,y=(j+(R()-.5)*.8)*GS,t=R();
    P.push({x,y,s:t<.8?1.6+R()*1.5:2.8+R()*2.4,c:t<.55?0:t<.8?1:t<.93?2:3,k:1+((R()*3)|0),ph:x*.0049+y*.0031+R()*1.1,a:.22+R()*.34})}
  P.sort((a,b)=>a.c-b.c);
  const ST=Array.from({length:66},(_,i)=>({x:60+R()*(W-120),y:60+R()*(H-120),r:i<8?52+R()*24:13+R()*32,k:1+((R()*2)|0),ph:R()*TAU,c:(R()*4)|0,rm:R()<.5?1:-1}));
  const MO=Array.from({length:240},()=>({x:R()*W,y0:R(),m:1+((R()*2)|0),r:2+R()*7,a:.2+R()*.5,ph:R()*TAU,k:1+((R()*2)|0)}));
  const SPR=[[255,205,110],[255,240,205],[255,140,160],[255,255,255]].map(c=>spr(c,128)),gold=spr([255,200,100],64);
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;
    const g=ctx.createRadialGradient(W*.5,H*.42,0,W*.5,H*.42,Math.hypot(W,H)*.62);g.addColorStop(0,'#a50f1c');g.addColorStop(.5,'#6f0812');g.addColorStop(1,'#260208');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    ctx.save();ctx.translate(W/2,H/2);ctx.rotate(-.5);const bx=((u%1)*1.5-.75)*(W+H),sg=ctx.createLinearGradient(bx-300,0,bx+300,0);sg.addColorStop(0,'rgba(255,130,120,0)');sg.addColorStop(.5,'rgba(255,130,120,.2)');sg.addColorStop(1,'rgba(255,130,120,0)');ctx.fillStyle=sg;ctx.globalAlpha=1;ctx.fillRect(bx-300,-H*1.3,600,H*2.6);ctx.restore();
    let last=-1;for(const p of P){const tw=Math.pow(Math.max(0,Math.sin(th*p.k+p.ph)),9);ctx.globalAlpha=Math.min(1,p.a+tw*.95);if(last!==p.c){ctx.fillStyle=FS[p.c];last=p.c}ctx.fillRect(p.x-p.s/2,p.y-p.s/2,p.s,p.s)}
    for(const m of MO){const y=H-((m.y0+u*m.m)%1)*(H+80)+40,x=m.x+26*Math.sin(th*m.k+m.ph),tw=.5+.5*Math.sin(th*2+m.ph);ctx.globalAlpha=m.a*(.3+.7*tw);ctx.drawImage(gold,x-m.r*2,y-m.r*2,m.r*4,m.r*4)}
    for(const s of ST){const tw=Math.pow(.5+.5*Math.sin(th*s.k+s.ph),2.2);HP.glint(s.x,s.y,s.r*(.35+.65*tw),.2+.8*tw,SPR[s.c],th/4*s.rm,['#ffd27a','#fff1d0','#ff9fb0','#fff'][s.c])}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.28,[2,4]);vignette(.6);grain(.03)}};
