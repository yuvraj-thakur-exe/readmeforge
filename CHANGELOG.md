# Changelog — ReadmeForge

All notable changes to ReadmeForge will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.1.0] - 2026-10-25
### Added
- Complete rebuild as **ReadmeForge** ("Forge a GitHub profile that gets noticed.").
- Unified Zustand state management (`useReadmeStore`) powering both wizard and `/developer`.
- Pure, unit-tested markdown generator (`buildMarkdown`).
- Typed plugin system wrapping top OSS tools:
  - `github-readme-stats`
  - `github-profile-trophy`
  - `readme-typing-svg`
  - `snk` contribution snake
  - `waka-readme-stats`
  - `markdown-badges`
  - `visitor-counter`
  - `portfolio-contributions`
- Dedicated `/developer` route with split Monaco JSON editor and real-time live preview.
- Light/Dark/System theme toggle using `next-themes`.
- Global command palette (`Cmd+K`) via `cmdk`.
- AST-based profile README importer using `remark`.
- High-converting landing page with animated typewriter headline, particle canvas, and 10+ starter templates.
- Full export suite: Markdown copy/download, PNG export via `html-to-image`, base64 URL config sharing, and confetti celebrations.
- Confirmation-gated resume parser and GitHub public data enrichment.
- Direct GitHub OAuth push/sync with visual diff preview.
- Full bilingual localization (English & Portuguese).
