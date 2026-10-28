const W=1920,H=1080,CX=960,CY=540,DUR=15000,TAU=Math.PI*2;
const cv=document.getElementById('c');let ctx=cv.getContext('2d',{alpha:false}),S=1;
const {createTimeline,stagger}=anime;
const rng=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const lerp=(a,b,t)=>a+(b-a)*t,fr=x=>x-Math.floor(x),clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),sm=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const mixc=(a,b,t)=>[lerp(a[0],b[0],t)|0,lerp(a[1],b[1],t)|0,lerp(a[2],b[2],t)|0];
const rgba=(c,a)=>`rgba(${c[0]},${c[1]},${c[2]},${a})`;
const hsl=(h,s=100,l=60,a=1)=>`hsla(${h},${s}%,${l}%,${a})`;
function glow(c,size=128,core=1){const k=document.createElement('canvas');k.width=k.height=size;const x=k.getContext('2d'),h=size/2,g=x.createRadialGradient(h,h,0,h,h,h),[r,gg,b]=c,up=v=>Math.min(255,v+60);
  g.addColorStop(0,`rgba(255,255,255,${core})`);g.addColorStop(.12,`rgba(${up(r)},${up(gg)},${up(b)},.95)`);g.addColorStop(.3,`rgba(${r},${gg},${b},.38)`);g.addColorStop(.62,`rgba(${r},${gg},${b},.07)`);g.addColorStop(1,`rgba(${r},${gg},${b},0)`);
  x.fillStyle=g;x.fillRect(0,0,size,size);return k}
const _sc={};const spr=(c,size=64)=>{const k=c.join()+size;return _sc[k]||(_sc[k]=glow(c,size))};
function clear(){ctx.setTransform(S,0,0,S,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);ctx.shadowBlur=0;ctx.setLineDash([])}
let tl,draw;const C={};const now=()=>tl.currentTime;
const newTL=()=>{tl=createTimeline({autoplay:false,defaults:{ease:'linear'}});tl.add({t:0},{t:1,duration:DUR},0);return tl};
function txt(s,x,y,o={}){ctx.save();ctx.font=`${o.w||700} ${o.size||100}px "${o.f||'Montserrat'}"`;ctx.letterSpacing=(o.ls||0)+'px';ctx.textAlign=o.al||'center';ctx.textBaseline='middle';
  ctx.translate(x,y);if(o.rot)ctx.rotate(o.rot);if(o.sc)ctx.scale(o.sc,o.sc);ctx.globalAlpha*=(o.a??1);const fl=o.fill||'#fff';
  for(const [c,b] of (o.glow||[])){ctx.shadowColor=c;ctx.shadowBlur=b*S;ctx.fillStyle=fl;ctx.fillText(s,0,0)}
  ctx.shadowBlur=0;ctx.shadowColor='transparent';ctx.fillStyle=fl;if(o.stroke){ctx.strokeStyle=o.stroke;ctx.lineWidth=o.lw||2;ctx.lineJoin='round';ctx.strokeText(s,0,0)}if(!o.noFill)ctx.fillText(s,0,0);ctx.restore()}
function tw(s,f,w,size,ls=0){ctx.save();ctx.font=`${w} ${size}px "${f}"`;ctx.letterSpacing=ls+'px';const v=ctx.measureText(s).width;ctx.restore();return v}
function flare(x,y,r,a,col='#fff'){ctx.globalAlpha=a;ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x,y-r);ctx.quadraticCurveTo(x+r*.07,y-r*.07,x+r,y);ctx.quadraticCurveTo(x+r*.07,y+r*.07,x,y+r);ctx.quadraticCurveTo(x-r*.07,y+r*.07,x-r,y);ctx.quadraticCurveTo(x-r*.07,y-r*.07,x,y-r);ctx.fill()}
function roundRect(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r)}

/* v2 helpers: every concept is a function of T() so each 15 s clip loops seamlessly */
const T=()=>tl.currentTime/DUR;
const hue2=(h,s=1,l=.5)=>{h=(((h%360)+360)%360)/360;const a=s*Math.min(l,1-l),f=n=>{const k=(n+h*12)%12;return l-a*Math.max(-1,Math.min(k-3,9-k,1))};return[f(0)*255|0,f(8)*255|0,f(4)*255|0]};
const q16=c=>c.map(v=>(v>>4)<<4);
const _kc={};
function cachedSprite(key,size,fn){const k=key+'|'+size;if(_kc[k])return _kc[k];const c=document.createElement('canvas');c.width=c.height=size;fn(c.getContext('2d'),size/2);return _kc[k]=c}
const bok=(c,size=128)=>cachedSprite('b'+c.join(),size,(x,h)=>{const g=x.createRadialGradient(h,h,0,h,h,h);g.addColorStop(0,rgba(c,.32));g.addColorStop(.78,rgba(c,.46));g.addColorStop(.93,rgba(c,.85));g.addColorStop(1,rgba(c,0));x.fillStyle=g;x.fillRect(0,0,size,size)});
const smk=(c,size=128)=>cachedSprite('s'+c.join(),size,(x,h)=>{const g=x.createRadialGradient(h,h,0,h,h,h);g.addColorStop(0,rgba(c,.6));g.addColorStop(.35,rgba(c,.3));g.addColorStop(.7,rgba(c,.08));g.addColorStop(1,rgba(c,0));x.fillStyle=g;x.fillRect(0,0,size,size)});
const gd=(x,m,s)=>Math.exp(-((x-m)*(x-m))/(2*s*s));

function heart(x,y,s){ctx.beginPath();ctx.moveTo(x,y+s*.3);ctx.bezierCurveTo(x,y-s*.1,x-s*.6,y-s*.1,x-s*.6,y+s*.3);ctx.bezierCurveTo(x-s*.6,y+s*.65,x-s*.2,y+s*.85,x,y+s);ctx.bezierCurveTo(x+s*.2,y+s*.85,x+s*.6,y+s*.65,x+s*.6,y+s*.3);ctx.bezierCurveTo(x+s*.6,y-s*.1,x,y-s*.1,x,y+s*.3);ctx.closePath()}
