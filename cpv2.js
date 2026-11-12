PVB[2]=function(){
const REMOVE=["Christmas ornaments garland", "Gold dust murmuration", "Gold ink bloom in water", "Chrome gold orbs floating", "Gold kaleidoscope", "Golden-hour mountains", "Lotus blooming", "Dust spiral galaxy", "Gold snowflake with falling snow", "Christmas tree from dust with twinkling lights", "Diwali diya with flickering flame", "Gold dust ribbon river", "CONGRATULATIONS in metallic gold", "WINNER with golden god-rays", "Plasma globe with lightning tendrils", "Golden sacred-geometry mandala", "Rainy window with city bokeh", "Hex grid pulse", "Glitter road on water", "Volumetric god rays with dust"];

const TAU=Math.PI*2;
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const R=(s,n,f)=>{const r=rng(s);return Array.from({length:n},(_,i)=>f(r,i))};
const mod=x=>((x%1)+1)%1,pw=Math.pow,sn=Math.sin,cs_=Math.cos;
function glowRaw(c,x,y,r,col,a){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`hsla(${col},${a})`);g.addColorStop(1,`hsla(${col},0)`);c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2)}
function glow(c,x,y,r,col,a){if(r>=202.5&&a<=.55)return;glowRaw(c,x,y,r,col,a)}
const L='lighter',N='source-over';

/* data */
const stars=R(1,280,r=>({x:r(),y:r(),k:1+(r()*3|0),r:.7+r()*1.4,w:1+(r()*3|0),p:r()*6,c:['255,255,255','190,210,255','255,225,190'][r()*3|0]}));
const trees=[0,1,2].map(l=>R(10+l,[9,12,16][l],r=>({x:r(),s:.75+r()*.5})));
const flies=R(11,70,r=>({x:.05+r()*.9,y:.45+r()*.5,A:.02+r()*.05,B:.015+r()*.04,a:1+(r()*3|0),b:1+(r()*3|0),p:r()*6,q:r()*6,w:1+(r()*3|0),h:60+r()*30}));
const bok=R(12,34,r=>({x:r(),y:r()*.9,r:.04+r()*.09,h:[25,340,190,45,210,10][r()*6|0],w:1+(r()*2|0),p:r()*6,k:1+(r()*2|0)}));
const dropS=R(13,110,r=>({x:r(),y:r(),r:1.5+r()*3.5}));
const dropR=R(14,8,r=>({x:.05+r()*.9,y:r(),k:1+(r()*2|0),p:r()*6,l:30+r()*50}));
const fw=R(30,5,r=>({o:i=>0,x:.18+r()*.64,y:.2+r()*.25,h:r()*360,n:70+(r()*30|0),sz:.2+r()*.1})).map((b,i)=>({...b,o:i/5+.03}));
const conf=R(31,150,r=>({x:r(),y:r(),k:1+(r()*2|0),f:1+(r()*3|0),p:r()*6,z:.5+r()*.9,rt:r()*6,w:1+(r()*2|0)}));
const blips=R(40,8,r=>({a:r()*TAU,d:.2+r()*.72,id:100+(r()*899|0)}));
const NC=24,noise=R(50,NC,r=>r()-.5),wk1=R(51,NC,r=>r()),wk2=R(52,NC,r=>r()),vol=R(53,NC,r=>.2+r()*.8);
const cl=k=>{k=((k%NC)+NC)%NC;const t=TAU/NC*k;return .5+.2*sn(t)+.11*sn(3*t+1)+.05*sn(7*t+2)+noise[k]*.08};
function pine(c,x,base,ht,wd){c.beginPath();for(let i=0;i<5;i++){const yb=base-ht*(.12+i*.17),hw=wd*(1-i*.16);c.moveTo(x-hw,yb);c.lineTo(x,yb-ht*.3);c.lineTo(x+hw,yb)}c.fill();c.fillRect(x-wd*.06,base-ht*.14,wd*.12,ht*.16)}

