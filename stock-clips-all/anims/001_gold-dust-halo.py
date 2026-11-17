import numpy as np, cv2, sys, math
D=15.0
def sm(x): x=np.clip(x,0,1); return x*x*(3-2*x)
def head_theta(t):
    u=np.clip((t-1.0)/5.5,0,1); e=1-(1-u)**1.7
    return -2.2+2*math.pi*1.06*e
def build(seed=11):
    r=np.random.default_rng(seed); P=[]
    def grp(n,size,amp,Lb,fq,q,flare,b,pop=False):
        th=head_theta(np.minimum(b,6.5))
        if pop: th=-2.2+(th+2.2)*r.uniform(0,1,n)
        P.append(dict(n=n,b=b,th=th,size=size,amp=amp,Lb=Lb,fq=fq,q=q,fl=flare,
            off=r.normal(0,1,(n,2)),sp=np.abs(r.normal(0,1,n))*r.uniform(0,1,n)**.5,ang=r.uniform(0,2*math.pi,n),
            ph=r.uniform(0,2*math.pi,n),tp=r.uniform(0,2*math.pi,(n,2)),tf=r.uniform(.2,.7,(n,2)),rn=r.normal(0,1,n)))
    n=40000; grp(n,r.uniform(.55,1.0,n),.32,r.uniform(4,10,n),r.uniform(.3,1.2,n),1.6,np.zeros(n,bool),r.uniform(1,6.5,n))
    n=10000; grp(n,r.uniform(.9,2.0,n),.95,r.uniform(3,8,n),r.uniform(.8,3,n),2.5,np.zeros(n,bool),r.uniform(1,6.5,n))
    n=800; grp(n,r.uniform(1.6,3.2,n),2.2,r.uniform(3,7,n),r.uniform(2.5,7,n),4,np.ones(n,bool),r.uniform(1,6.5,n))
    n=7000; b=r.uniform(2,10.5,n); grp(n,r.uniform(1.0,2.6,n),2.6,r.uniform(.3,.9,n),r.uniform(0,1,n),1,r.uniform(0,1,n)<.35,b,True)
    return P
