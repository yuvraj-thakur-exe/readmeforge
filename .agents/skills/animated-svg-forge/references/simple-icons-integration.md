# Simple Icons Integration Guide for Animated SVGs

Reference: [simple-icons/simple-icons](https://github.com/simple-icons/simple-icons) (3,200+ Free SVG icons for popular brands and technologies)

When generating animated SVGs, tech stacks, developer badges, or floating tech cards, embed **Simple Icons** vectors directly inside the SVG markup. This guarantees zero external network requests, instant loading under GitHub's Camo proxy, and 100% vector sharpness.

---

## 1. How to Embed Simple Icons Directly in SVG XML

Each Simple Icon is normalized to a standard `24x24` viewBox (`viewBox="0 0 24 24"`). Embed them inside an SVG `<g>` element scaled and translated to your target coordinates:

```xml
<!-- Example: Animated Floating TypeScript Icon (Brand Color: #3178C6) -->
<g transform="translate(120, 80)">
  <!-- Glow Backdrop -->
  <circle cx="16" cy="16" r="20" fill="#3178C6" opacity="0.15" filter="url(#glow-filter)">
    <animate attributeName="r" values="18;24;18" dur="3s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.15;0.35;0.15" dur="3s" repeatCount="indefinite" />
  </circle>

  <!-- Scaled Simple Icon Vector Path -->
  <svg x="4" y="4" width="24" height="24" viewBox="0 0 24 24" fill="#3178C6">
    <!-- TypeScript Simple Icon Path -->
    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.71-.246 5.82 5.82 0 0 0-.837-.163 5.372 5.372 0 0 0-.969-.074c-.58 0-1.026.104-1.336.313-.31.209-.465.525-.465.948 0 .274.075.503.226.686.15.183.356.337.618.461.262.124.57.234.924.331.355.097.74.202 1.156.314.483.13.931.29 1.344.482.413.192.766.435 1.058.73.292.294.512.651.66 1.071.148.42.222.928.222 1.523 0 .762-.143 1.417-.43 1.966a3.84 3.84 0 0 1-1.189 1.385c-.506.347-1.12.597-1.843.75a8.775 8.775 0 0 1-2.073.23c-.732 0-1.428-.063-2.088-.19a8.196 8.196 0 0 1-1.776-.566v-2.613c.66.383 1.353.67 2.08.86.726.19 1.45.285 2.17.285.596 0 1.07-.11 1.42-.33.352-.22.528-.564.528-1.03 0-.312-.083-.574-.25-.785a2.535 2.535 0 0 0-.693-.538 5.86 5.86 0 0 0-1.018-.387c-.417-.116-.867-.235-1.35-.357a7.712 7.712 0 0 1-1.458-.518 3.882 3.882 0 0 1-1.147-.79 3.01 3.01 0 0 1-.685-1.123c-.156-.445-.234-.974-.234-1.587 0-.71.139-1.32.418-1.831a3.81 3.81 0 0 1 1.15-1.312c.488-.328 1.08-.565 1.777-.71a8.3 8.3 0 0 1 2.05-.218zm-8.85 2.375h2.868v9.552H9.638z" />
  </svg>
</g>
```

---

## 2. Common Tech Brand Slugs & Official Hex Palettes

| Technology | Simple Icons Slug | Official Brand Hex | High Contrast Alternate (Dark Mode) |
| :--- | :--- | :--- | :--- |
| **TypeScript** | `typescript` | `#3178C6` | `#38bdf8` (Cyan Accent) |
| **JavaScript** | `javascript` | `#F7DF1E` | `#FACC15` |
| **Python** | `python` | `#3776AB` | `#60A5FA` |
| **Rust** | `rust` | `#000000` | `#F97316` (Rust Orange) |
| **Go** | `go` | `#00ADD8` | `#22D3EE` |
| **Next.js** | `nextdotjs` | `#000000` | `#FFFFFF` |
| **React** | `react` | `#61DAFB` | `#38BDF8` |
| **Node.js** | `nodedotjs` | `#5FA04E` | `#4ADE80` |
| **Docker** | `docker` | `#2496ED` | `#38BDF8` |
| **Kubernetes** | `kubernetes` | `#326CE5` | `#60A5FA` |
| **Tailwind CSS**| `tailwindcss` | `#06B6D4` | `#22D3EE` |
| **PostgreSQL** | `postgresql` | `#4169E1` | `#818CF8` |
| **GraphQL** | `graphql` | `#E10098` | `#F472B6` |

---

## 3. Orbiting & Floating Tech Badges Pattern

Use pure CSS `@keyframes` inside `<style>` to create smooth orbital paths:

```css
@keyframes floatY {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
}

@keyframes orbitPulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}

.tech-chip {
  animation: floatY 4s ease-in-out infinite;
}
.tech-chip:nth-child(2) {
  animation-delay: -1.3s;
}
.tech-chip:nth-child(3) {
  animation-delay: -2.6s;
}
```
