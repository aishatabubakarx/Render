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

def gear(name,teeth,R,th,m,hole=.32):
    bm=bmesh.new(); N=teeth*4; o_=[];i_=[]
    for i in range(N):
        a=2*PI*i/N; ph=i%4; rr=R*(1.17 if ph in (1,2) else 1.0)
        o_.append(bm.verts.new((math.cos(a)*rr,math.sin(a)*rr,0))); i_.append(bm.verts.new((math.cos(a)*R*hole,math.sin(a)*R*hole,0)))
    for i in range(N):
        j=(i+1)%N; bm.faces.new((o_[i],o_[j],i_[j],i_[i]))
    bmesh.ops.recalc_face_normals(bm,faces=bm.faces)
    me=bpy.data.meshes.new(name); bm.to_mesh(me); bm.free(); ob=bpy.data.objects.new(name,me); bpy.context.scene.collection.objects.link(ob)
    s=ob.modifiers.new('s','SOLIDIFY'); s.thickness=th; s.offset=0
    b=ob.modifiers.new('b','BEVEL'); b.width=.03; b.segments=2
    ob.data.materials.append(m); return ob
def setup(bl):
    global GS
    bl.world((1,1,1,1),1.1)
    metal=bl.mat('steel',(0.78,0.8,0.84,1),rough=.28,metal=1.0)
    metal2=bl.mat('steel2',(0.6,0.64,0.7,1),rough=.35,metal=1.0)
    floor=bl.mat('floor',(1,1,1,1),rough=.9)
    plane('floor',60,(0,0,-.45),floor)
    RA,RB,RC=2.0,1.0,1.33; k=1.085
    dB=(RA+RB)*k+.02; dC=(RA+RC)*k+.02; phB=math.radians(35); phC=math.radians(-150)
    A=gear('A',24,RA,.5,metal,.3); B=gear('B',12,RB,.5,metal2,.3); C=gear('C',16,RC,.5,metal2,.3)
    B.location=(math.cos(phB)*dB,math.sin(phB)*dB,0); C.location=(math.cos(phC)*dC,math.sin(phC)*dC,0)
    for g,(n,p) in ((B,(12,phB)),(C,(16,phC))):
        pass
    GS=[(A,24,0),(B,12,phB),(C,16,phC)]
    bl.light('SUN',(4,-5,9),energy=3.2,size=8,target=(0,0,0))
    bl.light('AREA',(0,0,8),energy=500,size=10,target=(0,0,0))
    bl.camera((1.5,-6.5,11.5),(.2,0,0),lens=42)
def frame(bl,t,dur):
    aA=2*PI*t/dur
    for (g,n,ph) in GS:
        if n==24: g.rotation_euler[2]=aA
        else: g.rotation_euler[2]=-aA*24/n+(1+24/n)*ph+PI/n
