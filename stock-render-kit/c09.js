/* 09 RED INK IN WATER: two billowing plumes rising through clear water, white studio background, seamless loop */
C[9]=()=>{newTL();const E={s:0};C.noDither=false;
  tl.to(E,{s:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const F=mkField(400,225),Dd=1.1,L=3.2;
  const adv=(x,y,u,o)=>fbm(x,y-u*Dd,u*L,o)*Math.cos(u*Math.PI/2)+fbm(x,y-(u-1)*Dd,(u-1)*L,o)*Math.sin(u*Math.PI/2);
  const PL=[{x:.3,w:.05,k:1},{x:.68,w:.045,k:.9}];
  draw=()=>{const u=ph();ctx.setTransform(S,0,0,S,0,0);const d=F.d,w=F.w,h=F.h;
    for(let j=0;j<h;j++)for(let i=0;i<w;i++){const x=i/w,y=j/h,X=x*1.78,hh=1-y,o=(j*w+i)*4;
      const wx=adv(X*1.1+3,y*1.1,u,3),wy=adv(X*1.1+9,y*1.1+4,u,3);
      let env=0;for(const q of PL){const sway=.045*Math.sin(TAU*(u+q.x*3))+wx*.12,wd=q.w+.12*Math.pow(hh,.8),lx=(x-q.x-sway)/wd;env+=q.k*Math.exp(-lx*lx*1.15)*sm(.0,.14,hh)*(1-sm(.7,1.1,hh))}
      const nA=adv(X*1.5+wx*.8,y*1.5+wy*.8,u,4)*.5+.5,nB=adv(X*3.6+wx*1.1+7,y*3.6+wy*1.1,u,3)*.5+.5,
        core=env*sm(.4,.92,nA)*(.55+.65*nB),wisp=Math.min(1,env*1.8)*sm(.66,.9,1-Math.abs(adv(X*2.4+wx*1.0+2,y*2.4+wy*1.0+5,u,3)))*.55,
        dens=(core+wisp*(1-Math.min(1,core)))*(1+.2*E.s)*1.15;
      const vg=1-.12*Math.pow(Math.hypot(x-.5,y-.5)*1.4,2),bgc=[252*vg,250*vg,248*vg],k=dens*1.35;
      d[o]=bgc[0]*Math.exp(-k*.4);d[o+1]=bgc[1]*Math.exp(-k*2.5);d[o+2]=bgc[2]*Math.exp(-k*2.2);d[o+3]=255}
    F.flush();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(F.k,0,0,W,H)};
};
