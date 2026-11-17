# stock-clips-all

368 clips (23 transparent) in one project. Every clip is the original animation code from the preview, rendered on a virtual clock, **4K (3840x2160), 30 fps, ProRes MOV** by default.
Clip numbers match the preview page. Each clip is one seamless loop of its own length (10 to 20 s).

## Render on GitHub
1. Create a repository and upload everything in this folder (keep the hidden `.github` folder).
2. Actions > **Render stock clips** > **Run workflow**. Pre-set to 4K / MOV / 30 fps / artifact. Tip: type 2 or 3 clip numbers in **ids** first.
3. The clips are split into 60 jobs (20 run at once). Each job makes an artifact `clips-N-0` (about 6 clips, with a JPG thumbnail each). A `stock-pack` artifact holds `clips.csv`, `adobe_stock.csv`, `metadata_full.csv` (draft titles and keywords: read them before uploading).
   Artifacts are kept 30 days. Your existing stock-upload workflow works with these names (set its shard list to 0-59).

## Transparent clips
ProRes 4444 `.mov` with a real alpha channel. The **alpha** choice: `premultiplied` (default; colour stored as seen over black, so previews that ignore alpha look like the preview page; in Premiere / After Effects set Interpret Footage > Alpha > Premultiplied) or `straight` (usual editor default). Try one clip each way first.

## Render time
Page and gallery clips take a few minutes each at 4K. Clip 1 (Gold Dust Halo, 58,000 particles) takes about an hour at 4K.

## Folders
`anims/` the animation pages and Python clips (original code), `vendor/` three.js, `catalog.json` clip list, `render.py` the renderer.

## Clips
| # | Title | Loop | Transparent |
|---|---|---|---|
| 1 | Gold Dust Halo | 15 s | yes |
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
| 403 | Glitter Dust Trail (original look) | 15 s |  |
| 404 | Gold Spiral (original look) | 15 s |  |
| 405 | Aurora Chase (original look) | 15 s |  |
| 406 | Orbit Halo (original look) | 15 s |  |
| 407 | Hot Air Balloons Over Valley | 12 s |  |
| 408 | Contactless Phone Payment | 12 s |  |
| 409 | Biometric Fingerprint Scan | 12 s |  |
| 410 | Blood Cells Flowing Through Vessel | 12 s |  |
| 411 | Satellite Orbit Over Earth | 12 s |  |
| 412 | Idea Lightbulb and Gears | 12 s |  |
| 413 | Snowy Cabin Winter Night | 12 s |  |
| 414 | City Fireworks Finale | 12 s |  |
| 415 | Neon OPEN Sign on Brick | 12 s |  |
| 416 | Water Drop Macro Ripples | 12 s |  |
