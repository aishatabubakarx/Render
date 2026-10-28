/* 9 PLASMA BALL LIGHTNING */
C[9]=()=>{newTL();const RG=380;
  const bolt=(R,x1,y1,x2,y2,rough,it)=>{let P=[[x1,y1],[x2,y2]];for(let k=0;k<it;k++){const Q=[P[0]];for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy),o=(R()-.5)*2*l*rough;Q.push([(a[0]+b[0])/2-dy/l*o,(a[1]+b[1])/2+dx/l*o]);Q.push(b)}P=Q}return P};
  const stroke=(P,w,col,al)=>{ctx.strokeStyle=rgba(col,al);ctx.lineWidth=w;ctx.beginPath();P.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.stroke()};
  draw=()=>{clear();const ms=now(),p=T()*TAU,step=Math.floor(ms/66);ctx.globalCompositeOperation='lighter';ctx.lineJoin='round';ctx.lineCap='round';
    ctx.globalAlpha=.3;ctx.drawImage(smk([110,60,255],256),CX-760,CY-760,1520,1520);ctx.globalAlpha=1;
    const g=ctx.createRadialGradient(CX,CY,RG*.3,CX,CY,RG);g.addColorStop(0,'rgba(120,70,255,.06)');g.addColorStop(.85,'rgba(120,80,255,.1)');g.addColorStop(1,'rgba(170,130,255,.4)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(CX,CY,RG,0,TAU);ctx.fill();
    for(let i=0;i<8;i++){const R=rng(step*977+i*131+5),al=p*(1+i%3)+i*1.7,ang=i/8*TAU+Math.sin(al)*.45,ex=CX+Math.cos(ang)*(RG-6),ey=CY+Math.sin(ang)*(RG-6);
      const P=bolt(R,CX,CY,ex,ey,.32,6),flick=.65+.35*R();
      stroke(P,18,[150,90,255],.07*flick);stroke(P,7,[170,120,255],.3*flick);stroke(P,2.4,[255,245,255],.95*flick);
      if(R()<.7){const m=P[8+(R()*40|0)],a2=ang+(R()-.5)*1.2,L=RG*.45*(.5+R()),B=bolt(R,m[0],m[1],m[0]+Math.cos(a2)*L,m[1]+Math.sin(a2)*L,.35,5);stroke(B,5,[150,100,255],.18*flick);stroke(B,1.6,[235,225,255],.7*flick)}
      ctx.globalAlpha=.7*flick;ctx.drawImage(spr([190,150,255],64),ex-60,ey-60,120,120);ctx.globalAlpha=1}
    ctx.globalAlpha=.85+.15*Math.sin(p*30);ctx.drawImage(spr([200,160,255],128),CX-190,CY-190,380,380);ctx.globalAlpha=1;
    ctx.strokeStyle='rgba(190,170,255,.45)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(CX,CY,RG,0,TAU);ctx.stroke();
    ctx.strokeStyle='rgba(255,255,255,.28)';ctx.lineWidth=6;ctx.beginPath();ctx.arc(CX,CY,RG-14,Math.PI*1.08,Math.PI*1.38);ctx.stroke();ctx.lineWidth=3;ctx.beginPath();ctx.arc(CX,CY,RG-14,Math.PI*1.43,Math.PI*1.5);ctx.stroke()}
};
/* 10 SYNTHWAVE NEON GRID */
C[10]=()=>{newTL();const R=rng(3),hy=H*.52,st=[];
  for(let i=0;i<140;i++)st.push({x:R()*W,y:R()*hy*.95,s:R()<.1?2.2:1.2,a:.3+R()*.6,ph:R()*TAU,k:1+(R()*5|0)});
  const mt=(sg)=>{const P=[[0,0],[130,-80],[250,-36],[400,-190],[540,-64],[660,-128],[800,0]];ctx.beginPath();ctx.moveTo(sg>0?W:0,hy);P.forEach(q=>ctx.lineTo(sg>0?W-q[0]:q[0],hy+q[1]));ctx.closePath();ctx.fillStyle='#000';ctx.fill();ctx.strokeStyle='rgba(255,70,190,.9)';ctx.lineWidth=2.5;ctx.shadowColor='#ff3ca8';ctx.shadowBlur=18*S;ctx.stroke();ctx.shadowBlur=0};
  draw=()=>{clear();const t=T(),p=t*TAU;ctx.fillStyle='#fff';for(const s of st){ctx.globalAlpha=s.a*(.5+.5*Math.sin(p*s.k+s.ph));ctx.fillRect(s.x,s.y,s.s,s.s)}ctx.globalAlpha=1;
    const sx=CX,sy=hy-110,sr=270;ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55+.08*Math.sin(p*5);ctx.drawImage(smk([255,50,160],256),sx-720,sy-720,1440,1440);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    ctx.save();ctx.beginPath();ctx.rect(0,0,W,hy);ctx.clip();const sg=ctx.createLinearGradient(0,sy-sr,0,sy+sr);sg.addColorStop(0,'#fff15a');sg.addColorStop(.45,'#ff8a3d');sg.addColorStop(.75,'#ff2f9a');sg.addColorStop(1,'#7b2cff');ctx.fillStyle=sg;ctx.beginPath();ctx.arc(sx,sy,sr,0,TAU);ctx.fill();
    ctx.fillStyle='#000';for(let j=0;j<8;j++){const u=fr(j/8+t*3),y=sy-30+u*(hy-(sy-30)),th=2+u*30;ctx.fillRect(sx-sr-4,y-th/2,sr*2+8,th)}ctx.restore();
    mt(-1);mt(1);
    ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(255,120,220,.85)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,hy);ctx.lineTo(W,hy);ctx.stroke();
    const s=fr(t*20),gy=z=>hy+280/(z*.5+.38);
    for(let i=0;i<46;i++){const z=i-s;if(z<0)continue;const y=gy(z),al=clamp((y-hy)/170,0,1);ctx.strokeStyle=rgba([255,60,200],al*.2);ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();ctx.strokeStyle=rgba([255,110,225],al*.95);ctx.lineWidth=1.8+al*1.4;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
    for(let j=-26;j<=26;j++){const xb=CX+j*190;ctx.strokeStyle='rgba(60,210,255,.14)';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(CX+j*3,hy);ctx.lineTo(xb,H+60);ctx.stroke();ctx.strokeStyle='rgba(110,235,255,.8)';ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(CX+j*3,hy);ctx.lineTo(xb,H+60);ctx.stroke()}
    const hg=ctx.createLinearGradient(0,hy-4,0,hy+90);hg.addColorStop(0,'rgba(255,60,190,.28)');hg.addColorStop(1,'rgba(255,60,190,0)');ctx.fillStyle=hg;ctx.fillRect(0,hy,W,90)}
};
/* 11 BIOLUMINESCENT JELLYFISH */
C[11]=()=>{newTL();const R=rng(17);
  const J=[{x:.33,y:.4,s:1.5,h:190,ph:0,k:1},{x:.7,y:.5,s:1.05,h:300,ph:2.1,k:2},{x:.52,y:.18,s:.7,h:250,ph:4.2,k:1},{x:.1,y:.6,s:.6,h:170,ph:1.1,k:2},{x:.92,y:.16,s:.55,h:330,ph:5.3,k:1}].sort((a,b)=>a.s-b.s);
  const pl=[];for(let i=0;i<110;i++)pl.push({x:R()*W,y:R(),k:1+(R()*2|0),kx:1+(R()*3|0),ph:R()*TAU,s:3+R()*8,kt:3+(R()*8|0)});
  const jelly=(o,p)=>{const pu=.5+.5*Math.sin(p*5+o.ph),s=o.s,x=o.x*W+Math.sin(p*o.k+o.ph)*110*s,y=o.y*H+Math.sin(p*(o.k+1)+o.ph*1.3)*70*s-pu*34*s;
    const bw=170*s*(1.08-.2*pu),bh=125*s*(.88+.22*pu),col=hue2(o.h,.9,.6),col2=hue2(o.h+55,.9,.7),dim=.45+.55*s;
    ctx.save();ctx.translate(x,y);ctx.globalCompositeOperation='lighter';
    ctx.globalAlpha=.3*dim;ctx.drawImage(smk(q16(col),128),-bw*2.2,-bh*2.4,bw*4.4,bh*4.4);ctx.globalAlpha=1;
    // tentacles
    for(let k=0;k<18;k++){const x0=-bw*.85+k*(bw*1.7/17),L=(330+(k%4)*70)*s,seg=22;ctx.beginPath();for(let j=0;j<=seg;j++){const t=j/seg,xx=x0*(1-.25*t)+Math.sin(t*6.5-p*5+k*.7+o.ph)*(14+34*t)*s,yy=t*L*(1+.15*pu)+Math.sin(t*4-p*5)*8*s;j?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy)}
      ctx.strokeStyle=rgba(col2,.5*dim);ctx.lineWidth=2.2*s+.6;ctx.stroke()}
    for(let k=0;k<4;k++){const x0=-bw*.3+k*bw*.2,L=(260+k*30)*s,seg=22;ctx.beginPath();for(let j=0;j<=seg;j++){const t=j/seg,xx=x0+Math.sin(t*4.5-p*5+k*1.4+o.ph)*(20+46*t)*s,yy=t*L*(1+.15*pu);j?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy)}ctx.strokeStyle=rgba(col,.35*dim);ctx.lineWidth=9*s;ctx.stroke();ctx.strokeStyle=rgba(hue2(o.h+30,.6,.85),.5*dim);ctx.lineWidth=2.4*s;ctx.stroke()}
    // bell
    ctx.beginPath();ctx.moveTo(-bw,0);ctx.bezierCurveTo(-bw,-bh*1.38,bw,-bh*1.38,bw,0);for(let j=0;j<=10;j++){const u=j/10,xx=bw-u*2*bw,yy=Math.sin(u*Math.PI*5+p*5)*7*s+ (1-Math.abs(u-.5)*2)*10*s;ctx.lineTo(xx,yy)}ctx.closePath();
    const g=ctx.createRadialGradient(0,-bh*.35,bh*.1,0,-bh*.3,bw*1.1);g.addColorStop(0,rgba(hue2(o.h+20,.8,.7),.5*dim));g.addColorStop(.7,rgba(col,.2*dim));g.addColorStop(1,rgba(col,.07*dim));ctx.fillStyle=g;ctx.fill();
    ctx.strokeStyle=rgba(hue2(o.h+10,.7,.85),.85*dim);ctx.lineWidth=2.6*s+.5;ctx.stroke();
    ctx.lineWidth=1.2;for(let k=-5;k<=5;k++){ctx.strokeStyle=rgba(col2,.22*dim);ctx.beginPath();ctx.moveTo(0,-bh*1.02);ctx.quadraticCurveTo(k*bw*.2,-bh*.45,k*bw*.19,0);ctx.stroke()}
    ctx.globalAlpha=.55*dim;ctx.drawImage(spr(q16(hue2(o.h+25,.7,.7)),128),-bw*.55,-bh*1.1,bw*1.1,bh*1.1);ctx.restore();ctx.globalAlpha=1};
  draw=()=>{clear();const p=T()*TAU,u=T();ctx.globalCompositeOperation='lighter';
    for(const q of pl){const yy=H+30-fr(q.y+u*q.k)*(H+60),xx=q.x+Math.sin(p*q.kx+q.ph)*30,tw=.3+.7*Math.pow(.5+.5*Math.sin(p*q.kt+q.ph),2);ctx.globalAlpha=tw*.7;ctx.drawImage(spr([120,230,255],32),xx-q.s,yy-q.s,q.s*2,q.s*2)}
    ctx.globalAlpha=1;for(const o of J)jelly(o,p);ctx.globalCompositeOperation='source-over'}
};
/* 12 FIRE */
C[12]=()=>{newTL();const R=rng(23),by=H*.86,N=700,fp=[],sp=[];
  const ramp=u=>{const A=[[255,214,118],[255,160,40],[232,64,14],[90,14,8]];const x=clamp(u,0,.999)*3,i=x|0;return q16(mixc(A[i],A[i+1],x-i))};
  const gauss=()=>(R()+R()+R()+R()-2)/2,CL=[[-210,.8],[-80,1.0],[40,1.25],[170,.9],[270,.65]];
  for(let i=0;i<N;i++){const c=CL[i%5];fp.push({ph:R(),k:i%3?12:15,cx:c[0],bx:gauss()*70,hm:c[1]*(.75+R()*.35),p2:R()*TAU,p3:R()*TAU,sw:15+R()*25,cp:c[0]*.013})}
  for(let i=0;i<130;i++)sp.push({ph:R(),k:4+(R()*5|0),bx:gauss()*200,h:.45+R()*.6,p2:R()*TAU,s:5+R()*8,kt:5+(R()*10|0)});
  draw=()=>{clear();const t=T(),p=t*TAU;ctx.globalCompositeOperation='lighter';
    ctx.globalAlpha=.5+.1*Math.sin(p*9);ctx.drawImage(smk([255,110,30],256),CX-900,by-300,1800,460);ctx.globalAlpha=.4+.1*Math.sin(p*7);ctx.drawImage(smk([255,80,20],256),CX-600,by-760,1200,1000);
    for(const o of fp){const u=fr(o.ph+t*o.k),hgt=780*Math.pow(u,.9)*o.hm,sway=Math.sin(p*3+o.cp)*o.sw*u*u+Math.sin(p*7+o.cp*3)*16*u,x=CX+o.cx+o.bx*(1-u*.8)-o.cx*u*.35+Math.sin(u*TAU*1.4+o.p3)*26*u+sway,y=by-hgt;
      const sz=(105*(1-u*.62)+24),al=Math.pow(1-u,1.3)*.14*(.55+o.hm*.4);ctx.globalAlpha=al;ctx.drawImage(spr(ramp(u*.92+.06),64),x-sz,y-sz,sz*2,sz*2)}
    for(const o of sp){const u=fr(o.ph+t*o.k),x=CX+o.bx+Math.sin(u*9+o.p2)*140*u+Math.sin(p*3+o.p2)*30*u,y=by-30-u*980*o.h,tw=.4+.6*Math.pow(.5+.5*Math.sin(p*o.kt+o.p2),2),al=(1-u)*tw;ctx.globalAlpha=al;const s=o.s*(1-u*.5);ctx.drawImage(spr([255,200,90],32),x-s,y-s,s*2,s*2)}
    ctx.globalAlpha=.8;ctx.drawImage(spr([255,190,100],64),CX-360,by-70,720,150);ctx.globalAlpha=1}
};
