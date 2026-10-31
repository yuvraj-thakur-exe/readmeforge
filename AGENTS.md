# AGENTS.md — MonoForge

Instructions for any AI coding agent (Claude Code, Cursor, Devin, Copilot Workspace, etc.) working in this repo.

## What this is
MonoForge — GitHub profile README generator. Visual wizard + `/developer` raw-mode editor, plugin-based stats/badges, resume import + web enrichment (confirmation-gated), direct GitHub push/sync.

## Stack
Next.js 16 (App Router) · TypeScript · Tailwind · Shadcn/ui · Radix · zustand · zod · react-hook-form · Biome (lint/format) · Vitest (unit) · Playwright (e2e)

## Source of truth / architecture — do not violate
- **One zustand store** (`src/store/useReadmeStore.ts`) holds all profile config. The wizard UI and `/developer` editor both read/write it. Never create parallel/duplicate state. (`src/stores/readme-store.ts` is a backwards-compatible alias re-exporting this exact store).
- **`buildMarkdown(config) → string`** (`src/lib/buildMarkdown.ts`) is a pure function — no React, no side effects, fully unit-tested. Any change to output format goes through this function.
- **Plugins** live in `src/lib/plugins/registry.ts`, each a plain object validated by the `Plugin` zod schema in `src/lib/plugins/types.ts`. To add a plugin: add one file, register it — never touch core wizard/editor logic.
- **Nothing from resume parsing or web enrichment writes to the store without explicit per-item user confirmation.** This is a hard rule, not a UX suggestion — see `src/components/enrichment/ConfirmGate.tsx`. Resume parsing is real and backed by server extraction in `src/app/api/enrichment/resume/route.ts` and `src/lib/parser/resume-parser.ts`.
- **GitHub push/sync is never silent or simulated.** Any write to the user's GitHub repo fetches the real remote README content for diff preview, prompts for explicit "Confirm & push" step (`src/components/sync/DiffPreview.tsx`), and performs an authenticated REST API commit via `src/lib/github/sync.ts`.

## Directory map
```
src/app/                 routes (wizard, /developer, api/*)
src/components/wizard/   step-by-step form UI
src/components/developer/ Monaco editor, plugin panel, export bar
src/components/enrichment/ resume upload, web-search suggestions, confirm gate
src/components/sync/     GitHub OAuth, diff preview, push
src/lib/plugins/         registry.ts, types.ts, one file per plugin
src/lib/buildMarkdown.ts pure markdown generator — unit test any change here
src/store/               zustand store
docs/config-schema.md    JSON schema shared by wizard + /developer — keep in sync with zod types
```

## Commands
```bash
pnpm install
pnpm dev        # localhost:3000
pnpm build
pnpm test       # vitest
pnpm test:e2e   # playwright
pnpm lint        # biome check
pnpm format      # biome format
```

## Before opening a PR / finishing a task
1. `pnpm lint && pnpm test` must pass.
2. If you touched `buildMarkdown.ts` or any plugin: add/update its Vitest test.
3. If you touched the config shape: update `docs/config-schema.md` and the zod schema together — they must never drift.
4. If you added a plugin: it must validate against the `Plugin` zod schema and appear in the `/developer` plugin panel automatically (registry-driven, no manual wiring).
5. Don't add a new state management layer, new CSS framework, or new markdown renderer — stay inside the stack above unless explicitly asked.
6. Don't make resume/web-enrichment data or GitHub pushes silent/automatic — confirmation gates are mandatory, not optional polish.

## Conventions
- Components: PascalCase, one per file, colocated `*.test.tsx` where logic warrants it.
- Styling: Tailwind utility classes + `tailwind-variants` for variants; no plain CSS files except globals.
- Animation: reuse `<FadeIn>` / `<Stagger>` wrappers (`src/components/motion/`) instead of inlining Framer Motion variants in every component.
- SVG Character Kinematics & Animated Assets: Refer to `.agents/skills/readme-vector-animator/SKILL.md`. All animated vector characters (Cyber Bot, Pixel Dev at desk, Ninja Coder, Builder, Wizard, and custom avatars) and non-character animations (fire banners, matrix rain, kinetic typewriter typography, laser border beams, floating tech orbits) must use `transform-box: fill-box; transform-origin: center;`, preserve aspect-ratio scaling (`preserveAspectRatio="xMidYMid meet"`), adhere to GitHub Camo rules (zero `<script>`, zero `<foreignObject>`, system font fallbacks, 60fps GPU `transform`/`opacity` only), and be stationed with purposeful motion.
- Commit messages: Conventional Commits (`feat:`, `fix:`, `chore:`, etc.).
- i18n strings go in `src/translations/<locale>.json` — never hardcode user-facing text in components.

## Animated Vector & Character Motion Engine (README.md & Web)
- **Primary Skill**: `.agents/skills/readme-vector-animator/SKILL.md` (and `.agents/rules/animated-vector-engine.md`).
- **Scope**: Not limited to characters. Author standalone, production-ready SVGs including:
  1. **Animated Characters**: Cyber Bot (thruster flicker, antenna beacon, terminal speech bubble), Pixel Developer (at dual-monitor desk with typing hands & coffee steam), Ninja Coder (combat stance, headband flutter, katana glint), Builder Crafter (hammer swing, sparks, stacking tech blocks), Wizard Mage (pulsating crystal staff, rotating runic circle).
  2. **Atmospheric Banners**: Fire/ember rises, Matrix digital rain, Starfield nebula twinkle, CRT scanlines, Cyber grids.
  3. **Kinetic Typography**: Terminal typewriter with blinking cursor, chromatic glitch split, gradient chrome sweep.
  4. **Cyber Frames & Border Beams**: 60fps traveling perimeter laser lines (`stroke-dasharray`), targeting crosshairs, corner brackets.
  5. **Floating Tech Orbits**: Elliptical orbiting tech badges (TypeScript, Rust, React, Docker, Kubernetes).
- **GitHub Camo & Optimization Rules**:
  - Always embed valid CSS `@keyframes` inside `<style>` blocks (never external fonts or JS scripts).
  - Include `@media (prefers-reduced-motion: reduce)` for accessibility.
  - Support dark/light mode via `@media (prefers-color-scheme: light)` or `<picture>` tags.
  - Output copy-pasteable Markdown snippets (`<p align="center"><img src="..." width="100%" /></p>`) for instant user integration.

## Full feature/build spec
See `AGENT_PROMPT_FULL.md` in repo root for the complete build plan (branding, libraries, plugin list, wizard question set, resume/enrichment spec, GitHub sync spec, execution order). AGENTS.md is the standing reference for ongoing work; AGENT_PROMPT_FULL.md was the original build brief.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
