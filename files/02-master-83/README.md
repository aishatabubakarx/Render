# 02-master-83

Stock Motion Previews Master (clips 136-218)

83 clips (0 transparent). Every clip is the original animation code from the preview page, so **what you saw in the preview is what is rendered**:
the code runs in Chromium on a virtual clock, one frame every 1/30 s, and goes straight to ffmpeg. Every render is identical, and every clip is exactly one seamless loop
(its own loop length: 10, 12, 14, 15, 16 or 20 s). Clip numbers match the numbers in the preview page.

## Render on GitHub (no install)
1. Create a new repository and upload everything in this folder (keep the hidden `.github` folder).
2. Actions tab > **Render stock clips** > **Run workflow**. Pre-set to 1080p / MOV / 30 fps / release. Just press Run.
   Tip: the first time, type 2 or 3 clip numbers into **ids** to check the result before rendering all 83.
3. When it finishes, open **Releases**: every clip is a `.mov`, plus a JPG thumbnail per clip and `clips.csv` (number, title, loop length, transparent yes/no).
   83 clips are split over 20 parallel jobs, so the whole pack finishes in about the time of 5 clips.

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
| 136 | Ink Brush Reveal | 12 s |  |
| 137 | Night Earth City Lights | 16 s |  |
| 138 | Kinetic Title Light Sweep | 12 s |  |
| 139 | Floating Likes and Hearts | 14 s |  |
| 140 | Celebration Confetti Fall | 12 s |  |
| 141 | Gold Coin Rain Flip | 14 s |  |
| 142 | Notification Stack Phone UI | 12 s |  |
| 143 | Parcels Drop Into Pile | 12 s |  |
| 144 | Rising Growth Bar Chart | 14 s |  |
| 145 | Radar Sonar Sweep | 14 s |  |
| 146 | Ten Second Countdown Ring | 10 s |  |
| 147 | Loading Ring to Success Check | 10 s |  |
| 148 | Five Star Rating Pop | 10 s |  |
| 149 | Liquid Color Wipe | 12 s |  |
| 150 | Hyperspace Warp Streaks | 12 s |  |
| 151 | Night Fireworks Finale | 14 s |  |
| 152 | Heartbeat ECG Monitor | 12 s |  |
| 153 | Gold Lower Third Banner | 10 s |  |
| 154 | Subscribe Bell Ring | 10 s |  |
| 155 | Ringed Planet and Satellite | 18 s |  |
| 156 | Triangle Shard Transition | 10 s |  |
| 157 | Pulsing Signal Connectivity | 12 s |  |
| 158 | Neon Wireframe Cube | 14 s |  |
| 159 | Mirrored Audio Equalizer | 12 s |  |
| 160 | Glass Play Button Pulse | 12 s |  |
| 161 | Market Candlestick Climb | 14 s |  |
| 162 | Location Pin Drop Ripple | 12 s |  |
| 163 | Interlocking Gear Mechanism | 12 s |  |
| 164 | Idea Lightbulb Ignite | 10 s |  |
| 165 | Cyber Shield Verified Scan | 12 s |  |
| 166 | Startup Rocket Launch | 12 s |  |
| 167 | Sale Starburst Badge | 10 s |  |
| 168 | Gift Box Open Burst | 12 s |  |
| 169 | Typewriter Headline | 12 s |  |
| 170 | Paper Plane Flight | 12 s |  |
| 171 | Progress Steps Timeline | 12 s |  |
| 172 | Voice Assistant Waveform Ring | 12 s |  |
| 173 | Analog Clock Time Lapse | 14 s |  |
| 174 | Checklist Tick Off | 12 s |  |
| 175 | Earth Orbit Sunrise Limb | 16 s |  |
| 176 | Social Counter Notification Bubble | 10 s |  |
| 177 | Red Rose Petals Falling | 16 s |  |
| 178 | Cherry Blossom Petal Wind | 16 s |  |
| 179 | Delivery Scooter City Ride | 12 s |  |
| 180 | Gym Dumbbell Lift Rep | 10 s |  |
| 181 | Phone Tap and Swipe Gesture | 12 s |  |
| 182 | Performance Speedometer Sweep | 12 s |  |
| 183 | DNA Double Helix Rotation | 14 s |  |
| 184 | Wind Turbine Farm Spin | 14 s |  |
| 185 | Battery Charge Fill | 10 s |  |
| 186 | Fingerprint Biometric Scan | 12 s |  |
| 187 | Cloud Upload Data Stream | 12 s |  |
| 188 | Envelope Open Letter Reveal | 12 s |  |
| 189 | Magnifier Search Reveal | 12 s |  |
| 190 | Winner Podium Trophy Reveal | 12 s |  |
| 191 | Aperture Iris Transition | 10 s |  |
| 192 | Silk Ribbon Waves | 16 s |  |
| 193 | Hologram HUD Radar Rings | 14 s |  |
| 194 | Anamorphic Lens Flare Sweep | 10 s |  |
| 195 | Volumetric Light Rays Sweep | 14 s |  |
| 196 | Lightning Strike Flash | 12 s |  |
| 197 | RGB Glitch Slice Transition | 10 s |  |
| 198 | Fire Embers Rising | 14 s |  |
| 199 | Binary Data Rain | 12 s |  |
| 200 | Revenue Counter Surge | 12 s |  |
| 201 | Neon OPEN Sign Flicker | 10 s |  |
| 202 | Snowfall Parallax Pines | 16 s |  |
| 203 | Gold Sparkle Glints Overlay | 12 s |  |
| 204 | Blueprint House Draw-On | 14 s |  |
| 205 | Contactless Payment Success | 12 s |  |
| 206 | Total Solar Eclipse Corona | 16 s |  |
| 207 | Vinyl Record Needle Drop | 14 s |  |
| 208 | Cargo Ship Ocean Voyage | 16 s |  |
| 209 | Aurora Borealis Over Peaks | 18 s |  |
| 210 | Passport Visa Stamp Slam | 12 s |  |
| 211 | Jackpot Slot Reels Win | 14 s |  |
| 212 | Seedling Growth Time-Lapse | 16 s |  |
| 213 | Product Showcase Pedestal Spotlight | 14 s |  |
| 214 | Luxury Perfume Bottle Reveal | 14 s |  |
| 215 | Latte Art Pour Top View | 14 s |  |
| 216 | Hourglass Sand Time Flow | 16 s |  |
| 217 | Smartwatch Activity Rings | 14 s |  |
| 218 | Brilliant Diamond Light Sweep | 12 s |  |
