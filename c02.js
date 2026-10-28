/* 02 BLUE GLITTER underwater, slow motion, spotlight, shallow depth of field */
C[2]=()=>{newTL();const R=rng(22),E={f:0,s:0};
  tl.to(E,{f:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);            // focus pull front->back->front
  tl.to(E,{s:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);            // spotlight swell
  const ax=W*.66,ay=-120,ang=Math.PI/2+.22,half=.30,dirx=Math.cos(ang),diry=Math.sin(ang);
  const kz=z=>z<.12?3:z<.4?2:1;const COL=[[90,210,255],[60,140,255],[215,245,255],[70,235,225],[120,170,255]],PS=[];
  for(let i=0;i<1900;i++){const z=Math.pow(R(),.9);PS.push({x:R()*W,y:R()*(H+240),z,k:kz(z),m:1+(R()*2|0),a:6+R()*34,p:R()*TAU,tw:3+(R()*9|0),tp:R()*TAU,sz:.7+R()*1.3,c:COL[(R()*COL.length)|0],big:R()<.05})}
  const cone=mkLayer(W,H,.25);
  function lightCone(){const L=cone;L.clear();const x=L.x,s=.65+.35*E.s;x.globalCompositeOperation='lighter';
    for(let k=0;k<3;k++){const hw=half*(1+.35*k)*.9,len=H*1.6;const g=x.createLinearGradient(ax,ay,ax+dirx*len,ay+diry*len);g.addColorStop(0,`rgba(120,200,255,${.34*s/(k+1)})`);g.addColorStop(.55,`rgba(40,120,220,${.16*s/(k+1)})`);g.addColorStop(1,'rgba(10,50,120,0)');
      x.fillStyle=g;x.beginPath();x.moveTo(ax,ay);x.lineTo(ax+Math.cos(ang-hw)*len*1.1,ay+Math.sin(ang-hw)*len*1.1);x.lineTo(ax+Math.cos(ang+hw)*len*1.1,ay+Math.sin(ang+hw)*len*1.1);x.fill()}
    for(let r=0;r<11;r++){const a=ang+(r/10-.5)*half*1.7,al=(.05+.07*(.5+.5*Math.sin(TAU*(2*ph()+r*.31))))*s,len=H*1.5;x.strokeStyle=`rgba(170,225,255,${al})`;x.lineWidth=14+r%4*10;x.beginPath();x.moveTo(ax,ay);x.lineTo(ax+Math.cos(a)*len,ay+Math.sin(a)*len);x.stroke()}}
  const lit=(x,y)=>{const vx=x-ax,vy=y-ay,along=vx*dirx+vy*diry;if(along<0)return .05;const d=Math.abs(vx*diry-vy*dirx),w=Math.tan(half)*along*.95+40;return .05+Math.exp(-(d*d)/(w*w)*1.5)*(1.1-.35*along/(H*1.6))};
  draw=()=>{const p=ph();clear('#00060f');
    const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#03162f');bg.addColorStop(.55,'#021022');bg.addColorStop(1,'#00050c');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    lightCone();put(cone,0,0,1,'lighter');
    ctx.globalCompositeOperation='lighter';const zf=.22+.58*E.f;
    for(const q of PS){const wr=H+240,y=mod(q.y-p*q.k*wr,wr)-120,x=q.x+q.a*Math.sin(TAU*q.m*p+q.p)*(.4+q.z)+q.z*50*Math.sin(TAU*p+q.tp);
      const L=lit(x,y),tw=Math.pow(Math.max(0,Math.sin(TAU*q.tw*p+q.tp)),10),br=(.12+1.5*L)*(.45+1.1*tw);if(br<.02)continue;
      const coc=Math.abs(q.z-zf)*58;
      if(coc<6){const s=(3+(1-q.z)*5)*q.sz*(q.big?2.2:1);ctx.globalAlpha=clamp(br*.9,0,1);ctx.drawImage(spr(q.c,32,.9),x-s*2.2,y-s*2.2,s*4.4,s*4.4);
        if(tw>.3&&L>.25){const r=(7+s*3.4)*tw;glint(x,y,r,clamp(tw*L*.9,0,.85),'#d8f4ff')}}
      else{const r=coc*(q.big?1.5:1)+4;ctx.globalAlpha=clamp(br*.85*Math.pow(16/r,1.15),0,.8);ctx.drawImage(bokeh(q.c,96,.55),x-r,y-r,r*2,r*2)}}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    const v=ctx.createRadialGradient(W/2,H*.45,H*.35,W/2,H/2,H*1.05);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,3,10,.7)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)};
};
