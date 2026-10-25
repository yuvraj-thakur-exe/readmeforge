# ReadmeForge Implementation Plan & Rebranding Execution

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship **ReadmeForge** ("Forge a GitHub profile that gets noticed.") — a product-grade developer platform targeting 3k+ GitHub stars with an anvil/flame violet→cyan aesthetic, unified Zustand store, pure markdown engine, typed plugin registry wrapping top OSS profile tools, dynamic landing page, `/developer` Monaco IDE route, confirmation-gated resume/web enrichment, and direct GitHub sync.

**Architecture:** A single source of truth Zustand store (`src/store/useReadmeStore.ts`) synchronizes both the interactive visual wizard and the raw Monaco-based `/developer` workspace. Markdown generation is isolated into a pure, deterministic `src/lib/buildMarkdown.ts` pipeline validated by strict Zod schemas. Top external open-source profile tools (`github-readme-stats`, `snk`, `readme-typing-svg`, `waka-readme-stats`, `profile-trophy`, `markdown-badges`, `portfolio-contributions`, `visitor-counter`) are wrapped as modular, typed plugins within `src/lib/plugins/registry.ts`. All resume/web-enrichment data passes through an explicit confirmation gate (`ConfirmGate.tsx`), and all GitHub repository writes require a diff preview (`DiffPreview.tsx`).

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Lucide React, Zustand, Zod, Monaco Editor, Shiki, React Hook Form, Framer Motion, @formkit/auto-animate, react-tsparticles, tsparticles-slim, react-rough-notation, react-type-animation, react-scroll-parallax, canvas-confetti, vaul, cmdk, next-themes, next-intl, html-to-image, pdf-parse, mammoth, octokit, next-auth, diff, react-diff-viewer-continued, Biome, Vitest, Playwright.

**Spec:** In-chat PROJECT: ReadmeForge Brief, `AGENTS.md`, and `REBRAND_CHECKLIST.md`.

## Global Constraints
- **Branding Consistency**: Use "ReadmeForge" across `package.json`, page `<title>`, OG images, headers, favicon, landing hero, and repo README. Tagline: *"Forge a GitHub profile that gets noticed."* Visual mark: Flame/Hammer with gradient violet→cyan (`from-violet-500 to-cyan-400`).
- **Complete Rebranding Sweep**: Strip all legacy strings (`maurodesouza`, `profile-readme-generator`, `Mauro de Souza`, old domain `profile-readme-generator.com`) from metadata, templates, footer, and config per `REBRAND_CHECKLIST.md`.
- **Single Source of Truth**: State is maintained exclusively in `useReadmeStore`; never duplicate or de-sync state between visual wizard and `/developer`.
- **Pure Markdown Engine**: `buildMarkdown(config)` must remain 100% pure without React or DOM dependencies, verified via unit tests.
- **Strict Typing**: Zero `any` or `as unknown` without explicit narrowing; all plugin and config schemas must be validated via Zod.
- **Confirmation Gate Invariant**: Nothing from resume parsing or web enrichment writes to store without explicit per-item user confirmation (`ConfirmGate.tsx`).
- **Diff Preview Invariant**: Direct GitHub sync must show a diff preview and require explicit "Confirm & push" (`DiffPreview.tsx`).
- **Step-by-Step Commit Cadence**: Each task ends with verification and an atomic Git commit.

## Review Focus
1. **Residual Legacy Strings**: Grep sweep must verify zero unauthorized occurrences of `maurodesouza` or `profile-readme-generator` across source code, config, and documentation.
2. **Plugin Schema Validation Failures**: When third-party parameters (e.g. GitHub username, custom theme, layout modes) change, Zod validation in `src/lib/plugins/types.ts` must catch errors with localized fallback values rather than crashing the builder.
3. **Import Parser Edge Cases**: Pasted GitHub READMEs containing non-standard HTML, nested tables, raw SVGs, or malformed markdown tags must parse safely into structured sections without throwing runtime exceptions.
4. **URL State Decompression/Payload Limits**: Base64 share URLs with heavy configurations must decode defensively with size and schema validation.
5. **Theme Flash & Hydration**: `next-themes` and MobX-to-Zustand migration must maintain hydration stability across SSR/client boundaries.
6. **Memory Leaks in Live Animations**: Particles (`react-tsparticles`) and Monaco editor instances must cleanly unmount and avoid memory leaks during route navigation.

