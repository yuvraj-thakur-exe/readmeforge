# Advanced Vector Patterns & Filters

Reference: [glincker/thesvg](https://github.com/glincker/thesvg) (Curated SVG patterns, filters, mesh gradients, and generative vector art)

---

## 1. Organic Animated Wave Dividers

Use cubic Bezier curve points (`M... C...`) with SMIL `<animate>` to morph waves smoothly without JavaScript:

```xml
<path fill="url(#wave-grad)" opacity="0.8">
  <animate attributeName="d"
    dur="6s"
    repeatCount="indefinite"
    values="
      M0,160 C320,120 420,240 800,160 L800,240 L0,240 Z;
      M0,160 C240,220 540,100 800,160 L800,240 L0,240 Z;
      M0,160 C320,120 420,240 800,160 L800,240 L0,240 Z
    " />
</path>
```

---

## 2. Cyberpunk Isometric Grid Mesh

Render a perspective grid for futuristic terminal and command-deck aesthetics:

```xml
<defs>
  <pattern id="cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38bdf8" stroke-width="0.75" stroke-opacity="0.18" />
  </pattern>
  <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#000" stop-opacity="0" />
    <stop offset="60%" stop-color="#000" stop-opacity="0.8" />
    <stop offset="100%" stop-color="#000" stop-opacity="1" />
  </linearGradient>
</defs>

<!-- Projected Grid Surface -->
<g transform="translate(0, 40) skewX(-15)">
  <rect width="1000" height="200" fill="url(#cyber-grid)" />
</g>
<rect width="800" height="240" fill="url(#grid-fade)" pointer-events="none" />
```

---

## 3. Native SVG Glassmorphism Filter

Simulate frosted acrylic / glass card panels with zero external CSS:

```xml
<defs>
  <filter id="glass-frost" x="-20%" y="-20%" width="140%" height="140%">
    <!-- Ambient blur -->
    <feGaussianBlur stdDeviation="8" result="blur" />
    <!-- Color overlay -->
    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="frost" />
    <feBlend in="SourceGraphic" in2="frost" mode="overlay" />
  </filter>
</defs>

<!-- Frosted Card -->
<rect x="50" y="40" width="700" height="150" rx="16"
      fill="#0f172a" fill-opacity="0.65"
      stroke="#38bdf8" stroke-width="1.2" stroke-opacity="0.4"
      filter="url(#glass-frost)" />
```

---

## 4. Morphing Geometric Ring

Animated polygon path rotation and morphing:

```xml
<g transform="translate(680, 120)">
  <polygon points="0,-45 39,-22 39,22 0,45 -39,22 -39,-22" fill="none" stroke="#a855f7" stroke-width="2">
    <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="12s" repeatCount="indefinite" />
  </polygon>
  <circle cx="0" cy="0" r="16" fill="url(#primary-grad)" opacity="0.8">
    <animate attributeName="r" values="14;18;14" dur="2s" repeatCount="indefinite" />
  </circle>
</g>
```
