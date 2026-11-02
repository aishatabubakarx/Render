"""AE-style finishing stack as an ffmpeg filtergraph (used for Blender clips, optional for any clip: concepts.py `post=[...]`).
  post_vf(['bloom','chroma','vignette','grain','sharpen','contrast'], scale)  ->  string for ffmpeg -vf (empty if no names)
`scale` = canvas scale (1 for 1080p, 2 for 4K, 3 for 6K, 4 for 8K) so pixel-based effects keep the same look at every resolution.
Presets: 'premium' = bloom + vignette + grain.   Parameters: 'bloom:0.5' (opacity), 'grain:7' (strength), 'chroma:2' (px at 1080p)."""
PRESETS = {'premium': ['bloom:0.45', 'vignette', 'grain:5'], 'cinema': ['bloom:0.6', 'chroma:1.5', 'vignette', 'grain:6', 'contrast']}

def post_vf(names, scale=2):
    out = []
    for item in sum([PRESETS.get(n, [n]) for n in (names or [])], []):
        name, _, arg = item.partition(':'); v = float(arg) if arg else None
        if name == 'bloom':     # downscale 4x, blur, upscale 4x, screen-blend over the original
            out.append(f"split[o][b];[b]scale=iw/4:ih/4,gblur=sigma={14 * scale / 4:.1f}:steps=2,scale=iw*4:ih*4[g];[o][g]blend=all_mode=screen:all_opacity={v if v is not None else .45}")
        elif name == 'chroma':
            d = max(1, round((v if v is not None else 2) * scale)); out.append(f"rgbashift=rh=-{d}:bh={d}")
        elif name == 'vignette':   # own radial multiply mask (ffmpeg's vignette filter shifts chroma to magenta on black backgrounds)
            amt = v if v is not None else .55
            out.append(f"split[o][b];[b]scale=iw/8:ih/8,format=gray,geq=lum='255*(1-{amt}*pow(hypot(X/W-.5,Y/H-.5)/.7071,2.2))',scale=iw*8:ih*8,format=gbrp[m];[o]format=gbrp[o2];[o2][m]blend=all_mode=multiply")
        elif name == 'grain':    out.append(f"noise=alls={v if v is not None else 5:g}:allf=t:all_seed=7")
        elif name == 'sharpen':  out.append('unsharp=5:5:0.7:5:5:0.0')
        elif name == 'contrast': out.append('eq=contrast=1.07:saturation=1.08')
        else: raise ValueError('unknown post effect ' + name)
    return ','.join(out)
