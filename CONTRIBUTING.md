# Contributing to ReadmeForge

ReadmeForge is 100% open-source software built by and for the global developer community with zero barriers or restrictions. Whether you're adding an animated SVG character, expanding the 47+ metrics plugins, improving UI/UX ergonomics, or submitting a fix, your contributions are warmly welcomed!

---

## 🏗️ Architecture Overview

- **Web Studio & UI**: Next.js 16 (App Router), TypeScript, Tailwind CSS, Shadcn/ui, Radix, Zustand, react-hook-form.
- **ReadmeForge Metrics (`/metrics`)**: Infographics engine with 47+ plugins, templates (`classic`, `terminal`, `repository`, `markdown`, `community`), and SVG infographic generation.
- **Plugins (`src/lib/plugins/`)**: Registry-driven modular wrappers validated against a unified Zod schema.
- **Animated Vector Engine**: Standalone, Camo-compliant SVG animations with CSS keyframes and zero external JavaScript.

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 20.x or later
- pnpm 10.x (`npm install -g pnpm`)

### 1. Clone & Install
```bash
git clone https://github.com/yuvraj-thakur-exe/readmeforge.git
cd readmeforge
pnpm install
```

### 2. Run Dev Server
```bash
pnpm dev
# Web Studio runs on http://localhost:3000/en
# Metrics Studio runs on http://localhost:3000/en/metrics
```

### 3. Run Standalone Metrics Engine
```bash
pnpm metrics:start
# Runs local metrics infographic instance on http://localhost:3000
```

---

## 🧪 Verification & Testing

Before submitting a Pull Request, verify all checks locally:

```bash
# 1. Run Vitest Unit Tests
pnpm test

# 2. Strict TypeScript Type Check
npx tsc --noEmit

# 3. Biome Code Linter & Formatter
pnpm lint
pnpm format:check
```

---

## 🧩 Adding a New Plugin

1. Create a wrapper file in `src/lib/plugins/wrappers/<plugin-name>.ts`.
2. Implement the `Plugin` interface (`src/lib/plugins/types.ts`).
3. Colocate a test file `src/lib/plugins/wrappers/<plugin-name>.test.ts`.
4. Register the plugin in `src/lib/plugins/registry.ts`.
5. Run `pnpm test` to verify automatic registry discovery and Zod validation.

---

## 📐 Git Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat: add leetcode topic badges to metrics studio`
- `fix: resolve isometric calendar date calculation`
- `docs: update configuration schema documentation`
- `test: add coverage for metrics action generator`
