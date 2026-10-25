<div align="center" id="top">
  <img src="public/logo.svg" width="460" alt="ReadmeForge Logo" />
  <h1>ReadmeForge</h1>
  <p>The next-generation <strong>profile-readme-generator</strong> and visual <strong>github-readme-generator</strong> studio — forge an iconic <strong>profile-readme</strong> with an interactive 6-step wizard, Monaco developer IDE, 8+ modular plugins, confirmation-gated resume import, and direct GitHub sync.</p>

  <p>
    <a href="https://github.com/yuvrajlaptop2008-byte/readmeforge/actions/workflows/ci.yml">
      <img src="https://img.shields.io/github/actions/workflow/status/yuvrajlaptop2008-byte/readmeforge/ci.yml?branch=main&label=CI&style=flat-square" alt="CI Status" />
    </a>
    <a href="https://github.com/yuvrajlaptop2008-byte/readmeforge/blob/main/LICENSE.md">
      <img src="https://img.shields.io/badge/License-MIT-violet?style=flat-square" alt="License: MIT" />
    </a>
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Next.js-16%20(App%20Router)-black?style=flat-square&logo=next.js" alt="Next.js 16" />
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript" alt="TypeScript" />
    </a>
    <a href="https://github.com/yuvrajlaptop2008-byte/readmeforge/stargazers">
      <img src="https://img.shields.io/github/stars/yuvrajlaptop2008-byte/readmeforge?style=flat-square&color=cyan" alt="GitHub Stars" />
    </a>
    <a href="https://github.com/yuvrajlaptop2008-byte/readmeforge/pulls">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" />
    </a>
  </p>

  <p>
    <a href="#sparkles-features">Features</a> &bull;
    <a href="#rocket-quickstart">Quickstart</a> &bull;
    <a href="#puzzle-piece-plugin-ecosystem">Plugins</a> &bull;
    <a href="#desktop_computer-developer-mode">/developer Mode</a> &bull;
    <a href="#compass-directory-map">Architecture</a> &bull;
    <a href="#handshake-contributing">Contributing</a> &bull;
    <a href="#page_facing_up-license">License</a>
  </p>
</div>

---

## :sparkles: Features

- 🧙 **Interactive 6-Step Visual Wizard**: Effortlessly customize identity, visual vibe, tech stacks, stats, social links, and pinned projects with an animated live preview pane powered by `@formkit/auto-animate`.
- 💻 **Power-User `/developer` IDE Mode**: Split-screen raw JSON configuration editor backed by `@monaco-editor/react`, real-time schema validation via Zod, and instant side-by-side markdown rendering.
- 🧩 **Curated Plugin Architecture**: Zero-friction integration with the best GitHub profile widgets:
  - 📊 `github-readme-stats` — dynamic commit, PR, and repo stats cards
  - 🐍 `snk` — animated GitHub contribution graph snake eating your commit blocks
  - ⌨️ `readme-typing-svg` — dynamic typewriter headlines & role transitions
  - ⏱️ `waka-readme-stats` — real-time coding time metrics from WakaTime
  - 🏆 `github-profile-trophy` — achievements and ranks rendered in trophy layout
  - 🏷️ `markdown-badges` — categorized shields.io badges with official tech brand logos
  - 👁️ `visitor-counter` — minimal privacy-respecting profile hit counter
  - 💼 `portfolio-contributions` — featured open-source repositories and highlighted PRs
- 🎨 **Template Gallery & Starter Archetypes**: Choose from 10+ starter templates (Minimalist, Cyberpunk, Full-Stack Architect, Data Scientist, OSS Maintainer, and more) to jumpstart your profile.
- 🛡️ **Confirmation-Gated Resume & Web Enrichment**: Upload a PDF, DOCX, or TXT resume with genuine server-side parsing backed by `pdf-parse` and `mammoth`. **Zero silent store modifications and zero hallucinated demonstration fields** — every single detected field passes through `ConfirmGate.tsx` with confidence ratings and diff review before writing to your config.
- 🚀 **Direct GitHub Push & Diff Sync**: Commit your `README.md` (and companion action workflows like `snk`) directly to your `<username>/<username>` repository using an authenticated Personal Access Token and GitHub REST API, featuring a side-by-side diff preview against the real remote repository (`DiffPreview.tsx`).
- 🖼️ **Profile Image Optimizer**: Crop, compress, and optimize avatar photos directly in-browser via `react-easy-crop` and `browser-image-compression`.
- 📥 **AST-Based README Importer**: Paste an existing GitHub profile README and let the unified AST parser reverse-map it into interactive visual sections.
- ⌨️ **Command Palette (`Ctrl/Cmd + K`)**: Instantly search templates, jump between wizard and `/developer` mode, toggle themes, or export configurations.
- 🌐 **Full Internationalization (i18n)**: Out-of-the-box support for English (`en`) and Portuguese (`pt-BR`).
- 📦 **Multi-Format Export Suite**: One-click copy, `.md` download, PNG snapshot via `html-to-image`, or shareable URL with compressed base64 state.

