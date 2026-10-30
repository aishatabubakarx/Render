/* 1 GLOWING BLUE PARTICLE BRAIN NETWORK (loop) - navy #02060f, blue #2E9BFF, cyan #7FE3FF, white */
C[1]=()=>{newTL();const R=rng(101);
  const n3=(x,y,z)=>noise(x*2.2+z*1.9,y*2.2-z*1.3)+.6*noise(x*4.5-z*2.7,y*4.5+z*3.1);
  const pts=[];
  for(let i=0;i<2500;i++){const u=R()*2-1,a=R()*TAU,s=Math.sqrt(1-u*u),dx=s*Math.cos(a),dy=u,dz=s*Math.sin(a);
    let X=dx,Y=dy*.68,Z=dz*.74;if(Y<0)Y*=.6;Y+=.05*dx;if(dy>0)Y-=.1*Math.exp(-(Z*Z)/.013)*dy;
    const g=1+.075*n3(X,Y,Z);pts.push([X*g,Y*g,Z*g])}
  const ell=(n,cx,cy,cz,rx,ry,rz,wob)=>{for(let i=0;i<n;i++){const u=R()*2-1,a=R()*TAU,s=Math.sqrt(1-u*u);let X=cx+s*Math.cos(a)*rx,Y=cy+u*ry,Z=cz+s*Math.sin(a)*rz;Y+=wob?Math.sin(Y*60)*.012:0;pts.push([X,Y,Z])}};
  ell(280,.12,-.34,.5,.42,.2,.2);ell(280,.12,-.34,-.5,.42,.2,.2);ell(420,-.52,-.47,0,.34,.2,.42,1);
  for(let i=0;i<110;i++){const t=R(),a=R()*TAU,r=.09*(1-.25*t);pts.push([-.2-.05*t+Math.cos(a)*r*.8,-.5-.5*t,Math.sin(a)*r])}
  const N=pts.length,E=[],seen=new Set();
  for(let i=0;i<N;i++){const c=[];for(let j=0;j<N;j++){if(j===i)continue;const dx=pts[i][0]-pts[j][0],dy=pts[i][1]-pts[j][1],dz=pts[i][2]-pts[j][2],d=dx*dx+dy*dy+dz*dz;if(d<.0225)c.push([d,j])}
    c.sort((a,b)=>a[0]-b[0]);for(let k=0;k<Math.min(3,c.length);k++){const j=c[k][1],key=i<j?i*9999+j:j*9999+i;if(!seen.has(key)){seen.add(key);E.push([i,j])}}}
  const PU=[];for(let i=0;i<260;i++)PU.push({e:(R()*E.length)|0,k:1+((R()*2)|0),ph:R()});
  const NP=pts.map(()=>({ph:R()*TAU,k:1+((R()*3)|0),s:1+R()*1.6,f:R()<.05}));
  const stars=Array.from({length:300},()=>({x:R()*W,y:R()*H,s:.6+R()*1.6,ph:R()*TAU,k:1+((R()*3)|0),a:.2+R()*.6}));
  const orb=Array.from({length:150},()=>({a:R()*TAU,r:.9+R()*.9,y:(R()-.5)*1.2,m:R()<.5?1:2,s:1+R()*2,ph:R()*TAU}));
  const sc=540,cx=W/2+10,cy=H/2-10,B=[20,100,255],CY=[127,227,255];
  draw=()=>{clear();const ms=now(),th=LOOP(ms);bgRad('#061431','#01030a');haze([30,90,200],.09,ms,1,th);
    ctx.globalCompositeOperation='lighter';
    for(const s of stars){ctx.globalAlpha=s.a*(.4+.6*Math.sin(th*s.k+s.ph)**2);ctx.fillStyle='#9fd0ff';ctx.fillRect(s.x,s.y+6*Math.sin(th+s.ph),s.s,s.s)}
    ctx.globalAlpha=.22+.06*Math.sin(th*2);ctx.drawImage(spr([14,70,200],256),cx-sc*1.7,cy-sc*1.2,sc*3.4,sc*2.4);
    ctx.strokeStyle='rgba(120,200,255,.16)';ctx.lineWidth=1.5;for(const [r,m] of [[sc*1.32,1],[sc*1.52,-1]]){ctx.beginPath();ctx.setLineDash([2,10]);ctx.ellipse(cx,cy,r,r*.55,m*th*.0,0,TAU);ctx.stroke();ctx.setLineDash([])}
    const yaw=.62*Math.sin(th),pit=.14,cyw=Math.cos(yaw),syw=Math.sin(yaw),cp=Math.cos(pit),sp=Math.sin(pit),sY=Math.sin(th)*.72;
    const Q=new Array(N);for(let i=0;i<N;i++){const p=pts[i],x1=p[0]*cyw+p[2]*syw,z1=-p[0]*syw+p[2]*cyw,y1=p[1]*cp-z1*sp,z2=p[1]*sp+z1*cp,f=1/(1-z2*.2);Q[i]=[cx+x1*sc*f,cy-y1*sc*f,z2,f,p[1]]}
    const bk=[[],[],[],[]];for(const [i,j] of E){const z=(Q[i][2]+Q[j][2])/2,b=z<-.4?0:z<0?1:z<.4?2:3;bk[b].push(i,j)}
    const al=[.07,.14,.26,.46];ctx.lineWidth=1;ctx.strokeStyle='#4aa8ff';
    for(let b=0;b<4;b++){ctx.globalAlpha=al[b];ctx.beginPath();const a=bk[b];for(let k=0;k<a.length;k+=2){ctx.moveTo(Q[a[k]][0],Q[a[k]][1]);ctx.lineTo(Q[a[k+1]][0],Q[a[k+1]][1])}ctx.stroke()}
    for(let i=0;i<N;i++){const q=Q[i],z=(q[2]+1)/2,np=NP[i],tw=.55+.45*Math.sin(th*np.k+np.ph),scan=Math.exp(-((q[4]-sY)**2)/.0016);
      const a=(.15+.8*z)*tw+scan*.45;if(a<.04)continue;ctx.globalAlpha=Math.min(1,a);const s=np.s*q[3]*(.8+z*.9);ctx.fillStyle=scan>.5?'#d8f4ff':z>.6?'#a8dcff':'#4aa4ff';ctx.fillRect(q[0]-s/2,q[1]-s/2,s,s);
      if(np.f||scan>.6){ctx.globalAlpha=Math.min(1,(np.f?.3+.3*Math.sin(th*2+np.ph):0)*(.4+z)+scan*.25);ctx.drawImage(spr(scan>.3?CY:B,64),q[0]-16,q[1]-16,32,32)}}
    for(const p of PU){const e=E[p.e],a=Q[e[0]],b=Q[e[1]],s=fr(th/TAU*p.k+p.ph),x=lerp(a[0],b[0],s),y=lerp(a[1],b[1],s),z=(lerp(a[2],b[2],s)+1)/2;ctx.globalAlpha=(.25+.75*z)*Math.sin(s*Math.PI);ctx.drawImage(spr(CY,64),x-9,y-9,18,18)}
    for(const o of orb){const an=o.a+th*o.m,x=cx+Math.cos(an)*o.r*sc*1.05,y=cy+o.y*sc*.5+Math.sin(an)*o.r*sc*.12,z=Math.sin(an);ctx.globalAlpha=(.15+.35*(z+1)/2)*(.5+.5*Math.sin(th*2+o.ph));ctx.fillStyle='#8fd0ff';ctx.fillRect(x,y,o.s,o.s)}
    ctx.globalAlpha=.55;const gy=cy-sY*sc*.95;const g=ctx.createLinearGradient(cx-sc*1.2,gy,cx+sc*1.2,gy);g.addColorStop(0,'rgba(120,220,255,0)');g.addColorStop(.5,'rgba(150,230,255,.55)');g.addColorStop(1,'rgba(120,220,255,0)');ctx.fillStyle=g;ctx.fillRect(cx-sc*1.2,gy-1,sc*2.4,2);
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.95,[2,4]);vignette(.55);grain(.03)}};

