# Contributing to MonoForge

Thank you for your interest in contributing to **MonoForge**! MonoForge is designed with an extensible, plugin-driven architecture that makes adding new badges, stats widgets, and profile sections seamless.

---

## Quickstart

```bash
git clone https://github.com/monoforge/monoforge.git
cd monoforge
corepack enable pnpm
pnpm install
pnpm dev
```

Run test suite:
```bash
pnpm test
```

---

## How to Author a Plugin

MonoForge uses a typed plugin registry. Contributors can add any widget or badge integration by creating a single file without modifying core wizard or editor logic:

1. **Create a plugin file** in `src/lib/plugins/wrappers/<your-plugin-id>.ts`:
```ts
import { Plugin, UserSettings } from '../types';

export const myCustomPlugin: Plugin = {
  id: 'my-custom-plugin',
  name: 'My Custom Widget',
  description: 'Displays custom metrics or badges.',
  author: 'your-handle',
  repository: 'https://github.com/your-handle/your-repo',
  category: 'widgets', // 'stats' | 'socials' | 'techs' | 'widgets' | 'fun' | 'badges' | 'header'
  icon: 'star',
  fields: [
    {
      name: 'theme',
      label: 'Widget Theme',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    },
  ],
  defaultConfig: {
    theme: 'dark',
  },
  renderMarkdown: (props, settings: UserSettings) => {
    const user = settings.user.github;
    const theme = props.theme || 'dark';
    return {
      markdown: `<div align="left">\n  <img src="https://my-api.com/${user}?theme=${theme}" alt="Custom Widget" />\n</div>`,
    };
  },
};
```

2. **Register the plugin** in `src/lib/plugins/registry.ts`:
```ts
import { myCustomPlugin } from './wrappers/my-custom-plugin';

export const pluginRegistry: Plugin[] = [
  // ... existing plugins
  myCustomPlugin,
];
```

3. **Verify tests:**
```bash
pnpm test
```
The plugin will automatically be validated by the Zod schema and appear in both the visual wizard and the `/developer` route plugin panel!
