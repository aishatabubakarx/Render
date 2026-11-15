# 03-100-concepts

100 Commercial Concepts (clips 219-318)

100 clips (0 transparent). Every clip is the original animation code from the preview page, so **what you saw in the preview is what is rendered**:
the code runs in Chromium on a virtual clock, one frame every 1/30 s, and goes straight to ffmpeg. Every render is identical, and every clip is exactly one seamless loop
(its own loop length: 10, 12, 14, 15, 16 or 20 s). Clip numbers match the numbers in the preview page.

## Render on GitHub (no install)
1. Create a new repository and upload everything in this folder (keep the hidden `.github` folder).
2. Actions tab > **Render stock clips** > **Run workflow**. Pre-set to 1080p / MOV / 30 fps / release. Just press Run.
   Tip: the first time, type 2 or 3 clip numbers into **ids** to check the result before rendering all 100.
3. When it finishes, open **Releases**: every clip is a `.mov`, plus a JPG thumbnail per clip and `clips.csv` (number, title, loop length, transparent yes/no).
   100 clips are split over 20 parallel jobs, so the whole pack finishes in about the time of 5 clips.

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
| 219 | AI Neural Network Nodes | 14 s |  |
| 220 | Quantum Core Cube Spin | 12 s |  |
| 221 | Ransomware Padlock Breach to Lock | 10 s |  |
| 222 | Biometric Iris Eye Scan | 12 s |  |
| 223 | Server Rack LED Traffic | 10 s |  |
| 224 | Zero-Trust Firewall Shield | 12 s |  |
| 225 | Big Data Pipeline Funnel | 12 s |  |
| 226 | AI Prompt Typing & Sparkle | 12 s |  |
| 227 | Facial Recognition Mesh Grid | 12 s |  |
| 228 | API Webhook Sync Pulse | 10 s |  |
| 229 | Database Cylinder Sync | 12 s |  |
| 230 | VPN Encrypted Tunnel | 10 s |  |
| 231 | DNA CRISPR Gene Edit | 14 s |  |
| 232 | Microchip Processor Glow | 12 s |  |
| 233 | Satellite Orbit GPS Ping | 14 s |  |
| 234 | Crypto Bullish Breakout | 12 s |  |
| 235 | Stock Ticker Tape Scroll | 10 s |  |
| 236 | Credit Card Tap NFC | 12 s |  |
| 237 | Shopping Cart Add Item | 10 s |  |
| 238 | Flash Sale Countdown Timer | 10 s |  |
| 239 | ROI Pie Chart Segment Pop | 12 s |  |
| 240 | Invoice Paid Stamp | 10 s |  |
| 241 | Global Currency Exchange | 12 s |  |
| 242 | Gold Bullion Bars Shine | 12 s |  |
| 243 | SaaS MRR Growth Curve | 12 s |  |
| 244 | Digital Wallet Balance Up | 10 s |  |
| 245 | Supply Chain Warehouse Boxes | 12 s |  |
| 246 | Real Estate Sold Sign | 12 s |  |
| 247 | Stock Market Bear vs Bull | 12 s |  |
| 248 | Subscription Tier Upgrade | 10 s |  |
| 249 | Live Stream REC Pulse | 10 s |  |
| 250 | YouTube Subscribe Cursor Click | 10 s |  |
| 251 | Podcast Mic Soundwaves | 12 s |  |
| 252 | Viral Share Network Spread | 12 s |  |
| 253 | Lower Third Social Handle | 10 s |  |
| 254 | Chat Bubble Typing Dots | 10 s |  |
| 255 | Live Viewer Count Surge | 10 s |  |
| 256 | Hashtag Trend Cloud | 12 s |  |
| 257 | Video Timeline Cut & Trim | 12 s |  |
| 258 | Emoji Reaction Burst | 10 s |  |
| 259 | 3-2-1 Film Leader Countdown | 10 s |  |
| 260 | Story Progress Bar Swipe | 10 s |  |
| 261 | Audio Spectrum Circular | 12 s |  |
| 262 | Breaking News Alert Banner | 10 s |  |
| 263 | Camera Viewfinder Focus | 10 s |  |
| 264 | Solar Panel Sunbeam Charge | 12 s |  |
| 265 | EV Car Charging Plug | 12 s |  |
| 266 | CO2 Carbon Footprint Drop | 12 s |  |
| 267 | Recycling Loop Arrows | 12 s |  |
| 268 | Hydroelectric Dam Flow | 12 s |  |
| 269 | Smart Grid Power Lines | 12 s |  |
| 270 | Rainwater Harvesting Drops | 12 s |  |
| 271 | Forest Reforestation Sprouts | 12 s |  |
| 272 | Global Warming Temp Gauge | 12 s |  |
| 273 | Hydrogen Fuel Cell H2 | 12 s |  |
| 274 | Ocean Wave Tidal Energy | 14 s |  |
| 275 | Eco Leaf Battery | 10 s |  |
| 276 | Smart Thermostat Eco Mode | 10 s |  |
| 277 | Geothermal Earth Heat | 12 s |  |
| 278 | Zero Waste Circular Loop | 12 s |  |
| 279 | DNA Vaccine Antibody | 12 s |  |
| 280 | Lungs Breathing Expansion | 12 s |  |
| 281 | Telemedicine Video Call | 10 s |  |
| 282 | Sleep Cycle Moon & Stars | 14 s |  |
| 283 | Hydration Water Glass Fill | 10 s |  |
| 284 | Meditation Breath Circle | 14 s |  |
| 285 | Microscope Cell Division | 14 s |  |
| 286 | Mental Health Brain Glow | 12 s |  |
| 287 | Pill Capsule Dissolve | 12 s |  |
| 288 | Step Counter 10K Goal | 10 s |  |
| 289 | Blood Pressure Pulse Wave | 10 s |  |
| 290 | Eye Vision Test Chart | 10 s |  |
| 291 | Tooth Whitening Sparkle | 10 s |  |
| 292 | First Aid Cross Pulse | 10 s |  |
| 293 | Calorie Burn Flame | 10 s |  |
| 294 | High-Speed Bullet Train | 12 s |  |
| 295 | Delivery Drone Drop | 12 s |  |
| 296 | Autonomous Car Lidar Scan | 12 s |  |
| 297 | Airplane Flight Path Arc | 12 s |  |
| 298 | Smart City Skyline Night | 14 s |  |
| 299 | Traffic Light Green Go | 10 s |  |
| 300 | GPS Route Navigation | 12 s |  |
| 301 | Container Crane Port | 12 s |  |
| 302 | Subway Metro Map Dots | 12 s |  |
| 303 | Hotel Keycard Door Unlock | 10 s |  |
| 304 | Boarding Pass QR Scan | 10 s |  |
| 305 | Weather Forecast Sun & Cloud | 12 s |  |
| 306 | Compass North Needle | 12 s |  |
| 307 | EV Supercharger Map Pins | 12 s |  |
| 308 | SpaceX Rocket Booster Land | 12 s |  |
| 309 | 4K Geometric Memphis Loop | 12 s |  |
| 310 | Liquid Gradient Mesh Wave | 14 s |  |
| 311 | Minimalist Split Text Reveal | 10 s |  |
| 312 | VHS Retro Scanline Glitch | 10 s |  |
| 313 | Golden Luxury Dust Particles | 14 s |  |
| 314 | Corporate Grid Blueprint | 12 s |  |
| 315 | Neon Cyber Tunnel Grid | 12 s |  |
| 316 | Smooth Diagonal Wipe | 10 s |  |
| 317 | Award Laurel Wreath Gold | 12 s |  |
| 318 | Seamless Isometric Cube Wave | 14 s |  |
