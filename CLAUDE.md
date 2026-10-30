# MonoForge — Claude & AI Agent Guide

## Quick Start for Agents
MonoForge is an open-source GitHub profile README generator and agent skill capability.

### Generate Profile via CLI
```bash
# Generate markdown profile directly to file or stdout
node bin/monoforge.js generate --username <username> --archetype wow-3d-city-cat --output README.md

# List available archetypes
node bin/monoforge.js list
```

### Run as Model Context Protocol (MCP) Server
```bash
node bin/monoforge.js mcp
```
Provides two stdio MCP tools:
- `generate_profile_readme`: Generates GitHub-safe profile README markdown.
- `list_archetypes`: Returns all visual archetypes and descriptions.

### Autonomous Agent Skill Spec
The official Open Agent Skills specification is located at:
[`.agents/skills/monoforge/SKILL.md`](.agents/skills/monoforge/SKILL.md)

---

## Architecture Invariants
- **Single Zustand Store**: `src/store/useReadmeStore.ts` holds all state. Never create duplicate stores.
- **Pure Generator Function**: `buildMarkdown(config) -> string` (`src/lib/buildMarkdown.ts`) generates markdown. No React, no side effects.
- **Plugin System**: Every plugin is a pure object in `src/lib/plugins/wrappers/` conforming to the Zod schema in `src/lib/plugins/types.ts` and registered in `src/lib/plugins/registry.ts`.
- **GitHub Camo Rules**: All SVGs must contain 0 `<script>`, 0 `<foreignObject>`, system font fallbacks only, and GPU-accelerated CSS animations (`opacity`, `transform`).
- **Confirmation Gates**: Nothing from resume extraction or web enrichment writes to state without explicit user confirmation.
- **No Silent Push**: GitHub repo writes must show diff preview and require explicit user approval.

## Commands
```bash
pnpm install
pnpm dev        # Run web studio at http://localhost:3000
pnpm test       # Run vitest unit tests
pnpm type-check # Run tsc --noEmit
pnpm lint       # Biome lint
```
