# Animated SVG Presets & Vector Blueprints

Production-ready vector blueprints and motion patterns for GitHub profiles and developer banners.

---

## 1. Cyberpunk Border-Beam Header Card (800x220)

```xml
<svg width="100%" height="auto" viewBox="0 0 800 220" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="50%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>

    <filter id="beam-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <style>
    .title-text {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif;
      font-weight: 800;
      font-size: 34px;
      fill: #ffffff;
    }
    .badge-label {
      font-family: 'Fira Code', monospace;
      font-size: 13px;
      fill: #22d3ee;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    @media (prefers-color-scheme: light) {
      .title-text { fill: #0f172a; }
      .bg-rect { fill: #f8fafc; stroke: #cbd5e1; }
    }
  </style>

  <!-- Card Background -->
  <rect class="bg-rect" x="3" y="3" width="794" height="214" rx="16" fill="#0b0f19" stroke="#1e293b" stroke-width="2" />

  <!-- Animated Glowing Border Beam -->
  <rect x="3" y="3" width="794" height="214" rx="16" fill="none"
        stroke="url(#beam-grad)" stroke-width="3" stroke-linecap="round"
        stroke-dasharray="160 840" filter="url(#beam-glow)">
    <animate attributeName="stroke-dashoffset" from="0" to="-1000" dur="4s" repeatCount="indefinite" />
  </rect>

  <!-- Tech Corner Markers -->
  <path d="M16 32 V16 H32" stroke="#06b6d4" stroke-width="2.5" fill="none" stroke-linecap="round" />
  <path d="M784 32 V16 H768" stroke="#06b6d4" stroke-width="2.5" fill="none" stroke-linecap="round" />
  <path d="M16 188 V204 H32" stroke="#8b5cf6" stroke-width="2.5" fill="none" stroke-linecap="round" />
  <path d="M784 188 V204 H768" stroke="#8b5cf6" stroke-width="2.5" fill="none" stroke-linecap="round" />

  <!-- Content -->
  <text x="50" y="70" class="badge-label">&lt; ARCHITECT // FULL-STACK &gt;</text>
  <text x="50" y="118" class="title-text">Engineering Scalable Systems</text>
  <text x="50" y="152" fill="#94a3b8" font-family="Inter, sans-serif" font-size="15px">
    Specializing in autonomous AI agents, distributed runtimes &amp; reactive frontends.
  </text>
</svg>
```

---

## 2. Dynamic Matrix Terminal Rain Effect

```xml
<svg width="100%" height="auto" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="matrix-fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0" />
      <stop offset="80%" stop-color="#10b981" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#6ee7b7" stop-opacity="1" />
    </linearGradient>
  </defs>

  <rect width="800" height="200" rx="12" fill="#050907" stroke="#064e3b" stroke-width="1.5" />

  <!-- Matrix Vertical Streams -->
  <g font-family="'Fira Code', monospace" font-size="12" fill="url(#matrix-fade)">
    <text x="80" y="0">
      01101001 01101110 01101001 01110100
      <animate attributeName="y" from="-50" to="250" dur="2.5s" repeatCount="indefinite" />
    </text>
    <text x="240" y="0">
      SYSTEM.READY &gt;&gt; RUNTIME_OK
      <animate attributeName="y" from="-80" to="250" dur="3.2s" begin="0.4s" repeatCount="indefinite" />
    </text>
    <text x="440" y="0">
      0xFF4A 0x8B2C 0x33DF
      <animate attributeName="y" from="-60" to="250" dur="2.8s" begin="1s" repeatCount="indefinite" />
    </text>
    <text x="620" y="0">
      AGENT_DISPATCH = TRUE
      <animate attributeName="y" from="-40" to="250" dur="3s" begin="0.7s" repeatCount="indefinite" />
    </text>
  </g>

  <!-- Overlay Glass Plate -->
  <rect x="40" y="35" width="720" height="130" rx="8" fill="#022c22" fill-opacity="0.75" stroke="#10b981" stroke-width="1" />

  <!-- Terminal Header -->
  <circle cx="65" cy="55" r="4" fill="#ef4444" />
  <circle cx="80" cy="55" r="4" fill="#f59e0b" />
  <circle cx="95" cy="55" r="4" fill="#10b981" />

  <text x="65" y="105" fill="#34d399" font-family="'Fira Code', monospace" font-size="20" font-weight="700">
    $ readmeforge --mode=autonomous
  </text>
  <text x="65" y="135" fill="#a7f3d0" font-family="'Fira Code', monospace" font-size="14">
    [OK] Profile synthesized with 100% verified vector art.
  </text>
</svg>
```

---

## 3. Walking Character / Bot Motion Sprite Pattern

```xml
<svg width="100%" height="auto" viewBox="0 0 600 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ground-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0" />
      <stop offset="50%" stop-color="#22d3ee" stop-opacity="1" />
      <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
    </linearGradient>
  </defs>

  <rect width="600" height="160" rx="12" fill="#0d1117" stroke="#30363d" />

  <!-- Glowing Runway Horizon -->
  <line x1="40" y1="120" x2="560" y2="120" stroke="url(#ground-grad)" stroke-width="2" />

  <!-- Walking Pixel Bot (horizontal movement + leg oscillation) -->
  <g>
    <animateTransform attributeName="transform" type="translate" from="60 0" to="480 0" dur="8s" repeatCount="indefinite" />

    <!-- Bot Body & Head -->
    <rect x="0" y="65" width="28" height="28" rx="6" fill="#8b5cf6" />
    <circle cx="10" cy="77" r="3" fill="#22d3ee" />
    <circle cx="18" cy="77" r="3" fill="#22d3ee" />
    <rect x="12" y="58" width="4" height="7" fill="#6366f1" />
    <circle cx="14" cy="56" r="3" fill="#f43f5e">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
    </circle>

    <!-- Torso -->
    <rect x="4" y="93" width="20" height="16" rx="4" fill="#1e1b4b" stroke="#8b5cf6" stroke-width="1.5" />

    <!-- Left Leg (swinging) -->
    <line x1="8" y1="109" x2="4" y2="120" stroke="#22d3ee" stroke-width="3" stroke-linecap="round">
      <animate attributeName="x2" values="2;12;2" dur="0.6s" repeatCount="indefinite" />
    </line>

    <!-- Right Leg (counter-swinging) -->
    <line x1="20" y1="109" x2="24" y2="120" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round">
      <animate attributeName="x2" values="26;16;26" dur="0.6s" repeatCount="indefinite" />
    </line>

    <!-- Trail Sparks -->
    <circle cx="-6" cy="118" r="1.5" fill="#f43f5e" opacity="0.8">
      <animate attributeName="opacity" values="1;0" dur="0.4s" repeatCount="indefinite" />
    </circle>
  </g>

  <!-- Title -->
  <text x="320" y="55" fill="#f8fafc" font-family="Inter, sans-serif" font-weight="700" font-size="18" text-anchor="middle">
    Building &amp; Shipping Every Day
  </text>
  <text x="320" y="80" fill="#94a3b8" font-family="'Fira Code', monospace" font-size="12" text-anchor="middle">
    Continuous commit streak &bull; Autonomous agent loops
  </text>
</svg>
```
