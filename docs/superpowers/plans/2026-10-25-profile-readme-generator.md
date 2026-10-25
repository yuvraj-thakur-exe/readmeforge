# Recreate & Supercharge Profile README Generator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform and supercharge the `profile-readme-generator` into a product-grade developer tool targeting 3k+ GitHub stars with a unified Zustand state architecture, pure markdown generator, typed plugin system, dynamic landing page, and a dedicated `/developer` power-user IDE mode.

**Architecture:** A single source of truth Zustand store (`useReadmeStore`) synchronizes both the interactive visual wizard and the raw Monaco-based `/developer` workspace with bi-directional reactivity. Markdown generation is isolated into a pure, deterministic `buildMarkdown` pipeline validated by strict Zod schemas, while extensible plugin interfaces power community badge/stat contributions without core modification.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Zustand, Zod, Monaco Editor, Shiki, React Hook Form, Framer Motion, @formkit/auto-animate, react-tsparticles, react-type-animation, canvas-confetti, cmdk, next-themes, next-intl, html-to-image, Biome, Vitest, Playwright.

**Spec:** `C:\Users\YUVRAJ\Downloads\AGENT_BRIEF.md`

## Global Constraints
- **Single Source of Truth**: State is maintained exclusively in `useReadmeStore`; never duplicate or de-sync state between visual wizard and `/developer`.
- **Pure Markdown Engine**: `buildMarkdown(config)` must remain 100% pure without React or browser DOM dependencies, verified via unit tests.
- **Strict Typing**: Zero `any` or `as unknown` without explicit narrowing; all plugin and config schemas must be validated via Zod.
- **Dependency Invariant**: Strictly use the libraries listed in §2/§7 of the brief.
- **Step-by-Step Commit Cadence**: Each task ends with verification and an atomic Git commit.

## Review Focus
1. **Large/Malformed JSON Input in /developer**: Monaco editor input must gracefully handle syntax errors with actionable diagnostics rather than crashing the preview pane.
2. **Import Parser Edge Cases**: Pasted GitHub READMEs containing non-standard HTML, nested tables, or malformed markdown tags must parse safely without throwing runtime exceptions.
3. **URL State Decompression/Payload Limits**: Base64 share URLs with heavy configurations must decode defensively with size and schema validation.
4. **Theme Flash & Hydration**: `next-themes` and MobX-to-Zustand migration must maintain hydration stability across SSR/client boundaries.
5. **Memory Leaks in Live Animations**: Particles and Monaco instances must cleanly unmount and avoid memory leaks during route switching.

---

### Task 1: Scaffolding, Dependencies & Baseline Hygiene (§6 Step 1)
**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `biome.json`
- Modify: `tsconfig.json`

**Interfaces:**
- Produces: Installed dependencies from §2/§7 verified against Node.js v24 environment.

- [ ] **Step 1: Install required packages**
  Run:
  ```bash
  pnpm add framer-motion @formkit/auto-animate lottie-react @react-spring/web react-tsparticles tsparticles-slim react-rough-notation react-type-animation react-scroll-parallax canvas-confetti vaul @monaco-editor/react zod zustand remark-gfm rehype-raw rehype-sanitize shiki @tanstack/react-query react-hook-form @hookform/resolvers sonner cmdk next-themes react-hotkeys-hook next-intl html-to-image
  pnpm add -D @types/canvas-confetti
  ```
- [ ] **Step 2: Verify package installation and biome configuration**
  Run: `pnpm biome check src`
- [ ] **Step 3: Commit scaffolding baseline**
  ```bash
  git add package.json pnpm-lock.yaml biome.json tsconfig.json
  git commit -m "chore: scaffold dependencies and baseline configuration"
  ```

---

### Task 2: Core Zod Schemas, Zustand Store & Config Docs (§6 Step 2)
**Files:**
- Create: `src/lib/plugins/types.ts`
- Create: `src/stores/readme-store.ts`
- Create: `docs/config-schema.md`
- Test: `src/stores/readme-store.test.ts`

**Interfaces:**
- Produces: `ReadmeConfigSchema`, `PluginSchema`, `useReadmeStore`, and TypeScript types `ReadmeConfig`, `SectionConfig`.

- [ ] **Step 1: Write failing test for Zustand store actions and state updates**
  Test initial state, adding section, updating section props, reordering sections, and setting entire config.
- [ ] **Step 2: Run test to verify it fails**
  Run: `pnpm vitest run src/stores/readme-store.test.ts`
  Expected: FAIL
- [ ] **Step 3: Define Zod schemas in `src/lib/plugins/types.ts`**
  Implement schemas for `PluginField`, `Plugin`, `SectionConfig`, `UserSettings`, and `ReadmeConfig`.
