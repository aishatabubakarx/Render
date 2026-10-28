/* 5 LIQUID CHROME METABALLS */
C[5]=()=>{newTL();
  const GW=480,GH=270,off=document.createElement('canvas');off.width=GW;off.height=GH;const ox=off.getContext('2d'),img=ox.createImageData(GW,GH),px=img.data,F=new Float32Array(GW*GH),Hh=new Float32Array(GW*GH);
  const asp=W/H,B=[{r:.2,ax:.2,ay:.14,kx:1,ky:2,ph:0,p2:.5},{r:.17,ax:.26,ay:.17,kx:2,ky:1,ph:1.7,p2:2.2},{r:.15,ax:.3,ay:.12,kx:1,ky:3,ph:3.1,p2:.9},{r:.14,ax:.22,ay:.2,kx:3,ky:2,ph:4.4,p2:3.6},{r:.12,ax:.3,ay:.18,kx:2,ky:2,ph:5.3,p2:1.2},{r:.17,ax:.1,ay:.08,kx:1,ky:1,ph:2.4,p2:4.4}];
  const sm_=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
  draw=()=>{clear();const p=T()*TAU;
    const bl=B.map(b=>({x:.5*asp+b.ax*asp*Math.sin(p*b.kx+b.ph)+.04*Math.sin(p*(b.kx+2)+b.p2),y:.5+b.ay*Math.sin(p*b.ky+b.p2)+.03*Math.cos(p*(b.ky+1)+b.ph),r2:b.r*b.r*3.1}));
    for(let j=0;j<GH;j++){const v=j/GH;for(let i=0;i<GW;i++){const u=i/GW*asp;let f=0;for(let k=0;k<6;k++){const b=bl[k],dx=u-b.x,dy=v-b.y;const w=1-(dx*dx+dy*dy)/b.r2;if(w>0)f+=w*w*w}F[j*GW+i]=f;Hh[j*GW+i]=Math.sqrt(f)}}
    for(let j=0;j<GH;j++)for(let i=0;i<GW;i++){const o=j*GW+i,q=o*4,f=F[o];
      if(f<.1||i<1||j<1||i>GW-2||j>GH-2){px[q+3]=0;continue}
      const nx0=-(Hh[o+1]-Hh[o-1])*7,ny0=-(Hh[o+GW]-Hh[o-GW])*7,l=Math.hypot(nx0,ny0,1),nx=nx0/l,ny=ny0/l,nz=1/l;
      const rx=2*nz*nx,ry=2*nz*ny,ph=ry*8+rx*3.2+.6;
      const band=Math.pow(.5+.5*Math.sin(ph),1.7),band2=Math.pow(.5+.5*Math.sin(ph*1.7+2.1),3),rim=Math.pow(1-nz,1.4);
      const e=Math.min(1.25,.07+.92*band+.35*rim);
      const r=e*.9+band2*.12,g=e*.96,b=e*1.1+band2*.14+rim*.12;
      const a=sm_(.1,.2,f)*255;px[q]=Math.min(255,r*240);px[q+1]=Math.min(255,g*242);px[q+2]=Math.min(255,b*250);px[q+3]=a}
    ox.putImageData(img,0,0);
    ctx.globalCompositeOperation='lighter';for(const b of bl){ctx.globalAlpha=.09;ctx.drawImage(smk([90,130,255],128),b.x/asp*W-520,b.y*H-520,1040,1040)}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(off,0,0,W,H)};
};
/* 6 HYPERSPACE WARP */
C[6]=()=>{newTL();const R=rng(21),st=[];
  for(let i=0;i<950;i++)st.push({a:R()*TAU,z:R(),k:4+(R()*3|0),h:R()<.22?0:185+R()*85,w:R()<.2});
  draw=()=>{clear();const t=T(),p=t*TAU;ctx.globalCompositeOperation='lighter';
    ctx.globalAlpha=.55+.1*Math.sin(p*6);ctx.drawImage(smk([60,90,255],256),CX-900,CY-900,1800,1800);
    ctx.globalAlpha=.5;ctx.drawImage(smk([160,70,255],256),CX-420,CY-420,840,840);
    for(let i=0;i<7;i++){const u=fr(t*3+i/7),r=Math.pow(u,2.2)*1000+20;ctx.strokeStyle=rgba([110,150,255],Math.sin(u*Math.PI)*.22);ctx.lineWidth=2+u*10;ctx.beginPath();ctx.arc(CX,CY,r,0,TAU);ctx.stroke()}
    ctx.lineCap='round';
    for(const s of st){const u=fr(s.z+t*s.k),r=Math.pow(u,2.6)*1300+14,u2=Math.max(0,u-.07-u*.13),r2=Math.pow(u2,2.6)*1300+14,c=Math.cos(s.a),sn=Math.sin(s.a);
      const al=clamp(u*2.4,0,1)*(1-clamp((u-.94)*16,0,1)),col=s.h?hue2(s.h,.85,.72):[255,255,255],w=.7+u*4.2;
      ctx.strokeStyle=rgba(col,al*.22);ctx.lineWidth=w*3;ctx.beginPath();ctx.moveTo(CX+c*r2,CY+sn*r2);ctx.lineTo(CX+c*r,CY+sn*r);ctx.stroke();
      ctx.strokeStyle=rgba(col,al);ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(CX+c*r2,CY+sn*r2);ctx.lineTo(CX+c*r,CY+sn*r);ctx.stroke()}
    ctx.globalAlpha=.9;ctx.drawImage(spr([200,220,255],128),CX-130,CY-130,260,260);ctx.globalAlpha=1};
};
/* 7 DOT GLOBE WITH NETWORK ARCS */
C[7]=()=>{newTL();const R=rng(5),N=4200,pts=[],Rg=345;
  for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),th=i*2.399963,x=Math.cos(th)*r,z=Math.sin(th)*r,lon=Math.atan2(z,x),lat=Math.asin(y);
    const v=Math.sin(lat*2.3+1.1)*Math.cos(lon*1.7+.4)+.7*Math.sin(lon*3.9-lat*2.2)+.4*Math.cos(lat*5.1+lon*1.3);pts.push({x,y,z,land:v>.15})}
  const land=pts.filter(q=>q.land),arcs=[];
  while(arcs.length<16){const a=land[R()*land.length|0],b=land[R()*land.length|0];if(a.x*b.x+a.y*b.y+a.z*b.z<.55&&a.x*b.x+a.y*b.y+a.z*b.z>-.7)arcs.push({a,b,k:2+(R()*2|0),ph:R(),h:R()<.5?185:320})}
  const slerp=(a,b,t)=>{const d=clamp(a.x*b.x+a.y*b.y+a.z*b.z,-1,1),om=Math.acos(d),s=Math.sin(om),A=Math.sin((1-t)*om)/s,Bq=Math.sin(t*om)/s;return[A*a.x+Bq*b.x,A*a.y+Bq*b.y,A*a.z+Bq*b.z]};
  draw=()=>{clear();const t=T(),p=t*TAU,ry=p,rx=.42,cy_=Math.cos(ry),sy=Math.sin(ry),cx_=Math.cos(rx),sx_=Math.sin(rx);
    const pr=(x,y,z,k=1)=>{const X=x*cy_+z*sy,Z=-x*sy+z*cy_,Y=y*cx_-Z*sx_,Z2=y*sx_+Z*cx_;return[CX+X*Rg*k,CY-Y*Rg*k,Z2]};
    const g=ctx.createRadialGradient(CX-100,CY-120,40,CX,CY,Rg);g.addColorStop(0,'rgba(8,22,60,.75)');g.addColorStop(1,'rgba(1,3,12,.95)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(CX,CY,Rg,0,TAU);ctx.fill();
    ctx.globalCompositeOperation='lighter';
    const g2=ctx.createRadialGradient(CX,CY,Rg*.6,CX,CY,Rg*1.28);g2.addColorStop(0,'rgba(70,150,255,0)');g2.addColorStop(.45,'rgba(70,150,255,.03)');g2.addColorStop(.588,'rgba(90,170,255,.5)');g2.addColorStop(.75,'rgba(60,110,255,.12)');g2.addColorStop(1,'rgba(40,80,255,0)');ctx.fillStyle=g2;ctx.beginPath();ctx.arc(CX,CY,Rg*1.28,0,TAU);ctx.fill();
    for(const q of pts){const P=pr(q.x,q.y,q.z),z=P[2];let al,s,col;
      if(z<0){al=.05;s=2.2;col=[60,110,220]}else if(q.land){al=.3+.7*z;s=4.6+z*2.4;col=mixc([90,190,255],[220,250,255],z*z)}else{al=.07+.14*z;s=2.6;col=[50,100,230]}
      ctx.globalAlpha=al;ctx.drawImage(spr(col,32),P[0]-s,P[1]-s,s*2,s*2)}
    ctx.globalAlpha=1;ctx.lineCap='round';
    for(const A of arcs){const head=fr(t*A.k+A.ph),col=hue2(A.h,.9,.62),steps=44;let prev=null;
      for(let j=0;j<=steps;j++){const u=j/steps,v=slerp(A.a,A.b,u),h=1+.3*Math.sin(u*Math.PI),P=pr(v[0]*h,v[1]*h,v[2]*h),d=head-u,tr=d>=0&&d<.3?1-d/.3:0,vis=P[2]>-.05?1:.15;
        if(prev){ctx.strokeStyle=rgba(col,(.07+tr*.95)*vis);ctx.lineWidth=1.5+tr*3.5;ctx.beginPath();ctx.moveTo(prev[0],prev[1]);ctx.lineTo(P[0],P[1]);ctx.stroke()}prev=P}
      for(const [pt,ph] of [[A.a,0],[A.b,.5]]){const P=pr(pt.x,pt.y,pt.z);if(P[2]<0)continue;const u=fr(t*A.k*2+ph+A.ph);ctx.strokeStyle=rgba(col,(1-u)*.7);ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(P[0],P[1],6+u*26,(6+u*26)*.55,0,0,TAU);ctx.stroke()}}
    ctx.strokeStyle='rgba(140,190,255,.2)';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(CX,CY,Rg*1.38,Rg*.42,-.22,0,TAU);ctx.stroke();
    const oa=p*2,ox=CX+Math.cos(oa)*Rg*1.38,oy=CY+Math.sin(oa)*Rg*.42;const rr=-.22,ox2=CX+(ox-CX)*Math.cos(rr)-(oy-CY)*Math.sin(rr),oy2=CY+(ox-CX)*Math.sin(rr)+(oy-CY)*Math.cos(rr);ctx.globalAlpha=.95;ctx.drawImage(spr([180,220,255],64),ox2-18,oy2-18,36,36);ctx.globalAlpha=1};
};
/* 8 COLORFUL INK SMOKE */
C[8]=()=>{newTL();const R=rng(31),SD=[];
  for(let s=0;s<14;s++)SD.push({h:[320,190,28,265,160,345,210][s%7]+R()*18,k1:1+(R()*3|0),k2:1+(R()*3|0),k3:1+(R()*2|0),A1:420+R()*380,A2:180+R()*260,B1:220+R()*180,B2:90+R()*160,p1:R()*TAU,p2:R()*TAU,p3:R()*TAU,p4:R()*TAU});
  draw=()=>{clear();const p=T()*TAU;ctx.globalCompositeOperation='lighter';
    for(const s of SD)for(let j=0;j<44;j++){const o=j*.052,x=CX+s.A1*Math.sin(p*s.k1+s.p1-o)+s.A2*Math.sin(p*(s.k2+1)+s.p2-o*1.7),y=CY+s.B1*Math.sin(p*s.k3+s.p3-o*1.2)+s.B2*Math.cos(p*(s.k1+1)+s.p4-o*1.4);
      const sz=34+j*3.6+10*Math.sin(p*3+j),col=q16(hue2(s.h+j*2.4,.9,.52));ctx.globalAlpha=.15*Math.pow(1-j/50,.8);ctx.drawImage(smk(col,64),x-sz,y-sz,sz*2,sz*2);
      if(j<2){ctx.globalAlpha=.07;ctx.drawImage(smk([255,255,255],64),x-sz*.5,y-sz*.5,sz,sz)}}
    ctx.globalAlpha=1};
};
