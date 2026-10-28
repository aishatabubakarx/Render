/* 05 HYPERSPACE: flight to the stars at the speed of light, surging warp streaks and tunnel rings */
C[5]=()=>{newTL();const R=rng(55),E={core:0,hue:0};
  tl.to(E,{core:1,duration:3.75,ease:'sine.inOut',yoyo:true,repeat:3},0);        // core bloom breathes with each surge
  tl.to(E,{hue:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);          // colour drift blue -> violet -> blue
  const cx=W/2,cy=H/2,N=3,a=.62,T=p=>N*(p-a*Math.sin(4*Math.PI*p)/(4*Math.PI)),V=p=>1-a*Math.cos(4*Math.PI*p),F=H*.5;
  const ST=[];for(let i=0;i<1700;i++){const rho=.03+Math.pow(R(),1.4)*1.5;ST.push({th:R()*TAU,rho,z0:R(),h:R()<.2?R()*80-20:0,w:.5+R()*1.4,b:.5+R()*.5})}
  const LN=[];for(let i=0;i<90;i++)LN.push({th:R()*TAU,z0:R(),l:.5+R()*1.2})
  draw=()=>{const p=ph(),t=T(p),v=V(p),hu=212+E.hue*55;clear('#00020a');ctx.save();ctx.translate(cx,cy);ctx.rotate(.04*Math.sin(TAU*p));ctx.translate(-cx,-cy);
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,W*.7);bg.addColorStop(0,hsl(hu,90,18,.9));bg.addColorStop(.35,hsl(hu+20,90,8,.8));bg.addColorStop(1,'rgba(0,0,4,0)');ctx.fillStyle=bg;ctx.fillRect(-100,-100,W+200,H+200);
    ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
    /* tunnel rings */
    for(let i=0;i<10;i++){const z=fr(i/10-t),r=F*.55/Math.max(.02,z),al=sm(0,.25,1-z)*Math.min(1,z*8)*.22*(.6+.4*v/1.6);if(r>W)continue;ctx.globalAlpha=al;ctx.strokeStyle=hsl(hu+i*6,100,62,1);ctx.lineWidth=2+r*.02;ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.stroke()}
    /* stars as streaks */
    for(const s of ST){const z=fr(s.z0-t),r=s.rho*F/Math.max(.015,z),len=.045*v*(.7+s.w*.3),zt=Math.min(1,z+len),rt=s.rho*F/zt;if(r>1500||r<2)continue;const co=Math.cos(s.th),si=Math.sin(s.th),al=clamp(sm(0,.3,1-z)*Math.min(1,z*10)*s.b*(.5+.5*Math.min(1,v)),0,1);if(al<.01)continue;
      const x1=cx+co*r,y1=cy+si*r,x0=cx+co*rt,y0=cy+si*rt,g=ctx.createLinearGradient(x0,y0,x1,y1),hh=hu+s.h;g.addColorStop(0,hsl(hh,100,70,0));g.addColorStop(.7,hsl(hh,90,80,.7));g.addColorStop(1,hsl(hh,40,98,1));
      ctx.globalAlpha=al;ctx.strokeStyle=g;ctx.lineWidth=.6+s.w*(.6+3.2*Math.pow(1-z,2));ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke()}
    /* long light-speed filaments */
    for(const l of LN){const z=fr(l.z0-t*1.3),r=F*.35/Math.max(.02,z),rt=F*.35/Math.min(1,z+.2*v*l.l);if(r>1400)continue;const co=Math.cos(l.th),si=Math.sin(l.th);ctx.globalAlpha=sm(0,.35,1-z)*.35*Math.min(1,v);ctx.strokeStyle=hsl(hu+30,100,85,1);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx+co*rt,cy+si*rt);ctx.lineTo(cx+co*r,cy+si*r);ctx.stroke()}
    /* white-hot core */
    const cr=(260+160*E.core)*(.8+.3*v);ctx.globalAlpha=.55+.4*E.core;ctx.drawImage(spr(hue2rgb(hu,1,.6),256,1),cx-cr,cy-cr,cr*2,cr*2);ctx.globalAlpha=.7;ctx.drawImage(spr([255,255,255],128,1),cx-cr*.35,cy-cr*.35,cr*.7,cr*.7);
    ctx.restore();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    const vg=ctx.createRadialGradient(cx,cy,H*.45,cx,cy,W*.62);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,6,.65)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H)};
};