---

### Task 1: Complete Rebranding & Legacy Cleanup (§1-§3 Rebrand Checklist) [IN PROGRESS - 85% DONE]
**Reference Checklist:** `REBRAND_CHECKLIST.md` in repository root.

**Completed Files:**
- `package.json` (name: `readmeforge`, license, author, URLs)
- `LICENSE.md` (fresh MIT license, 2026 ReadmeForge Contributors)
- `THIRD_PARTY_LICENSES.md` (upstream MIT attributions)
- `.env.example`
- `CHANGELOG.md` (v0.1.0)
- `.github/CODE_OF_CONDUCT.md`
- `.github/CONTRIBUTING.md`
- `.github/ISSUE_TEMPLATE/` (bug_report.md, feature_request.md)
- `.github/PULL_REQUEST_TEMPLATE.md`
- `public/logo.svg`
- `src/app/[locale]/layout.tsx` (title, meta-og, twitter)
- `src/components/molecules/page-footer/index.tsx`

**Residual Rebrand Cleanup Steps:**
- [x] **Step 1: Replace `LICENSE.md` with fresh MIT license for ReadmeForge (Current Year & ReadmeForge Authors)**
- [x] **Step 2: Create `THIRD_PARTY_LICENSES.md` documenting open-source references and upstream notice**
- [x] **Step 3: Update `package.json` fields (repository, bugs, homepage, author) to ReadmeForge**
- [x] **Step 4: Update metadata, title, and openGraph in `src/app/[locale]/layout.tsx` to ReadmeForge**
- [x] **Step 5: Clean `PageFooter` and `ResultTemplate` to reference ReadmeForge repositories and branding**
- [x] **Step 6: Create `.github/` issue templates, PR template, Code of Conduct, and Contributing guide**
- [x] **Step 7: Create `.env.example` and `CHANGELOG.md` starting at `v0.1.0`**
- [x] **Step 8: Generate ReadmeForge brand SVG assets (`logo.svg`)**
- [ ] **Step 9: Generate `public/favicon.ico` and `public/og-image.png` assets**
- [ ] **Step 10: Clean residual legacy strings in `public/manifest.json`, `public/ads.txt`, `src/translations/en.json`, `src/translations/pt-BR.json`, `src/config/general/index.ts`, `src/resources/templates.ts`, and local asset paths in `snake` and `pacman` sections**
- [ ] **Step 11: Replace root `README.md` with ReadmeForge high-traction README (shields.io badges, anvil/spark logo, feature matrix, plugin showcase)**
- [ ] **Step 12: Run final grep verification to ensure all legacy strings are eliminated**

---

### Task 2: Core Zod Schemas, Zustand Store & Config Docs [COMPLETED]
**Files:**
- `src/lib/plugins/types.ts`
- `src/stores/readme-store.ts`
- `src/store/useReadmeStore.ts`
- `docs/config-schema.md`
- `src/stores/readme-store.test.ts`

---

### Task 3: Pure Markdown Engine (`src/lib/buildMarkdown.ts`) [COMPLETED]
**Files:**
- `src/lib/buildMarkdown.ts`
- `src/lib/buildMarkdown.test.ts`

---

### Task 4: OSS Plugin Wrappers & Typed Registry [COMPLETED]
**Files:**
- `src/lib/plugins/registry.ts`
- `src/lib/plugins/wrappers/github-readme-stats.ts`
- `src/lib/plugins/wrappers/github-profile-trophy.ts`
- `src/lib/plugins/wrappers/readme-typing-svg.ts`
- `src/lib/plugins/wrappers/snk.ts`
- `src/lib/plugins/wrappers/waka-readme-stats.ts`
- `src/lib/plugins/wrappers/markdown-badges.ts`
- `src/lib/plugins/wrappers/visitor-counter.ts`
- `src/lib/plugins/wrappers/portfolio-contributions.ts`
- `src/lib/plugins/registry.test.ts`

---