const clips=[
{t:'Ringed gas giant with orbiting moon',p:8,d:'Banded planet with a rotating storm, atmosphere rim light, split ring with a gap, moon passing in front and behind, 3 star layers with parallax and twinkle.',u:'Best for: sci-fi intros, space news, astronomy channels. Blender 3D version recommended.',f(c,u,w,h){const ph=u*TAU,cx=w*.42,cy=h*.52,Rp=h*.24,tl=-.38;
stars.forEach(s=>{c.fillStyle=`rgba(${s.c},${(.25+.75*Math.abs(sn(ph*s.w+s.p)))*(.4+s.k*.2)})`;c.fillRect(mod(s.x-s.k*u)*w,s.y*h,s.r,s.r)});
glow(c,cx,cy,Rp*1.7,'28,85%,55%',.28);
const ring=fr=>{c.save();c.translate(cx,cy);c.rotate(tl);for(let rr=1.3;rr<2.2;rr+=.028){const gap=rr>1.72&&rr<1.8,a=gap?.03:(.18+.4*Math.abs(sn(rr*37)))*(rr>2.05?.5:1);c.strokeStyle=`hsla(${34+sn(rr*20)*6},40%,${60+sn(rr*50)*12}%,${a})`;c.lineWidth=Rp*.034;c.beginPath();c.ellipse(0,0,Rp*rr,Rp*rr*.3,0,fr?0:Math.PI,fr?Math.PI:TAU);c.stroke()}c.restore()};
const moon=fr=>{const a=ph,lx=Rp*2.75*cs_(a),ly=Rp*.85*sn(a);if((sn(a)>0)!==fr)return;const x=cx+lx*cs_(tl)-ly*sn(tl),y=cy+lx*sn(tl)+ly*cs_(tl),r=Rp*.11*(1+.18*sn(a));const g=c.createRadialGradient(x-r*.4,y-r*.4,r*.1,x,y,r);g.addColorStop(0,'#e9e6df');g.addColorStop(.6,'#8a867f');g.addColorStop(1,'#1c1b1a');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,TAU);c.fill()};
ring(false);moon(false);
c.save();c.beginPath();c.arc(cx,cy,Rp,0,TAU);c.clip();c.fillStyle='#b98a52';c.fillRect(cx-Rp,cy-Rp,Rp*2,Rp*2);for(let y=-Rp;y<Rp;y+=2.5){const la=y/Rp;c.fillStyle=`hsla(${26+12*sn(la*9)},${50+15*sn(la*5)}%,${50+16*sn(la*15+1)}%,.85)`;c.fillRect(cx-Rp,cy+y,Rp*2,2.6)}
const lon=ph,vis=cs_(lon);if(vis>0){c.fillStyle='rgba(150,60,40,.75)';c.beginPath();c.ellipse(cx+Rp*.8*sn(lon),cy+Rp*.28,Rp*.2*vis,Rp*.09,0,0,TAU);c.fill();c.strokeStyle='rgba(255,220,180,.35)';c.lineWidth=1.5;c.stroke()}
const g=c.createRadialGradient(cx-Rp*.45,cy-Rp*.4,Rp*.1,cx-Rp*.2,cy-Rp*.15,Rp*1.25);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.55,'rgba(0,0,0,.3)');g.addColorStop(1,'rgba(0,0,0,.96)');c.fillStyle=g;c.fillRect(cx-Rp,cy-Rp,Rp*2,Rp*2);c.restore();
c.strokeStyle='rgba(255,200,130,.5)';c.lineWidth=2;c.beginPath();c.arc(cx,cy,Rp,Math.PI*1.05,Math.PI*1.65);c.stroke();
ring(true);moon(true)}},

