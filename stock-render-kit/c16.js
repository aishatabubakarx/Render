/* 16 DNA HELIX: glowing double helix with base pairs rotating in 3D, shallow depth of field */
C[16]=()=>{newTL();const R=rng(160),E={s:0};
  tl.to(E,{s:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const PAIR=[[[60,220,255],[255,80,190]],[[255,190,60],[80,255,170]],[[140,120,255],[255,120,90]]];
  const sph=(c,sz=64)=>{const k='sp'+c.join()+sz;if(_sc[k])return _sc[k];const q=document.createElement('canvas');q.width=q.height=sz;const x=q.getContext('2d'),h=sz/2,g=x.createRadialGradient(h*.68,h*.62,0,h,h,h);g.addColorStop(0,'#fff');g.addColorStop(.18,rgba(mixc(c,[255,255,255],.55),1));g.addColorStop(.55,rgba(c,1));g.addColorStop(1,rgba(mixc(c,[0,0,0],.7),1));x.fillStyle=g;x.beginPath();x.arc(h,h,h-1,0,TAU);x.fill();return _sc[k]=q};
  const L=mkLayer(),bgl=[];for(let i=0;i<30;i++)bgl.push({x:R()*W,y:R()*H,r:20+R()*90,m:1+(R()*2|0),p:R()*TAU,a:.04+R()*.1,A:30+R()*60,c:R()<.5?[60,160,255]:[120,90,255]});
  function helix(x,o){const p=ph(),N=o.N,gap=o.gap,Rd=o.R,persp=1100,items=[];
    for(let i=-N;i<=N;i++){const X=i*gap,th=i*o.tw+TAU*p*o.dir+o.ph,pr=PAIR[(i+N*3)%3];
      const ya=Math.cos(th)*Rd,za=Math.sin(th)*Rd,yb=-ya,zb=-za,sa=persp/(persp-za),sb=persp/(persp-zb);
      items.push({t:'r',z:0,xa:X*sa,ya:ya*sa,xb:X*sb,yb:yb*sb,sa,sb,pr});items.push({t:'s',z:za,x:X*sa,y:ya*sa,s:sa,c:pr[0]});items.push({t:'s',z:zb,x:X*sb,y:yb*sb,s:sb,c:pr[1]});
      if(i<N){const th2=th+o.tw,za2=Math.sin(th2)*Rd,ya2=Math.cos(th2)*Rd,s2=persp/(persp-za2),zb2=-za2,yb2=-ya2,sb2=persp/(persp-zb2);items.push({t:'b',z:(za+za2)/2,x0:X*sa,y0:ya*sa,x1:(X+gap)*s2,y1:ya2*s2,c:pr[0]});items.push({t:'b',z:(zb+zb2)/2,x0:X*sb,y0:yb*sb,x1:(X+gap)*sb2,y1:yb2*sb2,c:pr[1]})}}
    items.sort((a,b)=>a.z-b.z);x.save();x.translate(o.cx,o.cy);x.rotate(o.ang);x.globalAlpha=o.al;
    for(const it of items){if(it.t==='s'){const r=o.r0*it.s,al=.55+.45*(it.z/Rd*.5+.5);x.globalAlpha=o.al*al;x.drawImage(sph(it.c),it.x-r,it.y-r,r*2,r*2)}
      else if(it.t==='b'){x.globalAlpha=o.al*.8;x.strokeStyle=rgba(it.c,1);x.lineWidth=o.r0*.45;x.lineCap='round';x.beginPath();x.moveTo(it.x0,it.y0);x.lineTo(it.x1,it.y1);x.stroke()}
      else{const mx=(it.xa+it.xb)/2,my=(it.ya+it.yb)/2,w=o.r0*.28*(it.sa+it.sb)/2;x.globalAlpha=o.al*.75;let g=x.createLinearGradient(it.xa,it.ya,it.xb,it.yb);g.addColorStop(0,rgba(it.pr[0],1));g.addColorStop(.48,rgba(it.pr[0],1));g.addColorStop(.52,rgba(it.pr[1],1));g.addColorStop(1,rgba(it.pr[1],1));x.strokeStyle=g;x.lineWidth=w;x.lineCap='round';x.beginPath();x.moveTo(it.xa,it.ya);x.lineTo(it.xb,it.yb);x.stroke()}}
    x.restore()}
  draw=()=>{const p=ph();clear('#010712');const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#021326');bg.addColorStop(.5,'#04294a');bg.addColorStop(1,'#020a1a');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';for(const b of bgl){ctx.globalAlpha=b.a;const x=b.x+b.A*Math.sin(TAU*p+b.p),y=b.y+b.A*.6*Math.sin(TAU*b.m*p+b.p);ctx.drawImage(bokeh(b.c,96,.4),x-b.r,y-b.r,b.r*2,b.r*2)}ctx.globalAlpha=1;
    const g0=ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.5);g0.addColorStop(0,'rgba(40,140,255,.22)');g0.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g0;ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation='source-over';
    L.clear();helix(L.x,{N:16,gap:60,R:150,tw:.52,dir:1,ph:0,r0:17,cx:W*.5,cy:H*.5,ang:-.42,al:1});
    const back=mkLayer();/* background helix, blurred and dimmer */
    back.clear();helix(back.x,{N:20,gap:44,R:100,tw:.5,dir:-1,ph:1.2,r0:11,cx:W*.64,cy:H*.4,ang:-.42+.0,al:.8});
    put(back,0,0,.55,'lighter',9);put(L,0,0,1,'source-over',0);put(L,0,0,.6,'lighter',14)};
};
