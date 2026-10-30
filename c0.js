/* shared helpers for the pack (loaded before c1.js) */
function bgRad(c0,c1,cx=W/2,cy=H/2,r=H*1.15){const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,c0);g.addColorStop(1,c1);ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
const _hz={};
/* soft noise haze at low res, upscaled. th!=null makes it loop-safe */
function haze(col,a,ms,sc=1,th=null,w=64,h=36){const k=_hz[w]||(_hz[w]=offscreen(w,h)),x=k.getContext('2d'),d=x.createImageData(w,h);
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const u=i*.09*sc,v=j*.09*sc;let n=th==null?fbm(u+ms*.00006,v,2):(lnoise(u,v,th)+.5*lnoise(u*2+9,v*2,th*2))*.8;n=Math.max(0,n*.55+.32);const p=(j*w+i)*4;d.data[p]=col[0];d.data[p+1]=col[1];d.data[p+2]=col[2];d.data[p+3]=Math.min(255,n*255)}
  x.putImageData(d,0,0);ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='lighter';ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(k,0,0,W,H);ctx.restore()}
/* firework / sparkle burst with analytic drag+gravity trajectories */
function makeBurst(R,o){const P=[];for(let i=0;i<o.n;i++){const a=R()*TAU,s=o.sp*(o.ring?(.88+R()*.12):Math.sqrt(R())),v=s*(.6+.4*R());P.push({vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:o.life*(.55+.45*R()),c:o.cols[(R()*o.cols.length)|0],s:o.size*(.5+R()),ph:R()*TAU})}
  const pos=(p,e)=>{const k=o.k,f=(1-Math.exp(-k*e))/k;return[o.x+p.vx*f,o.y+p.vy*f+o.g*e*e*.5]};
  return t=>{const e=t-o.t0;if(e<0||e>o.life)return;ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
    for(const p of P){if(e>p.l)continue;const[x,y]=pos(p,e),a=(1-e/p.l)**1.4*(.55+.45*Math.sin(e*22+p.ph));if(a<.03)continue;
      if(o.trail){const[x0,y0]=pos(p,Math.max(0,e-o.trail));ctx.globalAlpha=a*.7;ctx.strokeStyle=p.c;ctx.lineWidth=p.s*.7;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x,y);ctx.stroke()}
      ctx.globalAlpha=a;ctx.fillStyle=p.c;ctx.fillRect(x-p.s/2,y-p.s/2,p.s,p.s);if(p.s>2.6&&a>.4){ctx.globalAlpha=a*.5;ctx.drawImage(spr([255,214,120],64),x-p.s*3,y-p.s*3,p.s*6,p.s*6)}}
    ctx.restore()}}
/* 4-point sparkle star */
function star4(x,y,r,a,col='#fff'){ctx.save();ctx.globalAlpha=a;ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x,y-r);ctx.quadraticCurveTo(x+r*.09,y-r*.09,x+r,y);ctx.quadraticCurveTo(x+r*.09,y+r*.09,x,y+r);ctx.quadraticCurveTo(x-r*.09,y+r*.09,x-r,y);ctx.quadraticCurveTo(x-r*.09,y-r*.09,x,y-r);ctx.fill();ctx.restore()}
/* point in polygon (lon/lat lists) */
function inPoly(x,y,P){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const[xi,yi]=P[i],[xj,yj]=P[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c}return c}