/* 2 HOLOGRAPHIC GLOBE NETWORK (loop) - navy #020914, holo cyan #38D6FF, node gold #FFC15A, white */
C[2]=()=>{newTL();const R=rng(202);
  const LAND=[[[-168,66],[-162,70],[-140,70],[-125,70],[-95,72],[-80,70],[-65,60],[-55,52],[-66,45],[-70,42],[-76,36],[-81,31],[-80,26],[-83,29],[-90,30],[-97,26],[-97,21],[-88,21],[-87,16],[-83,10],[-79,8],[-83,8.5],[-92,15],[-105,20],[-110,24],[-113,31],[-117,32],[-121,35],[-124,40],[-124,48],[-130,54],[-140,60],[-150,61],[-158,58],[-165,60]],
   [[-73,78],[-60,82],[-30,83],[-20,75],[-22,70],[-40,62],[-50,64],[-55,70],[-68,76]],
   [[-78,8],[-72,12],[-62,10],[-52,5],[-50,0],[-35,-5],[-35,-9],[-39,-15],[-41,-22],[-48,-26],[-54,-34],[-58,-38],[-65,-41],[-66,-47],[-69,-52],[-72,-54],[-74,-50],[-73,-40],[-71,-30],[-70,-18],[-76,-14],[-81,-5],[-80,0]],
   [[-10,36],[-9,43],[-1,46],[-4,48],[2,51],[8,54],[10,58],[5,62],[15,69],[25,71],[40,68],[60,70],[80,73],[105,78],[130,72],[160,70],[180,68],[170,62],[160,58],[155,50],[142,52],[140,45],[130,42],[127,36],[122,38],[121,31],[120,24],[110,20],[108,15],[106,9],[100,13],[103,2],[98,8],[94,17],[88,22],[80,15],[77,8],[72,20],[67,25],[57,25],[56,27],[48,30],[50,26],[57,22],[52,16],[43,13],[35,28],[34,31],[36,36],[28,37],[27,40],[24,38],[22,36],[20,40],[14,45],[12,44],[16,38],[8,44],[3,43],[-5,36]],
   [[-17,21],[-16,28],[-9,33],[-6,36],[10,37],[11,33],[20,31],[32,31],[34,28],[43,12],[51,12],[45,2],[40,-5],[40,-15],[35,-24],[32,-29],[27,-34],[19,-35],[15,-27],[12,-17],[13,-6],[9,-1],[9,4],[-3,5],[-8,4],[-13,8],[-17,14]],
   [[114,-22],[122,-18],[130,-12],[137,-12],[142,-11],[146,-19],[153,-27],[150,-37],[141,-38],[135,-35],[129,-32],[116,-35],[115,-29]],
   [[-5,50],[1,51],[2,53],[-2,56],[-4,58],[-6,56],[-3,54],[-5,52]],[[130,31],[135,34],[140,36],[142,40],[141,45],[143,44],[140,38],[136,36],[131,34]],
   [[44,-25],[47,-25],[50,-15],[49,-12],[44,-17]],[[109,1],[117,7],[119,1],[116,-4],[110,-3]],[[95,5],[106,-6],[104,-6],[95,2]],[[166,-46],[174,-41],[178,-38],[174,-36],[172,-41],[167,-45]]];
  const vec=(lat,lon)=>{const a=lat*Math.PI/180,b=lon*Math.PI/180;return[Math.cos(a)*Math.sin(b),Math.sin(a),Math.cos(a)*Math.cos(b)]};
  const land=[],NF=16000,ga=Math.PI*(3-Math.sqrt(5));
  for(let i=0;i<NF;i++){const y=1-2*(i+.5)/NF,r=Math.sqrt(1-y*y),a=i*ga,x=Math.cos(a)*r,z=Math.sin(a)*r,lat=Math.asin(y)*180/Math.PI,lon=Math.atan2(x,z)*180/Math.PI;
    for(const P of LAND)if(inPoly(lon,lat,P)){land.push([x,y,z,R()*TAU,1+((R()*3)|0)]);break}}
  const nodes=[];for(let g=0;g<4000&&nodes.length<30;g++){const p=land[(R()*land.length)|0];if(nodes.every(n=>n[0]*p[0]+n[1]*p[1]+n[2]*p[2]<.9))nodes.push([p[0],p[1],p[2],R()*TAU,1+((R()*2)|0)])}
  const arcs=[];for(let i=0;i<46;i++){const a=nodes[(R()*nodes.length)|0],b=nodes[(R()*nodes.length)|0];const d=a[0]*b[0]+a[1]*b[1]+a[2]*b[2];if(d>.8||d<.1)continue;arcs.push({a,b,ang:Math.acos(Math.min(1,d)),k:1+((R()*2)|0),ph:R()})}
  const bits=Array.from({length:26},()=>({x:R()<.5?60+R()*330:W-390+R()*330,y:R()*H,t:'0x'+((R()*65535)|0).toString(16).toUpperCase().padStart(4,'0'),ph:R()*TAU,m:1+((R()*2)|0)}));
  const RR=345,cx=W/2,cy=H/2+8,tilt=.42,ct=Math.cos(tilt),st=Math.sin(tilt),CY=[56,214,255],GD=[255,193,90];
  const slerp=(a,b,s,ang,h)=>{const sa=Math.sin(ang)||1e-6,k0=Math.sin((1-s)*ang)/sa,k1=Math.sin(s*ang)/sa,r=1+h*Math.sin(Math.PI*s);return[(a[0]*k0+b[0]*k1)*r,(a[1]*k0+b[1]*k1)*r,(a[2]*k0+b[2]*k1)*r]};
  draw=()=>{clear();const ms=now(),th=LOOP(ms),cy0=Math.cos(th),sy0=Math.sin(th);bgRad('#04142b','#010610');haze([20,80,170],.08,ms,1,th);
    const T=(p)=>{const x1=p[0]*cy0+p[2]*sy0,z1=-p[0]*sy0+p[2]*cy0,y1=p[1]*ct-z1*st,z2=p[1]*st+z1*ct;return[cx+x1*RR,cy-y1*RR,z2,p[1]]};
    ctx.globalCompositeOperation='lighter';
    for(const b of bits){ctx.globalAlpha=.16+.14*Math.sin(th*b.m+b.ph);txt(b.t,b.x,(b.y+ms*.012*b.m)%(H+40)-20,{f:'JetBrains Mono',w:700,size:16,al:'left',fill:'#5fd0ff'})}
    ctx.globalAlpha=.55;{const g0=ctx.createRadialGradient(cx,cy,RR*.9,cx,cy,RR*1.9);g0.addColorStop(0,'rgba(30,130,255,.55)');g0.addColorStop(1,'rgba(10,60,160,0)');ctx.fillStyle=g0;ctx.fillRect(0,0,W,H)}
    ctx.globalAlpha=1;ctx.fillStyle=(()=>{const g=ctx.createRadialGradient(cx,cy,RR*.2,cx,cy,RR);g.addColorStop(0,'rgba(4,30,70,.14)');g.addColorStop(.8,'rgba(10,60,130,.10)');g.addColorStop(1,'rgba(70,190,255,.30)');return g})();ctx.beginPath();ctx.arc(cx,cy,RR,0,TAU);ctx.fill();
    ctx.lineWidth=1;ctx.strokeStyle='#38d6ff';
    for(let la=-60;la<=60;la+=30){for(let pass=0;pass<2;pass++){ctx.globalAlpha=pass?.3:.08;ctx.beginPath();let on=false;for(let k=0;k<=72;k++){const p=T(vec(la,k*5)),ok=pass?p[2]>=0:p[2]<0;if(ok){on?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);on=true}else on=false}ctx.stroke()}}
    for(let lo=0;lo<360;lo+=30){for(let pass=0;pass<2;pass++){ctx.globalAlpha=pass?.3:.08;ctx.beginPath();let on=false;for(let k=0;k<=48;k++){const p=T(vec(-90+k*180/48,lo)),ok=pass?p[2]>=0:p[2]<0;if(ok){on?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);on=true}else on=false}ctx.stroke()}}
    const sY=Math.sin(th)*.75;
    for(const p of land){const q=T(p),front=q[2]>=0,scan=Math.exp(-((p[1]*0+q[3]-sY)**2)/.002),rim=1-Math.abs(q[2]),a=(front?.55+.3*rim:.12)*(.7+.3*Math.sin(th*p[4]+p[3]))+scan*.7;ctx.globalAlpha=Math.min(1,a);ctx.fillStyle=scan>.35?'#e6fbff':front?'#58dcff':'#2a8bd0';const s=front?2.6:1.8;ctx.fillRect(q[0]-s/2,q[1]-s/2,s,s)}
    for(const A of arcs){ctx.beginPath();let first=true;const pts=[];for(let k=0;k<=26;k++){const p=T(slerp(A.a,A.b,k/26,A.ang,.2*A.ang/Math.PI+.04));pts.push(p);ctx.globalAlpha=.0}
      ctx.strokeStyle='#ffc15a';ctx.lineWidth=1.4;for(let k=0;k<26;k++){const p=pts[k],q=pts[k+1],fz=(p[2]+q[2])/2;ctx.globalAlpha=fz>-.1?.38:.06;ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke()}
      const s=fr(th/TAU*A.k+A.ph),p=T(slerp(A.a,A.b,s,A.ang,.2*A.ang/Math.PI+.04));if(p[2]>-.1){ctx.globalAlpha=Math.sin(s*Math.PI);ctx.drawImage(spr(GD,64),p[0]-13,p[1]-13,26,26)}}
    for(const n of nodes){const q=T(n);if(q[2]<-.05)continue;const pu=.5+.5*Math.sin(th*n[4]*2+n[3]);ctx.globalAlpha=.8;ctx.fillStyle='#fff3d0';ctx.fillRect(q[0]-2.2,q[1]-2.2,4.4,4.4);ctx.globalAlpha=.4+.5*pu;ctx.drawImage(spr(GD,64),q[0]-17,q[1]-17,34,34);ctx.globalAlpha=.5*(1-pu);ctx.strokeStyle='#ffc15a';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(q[0],q[1],6+pu*14,0,TAU);ctx.stroke()}
    for(const [rr,tl,m,ph] of [[1.34,.9,1,0],[1.58,-.7,-1,2]]){const ct2=Math.cos(tl),st2=Math.sin(tl);const rp=a=>{const x=Math.cos(a)*rr,y0=Math.sin(a)*rr*.0,z=Math.sin(a)*rr;return[cx+x*RR,cy-(y0*ct2-z*st2)*RR*.55,z*ct2+y0*st2]};
      for(let pass=0;pass<2;pass++){ctx.globalAlpha=pass?.35:.1;ctx.strokeStyle='#8fe6ff';ctx.lineWidth=1.3;ctx.beginPath();let on=false;for(let k=0;k<=120;k++){const p=rp(k/120*TAU),ok=pass?p[2]>=0:p[2]<0;if(ok){on?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);on=true}else on=false}ctx.stroke()}
      const p=rp(m*th*2+ph);ctx.globalAlpha=p[2]>=0?.95:.35;ctx.drawImage(spr(CY,64),p[0]-16,p[1]-16,32,32)}
    ctx.globalAlpha=.5;ctx.strokeStyle='#38d6ff';ctx.lineWidth=2;ctx.setLineDash([3,14]);ctx.beginPath();ctx.arc(cx,cy,RR*1.14,th,th+TAU);ctx.stroke();ctx.setLineDash([]);
    const gy=cy-sY*RR*.95;ctx.globalAlpha=.4;ctx.fillStyle='#8fe6ff';ctx.fillRect(cx-RR*Math.sqrt(Math.max(0,1-(sY*.95)**2)),gy-1,2*RR*Math.sqrt(Math.max(0,1-(sY*.95)**2)),2);
    ctx.globalAlpha=.07;ctx.fillStyle='#8fe6ff';for(let y=0;y<H;y+=4)ctx.fillRect(0,y,W,1);
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.4,[2,4]);vignette(.55);grain(.03)}};
