# REBRAND_CHECKLIST.md — strip original, ship as ReadmeForge

Run this after cloning the reference repo and before first commit to the new repo. Check legal/attribution requirements for each merged OSS repo (§3 of AGENT_PROMPT_FULL.md) individually — MIT requires keeping that specific repo's license notice if its code is vendored in (not needed if only consumed via API/embed, as planned).

## 1. Remove original branding
- [x] Delete original `README.md` content entirely — replace with new ReadmeForge README (built in step 11/§6)
- [x] Replace all logo/favicon assets in `public/` (`logo.svg`, `logo-icon.svg`, `favicon.svg`)
- [x] Search repo-wide for "profile-readme-generator", "maurodesouza", "Mauro de Souza" → replace/remove
- [x] Remove original demo video/gif references (`profile-readme-generator.mp4`) — record/generate new ReadmeForge demo
- [x] Replace `meta-og:title`, `meta-og:description`, `meta-twitter:*`, page `<title>` with ReadmeForge branding
- [x] Remove original Trendshift/donation badges, stargazer badges pointing to old repo — regenerate shields.io badges pointing to new repo
- [x] Remove original `.github/CONTRIBUTING.md`, issue templates, PR templates → write new ones for your repo
- [x] Remove original Code of Conduct attribution footer if it names the old project/maintainer

## 2. License
- [x] Decide new license (MIT recommended, matches original's permissiveness and most merged plugin repos)
- [x] Replace `LICENSE.md` entirely with new copyright holder (your name/org) + current year
- [x] Remove old `Made with ❤️ by Mauro de Souza` line from README and any about pages
- [x] If you vendored any code directly (not just API/embed calls) from §3 repos, keep a `THIRD_PARTY_LICENSES.md` listing each: repo name, license type, link — this is required for MIT/Apache even in a rebrand
- [x] Update `package.json`: `license` field, `author`, `name`, `repository.url`, `bugs.url`, `homepage`

## 3. Rename everything
- [x] `package.json` → `name: "readmeforge"`
- [x] Repo name on GitHub → `readmeforge` (or your chosen handle)
- [x] `next.config.js` / env vars referencing old domain (`profile-readme-generator.com`) → your new domain
- [x] Docker image name in `Dockerfile` / `docker-compose.yml` if present
- [x] CI workflow names in `.github/workflows/*.yml`
- [x] `vitest.config.ts` / `playwright.config.ts` project names if set
- [x] Any hardcoded GitHub API paths pointing to old repo (star count badges, release links)

## 4. New files to create
- [x] `README.md` — ReadmeForge branding, demo gif, badges (pointing to YOUR repo), feature list, built-with, quickstart, contributing link, license badge
- [x] `LICENSE.md` — fresh MIT (or chosen) license, your name, current year
- [x] `THIRD_PARTY_LICENSES.md` — only if any §3 repo code is vendored, not just API-called
- [x] `AGENTS.md` — already drafted (repo-root agent instructions)
- [x] `.github/CONTRIBUTING.md` — new, including plugin-authoring guide (how to add a file to `src/lib/plugins/registry.ts`)
- [x] `.github/CODE_OF_CONDUCT.md` — Contributor Covenant template, your project name
- [x] `.github/ISSUE_TEMPLATE/bug_report.md`, `feature_request.md`
- [x] `.github/PULL_REQUEST_TEMPLATE.md`
- [x] `docs/config-schema.md` — JSON config schema doc (per AGENT_PROMPT_FULL §6)
- [x] `.env.example` — document required keys (GitHub OAuth client id/secret, WakaTime key if used)
- [x] `public/favicon.svg`, `public/logo-icon.svg`, `public/logo.svg` — new ReadmeForge assets (anvil/flame mark, violet→cyan gradient per branding spec)

## 5. Final sweep
- [x] Grep entire repo for: `maurodesouza`, `profile-readme-generator`, `Mauro de Souza`, old domain string — zero matches remaining except inside `THIRD_PARTY_LICENSES.md` if applicable
- [x] Confirm `git remote` points to new repo, not a fork relationship (use "Create new repository from this template" or re-init git history if a clean break is wanted)
- [ ] Verify build (`pnpm build`) and all tests pass after the sweep — renaming sometimes breaks hardcoded import paths/env references

## Note on forking vs clean break
If starting from `git clone` (not GitHub's "Fork" button), there is no attribution requirement beyond the MIT license notice replacement in step 2 — MIT does not require keeping the original README, branding, or a "forked from" notice, only the license text for any code actually reused. If you used GitHub's Fork feature instead, consider detaching it (GitHub support can unlink fork relationship) so it shows as an independent repo.
