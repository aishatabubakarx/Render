import bpy, bmesh, math, random
random.seed(4)
from mathutils import Vector
PI=math.pi
def shade(o):
    if o.type=='MESH':
        for p in o.data.polygons: p.use_smooth=True
def put(o,m):
    if m is not None:
        o.data.materials.clear(); o.data.materials.append(m)
    return o
def cyl(name,r,h,loc=(0,0,0),m=None,v=64,rot=(0,0,0)):
    bpy.ops.mesh.primitive_cylinder_add(vertices=v,radius=r,depth=h,location=loc,rotation=rot); o=bpy.context.object; o.name=name; shade(o); return put(o,m)
def cone(name,r1,r2,h,loc=(0,0,0),m=None,v=64,rot=(0,0,0)):
    bpy.ops.mesh.primitive_cone_add(vertices=v,radius1=r1,radius2=r2,depth=h,location=loc,rotation=rot); o=bpy.context.object; o.name=name; shade(o); return put(o,m)
def box(name,s,loc=(0,0,0),m=None,bev=0.0,rot=(0,0,0)):
    bpy.ops.mesh.primitive_cube_add(size=1,location=loc,rotation=rot); o=bpy.context.object; o.name=name; o.scale=s
    bpy.ops.object.transform_apply(scale=True)
    if bev:
        md=o.modifiers.new('bev','BEVEL'); md.width=bev; md.segments=4
    shade(o); return put(o,m)
def uv(name,r,loc=(0,0,0),m=None,sc=(1,1,1),seg=32,ring=16):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg,ring_count=ring,radius=r,location=loc); o=bpy.context.object; o.name=name; o.scale=sc; shade(o); return put(o,m)
def torus(name,R,r,loc=(0,0,0),m=None,rot=(0,0,0),ms=64,mn=24):
    bpy.ops.mesh.primitive_torus_add(major_radius=R,minor_radius=r,major_segments=ms,minor_segments=mn,location=loc,rotation=rot); o=bpy.context.object; o.name=name; shade(o); return put(o,m)
def plane(name,s,loc=(0,0,0),m=None,rot=(0,0,0)):
    bpy.ops.mesh.primitive_plane_add(size=s,location=loc,rotation=rot); o=bpy.context.object; o.name=name; return put(o,m)
def empty(name,loc=(0,0,0)):
    o=bpy.data.objects.new(name,None); bpy.context.scene.collection.objects.link(o); o.location=loc; return o
def adopt(o,p):
    bpy.context.view_layer.update()
    o.parent=p; o.matrix_parent_inverse=p.matrix_world.inverted(); return o
def kid(o,p):
    o.parent=p; return o
def tube(name,pts,r,m,res=10,smooth=True):
    cu=bpy.data.curves.new(name,'CURVE'); cu.dimensions='3D'; cu.bevel_depth=r; cu.bevel_resolution=res; cu.use_fill_caps=True
    sp=cu.splines.new('POLY'); sp.points.add(len(pts)-1)
    for i,p in enumerate(pts): sp.points[i].co=(p[0],p[1],p[2],1)
    o=bpy.data.objects.new(name,cu); bpy.context.scene.collection.objects.link(o); o.data.materials.append(m); return o
def text(name,s,size,m,loc=(0,0,0),rot=(PI/2,0,0),ext=.05):
    bpy.ops.object.text_add(location=loc,rotation=rot); o=bpy.context.object; o.name=name; o.data.body=s; o.data.size=size; o.data.extrude=ext
    o.data.align_x='CENTER'; o.data.align_y='CENTER'; o.data.bevel_depth=.01; o.data.materials.append(m); return o
def rupee_pts(sz,x0=0,z0=0,y=0):
    s=[]
    s.append([(-.4,-.5),(.4,-.5)]); s.append([(-.4,-.2),(.4,-.2)])
    bz=[]
    for k in range(13):
        t=k/12; P0=(-.4,-.5);P1=(.45,-.5);P2=(.45,.12);P3=(-.4,.12)
        bz.append(tuple((1-t)**3*P0[i]+3*(1-t)**2*t*P1[i]+3*(1-t)*t*t*P2[i]+t**3*P3[i] for i in range(2)))
    bz.append((.35,.6)); s.append(bz)
    return [[(x0+px*sz,y,z0-py*sz) for (px,py) in sp] for sp in s]
