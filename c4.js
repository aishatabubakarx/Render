/* 13 FLOWING NEON WAVE LINES */
C[13]=()=>{newTL();const NL=64;
  draw=()=>{clear();const p=T()*TAU;ctx.lineJoin='round';
    for(let i=0;i<NL;i++){const k=i/(NL-1),base=130+k*830,hue=(300-k*130+Math.sin(p)*0)%360,xs=[],step=10;
      const pts=[];for(let x=-20;x<=W+20;x+=step){const env=Math.exp(-Math.pow((x-CX)/(380+k*140),2)),amp=18+env*(70+k*190),
        y=base-amp*(.55*Math.sin(x*.0105+p*3+i*.34)+.32*Math.sin(x*.0262-p*5+i*.21)+.22*Math.sin(x*.047+p*2+i*.5))+Math.sin(x*.004+p*1+i*.1)*22*(1-k*.4);pts.push([x,y])}
      ctx.beginPath();pts.forEach((q,j)=>j?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.lineTo(W+20,H+20);ctx.lineTo(-20,H+20);ctx.closePath();ctx.fillStyle='#000';ctx.fill();
      const g=ctx.createLinearGradient(0,0,W,0);g.addColorStop(0,rgba(hue2(hue+40,.9,.55),.9));g.addColorStop(.5,rgba(hue2(hue,1,.62),1));g.addColorStop(1,rgba(hue2(hue-50,.9,.55),.9));
      ctx.beginPath();pts.forEach((q,j)=>j?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.globalCompositeOperation='lighter';ctx.strokeStyle=g;ctx.globalAlpha=.22;ctx.lineWidth=9;ctx.stroke();ctx.globalAlpha=1;ctx.lineWidth=2.4;ctx.stroke();ctx.globalCompositeOperation='source-over'}}
};
/* 14 KALEIDOSCOPE MANDALA */
C[14]=()=>{newTL();
  const LY=[{n:12,r0:36,r1:250,w:.34,k:1,d:1,h:42,b:2},{n:12,r0:120,r1:340,w:.3,k:2,d:-1,h:322,b:3},{n:18,r0:200,r1:430,w:.24,k:1,d:1,h:192,b:1},{n:24,r0:300,r1:520,w:.2,k:3,d:-1,h:278,b:2},{n:16,r0:50,r1:160,w:.5,k:2,d:1,h:18,b:4},{n:36,r0:430,r1:560,w:.14,k:1,d:-1,h:55,b:2},{n:8,r0:8,r1:96,w:.62,k:3,d:-1,h:350,b:5}];
  draw=()=>{clear();const p=T()*TAU,deg=T()*360;ctx.globalCompositeOperation='lighter';
    ctx.globalAlpha=.35+.1*Math.sin(p*4);ctx.drawImage(smk([255,140,60],256),CX-440,CY-440,880,880);ctx.globalAlpha=.2;ctx.drawImage(smk([160,60,255],256),CX-760,CY-760,1520,1520);ctx.globalAlpha=1;
    ctx.save();ctx.translate(CX,CY);ctx.scale(.9,.9);ctx.lineJoin='round';
    LY.forEach((l,li)=>{const col=hue2(l.h+deg,.9,.6),col2=hue2(l.h+deg+50,.85,.7);
      for(let i=0;i<l.n;i++){ctx.save();ctx.rotate(i*TAU/l.n+l.d*p*l.k/l.n*1);const sc=1+.09*Math.sin(p*l.b+li);ctx.scale(sc,sc);
        const wd=l.w*(l.r1-l.r0),m=l.r0+(l.r1-l.r0);ctx.beginPath();ctx.moveTo(0,-l.r0);ctx.bezierCurveTo(wd,-l.r0-(l.r1-l.r0)*.3,wd*.9,-l.r0-(l.r1-l.r0)*.75,0,-l.r1);ctx.bezierCurveTo(-wd*.9,-l.r0-(l.r1-l.r0)*.75,-wd,-l.r0-(l.r1-l.r0)*.3,0,-l.r0);
        ctx.fillStyle=rgba(col,.07);ctx.fill();ctx.strokeStyle=rgba(col,.22);ctx.lineWidth=6;ctx.stroke();ctx.strokeStyle=rgba(col2,.85);ctx.lineWidth=1.6;ctx.stroke();
        ctx.beginPath();ctx.moveTo(0,-l.r0-(l.r1-l.r0)*.1);ctx.lineTo(0,-l.r1+(l.r1-l.r0)*.1);ctx.strokeStyle=rgba(col2,.35);ctx.lineWidth=1;ctx.stroke();
        ctx.globalAlpha=.8;ctx.drawImage(spr(q16(col2),32),-9,-l.r1-9,18,18);ctx.globalAlpha=1;ctx.restore()}});
    for(let i=0;i<72;i++){const a=i/72*TAU+p*-1,r=600+Math.sin(p*6+i)*8;ctx.globalAlpha=.55;ctx.drawImage(spr(hue2(deg+i*5,.8,.65),32),Math.cos(a)*r-8,Math.sin(a)*r-8,16,16)}ctx.globalAlpha=1;
    ctx.globalAlpha=.9;ctx.drawImage(spr([255,230,180],64),-50,-50,100,100);ctx.restore();ctx.globalAlpha=1}
};
/* 15 HEXAGON GRID PULSE */
C[15]=()=>{newTL();const s=36,hw=Math.sqrt(3)*s,cells=[];
  for(let r=-1;r<Math.ceil(H/(s*1.5))+2;r++)for(let c=-1;c<Math.ceil(W/hw)+2;c++)cells.push({x:c*hw+(r&1?hw/2:0),y:r*s*1.5});
  const hexp=(x,y,rr)=>{ctx.beginPath();for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3;const px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr;i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.closePath()};
  draw=()=>{clear();const p=T()*TAU;ctx.globalCompositeOperation='lighter';
    const e2x=CX+Math.cos(p)*560,e2y=CY+Math.sin(p*2)*260;
    for(const c of cells){const d1=Math.hypot(c.x-CX,c.y-CY),d2=Math.hypot(c.x-e2x,c.y-e2y);
      const i1=Math.pow(.5+.5*Math.sin(d1*.02-p*5),6)*clamp(1.15-d1/1250,0,1),i2=Math.pow(.5+.5*Math.sin(d2*.027-p*4),7)*clamp(1.1-d2/800,0,1),I=clamp(i1+i2,0,1);
      const hue=lerp(195,315,i2/(i1+i2+1e-4)),col=hue2(hue,.95,.58),edge=clamp(1.2-Math.hypot(c.x-CX,(c.y-CY)*1.3)/1100,0,1);
      hexp(c.x,c.y,s-3);ctx.strokeStyle=rgba(hue2(210,.6,.6),(.07+.12*edge)*1);ctx.lineWidth=1.2;ctx.stroke();
      if(I>.03){ctx.fillStyle=rgba(col,.5*I);ctx.fill();ctx.strokeStyle=rgba(hue2(hue,.7,.8),.25+.75*I);ctx.lineWidth=1.4+2.4*I;ctx.stroke()}}
    ctx.globalAlpha=.9;ctx.drawImage(spr([100,200,255],64),CX-50,CY-50,100,100);ctx.drawImage(spr([255,100,220],64),e2x-40,e2y-40,80,80);ctx.globalAlpha=1}
};
/* 16 PRISM LIGHT DISPERSION */
C[16]=()=>{newTL();const R=rng(41),SP=[[255,45,45],[255,140,25],[255,232,50],[70,255,100],[45,175,255],[85,80,255],[175,65,255]],mo=[];
  for(let i=0;i<160;i++)mo.push({u:R(),k:1+(R()*2|0),ph:R()*TAU,kt:3+(R()*6|0),band:R()*7,off:(R()-.5)*20,s:2+R()*5});
  draw=()=>{clear();const t=T(),p=t*TAU;ctx.globalCompositeOperation='lighter';
    const rr=Math.sin(p*2)*.04,cs=Math.cos(rr),sn=Math.sin(rr),V=[[0,-290],[-262,170],[262,170]].map(q=>[CX+q[0]*cs-q[1]*sn,CY+q[0]*sn+q[1]*cs]);
    const lp=(a,b,u)=>[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u],E=lp(V[1],V[0],.5),X=lp(V[2],V[0],.42),src=[-60,E[1]+170];
    const br=.82+.18*Math.sin(p*5);
    // entry beam
    const ex=E[0]-src[0],ey=E[1]-src[1],el=Math.hypot(ex,ey),nx=-ey/el,ny=ex/el;
    for(const [w,al] of [[26,.1],[12,.28],[4,1]]){const g=ctx.createLinearGradient(src[0],src[1],E[0],E[1]);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.35,`rgba(255,255,255,${al*br})`);g.addColorStop(1,`rgba(255,255,255,${al*br})`);ctx.strokeStyle=g;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(src[0],src[1]);ctx.lineTo(E[0],E[1]);ctx.stroke()}
    ctx.strokeStyle=`rgba(255,255,255,${.8*br})`;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(E[0],E[1]);ctx.lineTo(X[0],X[1]);ctx.stroke();ctx.strokeStyle=`rgba(255,255,255,${.2*br})`;ctx.lineWidth=14;ctx.stroke();
    // rainbow fan
    const th0=.1+.04*Math.sin(p*3),spread=.46+.05*Math.sin(p*5),L=1700;
    SP.forEach((c,i)=>{const a0=th0-spread/2+i/7*spread,a1=th0-spread/2+(i+1)/7*spread,am=(a0+a1)/2;
      const g=ctx.createLinearGradient(X[0],X[1],X[0]+Math.cos(am)*L,X[1]+Math.sin(am)*L);g.addColorStop(0,rgba(c,1*br));g.addColorStop(.4,rgba(c,.8*br));g.addColorStop(1,rgba(c,0));
      ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(X[0],X[1]);ctx.lineTo(X[0]+Math.cos(a0)*L,X[1]+Math.sin(a0)*L);ctx.lineTo(X[0]+Math.cos(a1)*L,X[1]+Math.sin(a1)*L);ctx.closePath();ctx.fill()});
    // dust motes in the beams
    for(const m of mo){const d=fr(m.u+t*m.k),tw=.3+.7*Math.pow(.5+.5*Math.sin(p*m.kt+m.ph),2);
      if(m.band<.6){const x=src[0]+(E[0]-src[0])*d+nx*m.off,y=src[1]+(E[1]-src[1])*d+ny*m.off;ctx.globalAlpha=tw*.7*Math.min(1,d*3);ctx.drawImage(spr([255,255,255],32),x-m.s,y-m.s,m.s*2,m.s*2)}
      else{const bi=Math.min(6,m.band|0),a=th0-spread/2+(bi+.5)/7*spread,r=d*1400,x=X[0]+Math.cos(a)*r+Math.sin(a)*m.off*(d+.2),y=X[1]+Math.sin(a)*r-Math.cos(a)*m.off*(d+.2);ctx.globalAlpha=tw*.9*(1-d);ctx.drawImage(spr(SP[bi],32),x-m.s*1.3,y-m.s*1.3,m.s*2.6,m.s*2.6)}}
    ctx.globalAlpha=1;
    // prism glass
    ctx.globalCompositeOperation='source-over';ctx.beginPath();V.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.closePath();
    const pg=ctx.createLinearGradient(V[1][0],V[1][1],V[2][0],V[0][1]);pg.addColorStop(0,'rgba(200,225,255,.13)');pg.addColorStop(1,'rgba(255,255,255,.03)');ctx.fillStyle=pg;ctx.fill();
    ctx.globalCompositeOperation='lighter';ctx.lineJoin='round';
    for(let i=0;i<3;i++){const a=V[i],b=V[(i+1)%3],g=ctx.createLinearGradient(a[0],a[1],b[0],b[1]);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.5,'rgba(190,225,255,.35)');g.addColorStop(1,'rgba(255,255,255,.9)');ctx.strokeStyle=g;ctx.lineWidth=3.2;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()}
    ctx.globalAlpha=.85*br;ctx.drawImage(spr([255,255,255],128),E[0]-90,E[1]-90,180,180);ctx.drawImage(spr([255,240,255],128),X[0]-130,X[1]-130,260,260);ctx.globalAlpha=1}
};
