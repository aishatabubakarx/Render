/* Shared engine: GSAP master clock, noise, sprites, low-res fields, layers, dither.
   Every concept is a pure function of time (seek -> draw), so renders are deterministic and loop exactly. */
const W=1920,H=1080,DUR=15000,FPS=30,TAU=Math.PI*2;
const cv=document.getElementById('c');let ctx,S=1;
const lerp=(a,b,t)=>a+(b-a)*t,fr=x=>x-Math.floor(x),clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),mod=(a,n)=>((a%n)+n)%n;
const sm=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const rng=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const rgba=(c,a)=>`rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;
const hsl=(h,s=100,l=60,a=1)=>`hsla(${mod(h,360)},${s}%,${l}%,${a})`;
const mixc=(a,b,t)=>[lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)];
function hue2rgb(h,s=1,l=.5){h=mod(h,360)/360;const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q,f=t=>{t=mod(t,1);return t<1/6?p+(q-p)*6*t:t<.5?q:t<2/3?p+(q-p)*(2/3-t)*6:p};return[f(h+1/3)*255,f(h)*255,f(h-1/3)*255]}
/* ---------- simplex noise ---------- */
const P=new Uint8Array(512);(function(){const r=rng(1337),p=new Uint8Array(256);for(let i=0;i<256;i++)p[i]=i;for(let i=255;i>0;i--){const j=(r()*(i+1))|0,t=p[i];p[i]=p[j];p[j]=t}for(let i=0;i<512;i++)P[i]=p[i&255]})();
const GR=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);
function n3(x,y,z){const s=(x+y+z)/3,i=Math.floor(x+s),j=Math.floor(y+s),k=Math.floor(z+s),t=(i+j+k)/6,x0=x-(i-t),y0=y-(j-t),z0=z-(k-t);let i1,j1,k1,i2,j2,k2;
  if(x0>=y0){if(y0>=z0){i1=1;j1=0;k1=0;i2=1;j2=1;k2=0}else if(x0>=z0){i1=1;j1=0;k1=0;i2=1;j2=0;k2=1}else{i1=0;j1=0;k1=1;i2=1;j2=0;k2=1}}
  else{if(y0<z0){i1=0;j1=0;k1=1;i2=0;j2=1;k2=1}else if(x0<z0){i1=0;j1=1;k1=0;i2=0;j2=1;k2=1}else{i1=0;j1=1;k1=0;i2=1;j2=1;k2=0}}
  const x1=x0-i1+1/6,y1=y0-j1+1/6,z1=z0-k1+1/6,x2=x0-i2+1/3,y2=y0-j2+1/3,z2=z0-k2+1/3,x3=x0-.5,y3=y0-.5,z3=z0-.5,ii=i&255,jj=j&255,kk=k&255;let n=0,a,g;
  a=.6-x0*x0-y0*y0-z0*z0;if(a>0){g=(P[ii+P[jj+P[kk]]]%12)*3;a*=a;n+=a*a*(GR[g]*x0+GR[g+1]*y0+GR[g+2]*z0)}
  a=.6-x1*x1-y1*y1-z1*z1;if(a>0){g=(P[ii+i1+P[jj+j1+P[kk+k1]]]%12)*3;a*=a;n+=a*a*(GR[g]*x1+GR[g+1]*y1+GR[g+2]*z1)}
  a=.6-x2*x2-y2*y2-z2*z2;if(a>0){g=(P[ii+i2+P[jj+j2+P[kk+k2]]]%12)*3;a*=a;n+=a*a*(GR[g]*x2+GR[g+1]*y2+GR[g+2]*z2)}
  a=.6-x3*x3-y3*y3-z3*z3;if(a>0){g=(P[ii+1+P[jj+1+P[kk+1]]]%12)*3;a*=a;n+=a*a*(GR[g]*x3+GR[g+1]*y3+GR[g+2]*z3)}
  return 32*n}
function fbm(x,y,z,o=4){let a=.5,f=1,s=0,n=0;for(let i=0;i<o;i++){s+=a*n3(x*f,y*f,z*f);n+=a;a*=.5;f*=2.03}return s/n}
/* loopable fbm: u in [0,1) is the loop phase; value at u=1 equals value at u=0 and variance stays constant */
const lfbm=(x,y,u,L=3,o=4)=>fbm(x,y,u*L,o)*Math.cos(u*Math.PI/2)+fbm(x,y,(u-1)*L,o)*Math.sin(u*Math.PI/2);
const ln3=(x,y,u,L=3)=>n3(x,y,u*L)*Math.cos(u*Math.PI/2)+n3(x,y,(u-1)*L)*Math.sin(u*Math.PI/2);
/* ---------- clock (GSAP) ---------- */
let tl,draw;const C={},K={p:0};
function newTL(){tl=gsap.timeline({paused:true,defaults:{ease:'none'}});K.p=0;tl.to(K,{p:1,duration:DUR/1000},0);return tl}
const ph=()=>K.p;                      // loop phase 0..1
const secs=()=>K.p*DUR/1000;
/* ---------- canvas helpers ---------- */
function clear(col='#000'){ctx.setTransform(S,0,0,S,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.filter='none';ctx.shadowBlur=0;ctx.setLineDash([]);ctx.fillStyle=col;ctx.fillRect(0,0,W,H)}
function mkLayer(w=W,h=H,res=1){const k=document.createElement('canvas');k.width=Math.round(w*S*res);k.height=Math.round(h*S*res);const x=k.getContext('2d');x.setTransform(S*res,0,0,S*res,0,0);return{k,x,w,h,res,clear(){x.setTransform(1,0,0,1,0,0);x.globalCompositeOperation='source-over';x.globalAlpha=1;x.clearRect(0,0,k.width,k.height);x.setTransform(S*res,0,0,S*res,0,0)}}}
function put(L,x=0,y=0,a=1,comp='source-over',blur=0){ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation=comp;if(blur)ctx.filter=`blur(${blur*S}px)`;ctx.drawImage(L.k,x,y,L.w,L.h);ctx.restore()}
/* low-resolution per-pixel field, smoothly upscaled */
function mkField(w,h){const k=document.createElement('canvas');k.width=w;k.height=h;const x=k.getContext('2d'),id=x.createImageData(w,h);return{k,x,id,d:id.data,w,h,flush(){x.putImageData(id,0,0)}}}
function blitField(f,a=1,comp='source-over',x=0,y=0,w=W,h=H){f.flush();ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation=comp;ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(f.k,x,y,w,h);ctx.restore()}
/* ---------- sprites ---------- */
const _sc={};
function glow(c,size=128,core=1){const k=document.createElement('canvas');k.width=k.height=size;const x=k.getContext('2d'),h=size/2,g=x.createRadialGradient(h,h,0,h,h,h),[r,gg,b]=c.map(Math.round),up=v=>Math.min(255,v+60);
  g.addColorStop(0,`rgba(255,255,255,${core})`);g.addColorStop(.12,`rgba(${up(r)},${up(gg)},${up(b)},.95)`);g.addColorStop(.3,`rgba(${r},${gg},${b},.38)`);g.addColorStop(.62,`rgba(${r},${gg},${b},.07)`);g.addColorStop(1,`rgba(${r},${gg},${b},0)`);
  x.fillStyle=g;x.fillRect(0,0,size,size);return k}
const spr=(c,size=64,core=1)=>{const k=c.map(Math.round).join()+'/'+size+'/'+core;return _sc[k]||(_sc[k]=glow(c,size,core))};
/* plain soft dot (no white core) */
function soft(c,size=64,hard=.0){const k=c.map(Math.round).join()+'s'+size+hard;if(_sc[k])return _sc[k];const cv2=document.createElement('canvas');cv2.width=cv2.height=size;const x=cv2.getContext('2d'),h=size/2,g=x.createRadialGradient(h,h,0,h,h,h),[r,gg,b]=c.map(Math.round);
  g.addColorStop(0,`rgba(${r},${gg},${b},1)`);g.addColorStop(Math.max(.01,hard),`rgba(${r},${gg},${b},${.85})`);g.addColorStop(1,`rgba(${r},${gg},${b},0)`);x.fillStyle=g;x.fillRect(0,0,size,size);return _sc[k]=cv2}
/* out-of-focus bokeh disc: feathered edge, brighter rim */
function bokeh(c,size=128,rim=.5,edge=.06){const k=c.map(Math.round).join()+'b'+size+rim+edge;if(_sc[k])return _sc[k];const cv2=document.createElement('canvas');cv2.width=cv2.height=size;const x=cv2.getContext('2d'),h=size/2,g=x.createRadialGradient(h,h,0,h,h,h),[r,gg,b]=c.map(Math.round),q=v=>Math.min(255,v+70);
  g.addColorStop(0,`rgba(${r},${gg},${b},.55)`);g.addColorStop(.7,`rgba(${r},${gg},${b},.62)`);g.addColorStop(.9,`rgba(${q(r)},${q(gg)},${q(b)},${.62+rim*.5})`);g.addColorStop(1-edge,`rgba(${q(r)},${q(gg)},${q(b)},${.5+rim*.4})`);g.addColorStop(1,`rgba(${r},${gg},${b},0)`);x.fillStyle=g;x.fillRect(0,0,size,size);return _sc[k]=cv2}
/* 4-point glint */
function glint(x,y,r,a,col='#fff'){ctx.globalAlpha=a;ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x,y-r);ctx.quadraticCurveTo(x+r*.07,y-r*.07,x+r,y);ctx.quadraticCurveTo(x+r*.07,y+r*.07,x,y+r);ctx.quadraticCurveTo(x-r*.07,y+r*.07,x-r,y);ctx.quadraticCurveTo(x-r*.07,y-r*.07,x,y-r);ctx.fill()}
function stars(R,n,o={}){const a=[];for(let i=0;i<n;i++)a.push({x:R()*W,y:R()*H*(o.h||1),s:.4+Math.pow(R(),3)*(o.big||2.2),b:.25+R()*.75,m:1+(R()*5|0),p:R()*TAU,c:R()<.15?[170,200,255]:R()<.2?[255,225,190]:[255,255,255]});return a}
function drawStars(arr,k=1,tw=.6){for(const s of arr){const t=1-tw+tw*(.5+.5*Math.sin(TAU*(s.m*ph())+s.p));ctx.globalAlpha=clamp(s.b*t*k,0,1);ctx.fillStyle=rgba(s.c,1);ctx.beginPath();ctx.arc(s.x,s.y,s.s,0,TAU);ctx.fill();if(s.s>1.7){ctx.globalAlpha*=.5;ctx.drawImage(spr(s.c,32),s.x-s.s*5,s.y-s.s*5,s.s*10,s.s*10)}}}
/* ---------- finishing: anti-banding dither (proportional, keeps pure black pure) ---------- */
let _dt=null;
function dither(){if(!_dt){const k=document.createElement('canvas');k.width=k.height=256;const x=k.getContext('2d'),id=x.createImageData(256,256),r=rng(99);for(let i=0;i<65536;i++){const v=128+((r()-.5)*22)|0;id.data[i*4]=id.data[i*4+1]=id.data[i*4+2]=v;id.data[i*4+3]=255}x.putImageData(id,0,0);_dt=ctx.createPattern(k,'repeat')}
  const f=Math.round(ph()*DUR/1000*FPS),ox=(f*97)%256,oy=(f*61)%256;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='overlay';ctx.globalAlpha=1;ctx.filter='none';ctx.fillStyle=_dt;ctx.translate(-ox,-oy);ctx.fillRect(ox,oy,cv.width,cv.height);ctx.restore()}
