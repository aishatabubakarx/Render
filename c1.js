/* 1 AURORA BOREALIS */
C[1]=()=>{newTL();const R=rng(11);
  const HU=[128,142,156,170,190,215,250,280,305];
  const cols=HU.map(h=>{const k=document.createElement('canvas');k.width=2;k.height=256;const x=k.getContext('2d'),g=x.createLinearGradient(0,0,0,256),c=hue2(h,.95,.55);
    g.addColorStop(0,rgba(c,0));g.addColorStop(.55,rgba(c,.26));g.addColorStop(.9,rgba(hue2(h,.9,.68),.9));g.addColorStop(1,rgba(c,0));x.fillStyle=g;x.fillRect(0,0,2,256);return k});
  const st=[];for(let i=0;i<300;i++)st.push({x:R()*W,y:R()*H*.72,s:R()<.12?2.4:1.3,a:.25+R()*.65,ph:R()*TAU,k:1+(R()*5|0)});
  const L=[{y:.66,a1:60,a2:28,f1:.0032,f2:.0071,h:430,al:.55,o:0,k:[1,2,3,2,5]},
           {y:.60,a1:80,a2:36,f1:.0026,f2:.0058,h:520,al:.5,o:2,k:[1,3,2,3,4]},
           {y:.54,a1:70,a2:40,f1:.0036,f2:.0092,h:470,al:.45,o:4,k:[2,1,2,1,3]},
           {y:.70,a1:40,a2:22,f1:.0045,f2:.0105,h:300,al:.4,o:6,k:[1,2,1,2,3]}];
  const ridge=(y0,a,f,ph,col)=>{ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=24)ctx.lineTo(x,y0+Math.sin(x*f+ph)*a+Math.sin(x*f*2.7+ph*2)*a*.45+Math.sin(x*f*6.1)*a*.12);ctx.lineTo(W,H);ctx.closePath();ctx.fill()};
  draw=()=>{clear();const p=T()*TAU;
    ctx.fillStyle='#fff';for(const s of st){ctx.globalAlpha=s.a*(.55+.45*Math.sin(p*s.k+s.ph));ctx.fillRect(s.x,s.y,s.s,s.s)}
    ctx.globalCompositeOperation='lighter';
    for(const l of L){for(let x=-10;x<W+10;x+=7){
      const base=H*l.y+Math.sin(x*l.f1+p*l.k[0]+l.o)*l.a1+Math.sin(x*l.f2-p*l.k[1])*l.a2;
      const env=.5+.5*Math.sin(x*.0021+p*l.k[2]+l.o*1.3),ray=.78+.22*Math.sin(x*.19+p*l.k[3]*2+l.o);
      const hh=l.h*(.35+.65*env)*(.8+.2*Math.sin(x*.006-p*l.k[4]));
      const hi=Math.floor(clamp((.5+.5*Math.sin(x*.0016+p+l.o))*(cols.length-.001),0,cols.length-1));
      ctx.globalAlpha=clamp(l.al*(.25+.75*env)*ray,0,1);ctx.drawImage(cols[hi],x,base-hh,12,hh)}}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    ridge(H*.86,26,.0042,1.3,'#010308');ridge(H*.93,22,.0061,4.1,'#000');}
};
/* 2 LUXURY GOLD DUST */
C[2]=()=>{newTL();const R=rng(7),N=950,ps=[];
  const GOLD=[[255,196,84],[255,214,120],[255,170,50],[255,236,170]];
  for(let i=0;i<N;i++){const z=Math.pow(R(),1.7);ps.push({x:R()*W,y:R(),z,k:z>.7?3:z>.35?2:1,kx:1+(R()*3|0),ph:R()*TAU,kt:3+(R()*10|0),c:GOLD[R()*4|0],sz:z>.82?60+R()*90:3+R()*7})}
  ps.sort((a,b)=>a.z-b.z);
  const fl=[];for(let i=0;i<16;i++)fl.push({x:140+R()*(W-280),y:120+R()*(H-240),r:40+R()*70,k:3+(R()*4|0),ph:R()*TAU});
  draw=()=>{clear();const p=T()*TAU,u=T();ctx.globalCompositeOperation='lighter';
    for(const [gx,gy,k,ph,a] of [[.3,.7,1,0,.07],[.72,.3,1,2.4,.06]]){const s=1500;ctx.globalAlpha=a;ctx.drawImage(smk([255,170,60],256),W*gx+Math.sin(p*k+ph)*160-s/2,H*gy+Math.cos(p*k+ph)*90-s/2,s,s)}
    for(const o of ps){const yy=H+80-fr(o.y+u*o.k)*(H+160),xx=o.x+Math.sin(p*o.kx+o.ph)*(20+70*o.z);
      const tw=Math.pow(.5+.5*Math.sin(p*o.kt+o.ph),2.5);
      if(o.z>.82){ctx.globalAlpha=.07+.1*tw;const s=o.sz;ctx.drawImage(bok(o.c,128),xx-s/2,yy-s/2,s,s)}
      else{ctx.globalAlpha=.3+.7*tw;const s=o.sz*(1+tw*.5);ctx.drawImage(spr(o.c,64),xx-s,yy-s,s*2,s*2)}}
    for(const f of fl){const b=Math.pow(Math.max(0,Math.sin(p*f.k+f.ph)),10);if(b<.02)continue;
      ctx.globalAlpha=b*.9;ctx.drawImage(spr([255,200,100],128),f.x-f.r*1.6,f.y-f.r*1.6,f.r*3.2,f.r*3.2);flare(f.x,f.y,f.r*(.6+.5*b),b,'#fff3d0');ctx.globalAlpha=b*.7;
      ctx.save();ctx.translate(f.x,f.y);ctx.rotate(Math.PI/4);flare(0,0,f.r*.5*b,b*.7,'#ffe9b0');ctx.restore()}
    ctx.globalAlpha=1};
};
/* 3 3D GLASS SLAB WITH IRIDESCENT EDGE LIGHT */
C[3]=()=>{newTL();
  const a=390,r=130,d=64,pts=[];
  [[1,1,0],[-1,1,.5],[-1,-1,1],[1,-1,1.5]].forEach(([sx,sy,q])=>{for(let j=0;j<=14;j++){const t=(q+j/14*.5)*Math.PI;pts.push([sx*(a-r)+Math.cos(t)*r,sy*(a-r)+Math.sin(t)*r])}});
  const n=pts.length,nm=[];
  for(let i=0;i<n;i++){const p0=pts[i],p1=pts[(i+1)%n];let dx=p1[0]-p0[0],dy=p1[1]-p0[1];const l=Math.hypot(dx,dy)||1;let nx=dy/l,ny=-dx/l;if(nx*(p0[0]+p1[0])+ny*(p0[1]+p1[1])<0){nx=-nx;ny=-ny}nm.push([nx,ny])}
  draw=()=>{clear();const p=T()*TAU,ry=1.05*Math.sin(p),rx=.3+.2*Math.sin(p*2+1),rz=.08*Math.sin(p*3);
    const cr=Math.cos(ry),sr=Math.sin(ry),cx_=Math.cos(rx),sx_=Math.sin(rx),cz=Math.cos(rz),sz=Math.sin(rz);
    const rot=(x,y,z)=>{const X=x*cz-y*sz,Y=x*sz+y*cz;const X2=X*cr+z*sr,Z2=-X*sr+z*cr;return[X2,Y*cx_-Z2*sx_,Y*sx_+Z2*cx_]};
    const tf=(x,y,z)=>{const v=rot(x,y,z),s=1700/(1700-v[2]);return[CX+v[0]*s,CY+v[1]*s,v[2]]};
    const Fp=pts.map(q=>tf(q[0],q[1],d)),Bp=pts.map(q=>tf(q[0],q[1],-d));
    const nF=rot(0,0,1)[2],items=[];
    items.push({z:tf(0,0,d)[2],t:'f',near:nF>0});items.push({z:tf(0,0,-d)[2],t:'b',near:nF<0});
    for(let i=0;i<n;i++){const j=(i+1)%n;items.push({z:(Fp[i][2]+Fp[j][2]+Bp[i][2]+Bp[j][2])/4,t:'s',i,j})}
    items.sort((x,y)=>x.z-y.z);
    const deg=(p/TAU)*360;
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.16;const hc=hue2(Math.round(deg/12)*12,.8,.55);ctx.drawImage(spr(hc,128),CX-760,CY-760,1520,1520);ctx.globalAlpha=1;
    for(const it of items){
      if(it.t==='s'){const i=it.i,j=it.j,nv=rot(nm[i][0],nm[i][1],0),c=nv[2],vis=c>0;
        const h=(200+nv[0]*170+nv[1]*110+i*2.2+deg)%360,col=hue2(h,.95,.62),col2=hue2(h+70,.95,.66),al=vis?.07+.3*Math.pow(Math.abs(c),.8):.03+.05*Math.abs(c);
        const mf=[(Fp[i][0]+Fp[j][0])/2,(Fp[i][1]+Fp[j][1])/2],mb=[(Bp[i][0]+Bp[j][0])/2,(Bp[i][1]+Bp[j][1])/2];
        const gg=ctx.createLinearGradient(mf[0],mf[1],mb[0],mb[1]);gg.addColorStop(0,rgba(col,al*1.8));gg.addColorStop(.5,rgba(col2,al*.5));gg.addColorStop(1,rgba(col,al*1.3));
        ctx.globalCompositeOperation='lighter';ctx.fillStyle=gg;ctx.strokeStyle=gg;ctx.lineWidth=1.2;
        ctx.beginPath();ctx.moveTo(Fp[i][0],Fp[i][1]);ctx.lineTo(Fp[j][0],Fp[j][1]);ctx.lineTo(Bp[j][0],Bp[j][1]);ctx.lineTo(Bp[i][0],Bp[i][1]);ctx.closePath();ctx.fill();ctx.stroke();
        if(vis&&c>.5&&i%3===0){ctx.globalAlpha=(c-.5)*.55;ctx.drawImage(spr(hue2(Math.round(h/12)*12,.95,.6),64),mf[0]-60,mf[1]-60,120,120);ctx.drawImage(spr(hue2(Math.round((h+90)/12)*12,.95,.6),64),mb[0]-60,mb[1]-60,120,120);ctx.globalAlpha=1}}
      else{const P=it.t==='f'?Fp:Bp,near=it.near;
        ctx.globalCompositeOperation='source-over';ctx.beginPath();P.forEach((q,k)=>k?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.closePath();
        const g=ctx.createLinearGradient(CX-a,CY-a,CX+a,CY+a);g.addColorStop(0,`rgba(190,225,255,${near?.14:.05})`);g.addColorStop(1,`rgba(255,255,255,${near?.03:.015})`);ctx.fillStyle=g;ctx.fill();
        if(near){ctx.save();ctx.clip();ctx.globalCompositeOperation='lighter';const bx=CX+Math.sin(p)*420,gr=ctx.createLinearGradient(bx-120,CY-300,bx+120,CY+300);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.5,'rgba(255,255,255,.17)');gr.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);ctx.restore()}
        ctx.globalCompositeOperation='lighter';ctx.lineJoin='round';
        for(let i=0;i<n;i++){const j=(i+1)%n,h=(i*7+deg*2)%360,col=hue2(h,.95,.62);
          ctx.strokeStyle=rgba(col,near?.28:.1);ctx.lineWidth=near?14:7;ctx.beginPath();ctx.moveTo(P[i][0],P[i][1]);ctx.lineTo(P[j][0],P[j][1]);ctx.stroke();
          ctx.strokeStyle=rgba(hue2(h,.8,.82),near?.95:.4);ctx.lineWidth=near?3.4:2;ctx.beginPath();ctx.moveTo(P[i][0],P[i][1]);ctx.lineTo(P[j][0],P[j][1]);ctx.stroke()}
        if(near){ctx.lineWidth=1.4;for(let i=0;i<n;i++){const j=(i+1)%n,h=(i*7+deg*2+120)%360,k=.93;const A=[CX+(P[i][0]-CX)*k,CY+(P[i][1]-CY)*k],B=[CX+(P[j][0]-CX)*k,CY+(P[j][1]-CY)*k];ctx.strokeStyle=rgba(hue2(h,.9,.6),.28);ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.stroke()}}}}
    ctx.globalAlpha=1};
};
/* 4 LOADING ANIMATION */
C[4]=()=>{newTL();
  const arc=(R,head,len,w,h0,h1,al)=>{const segs=70;for(let j=0;j<segs;j++){const u=j/segs,a0=head-u*len,a1=head-(u+1/segs)*len;ctx.strokeStyle=rgba(hue2(lerp(h0,h1,u),.9,.6),al*Math.pow(1-u,1.5));ctx.lineWidth=w*(1-u*.55);ctx.lineCap='round';ctx.beginPath();ctx.arc(CX,CY,R,a1,a0+.02);ctx.stroke()}
    const hx=CX+Math.cos(head)*R,hy=CY+Math.sin(head)*R;ctx.globalAlpha=al;ctx.drawImage(spr(hue2(h0,.9,.6),128),hx-w*3.4,hy-w*3.4,w*6.8,w*6.8);ctx.globalAlpha=1};
  draw=()=>{clear();const t=T(),p=t*TAU;ctx.globalCompositeOperation='lighter';
    ctx.globalAlpha=.12+.04*Math.sin(p*5);ctx.drawImage(smk([70,110,255],256),CX-680,CY-680,1360,1360);ctx.globalAlpha=1;
    ctx.strokeStyle='rgba(255,255,255,.07)';ctx.lineWidth=3;for(const R of [380,285]){ctx.beginPath();ctx.arc(CX,CY,R,0,TAU);ctx.stroke()}
    arc(380,fr(t*5)*TAU-Math.PI/2,TAU*.62,18,190,285,.95);
    arc(285,-fr(t*6)*TAU-Math.PI/2,TAU*.4,13,330,30,.85);
    const lead=fr(t*10);
    for(let i=0;i<12;i++){const a=i/12*TAU-Math.PI/2,u=fr(lead-i/12),b=Math.pow(1-u,2.4),R=172;
      const x=CX+Math.cos(a)*R,y=CY+Math.sin(a)*R,s=10+22*b,col=hue2(lerp(185,300,i/12),.85,.62);
      ctx.globalAlpha=.15+.85*b;ctx.drawImage(spr(col,64),x-s*2.2,y-s*2.2,s*4.4,s*4.4);ctx.fillStyle=rgba(hue2(lerp(185,300,i/12),.5,.9),.9*(.2+.8*b));ctx.beginPath();ctx.arc(x,y,s*.5,0,TAU);ctx.fill()}
    ctx.globalAlpha=1;const pu=fr(t*15);ctx.strokeStyle=rgba([150,200,255],(1-pu)*.5);ctx.lineWidth=3;ctx.beginPath();ctx.arc(CX,CY,40+pu*90,0,TAU);ctx.stroke();
    ctx.globalAlpha=.8;ctx.drawImage(spr([120,170,255],64),CX-44,CY-44,88,88);ctx.globalAlpha=1};
};
