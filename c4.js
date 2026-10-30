/* 7 BLOCKCHAIN - glowing blocks link one by one (navy #030818, blue #2D7BFF, cyan #5CE1FF, mint #3CFFC4) */
C[7]=()=>{const D=DUR/1000,R=rng(707),g={fin:0,fade:1};newTL();A(g,{fin:0},{fin:1},11.8,2.6,'power2.inOut');A(g,{fade:1},{fade:0},D-.9,.9,'power1.in');
  const NB=9,blk=Array.from({length:NB},(_,i)=>({t:1+i*1.15,X:(i-4)*235,Y:Math.sin(i*.7)*80,Z:640+i*50,hash:Array.from({length:3},()=>Array.from({length:8},()=>'0123456789ABCDEF'[(R()*16)|0]).join('')),ph:R()*TAU}));
  const dust=Array.from({length:240},()=>({x:(R()-.5)*3000,y:(R()-.5)*1400,z:300+R()*2200,ph:R()*TAU}));
  const V=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],F=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[3,2,6,7],[0,3,7,4],[1,2,6,5]];
  draw=()=>{clear();const ms=now(),t=ms/1000;ctx.globalAlpha=1;bgRad('#071436','#010309',W/2,H*.5,H*1.2);haze([30,90,255],.025,ms);
    const cam=lerp(-.02,.07,t/D)+.012*Math.sin(t*.5),cc=Math.cos(cam),sc=Math.sin(cam),f0=1250,proj=(x,y,z)=>{const xr=x*cc+z*sc,zr=-x*sc+z*cc+700,k=f0/zr;return[W/2+xr*k,H*.46-y*k-10,zr,k]};
    ctx.globalCompositeOperation='lighter';ctx.lineWidth=1;
    for(let i=-10;i<=10;i++){const a=proj(i*220,-330,300),b=proj(i*220,-330,3000);ctx.globalAlpha=.1*(1-Math.abs(i)/11);ctx.strokeStyle='#4a9bff';ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()}
    for(let j=0;j<14;j++){const z=300+j*200,a=proj(-2200,-330,z),b=proj(2200,-330,z);ctx.globalAlpha=.1*(1-j/15);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()}
    for(const d of dust){const p=proj(d.x,d.y+Math.sin(t*.6+d.ph)*20,d.z);if(p[0]<0||p[0]>W)continue;ctx.globalAlpha=.3*Math.min(1,p[3]*1.2)*(.5+.5*Math.sin(t*1.5+d.ph));ctx.fillStyle='#8fd0ff';ctx.fillRect(p[0],p[1],1+p[3]*1.2,1+p[3]*1.2)}
    const cen=blk.map(b=>proj(b.X,b.Y,b.Z));
    for(let i=0;i<NB-1;i++){const a=blk[i],b=blk[i+1];if(t<b.t+.3)continue;const k=clamp((t-b.t-.3)/.7,0,1),p=cen[i],q=cen[i+1];ctx.globalAlpha=.7*g.fade;ctx.strokeStyle='#5ce1ff';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(lerp(p[0],q[0],k),lerp(p[1],q[1],k));ctx.stroke();
      const s=fr(t*.5+i*.13);ctx.globalAlpha=.9*k*g.fade;ctx.drawImage(spr([92,225,255],64),lerp(p[0],q[0],s)-14,lerp(p[1],q[1],s)-14,28,28);
      if(g.fin>0&&g.fin<1){const w=(g.fin*(NB+2))-i;if(w>0&&w<2){ctx.globalAlpha=Math.sin(w/2*Math.PI);ctx.drawImage(spr([60,255,196],64),lerp(p[0],q[0],clamp(w,0,1))-22,lerp(p[1],q[1],clamp(w,0,1))-22,44,44)}}}
    const order=blk.map((b,i)=>i).sort((a,b)=>blk[b].Z-blk[a].Z);
    for(const i of order){const b=blk[i],e=t-b.t;if(e<0)continue;const sc2=ez('back.out',e/.9)*1,mine=e<1.2,fin=clamp(g.fin*(NB+2)-i,0,1)*(1-clamp((g.fin*(NB+2)-i-2)/2,0,1)),rot=t*.35+i*.7,cr=Math.cos(rot),sr=Math.sin(rot),S=82*sc2;
      const P=V.map(([x,y,z])=>{const x1=x*S*cr+z*S*sr,z1=-x*S*sr+z*S*cr,y1=y*S*Math.cos(.35)-z1*Math.sin(.35)*.0;return proj(b.X+x1,b.Y+y1+Math.sin(t*1.1+b.ph)*14,b.Z+z1)});
      const fc=F.map(f=>({f,z:f.reduce((s,k)=>s+P[k][2],0)/4})).sort((a,c)=>c.z-a.z);
      const col=mine?[255,190,80]:fin>0?[60,255,196]:[45,123,255],mixv=fin>0?fin:0;
      for(const {f,z} of fc){const pts=f.map(k=>P[k]);ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let k=1;k<4;k++)ctx.lineTo(pts[k][0],pts[k][1]);ctx.closePath();const br=1-(z-700)/2400;ctx.globalAlpha=(.1+.12*br)*g.fade;ctx.fillStyle=rgba(mixc(col,[60,255,196],mixv),1);ctx.fill();ctx.globalAlpha=(.55+.4*br)*g.fade;ctx.strokeStyle=rgba(mixc([140,225,255],[200,255,230],mixv),1);ctx.lineWidth=2.2;ctx.stroke()}
      const c0=cen[i];ctx.globalAlpha=(.5+.4*mixv)*g.fade;ctx.drawImage(spr(mixc(col,[60,255,196],mixv),128),c0[0]-S*c0[3]*2.2,c0[1]-S*c0[3]*2.2,S*c0[3]*4.4,S*c0[3]*4.4);
      if(e<1.1){ctx.globalAlpha=(1-e/1.1)*.8;ctx.strokeStyle='#ffd27a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(c0[0],c0[1],S*c0[3]*(1+e*3),0,TAU);ctx.stroke()}
      const front=fc[fc.length-1].f.map(k=>P[k]),fx=front.reduce((s,p)=>s+p[0],0)/4,fy=front.reduce((s,p)=>s+p[1],0)/4,fsz=Math.max(10,14*c0[3]*1.7);ctx.globalCompositeOperation='source-over';
      const hs=mine?Array.from({length:8},(_,k)=>'0123456789ABCDEF'[Math.floor(rng(i*977+Math.floor(ms/60)*13+k)()*16)]).join(''):b.hash[0];
      ctx.globalAlpha=.9*g.fade;ctx.font=`700 ${fsz}px "JetBrains Mono"`;ctx.textAlign='center';ctx.fillStyle=mine?'#ffd27a':'#d8f6ff';ctx.fillText(hs,fx,fy-fsz*.2);ctx.fillText(mine?'#'+String(Math.floor(ms/30)%9999).padStart(4,'0'):b.hash[1],fx,fy+fsz*1.1);ctx.globalCompositeOperation='lighter'}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.75,[2,4]);vignette(.55);grain(.03)}};

