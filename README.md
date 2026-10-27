<div align="center" id="top">

  <a href="https://github.com/yuvraj-thakur-exe/readmeforge">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/public/logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/public/logo-light.svg">
      <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/public/logo.svg" width="420" alt="ReadmeForge Logo" />
    </picture>
  </a>

  <br /><br />

  <p>
    <strong>Forge a GitHub profile that gets noticed.</strong><br />
    An interactive profile studio, autonomous AI agent skill, and zero-dependency CLI with GPU-accelerated animated SVGs, 15 modular plugins, and direct GitHub sync.
  </p>

  <p>
    <a href="https://readmeforge-black.vercel.app">
      <img src="https://img.shields.io/badge/Live_Studio-Vercel-black?style=for-the-badge&logo=vercel" alt="Live Studio" />
    </a>
    <a href="https://www.npmjs.com/package/readmeforge">
      <img src="https://img.shields.io/badge/CLI-npx%20readmeforge-cb3837?style=for-the-badge&logo=npm" alt="npx readmeforge" />
    </a>
    <a href="#-ai-agent-skill--mcp-server">
      <img src="https://img.shields.io/badge/Agent_Skill-MCP_Ready-8b5cf6?style=for-the-badge&logo=anthropic" alt="Agent Skill Ready" />
    </a>
    <a href="https://github.com/yuvraj-thakur-exe/readmeforge/blob/main/LICENSE.md">
      <img src="https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge" alt="License: MIT" />
    </a>
  </p>

  <p>
    <a href="#-1-click-copy-paste-install">Install & Use</a> &bull;
    <a href="#-ai-agent-skill--mcp-server">AI Agent Skill / MCP</a> &bull;
    <a href="#-visual-archetypes-gallery">Archetypes Gallery</a> &bull;
    <a href="#-key-features">Features</a> &bull;
    <a href="#-plugin-arsenal-15-plugins">Plugins</a> &bull;
    <a href="#-contributing">Contributing</a>
  </p>

</div>

---

## ⚡ 1-Click Copy-Paste Install

### Option A: Instant CLI Generation (No Install Needed)
Run directly via `npx` anywhere to create your profile in seconds:

```bash
# Generate high-impact 3D City Cat profile to README.md
npx readmeforge generate --username <your-github-username> --archetype wow-3d-city-cat --output README.md

# Or generate the #5 Bento Signal Dashboard
npx readmeforge generate --username <your-github-username> --archetype bento-signal-dashboard --output README.md

# Explore all 8 archetypes in your terminal
npx readmeforge list
```

### Option B: Install Globally
```bash
npm install -g readmeforge
readmeforge generate --username <your-github-username>
```

### Option C: Web Studio & /developer Editor
Prefer a visual GUI? Open the web studio:
👉 **[https://readmeforge-black.vercel.app](https://readmeforge-black.vercel.app)** (or raw Monaco IDE at [`/en/developer`](https://readmeforge-black.vercel.app/en/developer))

---

## 🤖 AI Agent Skill & MCP Server

ReadmeForge is built from the ground up for **AI Agents** (Claude Code, Cursor, Devin, Antigravity, GitHub Copilot). Any agent can use ReadmeForge as a specialized capability to craft and maintain READMEs.

### 1. Install as an Open Agent Skill (1-Liner)
Run this command in any repository or agent workspace:

```bash
# macOS / Linux / WSL
curl -fsSL https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/scripts/install-agent-skill.sh | bash

# Windows PowerShell
irm https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/scripts/install-agent-skill.ps1 | iex

# Or using the CLI:
npx readmeforge skill-install
```
This installs [`.agents/skills/readmeforge/SKILL.md`](.agents/skills/readmeforge/SKILL.md), allowing agents to autonomously generate, inspect, and style GitHub profile READMEs adhering strictly to GitHub Camo constraints.

### 2. Connect as a Model Context Protocol (MCP) Server
Add ReadmeForge to your Cursor (`.cursor/mcp.json`) or Claude Desktop configuration:

```json
{
  "mcpServers": {
    "readmeforge": {
      "command": "npx",
      "args": ["readmeforge", "mcp"]
    }
  }
}
```

**MCP Tools Provided**:
- `generate_profile_readme`: Generates GitHub Camo-safe markdown profiles with selected archetypes, custom bio, tech stack, and widgets.
- `list_archetypes`: Returns metadata, preview descriptions, and layout schemes for all 8 archetypes.

---

## 🎨 Visual Archetypes Gallery

ReadmeForge includes 8 production-grade visual archetypes ready out-of-the-box:

| Archetype ID | Style & Mascot | Highlights |
| :--- | :--- | :--- |
| **`wow-3d-city-cat`** | Peeking Kitten + 3D City | 3D isometric contribution city, peeking black cat header, glowing language stack |
| **`bento-signal-dashboard`** | Dark Glass Bento Grid | High-density telemetry cards, signal metrics, repository showcase |
| **`metrics-telemetry-dashboard`** | Cyber Anime Hacker | Comprehensive telemetry dashboard (PageSpeed, contribution calendar, music) |
| **`neon-craftsman-owl`** | Celebratory Owl Mascot | Purple/magenta capsule banner, confetti owl, gamified achievements |
| **`minimal-light-unicorn`** | Coding Unicorn Mascot | Crisp light mode, rainbow unicorn developer mascot, minimal clean cards |
| **`dark-glass-devops`** | Constellation Terminal | Dark mesh banner, terminal window, clean tech grid |
| **`cyber-terminal`** | Retro Cyan Terminal | Dynamic terminal typing SVG, retro scanlines, developer stats |
| **`pinterest-lofi-aesthetic`** | Lo-Fi Coffee Workspace | Aesthetic Pinterest moodboard, warm cozy tones, rounded glass cards |

---

---

<div align="center">
  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/public/assets/animated-characters.svg" alt="ReadmeForge Multi-Language Playground with Dynamic Character Kinematics" width="100%" />
</div>

---

## ⚡ Quick Start

Run ReadmeForge locally in under a minute with Node.js 20+ and pnpm:

```bash
# 1. Clone the repository
git clone https://github.com/yuvraj-thakur-exe/readmeforge.git
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
  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/public/assets/developer-mode.svg" alt="ReadmeForge Developer Mode Split IDE Preview" width="100%" />
</div>

---

## 🧩 Plugin Arsenal (15 Plugins)

Every widget in ReadmeForge is a modular plugin defined in `src/lib/plugins/` and validated against a shared Zod schema:

| Plugin | Type | Description |
| :--- | :--- | :--- |
| **`header-bio`** | Layout | Custom headline, status pill, pronouns, and avatar |
| **`capsule-banner`** | Visual | Modern waving/curved SVG hero banner with custom titles & palettes |
| **`mascot-bio`** | Mascot | Animated SVG mascots (Peeking Cat, Owl, Unicorn, Dev Desk) paired with bio |
| **`skill-icons`** | Badges | Clustered multi-technology SVG icons with auto-scaling & theme adaptation |
| **`pinterest-image`** | Aesthetic | Aesthetic moodboard images resolved from Pinterest links & topics |
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
