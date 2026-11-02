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
    global BODY,SEC,MIN,HAM
    bl.world((0.85,0.87,0.91,1),1.0)
    red=bl.mat('red',(.8,.04,.04,1),rough=.12,coat=1.0); white=bl.mat('white',(.97,.97,.97,1),rough=.4)
    gold=bl.mat('gold',(1,.72,.2,1),rough=.2,metal=1.0); chrome=bl.mat('chrome',(.9,.9,.95,1),rough=.1,metal=1.0); dark=bl.mat('dark',(.05,.05,.06,1),rough=.4)
    floor=bl.mat('fl',(.9,.9,.93,1),rough=.7); plane('fl',40,(0,0,-1.75),floor)
    BODY=empty('body'); 
    adopt(uv('body',1.5,(0,0,0),red,sc=(1,.62,1),seg=64,ring=32),BODY)
    adopt(cyl('face',1.28,.06,(0,-.93,0),white,rot=(PI/2,0,0)),BODY)
    adopt(torus('bezel',1.33,.09,(0,-.94,0),chrome,rot=(PI/2,0,0)),BODY)
    for i in range(12):
        a=2*PI*i/12; adopt(box('tk',(.06,.03,.2 if i%3==0 else .12),(math.sin(a)*1.1,-.97,math.cos(a)*1.1),dark,rot=(0,-a,0)),BODY)
    for sx in (-1,1):
        adopt(uv('bell',.58,(sx*.95,0,1.28),chrome,sc=(1,.7,.9)),BODY)
        adopt(cone('leg',.2,.12,.5,(sx*.85,0,-1.55),chrome,rot=(0,sx*.35,0)),BODY)
        adopt(cyl('post',.05,.4,(sx*.55,0,1.0),chrome,v=16),BODY)
    HAM=empty('hampiv',(0,0,1.7)); adopt(HAM,BODY)
    adopt(cyl('rod',.04,.9,(0,0,-.45),chrome,v=12),HAM); h=adopt(uv('hball',.16,(0,0,-.95),chrome),HAM); HAM.matrix_parent_inverse=BODY.matrix_world.inverted()
    for sp in rupee_pts(.52,0,.22,-.98):
        o=tube('rup',sp,.032,gold,res=6); adopt(o,BODY)
    SEC=empty('sec',(0,-1.0,0)); adopt(SEC,BODY); adopt(box('secH',(.025,.02,1.0),(0,-1.02,.4),red),SEC)
    MIN=empty('min',(0,-1.0,0)); adopt(MIN,BODY); adopt(box('minH',(.07,.02,.75),(0,-1.0,.3),dark),MIN)
    adopt(cyl('hub',.09,.08,(0,-1.0,0),dark,rot=(PI/2,0,0)),BODY)
    bl.light('AREA',(-5,-7,6),energy=1400,size=6,target=(0,0,0)); bl.light('AREA',(6,-4,2),energy=500,size=5,target=(0,0,0))
    bl.camera((2.0,-12,1.0),(0,0,0.1),lens=55)
def frame(bl,t,dur):
    u=t/dur
    BODY.rotation_euler=(0,math.sin(2*PI*10*u)*.035,math.sin(2*PI*10*u)*.025)
    HAM.rotation_euler[1]=math.sin(2*PI*30*u)*.22
    SEC.rotation_euler[1]=-2*PI*15*u; MIN.rotation_euler[1]=-2*PI*u
