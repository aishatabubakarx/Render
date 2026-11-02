"""Blender helpers for stock clips (Blender 4.x/5.x via the `bpy` module, Cycles on CPU, black background by default).
A Blender concept is a file bl_c<ID>.py next to concepts.py with two functions:
    setup(bl)          build the scene once (bl is this module; bl.bpy is bpy)
    frame(bl, t, dur)  pose the scene for time t seconds of a dur-second clip (pure function of t: deterministic, loop with 2*pi*t/dur)
Render settings (samples, denoise, motion blur) come from the concept row in concepts.py: samples=, bl_blur=."""
import math, bpy
from mathutils import Vector

def reset(w, h, samples=48, transparent=False):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'; c = sc.cycles
    c.device = 'CPU'; c.samples = samples; c.use_denoising = True; c.denoiser = 'OPENIMAGEDENOISE'
    c.max_bounces = 6; c.use_adaptive_sampling = True; c.adaptive_threshold = 0.02
    sc.render.resolution_x, sc.render.resolution_y, sc.render.resolution_percentage = w, h, 100
    sc.render.film_transparent = transparent
    sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_depth = '8'
    sc.render.image_settings.compression = 15
    sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'
    sc.render.use_motion_blur = False
    sc.render.threads_mode = 'AUTO'
    return sc

def mat(name, base=(1, 1, 1, 1), rough=0.5, metal=0.0, emit=None, emit_strength=0.0, trans=0.0, ior=1.45, coat=0.0, spec=0.5):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']; i = b.inputs
    i['Base Color'].default_value = base; i['Roughness'].default_value = rough; i['Metallic'].default_value = metal
    i['IOR'].default_value = ior
    for k, v in (('Transmission Weight', trans), ('Coat Weight', coat), ('Specular IOR Level', spec)):
        if k in i: i[k].default_value = v
    if emit is not None:
        i['Emission Color'].default_value = emit; i['Emission Strength'].default_value = emit_strength
    return m

def sphere(name, r=1.0, loc=(0, 0, 0), seg=96, rings=48, material=None, smooth=True):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=rings, radius=r, location=loc)
    o = bpy.context.object; o.name = name
    if smooth: bpy.ops.object.shade_smooth()
    if material: o.data.materials.append(material)
    return o

def camera_only(o):
    """Visible to the camera only: does not light, reflect in or shadow other objects (use for glow shells, halos)."""
    for a in ('visible_diffuse', 'visible_glossy', 'visible_transmission', 'visible_volume_scatter', 'visible_shadow'):
        if hasattr(o, a): setattr(o, a, False)
    return o

def world(color=(0, 0, 0, 1), strength=1.0, stars=0.0, seed=1):
    """Black (or colored) world; stars>0 adds a procedural starfield (higher = more stars)."""
    w = bpy.data.worlds.new('World'); bpy.context.scene.world = w; w.use_nodes = True
    n = w.node_tree.nodes; l = w.node_tree.links; bg = n['Background']
    bg.inputs['Color'].default_value = color; bg.inputs['Strength'].default_value = strength
    if stars > 0:
        tc = n.new('ShaderNodeTexCoord'); no = n.new('ShaderNodeTexNoise'); no.inputs['Scale'].default_value = 900 * stars
        no.noise_dimensions = '4D'; no.inputs['Detail'].default_value = 0; no.inputs['W'].default_value = float(seed)
        cr = n.new('ShaderNodeValToRGB'); cr.color_ramp.elements[0].position = 0.87; cr.color_ramp.elements[1].position = 0.89
        em = n.new('ShaderNodeEmission'); em.inputs['Strength'].default_value = 14
        add = n.new('ShaderNodeAddShader'); out = n['World Output']
        l.new(tc.outputs['Generated'], no.inputs['Vector']); l.new(no.outputs['Fac'], cr.inputs['Fac']); l.new(cr.outputs['Color'], em.inputs['Color'])
        l.new(bg.outputs['Background'], add.inputs[0]); l.new(em.outputs['Emission'], add.inputs[1]); l.new(add.outputs['Shader'], out.inputs['Surface'])
    return w

