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
    global JAR
    bl.world((.8,.7,.55,1),.7)
    glass=bl.mat('glass',(1,1,1,1),rough=.02,trans=1.0,ior=1.45)
    wood=bl.mat('wood',(.5,.3,.15,1),rough=.55); bl.noise_color_ramp(wood,scale=5,detail=10,stops=((0,(.28,.15,.07,1)),(1,(.65,.42,.22,1))),bump=.2)
    pep=bl.mat('pep',(.05,.045,.04,1),rough=.6); bl.noise_color_ramp(pep,scale=60,detail=6,stops=((0,(.02,.02,.02,1)),(1,(.14,.11,.08,1))),bump=1.0)
    table=bl.mat('tbl',(.5,.3,.15,1),rough=.5); bl.noise_color_ramp(table,scale=3,detail=12,stops=((0,(.2,.11,.05,1)),(1,(.5,.3,.15,1))),bump=.15)
    plane('table',50,(0,0,-1.9),table)
    JAR=empty('jar',(0,0,0)); R=random.Random(3)
    adopt(cyl('glass',1.25,3.4,(0,0,0),glass,v=96),JAR)
    adopt(cyl('lid',1.3,.55,(0,0,2.0),wood,v=96),JAR); adopt(torus('neck',1.26,.07,(0,0,1.72),glass),JAR)
    n=0
    while n<420:
        x=R.uniform(-1,1);y=R.uniform(-1,1)
        if x*x+y*y>.78: continue
        z=R.uniform(-1.55,.7-((x*x+y*y)*.3)); adopt(uv('pp',.13,(x,y,z),pep,seg=12,ring=8),JAR); n+=1
    bl.light('AREA',(-6,-6,7),energy=2200,color=(1,.9,.75),size=6,target=(0,0,0)); bl.light('AREA',(6,-3,3),energy=900,color=(1,.95,.9),size=5,target=(0,0,0))
    bl.camera((0,-17,3.4),(0,0,.1),lens=70,dof_dist=17,fstop=3.2)
def frame(bl,t,dur): JAR.rotation_euler[2]=2*PI*t/dur
