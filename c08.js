/* 08 ABSTRACT RED PARTICLES: a sheet of glowing particles rolling in waves, cinematic depth of field */
C[8]=()=>{newTL();const R=rng(88),E={f:0};
  tl.to(E,{f:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const NX=190,NZ=84,PT=[];for(let i=0;i<NX;i++)for(let j=0;j<NZ;j++)PT.push({x:(i/(NX-1)-.5)*2900+(R()-.5)*14,z:(j/(NZ-1)-.5)*1900+(R()-.5)*14,s:.6+R()*.9,b:.6+R()*.4});
  PT.sort(()=>R()-.5);
  draw=()=>{const p=ph();clear('#000');const cx=W/2,cy=H*.52,D=1500,yaw=.32*Math.sin(TAU*p),tilt=.42+.05*Math.sin(TAU*p+1),cyw=Math.cos(yaw),syw=Math.sin(yaw),ct=Math.cos(tilt),st=Math.sin(tilt),zf=D+(E.f-.5)*520;
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,W*.7);bg.addColorStop(0,'rgba(60,0,8,.55)');bg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    const col=[[120,6,18],[255,34,40],[255,120,90],[255,225,200]];
    for(const q of PT){const h=150*Math.sin(TAU*(q.x*.0013+p)+q.z*.0021)+95*Math.sin(TAU*(-q.z*.0019+2*p)+q.x*.0012)+48*Math.sin(TAU*(q.x*.0036+q.z*.0031-3*p));
      const xr=q.x*cyw-q.z*syw,zr=q.x*syw+q.z*cyw,yv=h*ct-zr*st,zv=h*st+zr*ct,zc=zv+D,f=1250/zc,sx=cx+xr*f,sy=cy+yv*f+60;if(sx<-60||sx>W+60||sy<-60||sy>H+60||zc<200)continue;
      const k=clamp((h+290)/580,0,1),c=k<.5?mixc(col[0],col[1],k*2):k<.85?mixc(col[1],col[2],(k-.5)/.35):mixc(col[2],col[3],(k-.85)/.15),coc=Math.abs(zc-zf)*.021,sz=q.s*2.4*f*1.1;
      if(coc<2.5){ctx.globalAlpha=clamp(q.b*(.35+.75*k),0,1);const r=sz*2.2+1;ctx.drawImage(spr(c,32,.85),sx-r,sy-r,r*2,r*2)}
      else{const r=coc*1.6+sz;ctx.globalAlpha=clamp(q.b*(.4+.7*k)*Math.pow(5/r,1.3)*1.2,0,.55);ctx.drawImage(coc>7?bokeh(c,64,.05,.3):soft(c,64,.3),sx-r,sy-r,r*2,r*2)}}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';const v=ctx.createRadialGradient(cx,cy,H*.4,cx,cy,W*.65);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.6)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)};
};