- [ ] **Step 4: Implement `useReadmeStore` in `src/stores/readme-store.ts`**
  Provide state slices: `sections`, `settings`, `activeSectionId`, `history` (undo/redo), and sync actions.
- [ ] **Step 5: Write documentation in `docs/config-schema.md`**
  Document the JSON schema structure so AI agents and users can generate configs programmatically.
- [ ] **Step 6: Run test to verify it passes**
  Run: `pnpm vitest run src/stores/readme-store.test.ts`
  Expected: PASS
- [ ] **Step 7: Commit store and schemas**
  ```bash
  git add src/lib/plugins/types.ts src/stores/readme-store.ts src/stores/readme-store.test.ts docs/config-schema.md
  git commit -m "feat(store): implement unified zustand store and zod config schemas"
  ```

---

### Task 3: Pure Markdown Generator & Unit Tests (§5 & §6 Step 3/10)
**Files:**
- Create: `src/lib/markdown/build-markdown.ts`
- Create: `src/lib/markdown/generators/header.ts`
- Create: `src/lib/markdown/generators/stats.ts`
- Create: `src/lib/markdown/generators/techs.ts`
- Create: `src/lib/markdown/generators/socials.ts`
- Create: `src/lib/markdown/generators/workflows.ts`
- Test: `src/lib/markdown/build-markdown.test.ts`

**Interfaces:**
- Consumes: `ReadmeConfig` from `src/lib/plugins/types.ts`
- Produces: `buildMarkdown(config: ReadmeConfig): { readme: string; workflows: Record<string, string> }`

- [ ] **Step 1: Write comprehensive failing unit tests for `buildMarkdown`**
  Test empty config, full profile, badges alignment, stats widgets URLs, and workflow YAML generation.
- [ ] **Step 2: Run test to verify failure**
  Run: `pnpm vitest run src/lib/markdown/build-markdown.test.ts`
  Expected: FAIL
- [ ] **Step 3: Implement modular section markdown generators**
  Ensure clean HTML/Markdown output with correct alignment, GitHub asset links, and proper formatting.
- [ ] **Step 4: Implement pure `buildMarkdown` entry function**
  Assemble full markdown document with clear section breaks and accompanying workflow definitions.
- [ ] **Step 5: Run unit tests to verify they pass**
  Run: `pnpm vitest run src/lib/markdown/build-markdown.test.ts`
  Expected: PASS
- [ ] **Step 6: Commit pure markdown generator**
  ```bash
  git add src/lib/markdown/
  git commit -m "feat(markdown): implement pure buildMarkdown engine with unit tests"
  ```

---

### Task 4: Typed Plugin Registry & Starter Plugins (§6 Step 3)
**Files:**
- Create: `src/lib/plugins/registry.ts`
- Create: `src/lib/plugins/starters/github-stats.ts`
- Create: `src/lib/plugins/starters/skills-icons.ts`
- Create: `src/lib/plugins/starters/social-badges.ts`
- Create: `src/lib/plugins/starters/visitor-counter.ts`
- Create: `src/lib/plugins/starters/trophies.ts`
- Test: `src/lib/plugins/registry.test.ts`

**Interfaces:**
- Consumes: `PluginSchema` from `src/lib/plugins/types.ts`
- Produces: `pluginRegistry: Plugin[]`, `getPlugin(id: string): Plugin | undefined`

- [ ] **Step 1: Write failing test verifying all registry plugins validate against `PluginSchema`**
- [ ] **Step 2: Run test to verify failure**
  Run: `pnpm vitest run src/lib/plugins/registry.test.ts`
  Expected: FAIL
- [ ] **Step 3: Implement 5 core starter plugins**
  - GitHub Stats (overall stats, streak, top languages)
  - Skills & Tech Icons (multi-provider: simple-icons, shields, skill-icons)
  - Social Badges (Twitter, LinkedIn, YouTube, Discord, etc.)
  - Visitor Counter (badge style, color, hit count)
  - GitHub Trophies (theme, rank, layout)
- [ ] **Step 4: Register plugins in `registry.ts` and test validation**
  Run: `pnpm vitest run src/lib/plugins/registry.test.ts`
  Expected: PASS
- [ ] **Step 5: Commit plugin registry**
  ```bash
  git add src/lib/plugins/
  git commit -m "feat(plugins): implement typed plugin registry and starter plugins"
  ```

---

