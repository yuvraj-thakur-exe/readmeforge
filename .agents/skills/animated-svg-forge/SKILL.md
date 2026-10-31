---
name: animated-svg-forge
description: Use when creating, designing, generating, or customizing animated SVGs, dynamic banners, animated text effects, glowing frames, particle backgrounds, or profile graphics. Also use whenever the user says "create an animated [prompt]" or wants custom animated vector art for GitHub profiles or web applications.
license: MIT
metadata:
  author: MonoForge
  version: "1.1.0"
---

# Animated SVG Forge

A production-grade skill for authoring standalone, high-performance **animated SVGs** with rich CSS keyframes, vector motion graphics, cyber frames, and text animations tailored for GitHub profiles, READMEs, and modern web apps.

Integrated with:
- [Simple Icons](https://github.com/simple-icons/simple-icons) for 3,200+ brand and language vector paths.
- [thesvg](https://github.com/glincker/thesvg) for generative wave dividers, isometric cyber grids, and glassmorphism filters.
- [awesome-web-animation](https://github.com/sergey-pimenov/awesome-web-animation) for 60fps GPU compositor acceleration, cubic-bezier easing, and reduced-motion a11y.
- [Effect-TS](https://github.com/Effect-TS/effect) principles for typed failure boundaries and deterministic SVG synthesis.

---

## Non-Negotiable Invariants

1. **Always Prompt for at least One Image / Hero Visual**:
   Whenever a user asks to design, animate, or customize a banner, frame, or profile section, you **MUST always prompt the user to provide or generate at least one visual image** (e.g., character art, avatar, workspace concept art, or 3D render). Pairing dynamic animated SVGs with a high-contrast hero image elevates visual hierarchy and aesthetic quality from a flat vector into a stunning developer showcase.
   - If the user has an image: integrate and complement it with matched SVG frames, overlays, and color palettes.
   - If the user does not have an image: offer to generate one via `generate_image` or provide an aesthetic fallback.

2. **GitHub Camo & Theme Compatibility**:
   - Every animated SVG embedded in GitHub markdown passes through GitHub's Camo image proxy.
   - Never rely on external stylesheets or web fonts; all `@keyframes`, animations, and font declarations must be embedded directly inside `<style>` blocks within the `<svg>`.
   - Support dark and light GitHub themes using embedded `@media (prefers-color-scheme: light)` and `@media (prefers-color-scheme: dark)` overrides with high-contrast text fills (`#ffffff` / `#0b0b12`).
   - For maximum reliability on GitHub, provide dual-theme `<picture>` tags with dark and light variants where appropriate.

3. **60fps GPU Compositor Rules (awesome-web-animation)**:
   - Only animate `transform` (`translate3d`, `scale`, `rotate`) and `opacity`.
   - Never animate layout properties (`width`, `height`, `x`, `y`, `cx`, `cy`) which trigger CPU repaints.
   - Always include `@media (prefers-reduced-motion: reduce)` to support vestibular accessibility.

4. **Self-Contained & Optimized**:
   - Embed [Simple Icons](references/simple-icons-integration.md) paths directly inside the SVG rather than making external HTTP requests.
   - Clean `viewBox` coordinates for responsive fluid scaling (`width="100%"`).
   - Keep animated SVG file sizes under 30 KB for instant loading without lag or proxy timeouts.

---

## Activation & Triggering

Activate this skill when:
- The user says **"create an animated [prompt]"** or **"make an animated svg for [prompt]"**.
- The user requests animated banners, header graphics, tech card animations, or profile badges.
- Designing custom frames, animated border beams, or neon outline boxes.
- Building dynamic text animation effects (typing, glitch, wave, neon pulse, gradient shimmer, matrix rain).
- Adding animated characters, particle sparks, flame/fire effects, or fluid water ripple visuals.

---

## 4-Step Production Workflow

### Step 1: Clarify & Request the Hero Visual Asset

Before writing code, analyze the prompt and engage the user:

```markdown
To make this animation look truly exceptional and professionally balanced:
1. **Hero Visual**: Do you have a character, avatar, or concept image you'd like to feature alongside this animated SVG? (I can also generate a custom 3D developer/character illustration for you).
2. **Tech & Brand Vectors**: What tech stack or brand icons would you like included from [Simple Icons](https://github.com/simple-icons/simple-icons)? (e.g. TypeScript, React, Python, Rust, Docker, Kubernetes).
3. **Theme & Palette**: What aesthetic vibe do you prefer? (e.g. Cyberpunk Violet/Cyan, Tokyo Night, Emerald Matrix, Minimalist Monochrome, or Flame/Solar).
4. **Dimensions**: Standard banner (800x220), header card (1000x320), or compact widget (460x140)?
```

> **Rule**: If the user asks for immediate generation without specifying, select the optimal palette and dimensions autonomously, but still ask/remind them to add or generate a complementary visual image to maximize visual impact.

---

### Step 2: Choose the Motion Architecture

Combine 2 to 3 complementary animation layers from the catalog:

| Layer Type | Effects Available | Best For | Reference |
| :--- | :--- | :--- | :--- |
| **A. Text Motion** | Typewriter, Glitch RGB-split, Neon Glow Pulse, Gradient Shimmer, Wave Cascade | Headlines, names, titles, taglines | [awesome-web-animation](references/web-animation-performance.md) |
| **B. Borders & Frames** | Cyber Border Beam, Rotating Conic Gradient, Neon Corner Brackets, Circuit Traces | Card wrappers, profile headers, badges | [thesvg](references/thesvg-vector-patterns.md) |
| **C. Background FX** | Drifting Particle Embers, Laser Scanlines, Cosmic Stars, Matrix Digital Rain | Atmosphere, depth, command-deck vibe | [thesvg](references/thesvg-vector-patterns.md) |
| **D. Tech & Brand Chips**| Orbiting Simple Icons, Floating Badges, Skill Rings | Tech stacks, toolchains | [Simple Icons](references/simple-icons-integration.md) |
| **E. Dynamic Action** | Walking bot/character, Anvil Spark Impacts, Flame/Water waves | Gamification, interactive personality | [presets](references/animation-presets.md) |

---

### Step 3: Author the Animated SVG

Use pure, valid SVG XML with inline vector shapes and CSS keyframes.

#### 1. Core Boilerplate & Dark/Light Theme Switching
```xml
<svg width="100%" height="auto" viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Dynamic Gradients -->
    <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="50%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>

    <!-- Glow Filters (thesvg pattern) -->
    <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <style>
    /* 60fps GPU acceleration (awesome-web-animation) */
    .wordmark {
      fill: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif;
      font-weight: 800;
      font-size: 34px;
    }
    .subtext {
      fill: #94a3b8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif;
      font-size: 15px;
    }
    @media (prefers-color-scheme: light) {
      .wordmark { fill: #0f172a; }
      .subtext { fill: #475569; }
    }
    @media (prefers-reduced-motion: reduce) {
      * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
    }
  </style>

  <!-- Vector Elements & Animation Paths -->
</svg>
```

#### 2. Animated Tech Chips with Simple Icons
```xml
<!-- Orbiting TypeScript Badge -->
<g transform="translate(680, 50)">
  <circle cx="20" cy="20" r="22" fill="#0b0f19" stroke="#3178C6" stroke-width="1.5">
    <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
  </circle>
  <svg x="8" y="8" width="24" height="24" viewBox="0 0 24 24" fill="#3178C6">
    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.71-.246 5.82 5.82 0 0 0-.837-.163 5.372 5.372 0 0 0-.969-.074c-.58 0-1.026.104-1.336.313-.31.209-.465.525-.465.948 0 .274.075.503.226.686.15.183.356.337.618.461.262.124.57.234.924.331.355.097.74.202 1.156.314.483.13.931.29 1.344.482.413.192.766.435 1.058.73.292.294.512.651.66 1.071.148.42.222.928.222 1.523 0 .762-.143 1.417-.43 1.966a3.84 3.84 0 0 1-1.189 1.385c-.506.347-1.12.597-1.843.75a8.775 8.775 0 0 1-2.073.23c-.732 0-1.428-.063-2.088-.19a8.196 8.196 0 0 1-1.776-.566v-2.613c.66.383 1.353.67 2.08.86.726.19 1.45.285 2.17.285.596 0 1.07-.11 1.42-.33.352-.22.528-.564.528-1.03 0-.312-.083-.574-.25-.785a2.535 2.535 0 0 0-.693-.538 5.86 5.86 0 0 0-1.018-.387c-.417-.116-.867-.235-1.35-.357a7.712 7.712 0 0 1-1.458-.518 3.882 3.882 0 0 1-1.147-.79 3.01 3.01 0 0 1-.685-1.123c-.156-.445-.234-.974-.234-1.587 0-.71.139-1.32.418-1.831a3.81 3.81 0 0 1 1.15-1.312c.488-.328 1.08-.565 1.777-.71a8.3 8.3 0 0 1 2.05-.218zm-8.85 2.375h2.868v9.552H9.638z" />
  </svg>
</g>
```

#### 3. Animated Cyber Frame & Border Beam
```xml
<!-- Outer container rect -->
<rect x="2" y="2" width="796" height="236" rx="16" fill="#0b0f19" stroke="#1e293b" stroke-width="1.5" />

<!-- Orbiting Border Beam (animating dashoffset) -->
<rect x="2" y="2" width="796" height="236" rx="16" fill="none"
      stroke="url(#primary-grad)" stroke-width="2.5"
      stroke-dasharray="140 600" stroke-linecap="round">
  <animate attributeName="stroke-dashoffset" from="0" to="-740" dur="4s" repeatCount="indefinite" />
</rect>

<!-- Corner Tech Accents -->
<path d="M12 28 V16 H28" stroke="#06b6d4" stroke-width="2" fill="none" />
<path d="M788 28 V16 H772" stroke="#06b6d4" stroke-width="2" fill="none" />
```

---

### Step 4: Save & Provide Integration Snippets

1. **Save Asset**: Save the generated SVG to `public/assets/<filename>.svg` (or project public asset directory).
2. **Generate README Markdown Integration**:
   Provide the user with high-availability, responsive embed code:
   ```html
   <div align="center">
     <picture>
       <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/<user>/<repo>/main/public/assets/<filename>-dark.svg">
       <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/<user>/<repo>/main/public/assets/<filename>-light.svg">
       <img src="https://raw.githubusercontent.com/<user>/<repo>/main/public/assets/<filename>.svg" width="100%" alt="Animated Profile Banner" />
     </picture>
   </div>
   ```
3. **Remind / Showcase the Paired Image**:
   Show the user how their animated SVG fits seamlessly with their visual hero art (e.g. side-by-side or stacked), creating an iconic profile layout.

---

## Detailed References

- [Simple Icons Guide](references/simple-icons-integration.md) — Exact vector paths, brand hex codes, and chip layouts.
- [thesvg Vector Patterns](references/thesvg-vector-patterns.md) — Wave dividers, isometric grids, and glass filters.
- [Web Animation Performance](references/web-animation-performance.md) — 60fps GPU acceleration, easing formulas, and a11y.
- [Effect-TS Architecture](references/effect-ts-architecture.md) — Typed failure models and schema validation boundaries.
