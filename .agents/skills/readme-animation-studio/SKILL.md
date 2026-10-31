---
name: readme-animation-studio
description: Comprehensive technical specification, architecture invariants, and generation rules for creating GitHub-compliant animated SVG banners, dynamic typography, backgrounds, 3D illusions, UI motion, scroll effects, and export tooling in MonoForge.
---

# MonoForge Animation Studio & Motion Skill

This skill provides complete guidelines for authoring, modifying, testing, and exporting dynamic animations and motion effects for GitHub profile READMEs, repository banners, and web application interfaces.

---

## 1. Core Principles & GitHub Camo Invariants

GitHub profile READMEs are proxied and sanitized through GitHub's `camo` CDN (`https://camo.githubusercontent.com/...`). Adhere to these strict invariants:

1. **Zero `<script>` Tags**: All interactivity and motion must be executed purely via declarative SVG elements, CSS `<style>` blocks, and CSS `@keyframes`. Camo strips `<script>` elements entirely.
2. **Zero `<foreignObject>`**: GitHub's HTML sanitizer strips `<foreignObject>` elements. Render all typography as native SVG `<text>` elements with `<tspan>`.
3. **No External Fonts via `@import`**: External `@import url('https://fonts.googleapis.com/...')` is blocked or ignored by Camo. Always configure robust system fallback stacks:
   ```css
   font-family: 'Fira Code', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
   ```
4. **Mandatory Accessibility**: Every animation must embed the `@media (prefers-reduced-motion: reduce)` media query:
   ```css
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.001ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.001ms !important;
     }
   }
   ```
5. **Alt-Text Fallback**: Never emit a raw image tag without meaningful alt text summarizing the banner's content in case images fail to load.

---

## 2. Text Effects Matrix

All text animations are driven by CSS keyframes applied to SVG `<text>` or layered duplicate `<text>` elements.

| Effect | Technique | CSS Keyframe Mechanism | Visual Impression |
|---|---|---|---|
| **typing** | `stroke-dashoffset` / step opacity + flashing cursor `<rect>` | Steps opacity or clipping with a periodic blinking cursor element | Retro terminal shell typewriter output |
| **scramble** | Periodic glyph opacity alternate + discrete translation steps | Rapid jittering `letter-spacing` and opacity flicker | Matrix cipher decryption / data deciphering |
| **gradient** | Animated `<linearGradient>` with moving `<stop offset>` | Infinite horizontal translation `x1`/`x2` sweep | Iridescent chrome shimmer across characters |
| **glitch** | Duplicate red/cyan `<text>` with chromatic displacement | `clip-path: polygon(...)` slices + `transform: translate(±2px, ±1px)` | Cyberpunk CRT glitch and signal desynchronization |
| **wave** | Staggered sinusoidal `translateY` on sequential `<tspan>` characters | Sine curve displacement with incremental animation delays | Oceanic rolling fluid wave |
| **reveal** | Vertical slide-up with dynamic SVG `clipPath` curtain | `clipPath` expanding height while text moves up from offset | Modernist editorial reveal on arrival |

---

## 3. Background Effects Matrix

Rendered within the `<g id="background-layer">` group:

1. **fire**: Rising heat ember particles (`@keyframes emberRise`), blazing multi-stop flame gradient (`#ff1a1a` -> `#ff6600` -> `#ffee32`), animated licking curves, and radial heat core.
2. **water**: Fluid undulating sinusoidal wave layers, expanding water drop concentric ripples (`@keyframes waterDropRipple`), and caustic oceanic depth gradients.
3. **particles**: Staggered floating `<circle>` elements with variable radii (1.5px–3.5px) drifting upward with randomized pulse cycles.
4. **grids**: Subtle perspective or orthogonal grid lines `<line>` with traveling coordinate dots or glowing scanner sweeps.
5. **stars**: Multi-layered starfield with 2-level twinkle animations (brightness scaling from 0.2 to 1.0) and deep space nebula gradients.
6. **animated-gradient**: Multi-point dynamic radial and linear gradients that morph hues between primary, secondary, and accent colors.
7. **matrix**: Vertical streams of glowing monospace alphanumeric characters cascading with varying trail opacities.
8. **solid**: Clean dark slate or high-contrast background with subtle vignette borders.

---

## 3.1 Frame & Cyber Border Effects Matrix

Rendered within the `<g id="frame-layer">` overlay:

1. **cyber-neon**: High-voltage laser chasing border (`stroke-dasharray: 120 240`) with animated corner targeting brackets and drop-shadow glow.
2. **glassmorphism**: Translucent frosted glass rim with 45-degree traveling specular light sheen reflection.
3. **terminal-crt**: Retro curved CRT monitor bezel, horizontal scanline raster overlay, and corner chassis mounting bolts.
4. **hologram**: Sci-fi targeting HUD with telemetry coordinates (`SYS.RDY // 60FPS`), cardinal crosshair ticks, and vertical laser scanner.
5. **gold-metallic**: Luxurious 3D beveled metallic gold border (`#bf953f` -> `#fcf6ba` -> `#b38728`) with twinkling 4-point star glints.
6. **fire-border**: Blazing perimeter frame with heat pulsation keyframes and flame embers.

