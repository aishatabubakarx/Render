/* 13 SYNTHWAVE: retro neon sun, scrolling perspective grid, wireframe mountains */
C[13]=()=>{newTL();const R=rng(130),E={s:0};
  tl.to(E,{s:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const hz=H*.54,st=stars(R,160,{h:.5,big:1.8});
  const mt=(seed,amp,x0,x1)=>{const a=[];for(let x=x0;x<=x1;x+=16)a.push([x,hz-amp*(Math.pow(Math.abs(fbm(x*.004,seed,0,3)),.8)*1.5+.2)*(.25+.75*Math.abs((x-W/2)/(W/2))**1.2)]);return a};
  const M=[mt(1,230,0,W),mt(5,150,0,W)];
  draw=()=>{const p=ph(),vx=W/2+36*Math.sin(TAU*p);clear('#0a0020');
    const sk=ctx.createLinearGradient(0,0,0,hz);sk.addColorStop(0,'#05000f');sk.addColorStop(.5,'#2a0a5a');sk.addColorStop(.85,'#b2186e');sk.addColorStop(1,'#ff6a3d');ctx.fillStyle=sk;ctx.fillRect(0,0,W,hz);
    ctx.globalCompositeOperation='lighter';drawStars(st,1,.6);ctx.globalCompositeOperation='source-over';
    /* sun */
    const sx=W/2,sy=hz-250,sr=270;ctx.save();ctx.beginPath();ctx.arc(sx,sy,sr,0,TAU);ctx.clip();const sg=ctx.createLinearGradient(0,sy-sr,0,sy+sr);sg.addColorStop(0,'#fff27a');sg.addColorStop(.45,'#ff9a3c');sg.addColorStop(.75,'#ff2f8e');sg.addColorStop(1,'#8a1bd0');ctx.fillStyle=sg;ctx.fillRect(sx-sr,sy-sr,sr*2,sr*2);
    ctx.fillStyle='#18033a';for(let i=0;i<9;i++){const t=fr(i/9+p),yy=sy+sr*(-.15+t*1.15),th=2+t*t*30;ctx.fillRect(sx-sr,yy,sr*2,th)}ctx.restore();
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55+.15*E.s;ctx.drawImage(soft([255,80,150],256,.2),sx-sr*1.9,sy-sr*1.9,sr*3.8,sr*3.8);ctx.globalAlpha=1;
    /* mountains */
    ctx.globalCompositeOperation='source-over';M.forEach((m,i)=>{ctx.beginPath();ctx.moveTo(0,hz);m.forEach(q=>ctx.lineTo(q[0],q[1]));ctx.lineTo(W,hz);ctx.closePath();ctx.fillStyle=i?'#14043a':'#0c0226';ctx.fill();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=i?'rgba(255,60,200,.9)':'rgba(60,220,255,.8)';ctx.lineWidth=2;ctx.stroke();ctx.strokeStyle=i?'rgba(255,60,200,.18)':'rgba(60,220,255,.18)';ctx.lineWidth=9;ctx.stroke();ctx.globalCompositeOperation='source-over'});
    /* floor */
    const fg=ctx.createLinearGradient(0,hz,0,H);fg.addColorStop(0,'#2a0638');fg.addColorStop(1,'#07000f');ctx.fillStyle=fg;ctx.fillRect(0,hz,W,H-hz);
    ctx.globalCompositeOperation='lighter';
    for(const [lw,a] of [[10,.12],[3,.45],[1.4,1]]){ctx.lineWidth=lw;ctx.strokeStyle=`rgba(255,60,210,${a})`;
      for(let i=0;i<16;i++){const t=fr(i/16+p*1),y=hz+(H-hz)*t*t;ctx.globalAlpha=Math.min(1,t*5);ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
      ctx.globalAlpha=1;ctx.strokeStyle=`rgba(70,210,255,${a})`;for(let j=-24;j<=24;j++){ctx.beginPath();ctx.moveTo(vx+j*14,hz);ctx.lineTo(vx+j*210,H);ctx.stroke()}}
    ctx.globalAlpha=.7;const hg=ctx.createLinearGradient(0,hz-20,0,hz+90);hg.addColorStop(0,'rgba(255,120,200,.0)');hg.addColorStop(.25,'rgba(255,110,190,.8)');hg.addColorStop(1,'rgba(255,60,200,0)');ctx.fillStyle=hg;ctx.fillRect(0,hz-20,W,110);
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';const v=ctx.createRadialGradient(W/2,H*.55,H*.4,W/2,H/2,W*.7);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(5,0,15,.55)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)};
};
