---
name: readme-vector-animator
description: Use when generating, creating, or customizing animated SVGs for GitHub profile READMEs and web applications. Supports animated vector characters (Cyber Bot, Pixel Dev at desk, Ninja Coder, Builder, Wizard, custom avatars), kinetic typography, dynamic hero banners (fire, matrix, neon), cyber frames, border beams, and floating tech orbits. Optimized for 60fps GPU performance and GitHub Camo sanitizer compliance.
---

# Readme Vector Animator & Character Motion Studio

A specialized skill for crafting standalone, production-grade **animated SVGs** that run at 60fps inside GitHub profile `README.md` files (passing through GitHub's `camo` image sanitizer) and modern web applications with zero external dependencies and zero JavaScript.

---

## 1. GitHub Camo Sanitizer Invariants (Mandatory for README.md)

Every image embedded in a GitHub README passes through GitHub's Camo CDN proxy (`https://camo.githubusercontent.com/...`). To ensure animations render reliably without being stripped or broken:

1. **Zero `<script>` Tags**: GitHub Camo completely removes `<script>` tags. All movement must be executed purely via native SVG elements and embedded CSS `@keyframes`.
2. **Zero `<foreignObject>`**: GitHub's HTML sanitizer strips `<foreignObject>` tags entirely. All text must use native SVG `<text>` and `<tspan>` elements.
3. **No External `@import` or Web Fonts**: External font requests (`@import url(...)`) are blocked by Camo. Always configure universal system monospace and sans fallback font stacks:
   ```css
   font-family: 'Fira Code', 'JetBrains Mono', 'Segoe UI', ui-monospace, Menlo, Monaco, Consolas, monospace;
   ```
4. **Mandatory Reduced-Motion Accessibility**: Every animated SVG must include `@media (prefers-reduced-motion: reduce)` to support users with vestibular sensitivity:
   ```css
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.001ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.001ms !important;
     }
   }
   ```
5. **60fps GPU Compositor Rules**:
   - Only animate `transform` (`translate3d`, `rotate`, `scale`) and `opacity`.
   - Never animate layout geometry (`width`, `height`, `x`, `y`, `cx`, `cy`) which forces expensive CPU repaints.
   - Always set `transform-box: fill-box; transform-origin: center;` on animated elements to prevent spatial coordinate drift.
6. **Dual Dark/Light Theme Support**:
   Embed `@media (prefers-color-scheme: light)` overrides directly in the SVG so a single file adapts automatically to GitHub's light and dark themes.

---

## 2. Animated Vector Characters Matrix

The engine provides 5 iconic, purposefully animated developer characters that can be embedded individually or composed into dynamic scene banners:

### Character Models:

| Character | Anatomy & Aesthetic | Signature Movement | Default Stationing |
| :--- | :--- | :--- | :--- |
| **Cyber Bot** | Hovering chassis, cyan glowing optics, blinking yellow LED antenna beacon, pulsing thruster flame. | Smooth hovering levitation (`translateY(±6px)`), flickering thruster exhaust flame, floating speech bubble with live terminal messages. | Top-right corner or floating beside code block |
| **Pixel Developer** | Dark purple hoodie, cyan visor, cozy dark-wood workstation desk, dual glowing CRT monitors, coffee cup with steam. | Mechanical keyboard typing hands (`translateY(±2px)` alternate), scrolling matrix code lines on screens, curling coffee steam. | Bottom-left corner or centered in workstation banner |
| **Ninja Coder** | Stealth black tunic, glowing cyan eyes, fluttering red headband ribbons, back katana sheath. | Dynamic combat/coding crouch, fluttering headband ribbons, blade glint reflection swipe, pulsing energy aura. | Right flank or patrolling runner baseline |
| **Builder Crafter** | Bright yellow safety hardhat, high-vis vest, utility toolbelt, heavy work boots. | Rhythmic hammer swing with spark showers, stacking modular tech blocks (`<DATA>`, `API.v2`, `CLOUD`) that lock into place with golden glow. | Construction site banner or bottom progress bar |
| **Wizard Mage** | Starry cosmic wizard hat and indigo robes, glowing crystal staff with floating magical orbs. | Pulsating arcane staff tip, orbiting magical motes/sparks, rotating runic circle beneath feet. | Left flank of title or project showcase |

### Purposeful Kinematics & Speech Bubbles:
- Characters must never stand static. They should be doing purposeful work: typing, welding, casting spells, patrolling, or celebrating.
- Characters can feature animated **speech bubbles** or **terminal HUDs** communicating status:
  - `"⚡ Ready to deploy"`
  - `"🚀 All systems operational"`
  - `"✨ 86-day streak active"`
  - `"🛡️ Zero telemetry • 100% Client-Side"`

---

## 3. Beyond Characters: Universal Animation Catalog

The animator is **not limited to characters**. Use these visual layers to build complete, multi-layered animations:

### A. Kinetic Typography
- **Typewriter Effect**: Monospace text revealed character-by-character using SVG clipping masks or staggered character reveals paired with a blinking block cursor (`_` or `▋`).
- **Cyber Glitch**: Chromatic red/cyan split duplicates with horizontal slice offsets (`clip-path: polygon(...)`) triggered on periodic bursts.
- **Gradient Chrome Shimmer**: Moving `<linearGradient>` with traveling color stops sweeping across headline text.
- **Wave Undulation**: Sine-wave displacement on sequential letters for fluid, organic headlines.

### B. Atmospheric Backgrounds
- **Fire & Rising Embers**: Blazing heat core gradient with floating, flickering ember particles drifting upward.
- **Matrix Digital Rain**: Vertical cascading streams of glowing green/cyan alphanumeric characters with decaying trails.
- **Deep Space Nebula & Twinkle Stars**: Layered starfields with variable twinkle rates and luminous cosmic clouds.
- **CRT Terminal Bezel**: Rounded monitor chassis with horizontal scanline raster lines and phosphor tube glow.
- **Cyber Grid**: Isometric or orthogonal grid lines with travelling light pulses along axes.

### C. Cyber Frames & Border Beams
- **Laser Border Beam**: Traveling bright laser segment racing along the card perimeter using `stroke-dasharray` and `stroke-dashoffset`.
- **Targeting HUD**: Corner brackets, telemetry coordinate tags (`SYS.OK // 60FPS`), and rotating crosshairs.
- **Glassmorphism Rim**: Frosted glass translucent border with 45° specular light reflection swipe.

### D. Floating Tech Stack Orbits
- Circular or elliptical orbits featuring vector tech badges (TypeScript, React, Python, Rust, Docker, Kubernetes).
- Badges maintain orientation while traveling around a central pulsating developer core or avatar.

### E. Gamified Metric Cards
- **Commit Streak Fire Meter**: Blazing flame icon with animated streak counter and pulsing heat bar.
- **Radar & Activity HUD**: Circular scanning sweep with radar blips marking recent contributions.
- **Trophy Shelves**: Gilded 3D trophy silhouettes with traveling light gleams.

---

## 4. How to Embed in GitHub `README.md` (User Copy-Paste Ready)

Always provide the user with clear, copy-pasteable Markdown snippets when generating animated SVGs.

### Method 1: Centered Clean Embed (Recommended)
```markdown
<p align="center">
  <img src="assets/banner.svg" alt="MonoForge Profile Banner" width="100%" />
</p>
```

### Method 2: Automatic Dark/Light Theme Switching
```markdown
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.svg">
    <img src="assets/banner-dark.svg" alt="MonoForge Profile Banner" width="100%">
  </picture>
</p>
```

### Method 3: Cloud / Raw GitHub URL (When hosting in repo)
```markdown
![Developer Banner](https://raw.githubusercontent.com/<username>/<username>/main/assets/banner.svg)
```

---

## 5. Standard SVG Template Structure

When generating standalone animated SVGs for README.md, adhere to this self-contained structure:

```xml
<svg width="100%" height="auto" viewBox="0 0 850 260" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 1. Embedded Styles & Keyframes -->
    <style>
      @keyframes hover {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-7px); }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.15; }
      }
      @keyframes beam {
        to { stroke-dashoffset: -1000; }
      }
      @keyframes pulse-glow {
        0%, 100% { filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.5)); }
        50% { filter: drop-shadow(0 0 16px rgba(56, 189, 248, 0.8)); }
      }
      .anim-hover {
        animation: hover 3.2s ease-in-out infinite;
        transform-box: fill-box;
        transform-origin: center;
      }
      .anim-beam {
        stroke-dasharray: 140 320;
        animation: beam 7s linear infinite;
      }
      .anim-blink {
        animation: blink 1.2s ease-in-out infinite;
      }
      .terminal-font {
        font-family: 'Fira Code', 'JetBrains Mono', Consolas, monospace;
      }
      @media (prefers-reduced-motion: reduce) {
        * { animation: none !important; }
      }
      @media (prefers-color-scheme: light) {
        .bg-card { fill: #f8fafc !important; stroke: #e2e8f0 !important; }
        .text-main { fill: #0f172a !important; }
        .text-sub { fill: #475569 !important; }
      }
    </style>

    <!-- 2. Gradients & Filters -->
    <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="50%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect class="bg-card" width="850" height="260" rx="20" fill="#090a10" stroke="#1e2238" stroke-width="1.5" />

  <!-- Animated Cyber Border Beam -->
  <rect class="anim-beam" x="1.5" y="1.5" width="847" height="257" rx="19" fill="none" stroke="url(#cyber-grad)" stroke-width="2.5" />

  <!-- Content Group -->
  <g class="anim-hover">
    <!-- Character or Central Graphic -->
  </g>

  <!-- Typography Group -->
  <g id="typography">
    <text class="text-main terminal-font" x="48" y="72" font-size="24" font-weight="800" fill="#ffffff">
      &gt; DEVELOPER_NAME
    </text>
    <text class="text-sub terminal-font" x="48" y="104" font-size="13" font-weight="500" fill="#94a3b8">
      Full-Stack Systems &amp; Autonomous AI Engineering
    </text>
  </g>
</svg>
```

---

## 6. Action Checklist for the Agent

When the user requests an animation or character for their README:
1. **Determine the Animation Type**: Character scene, dynamic banner, kinetic typography, cyber frame, or tech orbit.
2. **Select or Design the Assets**:
   - If a character is requested: pick one from the catalog (Cyber Bot, Pixel Dev at desk, Ninja Coder, Builder, Wizard) or construct a new custom avatar adhering to the standard anatomical coordinate system.
   - If a non-character animation is requested: compose complementary atmospheric backgrounds, kinetic typography, border beams, and stats badges.
3. **Verify GitHub Camo Safety**: No `<script>`, no `<foreignObject>`, no external font files, 60fps transform/opacity animations only.
4. **Save the File**: Save the resulting SVG file directly into the repository (e.g. `public/assets/<name>.svg` or `assets/<name>.svg`).
5. **Output Ready-to-Use Markdown**: Provide the user with the exact `<p align="center"><img ... /></p>` snippet for immediate copy-pasting into their `README.md`.