def render(P,t,W,H):
    s=H/1080.; C=np.array([W/2,H*.5]); R=H*.345; k=.58; rot=math.radians(-14); cr,sr=math.cos(rot),math.sin(rot)
    zoom=1+.045*t/D; lift=max(0,t-10.3)
    g=1-sm((t-11.3)/3.4)
    S=np.zeros((3,H*W),np.float32); B=np.zeros((3,H*W),np.float32); F=np.zeros((3,H*W),np.float32)
    def splat(img,x,y,w):
        x0=np.floor(x).astype(np.int64); y0=np.floor(y).astype(np.int64); fx=x-x0; fy=y-y0
        for dx,dy,ww in((0,0,(1-fx)*(1-fy)),(1,0,fx*(1-fy)),(0,1,(1-fx)*fy),(1,1,fx*fy)):
            xi=x0+dx; yi=y0+dy; ok=(xi>=0)&(xi<W)&(yi>=0)&(yi<H); idx=yi[ok]*W+xi[ok]
            for c in range(3): img[c]+=np.bincount(idx,weights=w[ok,c]*ww[ok],minlength=W*H).astype(np.float32)
    def pos(p,m,tt):
        tau=tt-p['b'][m]; th=p['th'][m]; df=np.sin(th)
        rr=R*(1+.012*p['rn'][m]); x=rr*np.cos(th); y=rr*k*np.sin(th)
        spread=(5+13*np.minimum(p['sp'][m],2))*s
        x=x+p['off'][m,0]*spread*.6; y=y+p['off'][m,1]*spread*.6
        x,y=x*cr-y*sr,x*sr+y*cr
        w=.032*tau; ca,sa=np.cos(w),np.sin(w); x,y=x*ca-y*sa,x*sa+y*ca
        v=p['sp'][m]*16*s; x=x+np.cos(p['ang'][m])*v*tau; y=y+np.sin(p['ang'][m])*v*tau-9*s*tau
        x=x+3.2*s*np.sin(2*math.pi*p['tf'][m,0]*tt+p['tp'][m,0]); y=y+3.2*s*np.sin(2*math.pi*p['tf'][m,1]*tt+p['tp'][m,1])
        y=y-70*s*lift**2
        x=x*zoom; y=y*zoom
        return C[0]+x,C[1]+y,tau,df
    colcache=lambda tau:(lambda c:np.stack([1.0-.2*np.clip(c*2-1,0,1)*1.0,.86-.2*np.clip(c*2,0,1)-.26*np.clip(c*2-1,0,1),.52-.3*np.clip(c*2,0,1)-.14*np.clip(c*2-1,0,1)],1))(np.clip(tau/3.2,0,1))
    for p in P:
        m=np.where(p['b']<t)[0]
        if len(m)==0: continue
        X=[];Y=[];Wt=[]
        for j,wj in((0,1.0),(1,.6),(2,.35)):
            x,y,tau,df=pos(p,m,t-j*.012)
            hot=np.exp(-tau/.2)*1.1+np.exp(-tau/.8)*.22
            tw=(.5+.5*np.sin(2*math.pi*p['fq'][m]*t+p['ph'][m]))**p['q']
            body=p['amp']*np.exp(-tau/p['Lb'][m])*(.25+.75*tw)*np.minimum(1,tau*8)
            I=(hot+body*1.0)*g*(1+.3*df)*(p['size'][m]**1.6)*(.8 if p['amp']<.5 else 1)
            if p['amp']>2: I=I*(.35+.65*tw*1.3)
            col=colcache(tau)*I[:,None]*wj/ (1.8 if j==0 else 1)*.55
            col[:,0]*=1;
            X.append(x);Y.append(y);Wt.append(col)
        X=np.concatenate(X);Y=np.concatenate(Y);Wt=np.concatenate(Wt)
        big=np.tile(p['size'][m]>1.4,3)
        splat(S,X[~big],Y[~big],Wt[~big]); 
        if big.any(): splat(B,X[big],Y[big],Wt[big])
        if p['fl'].any():
            ff=np.tile(p['fl'][m],3)&(Wt.sum(1)>.5)
            if ff.any(): splat(F,X[ff],Y[ff],Wt[ff]*1.2)
    # comet head
    u=np.clip((t-1.0)/5.5,0,1)
    if 0<u<1 or (t>1 and t<7.3):
        hv=lambda tt:head_theta(tt)
        for j in range(8):
            tt=t-j*.004; th=hv(tt); x=R*np.cos(th); y=R*k*np.sin(th); x,y=x*cr-y*sr,x*sr+y*cr
            a=np.clip((6.9-tt)/.5,0,1)*np.clip((tt-1)/.3,0,1)*g
            hx=np.array([C[0]+x*zoom]);hy=np.array([C[1]+y*zoom])
            splat(B,hx,hy,np.array([[1.0,.92,.7]])*5*a*(1-j/10)); splat(F,hx,hy,np.array([[1.0,.85,.5]])*12*a*(1-j/10))
    S=S.reshape(3,H,W).transpose(1,2,0); B=B.reshape(3,H,W).transpose(1,2,0); F=F.reshape(3,H,W).transpose(1,2,0)
    S=cv2.GaussianBlur(S,(0,0),.75*s+.15); B=cv2.GaussianBlur(B,(0,0),1.5*s+.2)
    Fl=cv2.GaussianBlur(F,(int(60*s)|1,1),0)+cv2.GaussianBlur(F,(1,int(60*s)|1),0)
    Fl=Fl*.9+cv2.GaussianBlur(F,(0,0),2*s)*.8
    base=S+B*1.0
    def bl(img,sg):
        sm_=cv2.resize(img,(W//4,H//4),interpolation=cv2.INTER_AREA); sm_=cv2.GaussianBlur(sm_,(0,0),sg*s/4); return cv2.resize(sm_,(W,H),interpolation=cv2.INTER_LINEAR)
    bloom=.55*cv2.GaussianBlur(base,(0,0),4*s)+.5*bl(base,14)+.45*bl(base,38)+.35*bl(base,100)
    x=base+Fl+bloom*1.0
    out=1-np.exp(-x*1.55)
    out=out**(1/1.05)
    rng=np.random.default_rng(int(t*1000)); out=out+rng.normal(0,.6/255,out.shape).astype(np.float32)
    return (np.clip(out,0,1)*255).astype(np.uint8)[:,:,::-1].copy()

# ---- adapter used by render.py ----
def setup():
    return build()
def frame(P, t, W, H):
    return render(P, t, W, H)[:, :, ::-1].copy()   # BGR -> RGB