### Task 5: Visual Wizard Question Set & Live Preview Pane (§6b & §7 Step 4) [COMPLETED]
**Files:**
- `src/components/motion/FadeIn.tsx`
- `src/components/motion/Stagger.tsx`
- `src/components/wizard/WizardContainer.tsx`
- `src/components/wizard/LivePreviewPane.tsx`
- `src/components/wizard/steps/IdentityStep.tsx`
- `src/components/wizard/steps/StyleVisualStep.tsx`
- `src/components/wizard/steps/SkillsTechStep.tsx`
- `src/components/wizard/steps/StatsPluginsStep.tsx`
- `src/components/wizard/steps/SocialLinksStep.tsx`
- `src/components/wizard/steps/ProjectsStep.tsx`
- `src/app/[locale]/page.tsx`
- Commit: `54b6dff`

---

### Task 6: Developer Route (`/developer`) with Monaco & Plugin Panel (§6 & §7 Step 5)
**Files:**
- Create: `src/app/developer/page.tsx`
- Create: `src/app/developer/layout.tsx`
- Create: `src/components/developer/Editor.tsx`
- Create: `src/components/developer/LivePreview.tsx`
- Create: `src/components/developer/PluginPanel.tsx`
- Create: `src/components/developer/ExportBar.tsx`
- Create: `src/app/api/developer/export/route.ts`

**Interfaces:**
- Consumes: `@monaco-editor/react`, `shiki`, `useReadmeStore`, `pluginRegistry`
- Produces: Dedicated `/developer` split view with Monaco JSON editor, live rendered preview, plugin browser, and instant sync to store.

- [ ] **Step 1: Implement `Editor.tsx` with Monaco editor with JSON schema diagnostics and Shiki theme**
- [ ] **Step 2: Bi-directional synchronization: Editor changes validate and update `useReadmeStore`**
- [ ] **Step 3: Implement `PluginPanel.tsx` for searching and inserting plugins into config**
- [ ] **Step 4: Implement `LivePreview.tsx` for markdown rendering**
- [ ] **Step 5: Implement `ExportBar.tsx` with copy, download, URL sharing, and confetti**
- [ ] **Step 6: Build `/developer/page.tsx` and layout**
- [ ] **Step 7: Commit developer route**
  ```bash
  git add src/app/developer/ src/components/developer/ src/app/api/developer/
  git commit -m "feat(developer): build /developer IDE mode with Monaco editor and plugin panel"
  ```

---

### Task 7: Theme Toggle, Command Palette (`Cmd+K`) & Import-README Parser (§7 Step 6)
**Files:**
- Create: `src/components/theme/ThemeProvider.tsx`
- Create: `src/components/theme/ThemeToggle.tsx`
- Create: `src/components/command-palette/CommandPalette.tsx`
- Create: `src/lib/parser/import-readme.ts`
- Test: `src/lib/parser/import-readme.test.ts`
- Modify: `src/app/[locale]/layout.tsx`

**Interfaces:**
- Consumes: `next-themes`, `cmdk`, `react-hotkeys-hook`
- Produces: Dark/light/system theme toggle, `Cmd+K` global command palette, and AST-based README markdown importer.

- [ ] **Step 1: Configure `next-themes` provider in root layout without hydration flash**
- [ ] **Step 2: Build `ThemeToggle.tsx` button with smooth transition**
- [ ] **Step 3: Write failing unit test for `importReadme(markdown: string): ReadmeConfig`**
- [ ] **Step 4: Implement `importReadme` with `remark` AST parser extracting headers, badges, and stats cards**
- [ ] **Step 5: Run import tests to verify pass**
  Run: `pnpm vitest run src/lib/parser/import-readme.test.ts`
- [ ] **Step 6: Build `CommandPalette.tsx` (`Cmd+K`) with shortcuts to jump steps, toggle themes, and export**
- [ ] **Step 7: Commit theme toggle, command palette, and importer**
  ```bash
  git add src/components/theme/ src/components/command-palette/ src/lib/parser/ src/app/[locale]/layout.tsx
  git commit -m "feat(ux): add next-themes toggle, cmdk command palette, and remark AST importer"
  ```

---

### Task 8: ReadmeForge Landing Page & Curated Template Gallery (§7 Step 7)
**Files:**
- Create: `src/components/landing/HeroSection.tsx`
- Create: `src/components/landing/ParticleBackground.tsx`
- Create: `src/components/landing/TemplateGallery.tsx`
- Create: `src/components/landing/FeatureShowcase.tsx`
- Create: `src/app/api/og/route.tsx`
- Modify: `src/resources/templates.ts`

