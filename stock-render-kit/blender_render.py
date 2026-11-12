#!/usr/bin/env python3
"""Render frames of a Blender concept with the bpy module and yield them as PNG bytes (so batch.py can pipe them straight into ffmpeg: no disk bloat).
  from blender_render import frames ; for png in frames(script, w, h, fps, dur, k0, k1, samples): ...
CLI test:  python blender_render.py bl_c7.py --res 540 --frames 0,100,225 --out test/"""
import argparse, importlib.util, os, sys, tempfile
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(HERE, 'blender'))

def frames(script, w, h, fps, dur, k0, k1, samples=48, ks=None):
    import bl_lib as bl, bpy
    spec = importlib.util.spec_from_file_location('bl_concept', script); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    bl.reset(w, h, samples); mod.setup(bl)
    tmp = tempfile.mkdtemp(); path = os.path.join(tmp, 'f.png'); sc = bpy.context.scene; sc.render.filepath = path
    for k in (ks if ks is not None else range(k0, k1)):
        mod.frame(bl, k / fps, dur); bpy.context.view_layer.update()
        bpy.ops.render.render(write_still=True)
        yield open(path, 'rb').read()
        os.remove(path)

if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('script'); ap.add_argument('--res', type=int, default=540); ap.add_argument('--fps', type=int, default=30)
    ap.add_argument('--dur', type=float, default=15); ap.add_argument('--samples', type=int, default=24); ap.add_argument('--frames', default='0'); ap.add_argument('--out', default='bl_test')
    a = ap.parse_args(); os.makedirs(a.out, exist_ok=True); ks = [int(x) for x in a.frames.split(',')]
    for k, png in zip(ks, frames(a.script, a.res * 16 // 9, a.res, a.fps, a.dur, 0, 0, a.samples, ks)):
        open(os.path.join(a.out, f'{k:05d}.png'), 'wb').write(png); print('frame', k, len(png) // 1024, 'KB', flush=True)