/* 8 DNA DOUBLE HELIX (loop) - deep teal #021318, cyan #3EE6FF, coral #FF6B8A, white */
C[8]=()=>{newTL();const R=rng(808);
  const cells=Array.from({length:44},()=>({x:R()*W,y:R()*H,r:30+R()*110,ph:R()*TAU,k:1+((R()*2)|0),a:.04+R()*.1,c:R()<.5?[62,230,255]:[255,107,138]}));
  const dust=Array.from({length:240},()=>({x:R()*W,y:R()*H,s:.8+R()*1.8,ph:R()*TAU,k:1+((R()*3)|0)}));
  const helix=(ox,oy,ang,len,rad,pitch,scale,alpha,blur,th,pairs)=>{const ca=Math.cos(ang),sa=Math.sin(ang),n=pairs,A=[],B=[];
    for(let i=0;i<=n;i++){const a=-len/2+len*i/n,ph=a/pitch*TAU+th,x=Math.cos(ph)*rad,z=Math.sin(ph)*rad,px=ox+a*ca-x*sa,py=oy+a*sa+x*ca;A.push([px,py,z,ph]);const x2=-x,z2=-z;B.push([ox+a*ca-x2*sa,oy+a*sa+x2*ca,z2])}
    const items=[];for(let i=0;i<=n;i++){items.push({k:'r',i,z:(A[i][2]+B[i][2])/2-9999});items.push({k:'a',i,z:A[i][2]});items.push({k:'b',i,z:B[i][2]})}
    items.sort((p,q)=>p.z-q.z);ctx.globalCompositeOperation='lighter';
    for(let i=0;i<n;i++){for(const [P,c] of [[A,[62,230,255]],[B,[255,107,138]]]){const zf=(P[i][2]+rad)/(2*rad);ctx.globalAlpha=alpha*(.15+.4*zf);ctx.strokeStyle=rgba(c,1);ctx.lineWidth=5*scale;ctx.beginPath();ctx.moveTo(P[i][0],P[i][1]);ctx.lineTo(P[i+1][0],P[i+1][1]);ctx.stroke()}}
    for(const it of items){const i=it.i;if(it.k==='r'){if(i%2)continue;const z=(A[i][2]+B[i][2])/2;ctx.globalAlpha=alpha*.55;const gr=ctx.createLinearGradient(A[i][0],A[i][1],B[i][0],B[i][1]);gr.addColorStop(0,'rgba(62,230,255,.9)');gr.addColorStop(.5,'rgba(255,255,255,.7)');gr.addColorStop(1,'rgba(255,107,138,.9)');ctx.strokeStyle=gr;ctx.lineWidth=3.2*scale;ctx.beginPath();ctx.moveTo(A[i][0],A[i][1]);ctx.lineTo(B[i][0],B[i][1]);ctx.stroke()}
      else{const P=it.k==='a'?A:B,c=it.k==='a'?[62,230,255]:[255,107,138],zf=(P[i][2]+rad)/(2*rad),s=(14+22*zf)*scale*(blur?1.5:1);ctx.globalAlpha=alpha*(.35+.65*zf)*(blur?.6:1);ctx.drawImage(spr(c,64),P[i][0]-s,P[i][1]-s,s*2,s*2)}}};
  draw=()=>{clear();const ms=now(),th=LOOP(ms);bgRad('#04252d','#010a0e');haze([20,150,160],.07,ms,1,th);ctx.globalCompositeOperation='lighter';
    for(const c of cells){ctx.globalAlpha=c.a*(.7+.3*Math.sin(th*c.k+c.ph));ctx.drawImage(spr(c.c,128),c.x+30*Math.sin(th+c.ph)-c.r,c.y+20*Math.cos(th*c.k+c.ph)-c.r,c.r*2,c.r*2)}
    helix(W*.62,H*.42,-.62,2600,70,250,.55,.42,true,-th*2+1,64);
    helix(W*.5,H*.5,-.42,2900,125,420,1,1,false,th,76);
    for(const d of dust){ctx.globalAlpha=.4*(.3+.7*Math.sin(th*d.k+d.ph)**2);ctx.fillStyle='#bff6ff';ctx.fillRect(d.x,(d.y+Math.sin(th+d.ph)*14),d.s,d.s)}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.8,[2,4]);vignette(.55);grain(.03)}};

