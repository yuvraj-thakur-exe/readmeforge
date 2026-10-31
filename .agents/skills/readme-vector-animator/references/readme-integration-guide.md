# GitHub README.md Integration & Optimization Guide

This guide details best practices and copy-ready Markdown patterns for embedding animated SVGs into GitHub profile `README.md` files.

---

## 1. Directory Structure in the Repository

Place all animated assets inside a clean repository folder:
```
my-github-profile/
├── README.md
└── assets/
    ├── header-banner.svg
    ├── animated-character.svg
    ├── tech-orbit.svg
    └── banner-light.svg (optional dual-theme)
```

---

## 2. Copy-Ready Embed Patterns

### Pattern A: Centered Responsive Banner (Universal Standard)
```markdown
<p align="center">
  <img src="assets/header-banner.svg" alt="Developer Profile Banner" width="100%" />
</p>
```

### Pattern B: Dual-Theme Switching (Adapts to GitHub Dark & Light Mode)
GitHub dynamically toggles between light and dark themes using standard CSS media queries. Embed with a `<picture>` tag:
```markdown
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/header-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/header-light.svg">
    <img src="assets/header-dark.svg" alt="MonoForge Profile Banner" width="100%">
  </picture>
</p>
```

### Pattern C: Side-by-Side Character & Bio
Place the animated character beside bio or stats:
```markdown
<table>
  <tr>
    <td width="65%" valign="top">
      <h2>Hi there! I'm Alex Mercer 👋</h2>
      <p>Full-Stack Cloud Architect building distributed AI systems & developer tooling.</p>
      <ul>
        <li>🔭 Currently architecting multi-agent microservices</li>
        <li>⚡ Focus: Rust, Go, TypeScript, Kubernetes, WebGL</li>
        <li>💬 Ask me about cloud performance & real-time systems</li>
      </ul>
    </td>
    <td width="35%" align="center" valign="middle">
      <img src="assets/cyber-bot.svg" alt="Cyber Bot Companion" width="220" />
    </td>
  </tr>
</table>
```

### Pattern D: Live URL via Raw GitHub / CDN
If referencing from another branch or repo:
```markdown
![Profile Banner](https://raw.githubusercontent.com/<username>/<username>/main/assets/header-banner.svg)
```

---

## 3. GitHub Camo CDN Testing Checklist

Before committing any SVG to a profile repository, verify:
- [ ] **No JavaScript**: Zero `<script>` tags present.
- [ ] **No `<foreignObject>`**: All text is rendered using SVG `<text>` elements.
- [ ] **Self-Contained Fonts**: Uses fallback font stack (`Fira Code`, `JetBrains Mono`, `Consolas`, monospace).
- [ ] **File Size Budget**: Under 25 KB for instant load through GitHub Camo CDN.
- [ ] **Hardware Acceleration**: Animated elements use `transform-box: fill-box; transform-origin: center;` to avoid coordinate jumping.
- [ ] **Vestibular A11y**: Includes `@media (prefers-reduced-motion: reduce)`.
