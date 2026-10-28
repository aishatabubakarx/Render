/* 19 SMOKE & FOG: slow volumetric smoke wisps lit from the side, cool white on black (screen/add over footage) */
C[19]=()=>{newTL();const E={s:0,k:0};
  tl.to(E,{s:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  tl.to(E,{k:1,duration:5,ease:'sine.inOut',yoyo:true,repeat:2},0);
  const w=384,h=216,F=mkField(w,h);
  draw=()=>{const u=ph(),d=F.d,ts=E.s,sw=TAU*u;
    for(let j=0;j<h;j++){const y=j/h;for(let i=0;i<w;i++){const x=i/w*1.78,
      /* two-stage domain warp gives curling, billowing plumes; everything is a function of loop phase u */
      wx=lfbm(x*.6+2,y*.7,u,3,3),wy=lfbm(x*.6+7,y*.7+5,u,3,3),
      px=x*.95+wx*.45+.10*Math.sin(sw),py=y*1.35+wy*.7-.12*Math.cos(sw)+ts*.15,
      n=lfbm(px,py,u,3,4)*.5+.5,m=lfbm(px*2.4+9,py*2.4,u,3,2)*.5+.5,
      /* wide, soft density mask drifting across frame so the clip is never a flat wash */
      band=.55+.45*Math.sin(TAU*(x*.35-y*.45)+sw+wx*2),
      dens=Math.pow(clamp((n*.85+m*.12-.36)*1.7,0,1),1.25)*band,
      /* cheap side-lighting: sample density a step toward the light */
      n2=lfbm(px+.045,py-.03,u,3,3)*.5+.5,lit=clamp(.7+(n-n2)*2.6,0,1.3),
      v=dens*(120+135*lit),o=(j*w+i)*4;
      d[o]=v*.86;d[o+1]=v*.93;d[o+2]=v*1.05;d[o+3]=255}}
    clear('#000');blitField(F,1);
    /* gentle depth: a faint cool glow behind the densest area, vignette to pure black edges */
    const g=ctx.createRadialGradient(W*(.5+.12*Math.sin(sw)),H*.55,0,W*.5,H*.55,W*.55);g.addColorStop(0,'rgba(60,90,150,.10)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.globalCompositeOperation='lighter';ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='source-over';const v=ctx.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,W*.62);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.75)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)};
};
