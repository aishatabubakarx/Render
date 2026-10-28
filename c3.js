/* 9 LOADING SPINNER ANIMATION  (black, seamless loop) */
C[9]=()=>{newTL();const cx=W/2,cy=H/2-40,R=150;
  draw=()=>{clear();const p=P();
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55;let s=520;ctx.drawImage(spr([70,110,255],128),cx-s,cy-s,s*2,s*2);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    /* dotted ring: 12 dots pulsing in sequence */
    for(let i=0;i<12;i++){const a=i/12*TAU-Math.PI/2,w=Math.pow(.5+.5*Math.sin(TAU*(12*p-i/12)),3),r=R+62,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
      ctx.globalAlpha=.25+.75*w;ctx.fillStyle=rgba(mixc([90,130,255],[170,255,255],w),1);ctx.shadowColor='rgba(110,170,255,.9)';ctx.shadowBlur=(6+22*w)*S;ctx.beginPath();ctx.arc(x,y,5+6*w,0,TAU);ctx.fill()}
    ctx.shadowBlur=0;ctx.globalAlpha=1;
    /* base track */
    ctx.lineWidth=14;ctx.strokeStyle='rgba(255,255,255,.07)';ctx.beginPath();ctx.arc(cx,cy,R,0,TAU);ctx.stroke();
    /* material-style breathing arc */
    const rot=TAU*(10*p),len=.18+.62*(.5+.5*Math.sin(TAU*(10*p*.5))),a0=rot,a1=rot+len*TAU;
    const gr=ctx.createConicGradient(a0,cx,cy);gr.addColorStop(0,'rgba(80,120,255,0)');gr.addColorStop(Math.max(.02,len*.5),'rgba(120,110,255,1)');gr.addColorStop(Math.min(.98,len),'rgba(60,230,255,1)');gr.addColorStop(Math.min(1,len+.001),'rgba(60,230,255,0)');gr.addColorStop(1,'rgba(60,230,255,0)');
    ctx.lineCap='round';for(const [lw,al] of [[40,.08],[26,.16],[14,1]]){ctx.globalAlpha=al;ctx.strokeStyle=gr;ctx.lineWidth=lw;ctx.beginPath();ctx.arc(cx,cy,R,a0,a1);ctx.stroke()}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='lighter';const hx=cx+Math.cos(a1)*R,hy=cy+Math.sin(a1)*R;ctx.drawImage(spr([90,230,255],64),hx-46,hy-46,92,92);ctx.globalCompositeOperation='source-over';
    /* counter-rotating inner arcs */
    for(const [rr,k,len2,col] of [[104,-6,.22,'rgba(255,90,200,.95)'],[78,15,.12,'rgba(150,120,255,.9)']]){const aa=TAU*k*p;ctx.lineWidth=6;ctx.strokeStyle=col;ctx.shadowColor=col;ctx.shadowBlur=14*S;ctx.beginPath();ctx.arc(cx,cy,rr,aa,aa+len2*TAU);ctx.stroke();ctx.beginPath();ctx.arc(cx,cy,rr,aa+Math.PI,aa+Math.PI+len2*TAU*.6);ctx.stroke()}
    ctx.shadowBlur=0;
    /* core pulse */
    const pu=.5+.5*Math.sin(TAU*5*p);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.5+.4*pu;const cs=36+14*pu;ctx.drawImage(spr([120,200,255],64),cx-cs,cy-cs,cs*2,cs*2);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(cx,cy,9+3*pu,0,TAU);ctx.fill();
    const dots='.'.repeat(Math.floor(p*32)%4);txt('LOADING',cx-14,cy+R+150,{f:'Montserrat',w:700,size:44,ls:16,fill:'rgba(215,225,255,.92)',glow:[['rgba(110,150,255,.7)',20]]});
    txt(dots,cx+tw('LOADING','Montserrat',700,44,16)/2+8,cy+R+150,{f:'Montserrat',w:700,size:44,ls:10,al:'left',fill:'rgba(215,225,255,.92)'})};
};
/* 10 LIGHT LEAKS FILM BURN OVERLAY  (black, screen blend, seamless loop) */
C[10]=()=>{newTL();
  const leaks=[{x:.05,y:.08,sx:1.5,sy:.9,r:620,c:[255,120,20],ax:.1,ay:.12,k:1,ph:0,ik:2,ip:0},{x:.95,y:.9,sx:1.4,sy:1,r:680,c:[255,50,60],ax:.08,ay:.1,k:1,ph:.3,ik:2,ip:.35},{x:.5,y:-.08,sx:2.4,sy:.55,r:520,c:[255,190,70],ax:.3,ay:.04,k:1,ph:.6,ik:3,ip:.1},
    {x:.98,y:.12,sx:.7,sy:1.6,r:520,c:[240,60,150],ax:.04,ay:.2,k:2,ph:.1,ik:2,ip:.7},{x:.1,y:.95,sx:1.8,sy:.7,r:560,c:[255,160,40],ax:.2,ay:.05,k:2,ph:.5,ik:3,ip:.5},{x:.55,y:1.05,sx:2.2,sy:.5,r:480,c:[255,90,40],ax:.25,ay:.03,k:1,ph:.2,ik:2,ip:.15}];
  const R=rng(100);
  draw=()=>{clear();const p=P(),fl=.88+.12*Math.sin(TAU*23*p)*Math.sin(TAU*7*p);ctx.globalCompositeOperation='lighter';
    for(const l of leaks){const x=(l.x+l.ax*Math.sin(TAU*(l.k*p+l.ph)))*W,y=(l.y+l.ay*Math.cos(TAU*(l.k*p+l.ph)))*H,inten=Math.pow(.5+.5*Math.sin(TAU*(l.ik*p+l.ip)),1.4);
      ctx.save();ctx.translate(x,y);ctx.rotate(.4*Math.sin(TAU*(p+l.ph)));ctx.scale(l.sx,l.sy);ctx.globalAlpha=(.25+.75*inten)*fl;ctx.drawImage(spr(l.c,256),-l.r,-l.r,l.r*2,l.r*2);ctx.globalAlpha=(.2+.5*inten)*fl;ctx.drawImage(spr(l.c,256),-l.r*.45,-l.r*.45,l.r*.9,l.r*.9);ctx.restore()}
    /* diagonal sweeping light streaks */
    for(const [k,ph,w,col] of [[2,0,160,[255,190,120]],[3,.4,70,[255,110,150]],[1,.7,260,[255,150,60]]]){const u=wrap(k*p+ph,1),cxp=lerp(-W*.3,W*1.3,u);ctx.save();ctx.translate(cxp,H/2);ctx.rotate(.38);const g=ctx.createLinearGradient(-w,0,w,0);g.addColorStop(0,rgba(col,0));g.addColorStop(.5,rgba(col,.55));g.addColorStop(1,rgba(col,0));ctx.globalAlpha=.5*fl*Math.sin(Math.PI*u);ctx.fillStyle=g;ctx.fillRect(-w,-H*1.4,w*2,H*2.8);ctx.restore()}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
/* 11 HEAVY RAIN OVERLAY WITH GROUND SPLASHES  (alpha, seamless loop) */
C[11]=()=>{newTL();const R=rng(111),HH=H+420,wind=-.2;
  const mkL=(n,cyc,len,lw,al)=>Array.from({length:n},()=>({x:R()*(W+600),y:R()*HH,len:len*(.7+R()*.6),lw:lw*(.8+R()*.5),a:al*(.6+R()*.5),cyc:cyc}));
  const layers=[mkL(520,18,70,1.1,.22),mkL(320,26,130,1.8,.34),mkL(120,38,230,3,.5)];
  const mist=mkNoise(512,256,112,{oct:6,base:3,gain:.55,cut:[.45,.7],pw:1,col:[196,210,230]});
  const sp=Array.from({length:110},()=>({x:R()*W,y:H*.8+R()*H*.2,k:12+(R()*14|0),ph:R(),r:10+R()*26,a:.35+R()*.4}));
  draw=()=>{clear();const p=P();
    const main=ctx,L=layer();ctx=L;tileScroll(mist,3000,p*3000,H-560,.55);L.globalCompositeOperation='destination-in';const m=L.createLinearGradient(0,H*.55,0,H);m.addColorStop(0,'rgba(0,0,0,0)');m.addColorStop(1,'rgba(0,0,0,.75)');L.fillStyle=m;L.fillRect(0,0,W,H);ctx=main;ctx.drawImage(_lay,0,0,W,H);
    ctx.lineCap='round';
    layers.forEach((ly,li)=>{ctx.strokeStyle='rgb(206,224,255)';for(const d of ly){const y=wrap(d.y+p*d.cyc*HH,HH)-210,x=wrap(d.x+wind*y-300,W+600)-300;ctx.globalAlpha=d.a;ctx.lineWidth=d.lw;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+wind*d.len,y+d.len);ctx.stroke()}
      if(li===2){ctx.globalAlpha=1}});
    ctx.strokeStyle='rgba(215,232,255,1)';ctx.lineWidth=2;
    for(const s of sp){const q=wrap(s.k*p+s.ph,1),a=(1-q)*s.a;ctx.globalAlpha=a;ctx.beginPath();ctx.ellipse(s.x,s.y,s.r*q+3,(s.r*q+3)*.28,0,0,TAU);ctx.stroke();
      if(q<.5){ctx.globalAlpha=a*1.2;ctx.lineWidth=2.2;for(let j=-2;j<=2;j++){const t=q*2,x=s.x+j*s.r*.35*t,y=s.y-Math.sin(Math.PI*t)*s.r*.9*(1-Math.abs(j)*.18);ctx.beginPath();ctx.arc(x,y,2.2,0,TAU);ctx.fillStyle='rgba(225,238,255,1)';ctx.fill()}ctx.lineWidth=2}}
    ctx.globalAlpha=1};
};
/* 12 UNDERWATER AIR BUBBLES RISING  (alpha, seamless loop) */
C[12]=()=>{newTL();const R=rng(122),SZ=Math.round(256*Math.max(1,S)),HH=H+360;
  const bub=(()=>{const k=mk(SZ,SZ),x=k.getContext('2d'),c=SZ/2,r=c*.94;
    let g=x.createRadialGradient(c,c,r*.55,c,c,r);g.addColorStop(0,'rgba(190,235,255,0.03)');g.addColorStop(.8,'rgba(170,225,255,0.12)');g.addColorStop(.93,'rgba(210,240,255,.55)');g.addColorStop(1,'rgba(220,245,255,.85)');x.fillStyle=g;x.beginPath();x.arc(c,c,r,0,TAU);x.fill();
    g=x.createLinearGradient(0,0,SZ,SZ);g.addColorStop(0,'rgba(255,120,200,.25)');g.addColorStop(.5,'rgba(120,255,230,0)');g.addColorStop(1,'rgba(120,160,255,.3)');x.strokeStyle=g;x.lineWidth=SZ*.035;x.beginPath();x.arc(c,c,r*.9,0,TAU);x.stroke();
    x.fillStyle='rgba(255,255,255,.92)';x.beginPath();x.ellipse(c*.62,c*.5,c*.2,c*.1,-.65,0,TAU);x.fill();x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.ellipse(c*1.4,c*1.5,c*.1,c*.05,-.65,0,TAU);x.fill();
    const hg=x.createRadialGradient(c*1.15,c*1.45,0,c*1.15,c*1.45,c*.7);hg.addColorStop(0,'rgba(200,240,255,.22)');hg.addColorStop(1,'rgba(200,240,255,0)');x.fillStyle=hg;x.fillRect(0,0,SZ,SZ);return k})();
  const B=[];for(let i=0;i<64;i++){const z=Math.pow(R(),1.8);B.push({x:R()*W,y:R()*HH,r:12+z*92,cyc:z>.55?3:z>.25?2:1,sw:12+R()*50,k:1+(R()*3|0),ph:R(),a:.5+z*.5,wb:2+(R()*4|0),wp:R()})}
  for(const sx of [.14,.38,.66,.88]){for(let i=0;i<14;i++){const f=i/14;B.push({x:sx*W,y:f*HH,r:10+f*34,cyc:1,sw:6+f*60,k:2,ph:sx*3,a:.55+.4*f,wb:3,wp:f,stream:true})}}
  B.sort((a,b)=>a.r-b.r);
  draw=()=>{clear();const p=P();for(const b of B){const f=wrap(b.y+p*b.cyc*HH,HH),y=H+180-f,x=b.x+b.sw*Math.sin(TAU*(b.k*p+b.ph+f/HH*1.5)),wob=Math.sin(TAU*(b.wb*p+b.wp)),w=b.r*(1+.07*wob),h=b.r*(1-.07*wob);ctx.globalAlpha=b.a*Math.min(1,f/150)*Math.min(1,(HH-f)/150);ctx.drawImage(bub,x-w,y-h,w*2,h*2)}
    ctx.globalAlpha=1};
};