/* 9 ECG HEARTBEAT MONITOR (loop) - black, ECG green #3DFF8F, pleth cyan #4FD8FF, resp amber #FFC24D */
C[9]=()=>{newTL();const R=rng(909);
  const ecg=x=>{const p=fr(x/(W/8)),g=(c,w,a)=>a*Math.exp(-((p-c)**2)/(2*w*w));return g(.18,.035,.12)-g(.385,.007,.14)+g(.405,.008,1)-g(.43,.01,.28)+g(.62,.05,.2)};
  const ple=x=>{const p=fr(x/(W/8)+.06);return Math.exp(-((p-.35)**2)/.012)*.8+Math.exp(-((p-.55)**2)/.02)*.28};
  const res=x=>Math.sin(TAU*x/(W/2))*.5+Math.sin(TAU*x/(W/4)+1)*.1;
  const tr=[{f:ecg,y:330,a:150,c:[61,255,143],w:3.2,lab:'II  ECG'},{f:ple,y:700,a:-130,c:[79,216,255],w:2.6,lab:'SpO2  PLETH'},{f:res,y:910,a:-60,c:[255,194,77],w:2.4,lab:'RESP'}];
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR,TW=1380,head=fr(u*5)*TW;bgRad('#041208','#000402',W/2,H/2,H*1.2);
    ctx.lineWidth=1;for(let x=0;x<=W;x+=32){ctx.globalAlpha=x%160?.05:.12;ctx.strokeStyle='#2cff7a';ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}for(let y=0;y<=H;y+=32){ctx.globalAlpha=y%160?.05:.12;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
    for(const T of tr){txt(T.lab,70,T.y-(T.a>0?170:150),{f:'JetBrains Mono',w:700,size:22,al:'left',ls:4,fill:rgba(T.c,.85)});
      ctx.globalCompositeOperation='lighter';
      for(const [lw,al] of [[T.w*5,.08],[T.w,1]]){ctx.lineWidth=lw;ctx.lineJoin='round';
        const seg=(x0,x1)=>{ctx.beginPath();let st=true;for(let x=x0;x<=x1;x+=3){const y=T.y-T.f(x)*T.a;st?ctx.moveTo(x,y):ctx.lineTo(x,y);st=false}ctx.stroke()};
        const bands=12,tail=TW*.85;for(let b=0;b<bands;b++){const e1=head-b*tail/bands,e0=e1-tail/bands-2;ctx.globalAlpha=al*(1-b/bands)**1.5;ctx.strokeStyle=rgba(T.c,1);
          if(e0<0){seg(Math.max(0,e0+TW),TW);seg(0,Math.max(0,e1))}else seg(e0,e1)}}
      const hy=T.y-T.f(head)*T.a;ctx.globalAlpha=1;ctx.drawImage(spr(T.c,128),head-40,hy-40,80,80);ctx.globalCompositeOperation='source-over'}
    const pulse=Math.exp(-fr(u*40)*7);ctx.globalAlpha=.25;ctx.fillStyle='#3dff8f';ctx.fillRect(1418,60,2,H-120);ctx.globalAlpha=1;
    const bpm=72+Math.round(3*Math.sin(th*2));txt(String(bpm),1830,300,{f:'Orbitron',w:900,size:150,al:'right',fill:'#3dff8f',glow:[['#3dff8f',26]]});txt('BPM',1830,400,{f:'JetBrains Mono',w:700,size:30,al:'right',ls:6,fill:'rgba(61,255,143,.8)'});
    ctx.save();ctx.translate(1560,170);ctx.scale(1+pulse*.22,1+pulse*.22);ctx.fillStyle='#ff4560';ctx.shadowColor='#ff4560';ctx.shadowBlur=24*S;heart(0,-26,48);ctx.fill();ctx.restore();
    txt('SpO2  98 %',1830,650,{f:'Orbitron',w:900,size:54,al:'right',fill:'#4fd8ff',glow:[['#4fd8ff',18]]});txt('RESP  16',1830,880,{f:'Orbitron',w:900,size:46,al:'right',fill:'#ffc24d',glow:[['#ffc24d',16]]});
    ctx.globalAlpha=1;bloom(.55,[2,4]);grain(.025)}};

