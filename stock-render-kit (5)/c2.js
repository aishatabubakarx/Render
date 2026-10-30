/* 3 STOCK MARKET CANDLESTICK CHART (loop) - navy #060e22, up #1FE5A0, down #FF4B6E, MA cyan #5CC8FF + gold #FFC857 */
C[3]=()=>{newTL();const R=rng(303),P=56,sp=W/P;
  const cum=[0];for(let i=1;i<=P;i++)cum.push(cum[i-1]+(R()-.5)*.55+(i%14<7?.05:-.05));
  const v=[];let mn=1e9,mx=-1e9;for(let i=0;i<P;i++){const b=cum[i]-cum[P]*i/P;v.push(b);mn=Math.min(mn,b);mx=Math.max(mx,b)}
  for(let i=0;i<P;i++)v[i]=(v[i]-mn)/(mx-mn)*2-1;
  const cd=v.map((c,i)=>{const o=v[(i+P-1)%P];return{o,c,h:Math.max(o,c)+R()*.09,l:Math.min(o,c)-R()*.09,vol:.25+Math.abs(c-o)*2.2+R()*.35}});
  const ma=n=>v.map((_,i)=>{let s=0;for(let k=0;k<n;k++)s+=v[(i-k+P*4)%P];return s/n}),m7=ma(5),m21=ma(14);
  const Y=x=>560-x*255,GREEN='#1FE5A0',RED='#FF4B6E',px=1480;
  const back=x=>Math.sin(TAU*x/W)*.5+Math.sin(TAU*2*x/W+1.2)*.3+Math.sin(TAU*3*x/W+2.4)*.15;
  draw=()=>{clear();const ms=now(),th=LOOP(ms),u=ms/DUR,off=u*P*sp;bgRad('#0a1632','#02050f');
    ctx.globalCompositeOperation='lighter';
    ctx.beginPath();for(let x=-10;x<=W+10;x+=16){const y=470-back(x+u*W)*190;x<0?ctx.moveTo(x,y):ctx.lineTo(x,y)}ctx.lineTo(W+10,H);ctx.lineTo(-10,H);ctx.closePath();
    {const g=ctx.createLinearGradient(0,280,0,H);g.addColorStop(0,'rgba(40,110,255,.16)');g.addColorStop(1,'rgba(40,110,255,0)');ctx.fillStyle=g;ctx.fill()}
    ctx.globalCompositeOperation='source-over';ctx.lineWidth=1;
    for(let i=0;i<8;i++){const y=190+i*88;ctx.strokeStyle='rgba(120,160,255,.10)';ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W-170,y);ctx.stroke();txt((48800-i*420).toLocaleString('en-US')+'.00',W-150,y,{f:'JetBrains Mono',w:700,size:19,al:'left',fill:'rgba(160,190,255,.42)'})}
    for(let k=-1;k<=P/4+1;k++){const x=k*sp*4-(off%(sp*4));ctx.strokeStyle='rgba(120,160,255,.07)';ctx.beginPath();ctx.moveTo(x,150);ctx.lineTo(x,990);ctx.stroke()}
    const X=(i,kk)=>i*sp+kk*P*sp-off+sp/2;
    ctx.globalCompositeOperation='lighter';
    for(let kk=-1;kk<=1;kk++)for(let i=0;i<P;i++){const x=X(i,kk);if(x<-40||x>W-150)continue;const c=cd[i],up=c.c>=c.o,col=up?[31,229,160]:[255,75,110],yt=Y(Math.max(c.o,c.c)),yb=Y(Math.min(c.o,c.c)),hh=Math.max(4,yb-yt),edge=sm(0,120,x)*sm(0,160,W-150-x);
      ctx.globalAlpha=.20*edge;ctx.drawImage(spr(col,64),x-48,(yt+yb)/2-hh/2-34,96,hh+68);
      ctx.globalCompositeOperation='source-over';ctx.globalAlpha=.95*edge;ctx.fillStyle=up?GREEN:RED;ctx.fillRect(x-1.2,Y(c.h),2.4,Y(c.l)-Y(c.h));ctx.fillRect(x-9,yt,18,hh);
      ctx.globalAlpha=.35*edge;ctx.fillStyle='#fff';ctx.fillRect(x-9,yt,18,2);
      ctx.globalAlpha=.32*edge;ctx.fillStyle=up?GREEN:RED;ctx.fillRect(x-9,990-c.vol*118,18,c.vol*118);ctx.globalCompositeOperation='lighter'}
    for(const [arr,col,w] of [[m7,'#5CC8FF',2.4],[m21,'#FFC857',2.4]]){for(const [lw,al] of [[w*5,.10],[w,.85]]){ctx.lineWidth=lw;ctx.globalAlpha=al;ctx.strokeStyle=col;ctx.beginPath();let st=true;for(let kk=-1;kk<=1;kk++)for(let i=0;i<P;i++){const x=X(i,kk);if(x<-40||x>W-150)continue;const y=Y(arr[i]);st?ctx.moveTo(x,y):ctx.lineTo(x,y);st=false}ctx.stroke()}}
    const fi=((px+off-sp/2)/sp),i0=Math.floor(fi),f=fi-i0,a=cd[((i0%P)+P)%P],b=cd[(((i0+1)%P)+P)%P],val=lerp(a.c,b.c,f),yv=Y(val);
    ctx.globalAlpha=.9;ctx.strokeStyle='rgba(92,200,255,.55)';ctx.lineWidth=1.4;ctx.setLineDash([8,8]);ctx.beginPath();ctx.moveTo(0,yv);ctx.lineTo(W-170,yv);ctx.moveTo(px,150);ctx.lineTo(px,990);ctx.stroke();ctx.setLineDash([]);
    ctx.globalAlpha=.9;ctx.drawImage(spr([92,200,255],64),px-26,yv-26,52,52);ctx.fillStyle='#fff';ctx.fillRect(px-3,yv-3,6,6);
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.fillStyle='#5CC8FF';roundRect(W-170,yv-17,128,34,6);ctx.fill();txt((46500+val*2400).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,','),W-106,yv,{f:'JetBrains Mono',w:700,size:21,fill:'#02101f'});
    txt('MARKET OVERVIEW',90,92,{f:'Montserrat',w:800,size:30,al:'left',ls:6,fill:'rgba(255,255,255,.86)'});txt('4H  CANDLES  MA5  MA14  VOL',90,132,{f:'JetBrains Mono',w:700,size:19,al:'left',ls:3,fill:'rgba(160,190,255,.55)'});
    const o=46500+a.o*2400,cl=46500+a.c*2400;txt('O '+o.toFixed(1)+'   H '+(46500+a.h*2400).toFixed(1)+'   L '+(46500+a.l*2400).toFixed(1)+'   C '+cl.toFixed(1),W-190,92,{f:'JetBrains Mono',w:700,size:20,al:'right',fill:a.c>=a.o?GREEN:RED});
    ctx.globalAlpha=1;bloom(.5,[2,4]);vignette(.5);grain(.03)}};

