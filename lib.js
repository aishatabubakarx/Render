const W=1920,H=1080,DUR=10000,TAU=Math.PI*2;
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
function mkL(s,font,wt,size,cx,ls=0){ctx.save();ctx.font=`${wt} ${size}px "${font}"`;ctx.letterSpacing='0px';const ws=[...s].map(c=>ctx.measureText(c).width);ctx.restore();
  const tot=ws.reduce((a,b)=>a+b,0)+ls*(ws.length-1);let x=cx-tot/2;const L=[];[...s].forEach((c,i)=>{L.push({ch:c,x:x+ws[i]/2,w:ws[i],a:0,y:0,sc:1,k:i/(ws.length-1||1)});x+=ws[i]+ls});return{L,font,wt,size,tot,cx}}
function drawL(set,y,o={}){for(const l of set.L){if(l.ch===' '||l.a<.002)continue;ctx.save();ctx.translate(l.x,y+l.y);ctx.scale(l.sc,l.sc);ctx.globalAlpha=l.a*(o.ga??1);
  ctx.font=`${set.wt} ${set.size}px "${set.font}"`;ctx.textAlign='center';ctx.textBaseline='middle';const f=typeof o.fill==='function'?o.fill(l):(o.fill||'#fff');
  for(const [c,b] of (o.glow||[])){ctx.shadowColor=c;ctx.shadowBlur=b*S;ctx.fillStyle=f;ctx.fillText(l.ch,0,0)}ctx.shadowBlur=0;ctx.shadowColor='transparent';ctx.fillStyle=f;ctx.fillText(l.ch,0,0);ctx.restore()}}
function heart(x,y,s){ctx.beginPath();ctx.moveTo(x,y+s*.3);ctx.bezierCurveTo(x,y-s*.1,x-s*.6,y-s*.1,x-s*.6,y+s*.3);ctx.bezierCurveTo(x-s*.6,y+s*.65,x-s*.2,y+s*.85,x,y+s);ctx.bezierCurveTo(x+s*.2,y+s*.85,x+s*.6,y+s*.65,x+s*.6,y+s*.3);ctx.bezierCurveTo(x+s*.6,y-s*.1,x,y-s*.1,x,y+s*.3);ctx.closePath()}
function flare(x,y,r,a,col='#fff'){ctx.globalAlpha=a;ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x,y-r);ctx.quadraticCurveTo(x+r*.07,y-r*.07,x+r,y);ctx.quadraticCurveTo(x+r*.07,y+r*.07,x,y+r);ctx.quadraticCurveTo(x-r*.07,y+r*.07,x-r,y);ctx.quadraticCurveTo(x-r*.07,y-r*.07,x,y-r);ctx.fill()}
function roundRect(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r)}
/* fireworks engine */
const FWP={peony:{drag:2.3,g:150,life:2.5},ring:{drag:2.4,g:90,life:2.3},willow:{drag:1.5,g:320,life:3.8},palm:{drag:1.3,g:260,life:3.2},crackle:{drag:2.8,g:130,life:2.8},heart:{drag:2.7,g:120,life:2.5}};
function mkBurst(R,t0,x,y,col,type,sz=1){const n={peony:150,ring:90,willow:120,palm:70,crackle:140,heart:110}[type],ps=[];
  for(let i=0;i<n;i++){let vx,vy;if(type==='ring'){const a=i/n*TAU;vx=Math.cos(a)*340;vy=Math.sin(a)*340}
    else if(type==='heart'){const t=i/n*TAU;vx=16*Math.sin(t)**3*21;vy=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*21}
    else{const a=R()*TAU,v=(type==='palm'?430:200)+R()*(type==='willow'?260:360);vx=Math.cos(a)*v;vy=Math.sin(a)*v}
    ps.push({vx:vx*sz,vy:vy*sz,h:R()})}return{t0,x,y,col,type,ps,sz}}
function drawBursts(bs,ms,alt){ctx.globalCompositeOperation='lighter';
  for(const b of bs){const dt=(ms-b.t0)/1000,P=FWP[b.type];
    if(dt<0&&dt>-.8){const q=(dt+.8)/.8,e=1-Math.pow(1-q,2);for(let j=0;j<8;j++){const qq=Math.max(0,q-j*.03),ee=1-Math.pow(1-qq,2),yy=lerp(H+20,b.y,ee);ctx.globalAlpha=(1-j/8)*.8;const s=18-j;ctx.drawImage(spr([255,210,150]),b.x-s,yy-s,s*2,s*2)}continue}
    if(dt<0||dt>P.life)continue;const al=Math.pow(1-dt/P.life,1.25),c=b.type==='willow'?[255,190,80]:b.col;
    if(dt<.12){ctx.globalAlpha=(1-dt/.12)*.9;const s=220*b.sz;ctx.drawImage(spr(c,128),b.x-s,b.y-s,s*2,s*2)}
    for(const p of b.ps){const trails=b.type==='willow'||b.type==='palm'?9:5;
      for(let j=0;j<trails;j++){const t=dt-j*.04;if(t<0)break;const d=(1-Math.exp(-P.drag*t))/P.drag,x=b.x+p.vx*d,y=b.y+p.vy*d+.5*P.g*t*t;
        let a=al*Math.pow(1-j/trails,1.6);if(b.type==='crackle')a*=.5+.5*Math.sin(ms*.03+p.h*60);const s=(b.type==='palm'?15:11)*(1-j*.07)*b.sz;
        ctx.globalAlpha=Math.max(0,a);ctx.drawImage(spr(alt&&p.h>.7?[255,255,255]:c),x-s,y-s,s*2,s*2)}}}
  ctx.globalAlpha=1}
