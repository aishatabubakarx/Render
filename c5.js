/* 17 BLACK HOLE ACCRETION DISK */
C[17]=()=>{newTL();const R=rng(13),N=3800,ps=[],st=[],HR=132,TILT=-.2,FL=.27;
  for(let i=0;i<N;i++){const r=172+Math.pow(R(),1.75)*430;ps.push({r,th:R()*TAU,k:Math.max(2,Math.round(15*Math.pow(172/r,1.5))),s:6+R()*8,u:(r-172)/430,j:R()})}
  for(let i=0;i<260;i++)st.push({x:R()*W,y:R()*H,a:.2+R()*.6,ph:R()*TAU,k:1+(R()*5|0),s:R()<.1?2:1.2});
  const ramp=u=>{const A=[[255,246,228],[255,190,92],[240,96,30],[150,30,12]],x=clamp(u,0,.999)*3,i=x|0;return q16(mixc(A[i],A[i+1],x-i))};
  draw=()=>{clear();const p=T()*TAU,cs=Math.cos(TILT),sn=Math.sin(TILT);
    ctx.fillStyle='#fff';for(const s of st){ctx.globalAlpha=s.a*(.5+.5*Math.sin(p*s.k+s.ph));ctx.fillRect(s.x,s.y,s.s,s.s)}ctx.globalAlpha=1;
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.32+.04*Math.sin(p*3);ctx.drawImage(smk([255,130,40],256),CX-760,CY-460,1520,920);ctx.globalAlpha=1;
    const near=[];
    for(const o of ps){const th=o.th+p*o.k,c=Math.cos(th),sv=Math.sin(th),dop=.5+.5*(-c*.8+.2),col=ramp(o.u*.9+.05),al=.8*(.32+.68*(1-o.u*.55))*(.35+.65*dop);
      if(sv<0){const rl=150+o.u*.9*180,ax=rl*c,ay=-rl*Math.abs(sv)*1.02;ctx.globalAlpha=al*.9;ctx.drawImage(spr(col,32),CX+ax-o.s,CY+ay-o.s*.9,o.s*2,o.s*1.8)}
      else{const rl2=130+o.u*.9*150,ax2=rl2*c,ay2=rl2*sv*.7;ctx.globalAlpha=al*.3;ctx.drawImage(spr(col,32),CX+ax2-o.s*.7,CY+ay2+(.0)-o.s*.7,o.s*1.4,o.s*1.4);near.push([o,c,sv,al,col])}}
    // fix: far-side particles drawn relative to center
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.fillStyle='#000';ctx.beginPath();ctx.arc(CX,CY,HR,0,TAU);ctx.fill();
    ctx.globalCompositeOperation='lighter';
    const rg=ctx.createRadialGradient(CX,CY,0,CX,CY,HR+40);rg.addColorStop(0,'rgba(0,0,0,0)');rg.addColorStop(HR/(HR+40)-.01,'rgba(0,0,0,0)');rg.addColorStop(HR/(HR+40),'rgba(255,225,170,.8)');rg.addColorStop(.86,'rgba(255,150,60,.3)');rg.addColorStop(1,'rgba(255,100,30,0)');ctx.fillStyle=rg;ctx.beginPath();ctx.arc(CX,CY,HR+40,0,TAU);ctx.fill();
    ctx.strokeStyle='rgba(255,236,200,.8)';ctx.lineWidth=2.4;ctx.beginPath();ctx.arc(CX,CY,HR+1,0,TAU);ctx.stroke();
    for(const [o,c,sv,al,col] of near){const x0=o.r*c,y0=o.r*sv*FL,x=CX+x0*cs-y0*sn,y=CY+x0*sn+y0*cs;ctx.globalAlpha=al;ctx.drawImage(spr(col,32),x-o.s,y-o.s,o.s*2,o.s*2)}
    ctx.globalAlpha=1};
};
/* 18 DNA DOUBLE HELIX */
C[18]=()=>{newTL();const R=rng(29),N=58,SP=34,RAD=150,bk=[];
  for(let i=0;i<110;i++)bk.push({x:R()*W,y:R()*H,k:1+(R()*2|0),ph:R()*TAU,s:20+R()*60,kx:1+(R()*3|0),h:R()<.5?190:320});
  const PAIR=[[[255,196,60],[90,255,150]],[[255,120,70],[110,160,255]]];
  draw=()=>{clear();const t=T(),p=t*TAU;ctx.globalCompositeOperation='lighter';
    for(const b of bk){const yy=H+80-fr(b.y/H+t*b.k)*(H+160),xx=b.x+Math.sin(p*b.kx+b.ph)*40;ctx.globalAlpha=.06;ctx.drawImage(bok(hue2(b.h,.8,.6),128),xx-b.s,yy-b.s,b.s*2,b.s*2)}
    ctx.globalAlpha=.25;ctx.drawImage(smk([60,110,255],256),CX-900,CY-420,1800,840);ctx.globalAlpha=1;
    ctx.save();ctx.translate(CX,CY);ctx.rotate(-.2);const items=[],A=[],Bn=[];
    for(let i=0;i<N;i++){const x=(i-(N-1)/2)*SP,a=i*.4+p*2,s=Math.sin(a),c=Math.cos(a),y1=s*RAD,z1=c,y2=-s*RAD,z2=-c;A.push({x,y:y1,z:z1});Bn.push({x,y:y2,z:z2});
      items.push({z:0,t:'r',i,x,y1,y2,z1,z2,pr:PAIR[i%2],zz:0});items.push({z:z1,t:'n',x,y:y1,col:[60,220,255]});items.push({z:z2,t:'n',x,y:y2,col:[255,70,200]})}
    for(let i=0;i<N-1;i++){items.push({z:(A[i].z+A[i+1].z)/2,t:'s',a:A[i],b:A[i+1],col:[60,220,255]});items.push({z:(Bn[i].z+Bn[i+1].z)/2,t:'s',a:Bn[i],b:Bn[i+1],col:[255,70,200]})}
    items.forEach(o=>{if(o.t==='r')o.z=0});items.sort((a,b)=>a.z-b.z);
    ctx.lineCap='round';
    for(const o of items){
      if(o.t==='s'){const dp=.5+.5*(o.z),w=3+4*dp;ctx.strokeStyle=rgba(o.col,.1+.2*dp);ctx.lineWidth=w*3;ctx.beginPath();ctx.moveTo(o.a.x,o.a.y*(1+.12*o.a.z));ctx.lineTo(o.b.x,o.b.y*(1+.12*o.b.z));ctx.stroke();ctx.strokeStyle=rgba(mixc(o.col,[255,255,255],.35),.35+.6*dp);ctx.lineWidth=w;ctx.stroke()}
      else if(o.t==='n'){const dp=.5+.5*o.z,s=(18+20*dp)*1.7;ctx.globalAlpha=.35+.65*dp;ctx.drawImage(spr(o.col,64),o.x-s,o.y*(1+.12*o.z)-s,s*2,s*2);ctx.globalAlpha=1}
      else{const y1=o.y1*(1+.12*o.z1),y2=o.y2*(1+.12*o.z2),ym=(y1+y2)/2,dp=.5+.5*Math.abs(Math.sin(o.i*.4+p*2));const g1=ctx.createLinearGradient(o.x,y1,o.x,ym);g1.addColorStop(0,rgba(o.pr[0],.9));g1.addColorStop(1,rgba(o.pr[0],.5));const g2=ctx.createLinearGradient(o.x,ym,o.x,y2);g2.addColorStop(0,rgba(o.pr[1],.5));g2.addColorStop(1,rgba(o.pr[1],.9));
        ctx.lineWidth=3.5;ctx.globalAlpha=.3+.6*dp;ctx.strokeStyle=g1;ctx.beginPath();ctx.moveTo(o.x,y1);ctx.lineTo(o.x,ym-2);ctx.stroke();ctx.strokeStyle=g2;ctx.beginPath();ctx.moveTo(o.x,ym+2);ctx.lineTo(o.x,y2);ctx.stroke();ctx.globalAlpha=1}}
    ctx.restore();ctx.globalAlpha=1}
};
/* 19 DIGITAL GLITCH */
C[19]=()=>{newTL();
  const rings=(dx,col,al,wob)=>{ctx.strokeStyle=rgba(col,al);for(const [r,w] of [[120,3],[210,2],[300,5],[420,2],[520,1.5]]){ctx.lineWidth=w;ctx.beginPath();ctx.arc(CX+dx,CY,r+wob*(r/200),0,TAU);ctx.stroke()}
    ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(CX+dx-620,CY);ctx.lineTo(CX+dx+620,CY);ctx.moveTo(CX+dx,CY-380);ctx.lineTo(CX+dx,CY+380);ctx.stroke();ctx.strokeRect(CX+dx-330,CY-330,660,660)};
  draw=()=>{clear();const ms=now(),p=T()*TAU,slot=Math.floor(ms/500),R0=rng(slot*104729+17),burst=R0()<.72,st=R0()*260,du=70+R0()*280,m=ms%500,on=burst&&m>st&&m<st+du;
    const sp=Math.floor(ms/50),R=rng(sp*7919+3),g=on?1:.12,sh=on?10+R()*34:1.2+Math.sin(p*20)*.6;
    ctx.globalCompositeOperation='lighter';rings(-sh,[255,40,70],.85,Math.sin(p*6)*3);rings(0,[40,255,120],.85,0);rings(sh,[50,100,255],.85,-Math.sin(p*6)*3);
    const rp=T()*8;ctx.globalAlpha=.9;for(let i=0;i<5;i++){const a=i/5*TAU+p*1,r=210+Math.sin(p*3+i)*30;ctx.fillStyle='rgba(255,255,255,.75)';ctx.fillRect(CX+Math.cos(a)*r-5,CY+Math.sin(a)*r-5,10,10)}ctx.globalAlpha=1;
    ctx.globalCompositeOperation='source-over';
    const ns=on?6+(R()*10|0):(R()<.25?2:0);
    for(let i=0;i<ns;i++){const y=R()*H,h=3+R()*(on?90:14),dx=(R()-.5)*(on?640:90);ctx.drawImage(cv,0,Math.floor(y*S),W*S,Math.floor(h*S),dx,y,W,h)}
    ctx.globalCompositeOperation='lighter';
    const nb=on?5+(R()*9|0):(R()<.2?1:0);const BC=[[255,40,70],[40,255,120],[50,110,255],[255,255,255],[0,240,255],[255,0,200]];
    for(let i=0;i<nb;i++){const c=BC[R()*6|0],y=R()*H,h=2+R()*(R()<.3?60:10),x=R()*W*.7,w=60+R()*W*.6;ctx.fillStyle=rgba(c,.2+R()*.7);ctx.fillRect(x,y,w,h)}
    if(on){for(let i=0;i<46;i++){const c=BC[R()*6|0],x=(R()*80|0)*24,y=(R()*45|0)*24,w=24*(1+(R()*5|0));ctx.fillStyle=rgba(c,.25+R()*.5);ctx.fillRect(x,y,w,24)}}
    const sy=fr(T()*5)*(H+240)-120,sg=ctx.createLinearGradient(0,sy-90,0,sy+90);sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(.5,'rgba(190,230,255,.07)');sg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sg;ctx.fillRect(0,sy-90,W,180);
    ctx.fillStyle='rgba(255,255,255,.035)';for(let y=0;y<H;y+=4)ctx.fillRect(0,y,W,1)}
};
/* 20 HEARTBEAT ECG MONITOR */
C[20]=()=>{newTL();const BP=15000/18,SW=3000;
  const ecg=u=>.12*gd(u,.16,.026)-.1*gd(u,.285,.011)+1*gd(u,.31,.013)-.24*gd(u,.337,.013)+.28*gd(u,.56,.045);
  const pleth=u=>gd(u,.2,.1)+.32*gd(u,.48,.08);
  const CH=[{y:340,a:210,f:t=>ecg(fr(t/BP)),c:[60,255,120],w:3.4},{y:650,a:115,f:t=>pleth(fr((t-90)/BP))*1.0-.4,c:[80,215,255],w:3},{y:880,a:60,f:t=>Math.sin(t/3000*TAU),c:[255,225,90],w:2.6}];
  draw=()=>{clear();const ms=now(),idx=Math.floor(ms/SW),xh=fr(ms/SW)*W;
    ctx.fillStyle='rgba(60,255,130,.05)';for(let x=0;x<=W;x+=40)ctx.fillRect(x,0,x%200?1:2,H);for(let y=0;y<=H;y+=40)ctx.fillRect(0,y,W,y%200?1:2);
    ctx.globalCompositeOperation='lighter';ctx.lineJoin='round';ctx.lineCap='round';
    for(const ch of CH){const step=5,seg=[];let cur=null;
      for(let x=0;x<=W;x+=step){const live=x<=xh;if(!live&&x<xh+110)continue;const t=(live?idx:idx-1)*SW+x/W*SW,y=ch.y-ch.f(t)*ch.a;const age=live?clamp(1-(xh-x)/(W*.9),0,1)*.55+.45:clamp(1-(x-xh)/W,0,1)*.7;
        const key=(x/(step*8))|0;if(!cur||cur.key!==key||cur.live!==live){const prevEnd=cur&&cur.live===live?cur.pts[cur.pts.length-1]:null;cur={key,live,age,pts:prevEnd?[prevEnd]:[]};seg.push(cur)}cur.pts.push([x,y])}
      for(const sg of seg){ctx.beginPath();sg.pts.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.strokeStyle=rgba(ch.c,sg.age*.2);ctx.lineWidth=ch.w*4;ctx.stroke();ctx.strokeStyle=rgba(mixc(ch.c,[255,255,255],.3),sg.age);ctx.lineWidth=ch.w;ctx.stroke()}
      const hy=ch.y-ch.f(idx*SW+xh/W*SW)*ch.a;ctx.globalAlpha=1;ctx.drawImage(spr(ch.c,128),xh-60,hy-60,120,120)}
    const bt=fr(ms/BP),pu=Math.pow(Math.max(0,1-bt*3.2),2);ctx.globalAlpha=.1+.5*pu;ctx.drawImage(smk([60,255,130],128),W-250,70,200,200);
    ctx.globalAlpha=.55+.45*pu;ctx.fillStyle=rgba([90,255,150],1);heart(W-150,150-8,28+10*pu);ctx.fill();ctx.globalAlpha=1}
};
