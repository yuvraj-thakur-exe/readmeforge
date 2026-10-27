# Scene & Effects Blueprints (Non-Character Animations)

This guide documents exact, copy-ready vector and CSS keyframe patterns for atmospheric backgrounds, cyber frames, kinetic typography, and orbiting tech stacks that can be embedded into GitHub profile `README.md` files.

---

## 1. Kinetic Typewriter Typography with Blinking Cursor

### Vector Markup:
```xml
<g id="typewriter-headline" transform="translate(60, 90)">
  <defs>
    <!-- Clip curtain that expands horizontally in steps -->
    <clipPath id="type-clip">
      <rect x="0" y="-30" width="0" height="50">
        <animate attributeName="width" from="0" to="480" dur="2.8s" begin="0.2s" fill="freeze" keyTimes="0; 0.8; 1" values="0; 480; 480" />
      </rect>
    </clipPath>
  </defs>

  <!-- Revealed Headline Text -->
  <text clip-path="url(#type-clip)" font-family="'Fira Code', Consolas, monospace" font-size="28" font-weight="800" fill="#ffffff">
    &gt; FULL-STACK CLOUD ARCHITECT
  </text>

  <!-- Blinking Block Terminal Cursor -->
  <rect x="490" y="-24" width="14" height="28" rx="2" fill="#38bdf8" style="animation: cursorBlink 0.9s infinite;" />
</g>
```

### Keyframe Styles:
```css
@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

---

## 2. Cyber Laser Border Beam (60fps Traveling Perimeter)

A high-tech laser stroke running continuously around a card perimeter without repainting geometry:

### Vector Markup:
```xml
<!-- Base Inactive Card Outline -->
<rect x="2" y="2" width="846" height="236" rx="18" fill="none" stroke="#1e2238" stroke-width="1.5" />

<!-- Traveling Laser Beam -->
<rect class="cyber-laser" x="2" y="2" width="846" height="236" rx="18" fill="none" stroke="url(#laser-gradient)" stroke-width="2.5" />
```

### Gradients & Keyframe Styles:
```xml
<defs>
  <linearGradient id="laser-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#38bdf8" />
    <stop offset="50%" stop-color="#818cf8" />
    <stop offset="100%" stop-color="#c084fc" />
  </linearGradient>
  <style>
    .cyber-laser {
      stroke-dasharray: 120 400;
      animation: laserTrack 6s linear infinite;
    }
    @keyframes laserTrack {
      to { stroke-dashoffset: -1040; }
    }
  </style>
</defs>
```

---

## 3. Atmospheric Fire & Floating Heat Embers

Blazing fire core with rising amber particles, perfect for high-impact hero banners:

### Keyframe Styles:
```css
@keyframes emberRise1 {
  0% { transform: translate(0, 0) scale(1); opacity: 0; }
  20% { opacity: 0.9; }
  80% { opacity: 0.6; }
  100% { transform: translate(25px, -140px) scale(0.3); opacity: 0; }
}
@keyframes emberRise2 {
  0% { transform: translate(0, 0) scale(0.8); opacity: 0; }
  30% { opacity: 0.85; }
  100% { transform: translate(-30px, -160px) scale(0.2); opacity: 0; }
}
@keyframes coreFlamePulse {
  0%, 100% { transform: scale(1); opacity: 0.25; }
  50% { transform: scale(1.08); opacity: 0.38; }
}
```

### Vector Particles:
```xml
<!-- Ambient Flame Glow Core -->
<ellipse cx="425" cy="240" rx="260" ry="90" fill="url(#fire-core-grad)" style="animation: coreFlamePulse 3.5s ease-in-out infinite; transform-box: fill-box; transform-origin: bottom center;" />

<!-- Floating Embers -->
<circle cx="360" cy="210" r="3" fill="#fbbf24" style="animation: emberRise1 2.8s infinite ease-out;" />
<circle cx="480" cy="225" r="2.5" fill="#f97316" style="animation: emberRise2 3.4s infinite ease-out; animation-delay: 0.7s;" />
<circle cx="410" cy="220" r="3.5" fill="#ef4444" style="animation: emberRise1 3.1s infinite ease-out; animation-delay: 1.4s;" />
```

---

## 4. Floating Tech Stack Carousel Orbit

Orbital ring displaying tech icons that rotate around a central avatar or logo:

### Technique:
- Pre-position badges along an elliptical path (`cx, cy`).
- Animate them using keyframed horizontal drifting and depth scaling:
```css
@keyframes orbitShift {
  0% { transform: translateX(-40px) scale(0.9); opacity: 0.7; }
  50% { transform: translateX(40px) scale(1.1); opacity: 1; }
  100% { transform: translateX(-40px) scale(0.9); opacity: 0.7; }
}
```

---

## 5. Commit Streak Fire HUD & Metric Gauge

An interactive gamified HUD showing streak days and git stats:

```xml
<g id="streak-hud" transform="translate(680, 50)">
  <rect width="130" height="42" rx="10" fill="#18181b" stroke="#f97316" stroke-width="1.2" />
  <!-- Flame Icon with flicker -->
  <text x="14" y="27" font-size="18" style="animation: flameWobble 0.8s alternate infinite; display: inline-block; transform-box: fill-box;">🔥</text>
  <text x="40" y="19" font-family="'Fira Code', monospace" font-size="9" font-weight="600" fill="#a1a1aa">COMMIT STREAK</text>
  <text x="40" y="33" font-family="'Fira Code', monospace" font-size="13" font-weight="800" fill="#fbbf24">86 DAYS</text>
</g>
```
