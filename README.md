# Stock clip renderer

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
Write C[n]=()=>{...} in a c*.js file, then add a row in concepts.py and a title and category in adobe_meta.py.
Fonts are SIL OFL via Fontsource. anime.js is MIT.
