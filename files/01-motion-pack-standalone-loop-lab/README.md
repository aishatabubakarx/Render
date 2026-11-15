# 01-motion-pack-standalone-loop-lab

Motion Pack, standalone animations, Loop Lab (clips 7, 51-77, 403-406, 78-135)

90 clips (22 transparent). Every clip is the original animation code from the preview page, so **what you saw in the preview is what is rendered**:
the code runs in Chromium on a virtual clock, one frame every 1/30 s, and goes straight to ffmpeg. Every render is identical, and every clip is exactly one seamless loop
(its own loop length: 10, 12, 14, 15, 16 or 20 s). Clip numbers match the numbers in the preview page.

## Render on GitHub (no install)
1. Create a new repository and upload everything in this folder (keep the hidden `.github` folder).
2. Actions tab > **Render stock clips** > **Run workflow**. Pre-set to 1080p / MOV / 30 fps / release. Just press Run.
   Tip: the first time, type 2 or 3 clip numbers into **ids** to check the result before rendering all 90.
3. When it finishes, open **Releases**: every clip is a `.mov`, plus a JPG thumbnail per clip and `clips.csv` (number, title, loop length, transparent yes/no).
   90 clips are split over 20 parallel jobs, so the whole pack finishes in about the time of 5 clips.

## What you get
| Clip type | File |
|---|---|
| Opaque clips | ProRes 422 HQ `.mov` (or H.264 `.mp4` if you pick mp4) |
| Transparent clips | ProRes 4444 `.mov` with a real alpha channel (always mov: mp4 cannot carry alpha) |

Resolution: **1080p** by default. Choose **2160 (4K)** in the form if you want it. Page-type clips are re-laid out at 4K (crisp); gallery clips (Loop Lab, Master, 100 Concepts, 32 Concepts, Wave 4) are drawn by their code at 1280x720 (960x540 for Loop Lab) and scaled up, exactly like the full-size viewer in the preview.
Check Adobe Stock's current rules before uploading (size, resolution, naming).

## Render on your own computer
`pip install -r requirements.txt && python -m playwright install chromium` (ffmpeg on your PATH), then
`python render.py` (all clips) or `python render.py --ids 7,51 --res 1080`. Output goes to `output/`. Finished clips are skipped, so you can re-run safely.
`python render.py --ids 7 --seconds 2` renders a 2-second test.

## Folders
`anims/` the animation pages (the original code), `vendor/` three.js (bundled, no internet needed), `catalog.json` clip list, `render.py` the renderer.