/* 10 PADLOCK BREACH - blue #3A8BFF -> red #FF2D4D, near-black */
C[10]=()=>{const D=DUR/1000,R=rng(1010),g={sh:0,open:0,r:0,fade:1,pr:0,fl:0,txt:0};newTL();CustomWiggle.create('wg10',{wiggles:14,type:'uniform'});
  A(g,{r:0},{r:1},4.2,1.2,'power2.inOut');A(g,{pr:0},{pr:1},4.4,5.2,'power1.inOut');A(g,{sh:0},{sh:1},4.4,5.4,'wg10');A(g,{open:0},{open:1},9.9,.8,'back.out(2.2)');A(g,{fl:0},{fl:1},9.9,.12,'power2.out');A(g,{fl:1},{fl:0},10.02,1.1,'power2.out');A(g,{txt:0},{txt:1},10.6,1,'power3.out');A(g,{fade:1},{fade:0},D-.9,.9,'power1.in');
  const rings=Array.from({length:4},(_,i)=>({r:300+i*70,n:34-i*3,sp:(i%2?-1:1)*(1+i*.4),sz:15+i*2,sets:Array.from({length:60},()=>'0123456789ABCDEF'[(R()*16)|0])}));
  const shards=Array.from({length:90},()=>{const a=R()*TAU,s=250+R()*900;return{vx:Math.cos(a)*s,vy:Math.sin(a)*s-200,w:3+R()*10,h:2+R()*5,rot:R()*TAU,vr:(R()-.5)*14}});
  const dust=Array.from({length:200},()=>({x:R()*W,y:R()*H,s:.8+R()*1.6,ph:R()*TAU}));
  draw=()=>{clear();const ms=now(),t=ms/1000,cx=W/2,cy=H/2+10,col=mixc([58,139,255],[255,45,77],g.r),cc=rgba(col,1);ctx.globalAlpha=g.fade;bgRad(rgba(mixc([6,20,48],[40,4,10],g.r),1),'#010103');
    ctx.globalCompositeOperation='lighter';for(const d of dust){ctx.globalAlpha=g.fade*.3*(.4+.6*Math.sin(t*1.5+d.ph)**2);ctx.fillStyle=cc;ctx.fillRect(d.x,d.y,d.s,d.s)}
    ctx.globalAlpha=g.fade*(.28+.12*g.r);ctx.drawImage(spr(col,256),cx-620,cy-620,1240,1240);
    ctx.font='700 22px "JetBrains Mono"';ctx.textAlign='center';ctx.textBaseline='middle';
    for(const [ri,rg] of rings.entries()){const sc=ez('power3.out',(t-.2-ri*.2)/1.4);if(sc<=0)continue;for(let k=0;k<rg.n;k++){const a=k/rg.n*TAU+t*.25*rg.sp,ch=rg.sets[(k+Math.floor(t*(6+g.pr*30)+ri*3))%60];ctx.globalAlpha=g.fade*sc*(.25+.4*Math.sin(a*2+t)**2);ctx.fillStyle=cc;ctx.font=`700 ${rg.sz}px "JetBrains Mono"`;ctx.save();ctx.translate(cx+Math.cos(a)*rg.r*1.05,cy+Math.sin(a)*rg.r*.95);ctx.rotate(a+Math.PI/2);ctx.fillText(ch,0,0);ctx.restore()}}
    ctx.globalCompositeOperation='source-over';const ap=ez('power3.out',(t-.3)/1.4),shake=g.sh*7*(1-g.open),sx=Math.sin(t*90)*shake,sy=Math.cos(t*77)*shake*.6;ctx.save();ctx.translate(cx+sx,cy+sy+(1-ap)*60);ctx.globalAlpha=g.fade*ap;
    const lift=g.open*70,tilt=g.open*.28;ctx.shadowColor=cc;ctx.shadowBlur=36*S;ctx.strokeStyle=cc;ctx.lineWidth=26;ctx.lineCap='round';ctx.save();ctx.translate(-72,-10);ctx.rotate(-tilt);ctx.translate(72,10);ctx.beginPath();ctx.moveTo(-72,-10);ctx.lineTo(-72,-92-lift);ctx.arc(0,-92-lift,72,Math.PI,0);ctx.lineTo(72,-10-(g.open>0?lift*.0:0));ctx.stroke();ctx.restore();
    ctx.shadowBlur=0;const bg=ctx.createLinearGradient(0,-10,0,170);bg.addColorStop(0,rgba(mixc(col,[255,255,255],.12),1));bg.addColorStop(1,rgba(mixc(col,[0,0,0],.55),1));ctx.fillStyle=bg;ctx.shadowColor=cc;ctx.shadowBlur=30*S;roundRect(-120,-10,240,190,26);ctx.fill();ctx.shadowBlur=0;
    ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=3;roundRect(-120,-10,240,190,26);ctx.stroke();ctx.fillStyle='#050308';ctx.beginPath();ctx.arc(0,66,20,0,TAU);ctx.fill();ctx.fillRect(-8,70,16,50);ctx.restore();
    if(g.fl>0){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=g.fl*.8;ctx.fillStyle='#ff5a70';ctx.fillRect(0,0,W,H)}
    ctx.globalCompositeOperation='lighter';if(t>9.9){const e=t-9.9;for(const s of shards){const x=cx+s.vx*e*.9,y=cy-40+s.vy*e*.9+900*e*e*.5,a=Math.max(0,1-e/2.2);if(a<=0)continue;ctx.globalAlpha=a*g.fade;ctx.fillStyle='#ff5a70';ctx.save();ctx.translate(x,y);ctx.rotate(s.rot+s.vr*e);ctx.fillRect(-s.w/2,-s.h/2,s.w,s.h);ctx.restore()}}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=g.fade;
    const label=t<4.2?'ENCRYPTED':t<9.9?'BRUTE FORCE  '+String(Math.floor(g.pr*100)).padStart(2,'0')+'%':'SYSTEM BREACHED';const sub=t<4.2?'AES-256  /  SECURE CHANNEL':t<9.9?'ATTEMPT '+String(Math.floor(t*4200)%99999).padStart(5,'0')+'  //  '+Array.from({length:10},(_,k)=>'0123456789ABCDEF'[Math.floor(rng(Math.floor(ms/50)*7+k)()*16)]).join(''):'DATA EXFILTRATION IN PROGRESS';
    txt(label,cx,H-190,{f:'Orbitron',w:900,size:t>9.9?64:52,ls:8,fill:cc,glow:[[cc,22]],a:t>9.9?g.txt:1});txt(sub,cx,H-130,{f:'JetBrains Mono',w:700,size:24,ls:4,fill:'rgba(255,255,255,.6)',a:t>9.9?g.txt:1});
    if(t>4.2&&t<9.9){ctx.fillStyle=cc;ctx.globalAlpha=g.fade*.9;ctx.fillRect(cx-300,H-100,600*g.pr,8);ctx.globalAlpha=g.fade*.3;ctx.fillRect(cx-300,H-100,600,8)}
    ctx.globalAlpha=1;bloom(.8,[2,4]);vignette(.6);grain(.035)}};
