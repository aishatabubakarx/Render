/* 04 SUPERNOVA: unstable star collapses, flash, glowing shock shell and ejecta, then fades back to the star */
C[4]=()=>{newTL();const R=rng(44),E={ch:0,fl:0,r:0,rem:0,star:1};
  tl.to(E,{ch:1,duration:3.2,ease:'power2.in'},0).set(E,{ch:0},3.2);
  tl.to(E,{fl:1,duration:.14,ease:'power2.out'},3.2).to(E,{fl:0,duration:3.2,ease:'expo.out'},3.34);
  tl.to(E,{r:1,duration:9.5,ease:'expo.out'},3.2);
  tl.to(E,{rem:1,duration:.5,ease:'power1.out'},3.25).to(E,{rem:0,duration:3.4,ease:'power1.in'},11.2);
  tl.to(E,{star:0,duration:.08},3.2).to(E,{star:1,duration:1.2,ease:'sine.inOut'},13.8);
  const cx=W*.5,cy=H*.5,MR=H*.42,st=stars(R,700,{big:2}),F=mkField(256,144),deb=[];
  for(let i=0;i<520;i++)deb.push({a:R()*TAU,v:.3+Math.pow(R(),.7)*.85,w:.6+R()*1.6,t:R()});
  const ramp=(t)=>t<.5?mixc([255,90,30],[255,200,120],t*2):mixc([255,200,120],[255,255,255],(t-.5)*2);
  draw=()=>{clear('#000');const s=secs(),fl=E.fl;
    ctx.globalCompositeOperation='lighter';drawStars(st,1+fl*1.2,.5);
    /* distant dust */
    const R0=E.r*MR*1.25+1;
    if(E.rem>.002){const d=F.d,w=F.w,h=F.h,rem=E.rem;
      for(let j=0;j<h;j++)for(let i=0;i<w;i++){const px=(i/w-.5)*W,py=(j/h-.5)*H,r=Math.hypot(px,py),dd=r/R0,o=(j*w+i)*4;
        if(dd>1.25){d[o]=d[o+1]=d[o+2]=0;d[o+3]=255;continue}
        const th=Math.atan2(py,px),nA=fbm(Math.cos(th)*2.2+4,Math.sin(th)*2.2,dd*2.4+s*.05,4),nB=fbm(px*.004,py*.004,s*.06,4),rd=1-Math.abs(n3(px*.006,py*.006,s*.04+3)),
          shell=Math.exp(-Math.pow((dd-.93)/(.07+.04*nA),2))*(.5+.9*(nA*.5+.5))*(.6+.6*rd*rd),
          gas=sm(.04,.85,dd)*(1-sm(.85,1.02,dd))*Math.pow(clamp(nB*.8+.5,0,1),2)*.8+Math.exp(-dd*dd*30)*.5;
        const warm=ramp(clamp(1-dd,0,1)),c0=mixc([220,50,110],[255,120,50],1-sm(.2,.85,dd)),
          k=rem*255;d[o]=clamp(k*(shell*.62+gas*c0[0]/255),0,255);d[o+1]=clamp(k*(shell*.88+gas*c0[1]/255*.85),0,255);d[o+2]=clamp(k*(shell*1.0+gas*c0[2]/255*.7),0,255);d[o+3]=255}
      blitField(F,.95,'lighter')}
    /* ejecta streaks */
    if(E.rem>.01){ctx.lineCap='round';for(const q of deb){const rp=E.r*MR*1.35*q.v,tail=Math.max(0,rp-(30+160*Math.pow(1-E.r,1.5))*q.v),co=Math.cos(q.a),si=Math.sin(q.a),a=E.rem*(1-.55*q.t)*(1-Math.pow(E.r,3)*.4);
      ctx.globalAlpha=a*.85;ctx.strokeStyle=q.t>.5?'rgb(255,190,130)':'rgb(150,205,255)';ctx.lineWidth=q.w;ctx.beginPath();ctx.moveTo(cx+co*tail,cy+si*tail);ctx.lineTo(cx+co*rp,cy+si*rp);ctx.stroke()}}
    /* star before the blast */
    const ch=E.ch,pul=Math.sin(s*(3+ch*14))*ch*.5+Math.sin(s*1.3)*.1*(1-ch),r0=40+ch*26+pul*(8+ch*10),sv=E.star*(.4+.7*ch);
    if(sv>.01){ctx.globalAlpha=sv;ctx.drawImage(spr([120,170,255],256,1),cx-r0*7,cy-r0*7,r0*14,r0*14);ctx.globalAlpha=sv*(.5+.5*ch);ctx.drawImage(spr([255,255,255],128,1),cx-r0*2.2,cy-r0*2.2,r0*4.4,r0*4.4);
      ctx.lineWidth=1.5;for(let k=0;k<4;k++){const a=Math.PI/4+k*Math.PI/2,L=r0*(4+ch*8);const g=ctx.createLinearGradient(cx,cy,cx+Math.cos(a)*L,cy+Math.sin(a)*L);g.addColorStop(0,'rgba(190,220,255,.7)');g.addColorStop(1,'rgba(190,220,255,0)');ctx.strokeStyle=g;ctx.globalAlpha=sv*.7;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*L,cy+Math.sin(a)*L);ctx.stroke()}}
    /* flash + anamorphic flare */
    if(fl>.002){const fr1=W*(.25+.9*fl);ctx.globalAlpha=Math.min(1,fl*1.1);ctx.drawImage(spr([255,240,225],256,1),cx-fr1,cy-fr1,fr1*2,fr1*2);
      ctx.globalAlpha=fl;ctx.save();ctx.translate(cx,cy);ctx.scale(1,.035);ctx.drawImage(spr([140,200,255],256,.8),-W*1.1,-W*.55,W*2.2,W*1.1);ctx.restore();
      ctx.save();ctx.translate(cx,cy);ctx.scale(.02,1);ctx.globalAlpha=fl*.6;ctx.drawImage(spr([255,200,150],256,.8),-H*.5,-H*.9,H,H*1.8);ctx.restore()}
    /* faint pulsar left behind */
    if(E.r>.1){const a=sm(.1,.4,E.r)*(E.star<.5?1:0)*(1-sm(12.5,13.8,s));ctx.globalAlpha=a*(.7+.3*Math.sin(s*20));ctx.drawImage(spr([140,200,255],64,1),cx-16,cy-16,32,32)}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