**Interfaces:**
- Consumes: `react-type-animation`, `react-tsparticles`, `react-scroll-parallax`, `templates`
- Produces: High-converting landing page with animated hero, particle effect, parallax showcase, and 10+ starter templates with 1-click apply.

- [ ] **Step 1: Build `ParticleBackground.tsx` using `react-tsparticles` and `tsparticles-slim`**
- [ ] **Step 2: Build `HeroSection.tsx` with ReadmeForge flame mark, typewriter headline, and call to action**
- [ ] **Step 3: Build `TemplateGallery.tsx` displaying 10+ categorized templates (minimalist, terminal, gamer, academic, data dashboard) with 1-click apply**
- [ ] **Step 4: Implement dynamic Open Graph image generation in `src/app/api/og/route.tsx`**
- [ ] **Step 5: Commit landing page**
  ```bash
  git add src/components/landing/ src/app/api/og/
  git commit -m "feat(landing): build ReadmeForge landing page with particles, typewriter hero, and template gallery"
  ```

---

### Task 9: Export Suite, Confetti & Shareable Config URL (§7 Step 8)
**Files:**
- Create: `src/lib/export/export-utils.ts`
- Create: `src/components/export/ExportModal.tsx`
- Test: `src/lib/export/export-utils.test.ts`

**Interfaces:**
- Consumes: `canvas-confetti`, `html-to-image`, `useReadmeStore`
- Produces: Copy markdown, download `.md`, PNG snapshot generation, base64 URL compression/decompression, celebratory confetti.

- [ ] **Step 1: Write unit tests for URL config encoder/decoder (`encodeConfigToUrl`, `decodeConfigFromUrl`)**
- [ ] **Step 2: Implement export utilities in `src/lib/export/export-utils.ts`**
- [ ] **Step 3: Implement celebratory confetti on export using `canvas-confetti`**
- [ ] **Step 4: Run export unit tests to verify pass**
  Run: `pnpm vitest run src/lib/export/export-utils.test.ts`
- [ ] **Step 5: Commit export suite**
  ```bash
  git add src/lib/export/ src/components/export/
  git commit -m "feat(export): add export options (copy, md, png, share url) and confetti celebrations"
  ```

---

### Task 10: Resume Import & AI Web Enrichment with Confirmation Gate (§6c & §7 Step 12/13)
**Files:**
- Create: `src/lib/enrichment/resume-parser.ts`
- Create: `src/lib/enrichment/web-enrichment.ts`
- Create: `src/components/enrichment/ResumeUpload.tsx`
- Create: `src/components/enrichment/ConfirmGate.tsx`
- Test: `src/lib/enrichment/resume-parser.test.ts`

**Interfaces:**
- Consumes: `pdf-parse`, `mammoth`, `octokit`, `useReadmeStore`
- Produces: PDF/DOCX resume extraction and GitHub public API data fetch, strictly guarded by diffable confirmation gate ("Found: X — Add? [Yes/No/Edit]") — zero silent store mutations.

- [ ] **Step 1: Write unit tests for resume text extraction and entity parsing**
- [ ] **Step 2: Implement `resume-parser.ts` handling PDF and DOCX file uploads**
- [ ] **Step 3: Implement `web-enrichment.ts` using Octokit to fetch public bio, pinned repos, and top languages**
- [ ] **Step 4: Build `ConfirmGate.tsx` requiring explicit per-item user confirmation before writing to store**
- [ ] **Step 5: Build `ResumeUpload.tsx` modal UI**
- [ ] **Step 6: Run enrichment unit tests to verify pass**
  Run: `pnpm vitest run src/lib/enrichment/resume-parser.test.ts`
- [ ] **Step 7: Commit resume import and confirmation gate**
  ```bash
  git add src/lib/enrichment/ src/components/enrichment/
  git commit -m "feat(enrichment): implement resume parser, GitHub API enrichment, and mandatory confirm gate"
  ```

---

### Task 11: GitHub OAuth & Direct Push Sync with Diff Preview (§6d & §7 Step 14)
**Files:**
- Create: `src/app/api/auth/[...nextauth]/route.ts`
- Create: `src/lib/github/sync-service.ts`
- Create: `src/components/sync/DiffPreview.tsx`
- Create: `src/components/sync/SyncModal.tsx`

