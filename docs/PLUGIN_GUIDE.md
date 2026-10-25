# Plugin Authoring Guide — ReadmeForge

Welcome! ReadmeForge features a modular, zero-friction plugin ecosystem. Adding a new widget or community badge integration never requires touching the core builder or `/developer` IDE.

---

## Architecture Overview

All plugins reside in `src/lib/plugins/` and are registered in `src/lib/plugins/registry.ts`.
Every plugin is a plain TypeScript object validated against the `Plugin` Zod schema (`src/lib/plugins/types.ts`).

```
src/lib/plugins/
  ├── types.ts              → Plugin, PluginField, SectionConfig Zod schemas
  ├── registry.ts           → Array of registered plugins
  └── wrappers/             → Individual plugin wrappers
      ├── github-readme-stats.ts
      ├── github-profile-trophy.ts
      ├── readme-typing-svg.ts
      ├── snk.ts
      └── your-new-plugin.ts
```

---

## 1. Creating a New Plugin File

Create `src/lib/plugins/wrappers/your-new-plugin.ts`:

```typescript
import { Plugin } from '../types';

export const yourNewPlugin: Plugin = {
  id: 'your-new-plugin',
  name: 'Your Widget Name',
  version: '1.0.0',
  description: 'Displays awesome developer stats and achievements on GitHub profiles.',
  author: 'Your Name or GitHub Handle',
  category: 'stats', // 'stats' | 'badges' | 'visuals' | 'social' | 'games' | 'general'
  tags: ['github', 'stats', 'achievements'],

  // Default initial configuration values
  defaultConfig: {
    username: '',
    theme: 'dark',
    showRank: true,
  },

  // Interactive UI form fields used by both wizard and /developer plugin panel
  fields: [
    {
      id: 'username',
      label: 'GitHub Username',
      type: 'text',
      placeholder: 'octocat',
      description: 'Your public GitHub username',
    },
    {
      id: 'theme',
      label: 'Theme',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark Mode', value: 'dark' },
        { label: 'Light Mode', value: 'light' },
        { label: 'Radical', value: 'radical' },
        { label: 'Tokyo Night', value: 'tokyonight' },
      ],
    },
    {
      id: 'showRank',
      label: 'Display Global Rank',
      type: 'boolean',
      defaultValue: true,
    },
  ],

  // Pure function returning rendered markdown string or object with companion files
  renderMarkdown: (config, userSettings) => {
    const user = config.username || userSettings.user.github || 'octocat';
    const theme = config.theme || userSettings.theme || 'dark';

    return `[![Your Widget](https://your-service.com/api?user=${user}&theme=${theme})](https://github.com/${user})`;
  },
};
```

---

## 2. Registering Your Plugin

Open `src/lib/plugins/registry.ts` and add your plugin to `pluginRegistry`:

```typescript
import { yourNewPlugin } from './wrappers/your-new-plugin';

export const pluginRegistry: Plugin[] = [
  // ... existing plugins
  yourNewPlugin,
];
```

That's it! Because `/developer` and the visual wizard are registry-driven, your plugin will automatically:
1. Appear in the `/developer` plugin drawer with search and 1-click insertion.
2. Provide form controls in the visual wizard.
3. Be included in markdown generation via `buildMarkdown(config)`.

---

## 3. Adding a Unit Test

Colocate or add tests in `src/lib/plugins/registry.test.ts`:

```typescript
it('validates your-new-plugin renders correct markdown', () => {
  const plugin = getPluginById('your-new-plugin');
  expect(plugin).toBeDefined();

  const output = plugin!.renderMarkdown({ username: 'testuser', theme: 'dark' }, mockUserSettings);
  expect(output).toContain('testuser');
});
```

Run test suite:
```bash
pnpm test
```
