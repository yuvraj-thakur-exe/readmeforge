# Animated Vector & Character Motion Engine (README.md & Web)

Instructions for any AI coding agent generating animated SVGs, character kinematics, or dynamic visuals in this project.

## 1. Scope & Capabilities
You are equipped to author, animate, and embed standalone 60fps vector animations for GitHub profile READMEs and web applications. You are **NOT limited to characters**. You can generate:
- **Interactive Characters**:
  - **Cyber Bot**: Hovering chassis, thruster flame flicker, blinking antenna beacon, glowing eye visor, and floating status speech bubble.
  - **Pixel Developer**: Cozy developer in hoodie at dark-wood desk, dual glowing CRT monitors with scrolling code lines, typing hands, and rising coffee steam.
  - **Ninja Coder**: Cyber shinobi stealth stance, fluttering red headband ribbons, blade glint reflection, dash motion lines.
  - **Builder Crafter**: Safety hardhat, swinging hammer, electrical spark bursts, stacking modular tech blocks (`<DATA>`, `API.v2`, `CLOUD`).
  - **Wizard Mage**: Arcane robes, pulsating crystal staff, rotating magical runic circle.
  - **Custom Avatars**: Any custom mascot, robot, or developer avatar using standardized anchor anatomy.
- **Dynamic Banners & Atmospheric FX**: Fire embers, Matrix digital rain, Starfield twinkle, CRT monitor scanlines, Cyber grids.
- **Kinetic Typography**: Terminal typewriter with blinking cursor, chromatic glitch split, gradient chrome sweep.
- **Cyber Frames & Border Beams**: Continuous laser border beams (`stroke-dasharray`), targeting crosshairs, corner brackets.
- **Floating Tech Orbits**: Elliptical orbiting tech badges (TypeScript, Rust, React, Docker, Kubernetes).
- **Gamified Metric HUDs**: Fire commit streak meters, circular progress gauges, and radar scanners.

## 2. GitHub Camo Sanitizer Invariants
When generating SVGs for GitHub profile `README.md` files:
1. **Zero `<script>`**: GitHub strips all JavaScript. All motion must be pure SVG + CSS `@keyframes`.
2. **Zero `<foreignObject>`**: GitHub HTML sanitizer strips them. Typography must be native `<text>` / `<tspan>`.
3. **No External Fonts**: External `@import` is blocked by Camo. Always use system monospace stacks:
   `font-family: 'Fira Code', 'JetBrains Mono', Consolas, monospace;`
4. **60fps GPU Compositor Acceleration**:
   - Animate ONLY `transform` and `opacity`. Never animate `x`, `y`, `width`, `height`.
   - Always set `transform-box: fill-box; transform-origin: center;` on animated elements.
5. **Mandatory Reduced-Motion A11y**: Always embed `@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }`.
6. **Dual Dark/Light Theme Switching**: Support light and dark GitHub interfaces via embedded `@media (prefers-color-scheme: light)` or Markdown `<picture>` tags.

## 3. User Output Format
Whenever generating an animated SVG for a README:
1. Save the SVG file to the project (e.g. `public/assets/<name>.svg` or `assets/<name>.svg`).
2. Provide the user with the exact copy-pasteable Markdown snippet:
   ```markdown
   <p align="center">
     <img src="assets/<name>.svg" alt="Dynamic Profile Animation" width="100%" />
   </p>
   ```
   Or dual-theme `<picture>` tags when dark/light variants are generated.
