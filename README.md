<div align="center" id="top">
  <img src="public/logo.svg" width="120" height="120" alt="ReadmeForge Logo" />
  <h1>ReadmeForge</h1>
  <p><strong>Forge a GitHub profile that gets noticed.</strong></p>
  <p>Product-grade GitHub profile README builder featuring an interactive visual wizard, Monaco developer IDE, 8+ modular open-source plugins, confirmation-gated resume import, and direct GitHub sync.</p>

  <p>
    <a href="https://github.com/readmeforge/readmeforge/actions/workflows/ci.yml">
      <img src="https://img.shields.io/github/actions/workflow/status/readmeforge/readmeforge/ci.yml?branch=main&label=CI&style=flat-square" alt="CI Status" />
    </a>
    <a href="https://github.com/readmeforge/readmeforge/blob/main/LICENSE.md">
      <img src="https://img.shields.io/badge/License-MIT-violet?style=flat-square" alt="License: MIT" />
    </a>
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Next.js-15%20(App%20Router)-black?style=flat-square&logo=next.js" alt="Next.js 15" />
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript" alt="TypeScript" />
    </a>
    <a href="https://github.com/readmeforge/readmeforge/stargazers">
      <img src="https://img.shields.io/github/stars/readmeforge/readmeforge?style=flat-square&color=cyan" alt="GitHub Stars" />
    </a>
    <a href="https://github.com/readmeforge/readmeforge/pulls">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" />
    </a>
  </p>

  <p>
    <a href="#sparkles-features">Features</a> &bull;
    <a href="#rocket-quickstart">Quickstart</a> &bull;
    <a href="#puzzle-piece-plugin-ecosystem">Plugins</a> &bull;
    <a href="#desktop_computer-developer-mode">/developer Mode</a> &bull;
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
- 🛡️ **Confirmation-Gated Resume & Web Enrichment**: Upload a PDF or DOCX resume, or fetch your public GitHub profile. **Zero silent store modifications** — every single field passes through `ConfirmGate.tsx` with diff review before writing to your config.
- 🚀 **Direct GitHub OAuth Sync**: Auto-detect your `<username>/<username>` profile repository and commit directly via Octokit with a side-by-side diff preview (`DiffPreview.tsx`).
- 🎨 **State-of-the-Art Aesthetics**: Violet-to-cyan gradient design tokens, dark/light/system theme toggling via `next-themes`, and celebration confetti via `canvas-confetti`.
- 📦 **Multi-Format Export**: One-click copy, `.md` download, PNG snapshot via `html-to-image`, or shareable URL with compressed base64 state.

---

## :rocket: Quickstart

### Prerequisites
- Node.js 20.x or 22.x
- `pnpm` (Corepack recommended)

### Local Development

```bash
# Clone the repository
git clone https://github.com/readmeforge/readmeforge.git
cd readmeforge

# Install dependencies
corepack pnpm install

# Start local development server
corepack pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verification & Testing

```bash
# Run unit tests (Zustand store, pure buildMarkdown, plugin registry)
corepack pnpm test

# Run code style and linter
corepack pnpm lint

# Production build
corepack pnpm build

# Run end-to-end browser tests
corepack pnpm test:e2e
```

---

## :puzzle_piece: Plugin Ecosystem

ReadmeForge is built on an extensible plugin engine (`src/lib/plugins/`). Every widget implements the typed `Plugin` Zod schema:

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
- Monaco JSON code editor with autocompletion and diagnostic validation
- Real-time two-way synchronization with the visual wizard state
- Plugin insertion panel: search, configure, and insert plugins with 1 click
- Export bar: copy raw markdown, download `.md`, or generate a shareable URL

---

## :shield: Security & Architecture Invariants

- **Single Store Truth**: `src/store/useReadmeStore.ts` holds all configuration state. No divergent or duplicate UI state.
- **Pure Markdown Generator**: `buildMarkdown(config)` in `src/lib/buildMarkdown.ts` is 100% deterministic and free of React/DOM dependencies.
- **Explicit Confirmation Gates**: No third-party data from resume parsing or API enrichment touches your profile without explicit approval.
- **Diff Preview Before Push**: Writes to GitHub repositories require visual confirmation on a side-by-side diff.

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

Distributed under the MIT License. See [LICENSE.md](LICENSE.md) for details. Third-party notices are documented in [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).
