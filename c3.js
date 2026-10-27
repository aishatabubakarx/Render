/* 15 FIREWORKS FINALE OVER A SKYLINE */
C[15]=()=>{const R=rng(150),bs=[],cols=[[255,90,90],[255,200,70],[90,200,255],[255,255,255],[170,110,255],[90,255,170],[255,130,210]],ty=['peony','willow','ring','palm','crackle','peony','heart','willow','ring','peony'],sk=[],win=[];newTL();
  [400,1200,2100,3000,3900,4800,5700,6500,7300,8000,8400,8700,9000].forEach((t,i)=>bs.push(mkBurst(R,t+500,250+R()*1420,140+R()*380,cols[(R()*7)|0],ty[i%10],1.1+R()*.45)));
  let x=0;while(x<W){const w=60+R()*90,h=70+R()*170;sk.push([x,h,w]);for(let wy=H-h+14;wy<H-10;wy+=26)for(let wx=x+10;wx<x+w-14;wx+=22)if(R()<.28)win.push([wx,wy,R()]);x+=w+R()*20}
  draw=()=>{clear();const ms=now();drawBursts(bs,ms,false);
    ctx.globalCompositeOperation='lighter';const gl=bs.reduce((a,b)=>{const dt=(ms-b.t0)/1000;return dt>0&&dt<1.2?Math.max(a,(1-dt/1.2)*.18):a},0);ctx.globalAlpha=gl;const g=ctx.createLinearGradient(0,H-260,0,H);g.addColorStop(0,'rgba(255,200,150,0)');g.addColorStop(1,'rgba(255,200,150,1)');ctx.fillStyle=g;ctx.fillRect(0,H-260,W,260);
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.fillStyle='#06070c';for(const [sx,h,w] of sk)ctx.fillRect(sx,H-h,w,h);
    for(const [wx,wy,r] of win){ctx.fillStyle=r<.5?'rgba(255,200,110,.75)':'rgba(255,200,110,.28)';ctx.fillRect(wx,wy,8,12)}};
};
/* 16 AI NEURAL NETWORK */
C[16]=()=>{const R=rng(160),cnt=[5,8,9,8,3],lay=[],edges=[],waves=[300,2300,4300,6300,8000],gap=380;newTL();
  cnt.forEach((n,l)=>{const a=[];for(let i=0;i<n;i++)a.push({x:W/2+(l-2)*gap+(R()-.5)*50,y:H/2+(i-(n-1)/2)*(n>6?92:130)+(R()-.5)*30,act:0,l});lay.push(a)});
  for(let l=0;l<4;l++)for(const a of lay[l])for(const b of lay[l+1])edges.push([a,b,l]);
  waves.forEach(w=>lay.forEach((a,l)=>tl.add(a,{act:[{to:1,duration:180,ease:'outQuad'},{to:0,duration:900,ease:'inQuad'}],delay:stagger(35)},w+l*380)));
  const dust=Array.from({length:90},()=>({x:R()*W,y:R()*H,r:1+R()*2.5,ph:R()}));
  draw=()=>{clear();const ms=now(),ox=14*Math.sin(TAU*ms/10000),oy=10*Math.cos(TAU*ms/10000);ctx.save();ctx.translate(ox,oy);ctx.globalCompositeOperation='lighter';
    for(const d of dust){ctx.globalAlpha=.25+.25*Math.sin(TAU*(2*ms/10000+d.ph));ctx.fillStyle='#5aa8ff';ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,TAU);ctx.fill()}
    ctx.lineWidth=1.2;for(const [a,b] of edges){ctx.strokeStyle='rgba(90,170,255,.2)';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}
    for(const [a,b,l] of edges)for(const w of waves){const p=(ms-(w+l*380+100))/420;if(p<0||p>1)continue;const x=lerp(a.x,b.x,p),y=lerp(a.y,b.y,p),c=l>=3?[255,90,220]:[70,210,255];ctx.globalAlpha=Math.sin(Math.PI*p)*.9;ctx.drawImage(spr(c,64),x-18,y-18,36,36)}
    lay.forEach((a,l)=>{for(const n of a){const c=l===4?[255,90,220]:[70,210,255],r=14+n.act*12;ctx.globalAlpha=.35+.65*n.act;ctx.drawImage(spr(c,128),n.x-r*3.2,n.y-r*3.2,r*6.4,r*6.4);ctx.globalAlpha=1;ctx.strokeStyle=rgba(mixc(c,[255,255,255],n.act*.6),1);ctx.lineWidth=3;ctx.fillStyle='#04060c';ctx.beginPath();ctx.arc(n.x,n.y,r,0,TAU);ctx.fill();ctx.stroke();if(l===4&&n.act>.05){ctx.globalAlpha=n.act*.7;ctx.beginPath();ctx.arc(n.x,n.y,r+(1-n.act)*50,0,TAU);ctx.stroke()}}});ctx.restore()};
};
/* 17 CRYPTO CANDLESTICK BREAKOUT */
C[17]=()=>{const R=rng(170),N=46,cd=[],pr={p:0},fin={a:0,s:0},up=[22,242,160],dn=[255,77,109];newTL();let p=100;
  for(let i=0;i<N;i++){const o=p,c=o*(1+(R()-.42)*.075+.007+(i>N-8?.02:0)),h=Math.max(o,c)*(1+R()*.018),l=Math.min(o,c)*(1-R()*.018);cd.push({o,c,h,l,v:.3+R()*.7});p=c}
  const mn=Math.min(...cd.map(d=>d.l))*.97,mx=Math.max(...cd.map(d=>d.h))*1.04,X0=200,X1=1640,Y0=860,Y1=210,yy=v=>lerp(Y0,Y1,(v-mn)/(mx-mn)),xx=i=>X0+(i+.5)/N*(X1-X0);
  tl.add(pr,{p:[0,N],duration:7000,ease:'inOutSine'},400);tl.add(fin,{a:[0,1],duration:500},7600);tl.add(fin,{s:[0,1],duration:900,ease:'outElastic(1,.5)'},7600);
  const sma=[];for(let i=0;i<N;i++){const s=cd.slice(Math.max(0,i-7),i+1);sma.push(s.reduce((a,d)=>a+d.c,0)/s.length)}
  draw=()=>{clear();const ms=now(),P=pr.p;ctx.lineWidth=1;for(let i=0;i<=6;i++){const y=lerp(Y0,Y1,i/6);ctx.strokeStyle='rgba(255,255,255,.07)';ctx.setLineDash([6,10]);ctx.beginPath();ctx.moveTo(X0-40,y);ctx.lineTo(X1+60,y);ctx.stroke()}ctx.setLineDash([]);
    const bw=(X1-X0)/N*.56;for(let i=0;i<N;i++){const f=clamp(P-i,0,1);if(f<=0)continue;const d=cd[i],cc=d.c>=d.o?up:dn,o=d.o,c=lerp(d.o,d.c,f),h=lerp(Math.max(o,c),d.h,f),l=lerp(Math.min(o,c),d.l,f);
      ctx.globalAlpha=Math.min(1,f*1.5);ctx.shadowColor=rgba(cc,.9);ctx.shadowBlur=14*S;ctx.strokeStyle=rgba(cc,1);ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(xx(i),yy(h));ctx.lineTo(xx(i),yy(l));ctx.stroke();ctx.fillStyle=rgba(cc,1);const t=Math.min(yy(o),yy(c)),bh=Math.max(4,Math.abs(yy(o)-yy(c)));ctx.fillRect(xx(i)-bw/2,t,bw,bh);ctx.shadowBlur=0;
      ctx.fillStyle=rgba(cc,.35);const vh=d.v*90*f;ctx.fillRect(xx(i)-bw/2,Y0+70-vh,bw,vh)}ctx.globalAlpha=1;
    ctx.strokeStyle='rgba(255,210,90,.95)';ctx.lineWidth=4;ctx.shadowColor='rgba(255,200,80,.9)';ctx.shadowBlur=16*S;ctx.beginPath();let st=false;for(let i=0;i<N;i++){if(P<i+.2)break;const x=xx(i),y=yy(sma[i]);st?ctx.lineTo(x,y):ctx.moveTo(x,y);st=true}ctx.stroke();ctx.shadowBlur=0;
    const cur=Math.min(N-1,Math.floor(P)),cv2=cd[cur].c,pct=(cv2/100-1)*100;ctx.globalAlpha=1;txt((pct>=0?'+':'')+pct.toFixed(0)+'%',230,130,{al:'left',size:78,w:800,f:'Montserrat',fill:pct>=0?'#16f2a0':'#ff4d6d',glow:[[pct>=0?'rgba(22,242,160,.7)':'rgba(255,77,109,.7)',30]]});
    if(fin.a>0){ctx.globalAlpha=fin.a;ctx.save();ctx.translate(xx(N-1),yy(cd[N-1].h)-60);ctx.scale(fin.s,fin.s);ctx.fillStyle='#16f2a0';ctx.shadowColor='rgba(22,242,160,1)';ctx.shadowBlur=36*S;ctx.beginPath();ctx.moveTo(0,-54);ctx.lineTo(48,6);ctx.lineTo(18,6);ctx.lineTo(18,56);ctx.lineTo(-18,56);ctx.lineTo(-18,6);ctx.lineTo(-48,6);ctx.closePath();ctx.fill();ctx.restore();
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=fin.a*(.5+.3*Math.sin(ms/160));ctx.drawImage(spr(up,256),xx(N-1)-260,yy(cd[N-1].h)-320,520,520);ctx.globalCompositeOperation='source-over'}ctx.globalAlpha=1};
};
/* 18 SCI-FI HUD */
C[18]=()=>{const R=rng(180),rg=[0,1,2,3,4].map(i=>({s:0,i})),bl=[],ui={a:0,br:0},bars=Array.from({length:7},()=>({ph:R(),c:2+((R()*6)|0)}));newTL();
  tl.add(rg,{s:[0,1],duration:1400,ease:'outBack',delay:stagger(180)},200);tl.add(ui,{a:[0,1],duration:900},1500);tl.add(ui,{br:[0,1],duration:900,ease:'outCubic'},300);
  for(let i=0;i<14;i++)bl.push({a:R()*TAU,r:90+R()*230,ph:R()});
  const cy=H/2,cx=W/2,cyan=[40,220,255],org=[255,160,60];
  const arc=(r,a0,a1,lw,col,al,gl)=>{ctx.beginPath();ctx.arc(cx,cy,Math.max(.5,r),a0,a1);ctx.strokeStyle=rgba(col,al);ctx.lineWidth=lw;if(gl){ctx.shadowColor=rgba(col,.9);ctx.shadowBlur=gl*S}ctx.stroke();ctx.shadowBlur=0};
  draw=()=>{clear();const ms=now(),u=ms/10000;ctx.lineCap='butt';
    const rad=[120,190,260,330,400];rg.forEach((q,i)=>{if(q.s<=0)return;const r=rad[i]*q.s,dir=i%2?-1:1,rot=dir*TAU*(i+1)*u*(i%2?1:1);ctx.globalAlpha=Math.min(1,q.s);
      if(i===0){arc(r,rot,rot+TAU*.7,10,cyan,.9,16);arc(r+16,0,TAU,2,cyan,.5)}
      if(i===1){ctx.setLineDash([4,12]);arc(r,rot,rot+TAU,6,cyan,.7);ctx.setLineDash([])}
      if(i===2){arc(r,rot,rot+1.6,14,org,.95,18);arc(r,rot+Math.PI,rot+Math.PI+1.0,14,org,.95,18);arc(r-20,0,TAU,2,cyan,.35)}
      if(i===3){for(let k=0;k<120;k++){const a=k/120*TAU+rot*.5;ctx.strokeStyle=rgba(cyan,k%5?.35:.9);ctx.lineWidth=k%5?2:3;ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);ctx.lineTo(cx+Math.cos(a)*(r+(k%5?10:22)),cy+Math.sin(a)*(r+(k%5?10:22)));ctx.stroke()}}
      if(i===4){arc(r,rot,rot+.9,5,cyan,.9,12);arc(r,rot+2.1,rot+3.0,5,cyan,.9,12);arc(r,rot+4.2,rot+5.1,5,cyan,.9,12)}});
    ctx.globalAlpha=1;const sw=TAU*2*u;const g=ctx.createConicGradient(sw-1.2,cx,cy);g.addColorStop(0,'rgba(40,220,255,0)');g.addColorStop(.19,'rgba(40,220,255,.4)');g.addColorStop(.2,'rgba(40,220,255,0)');g.addColorStop(1,'rgba(40,220,255,0)');ctx.fillStyle=g;ctx.globalAlpha=ui.a;ctx.beginPath();ctx.arc(cx,cy,330,0,TAU);ctx.fill();
    ctx.strokeStyle=rgba(cyan,.9*ui.a);ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(sw)*330,cy+Math.sin(sw)*330);ctx.stroke();
    for(const b of bl){const d=fr((sw-b.a)/TAU),al=Math.max(0,1-d*1.6)*ui.a;if(al<.02)continue;ctx.globalAlpha=al;ctx.globalCompositeOperation='lighter';ctx.drawImage(spr(org,64),cx+Math.cos(b.a)*b.r-18,cy+Math.sin(b.a)*b.r-18,36,36);ctx.globalCompositeOperation='source-over'}
    ctx.globalAlpha=ui.a;for(const [sx,sy] of [[0,0],[1,0],[0,1],[1,1]]){const x=sx?W-90-ui.br*0:90,y=sy?H-90:90,dx=sx?-1:1,dy=sy?-1:1,L=90*ui.br;ctx.strokeStyle=rgba(cyan,.95);ctx.lineWidth=4;ctx.shadowColor=rgba(cyan,.8);ctx.shadowBlur=14*S;ctx.beginPath();ctx.moveTo(x,y+dy*L);ctx.lineTo(x,y);ctx.lineTo(x+dx*L,y);ctx.stroke();ctx.shadowBlur=0}
    bars.forEach((b,i)=>{const v=.25+.7*Math.abs(Math.sin(TAU*(b.c*u+b.ph))),y=300+i*70;ctx.fillStyle='rgba(255,255,255,.1)';ctx.fillRect(150,y,320,14);ctx.fillStyle=rgba(i%3===2?org:cyan,.95);ctx.shadowColor=rgba(cyan,.7);ctx.shadowBlur=10*S;ctx.fillRect(150,y,320*v,14);ctx.shadowBlur=0;txt(String(Math.round(v*99)).padStart(2,'0'),500,y+7,{al:'left',f:'Orbitron',size:20,fill:'rgba(150,230,255,.9)'})});
    ctx.strokeStyle=rgba(cyan,.9);ctx.lineWidth=3;ctx.shadowColor=rgba(cyan,.8);ctx.shadowBlur=12*S;ctx.beginPath();for(let i=0;i<=120;i++){const x=1450+i*3,y=H/2+Math.sin(i*.35+TAU*3*u)*50*Math.sin(i*.05+1)+Math.sin(i*.9-TAU*5*u)*14;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke();ctx.shadowBlur=0;
    txt('SYSTEM ONLINE',W/2,120,{f:'Orbitron',size:34,w:700,ls:14,fill:'rgba(190,240,255,.95)',glow:[['rgba(40,220,255,.8)',20]]});txt(Math.floor(u*10)%2?'SCANNING...':'TARGET LOCKED',W/2,H-120,{f:'Orbitron',size:26,w:700,ls:10,fill:rgba(org,1),glow:[['rgba(255,160,60,.8)',16]]});
    for(let i=0;i<10;i++){const hx=((Math.floor(ms/110)*2654435761+i*40503)>>>0).toString(16).toUpperCase().padStart(8,'0');txt('0x'+hx,150,820+i*18-0,{al:'left',f:'JetBrains Mono',size:15,w:700,fill:'rgba(120,210,255,.45)'});txt('0x'+hx.split('').reverse().join(''),W-150,820+i*18,{al:'right',f:'JetBrains Mono',size:15,w:700,fill:'rgba(120,210,255,.45)'})}ctx.globalAlpha=1};
};
/* 19 BINARY DATA RAIN (loop) */
C[19]=()=>{const R=rng(190),cols=[];newTL();for(let i=0;i<64;i++)cols.push({x:20+i*30,k:1+((R()*3)|0),ph:R(),len:14+((R()*16)|0),hot:R()<.1});
  const hs=(a)=>(Math.imul(a,2654435761)>>>0)%2;
  draw=()=>{clear();const ms=now(),u=ms/10000,rows=H/30;ctx.font='700 26px "JetBrains Mono"';ctx.textAlign='center';ctx.textBaseline='middle';const tick=Math.floor(ms/120);
    for(const c of cols){const head=fr(c.ph+u*c.k)*(rows+c.len+4)-c.len;for(let j=0;j<c.len;j++){const row=Math.floor(head)-j,y=row*30+15;if(y<-30||y>H+30)continue;const t=j/c.len,al=Math.pow(1-t,1.8),ch=hs(c.x*131+row*17+(j<2?tick:Math.floor(tick/(1+(row&3)))))?'1':'0';
        if(j===0){ctx.fillStyle='#eaffff';ctx.shadowColor=c.hot?'rgba(255,80,220,1)':'rgba(60,220,255,1)';ctx.shadowBlur=18*S}else{ctx.shadowBlur=0;ctx.fillStyle=c.hot?rgba([255,70,210],al):rgba([30,200,255],al*.85)}
        ctx.fillText(ch,c.x,y)}}ctx.shadowBlur=0};
};
/* 20 LOWER THIRDS PACK (blank) */
C[20]=()=>{const ps=[0,1,2,3].map(()=>({p:0,q:0}));newTL();ps.forEach((q,i)=>{const s=i*2500;tl.add(q,{p:[0,1],duration:700,ease:'outExpo'},s+100);tl.add(q,{q:[0,1],duration:800,ease:'outExpo'},s+280);tl.add(q,{p:[1,0],duration:450,ease:'inExpo'},s+1950);tl.add(q,{q:[1,0],duration:450,ease:'inExpo'},s+1900)});
  const x=140,y=H-300;
  draw=()=>{clear();const ms=now();
    {const {p,q}=ps[0];if(p>.001){const w=780*p,g=ctx.createLinearGradient(x,0,x+780,0);g.addColorStop(0,'#6a4dff');g.addColorStop(1,'#19d3ff');ctx.fillStyle=g;ctx.shadowColor='rgba(80,140,255,.6)';ctx.shadowBlur=26*S;ctx.fillRect(x,y,w,96);ctx.shadowBlur=0;ctx.fillStyle='#fff';ctx.fillRect(x,y-8,w*.6,4);ctx.fillStyle='#ff4fd8';ctx.fillRect(x-18,y,14*Math.min(1,p*2),96);ctx.fillStyle='rgba(255,255,255,.14)';ctx.fillRect(x,y+104,540*q,52);ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=2;ctx.strokeRect(x,y+104,540*q,52)}}
    {const {p,q}=ps[1];if(p>.001){ctx.save();ctx.translate(x-(1-p)*600,0);ctx.transform(1,0,-.32,1,0,0);ctx.fillStyle='#ff4fd8';ctx.shadowColor='rgba(255,79,216,.6)';ctx.shadowBlur=24*S;ctx.fillRect(x+30,y+14,700,92);ctx.fillStyle='#19d3ff';ctx.shadowColor='rgba(25,211,255,.6)';ctx.fillRect(x,y,700,92);ctx.shadowBlur=0;ctx.fillStyle='rgba(255,255,255,.9)';ctx.fillRect(x,y+104,420*q,10);ctx.restore()}}
    {const {p,q}=ps[2];if(p>.001){ctx.save();ctx.globalAlpha=p;ctx.translate(0,(1-p)*60);ctx.fillStyle='rgba(255,255,255,.1)';ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=2;roundRect(x,y,820,124,62);ctx.fill();ctx.stroke();
      const sx=x+((ms/10000*5)%1)*1100-150;ctx.save();roundRect(x,y,820,124,62);ctx.clip();const g=ctx.createLinearGradient(sx-60,0,sx+60,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.22)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(sx-60,y,120,124);ctx.restore();
      ctx.beginPath();ctx.arc(x+62,y+62,46,0,TAU);ctx.fillStyle='rgba(255,255,255,.12)';ctx.fill();ctx.setLineDash([40,24]);ctx.lineDashOffset=-ms/10000*TAU*46*3;ctx.strokeStyle='#ffd84a';ctx.lineWidth=4;ctx.stroke();ctx.setLineDash([]);ctx.restore()}}
    {const {p,q}=ps[3];if(p>.001){ctx.save();ctx.shadowColor='rgba(255,200,80,.9)';ctx.shadowBlur=20*S;ctx.strokeStyle='#ffc94a';ctx.lineWidth=5;const L=860*p;ctx.beginPath();ctx.moveTo(x,y+130);ctx.lineTo(x+L,y+130);ctx.stroke();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x+L,y+130,9,0,TAU);ctx.fill();ctx.beginPath();ctx.moveTo(x,y+130);ctx.lineTo(x,y+130-130*q);ctx.stroke();ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=2;ctx.strokeRect(x+24,y+130-96*q-8,Math.max(0,640*q),96*q);ctx.restore()}}};
};