{t:'Firefly forest at moonlight',p:8,d:'Three layers of pine silhouettes swaying at different depths, drifting mist banks, a cool moon glow, and 70 fireflies on looping figure-eight paths that blink at their own rhythm.',u:'Best for: sleep/relax channels, fantasy intros, meditation, lyric backgrounds.',f(c,u,w,h){const ph=u*TAU;
let g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#000');g.addColorStop(.65,'#000');g.addColorStop(1,'#000');c.fillStyle=g;c.fillRect(0,0,w,h);
glow(c,w*.78,h*.17,h*.55,'190,70%,70%',.38);c.fillStyle='rgba(235,247,255,.92)';c.beginPath();c.arc(w*.78,h*.17,h*.04,0,TAU);c.fill();
const LY=[['#052126',.62,.42],['#031519',.76,.55],['#010708',.95,.75]];
LY.forEach(([col,by,sc],l)=>{c.globalCompositeOperation=N;c.fillStyle=col;trees[l].forEach(t=>{const x=t.x*w+sn(ph+t.x*9)*(l+1)*1.4;pine(c,x,by*h,h*sc*t.s,h*.12*sc*1.3*t.s)});c.fillRect(0,by*h-2,w,h);
c.globalCompositeOperation=L;for(let k=0;k<3;k++){glow(c,mod(k*.37+(l+1)*u)*w*1.5-w*.25,by*h-h*.02,h*.4,'185,45%,60%',.06+.02*l)}});
c.globalCompositeOperation=L;flies.forEach(f=>{const x=(f.x+sn(ph*f.a+f.p)*f.A)*w,y=(f.y+sn(ph*f.b+f.q)*f.B*2)*h,b=pw(Math.max(0,sn(ph*f.w+f.p)),2);glow(c,x,y,10+b*10,`${f.h},95%,60%`,.15+b*.85);c.fillStyle=`rgba(255,255,200,${.3+b*.7})`;c.fillRect(x-1,y-1,2,2)})}},

{t:'Rainy window with city bokeh',p:8,d:'Out-of-focus warm and neon city lights breathing behind glass, 110 static droplets with highlights, 8 droplets running down with fading trails and lens glints.',u:'Best for: lo-fi, moody b-roll, storytelling, music visualizers, night vlogs.',f(c,u,w,h){const ph=u*TAU;
let g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#05070f');g.addColorStop(1,'#0b0610');c.fillStyle=g;c.fillRect(0,0,w,h);
c.globalCompositeOperation=L;bok.forEach(b=>{const x=mod(b.x+b.k*u*.0+sn(ph*b.w+b.p)*.01)*w,y=b.y*h,r=b.r*h*(1+.06*sn(ph*b.w+b.p)),a=.5+.5*sn(ph*b.w+b.p*2);const gr=c.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,`hsla(${b.h},90%,55%,${.1+.1*a})`);gr.addColorStop(.8,`hsla(${b.h},90%,55%,${.18+.12*a})`);gr.addColorStop(.95,`hsla(${b.h},95%,70%,${.4+.2*a})`);gr.addColorStop(1,`hsla(${b.h},95%,70%,0)`);c.fillStyle=gr;c.beginPath();c.arc(x,y,r,0,TAU);c.fill()});
c.globalCompositeOperation=N;dropS.forEach(d=>{const x=d.x*w,y=d.y*h;c.fillStyle='rgba(10,14,25,.35)';c.beginPath();c.arc(x,y,d.r,0,TAU);c.fill();c.strokeStyle='rgba(180,200,255,.25)';c.lineWidth=1;c.stroke();c.fillStyle='rgba(255,255,255,.55)';c.beginPath();c.arc(x-d.r*.35,y-d.r*.35,d.r*.25,0,TAU);c.fill()});
dropR.forEach(d=>{const y=mod(d.y+d.k*u)*(h+60)-30,x=(d.x+sn(ph*3+d.p)*.003)*w;const tg=c.createLinearGradient(0,y-d.l,0,y);tg.addColorStop(0,'rgba(190,210,255,0)');tg.addColorStop(1,'rgba(190,210,255,.35)');c.strokeStyle=tg;c.lineWidth=2.2;c.beginPath();c.moveTo(x,y-d.l);c.lineTo(x,y);c.stroke();c.fillStyle='rgba(12,18,32,.55)';c.beginPath();c.ellipse(x,y,4.5,6,0,0,TAU);c.fill();c.strokeStyle='rgba(200,220,255,.6)';c.stroke();c.fillStyle='#fff';c.beginPath();c.arc(x-1.3,y-2,1.3,0,TAU);c.fill()})}},

