# Stock clip renderer

20 text-free clips on a pure black background, 15 seconds each (1920x1080 or 3840x2160, 30 fps). Eighteen of them loop seamlessly (first frame = last frame); the plasma ball and the glitch clip are random bursts and do not.

| # | Concept | # | Concept |
|---|---|---|---|
| 1 | Aurora borealis | 11 | Bioluminescent jellyfish |
| 2 | Luxury gold dust and bokeh | 12 | Campfire flames and sparks |
| 3 | 3D glass with iridescent edge light | 13 | Neon wave lines |
| 4 | Loading spinner | 14 | Kaleidoscope mandala |
| 5 | Liquid chrome blobs | 15 | Hexagon grid pulse |
| 6 | Hyperspace warp | 16 | Prism light dispersion |
| 7 | Dot globe with network arcs | 17 | Black hole accretion disk |
| 8 | Colorful ink smoke | 18 | DNA double helix |
| 9 | Plasma ball lightning | 19 | Digital glitch RGB split |
| 10 | Synthwave neon grid | 20 | Heartbeat ECG monitor |

## Render on GitHub (no install)
1. Create a new repository and push these files to it (keep the hidden .github folder).
2. Open the Actions tab, pick "Render stock clips", click Run workflow, choose 1080 or 2160.
3. When it finishes, download the artifact named stock-pack. It holds every MP4, a JPG thumbnail per clip,
   adobe_stock.csv (upload-ready) and metadata_full.csv.

Eight parallel jobs split the clips. Change the shard list in .github/workflows/render.yml and the --shards number together to use more or fewer.

## Render on your own computer
pip install playwright && playwright install chromium   (ffmpeg must be on PATH)
python batch.py --workers 4        then        python adobe_csv.py output

## Add concepts
Write C[n]=()=>{...} in a c*.js file (use T() for 0..1 progress and only whole-number cycles per clip so it loops; clip length is DUR in lib.js and SECONDS in batch.py), then add a row in concepts.py and a title and category in adobe_meta.py.
Fonts are SIL OFL via Fontsource. anime.js is MIT.
