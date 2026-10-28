/* 03 SPACE DUST & BOKEH: drifting nebula clouds, cosmic dust, colourful out-of-focus lights */
C[3]=()=>{newTL();const R=rng(33),E={g:0};
  tl.to(E,{g:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const F=mkField(256,144),PAL=[[235,50,150],[50,80,255],[255,160,60],[40,200,220],[150,60,240]];
  const dust=[];for(let i=0;i<2600;i++){const z=R();dust.push({x:R()*W,y:R()*H,z,k:z<.5?1:z<.85?2:3,s:.5+z*1.6,b:.25+R()*.75,m:1+(R()*5|0),p:R()*TAU,a:4+R()*20,c:R()<.3?[255,210,160]:R()<.5?[170,200,255]:[255,255,255]})}
  const bk=[];for(let i=0;i<52;i++){const z=R();bk.push({x:R()*W,y:R()*H,r:30+Math.pow(R(),1.7)*150,c:PAL[(R()*PAL.length)|0],a:.05+R()*.15,m:1,p:R()*TAU,A:80+R()*220,B:40+R()*120,pp:R()*TAU,pm:1+(R()*3|0)})}
  const gl=[];for(let i=0;i<16;i++)gl.push({x:R()*W,y:R()*H,r:10+R()*22,m:2+(R()*5|0),p:R()*TAU,c:PAL[(R()*PAL.length)|0]});
  draw=()=>{const u=ph(),p=u;clear('#02010a');
    const bg=ctx.createRadialGradient(W*.55,H*.45,0,W*.55,H*.45,W*.8);bg.addColorStop(0,'#10062a');bg.addColorStop(1,'#010006');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    const d=F.d,w=F.w,h=F.h;for(let j=0;j<h;j++)for(let i=0;i<w;i++){const x=i/w,y=j/h,o=(j*w+i)*4,
      a=lfbm(x*2.2+3,y*1.5,u,3,4),b=lfbm(x*3.1+9,y*2.1+2,u,3,3),c=lfbm(x*1.3+5,y*1.1+8,u,3,3),
      den=Math.pow(clamp(a*.9+.45,0,1),2.1),m1=sm(-.3,.5,b),m2=sm(-.2,.6,c),
      vig=1-Math.pow(Math.hypot(x-.5,y-.5)*1.25,2.2)*.85,k=den*vig*(.55+.35*E.g)*255;
      d[o]=k*(PAL[0][0]*m1*.9+PAL[1][0]*(1-m1)*.55+PAL[2][0]*m2*.45)/255;d[o+1]=k*(PAL[0][1]*m1*.9+PAL[1][1]*(1-m1)*.55+PAL[2][1]*m2*.45+PAL[3][1]*.12)/255;d[o+2]=k*(PAL[0][2]*m1*.9+PAL[1][2]*(1-m1)*.55+PAL[2][2]*m2*.45+PAL[3][2]*.2)/255;d[o+3]=255}
    blitField(F,1,'lighter');ctx.globalCompositeOperation='lighter';
    for(const q of bk){const x=q.x+q.A*Math.sin(TAU*p+q.p),y=q.y+q.B*Math.sin(TAU*q.pm*p+q.pp),al=q.a*(.7+.3*Math.sin(TAU*2*p+q.pp));ctx.globalAlpha=al;ctx.drawImage(bokeh(q.c,128,.6,.05),x-q.r,y-q.r,q.r*2,q.r*2)}
    for(const s of dust){const x=mod(s.x+p*s.k*W*(s.z>.85?1:1)*(s.k===1?1:s.k===2?2:3)+Math.sin(TAU*s.m*p+s.p)*s.a,W+40)-20,y=s.y+Math.sin(TAU*(s.m*p)+s.p*2)*s.a*.6,t=.45+.55*Math.sin(TAU*s.m*p+s.p),a=s.b*t*(s.z>.85?.55:1);
      ctx.globalAlpha=a;if(s.z>.85){const r=s.s*5;ctx.drawImage(bokeh(s.c,48,.4),x-r,y-r,r*2,r*2)}else{ctx.fillStyle=rgba(s.c,1);ctx.beginPath();ctx.arc(x,y,s.s,0,TAU);ctx.fill()}}
    for(const g of gl){const t=Math.pow(.5+.5*Math.sin(TAU*g.m*p+g.p),3);ctx.globalAlpha=t*.9;ctx.drawImage(spr(g.c,64),g.x-g.r*3,g.y-g.r*3,g.r*6,g.r*6);glint(g.x,g.y,g.r*1.9*t,t*.8,'#fff')}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