## Clips in this pack
| # | Title | Loop | Transparent |
|---|---|---|---|
| 7 | Spiral Galaxy Rotation | 15 s | yes |
| 51 | Glitter Dust Trail | 15 s | yes |
| 52 | Gold Spiral | 15 s | yes |
| 53 | Aurora Chase | 15 s | yes |
| 54 | Orbit Halo | 15 s | yes |
| 55 | Blue Particles | 15 s | yes |
| 56 | Blue Particle Flow | 15 s | yes |
| 57 | Neon Light Rays | 15 s | yes |
| 58 | Prism Glass | 15 s | yes |
| 59 | Holographic House | 15 s | yes |
| 60 | Nigeria Flag Map | 15 s | yes |
| 61 | Moon Phases | 15 s | yes |
| 62 | 3D Gold Clock | 15 s | yes |
| 63 | Dollar Burst Loop | 15 s | yes |
| 64 | Fire Blast | 15 s | yes |
| 65 | Fire Blowing | 15 s | yes |
| 66 | Fire Sparks | 15 s | yes |
| 67 | Isolated Fire | 15 s | yes |
| 68 | Maple Leaf Burst Loop | 15 s | yes |
| 69 | Rising Hearts | 15 s | yes |
| 70 | Rising Likes | 15 s | yes |
| 71 | Snow | 15 s | yes |
| 72 | Morning Flight | 15 s |  |
| 73 | Network Pulse | 15 s |  |
| 74 | Winter Ice Frame | 15 s |  |
| 75 | Winter Ice Frame (Real) | 15 s |  |
| 76 | Idea Concepts | 15 s |  |
| 77 | Motion Studio: 3D clips | 15 s |  |
| 78 | Cash Rain, Chroma Key | 12 s |  |
| 79 | Citrus Burst on Cyan | 12 s |  |
| 80 | Delivery Van Street Run | 12 s |  |
| 81 | Data Particle Terrain | 12 s |  |
| 82 | Digital City Scan | 12 s |  |
| 83 | Growth Chart Rise | 12 s |  |
| 84 | Global Network Pulse | 12 s |  |
| 85 | Rocket Launch Ascent | 12 s |  |
| 86 | Sci-Fi HUD Loader | 12 s |  |
| 87 | Heartbeat Monitor | 12 s |  |
| 88 | Candlestick Market Run | 12 s |  |
| 89 | Shopping Cart Drop | 12 s |  |
| 90 | Sale Starburst Badge | 12 s |  |
| 91 | Wind Turbines at Dusk | 12 s |  |
| 92 | Radial Audio Spectrum | 12 s |  |
| 93 | Hyperspace Light Streaks | 12 s |  |
| 94 | Day to Night Timelapse | 12 s |  |
| 95 | Celebration Confetti Cannons | 12 s |  |
| 96 | Data Center Aisle Flythrough | 12 s |  |
| 97 | EV Fast Charging Station | 12 s |  |
| 98 | Steaming Coffee Cup | 12 s |  |
| 99 | Solar Farm Golden Hour | 12 s |  |
| 100 | Aurora Over Frozen Lake | 12 s |  |
| 101 | AI Processor Circuit Pulse | 12 s |  |
| 102 | Autumn Leaves, Chroma Key | 12 s |  |
| 103 | Neon Countdown 10 to 1 | 12 s |  |
| 104 | Thunderstorm Lightning Strike | 12 s |  |
| 105 | Ocean Sunset Waves | 12 s |  |
| 106 | Ringed Planet Rotation | 12 s |  |
| 107 | Snowflake Crystal Growth | 12 s |  |
| 108 | Spinning Gold Coin | 12 s |  |
| 109 | Four Seasons Tree | 12 s |  |
| 110 | Highway Light Trails at Night | 12 s |  |
| 111 | Lotus Bloom at Night | 12 s |  |
| 112 | Koi Pond Top View | 12 s |  |
| 113 | Isometric Smart Eco Home | 12 s |  |
| 114 | Code Editor Typing | 12 s |  |
| 115 | Underwater Reef Sunrays | 12 s |  |
| 116 | Volcano Eruption at Night | 12 s |  |
| 117 | Papercraft Mountain Sunrise | 12 s |  |
| 118 | Campfire Flames, Black Overlay | 12 s |  |
| 119 | Origami Cranes in Flight | 12 s |  |
| 120 | Fitness Activity Rings | 12 s |  |
| 121 | Animated Weather Icons | 12 s |  |
| 122 | Burger Assembly Drop | 12 s |  |
| 123 | Airplane Above Sunset Clouds | 12 s |  |
| 124 | Live Reaction Stream | 12 s |  |
| 125 | Dandelion Seeds in the Wind | 12 s |  |
| 126 | Bioluminescent Jellyfish | 12 s |  |
| 127 | Vintage Steam Locomotive | 12 s |  |
| 128 | Summer Ice Cream Cone | 12 s |  |
| 129 | High Stakes Chips and Cards | 12 s |  |
| 130 | Prism Light Dispersion | 12 s |  |
| 131 | Snow Globe Winter Village | 12 s |  |
| 132 | Tropical Beach Aerial Waves | 12 s |  |
| 133 | Vinyl Record Turntable | 12 s |  |
| 134 | Ferris Wheel at Dusk | 12 s |  |
| 135 | Lighthouse Beam in the Storm | 12 s |  |
| 403 | Glitter Dust Trail (original look) | 15 s |  |
| 404 | Gold Spiral (original look) | 15 s |  |
| 405 | Aurora Chase (original look) | 15 s |  |
| 406 | Orbit Halo (original look) | 15 s |  |
