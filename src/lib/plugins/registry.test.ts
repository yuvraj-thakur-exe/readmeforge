import { describe, it, expect } from 'vitest';
import { pluginRegistry, getPluginById, getPluginsByCategory } from './registry';
import { PluginFieldSchema } from './types';

describe('Plugin Registry', () => {
  it('contains all required OSS wrapped plugins from §3', () => {
    const ids = pluginRegistry.map(p => p.id);
    expect(ids).toContain('github-readme-stats');
    expect(ids).toContain('github-profile-trophy');
    expect(ids).toContain('readme-typing-svg');
    expect(ids).toContain('snk');
    expect(ids).toContain('waka-readme-stats');
    expect(ids).toContain('markdown-badges');
    expect(ids).toContain('visitor-counter');
    expect(ids).toContain('portfolio-contributions');
    expect(ids).toContain('activity-graph');
    expect(ids).toContain('pie-chart');
  });

  it('validates that every plugin has valid fields and renderMarkdown output', () => {
    for (const plugin of pluginRegistry) {
      expect(plugin.id).toBeTruthy();
      expect(plugin.name).toBeTruthy();
      expect(plugin.category).toBeTruthy();
      expect(plugin.defaultConfig).toBeDefined();

      // Test each field against Zod schema
      for (const field of plugin.fields) {
        expect(() => PluginFieldSchema.parse(field)).not.toThrow();
      }

      // Test execution of renderMarkdown with default config
      const output = plugin.renderMarkdown(plugin.defaultConfig, {
        user: { github: 'octocat' },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      });

      if (typeof output === 'string') {
        expect(output.length).toBeGreaterThan(0);
      } else {
        expect(output.markdown.length).toBeGreaterThan(0);
      }
    }
  });

  it('snk plugin produces both markdown and workflow yaml file', () => {
    const snk = getPluginById('snk');
    expect(snk).toBeDefined();

    const output = snk!.renderMarkdown(snk!.defaultConfig, {
      user: { github: 'monalisa' },
      theme: 'dark',
      accentColor: '#8b5cf6',
      badgeStyle: 'for-the-badge',
      align: 'left',
    });

    expect(typeof output).toBe('object');
    if (typeof output === 'object') {
      expect(output.workflows).toBeDefined();
      expect(output.workflows?.['.github/workflows/snake.yml']).toContain('generate snake animation');
    }
  });

  it('filters plugins by category correctly', () => {
    const statsPlugins = getPluginsByCategory('stats');
    expect(statsPlugins.length).toBeGreaterThan(0);
    expect(statsPlugins.some(p => p.id === 'github-readme-stats')).toBe(true);
  });

  it('validates that the documentation example from PLUGIN_GUIDE.md conforms to Plugin contract', () => {
    const docExamplePlugin: import('./types').Plugin = {
      id: 'your-new-plugin',
      name: 'Your Widget Name',
      version: '1.0.0',
      description: 'Displays awesome developer stats and achievements on GitHub profiles.',
      author: 'Your Name or GitHub Handle',
      category: 'stats',
      icon: 'award',
      tags: ['github', 'stats', 'achievements'],
      defaultConfig: {
        username: '',
        theme: 'dark',
        showRank: true,
      },
      fields: [
        {
          id: 'username',
          name: 'username',
          label: 'GitHub Username',
          type: 'text',
          placeholder: 'octocat',
          description: 'Your public GitHub username',
        },
        {
          id: 'theme',
          name: 'theme',
          label: 'Theme',
          type: 'select',
          defaultValue: 'dark',
          options: [
            { label: 'Dark Mode', value: 'dark' },
            { label: 'Light Mode', value: 'light' },
          ],
        },
        {
          id: 'showRank',
          name: 'showRank',
          label: 'Display Global Rank',
          type: 'boolean',
          defaultValue: true,
        },
      ],
      renderMarkdown: (config, userSettings) => {
        const user = config.username || userSettings.user.github || 'octocat';
        const theme = config.theme || userSettings.theme || 'dark';
        return `[![Your Widget](https://your-service.com/api?user=${user}&theme=${theme})](https://github.com/${user})`;
      },
    };

    expect(docExamplePlugin.id).toBe('your-new-plugin');
    expect(docExamplePlugin.version).toBe('1.0.0');
    expect(docExamplePlugin.tags).toHaveLength(3);

    const result = docExamplePlugin.renderMarkdown(docExamplePlugin.defaultConfig, {
      user: { github: 'octocat' },
      theme: 'dark',
      accentColor: '#8b5cf6',
      badgeStyle: 'for-the-badge',
      align: 'left',
    });

    expect(typeof result).toBe('string');
    expect(result).toContain('https://your-service.com/api?user=octocat&theme=dark');
  });
});