{t:'Firework bouquet with rocket trails',p:8,d:'Five staggered shells: rising rocket with spark trail, white flash, glittering sphere burst with gravity droop, per-star twinkle, fading smoke glow. Every shell has its own hue.',u:'Best for: New Year, celebration, 4th of July, countdown, event intros. Sells all year at stock sites.',f(c,u,w,h){const G=h*.28;c.globalCompositeOperation=L;
fw.forEach((b,bi)=>{const bx=b.x*w,by=b.y*h,ra=mod(u-(b.o-.12))/.12;if(ra<1){const e=1-pw(1-ra,2);for(let j=0;j<8;j++){const rj=Math.max(0,ra-j*.03),ej=1-pw(1-rj,2),y=h-(h-by)*ej,x=bx+sn(rj*9)*3;c.fillStyle=`rgba(255,200,120,${(1-j/8)*.8})`;c.beginPath();c.arc(x,y,2.4-j*.2,0,TAU);c.fill()}}
const a=mod(u-b.o)/.4;if(a<1){if(a<.12)glow(c,bx,by,h*.35*(1-a/.12),'45,100%,85%',.9*(1-a/.12));glow(c,bx,by,h*.45,`${b.h},70%,50%`,.12*(1-a));
for(let i=0;i<b.n;i++){const an=i/b.n*TAU+bi,v=h*b.sz*(1.6+.9*Math.abs(sn(i*12.9))),tw=.55+.45*sn(i*5+a*45);for(let j=0;j<6;j++){const aa=a-j*.016;if(aa<0)break;const e=1-Math.exp(-4.2*aa),x=bx+cs_(an)*v*e,y=by+sn(an)*v*e+G*aa*aa*2.2,al=pw(1-a,1.1)*(1-j/6)*tw;c.fillStyle=`hsla(${b.h+(i%3)*22},100%,${j?60:85}%,${al})`;c.beginPath();c.arc(x,y,(j?1.5:2.2)*(1-a*.5),0,TAU);c.fill()}}}})}},

{t:'Gold foil confetti shower',p:8,d:'150 rectangular foil pieces that tumble in 3D: each flips edge-on, catches the light with a white glint when it faces the lens, and has its own size and depth with softer far pieces.',u:'Best for: celebrations, winners, luxury launches, payday, anniversary and award intros.',f(c,u,w,h){const ph=u*TAU;glow(c,w/2,h*.4,h*.8,'40,70%,30%',.2);conf.forEach(p=>{const x=(p.x+sn(ph*p.w+p.p)*.03)*w,y=mod(p.y+p.k*u)*(h+40)-20,fl=cs_(ph*p.f+p.p),ab=Math.abs(fl),gl=pw(ab,10);c.save();c.translate(x,y);c.rotate(p.rt+ph*p.w*.0+sn(ph*p.w+p.p)*.9);c.scale(1,fl);const W=11*p.z,H=6.5*p.z;c.fillStyle=`hsla(${fl>0?43:36},${85-gl*55}%,${28+ab*38+gl*34}%,${.55+.4*p.z/1.4})`;c.fillRect(-W/2,-H/2,W,H);c.fillStyle=`rgba(255,250,220,${gl*.7})`;c.fillRect(-W/2,-H/2,W*.35,H);c.restore();if(gl>.75){c.globalCompositeOperation=L;c.strokeStyle=`rgba(255,244,200,${(gl-.75)*3})`;c.lineWidth=1;c.beginPath();c.moveTo(x-8*p.z,y);c.lineTo(x+8*p.z,y);c.moveTo(x,y-8*p.z);c.lineTo(x,y+8*p.z);c.stroke();c.globalCompositeOperation=N}})}},