---

## :rocket: Quickstart

### Prerequisites
- Node.js 20.x, 22.x, or 24.x
- `pnpm` (Corepack recommended)

### Local Development

```bash
# Clone the repository
git clone https://github.com/yuvrajlaptop2008-byte/readmeforge.git
cd readmeforge

# Install dependencies
corepack pnpm install

# Start local development server
corepack pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verification & Testing

```bash
# Run unit tests (Vitest: store, pure buildMarkdown, plugin registry, AST parser)
corepack pnpm test run

# Run production build (Next.js 16 Turbopack)
corepack pnpm build

# Run end-to-end browser tests
corepack pnpm test:e2e
```

### Docker Deployment

A production-ready, multi-stage standalone `Dockerfile` is included:

```bash
# Build the Docker image
docker build -t readmeforge:latest .

# Run container on port 3000
docker run -p 3000:3000 readmeforge:latest
```

---

## :compass: Directory Map

```text
src/
├── app/                  # Next.js App Router (wizard, /[locale]/developer, api/og, sitemap)
├── components/
│   ├── developer/        # Monaco editor, plugin drawer, live preview, export bar
│   ├── enrichment/       # Resume upload, GitHub profile fetch, ConfirmGate
│   ├── motion/           # Reusable animations (FadeIn, Stagger)
│   ├── navigation/       # TopNav, CommandPalette, footer
│   ├── sync/             # GitHub OAuth, DiffPreview, push modal
│   └── wizard/           # 6-step interactive visual wizard & LivePreviewPane
├── lib/
│   ├── buildMarkdown.ts  # Pure markdown generation engine (unit-tested)
│   ├── export/           # Export utils (PNG snapshot, share URL compression)
│   ├── parser/           # AST-based reverse README importer
│   └── plugins/          # Plugin registry, Zod types, and 8 wrapped OSS plugins
├── locales/              # i18n dictionaries (en.json, pt-BR.json)
└── store/
    └── useReadmeStore.ts # Single source of truth Zustand store
docs/
├── PLUGIN_GUIDE.md       # Plugin authoring and integration guide
└── config-schema.md      # Declarative JSON configuration schema specification
```

---

## :puzzle_piece: Plugin Ecosystem

ReadmeForge is built on an extensible, typed plugin engine (`src/lib/plugins/`). Every widget implements the typed `Plugin` Zod schema:

```typescript
import { z } from 'zod';
import { Plugin } from '@/lib/plugins/types';

export const myPlugin: Plugin = {
  id: 'my-custom-plugin',
  name: 'Custom Plugin',
  version: '1.0.0',
  description: 'Embeds custom stats cards into profile READMEs',
  author: 'Community Contributor',
  category: 'stats',
  schema: z.object({
    username: z.string().min(1),
    theme: z.string().default('dark'),
  }),
  render: (config, theme) => {
    return `<img src="https://my-service.com/api?user=${config.username}&theme=${theme}" alt="Stats" />`;
  },
};
```

To add your own plugin, consult the [Plugin Authoring Guide](docs/PLUGIN_GUIDE.md).

---

## :desktop_computer: Developer Mode

Need raw control? Jump straight to `/developer` for:
- Monaco JSON code editor with autocompletion and diagnostic schema validation
- Real-time two-way synchronization with the visual wizard state
- Plugin insertion drawer: search, configure, and insert plugins with 1 click
- Export bar: copy raw markdown, download `.md`, or generate a shareable compressed URL

---

## :shield: Security & Architecture Invariants

- **Single Store Truth**: `src/store/useReadmeStore.ts` holds all configuration state. No divergent or duplicate UI state.
- **Pure Markdown Generator**: `buildMarkdown(config)` in `src/lib/buildMarkdown.ts` is 100% deterministic and free of React/DOM dependencies.
- **Explicit Confirmation Gates**: No third-party data from resume parsing or API enrichment touches your profile without explicit approval (`ConfirmGate.tsx`).
- **Diff Preview Before Push**: Writes to GitHub repositories require visual confirmation on a side-by-side diff (`DiffPreview.tsx`).

---

## :handshake: Contributing

Contributions are welcome! Please read our [Contributing Guidelines](.github/CONTRIBUTING.md) and [Code of Conduct](.github/CODE_OF_CONDUCT.md) before submitting pull requests.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/amazing-feature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## :page_facing_up: License

Distributed under the MIT License. See [LICENSE.md](LICENSE.md) for details. Third-party notices and upstream attributions are documented in [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).
