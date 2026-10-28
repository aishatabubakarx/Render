/* helper: point + outward normal at distance d along a clockwise rounded rectangle */
const rrLen=(w,h,r)=>2*(w-2*r)+2*(h-2*r)+2*Math.PI*r;
function rrPt(d,x0,y0,w,h,r){const Lh=w-2*r,Lv=h-2*r,La=Math.PI*r/2,T=2*Lh+2*Lv+4*La;d=wrap(d,T);const q=(cx,cy,a)=>[cx+Math.cos(a)*r,cy+Math.sin(a)*r,Math.cos(a),Math.sin(a)];
  if(d<Lh)return[x0+r+d,y0,0,-1];d-=Lh;if(d<La)return q(x0+w-r,y0+r,-Math.PI/2+d/r);d-=La;if(d<Lv)return[x0+w,y0+r+d,1,0];d-=Lv;if(d<La)return q(x0+w-r,y0+h-r,d/r);d-=La;
  if(d<Lh)return[x0+w-r-d,y0+h,0,1];d-=Lh;if(d<La)return q(x0+r,y0+h-r,Math.PI/2+d/r);d-=La;if(d<Lv)return[x0,y0+h-r-d,-1,0];d-=Lv;return q(x0+r,y0+r,Math.PI+d/r)}
function neonStroke(col,core,lw=5){const ga=ctx.globalAlpha;ctx.lineCap='round';ctx.lineJoin='round';
  for(const [w,a] of [[lw*5,.07],[lw*3,.14],[lw*1.7,.35],[lw,1]]){ctx.globalAlpha=ga*a;ctx.strokeStyle=rgba(col,1);ctx.lineWidth=w;ctx.stroke()}
  ctx.globalAlpha=ga*.95;ctx.strokeStyle=rgba(core,1);ctx.lineWidth=lw*.38;ctx.stroke();ctx.globalAlpha=ga}