{t:'Brilliant-cut diamond, top view',p:8,d:'25 facets (table, star, kite, girdle) with colour dispersion that flashes through the spectrum as the stone turns and white edge lines.',u:'Best for: jewelry ads, luxury brands, wedding, premium reveal and logo-sting backgrounds.',f(c,u,w,h){const ph=u*TAU,cx=w/2,cy=h/2,Rg=h*.37,rot=ph/8;glow(c,cx,cy,Rg*1.7,'215,80%,55%',.2);
const P=(r,a)=>[cx+cs_(a+rot)*r*Rg,cy+sn(a+rot)*r*Rg],S=TAU/8,T=k=>P(.42,k*S),M=k=>P(.72,(k+.5)*S),O=k=>P(1,k*S);
const fac=[],add=(pts,ac,ty)=>fac.push([pts,ac,ty]);
for(let k=0;k<8;k++){add([T(k),T(k+1),M(k)],(k+.5)*S,0);add([T(k),M(k-1),O(k),M(k)],k*S,1);add([M(k),O(k),O(k+1)],(k+.5)*S,2)}
c.globalCompositeOperation=N;const fl=[];
fac.forEach(([pts,ac,ty])=>{const Lt=pw(Math.max(0,sn(ac*3+ph*(1+ty)+ty*2)),3),hu=(ac*57.3*2+ph*57.3*3+ty*70)%360;c.fillStyle=`hsl(${hu},${60+Lt*35}%,${7+Lt*62}%)`;c.strokeStyle='rgba(255,255,255,.22)';c.lineWidth=.8;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();c.stroke();if(Lt>.72){const q=pts.reduce((s,p)=>[s[0]+p[0]/pts.length,s[1]+p[1]/pts.length],[0,0]);fl.push([q,Lt])}});
const tp=[0,1,2,3,4,5,6,7].map(T);let g=c.createLinearGradient(cx-Rg*.4,cy-Rg*.4,cx+Rg*.4,cy+Rg*.4);const sh=.5+.5*sn(ph);g.addColorStop(0,'#6a7596');g.addColorStop(Math.min(.9,.15+sh*.6),'#f4f8ff');g.addColorStop(1,'#3b4262');c.fillStyle=g;c.beginPath();tp.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();c.strokeStyle='rgba(255,255,255,.35)';c.stroke();
}},

{t:'Tactical radar scanner HUD',p:8,d:'Rotating tick ring, three range rings, sweep beam with a fading tail, 8 targets that light up when the beam passes and fade after, tracking labels with bearing and range, corner brackets.',u:'Best for: tech, security, cyber, military-style intros, game UI, data and scan reveals. Alpha version sells well.',f(c,u,w,h){const ph=u*TAU,cx=w/2,cy=h/2,Rr=h*.4,col='hsla(160,100%,60%,';c.globalCompositeOperation=L;c.lineWidth=1;
[.33,.66,1].forEach(k=>{c.strokeStyle=col+'.35)';c.beginPath();c.arc(cx,cy,Rr*k,0,TAU);c.stroke()});c.strokeStyle=col+'.2)';c.beginPath();c.moveTo(cx-Rr*1.12,cy);c.lineTo(cx+Rr*1.12,cy);c.moveTo(cx,cy-Rr*1.12);c.lineTo(cx,cy+Rr*1.12);c.stroke();
for(let i=0;i<72;i++){const a=i/72*TAU+u*TAU/72,l=i%6?5:11;c.strokeStyle=col+(i%6?.4:.85)+')';c.beginPath();c.moveTo(cx+cs_(a)*Rr*1.08,cy+sn(a)*Rr*1.08);c.lineTo(cx+cs_(a)*(Rr*1.08+l),cy+sn(a)*(Rr*1.08+l));c.stroke()}
const ba=ph*2;for(let i=0;i<46;i++){const a=ba-i*.028;c.fillStyle=col+(.28*pw(1-i/46,2))+')';c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,Rr,a-.03,a);c.closePath();c.fill()}
c.strokeStyle=col+'.95)';c.lineWidth=1.6;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+cs_(ba)*Rr,cy+sn(ba)*Rr);c.stroke();
c.font='10px "JetBrains Mono",monospace';blips.forEach(b=>{const age=mod((ba-b.a)/TAU),al=Math.exp(-age*3.2),x=cx+cs_(b.a)*b.d*Rr,y=cy+sn(b.a)*b.d*Rr;glow(c,x,y,14,'160,100%,60%',al*.9);c.fillStyle=`rgba(200,255,235,${.2+al})`;c.fillRect(x-2,y-2,4,4);c.strokeStyle=col+al*.8+')';c.strokeRect(x-8,y-8,16,16);c.fillStyle=col+al+')';c.fillText(`TGT-${b.id}  ${Math.round(b.a/TAU*360)}\u00b0  ${(b.d*9).toFixed(1)}KM`,x+12,y-6)});
const bk=26;c.strokeStyle=col+'.8)';c.lineWidth=2;[[18,18,1,1],[w-18,18,-1,1],[18,h-18,1,-1],[w-18,h-18,-1,-1]].forEach(([x,y,sx,sy])=>{c.beginPath();c.moveTo(x,y+sy*bk);c.lineTo(x,y);c.lineTo(x+sx*bk,y);c.stroke()})}},

