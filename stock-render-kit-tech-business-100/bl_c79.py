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
    global MD,LB
    bl.world((.9,.93,.96,1),1.0)
    def skin(name,c,sub=.35):
        m=bl.mat(name,c,rough=.45,coat=.3); b=m.node_tree.nodes['Principled BSDF']
        for k in ('Subsurface Weight',):
            if k in b.inputs: b.inputs[k].default_value=sub
        if 'Subsurface Radius' in b.inputs: b.inputs['Subsurface Radius'].default_value=(1,.3,.3)
        return m
    pink=skin('pink',(.9,.45,.55,1)); pink2=skin('pink2',(.85,.38,.5,1)); ov=skin('ov',(.95,.75,.65,1),.2)
    txt=bl.mat('txt',(.15,.21,.29,1),rough=.6); back=bl.mat('back',(.9,.93,.96,1),rough=.9); plane('back',60,(0,4,0),back,rot=(PI/2,0,0))
    MD=empty('md',(0,0,0))
    adopt(uv('uterus',1.0,(0,0,.1),pink,sc=(.95,.62,1.25),seg=64,ring=32),MD)
    adopt(cone('cervix',.34,.26,1.0,(0,0,-1.55),pink2,v=48),MD); adopt(uv('cerv',.34,(0,0,-1.1),pink2,sc=(1,1,.9)),MD)
    for sx in (-1,1):
        pts=[(sx*.7,0,.85),(sx*1.5,0,1.15),(sx*2.4,0,1.0),(sx*3.0,0,.55),(sx*3.15,0,.1)]
        adopt(tube('tube',pts,.12,pink2,res=10),MD)
        adopt(uv('amp',.2,(sx*3.15,0,.1),pink2),MD)
        for k in range(6):
            a=k/6*2*PI; adopt(uv('fim',.09,(sx*3.15+math.cos(a)*.25,math.sin(a)*.25,-.08+math.sin(a)*.04),pink,sc=(1,1,2.0)),MD)
        adopt(uv('ovary',.52,(sx*3.0,0,-.85),ov,sc=(.9,.7,1.15)),MD)
        adopt(tube('lig',[(sx*.95,0,.2),(sx*2.2,0,-.4),(sx*2.85,0,-.8)],.05,pink2,res=8),MD)
    LB=[]
    for i,(s,x,z,lx,lz) in enumerate([('Uterus',0,1.2,-4.6,2.6),('Fallopian tube',2.4,1.0,4.6,2.8),('Ovary',3.0,-.85,4.6,-2.2),('Cervix',0,-1.5,-4.6,-2.6)]):
        tx=lx; o=text('lab'+s,s,.6,txt,(tx,-1.2,lz),ext=.03)
        ld=tube('lead'+s,[(tx*.62,-1.2,lz),(x*.9,-1.2,z)],.015,txt,res=4)
        LB.append((o,ld,i))
    bl.light('AREA',(-5,-8,6),energy=1800,size=7,target=(0,0,0)); bl.light('AREA',(6,-5,-2),energy=600,size=6,target=(0,0,0))
    bl.camera((0,-22,.3),(0,0,0),lens=60)
def frame(bl,t,dur):
    u=t/dur; MD.rotation_euler[2]=.6*math.sin(2*PI*u)
    for o,ld,i in LB:
        s=max(.001,min(1,(t-1.0-i*.5)/.8)); s=s*s*(3-2*s)
        o.scale=(s,s,s); ld.scale=(s,s,s)