### Task 5: Live Animated Preview Pane & Visual Wizard (§6 Step 4)
**Files:**
- Create: `src/components/wizard/WizardContainer.tsx`
- Create: `src/components/wizard/LivePreviewPane.tsx`
- Create: `src/components/wizard/SectionForm.tsx`
- Create: `src/components/animation/FadeIn.tsx`
- Create: `src/components/animation/Stagger.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `useReadmeStore`, `buildMarkdown`
- Produces: Visual wizard layout with reactive form inputs and smooth animated preview transitions via `@formkit/auto-animate` and `framer-motion`.

- [ ] **Step 1: Create reusable animation wrappers (`<FadeIn>`, `<Stagger>`)**
- [ ] **Step 2: Build `LivePreviewPane` using `rehype-sanitize`, `remark-gfm`, and `rehype-raw`**
- [ ] **Step 3: Build `SectionForm` using `react-hook-form` connected to `useReadmeStore`**
- [ ] **Step 4: Integrate drag-and-drop reordering with smooth animations**
- [ ] **Step 5: Verify build & linting**
  Run: `pnpm biome check src/components/wizard`
- [ ] **Step 6: Commit wizard components**
  ```bash
  git add src/components/wizard/ src/components/animation/ src/app/[locale]/page.tsx
  git commit -m "feat(wizard): build live animated preview pane and visual form wizard"
  ```

---

### Task 6: Developer Route (`/developer`) with Monaco & Live Preview (§4 & §6 Step 5)
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
- Produces: Full-featured `/developer` power-user IDE route with split view, JSON schema validation, plugin browser, and instant live preview.

- [ ] **Step 1: Implement `Editor.tsx` with `@monaco-editor/react` supporting JSON and Markdown modes with Shiki styling**
- [ ] **Step 2: Implement bi-directional sync: Monaco editor changes validate against Zod schema and update `useReadmeStore`**
- [ ] **Step 3: Implement `PluginPanel.tsx` for searching, inspecting, and inserting plugins from the registry**
- [ ] **Step 4: Implement `LivePreview.tsx` for real-time rendered preview**
- [ ] **Step 5: Implement `ExportBar.tsx` with copy, download, and URL sharing actions**
- [ ] **Step 6: Build `/developer/page.tsx` and layout**
- [ ] **Step 7: Verify lint and types**
  Run: `pnpm biome check src/app/developer src/components/developer`
- [ ] **Step 8: Commit developer route**
  ```bash
  git add src/app/developer/ src/components/developer/ src/app/api/developer/
  git commit -m "feat(developer): implement /developer power-user IDE route with Monaco editor"
  ```

---

### Task 7: Theme Toggle, Command Palette (`Cmd+K`) & Import-README Parser (§6 Step 6)
**Files:**
- Create: `src/components/theme/ThemeProvider.tsx`
- Create: `src/components/theme/ThemeToggle.tsx`
- Create: `src/components/command-palette/CommandPalette.tsx`
- Create: `src/lib/parser/import-readme.ts`
- Test: `src/lib/parser/import-readme.test.ts`
- Modify: `src/app/[locale]/layout.tsx`

**Interfaces:**
- Consumes: `next-themes`, `cmdk`, `react-hotkeys-hook`
- Produces: Dark/light/system theme switching, `Cmd+K` quick navigation, and AST-based README markdown importer.

- [ ] **Step 1: Setup `next-themes` provider in root layout without theme flashing**
- [ ] **Step 2: Write failing test for `importReadme(markdown: string): ReadmeConfig`**
- [ ] **Step 3: Run test to verify failure**
  Run: `pnpm vitest run src/lib/parser/import-readme.test.ts`
  Expected: FAIL
- [ ] **Step 4: Implement `importReadme` with `remark` AST parser extracting headers, badges, and stats**
- [ ] **Step 5: Run import tests to verify they pass**
  Run: `pnpm vitest run src/lib/parser/import-readme.test.ts`
  Expected: PASS
- [ ] **Step 6: Implement `CommandPalette.tsx` (`Cmd+K`) for switching templates, jumping to sections, and triggering actions**
- [ ] **Step 7: Commit theme toggle, command palette, and importer**
  ```bash
  git add src/components/theme/ src/components/command-palette/ src/lib/parser/
  git commit -m "feat(ux): add next-themes toggle, cmdk command palette, and remark AST importer"
  ```

---

### Task 8: Dynamic Landing Page & Template Gallery (§6 Step 7)
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
- [ ] **Step 2: Build `HeroSection.tsx` with `react-type-animation` and `react-rough-notation`**
- [ ] **Step 3: Build `TemplateGallery.tsx` displaying 10+ categorized templates (minimalist, terminal, gamer, academic, data) with 1-click load into store**
- [ ] **Step 4: Implement dynamic Open Graph image generation in `src/app/api/og/route.tsx`**
- [ ] **Step 5: Verify landing page responsiveness and performance**
- [ ] **Step 6: Commit landing page**
  ```bash
  git add src/components/landing/ src/app/api/og/
  git commit -m "feat(landing): build SEO-optimized landing page with particles, hero typewriter, and template gallery"
  ```

---

### Task 9: Export Suite, Confetti & Shareable Config URL (§6 Step 8)
**Files:**
- Create: `src/lib/export/export-utils.ts`
- Create: `src/components/export/ExportModal.tsx`
- Test: `src/lib/export/export-utils.test.ts`

**Interfaces:**
- Consumes: `canvas-confetti`, `html-to-image`, `useReadmeStore`
- Produces: Copy markdown, download `.md`, PNG snapshot generation, base64 URL compression/decompression, celebratory confetti.

- [ ] **Step 1: Write unit tests for URL config encoder/decoder (`encodeConfigToUrl`, `decodeConfigFromUrl`)**
- [ ] **Step 2: Implement export utilities in `src/lib/export/export-utils.ts`**
  - Markdown file download
  - PNG export via `html-to-image`
  - Deep link to GitHub repo creation (`https://github.com/new?readme=...`)
  - URL state compression
