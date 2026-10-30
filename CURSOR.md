# MonoForge — Cursor AI Rules & MCP Integration

MonoForge generates GitHub profile READMEs and provides autonomous agent tools.

## Cursor MCP Integration
The MCP server configuration is in `.cursor/mcp.json`.
Cursor can call `generate_profile_readme` and `list_archetypes` directly.

## CLI Usage
```bash
node bin/monoforge.js generate --username <username> --archetype wow-3d-city-cat --output README.md
node bin/monoforge.js list
```

## Agent Skill Manifest
Read `.agents/skills/monoforge/SKILL.md` for complete archetype parameters and Camo compliance guidelines.
