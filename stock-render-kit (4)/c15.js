/* 15 - autumn leaves blown by wind, transparent alpha channel, vertical, seamless loop */
C[15]=()=>{newTL();const R=rng(1515),PAL=[[178,34,24],[214,88,22],[236,140,26],[244,186,36],[201,150,34],[134,74,24],[160,38,30],[188,160,40]];
  const sh=(c,k)=>c.map(v=>clamp(Math.round(v*(1+k)),0,255)),css=(c,a=1)=>`rgba(${c[0]},${c[1]},${c[2]},${a})`,cache={},size=Math.round(160*S);
  const outline=(shape,p)=>{const pts=[];const N=90;
    if(shape===0){for(let i=0;i<=N;i++){const t=i/N*Math.PI;pts.push([Math.pow(Math.sin(t),.9)*.4*(1+.05*Math.sin(t*3)),-t/Math.PI])}}
    else if(shape===1){for(let i=0;i<=120;i++){const f=-Math.PI+i/120*TAU,rr=.52*(.45+.55*Math.pow(Math.abs(Math.cos(2.5*f)),.7))*(1+.07*Math.sin(f*30));pts.push([rr*Math.sin(f)*.95,-.5-rr*Math.cos(f)*1.0])}}
    else if(shape===2){for(let i=0;i<=N;i++){const t=i/N*Math.PI;pts.push([Math.sin(t)*.34*(1+.24*Math.sin(t*7)),-t/Math.PI])}}
    else if(shape===3){for(let i=0;i<=140;i++){const t=i/140*Math.PI;pts.push([Math.pow(Math.sin(t),.8)*.38*(1+.07*(((t*22)%1)<.5?1:-1)),-t/Math.PI])}}
    else{for(let i=0;i<=N;i++){const f=-1.15+i/N*2.3,rr=.98*(1-.16*Math.exp(-Math.pow(f/.09,2)))+.03*Math.sin(f*14);pts.push([rr*Math.sin(f)*.92,-rr*Math.cos(f)+.12])}}
    return pts};
  const leaf=(shape,ci)=>{const key=shape+'_'+ci;if(cache[key])return cache[key];const k=offscreen(size,size),x=k.getContext('2d'),c=PAL[ci],pts=outline(shape),L=size*.78;
    x.translate(size/2,size*.9);x.scale(L,L);x.lineJoin='round';x.lineCap='round';
    const g=x.createLinearGradient(0,.1,0,-1);g.addColorStop(0,css(sh(c,-.35)));g.addColorStop(.5,css(c));g.addColorStop(1,css(sh(c,.2)));
    x.beginPath();if(shape===0||shape===2||shape===3){pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));for(let i=pts.length-1;i>=0;i--)x.lineTo(-pts[i][0],pts[i][1])}else pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();
    x.fillStyle=g;x.fill();x.strokeStyle=css(sh(c,-.4),.85);x.lineWidth=.014;x.stroke();
    x.strokeStyle=css(sh(c,-.38),.7);x.lineWidth=.016;x.beginPath();
    if(shape===1){for(let a=-2;a<=2;a++){const f=a*.4*Math.PI*.99;x.moveTo(0,-.5);x.lineTo(Math.sin(f)*.46,-.5-Math.cos(f)*.46)}x.moveTo(0,.12);x.lineTo(0,-.5)}
    else if(shape===4){for(let a=-5;a<=5;a++){const f=a*.2;x.moveTo(0,.1);x.lineTo(Math.sin(f)*.82,.12-Math.cos(f)*.82)}}
    else{x.moveTo(0,.08);x.lineTo(0,-.94);for(let v=1;v<=5;v++){const y=-v*.15;for(const s of[-1,1]){x.moveTo(0,y);x.lineTo(s*.26*(1-v*.08),y-.14)}}}
    x.stroke();x.strokeStyle='#5a3417';x.lineWidth=.04;x.beginPath();x.moveTo(0,.08);x.lineTo(0,.22);x.stroke();
    const hi=x.createRadialGradient(-.1,-.55,0,-.1,-.55,.5);hi.addColorStop(0,'rgba(255,240,190,.22)');hi.addColorStop(1,'rgba(255,240,190,0)');x.globalCompositeOperation='source-atop';x.fillStyle=hi;x.fillRect(-1,-1.2,2,1.6);return cache[key]=k};
  const mk=(n,m,l0,l1,a)=>Array.from({length:n},()=>({s0:R(),lat:(R()-.5)*(W+H)*.9,m,len:l0+R()*(l1-l0),shape:(R()*5)|0,ci:(R()*PAL.length)|0,ph:R()*TAU,fk:1+((R()*2)|0),rk:(R()<.5?-1:1)*(1+((R()*2)|0)),sw:30+R()*90,sk:1+((R()*3)|0),a,swirl:R()<.15}));
  const LY=[mk(52,1,36,62,.9),mk(42,2,70,108,1),mk(20,3,124,176,1)],dir=.95,cd=Math.cos(dir),sd=Math.sin(dir),LP=Math.hypot(W,H)+520;
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR;ctx.globalCompositeOperation='source-over';
    for(const Ly of LY)for(const p of Ly){const s=(p.s0+p.m*u)%1,a=(s-.5)*LP,perp=p.lat+p.sw*Math.sin(s*TAU*p.sk+p.ph);let x=W/2+cd*a-sd*perp,y=H/2+sd*a+cd*perp;if(p.swirl){x+=60*Math.cos(th*2+p.ph);y+=40*Math.sin(th*2+p.ph)}
      const rot=p.ph+p.rk*TAU*u+.4*Math.sin(th*2+p.ph),sx=Math.cos(th*p.fk+p.ph*1.7),f=.32+.68*Math.abs(sx);
      ctx.globalAlpha=p.a;ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(f,1);ctx.drawImage(leaf(p.shape,p.ci),-p.len*.64,-p.len*.9,p.len*1.28,p.len*1.28);ctx.restore()}
    ctx.globalAlpha=1}};