def camera(loc, target=(0, 0, 0), lens=50, dof_dist=None, fstop=None):
    d = bpy.data.cameras.new('Cam'); o = bpy.data.objects.new('Cam', d); bpy.context.scene.collection.objects.link(o)
    d.lens = lens; bpy.context.scene.camera = o; o.location = loc; look_at(o, target)
    if dof_dist and fstop: d.dof.use_dof = True; d.dof.focus_distance = dof_dist; d.dof.aperture_fstop = fstop
    return o

def look_at(obj, target):
    d = Vector(target) - Vector(obj.location); obj.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()

def light(kind='SUN', loc=(5, -5, 4), energy=5.0, color=(1, 1, 1), size=1.0, target=(0, 0, 0)):
    d = bpy.data.lights.new('L', kind); d.energy = energy; d.color = color
    if kind == 'AREA': d.size = size
    if kind == 'SUN': d.angle = math.radians(size)
    o = bpy.data.objects.new('L', d); bpy.context.scene.collection.objects.link(o); o.location = loc; look_at(o, target); return o

def noise_color_ramp(m, scale=3.0, detail=8.0, stops=((0.0, (0, 0, 0, 1)), (1.0, (1, 1, 1, 1))), coord='Object', into='Base Color', bump=0.0):
    """Wire a Noise->ColorRamp chain into a material input (procedural texture, no image files needed)."""
    n = m.node_tree.nodes; l = m.node_tree.links; b = n['Principled BSDF']
    tc = n.new('ShaderNodeTexCoord'); no = n.new('ShaderNodeTexNoise'); cr = n.new('ShaderNodeValToRGB')
    no.inputs['Scale'].default_value = scale; no.inputs['Detail'].default_value = detail
    cr.color_ramp.elements[0].position = stops[0][0]; cr.color_ramp.elements[0].color = stops[0][1]
    cr.color_ramp.elements[1].position = stops[-1][0]; cr.color_ramp.elements[1].color = stops[-1][1]
    for pos, col in stops[1:-1]: e = cr.color_ramp.elements.new(pos); e.color = col
    l.new(tc.outputs[coord], no.inputs['Vector']); l.new(no.outputs['Fac'], cr.inputs['Fac']); l.new(cr.outputs['Color'], b.inputs[into])
    if bump:
        bm = n.new('ShaderNodeBump'); bm.inputs['Strength'].default_value = bump; l.new(no.outputs['Fac'], bm.inputs['Height']); l.new(bm.outputs['Normal'], b.inputs['Normal'])
    return no, cr

def fresnel_glow(name, color=(0.3, 0.6, 1, 1), strength=3.0, power=3.0):
    """Atmosphere / rim shell material: emission that is strongest at the silhouette (Layer Weight Fresnel ^ power), transparent in the middle.
    Put it on a sphere ~3-5 % larger than the planet."""
    m = bpy.data.materials.new(name); m.use_nodes = True; n = m.node_tree.nodes; l = m.node_tree.links
    for x in list(n): n.remove(x)
    lw = n.new('ShaderNodeLayerWeight'); lw.inputs['Blend'].default_value = 0.35
    pw = n.new('ShaderNodeMath'); pw.operation = 'POWER'; pw.inputs[1].default_value = power
    em = n.new('ShaderNodeEmission'); em.inputs['Color'].default_value = color; em.inputs['Strength'].default_value = strength
    tr = n.new('ShaderNodeBsdfTransparent'); mix = n.new('ShaderNodeMixShader'); out = n.new('ShaderNodeOutputMaterial')
    l.new(lw.outputs['Fresnel'], pw.inputs[0]); l.new(pw.outputs['Value'], mix.inputs['Fac'])
    l.new(tr.outputs['BSDF'], mix.inputs[1]); l.new(em.outputs['Emission'], mix.inputs[2]); l.new(mix.outputs['Shader'], out.inputs['Surface'])
    return m
