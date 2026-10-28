/* 06 BIG BANG: singularity, white-hot expansion, cooling plasma, particles condense into stars and galaxies */
C[6]=()=>{newTL();const R=rng(66),E={sing:0,fl:0,r:0,cool:0,gal:0,vis:1};
  tl.to(E,{sing:1,duration:3.4,ease:'power2.in'},0).set(E,{sing:0},3.5);
  tl.to(E,{fl:1,duration:.12,ease:'power2.out'},3.5).to(E,{fl:0,duration:3.2,ease:'expo.out'},3.62);
  tl.to(E,{r:1,duration:10,ease:'expo.out'},3.5);
  tl.to(E,{cool:1,duration:8,ease:'sine.out'},3.6);
  tl.to(E,{gal:1,duration:4,ease:'sine.inOut'},8).to(E,{gal:0,duration:1.4,ease:'sine.inOut'},13.1);
  tl.to(E,{vis:0,duration:1.6,ease:"sine.inOut"},12.9);
  const cx=W/2,cy=H/2,MR=W*.5,F=mkField(256,144);
  const P=[];for(let i=0;i<3200;i++){const a=R()*TAU;P.push({a,v:Math.pow(R(),.55),t:R(),s:.5+R()*1.6,j:R()})}
  const SS=stars(R,650,{big:2.2}),GAL=[];
  for(let g=0;g<13;g++){const arms=2,pts=[],rot=R()*TAU,tilt=.35+R()*.5;for(let i=0;i<150;i++){const k=Math.pow(R(),.7),a=k*5+((i%arms)*Math.PI)+R()*.35,rr=k*1;pts.push([Math.cos(a)*rr,Math.sin(a)*rr*tilt,R()])}GAL.push({x:W*.08+R()*W*.84,y:H*.08+R()*H*.84,s:30+R()*60,rot,pts,c:R()<.5?[255,215,170]:[170,200,255],m:1+(R()*2|0),p:R()*TAU,d:R()})}
  const temp=(T)=>{T=clamp(T,0,1);const st=[[255,255,245],[255,205,100],[255,110,40],[210,40,90],[100,35,170],[25,40,130]],k=(1-T)*5,i=Math.min(4,k|0);return mixc(st[i],st[i+1],k-i)};
  draw=()=>{clear('#000');const s=secs(),vis=E.vis,r=E.r,cool=E.cool;ctx.globalCompositeOperation='lighter';
    /* singularity */
    const sg=.12+.88*E.sing;if(r<.001||s<3.5||s>14.3){const rs=18+sg*30,sh=Math.sin(s*30)*.08*E.sing;ctx.globalAlpha=Math.min(1,(.6+sh)*(.5+sg));ctx.drawImage(spr([255,245,230],128,1),cx-rs*(1+sg*3),cy-rs*(1+sg*3),rs*2*(1+sg*3),rs*2*(1+sg*3));
      /* in-falling sparks */
      if(s<3.6){for(let i=0;i<110;i++){const q=P[i],ph0=fr(q.t+s*(.3+.4*q.v)),d=(1-ph0)*(300+q.v*500)*(1-E.sing*.5),x=cx+Math.cos(q.a)*d,y=cy+Math.sin(q.a)*d,d2=d+34*(1-ph0)+8;ctx.globalAlpha=(1-ph0)*(.4+.6*E.sing);ctx.strokeStyle='rgb(255,215,170)';ctx.lineWidth=1.1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(cx+Math.cos(q.a)*d2,cy+Math.sin(q.a)*d2);ctx.stroke()}}}
    if(r>0.001&&vis>.002){
      /* fireball plasma */
      const RF=Math.max(1,r*MR*1.05),d=F.d,w=F.w,h=F.h;
      for(let j=0;j<h;j++)for(let i=0;i<w;i++){const px=(i/w-.5)*W,py=(j/h-.5)*H,rr=Math.hypot(px,py),dd=rr/RF,o=(j*w+i)*4;if(dd>1.1){d[o]=d[o+1]=d[o+2]=0;d[o+3]=255;continue}
        const n=fbm(px*.0035+2,py*.0035,s*.07,4)*.5+.5,n2=fbm(px*.009,py*.009+5,s*.1,3)*.5+.5,edge=1-sm(.55,1.05,dd),core=Math.pow(1-clamp(dd,0,1),1.6),
          dens=edge*(.35+.9*n)*(.6+.6*n2)+core*.9,T=clamp((1-dd)*.9+n*.15-cool*.75,0,1.1),c=temp(T),k=dens*(1-.55*cool)*vis;
        d[o]=clamp(c[0]*k,0,255);d[o+1]=clamp(c[1]*k,0,255);d[o+2]=clamp(c[2]*k,0,255);d[o+3]=255}
      blitField(F,.95,'lighter');
      /* shock rings */
      for(let k=0;k<2;k++){const rr=r*MR*(1.5-k*.35),a=(1-Math.pow(r,.5))*(k?.5:.9)*vis;if(a<.01)continue;ctx.globalAlpha=a;const gr=ctx.createRadialGradient(cx,cy,rr*.9,cx,cy,rr*1.05);gr.addColorStop(0,'rgba(255,200,150,0)');gr.addColorStop(.8,'rgba(255,230,200,.6)');gr.addColorStop(1,'rgba(255,200,150,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.arc(cx,cy,rr*1.06,0,TAU);ctx.fill()}
      /* particle storm */
      ctx.lineCap='round';for(const q of P){const re=Math.pow(r,.85)*MR*1.55*q.v,l=(1-r)*(40+80*q.v),co=Math.cos(q.a),si=Math.sin(q.a),a=vis*(1-.7*sm(.4,1,r)*(1-E.gal*.6))*(.35+.65*(1-q.t));if(a<.01)continue;const c=temp(clamp(1-r*.5-cool*.6+q.j*.2,0,1));
        ctx.globalAlpha=a*.8;ctx.strokeStyle=rgba(c,1);ctx.lineWidth=q.s*.8;ctx.beginPath();ctx.moveTo(cx+co*Math.max(0,re-l),cy+si*Math.max(0,re-l));ctx.lineTo(cx+co*re,cy+si*re);ctx.stroke()}
      /* flash */
      const fl=E.fl;if(fl>.002){const f1=W*(.3+.9*fl);ctx.globalAlpha=Math.min(1,fl*1.15);ctx.drawImage(spr([255,245,230],256,1),cx-f1,cy-f1,f1*2,f1*2);if(fl>.5){ctx.globalAlpha=(fl-.5)*2;ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H)}}
    }
    /* cosmic stars + galaxies */
    const g=E.gal*vis;if(g>.002){drawStars(SS,g*1.2,.5);for(const q of GAL){const gs=q.s*(.6+.5*g),a=g*(.45+.55*q.d);ctx.save();ctx.translate(q.x,q.y);ctx.rotate(q.rot+.3*Math.sin(TAU*ph()*q.m+q.p)*0);ctx.globalAlpha=a*.8;ctx.drawImage(spr(q.c,64,1),-gs*.5,-gs*.5,gs,gs);ctx.globalAlpha=a*.6;
      for(const pt of q.pts){const x=pt[0]*gs,y=pt[1]*gs,z=1+pt[2]*1.3;ctx.drawImage(spr(q.c,16,.8),x-z,y-z,z*2,z*2)}ctx.restore()}}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
