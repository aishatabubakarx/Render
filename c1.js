/* 1 - golden glitter dust is drawn out by a glowing pen tip, scatters, then swirls together into a glittering heart with a ribbon swoosh (non-loop, 15 s arc) */
C[1]=()=>{newTL();const R=rng(8080),D=DUR/1000,K=17,eo=gsap.parseEase('power3.out'),eio=gsap.parseEase('power3.inOut');
  /* ---- path: ribbon in, heart, ribbon out (Catmull-Rom through control points, resampled by arc length) ---- */
  const A=[[-160,900],[110,855],[340,905],[570,835],[790,800],[900,765]],CP=[...A];
  for(let t=Math.PI;t<=3*Math.PI+.001;t+=.14)CP.push([960+16*K*Math.pow(Math.sin(t),3),440-K*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))]);
  CP.push(...A.map(p=>[1920-p[0],p[1]]).reverse());
  const cr=(a,b,c,d,t)=>{const t2=t*t,t3=t2*t,f=i=>.5*(2*b[i]+(-a[i]+c[i])*t+(2*a[i]-5*b[i]+4*c[i]-d[i])*t2+(-a[i]+3*b[i]-3*c[i]+d[i])*t3);return[f(0),f(1)]};
  const raw=[];for(let i=0;i<CP.length-1;i++){const a=CP[Math.max(0,i-1)],b=CP[i],c=CP[i+1],d=CP[Math.min(CP.length-1,i+2)];for(let j=0;j<20;j++)raw.push(cr(a,b,c,d,j/20))}raw.push(CP[CP.length-1]);
  const cum=[0];for(let i=1;i<raw.length;i++)cum.push(cum[i-1]+Math.hypot(raw[i][0]-raw[i-1][0],raw[i][1]-raw[i-1][1]));
  const M=3000,PX=new Float32Array(M),PY=new Float32Array(M),NX=new Float32Array(M),NY=new Float32Array(M);let j=0;
  for(let m=0;m<M;m++){const L=cum[cum.length-1]*m/(M-1);while(j<cum.length-2&&cum[j+1]<L)j++;const f=(L-cum[j])/Math.max(1e-6,cum[j+1]-cum[j]);PX[m]=raw[j][0]+(raw[j+1][0]-raw[j][0])*f;PY[m]=raw[j][1]+(raw[j+1][1]-raw[j][1])*f}
  for(let m=0;m<M;m++){const a=Math.max(0,m-2),b=Math.min(M-1,m+2),dx=PX[b]-PX[a],dy=PY[b]-PY[a],l=Math.hypot(dx,dy)||1;NX[m]=-dy/l;NY[m]=dx/l}
  /* ---- particles ---- */
  const N=21000,T0=.35,TD=5.6,PT=[];
  for(let i=0;i<N;i++){const amb=R()<.14,s=R(),d=(R()+R()+R()-1.5)*(R()<.7?9:30),ix=Math.min(M-1,(s*(M-1))|0),ang=R()*TAU,rad=amb?0:30+Math.pow(R(),2.2)*480;
    PT.push({tx:PX[ix]+NX[ix]*d,ty:PY[ix]+NY[ix]*d,s,tb:amb?.4+R()*4.6:T0+s*TD,sx:amb?W*(.04+.92*R()):PX[ix],sy:amb?H*(.05+.9*R()):PY[ix],vx:Math.cos(ang)*rad,vy:Math.sin(ang)*rad*.8-rad*.15,d1:1.4+R()*1.6,tc:5.2+s*2.8+(amb?(R()-.5)*1.6:0),dr:1.8+R()*1.3,bx:(R()-.5)*260,by:(R()-.5)*260,k:1+((R()*4)|0)*.7,ph:R()*TAU,w:3+R()*10,sz:1.2+R()*1.6,a:.5+R()*.5,c:R()<.7?0:R()<.92?1:2,stray:!amb&&R()<.1})}
  PT.sort((a,b)=>a.c-b.c);
  const FS=['#f0a52a','#ffcf6b','#fff1c9'],SP=[[240,165,45],[255,205,110],[255,240,200]].map(c=>spr(c,128)),GI=Array.from({length:90},()=>(R()*N*.9)|0),GP=GI.map(()=>({r:6+R()*(R()<.15?12:7),k:.8+R()*1.6,ph:R()*TAU,rm:R()<.5?1:-1}));
  const pen=t=>{const s=clamp((t-T0)/TD,0,1),ix=Math.min(M-1,(s*(M-1))|0);return[PX[ix],PY[ix]]};
  draw=()=>{clear();const ms=now(),t=ms/1000,form=sm(7,11.5,t),endf=1-sm(D-.9,D,t);ctx.globalCompositeOperation='lighter';
    
    const sw=t>9.5?((t-9.5)/3.4)%1:-9;let last=-1;
    const pos=p=>{const tau=t-p.tb;if(tau<0)return null;const e1=eo(clamp(tau/p.d1,0,1)),e2=p.stray?0:eio(clamp((t-p.tc)/p.dr,0,1)),w=p.w*(1-e2)+1.1*e2;
      let x=p.sx+p.vx*e1+w*Math.sin(t*p.k+p.ph)+tau*3*Math.cos(p.ph),y=p.sy+p.vy*e1+w*Math.cos(t*p.k*.8+p.ph*1.3)+tau*3*Math.sin(p.ph);
      if(e2>0){const bu=Math.sin(Math.PI*e2)*(1-e2*.3);x=x+(p.tx-x)*e2+p.bx*bu;y=y+(p.ty-y)*e2+p.by*bu}return[x,y,e2,tau]};
    for(const p of PT){const o=pos(p);if(!o)continue;const[x,y,e2,tau]=o;if(x<-10||x>W+10||y<-10||y>H+10)continue;
      let al=p.a*clamp(tau/.35,0,1)*endf;if(p.stray)al*=1-sm(p.tc,p.tc+2.2,t);
      const tw=Math.pow(Math.max(0,Math.sin(t*p.k*2.3+p.ph)),9);al*=.16+.84*(.2+1.5*tw);if(sw>-1){const dd=p.s-sw;al*=1+1.8*Math.exp(-dd*dd/.0016)*e2}
      al=Math.min(1,al);if(al<.03)continue;if(last!==p.c){ctx.fillStyle=FS[p.c];last=p.c}ctx.globalAlpha=al;ctx.fillRect(x-p.sz/2,y-p.sz/2,p.sz,p.sz)}
    for(let g=0;g<GI.length;g++){const p=PT[GI[g]],o=pos(p);if(!o)continue;const gp=GP[g],tw=Math.pow(.5+.5*Math.sin(t*gp.k+gp.ph),3),a=clamp(o[3]/.5,0,1)*endf*(p.stray?1-sm(p.tc,p.tc+2.2,t):1),r=gp.r*(.35+.65*tw);
      ctx.globalAlpha=.22*tw*a;ctx.drawImage(SP[p.c],o[0]-r*.9,o[1]-r*.9,r*1.8,r*1.8);ctx.save();ctx.translate(o[0],o[1]);ctx.rotate(t*.4*gp.rm);HP.star4(r*1.6,(.2+.8*tw)*a,FS[p.c],.022);ctx.rotate(Math.PI/4);HP.star4(r*.8,.7*tw*a,FS[p.c],.03);ctx.restore()}
    const pa=1-sm(T0+TD,T0+TD+.6,t);if(pa>.01&&t>.05){const[hx,hy]=pen(t),pu=.85+.15*Math.sin(t*30);ctx.globalAlpha=.9*pa*pu;ctx.drawImage(SP[2],hx-46,hy-46,92,92);ctx.globalAlpha=.5*pa;ctx.drawImage(SP[0],hx-130,hy-130,260,260);ctx.save();ctx.translate(hx,hy);ctx.rotate(t*1.5);HP.star4(34*pa,.9*pa,'#fff6dc',.03);ctx.rotate(Math.PI/4);HP.star4(18*pa,.7*pa,'#fff6dc',.04);ctx.restore()}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.5,[2,4]);grain(.02)}};