---

## 3.2 Animated Vector Characters & Actions Matrix

Rendered within the `<g class="char-layer">` group along the baseline runner:

### Character Models:
1. **pixel-dev**: Retro cyberpunk developer in dark hoodie (`#1e1b4b`), cyber visor (`#00f5d4`), and blue headphones.
2. **cyber-bot**: Hovering robotic companion with blinking antenna beacon, glowing visor optics, energy core, and pulsing thruster flame.
3. **builder-crafter**: Master architect in bright yellow safety hardhat, high-vis safety vest, and utility toolbelt.
4. **ninja-coder**: Cyber shinobi in dark stealth tunic with trailing fluttering headband ribbons and glowing cyan eyes.
5. **wizard-mage**: Software sorcerer in starry wizard hat and robes, casting spells with a pulsating arcane crystal staff.

### Character Actions:
1. **walk**: Horizontal back-and-forth patrol movement across the banner baseline with alternating leg swings and body bobbing.
2. **build**: Active construction scene where the character swings a hammer with spark bursts, stacking modular tech blocks (`<DATA>`, `API.v2`, `CLOUD`) while a top core block drops from a crane and locks with golden glow.
3. **code**: Character stationed at a floating translucent holographic workstation HUD typing with animated hands as code lines and cursor blink.
4. **construct**: Heavy industrial welding on a circuit truss tower with intense electrical blue arc flashes and falling spark showers.
5. **cheer**: Celebratory victory jump with raised arms in 'V' shape, spinning gold trophy/star, and fluttering multi-colored confetti.

---

## 4. SVG Vector Effects

1. **line-drawing**: Uses `stroke-dasharray` matching path length and animates `stroke-dashoffset` from length to 0 to create realistic pen tracing.
2. **path-morphing**: Smoothly interpolates `d` attributes or uses concentric polygon breathing via scale and rotate keyframes.
3. **animated-logo**: High-tech rotating tech emblem featuring nested gear rings, orbital satellites, and central monogram core.

---

## 5. 3D Illusions in Pure SVG

Because pure SVG has no native 3D engine, use trigonometric projections and layered affine transforms:

1. **rotating-cube**: Isometric 3-face wireframe projection with shading gradients that oscillate scale and shear to simulate 3D tumbling.
2. **interactive-card**: Dimensional card bevel with specular highlight gradient moving across the surface at a 45° angle.
3. **particle-environment**: Perspective depth warp tunnel where concentric rings expand exponentially towards the viewer to simulate hyperspace transit.

---

## 6. UI Motion & Micro-Interactions

For web interfaces and rich React components:

- **Spring Transitions**: Damped harmonic oscillation curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`) for tactile hover states.
- **Specular Hover Effects**: Dynamic cursor-following specular glare via radial gradient masks and border glow.
- **Animated Panels**: Spring-driven collapsible drawers with CSS `grid-template-rows: 0fr -> 1fr` for zero-layout-shift expansion.
- **Drag-and-Drop**: Tactile elevation shadows, reordering animations, and grab/grabbing cursor feedback.

---

## 7. Scroll Effects

For documentation and portfolio landing pages:

- **Reveal on Scroll**: IntersectionObserver-triggered `fade-in-up` transitions.
- **Parallax Layers**: Foreground text and background particle planes moving at differentiated velocity coefficients (e.g., 0.2x vs 0.7x).
- **Pinned Sections**: Sticky header/viewport pinning while narrative telemetry scrolls underneath.
- **Scroll-Linked Sequences**: Progress bars or SVG stroke-dash scrubbers bound to document scroll percentage.

---

## 8. Export Protocols

MonoForge provides four standard export formats:

1. **Markdown Relative Link** (Best for local repositories):
   ```markdown
   ![Developer Profile Banner](./public/assets/monoforge-banner.svg)
   ```
2. **GitHub Raw URL** (Best for remote display across forks and web):
   ```markdown
   ![Developer Profile Banner](https://raw.githubusercontent.com/<user>/<repo>/main/public/assets/monoforge-banner.svg)
   ```
3. **Data URI** (Zero external HTTP request dependency):
   ```markdown
   ![Developer Profile Banner](data:image/svg+xml;utf8,<encoded_svg>)
   ```
4. **Hosted Demo Link** (Shareable studio state):
   ```markdown
   [![Inspect in MonoForge Studio](https://img.shields.io/badge/MonoForge-Studio%20Demo-6366f1?style=for-the-badge&logo=sparkles)](https://monoforge-studio.vercel.app/en/developer)
   ```
5. **WebP & GIF Export**:
   Run the headless render script:
   ```bash
   python scripts/animate_hero.py
   ```

---

## 9. Verification & Quality Gates

Before releasing any animation or studio update:

1. Run unit test suite:
   ```bash
   corepack pnpm vitest run src/lib/animator/animator.test.ts
   ```
2. Validate SVG against the GitHub sanitizer rules in `src/lib/animator/validator.ts`.
3. Check size budget: banners should stay under **200 KB** (uncompressed) to load instantly over mobile networks.
4. Verify accessibility: toggle `reducedMotion` to ensure the banner remains legible and frozen for sensitive users.
