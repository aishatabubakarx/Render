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
    global NEEDLE,GO
    bl.world((0.85,0.1,0.08,1),1.0)
    wh=bl.mat('wh',(.97,.97,.97,1),rough=.2,coat=1.0); cream=bl.mat('cr',(1,.98,.94,1),rough=.5); red=bl.mat('rd',(.85,.08,.08,1),rough=.2,coat=1.0); dark=bl.mat('dk',(.1,.1,.12,1),rough=.4)
    back=bl.mat('back',(.82,.07,.07,1),rough=.8); plane('back',60,(0,3,0),back,rot=(PI/2,0,0))
    cyl('body',1.7,.7,(0,0,0),wh,rot=(PI/2,0,0)); cyl('face',1.45,.08,(0,-.36,0),cream,rot=(PI/2,0,0)); torus('bez',1.55,.12,(0,-.34,0),wh,rot=(PI/2,0,0))
    cyl('crown',.24,.6,(0,0,2.0),wh); cyl('btn',.32,.3,(0,0,2.4),wh); cyl('btn2',.2,.4,(1.2,0,1.4),wh,rot=(0,.75,0))
    for i in range(60):
        a=2*PI*i/60; L=.2 if i%5==0 else .1; box('t',(.04 if i%5 else .07,.03,L),(math.sin(a)*1.3,-.42,math.cos(a)*1.3),dark,rot=(0,-a,0))
    NEEDLE=empty('nd',(0,-.45,0)); adopt(box('needle',(.05,.03,1.25),(0,-.47,.5),red),NEEDLE); adopt(box('tail',(.05,.03,.3),(0,-.47,-.15),red),NEEDLE); cyl('hub',.1,.06,(0,-.47,0),red,rot=(PI/2,0,0))
    GO=text('GO','GO',.62,red,(0,-.5,-.62),ext=.05)
    bl.light('AREA',(-4,-8,5),energy=1600,size=6,target=(0,0,0)); bl.light('AREA',(6,-6,-1),energy=500,size=5,target=(0,0,0))
    bl.camera((1.2,-10,.6),(0,0,.25),lens=60)
def frame(bl,t,dur):
    u=min(1,t/3.4); ang=-2*PI*6*(1-(1-u)**3)
    NEEDLE.rotation_euler[1]=ang
    s=max(0.001,ease_out_back((t-3.6)/.7)) if t>=3.6 else 0.001
    GO.scale=(s,s,s)
