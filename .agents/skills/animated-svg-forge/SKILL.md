---
name: animated-svg-forge
description: Use when creating, designing, generating, or customizing animated SVGs, dynamic banners, animated text effects, glowing frames, particle backgrounds, or profile graphics. Also use whenever the user says "create an animated [prompt]" or wants custom animated vector art for GitHub profiles or web applications.
license: MIT
metadata:
  author: ReadmeForge
  version: "1.0.0"
---

# Animated SVG Forge

A production-grade skill for authoring standalone, high-performance **animated SVGs** with rich CSS keyframes, vector motion graphics, cyber frames, and text animations tailored for GitHub profiles, READMEs, and modern web apps.

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

3. **Self-Contained & Optimized**:
   - Zero external dependencies.
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
2. **Theme & Palette**: What aesthetic vibe do you prefer? (e.g. Cyberpunk Violet/Cyan, Tokyo Night, Emerald Matrix, Minimalist Monochrome, or Flame/Solar).
3. **Dimensions**: Standard banner (800x200), header card (1000x320), or compact widget (460x140)?
```

> **Rule**: If the user asks for immediate generation without specifying, select the optimal palette and dimensions autonomously, but still ask/remind them to add or generate a complementary visual image to maximize visual impact.

---

### Step 2: Choose the Motion Architecture

Combine 2 to 3 complementary animation layers:

| Layer Type | Effects Available | Best For |
| :--- | :--- | :--- |
| **A. Text Motion** | Typewriter, Glitch RGB-split, Neon Glow Pulse, Gradient Shimmer, Wave Cascade | Headlines, names, titles, taglines |
| **B. Borders & Frames** | Cyber Border Beam, Rotating Conic Gradient, Neon Corner Brackets, Circuit Traces | Card wrappers, profile headers, badges |
| **C. Background FX** | Drifting Particle Embers, Laser Scanlines, Cosmic Stars, Matrix Digital Rain | Atmosphere, depth, command-deck vibe |
| **D. Dynamic Action** | Walking bot/character, Anvil Spark Impacts, Orbiting Tech Icons, Flame/Water waves | Gamification, interactive personality |

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

    <!-- Glow Filters -->
    <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <style>
    /* Inlined keyframes and responsive typography */
    .wordmark {
      fill: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif;
      font-weight: 800;
      font-size: 36px;
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
  </style>

  <!-- Vector Elements & Animation Paths -->
</svg>
```

#### 2. Animated Text Effect Presets
- **Glitch & RGB Split**:
  ```css
  @keyframes glitchOffset {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-1px, -1px); }
    60% { transform: translate(2px, 0); }
    80% { transform: translate(1px, -2px); }
  }
  .glitch-red { fill: #f43f5e; opacity: 0.8; animation: glitchOffset 2.5s infinite steps(2); }
  .glitch-cyan { fill: #06b6d4; opacity: 0.8; animation: glitchOffset 2.5s infinite reverse steps(2); }
  ```

- **Typewriter Effect**:
  Use `stroke-dasharray` and inline keyframes to type out code or titles without JavaScript.

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

1. **Save Asset**: Save the generated SVG to `public/assets/<filename>.svg` (or project asset directory).
2. **Generate README Markdown Integration**:
   ```html
   <div align="center">
     <picture>
       <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/<user>/<repo>/main/public/assets/<filename>-dark.svg">
       <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/<user>/<repo>/main/public/assets/<filename>-light.svg">
       <img src="https://raw.githubusercontent.com/<user>/<repo>/main/public/assets/<filename>.svg" width="100%" alt="Animated Profile Banner" />
     </picture>
   </div>
   ```
3. **Remind User of Hero Visual Pairing**:
   Encourage the user to review the combined layout with their visual hero art (e.g. side-by-side or stacked), creating an iconic profile layout.
