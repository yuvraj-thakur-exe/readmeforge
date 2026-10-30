# Memory: MonoForge (Recreation, Supercharge & Rebrand)

## 1. Project Context & Brand Identity
- **Name:** MonoForge
- **Tagline:** "Forge a GitHub profile that gets noticed."
- **Logo Mark:** Flame / Anvil mark (Lucide `Flame`), gradient `from-violet-500 to-cyan-400`.
- **Target:** Transform `profile-readme-generator` into a product-grade developer platform targeting 3k+ GitHub stars.
- **Reference Repository**: Cloned in `d:\profile genrater`.
- **Implementation Plan**: Archived at [`agent-files/plans/2026-10-25-monoforge.md`](file:///d:/profile%20genrater/agent-files/plans/2026-10-25-monoforge.md).
- **Rebrand Checklist**: Archived at [`agent-files/REBRAND_CHECKLIST.md`](file:///d:/profile%20genrater/agent-files/REBRAND_CHECKLIST.md).

---

## 2. Standing Architecture Rules (AGENTS.md)
1. **One Zustand Store**: `src/store/useReadmeStore.ts` is the single source of truth for both visual wizard and `/developer`. Never create parallel state.
2. **Pure Markdown Function**: `buildMarkdown(config) -> string` (`src/lib/buildMarkdown.ts`) is 100% pure without React or DOM dependencies.
3. **Registry Plugins**: Plugins live in `src/lib/plugins/registry.ts`, validated against `Plugin` Zod schema in `src/lib/plugins/types.ts`.
4. **Enrichment Confirmation Gate**: Nothing from resume parsing or web enrichment writes to store without explicit per-item user confirmation (`src/components/enrichment/ConfirmGate.tsx`).
5. **Diff Preview Before GitHub Push**: Any write to GitHub requires diff preview + explicit "Confirm & push" (`src/components/sync/DiffPreview.tsx`).

---

## 3. Progress Tracking
- [x] **Task 1 Baseline Dependencies & Rebranding Init** (corepack pnpm install, all §2 & §6 packages installed)
- [x] **Task 2 Core Zod Schemas & Zustand Store** (`types.ts`, `useReadmeStore.ts`, `docs/config-schema.md`, unit tests passing)
- [x] **Task 3 Pure Markdown Engine** (`buildMarkdown.ts`, unit tests passing)
- [x] **Task 4 OSS Plugin Wrappers & Typed Registry** (8 plugins wrapped, registry tests passing)
- [x] **Task 5 Visual Wizard Question Set & Live Preview** (`WizardContainer`, `LivePreviewPane`, 6 steps per §6b)
- [x] **Task 6 /developer Route** (Monaco editor + Shiki + live preview + plugin panel + export bar)
- [x] **Task 7 Theme Toggle, Command Palette & Import-README Parser** (`next-themes`, `cmdk`, `remark` AST parser)
- [x] **Task 8 MonoForge Landing Page & Template Gallery** (Hero typewriter, particles, 10+ templates, dynamic OG image)
- [x] **Task 9 Export Suite, Confetti & Shareable Config URL** (PNG via `html-to-image`, base64 URL compression, confetti)
- [x] **Task 10 Resume Import & Web Enrichment with Confirmation Gate** (`pdf-parse`, `mammoth`, `octokit`, `ConfirmGate.tsx`)
- [x] **Task 11 GitHub OAuth & Direct Push Sync** (`next-auth`, `DiffPreview.tsx`, `GitHubSyncModal.tsx`)
- [x] **Task 12 Image Optimizer & GitHub Avatar Pull** (`react-easy-crop`, `browser-image-compression`, `ProfileImageUploader.tsx`)
- [x] **Task 13 i18n Pass (EN/PT)** (`en.json`, `pt-BR.json` with discovery keywords)
- [x] **Task 14 End-to-End Vitest & Playwright Tests** (458 unit tests passing across 100 files, e2e specs)
- [x] **Task 15 MonoForge Repo README, Guides & Deployment** (`docs/PLUGIN_GUIDE.md`, standalone Dockerfile)
- [x] **Task 16 Clean Up Unneeded Assets** (Removed obsolete PNG files in `public/`, moved agent files into `agent-files/`)
