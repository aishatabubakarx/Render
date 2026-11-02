"""Example Blender concept: a slowly rotating planet with atmosphere and star field on black, seamless loop.
Copy to bl_c<ID>.py in the project folder and edit."""
import math
def setup(bl):
    bpy = bl.bpy
    bl.world((0, 0, 0, 1), 1.0, stars=1.0, seed=3)
    surf = bl.mat('planet', (0.2, 0.3, 0.6, 1), rough=0.75)
    bl.noise_color_ramp(surf, scale=2.6, detail=10, stops=((0.0, (0.01, 0.05, 0.25, 1)), (0.48, (0.02, 0.12, 0.45, 1)), (0.5, (0.45, 0.38, 0.22, 1)), (0.75, (0.25, 0.28, 0.1, 1)), (1.0, (0.9, 0.9, 0.85, 1))), bump=0.25)
    global P, A
    P = bl.sphere('planet', 1.0, material=surf, seg=128, rings=64)
    A = bl.sphere('atmo', 1.045, material=bl.fresnel_glow('atmo', (0.35, 0.6, 1.0, 1), 4.0, 2.5), seg=96, rings=48)
    bl.camera_only(A)
    bl.light('SUN', (8, 2.5, 2.2), energy=5.0, color=(1, 0.96, 0.9), size=0.6)
    bl.camera((0, -8.5, 0.5), (0, 0, 0), lens=60)
def frame(bl, t, dur):
    P.rotation_euler[2] = 2 * math.pi * t / dur      # one full turn per clip = seamless loop
