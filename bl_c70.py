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
    global TT,NEE
    bl.world((0.9,0.95,0.96,1),1.0)
    steel=bl.mat('steel',(.75,.78,.82,1),rough=.38,metal=1.0); green=bl.mat('green',(.05,.5,.25,1),rough=.25,coat=1.0); brass=bl.mat('brass',(.9,.65,.2,1),rough=.25,metal=1.0)
    white=bl.mat('w',(.97,.97,.97,1),rough=.4); dark=bl.mat('d',(.05,.05,.06,1),rough=.4); red=bl.mat('r',(.9,.1,.1,1),rough=.3)
    fl=bl.mat('fl',(.93,.97,.97,1),rough=.6); plane('fl',60,(0,0,-3.2),fl)
    TT=empty('tt',(0,0,0))
    adopt(cyl('body',.9,4.4,(0,0,-.9),steel,v=96),TT)
    adopt(uv('sh',.9,(0,0,1.3),green,sc=(1,1,.62),seg=96,ring=48),TT)
    adopt(cyl('neck',.26,.5,(0,0,2.0),steel,v=48),TT)
    adopt(cyl('valve',.38,.7,(0,0,2.5),brass,v=48),TT); adopt(cyl('outlet',.14,.7,(.45,0,2.5),brass,v=32,rot=(0,PI/2,0)),TT)
    adopt(torus('hand',.5,.07,(0,0,3.0),dark,rot=(0,0,0)),TT); adopt(cyl('stem',.07,.5,(0,0,2.9),brass,v=16),TT)
    adopt(cyl('gcase',.55,.2,(0,-.55,2.5),brass,rot=(PI/2,0,0),v=48),TT); adopt(cyl('gface',.47,.05,(0,-.67,2.5),white,rot=(PI/2,0,0),v=48),TT)
    NEE=empty('needle',(0,-.7,2.5)); adopt(NEE,TT); adopt(box('n',(.025,.02,.4),(0,0,.17),red),NEE)
    adopt(torus('foot',.95,.1,(0,0,-3.0),dark),TT)
    bl.light('AREA',(-5,-7,6),energy=1800,size=6,target=(0,0,0)); bl.light('AREA',(6,-4,0),energy=700,size=6,target=(0,0,0))
    box('flagL',(.3,2,9),(-5.5,-3,0),bl.mat('fd',(.04,.04,.05,1),rough=.9)); box('flagR',(.3,2,9),(5.5,-3,0),bl.mat('fd2',(.04,.05,.05,1),rough=.9))
    bl.camera((0,-15.5,.9),(0,0,.5),lens=50)
def frame(bl,t,dur):
    u=t/dur; TT.rotation_euler[2]=2*PI*u
    NEE.rotation_euler[1]=-.9+.6*math.sin(2*PI*3*u)+0*u