{t:'Glowing candlestick chart, scrolling',p:12,d:'24 candles with wicks, a glowing gold moving-average line, volume bars, price grid with axis labels, and a live price tag. Scrolls one full cycle per loop with no jump.',u:'Best for: finance, crypto, trading, markets news, investment explainers and backgrounds.',f(c,u,w,h){const W=w*.9,cw=W/NC,sh=u*NC,fi=Math.floor(sh),fr=sh-fi,Y=v=>h*(.86-v*.78);c.font='10px "JetBrains Mono",monospace';
for(let i=0;i<=5;i++){const y=h*(.1+i*.15);c.strokeStyle='rgba(120,150,200,.14)';c.lineWidth=1;c.beginPath();c.moveTo(0,y);c.lineTo(W,y);c.stroke();c.fillStyle='rgba(140,170,220,.6)';c.fillText((1400-i*60).toFixed(2),W+8,y+3)}
c.globalCompositeOperation=N;const pts=[];for(let i=-1;i<=NC+1;i++){const k=((i+fi)%NC+NC)%NC,x=(i-fr)*cw+cw/2,o=cl(k-1),cc=cl(k),up=cc>=o,hi=Math.max(o,cc)+wk1[k]*.05,lo=Math.min(o,cc)-wk2[k]*.05,col=up?'60,230,140':'255,80,100';if(x>-cw&&x<W+cw){c.fillStyle=`rgba(${col},.18)`;c.fillRect(x-cw*.3,h*.97-vol[k]*h*.1,cw*.6,vol[k]*h*.1);c.strokeStyle=`rgb(${col})`;c.lineWidth=1.4;c.beginPath();c.moveTo(x,Y(hi));c.lineTo(x,Y(lo));c.stroke();c.shadowColor=`rgb(${col})`;c.shadowBlur=10;c.fillStyle=`rgb(${col})`;c.fillRect(x-cw*.3,Y(Math.max(o,cc)),cw*.6,Math.max(2,Math.abs(Y(o)-Y(cc))));c.shadowBlur=0}
pts.push([x,Y((cl(k-2)+cl(k-1)+cl(k)+cl(k+1))/4)])}
c.strokeStyle='#f2c46b';c.lineWidth=2.4;c.shadowColor='#f2c46b';c.shadowBlur=14;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();c.shadowBlur=0;
const lk=cl(NC-1+fi+(fr>.5?1:0)),ly=Y(lk);c.strokeStyle='rgba(255,255,255,.5)';c.setLineDash([4,4]);c.beginPath();c.moveTo(0,ly);c.lineTo(W,ly);c.stroke();c.setLineDash([]);c.fillStyle='#f2c46b';c.fillRect(W+2,ly-8,w-W-4,16);c.fillStyle='#000';c.fillText((1000+lk*450).toFixed(2),W+6,ly+3)}},

