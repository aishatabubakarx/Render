# 04-32-concepts-and-wave-4

32 Concepts + Wave 4 (clips 319-402)

84 clips (0 transparent). Every clip is the original animation code from the preview page, so **what you saw in the preview is what is rendered**:
the code runs in Chromium on a virtual clock, one frame every 1/30 s, and goes straight to ffmpeg. Every render is identical, and every clip is exactly one seamless loop
(its own loop length: 10, 12, 14, 15, 16 or 20 s). Clip numbers match the numbers in the preview page.

## Render on GitHub (no install)
1. Create a new repository and upload everything in this folder (keep the hidden `.github` folder).
2. Actions tab > **Render stock clips** > **Run workflow**. Pre-set to 1080p / MOV / 30 fps / release. Just press Run.
   Tip: the first time, type 2 or 3 clip numbers into **ids** to check the result before rendering all 84.
3. When it finishes, open **Releases**: every clip is a `.mov`, plus a JPG thumbnail per clip and `clips.csv` (number, title, loop length, transparent yes/no).
   84 clips are split over 20 parallel jobs, so the whole pack finishes in about the time of 5 clips.

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
| 319 | Planet Earth, Day and Night Rotation | 20 s |  |
| 320 | Gold Dust Comet | 12 s |  |
| 321 | Particle Planet with Orbit Rings | 16 s |  |
| 322 | Particle Ocean Waves | 14 s |  |
| 323 | Gold Confetti, Green Screen | 12 s |  |
| 324 | Liquid Glass Ribbon | 15 s |  |
| 325 | Phone Hero Turn | 16 s |  |
| 326 | Earth Sunrise from Orbit | 18 s |  |
| 327 | Falling 3D Hearts | 12 s |  |
| 328 | Capsule Rain | 10 s |  |
| 329 | Neural Network Graph | 14 s |  |
| 330 | Isometric Growth Bars | 12 s |  |
| 331 | Earth Global Network Arcs | 20 s |  |
| 332 | Earth at Night, City Lights | 20 s |  |
| 333 | Fireworks Finale over City | 16 s |  |
| 334 | Snowfall with Crystals | 14 s |  |
| 335 | Lightning Storm | 12 s |  |
| 336 | Rising Fire Embers | 12 s |  |
| 337 | Digital Code Rain | 12 s |  |
| 338 | Spiral Galaxy Rotation | 20 s |  |
| 339 | Meteor Shower | 14 s |  |
| 340 | Aurora Borealis over Lake | 16 s |  |
| 341 | Gold Coins Rain | 12 s |  |
| 342 | ECG Heartbeat Monitor | 10 s |  |
| 343 | DNA Double Helix | 14 s |  |
| 344 | Molecule Ball and Stick | 16 s |  |
| 345 | Atom with Electron Orbits | 14 s |  |
| 346 | Radial Audio Spectrum | 10 s |  |
| 347 | Hyperspace Jump | 10 s |  |
| 348 | Magic Sparkle Ring | 14 s |  |
| 349 | Soap Bubbles Rising | 14 s |  |
| 350 | HUD Loading Rings | 10 s |  |
| 351 | Planet Earth, Day and Night Rotation | 20 s |  |
| 352 | Gold Dust Comet | 12 s |  |
| 353 | Particle Planet with Orbit Rings | 16 s |  |
| 354 | Particle Ocean Waves | 14 s |  |
| 355 | Gold Confetti, Green Screen | 12 s |  |
| 356 | Liquid Glass Ribbon | 15 s |  |
| 357 | Phone Hero Turn | 16 s |  |
| 358 | Earth Sunrise from Orbit | 18 s |  |
| 359 | Falling 3D Hearts | 12 s |  |
| 360 | Capsule Rain | 10 s |  |
| 361 | Neural Network Graph | 14 s |  |
| 362 | Isometric Growth Bars | 12 s |  |
| 363 | Earth Global Network Arcs | 20 s |  |
| 364 | Earth at Night, City Lights | 20 s |  |
| 365 | Fireworks Finale over City | 16 s |  |
| 366 | Snowfall with Crystals | 14 s |  |
| 367 | Lightning Storm | 12 s |  |
| 368 | Rising Fire Embers | 12 s |  |
| 369 | Digital Code Rain | 12 s |  |
| 370 | Spiral Galaxy Rotation | 20 s |  |
| 371 | Meteor Shower | 14 s |  |
| 372 | Aurora Borealis over Lake | 16 s |  |
| 373 | Gold Coins Rain | 12 s |  |
| 374 | ECG Heartbeat Monitor | 10 s |  |
| 375 | DNA Double Helix | 14 s |  |
| 376 | Molecule Ball and Stick | 16 s |  |
| 377 | Atom with Electron Orbits | 14 s |  |
| 378 | Radial Audio Spectrum | 10 s |  |
| 379 | Hyperspace Jump | 10 s |  |
| 380 | Magic Sparkle Ring | 14 s |  |
| 381 | Soap Bubbles Rising | 14 s |  |
| 382 | HUD Loading Rings | 10 s |  |
| 383 | Solar System Orbits | 20 s |  |
| 384 | Total Solar Eclipse | 14 s |  |
| 385 | Ringed Gas Giant with Moon | 18 s |  |
| 386 | Rocket Ascent | 12 s |  |
| 387 | Satellite Scan over Earth | 20 s |  |
| 388 | Rain Ripples on Water | 14 s |  |
| 389 | AI Voice Orb | 12 s |  |
| 390 | Blockchain Chain Pulse | 12 s |  |
| 391 | Gold Bitcoin Spin | 12 s |  |
| 392 | Circuit Board Pulse | 14 s |  |
| 393 | Cyber Shield Scan | 12 s |  |
| 394 | Wireless Signal Pulse | 12 s |  |
| 395 | Night Highway Light Trails | 14 s |  |
| 396 | Storm Rain on Ground | 12 s |  |
| 397 | Ocean Sunset Glitter | 16 s |  |
| 398 | Star Trails over Ridge | 16 s |  |
| 399 | Candle Flame | 10 s |  |
| 400 | Cinematic Countdown 10 to 1 | 10 s |  |
| 401 | Kaleidoscope Mandala | 16 s |  |
| 402 | Blood Cells in Vessel | 14 s |  |
