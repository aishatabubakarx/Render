# Stock render kit: 20 unique 15-second concepts

Every clip is **15 s, 30 fps (450 frames)**, 1080p (or 4K with `--res 2160`). No two concepts share a look or motion idea.

* **Alpha concepts** render as **ProRes 4444 with a real alpha channel (.mov)**. Their `.jpg` preview is the transparent frame over dark grey.
* **Black-background concepts** render as H.264 `.mp4` (use Screen / Add blend over footage).
* **Concept 8** is vertical 1080x1920 (2160x3840 in 4K).
* "loop" = first and last frame match, so the clip repeats seamlessly.

| id | format | title |
|---|---|---|
| 1 | MP4 loop | Abstract Dark Luxury Gold Dust Falling Motion Background Golden Glitter Shiny Stars Bokeh Lights Particles |
| 2 | MOV alpha loop | Colorful Autumn Leaves Border Frame Isolated Alpha Channel Animation |
| 3 | MOV alpha loop | White Smoke and Fog Moving Isolated Animation Alpha Channel |
| 4 | MOV alpha loop | Halloween and Dark Cloudy Mist Dramatic Videos Overlay Motion Design Element |
| 5 | MOV alpha loop | Black Background Valentines Day Hearts Neon Lights and Glitter Stars Trails Border Frame Alpha Channel Animation |
| 6 | MOV alpha loop | Shiny Glowing Heart Romantic Love Celebration Overlay Motion Design Element |
| 7 | MOV alpha loop | Golden Stars and Glowing Glitter Particle Pattern Isolated Alpha Channel Animation |
| 8 | MP4 9:16 loop | Gold Sparkle Glitter Swirl Overlay Vertical Social Media Motion Design Element Black Background |
| 9 | MP4 loop | Loading Animation Spinner Seamless Loop Black Background |
| 10 | MP4 loop | Warm Light Leaks Film Burn Overlay Screen Blend Black Background |
| 11 | MOV alpha loop | Heavy Rain Overlay with Ground Splashes and Mist Alpha Channel Animation |
| 12 | MOV alpha loop | Underwater Air Bubbles Rising Isolated Alpha Channel Animation |
| 13 | MOV alpha loop | Colorful Confetti and Streamers Falling Celebration Isolated Alpha Channel Animation |
| 14 | MP4 | Fireworks Display Night Sky Peony Willow Ring Heart Bursts Black Background |
| 15 | MOV alpha | Social Media Notification Pop Ups Likes Comments Followers Shares Counter Alpha Channel Animation |
| 16 | MOV alpha loop | Volumetric God Rays Light Beams with Dust Motes Isolated Alpha Channel Animation |
| 17 | MOV alpha | Hand Drawn Doodle Arrows Circles Check Marks and Callouts Animated Alpha Channel Pack |
| 18 | MP4 | VHS Glitch RGB Split Distortion Overlay with Play and Timecode Black Background |
| 19 | MOV alpha | Colorful Shape Wipe Transitions Pack Bars Circles Columns Alpha Channel |
| 20 | MOV alpha | Breaking News Banner with Live Badge and Scrolling Ticker Lower Third Alpha Channel |

## Run
```
pip install -r requirements.txt && python -m playwright install chromium   # ffmpeg must be on PATH
python batch.py                         # all 20 at 1080p
python batch.py --ids 2,8 --res 2160    # selected, in 4K
python adobe_csv.py output              # writes adobe_stock.csv + metadata_full.csv
```
The GitHub workflow (`Render stock clips`) does the same in 8 shards and uploads a `stock-pack` artifact.

ProRes 4444 files are large (about 35 MB per 15 s at 1080p for sparse clips, much more for dense ones and in 4K). Check Adobe Stock's current upload rules for alpha video before submitting.

Concepts live in `c1.js` to `c5.js` (4 each); shared helpers are in `lib.js`.