**Interfaces:**
- Consumes: `next-auth`, `octokit`, `diff`, `react-diff-viewer-continued`
- Produces: GitHub OAuth login, auto-detection of `<username>/<username>` repo, diff preview modal, explicit "Confirm & push" action, and optional automated refresh GitHub Action generator.

- [ ] **Step 1: Set up NextAuth GitHub provider route scoped to repo permissions**
- [ ] **Step 2: Implement `sync-service.ts` to check/create `<username>/<username>` and commit `README.md`**
- [ ] **Step 3: Implement `DiffPreview.tsx` showing unified old vs new README diff with explicit confirmation button**
- [ ] **Step 4: Build `SyncModal.tsx` integrating push workflow and rollback history**
- [ ] **Step 5: Commit GitHub sync suite**
  ```bash
  git add src/app/api/auth/ src/lib/github/ src/components/sync/
  git commit -m "feat(sync): implement GitHub OAuth, diff preview before push, and direct repo sync"
  ```

---

### Task 12: Internationalization Pass (EN/PT) (§7 Step 9)
**Files:**
- Modify: `src/translations/en.json`
- Modify: `src/translations/pt.json`
- Modify: `src/i18n/routing.ts`
- Modify: `src/i18n/request.ts`

**Interfaces:**
- Consumes: `next-intl`
- Produces: Complete bilingual dictionary for ReadmeForge wizard, `/developer`, landing page, template gallery, and sync modals.

- [ ] **Step 1: Audit all newly introduced UI strings across wizard, developer, landing, and sync**
- [ ] **Step 2: Add matching translation keys to `en.json` and `pt.json` with ReadmeForge branding**
- [ ] **Step 3: Verify locale routing across `/en` and `/pt`**
- [ ] **Step 4: Commit i18n pass**
  ```bash
  git add src/translations/ src/i18n/
  git commit -m "feat(i18n): complete EN and PT localization dictionary for ReadmeForge"
  ```

---

### Task 13: End-to-End Vitest & Playwright Test Suite (§7 Step 10)
**Files:**
- Create: `playwright/e2e/wizard-flow.spec.ts`
- Create: `playwright/e2e/developer-flow.spec.ts`
- Create: `playwright/e2e/theme-switch.spec.ts`

**Interfaces:**
- Produces: Complete passing test suite covering unit logic and browser user journeys.

- [ ] **Step 1: Run complete Vitest suite**
  Run: `pnpm test`
  Verify 100% pass rate.
- [ ] **Step 2: Write Playwright E2E tests for wizard flow, template loading, developer mode, and theme switch**
- [ ] **Step 3: Run Playwright tests**
  Run: `pnpm test:e2e`
- [ ] **Step 4: Commit test suites**
  ```bash
  git add playwright/ src/**/*.test.ts
  git commit -m "test: add comprehensive vitest unit tests and playwright e2e specs"
  ```

---

### Task 14: Polished Repository README, Guides & Deployment (§7 Step 11 & 15)
**Files:**
- Create: `README.md`
- Create: `docs/PLUGIN_GUIDE.md`
- Verify: `Dockerfile`

**Interfaces:**
- Produces: 3k-star caliber documentation: badge suite, demo GIF placeholder, architecture overview, plugin authoring tutorial, 1-click Vercel deploy button, working Docker build.

- [ ] **Step 1: Craft high-traction `README.md` titled "ReadmeForge"**
  Include flame/anvil branding, dynamic badges, feature highlights, comparison table, quick start, plugin showcase, and Vercel one-click deploy button.
- [ ] **Step 2: Write `docs/PLUGIN_GUIDE.md` with step-by-step instructions for contributors to create new badge/widget plugins**
- [ ] **Step 3: Verify Dockerfile builds cleanly**
- [ ] **Step 4: Final verification: Biome check, build check, and test check**
  Run: `pnpm lint && pnpm build && pnpm test`
- [ ] **Step 5: Commit final documentation and deployment assets**
  ```bash
  git add README.md docs/ Dockerfile
  git commit -m "docs: finalize ReadmeForge 3k-star readme, plugin guide, contributing guide, and deploy configs"
  ```
