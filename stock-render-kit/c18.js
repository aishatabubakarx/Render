/* 18 LIQUID GOLD: slow molten gold surface with silky reflections */
C[18]=()=>{newTL();const E={s:0};
  tl.to(E,{s:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const w=480,h=270,F=mkField(w,h),HG=new Float32Array((w+2)*(h+2));
  const ramp=[[0,[28,10,0]],[.22,[110,58,6]],[.45,[215,140,28]],[.66,[255,205,86]],[.84,[255,236,170]],[1,[255,252,235]]];
  const gold=t=>{t=clamp(t,0,1);for(let i=1;i<ramp.length;i++)if(t<=ramp[i][0]){const a=ramp[i-1],b=ramp[i],k=(t-a[0])/(b[0]-a[0]);return mixc(a[1],b[1],k*k*(3-2*k))}return ramp[5][1]};
  const LUT=[];for(let i=0;i<256;i++)LUT.push(gold(i/255));
  draw=()=>{const u=ph();
    for(let j=-1;j<=h;j++)for(let i=-1;i<=w;i++){const x=i/w*1.78,y=j/h,wx=lfbm(x*.9+3,y*.9,u,3,3),wy=lfbm(x*.9+9,y*.9+4,u,3,3);
      HG[(j+1)*(w+2)+i+1]=lfbm(x*1.15+wx*1.2,y*1.15+wy*1.2,u,3,4)+.16*n3(x*4.5+wx*2,y*4.5+wy*2,u*3)}
    const d=F.d,K=20+10*E.s;
    for(let j=0;j<h;j++)for(let i=0;i<w;i++){const o=(j*w+i)*4,gx=(HG[(j+1)*(w+2)+i+2]-HG[(j+1)*(w+2)+i])*K,gy=(HG[(j+2)*(w+2)+i+1]-HG[j*(w+2)+i+1])*K,il=1/Math.sqrt(gx*gx+gy*gy+1),nx=-gx*il,ny=-gy*il,nz=il,
      e=.5+.55*(nx*.55+ny*.85),dif=Math.max(0,nx*-.35+ny*-.55+nz*.76),hx=nx*.3+ny*-.2+nz*.93,sp=Math.pow(Math.max(0,hx),48),
      c=LUT[clamp(e*255,0,255)|0],k=.45+.75*dif;d[o]=clamp(c[0]*k+sp*255*.8,0,255);d[o+1]=clamp(c[1]*k+sp*235*.8,0,255);d[o+2]=clamp(c[2]*k+sp*190*.8,0,255);d[o+3]=255}
    F.flush();ctx.setTransform(S,0,0,S,0,0);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(F.k,0,0,W,H);
    const v=ctx.createRadialGradient(W/2,H/2,H*.4,W/2,H/2,W*.7);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(10,3,0,.5)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)};
};