/* 4 GOLD FRAME + GLITTER GATHERING AT CORNERS - black, gold #F4C85A / #C88A1C / #FFF3D1 */
C[4]=()=>{const D=DUR/1000,R=rng(404),g={o:0,i:0,orn:0,fade:1,bg:0};newTL();
  A(g,{bg:0},{bg:1},0,1.6,'power2.out');A(g,{o:0},{o:1},.6,3.4,'power3.inOut');A(g,{i:0},{i:1},1.5,3.4,'power3.inOut');A(g,{orn:0},{orn:1},3.6,2,'expo.out');A(g,{fade:1},{fade:0},D-1,1,'power1.in');
  const x0=110,y0=90,x1=W-110,y1=H-90,ins=26,cs=[[x0,y0],[x1,y0],[x1,y1],[x0,y1]],N=17000,P=[];
  const gs=()=>{let u=0;for(let i=0;i<4;i++)u+=R();return(u-2)*1.7};
  for(let i=0;i<N;i++){const c=(R()*4)|0,tier=R(),sg=tier<.2?8:tier<.62?26:tier<.92?62:120,sx=c%3===0?1:-1,sy=c<2?1:-1;
    let dx=Math.abs(gs())*sg*sx*(R()<.5?1:.5),dy=Math.abs(gs())*sg*sy*(R()<.5?1:.5);P.push({c,tx:cs[c][0]+dx,ty:cs[c][1]+dy,sx:60+R()*(W-120),sy:60+R()*(H-120),t0:.4+Math.pow(R(),1.3)*8.5,du:1.6+R()*2.4,ph:R()*TAU,k:2+R()*5,r:2+R()*9,s:R()<.93?1.2+R()*1.6:2.6+R()*2.4,sw:(R()-.5)*260})}
  const amb=Array.from({length:380},()=>({x:R()*W,y:R()*H,s:.8+R()*1.6,ph:R()*TAU,k:1+R()*3,vy:4+R()*10}));
  const per=2*((x1-x0)+(y1-y0));
  const perim=p=>{p=fr(p)*per;const w=x1-x0,h=y1-y0;if(p<w)return[x0+p,y0];p-=w;if(p<h)return[x1,y0+p];p-=h;if(p<w)return[x1-p,y1];p-=w;return[x0,y1-p]};
  const rectPath=(a,b,c,d,p)=>{const mx=(a+c)/2;ctx.beginPath();ctx.moveTo(mx,b);ctx.lineTo(c,b);ctx.lineTo(c,d);ctx.lineTo(mx,d);ctx.moveTo(mx,b);ctx.lineTo(a,b);ctx.lineTo(a,d);ctx.lineTo(mx,d);const len=((c-a)/2+(d-b)+(c-a)/2)*p;ctx.setLineDash([len,1e5]);ctx.stroke();ctx.setLineDash([])};
  draw=()=>{clear();const ms=now(),t=ms/1000;ctx.globalAlpha=1;bgRad(rgba([40,24,6],.0)&&'#120c05','#000',W/2,H/2,H*1.2);ctx.globalAlpha=g.bg;haze([120,80,20],.03,ms);ctx.globalAlpha=g.fade;
    const gg=ctx.createLinearGradient(x0,y0,x1,y1);[[0,'#8a5a12'],[.2,'#f6d77a'],[.38,'#fff4cf'],[.55,'#c88a1c'],[.78,'#f2c14e'],[1,'#8a5a12']].forEach(([o,c])=>gg.addColorStop(o,c));
    ctx.save();ctx.lineCap='butt';ctx.strokeStyle=gg;ctx.lineWidth=6;rectPath(x0,y0,x1,y1,g.o);ctx.lineWidth=2;rectPath(x0+ins,y0+ins,x1-ins,y1-ins,g.i);
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=g.fade*.18;ctx.lineWidth=16;rectPath(x0,y0,x1,y1,g.o);ctx.restore();
    ctx.globalCompositeOperation='lighter';
    for(const [cx,cy] of cs){ctx.globalAlpha=g.fade*g.orn*(.45+.15*Math.sin(t*2+cx));ctx.drawImage(spr([244,190,70],128),cx-150,cy-150,300,300)}
    for(const p of P){const e=clamp((t-p.t0)/p.du,0,1),k=ez('expo.out',e),sw=Math.sin(e*Math.PI)*p.sw;let x=lerp(p.sx,p.tx,k)+sw*.3,y=lerp(p.sy,p.ty,k)+sw*.2;
      if(e>=1){x+=Math.cos(t*.6+p.ph)*p.r*.5;y+=Math.sin(t*.7+p.ph)*p.r*.5}
      const tw=(.5+.5*Math.sin(t*p.k+p.ph))**2,al=(e<1?.25+.5*e:.5+.5*tw)*g.fade*clamp((t-p.t0+.4)/.5,0,1);if(al<.03)continue;ctx.globalAlpha=al;ctx.fillStyle=p.s>2.4?'#fff3cf':'#f6c453';ctx.fillRect(x-p.s/2,y-p.s/2,p.s,p.s)}
    for(const a of amb){const y=(a.y-t*a.vy+H*4)%H,tw=(.5+.5*Math.sin(t*a.k+a.ph))**3;ctx.globalAlpha=g.fade*g.bg*.45*tw;ctx.fillStyle='#f2c14e';ctx.fillRect(a.x,y,a.s,a.s)}
    if(t>3.2){for(let j=0;j<12;j++){const q=perim((t-3.2)/6.5-j*.003);ctx.globalAlpha=g.fade*(1-j/12)**1.6*.8;ctx.drawImage(spr([255,214,120],64),q[0]-34,q[1]-34,68,68)}}
    for(const [i,[cx,cy]] of cs.entries()){const s=46*g.orn*(.8+.2*Math.sin(t*2.4+i*1.7));star4(cx,cy,s,g.fade*g.orn*.8,'#ffd978');star4(cx,cy,s*.5,g.fade*g.orn*.9,'#fff6dc');star4(cx,cy,s*.8,g.fade*g.orn*.35,'#ffb938')}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';const zs=1+.025*t/D;bloom(.85,[2,4]);vignette(.5);grain(.03)}};
