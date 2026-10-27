<div align="center" id="top">

  <a href="https://github.com/yuvrajlaptop2008-byte/readmeforge">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/yuvrajlaptop2008-byte/readmeforge/main/public/logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/yuvrajlaptop2008-byte/readmeforge/main/public/logo-light.svg">
      <img src="https://raw.githubusercontent.com/yuvrajlaptop2008-byte/readmeforge/main/public/logo.svg" width="420" alt="ReadmeForge Logo" />
    </picture>
  </a>

  <br /><br />

  <p>
    <strong>Forge a GitHub profile that gets noticed.</strong><br />
    An interactive profile studio with GPU-accelerated animated SVGs, 11 modular plugins, and direct GitHub sync.
  </p>

  <p>
    <a href="https://github.com/yuvrajlaptop2008-byte/readmeforge/actions/workflows/ci.yml">
      <img src="https://img.shields.io/github/actions/workflow/status/yuvrajlaptop2008-byte/readmeforge/ci.yml?branch=main&label=CI%20Build&style=for-the-badge&logo=githubactions&logoColor=white" alt="CI Status" />
    </a>
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Next.js-16%20Turbopack-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
    <a href="https://github.com/yuvrajlaptop2008-byte/readmeforge/blob/main/LICENSE.md">
      <img src="https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge" alt="License: MIT" />
    </a>
  </p>

  <p>
    <a href="#quick-start">Quick Start</a> &bull;
    <a href="#key-features">Key Features</a> &bull;
    <a href="#plugin-arsenal-11-plugins">Plugins</a> &bull;
    <a href="#animated-vector-art--typography">Animated Vectors</a> &bull;
    <a href="#security--token-safety">Security</a> &bull;
    <a href="#docker--development">Docker & Dev</a> &bull;
    <a href="#contributing">Contributing</a>
  </p>

</div>

---

<div align="center">
  <img src="https://raw.githubusercontent.com/yuvrajlaptop2008-byte/readmeforge/main/public/assets/animated-characters.svg" alt="ReadmeForge Multi-Language Playground with Dynamic Character Kinematics" width="100%" />
</div>

---

## ⚡ Quick Start

Run ReadmeForge locally in under a minute with Node.js 20+ and pnpm:

```bash
# 1. Clone the repository
git clone https://github.com/yuvrajlaptop2008-byte/readmeforge.git
cd readmeforge

# 2. Install dependencies
pnpm install

# 3. Start the studio
pnpm dev
```

Open **[http://localhost:3000/en](http://localhost:3000/en)** in your browser.

> [!NOTE]
> If you use npm instead of pnpm: `npm install && npm run dev`.

---

## 🌟 Key Features

- **Real-Time Live Preview**: Watch your profile Markdown update immediately as you configure your bio, badges, and plugins.
- **Stand-Alone Animated Vector SVGs**: GitHub Camo–safe animated cards (Cyber Bot, Pixel Dev, Ninja, Terminal HUD) with CSS `@keyframes` and zero external JavaScript.
- **11 Modular Plugins**: Toggle GitHub statistics, trophy cabinets, dynamic typing headers, tech stack grids, and activity counters.
- **Developer Info Hub**: Explore 10 curated developer archetypes, 20+ copyable Shields badges, and architecture walkthroughs at `/info`.
- **100% Client-Side Privacy**: All parsing, state management, and Markdown generation run locally in your browser.

<div align="center">
  <img src="https://raw.githubusercontent.com/yuvrajlaptop2008-byte/readmeforge/main/public/assets/developer-mode.svg" alt="ReadmeForge Developer Mode Split IDE Preview" width="100%" />
</div>

---

## 🧩 Plugin Arsenal (11 Plugins)

Every widget in ReadmeForge is a modular plugin defined in `src/lib/plugins/` and validated against a shared Zod schema:

| Plugin | Type | Description |
| :--- | :--- | :--- |
| **`header-bio`** | Layout | Custom headline, status pill, pronouns, and location |
| **`readme-typing-svg`** | Animation | Animated typewriter headline with customizable speed & color |
| **`markdown-badges`** | Badges | 150+ technology, framework, and database badges |
| **`github-readme-stats`** | Telemetry | Overall stars, commits, PRs, and review statistics |
| **`streak-stats`** | Telemetry | Current streak, longest streak, and total contributions |
| **`activity-graph`** | Velocity | Contribution wave and dynamic activity curves |
| **`github-profile-trophy`** | Gamification | Rank badges based on repository stars, commits, and PRs |
| **`pie-chart`** | Analytics | Top languages breakdown (donut, pie, or compact bar) |
| **`visitor-counter`** | Metric | Non-invasive profile view counter badge |
| **`snk`** | Animation | Dynamic retro snake animating over your contribution grid |
| **`social-links`** | Connect | Verified social, portfolio, and contact icons |

> **Self-Contained vs. Third-Party Widgets**:
> - **Self-Contained**: Vector characters, kinetic text banners, and frames are pure standalone SVGs hosted directly in your repo.
> - **Third-Party Services**: Optional dynamic stats and trophies connect to standard open-source community endpoints (`github-readme-stats`, `ghchart.rshah.org`, `github-profile-trophy`). You can toggle any of these on or off as desired.

---

## 🎨 Animated Vector Art & Typography

ReadmeForge generates standalone, GitHub-safe animated SVG banners powered by pure vector CSS keyframes.

### 1. Kinetic Typography
Real-time text effects rendered into self-contained SVGs:
- **Cyber Neon**: Dual-stage drop-shadow cyan/purple bloom.
- **RGB Glitch**: Sub-pixel chromatic aberration shift.
- **Holo Shimmer**: Continuous spectral linear gradient sweep.
- **Terminal Typewriter**: Discrete character cadence with blinking block cursor.
- **Harmonic Wave**: Sinusoidal letter bouncing animation.
- **Matrix Rain**: Phosphor green code rain stream.

### 2. Animated Character Kinematics
- **Cyber Bot**: Floating thruster flicker and antenna beacon.
- **Pixel Dev**: Dual-monitor desk with typing hands and coffee steam.
- **Ninja Coder**: Combat stance, headband flutter, and katana glint.
- **Builder Crafter**: Stacking tech blocks with welding sparks.
- **Wizard Mage**: Pulsating crystal staff and rotating runic circle.

---

## 🔒 Security & Token Safety

When pushing your generated `README.md` directly to GitHub:

1. **Fine-Grained Tokens Only**: We recommend generating a fine-grained GitHub Personal Access Token scoped **strictly** to your `<username>/<username>` repository with `Contents: Read and write` permission. Never use an account-wide admin token.
2. **Side-by-Side Diff Preview**: Before writing to your repository, ReadmeForge fetches your remote README and displays a side-by-side diff. Pushing requires explicit confirmation in the UI.
3. **No External Telemetry**: Tokens and configuration data exist only in your browser's ephemeral session memory and are never transmitted to external logging or telemetry servers.

---

## 🛠️ Docker & Development

### Local Verification
```bash
# Run unit & component test suite (116 test files)
pnpm test

# Run TypeScript strict type-check
npx tsc --noEmit

# Run Biome linter & formatter
pnpm lint
```

### Docker Setup
```bash
# Build standalone Docker image
docker build -t readmeforge:latest .

# Run container on port 3000
docker run -p 3000:3000 readmeforge:latest
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Keep dependencies minimal — leverage built-in standard library and existing dependencies.
2. Ensure all tests pass (`pnpm test && npx tsc --noEmit`).
3. Follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `refactor:`).

---

## 📄 License

Distributed under the [MIT License](LICENSE.md).
