window.init=async(id,scale)=>{S=scale||1;cv.width=W*S;cv.height=H*S;ctx=cv.getContext('2d',{alpha:false});C[id]();return 'ok'};
window.renderAt=ms=>{tl.seek(ms/1000,false);ctx.setTransform(S,0,0,S,0,0);draw();if(!C.noDither)dither();return cv.toDataURL('image/png').slice(22)};
