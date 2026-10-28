# Stock clip renderer (GSAP edition)

20 unique 15-second looping animation clips, drawn on canvas and driven by a GSAP master timeline.
Every frame is a pure function of time, so renders are deterministic and loops close exactly.

## Render on GitHub (no install)
1. Create a repository and push these files (keep the hidden .github folder).
2. Actions tab -> "Render stock clips" -> Run workflow -> choose 1080 or 2160.
3. Download the artifact `stock-pack`: every MP4, a JPG thumbnail per clip, `adobe_stock.csv`, `metadata_full.csv`.
Eight parallel jobs split the clips (change the shard list in render.yml and `--shards` together).

## Render on your computer
    pip install playwright pillow && playwright install chromium     (ffmpeg on PATH)
    python batch.py --workers 4 ; python adobe_csv.py output
Quick look at a concept: `python preview.py 4 --times 1,4,8,12` (writes preview/04_contact.jpg and a loop-seam check).

## Add a concept
Write `C[n]=()=>{...}` in a new c*.js (add it to index.html), add a row in concepts.py. Use `newTL()` for GSAP tweens, `ph()` for loop phase 0..1, `lfbm/ln3` for loopable noise.

GSAP is vendored in vendor/ (see gsap.com/standard-license).