{t:'Plasma globe with lightning tendrils',p:8,d:'Dark glass sphere with inner violet haze, 9 jagged tendrils that flicker 12 times a second and rotate, white-hot cores with purple halos, a bright electrode, and a glass reflection arc.',u:'Best for: science, energy, electric, tech intros, power and storm themes, thumbnails and transitions.',f(c,u,w,h){const ph=u*TAU,cx=w/2,cy=h*.46,Rp=h*.36;
c.globalCompositeOperation=N;let g=c.createRadialGradient(cx,cy,0,cx,cy,Rp);g.addColorStop(0,'rgba(120,40,200,.35)');g.addColorStop(.8,'rgba(40,10,90,.35)');g.addColorStop(1,'rgba(20,5,40,.7)');c.fillStyle=g;c.beginPath();c.arc(cx,cy,Rp,0,TAU);c.fill();
c.globalCompositeOperation=L;glow(c,cx,cy,Rp*1.3,'275,90%,50%',.22);
const fr=Math.floor(u*72);for(let i=0;i<9;i++){const r=rng(i*977+fr*13),ang=i*TAU/9+ph/9+sn(ph*2+i)*.1,pts=[[cx,cy]],seg=16;let off=0;for(let s=1;s<=seg;s++){const d=s/seg*Rp*.97;off+=(r()-.5)*Rp*.1;const tx=cx+cs_(ang)*d-sn(ang)*off*(s/seg),ty=cy+sn(ang)*d+cs_(ang)*off*(s/seg);pts.push([tx,ty])}
[[7,'rgba(150,60,255,.12)'],[3.2,'rgba(190,120,255,.4)'],[1.2,'rgba(255,255,255,.95)']].forEach(([lw,col])=>{c.strokeStyle=col;c.lineWidth=lw;c.lineJoin='round';c.beginPath();pts.forEach((p,k)=>k?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke()});const e=pts[seg];glow(c,e[0],e[1],18,'285,100%,75%',.7)}
glow(c,cx,cy,Rp*.2,'280,100%,80%',.95);c.fillStyle='#fff';c.beginPath();c.arc(cx,cy,5,0,TAU);c.fill();
c.strokeStyle='rgba(255,255,255,.28)';c.lineWidth=3;c.beginPath();c.arc(cx,cy,Rp*.93,Math.PI*1.08,Math.PI*1.38);c.stroke();c.strokeStyle='rgba(180,140,255,.5)';c.lineWidth=2;c.beginPath();c.arc(cx,cy,Rp,0,TAU);c.stroke();
c.globalCompositeOperation=N;c.fillStyle='#0a0710';c.beginPath();c.moveTo(cx-Rp*.28,h);c.lineTo(cx-Rp*.14,cy+Rp*.98);c.lineTo(cx+Rp*.14,cy+Rp*.98);c.lineTo(cx+Rp*.28,h);c.fill()}},

{t:'Golden sacred-geometry mandala',p:8,d:'Six counter-rotating layers of petals (8 to 28 per ring), a dotted pulse ring, a glowing core, and hairline gold strokes with additive blending for a gilded light-on-black look.',u:'Best for: yoga, spiritual, luxury, meditation, Ramadan and Diwali style content, calm title backgrounds.',f(c,u,w,h){const ph=u*TAU,cx=w/2,cy=h/2,Rm=h*.46;c.globalCompositeOperation=L;glow(c,cx,cy,Rm*1.1,'40,80%,45%',.25+.06*sn(ph));
for(let l=0;l<6;l++){const n=8+l*4,dir=l%2?-1:1,rr=Rm*(.18+l*.16),pl=Rm*(.1+l*.035);c.strokeStyle=`hsla(${40+l*3},85%,${58+l*4}%,${.55+.1*sn(ph+l)})`;c.lineWidth=1.1;for(let k=0;k<n;k++){const a=k/n*TAU+dir*ph/n;c.save();c.translate(cx+cs_(a)*rr,cy+sn(a)*rr);c.rotate(a);c.beginPath();c.ellipse(0,0,pl*1.45,pl*.5,0,0,TAU);c.stroke();c.beginPath();c.moveTo(-pl*1.45,0);c.lineTo(pl*1.45,0);c.stroke();c.restore()}c.beginPath();c.arc(cx,cy,rr,0,TAU);c.strokeStyle=`hsla(42,80%,60%,.18)`;c.stroke()}
for(let k=0;k<72;k++){const a=k/72*TAU,s=.5+.5*sn(ph-a*2),r=Rm*1.04;c.fillStyle=`rgba(255,215,130,${.2+.6*s})`;c.beginPath();c.arc(cx+cs_(a)*r,cy+sn(a)*r,1+1.6*s,0,TAU);c.fill()}
glow(c,cx,cy,Rm*.16,'45,100%,75%',.9);c.fillStyle='#fff6d6';c.beginPath();c.arc(cx,cy,3.5,0,TAU);c.fill()}}
];


return clips.filter(x=>!REMOVE.includes(x.t));
};
