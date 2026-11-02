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
    global G,RM
    bl.world((0.01,0.03,0.12,1),0.7)
    sA=bl.mat('A',(0.0,0.6,1,1),rough=.18,coat=1.0,emit=(0,.4,1,1),emit_strength=.5)
    sB=bl.mat('B',(1,.25,.7,1),rough=.18,coat=1.0,emit=(1,.15,.55,1),emit_strength=.5)
    RM=[bl.mat('r%d'%i,(.7,.9,1,1),rough=.3,emit=(.4,.8,1,1),emit_strength=1) for i in range(8)]
    T=empty('tilt'); T.rotation_euler=(0,math.radians(-16),math.radians(14))
    G=empty('spin'); adopt(G,T)
    N=44; L=11.0; R=1.15; pa=[];pb=[]
    for i in range(N):
        x=(i/(N-1)-.5)*L; a=i*0.62
        p1=(x,math.cos(a)*R,math.sin(a)*R); p2=(x,-math.cos(a)*R,-math.sin(a)*R); pa.append(p1); pb.append(p2)
        for p,m in ((p1,sA),(p2,sB)): adopt(uv('bead',.19,p,m,seg=24,ring=12),G)
        adopt(cyl('rung',.05,2*R,(x,0,0),RM[i%8],v=12,rot=(a-PI/2,0,0)),G)
    adopt(tube('bbA',pa,.07,sA),G); adopt(tube('bbB',pb,.07,sB),G)
    bl.light('AREA',(-4,-8,5),energy=900,color=(0.7,0.85,1),size=6,target=(0,0,0))
    bl.light('AREA',(6,-5,-3),energy=500,color=(1,0.5,0.9),size=5,target=(0,0,0))
    bl.camera((0,-13.5,0.5),(0,0,0),lens=35)
def frame(bl,t,dur):
    G.rotation_euler[0]=2*PI*t/dur
    for i,m in enumerate(RM):
        s=.4+3.4*max(0,math.sin(2*PI*(5*t/dur-i/8)))**2
        m.node_tree.nodes['Principled BSDF'].inputs['Emission Strength'].default_value=s