def ease_out_back(u,k=1.7):
    u=max(0,min(1,u)); c3=k+1; return 1+c3*(u-1)**3+k*(u-1)**2
def studio(bl,bg=(0.9,0.92,0.96,1),st=1.0):
    bl.world(bg,st)

def setup(bl):
    global PODS,LEAF
    bl.world((.06,.1,.03,1),.5)
    bark=bl.mat('bark',(.2,.12,.07,1),rough=.8); bl.noise_color_ramp(bark,scale=6,detail=6,stops=((0,(.12,.07,.04,1)),(1,(.3,.2,.12,1))),bump=.5)
    pod=bl.mat('pod',(.5,.32,.18,1),rough=.55); bl.noise_color_ramp(pod,scale=18,detail=8,stops=((0,(.34,.2,.1,1)),(1,(.62,.42,.25,1))),bump=.7)
    leaf=bl.mat('leaf',(.25,.6,.15,1),rough=.4); bl.noise_color_ramp(leaf,scale=14,detail=4,stops=((0,(.12,.4,.08,1)),(1,(.35,.7,.2,1))))
    bok=[bl.mat('bk%d'%i,(1,1,1,1),emit=c,emit_strength=.9) for i,c in enumerate([(.9,.85,.35,1),(.5,.85,.3,1),(1,.7,.25,1)])]
    br=[(-6,0,3.4),(-3,0,3.0),(0,0,3.3),(3,0,2.9),(6,0,3.3)]; tube('branch',br,.16,bark,res=12)
    R=random.Random(7); PODS=[]; LEAF=[]
    for i in range(7):
        x=-5+i*1.7+R.uniform(-.2,.2); top=(x,0,3.1+.05*math.sin(i)); piv=empty('piv%d'%i,top)
        L=R.uniform(2.2,3.0); pts=[(0,0,0),(.05,0,-.4),(.18,0,-L*.4),(.28,0,-L*.7),(.18,0,-L)]
        c=tube('pod%d'%i,pts,.2,pod,res=10); c.data.bevel_depth=.2; kid(c,piv)
        for k in range(8):
            ob=uv('bump',.2,(pts[min(4,k//2)][0]+0,0,-L*k/8-.1),pod,sc=(1,1,.6)); ob.parent=piv
        PODS.append((piv,R.uniform(0,6.28)))
    for j in range(26):
        x=R.uniform(-6.2,6.2); z=3.1+R.uniform(-.1,.15); lf=empty('lf',(x,R.uniform(-.2,.2),z)); lf.rotation_euler=(0,0,R.uniform(-.5,.5))
        for q in range(6):
            m=uv('leaflet',.3,(q*.18,0,0),leaf,sc=(.9,.5,.06),seg=16,ring=8); m.rotation_euler=(0,0,0); kid(m,lf); m.location=(.22+q*.2,(.0),0.0)
            m2=uv('leaflet2',.28,(0,0,0),leaf,sc=(.9,.5,.06),seg=16,ring=8); kid(m2,lf); m2.location=(-.22-q*.2,0,0); m2.rotation_euler=(0,0,PI)
        lf.rotation_euler[1]=R.uniform(-.6,.6); LEAF.append((lf,R.uniform(0,6.28),lf.rotation_euler[1]))
    for k in range(60):
        uv('bokeh',R.uniform(.25,.6),(R.uniform(-14,14),R.uniform(8,16),R.uniform(-4,8)),bok[k%3],seg=16,ring=8)
    bl.light('SUN',(5,-6,8),energy=4,size=4,color=(1,.95,.8),target=(0,0,0)); bl.light('AREA',(-6,-6,3),energy=500,size=6,color=(.8,1,.7),target=(0,0,0))
    bl.camera((0,-12.5,2.0),(0,0,1.8),lens=45,dof_dist=12.5,fstop=2.4)
def frame(bl,t,dur):
    u=t/dur
    for p,ph in PODS: p.rotation_euler[1]=.14*math.sin(2*PI*3*u+ph)
    for l,ph,b in LEAF: l.rotation_euler[1]=b+.12*math.sin(2*PI*5*u+ph)
