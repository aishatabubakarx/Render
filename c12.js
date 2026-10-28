/* 12 HEX GRID: futuristic honeycomb energy panel, light waves ripple across the cells */
C[12]=()=>{newTL();const R=rng(120),E={s:0};
  tl.to(E,{s:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const r=46,dx=r*1.5,dy=r*Math.sqrt(3),cols=Math.ceil(W/dx)+2,rows=Math.ceil(H/dy)+2,cells=[];
  for(let c=-1;c<cols;c++)for(let j=-1;j<rows;j++)cells.push({x:c*dx,y:j*dy+(((c%2)+2)%2)*dy/2,m:1+(R()*6|0),p:R()*TAU,k:R()});
  const hexP=(x,cx,cy,rr)=>{x.beginPath();for(let i=0;i<6;i++){const a=i*Math.PI/3;i?x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr):x.moveTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr)}x.closePath()};
  const O=[{x:W*.3,y:H*.55,m:1,o:0,c:[40,210,255]},{x:W*.78,y:H*.35,m:2,o:.37,c:[150,90,255]},{x:W*.5,y:H*.9,m:1,o:.7,c:[40,255,200]}];
  draw=()=>{const p=ph();clear('#020813');const bg=ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.7);bg.addColorStop(0,'#0a2a4a');bg.addColorStop(1,'#020812');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';ctx.lineJoin='round';
    for(const c of cells){let b=0,col=[40,150,255];for(const o of O){const d=Math.hypot(c.x-o.x,c.y-o.y),rad=fr(p*o.m+o.o)*1500,v=Math.exp(-Math.pow((d-rad)/110,2))*(1-sm(0,1,fr(p*o.m+o.o)));if(v>b){b=v;col=o.c}}
      const sp=Math.pow(Math.max(0,Math.sin(TAU*c.m*p+c.p)),14)*(c.k>.55?.9:.15),scan=Math.exp(-Math.pow((c.y-H*fr(p*1+.1))/70,2))*.35,L=clamp(b+sp+scan,0,1.2),base=.07+.05*Math.sin(TAU*p+c.x*.004);
      ctx.strokeStyle=rgba(col,1);ctx.globalAlpha=clamp(base+L*.9,0,1);ctx.lineWidth=1.2+L*1.8;hexP(ctx,c.x,c.y,r-3);ctx.stroke();
      if(L>.06){ctx.globalAlpha=L*.28;ctx.fillStyle=rgba(col,1);hexP(ctx,c.x,c.y,r-5);ctx.fill();ctx.globalAlpha=L*.5;ctx.lineWidth=1;hexP(ctx,c.x,c.y,r*.55);ctx.stroke();ctx.globalAlpha=L*.18;ctx.lineWidth=7;hexP(ctx,c.x,c.y,r-3);ctx.stroke()}}
    for(const o of O){const rad=fr(p*o.m+o.o);ctx.globalAlpha=.25*(1-rad);const g=260;ctx.drawImage(soft(o.c,128,.1),o.x-g,o.y-g,g*2,g*2)}
    /* rising data motes */
    for(let i=0;i<70;i++){const q=cells[(i*53)%cells.length],y=mod(q.y-(p*(1+i%3))*H*1.0,H),a=.35+.5*Math.sin(TAU*(i%5+1)*p+i);ctx.globalAlpha=a*.8;ctx.fillStyle='#bfefff';ctx.fillRect(q.x+Math.sin(i)*10,y,2,2+(i%4)*2)}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';const v=ctx.createRadialGradient(W/2,H/2,H*.45,W/2,H/2,W*.68);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,2,8,.7)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)};
};