const hash1=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)};
/* 5 VALENTINE NEON HEARTS + GLITTER STAR TRAILS BORDER FRAME  (alpha, seamless loop) */
C[5]=()=>{newTL();const ins=64,fx=ins,fy=ins,fw=W-ins*2,fh=H-ins*2,fr=110,T=rrLen(fw,fh,fr),NH=38,hc=[[255,40,120],[255,70,150],[255,30,70],[255,110,190],[230,40,200]];
  const La=Math.PI*fr/2,Lh=fw-2*fr,Lv=fh-2*fr;
  const cd=[Lh+La/2,Lh+La+Lv+La/2,2*Lh+2*La+Lv+La/2,2*Lh+3*La+2*Lv+La/2];
  const corners=cd.map(d=>({d,p:rrPt(d,fx,fy,fw,fh,fr)}));
  const far=d=>corners.every(c=>Math.abs(wrap(d-c.d+T/2,T)-T/2)>150);
  const hearts=[];for(let i=0;i<NH;i++){const d=i/NH*T;if(far(d))hearts.push({d,p:rrPt(d,fx,fy,fw,fh,fr),s:i%2?46:66,c:hc[i%hc.length],u:i/NH})}
  const comets=[{cyc:2,off:0,col:[255,230,150],dir:1},{cyc:1,off:.5,col:[255,150,210],dir:1},{cyc:3,off:.25,col:[255,255,255],dir:-1}];
  const dust=Array.from({length:70},(_,i)=>{const d=hash1(i+1)*T,p=rrPt(d,fx,fy,fw,fh,fr),o=(hash1(i+99)-.5)*150;return{x:p[0]+p[2]*o,y:p[1]+p[3]*o,k:2+(i%7),ph:hash1(i+7),s:6+hash1(i+3)*14}});
  const hp=(x,y,s)=>heart(x,y-s*.5,s);
  draw=()=>{clear();const p=P();
    const N=Math.round(T/5);let run=false;ctx.beginPath();
    const near=d=>hearts.some(h=>Math.abs(wrap(d-h.d+T/2,T)-T/2)<h.s*.62)||corners.some(c=>Math.abs(wrap(d-c.d+T/2,T)-T/2)<95);
    for(let i=0;i<=N;i++){const d=i/N*T,q=rrPt(d,fx,fy,fw,fh,fr);if(near(d)){run=false;continue}if(!run){ctx.moveTo(q[0],q[1]);run=true}else ctx.lineTo(q[0],q[1])}
    ctx.globalAlpha=.9+.1*Math.sin(TAU*(30*p)+Math.sin(TAU*7*p)*3);neonStroke([255,40,130],[255,225,240],5.5);
    const heartAt=(x,y,s,col,u)=>{const wv=.5+.5*Math.sin(TAU*(3*p-u*3)),b=.55+.45*wv,sc=1+.09*wv;ctx.save();ctx.translate(x,y);ctx.scale(sc,sc);ctx.beginPath();hp(0,0,s);ctx.globalAlpha=b;neonStroke(col,[255,235,245],s>90?7:5);
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=b*.13;ctx.fillStyle=rgba(col,1);ctx.beginPath();hp(0,0,s);ctx.fill();ctx.restore()};
    for(const h of hearts)heartAt(h.p[0],h.p[1],h.s,h.c,h.u);
    corners.forEach((c,i)=>heartAt(c.p[0]+c.p[2]*8,c.p[1]+c.p[3]*8,132,[255,50,120],i*.25));
    ctx.globalCompositeOperation='lighter';
    for(const dd of dust){const t=.5+.5*Math.sin(TAU*(dd.k*p+dd.ph));flare(dd.x,dd.y,dd.s*(.5+t),t*t*.9,'#ffe6f1')}
    for(const cm of comets){const hd=cm.dir*p*cm.cyc*T+cm.off*T,NT=90;
      for(let k=0;k<NT;k++){const q=rrPt(hd-cm.dir*k*8,fx,fy,fw,fh,fr),f=1-k/NT,j=(hash1(k*3.1+cm.off*50)-.5)*(10+k*.7)+Math.sin(TAU*(4*p+k*.37))*3,x=q[0]+q[2]*j,y=q[1]+q[3]*j,tw=.55+.45*Math.sin(TAU*(9*p+k*.61));
        ctx.globalAlpha=Math.pow(f,1.5)*tw;const s=(k===0?60:20)*f+7;ctx.drawImage(spr(k<4?[255,255,255]:cm.col,64),x-s,y-s,s*2,s*2);if(k%3===0)flare(x,y,16*f+5,Math.pow(f,1.2)*tw,'#fff')}}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
/* 6 SHINY GLOWING HEART ROMANTIC LOVE OVERLAY  (alpha, seamless loop) */
C[6]=()=>{newTL();const R=rng(66),cx=W/2,cy=H/2+10,HS=470,beats=20;
  const bump=q=>Math.exp(-Math.pow((q-.08)/.05,2))+.62*Math.exp(-Math.pow((q-.3)/.06,2));
  const hp=(x,y,s)=>{ctx.beginPath();heart(x,y-s*.46,s)};
  const minis=Array.from({length:46},()=>({x:R()*W,y:R()*(H+240),s:14+R()*38,cyc:1+(R()*2|0),sw:20+R()*70,k:1+(R()*3|0),ph:R(),a:.35+R()*.6,c:R()<.5?[255,70,130]:R()<.5?[255,150,190]:[255,40,90]}));
  const sps=Array.from({length:34},()=>{const a=R()*TAU,d=HS*(.62+R()*.5);return{x:cx+Math.cos(a)*d*1.15,y:cy+Math.sin(a)*d*.85,k:2+(R()*6|0),ph:R(),s:10+R()*26}});
  draw=()=>{clear();const p=P(),q=wrap(p*beats,1),b=bump(q),sc=1+.085*b;
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.5+.25*b;const gs=HS*1.5;ctx.drawImage(spr([255,40,110],256),cx-gs,cy-gs,gs*2,gs*2);ctx.globalCompositeOperation='source-over';
    for(let i=0;i<2;i++){const e=wrap(p*(beats/2)+i*.5,1);ctx.save();ctx.translate(cx,cy);ctx.scale(1+e*1.1,1+e*1.1);hp(0,0,HS);ctx.globalAlpha=(1-e)*.55;ctx.strokeStyle='rgba(255,140,190,1)';ctx.lineWidth=5/(1+e*1.1);ctx.stroke();ctx.restore()}
    ctx.globalAlpha=1;ctx.save();ctx.translate(cx,cy);ctx.scale(sc,sc);hp(0,0,HS);
    const g=ctx.createRadialGradient(-HS*.18,-HS*.22,HS*.04,0,0,HS*.78);g.addColorStop(0,'#ff9fc0');g.addColorStop(.28,'#ff3d78');g.addColorStop(.7,'#d4124c');g.addColorStop(1,'#8e0830');ctx.fillStyle=g;ctx.shadowColor='rgba(255,40,100,.9)';ctx.shadowBlur=70*S;ctx.fill();ctx.shadowBlur=0;
    ctx.save();hp(0,0,HS);ctx.clip();
    const sx=lerp(-HS*1.1,HS*1.1,wrap(P()*4,1));ctx.save();ctx.rotate(.5);const sg=ctx.createLinearGradient(sx-90,0,sx+90,0);sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(.5,'rgba(255,255,255,.55)');sg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sg;ctx.fillRect(-HS*1.5,-HS*1.5,HS*3,HS*3);ctx.restore();
    const rg=ctx.createRadialGradient(0,HS*.5,0,0,HS*.5,HS*.5);rg.addColorStop(0,'rgba(255,120,150,.45)');rg.addColorStop(1,'rgba(255,120,150,0)');ctx.fillStyle=rg;ctx.fillRect(-HS,0,HS*2,HS);
    ctx.restore();
    ctx.lineWidth=7;ctx.strokeStyle='rgba(255,190,215,.9)';hp(0,0,HS);ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,.8)';ctx.beginPath();ctx.ellipse(-HS*.3,-HS*.2,HS*.09,HS*.17,.72,0,TAU);ctx.fill();ctx.fillStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.ellipse(-HS*.07,-HS*.33,HS*.05,HS*.025,0,0,TAU);ctx.fill();
    ctx.restore();
    ctx.globalCompositeOperation='lighter';
    for(const s of sps){const t=.5+.5*Math.sin(TAU*(s.k*p+s.ph));flare(s.x,s.y,s.s*(.4+t),t*t,'#ffd9e8');ctx.globalAlpha=t*t*.5;ctx.drawImage(spr([255,110,170],64),s.x-s.s*2,s.y-s.s*2,s.s*4,s.s*4)}
    ctx.globalCompositeOperation='source-over';
    for(const m of minis){const y=H+120-wrap(m.y-p*m.cyc*(H+240)*-1,H+240),x=m.x+m.sw*sinP(m.k,m.ph);ctx.save();ctx.translate(x,y);ctx.rotate(.3*sinP(m.k,m.ph+.2));ctx.globalAlpha=m.a;const hg=ctx.createLinearGradient(0,-m.s*.5,0,m.s*.6);hg.addColorStop(0,rgba(mixc(m.c,[255,255,255],.4),1));hg.addColorStop(1,rgba(m.c,1));ctx.fillStyle=hg;hp(0,0,m.s);ctx.fill();ctx.restore()}
    ctx.globalAlpha=1};
};
/* 7 GOLDEN STARS + GLOWING GLITTER PARTICLE PATTERN  (alpha, seamless loop) */
C[7]=()=>{newTL();const CELL=240,SZ=Math.round(256*Math.max(1,S));
  const star=(n,inner,sz)=>{const k=mk(sz,sz),x=k.getContext('2d'),c=sz/2,R=sz*.4;x.translate(c,c);x.beginPath();for(let i=0;i<n*2;i++){const a=-Math.PI/2+i*Math.PI/n,r=i%2?R*inner:R;x[i?'lineTo':'moveTo'](Math.cos(a)*r,Math.sin(a)*r)}x.closePath();
    const g=x.createLinearGradient(-R,-R,R,R);g.addColorStop(0,'#fff1b0');g.addColorStop(.35,'#f5b82e');g.addColorStop(.7,'#c8861a');g.addColorStop(1,'#ffdd7a');x.fillStyle=g;x.shadowColor='rgba(255,190,60,.9)';x.shadowBlur=sz*.07;x.fill();x.shadowBlur=0;x.lineJoin='round';x.lineWidth=sz*.012;x.strokeStyle='rgba(255,246,210,.9)';x.stroke();
    x.save();x.clip();for(let i=0;i<n*2;i+=2){const a=-Math.PI/2+i*Math.PI/n;x.fillStyle='rgba(255,255,255,.2)';x.beginPath();x.moveTo(0,0);x.lineTo(Math.cos(a-.2)*R,Math.sin(a-.2)*R);x.lineTo(Math.cos(a)*R,Math.sin(a)*R);x.closePath();x.fill()}x.restore();return k};
  const s5=star(5,.45,SZ),s4=star(4,.3,SZ),s6=star(6,.5,SZ),R=rng(77);
  const gl=[0,1].map(()=>Array.from({length:9},()=>({x:R()*CELL,y:R()*CELL,s:6+R()*12,sh:R()<.5})));
  const wave=(x,y,k,p,div)=>Math.pow(.5+.5*Math.sin(TAU*(k*p-(x+y)/div)),3);
  draw=()=>{clear();const p=P(),off=p*CELL,rot=.12*sinP(1);
    for(let j=-1;j<=H/CELL+1;j++)for(let i=-1;i<=W/CELL+1;i++){const ox=i*CELL-off,oy=j*CELL-off,par=((i+j)%2+2)%2;
      /* main star in the middle of each cell: big 5-point on even cells, medium 4-point on odd cells; a small 6-point star on every grid vertex */
      const cxm=ox+CELL/2,cym=oy+CELL/2,wv=.4+.6*wave(cxm,cym,2,p,1500),big=par===0,sz=(big?196:128)*(.94+.1*wv),im=big?s5:s4;
      ctx.save();ctx.translate(cxm,cym);ctx.rotate(rot*(big?1:-1));ctx.globalAlpha=.82+.18*wv;ctx.drawImage(im,-sz/2,-sz/2,sz,sz);
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=wv*.5;const g=sz*.85;ctx.drawImage(spr([255,190,70],128),-g,-g,g*2,g*2);ctx.globalAlpha=Math.pow(wv,3);flare(0,0,sz*.38*wv+10,Math.pow(wv,3),'#fff7d8');ctx.restore();
      const w2=.4+.6*wave(ox,oy,2,p,1500),s2=56*(.9+.2*w2);ctx.save();ctx.translate(ox,oy);ctx.rotate(-rot*1.5);ctx.globalAlpha=.8;ctx.drawImage(s6,-s2/2,-s2/2,s2,s2);ctx.restore();
      ctx.globalCompositeOperation='lighter';
      for(const q of gl[par]){const x=ox+q.x,y=oy+q.y,w=Math.pow(.5+.5*Math.sin(TAU*(3*p-(x+y*1.3)/700)),4);ctx.globalAlpha=.25+w*.75;const s=q.s*(.5+w);ctx.drawImage(spr([255,214,120],32),x-s,y-s,s*2,s*2);if(q.sh&&w>.35)flare(x,y,q.s*1.8*w+4,w,'#fff5cc')}
      ctx.globalCompositeOperation='source-over'}
    ctx.globalAlpha=1};
};
/* 8 GOLD SPARKLE GLITTER SWIRL  VERTICAL 9:16 SOCIAL MEDIA OVERLAY  (black, seamless loop) */
C[8]=()=>{newTL();const R=rng(88),gold=[[255,206,100],[255,228,160],[238,172,64]],NP=620,HH=H+240;
  const rib=[{amp:330,f:1.15,k:1,ph:0,col:gold[0],w:1},{amp:280,f:1.6,k:-2,ph:.3,col:gold[1],w:.85},{amp:380,f:.85,k:2,ph:.62,col:gold[2],w:.9}];
  const dust=Array.from({length:170},(_,i)=>({x:R()*W,y:R()*HH,s:2+R()*8,cyc:1+(R()*3|0),sw:10+R()*40,k:1+(R()*3|0),ph:R(),tw:2+(R()*8|0),tp:R(),c:gold[i%3],star:i%6===0}));
  draw=()=>{clear();const p=P();
    const g=ctx.createRadialGradient(W/2,H*.6,0,W/2,H*.6,H*.75);g.addColorStop(0,'rgba(64,42,10,.6)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    for(const d of dust){const x=d.x+d.sw*sinP(d.k,d.ph),y=H+120-wrap(d.y+p*d.cyc*HH,HH),t=.5+.5*Math.sin(TAU*(d.tw*p+d.tp));ctx.globalAlpha=.25+.5*t;const s=d.s*1.5;ctx.drawImage(spr(d.c,32),x-s,y-s,s*2,s*2);if(d.star)flare(x,y,d.s*3+4,t*t,'#fff4d2')}
    for(const r of rib){
      for(let i=0;i<NP;i++){const s=i/NP,env=Math.pow(Math.sin(Math.PI*s),.7),ph=TAU*(r.f*s-r.k*p+r.ph),xc=W/2+r.amp*env*Math.sin(ph),bw=(18+120*Math.abs(Math.cos(ph)))*env,lat=(hash1(i*1.37+r.f*7)-.5)*2,
          x=xc+lat*bw,y=H+110-s*(H+220)+(hash1(i*.77+r.k)-.5)*16,tw=.5+.5*Math.sin(TAU*(8*p+i*.31)),a=env*(.3+.7*(1-Math.abs(lat)))*(.35+.65*tw)*r.w,sz=(4+11*hash1(i*.9+3))*(.8+.5*(1-Math.abs(lat)));
        ctx.globalAlpha=Math.min(1,a*1.6);ctx.drawImage(spr(r.col,32),x-sz,y-sz,sz*2,sz*2);
        if(i%8===0&&tw>.4)flare(x,y,sz*1.9*tw+3,a*tw,'#fff3cf')}}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