- [ ] **Step 3: Implement celebratory confetti on export using `canvas-confetti`**
- [ ] **Step 4: Run export unit tests to verify they pass**
  Run: `pnpm vitest run src/lib/export/export-utils.test.ts`
  Expected: PASS
- [ ] **Step 5: Commit export suite**
  ```bash
  git add src/lib/export/ src/components/export/
  git commit -m "feat(export): add export options (copy, md, png, share url) and confetti celebrations"
  ```

---

### Task 10: Internationalization Pass (EN/PT) (§6 Step 9)
**Files:**
- Modify: `src/translations/en.json`
- Modify: `src/translations/pt.json`
- Modify: `src/i18n/routing.ts`
- Modify: `src/i18n/request.ts`

**Interfaces:**
- Consumes: `next-intl`
- Produces: Complete bilingual dictionary for wizard, `/developer`, landing page, and template gallery.

- [ ] **Step 1: Audit all newly introduced UI strings across wizard, developer, and landing page**
- [ ] **Step 2: Add matching translation keys to `en.json` and `pt.json`**
- [ ] **Step 3: Verify locale routing across `/en` and `/pt`**
- [ ] **Step 4: Commit i18n pass**
  ```bash
  git add src/translations/ src/i18n/
  git commit -m "feat(i18n): complete EN and PT localization dictionary for all new features"
  ```

---

### Task 11: End-to-End Vitest & Playwright Test Suite (§6 Step 10)
**Files:**
- Create: `playwright/e2e/wizard-flow.spec.ts`
- Create: `playwright/e2e/developer-flow.spec.ts`
- Create: `playwright/e2e/theme-switch.spec.ts`

**Interfaces:**
- Produces: Complete passing test suite covering both unit logic and browser user journeys.

- [ ] **Step 1: Run complete Vitest suite**
  Run: `pnpm test`
  Verify 100% pass rate.
- [ ] **Step 2: Write Playwright E2E tests for wizard flow, template loading, and developer mode**
- [ ] **Step 3: Run Playwright tests**
  Run: `pnpm test:e2e`
- [ ] **Step 4: Fix any regressions or test discrepancies**
- [ ] **Step 5: Commit test suites**
  ```bash
  git add playwright/ src/**/*.test.ts
  git commit -m "test: add comprehensive vitest unit tests and playwright e2e specs"
  ```

---

### Task 12: Production Repository README & Deployment Verification (§6 Step 11 & 12)
**Files:**
- Create/Modify: `README.md`
- Create: `docs/CONTRIBUTING.md`
- Create: `docs/PLUGIN_GUIDE.md`
- Verify: `Dockerfile`

**Interfaces:**
- Produces: 3k-star caliber documentation: badge suite, demo GIF placeholder, architecture overview, plugin authoring tutorial, 1-click Vercel deploy button, working Docker build.

- [ ] **Step 1: Craft high-traction `README.md` for the repository**
  Include title banner, dynamic badges, feature highlights, comparison table, quick start, plugin showcase, and Vercel one-click deploy button.
- [ ] **Step 2: Write `docs/PLUGIN_GUIDE.md` with step-by-step instructions for contributors to create new badge/widget plugins**
- [ ] **Step 3: Verify Dockerfile builds cleanly**
  Run: `docker build -t profile-readme-generator .` (or syntax validation)
- [ ] **Step 4: Final verification: Biome check, build check, and test check**
  Run: `pnpm lint && pnpm build && pnpm test`
- [ ] **Step 5: Commit final documentation and deployment assets**
  ```bash
  git add README.md docs/ Dockerfile
  git commit -m "docs: finalize 3k-star readme, plugin guide, contributing guide, and deploy configs"
  ```
