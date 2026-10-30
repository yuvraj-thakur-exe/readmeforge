import { describe, it, expect } from 'vitest';
import { metricsEnginePlugin } from './metrics-engine';
import { PluginFieldSchema } from '../types';

describe('Metrics Engine Plugin Wrapper', () => {
  it('validates all field schemas according to PluginFieldSchema', () => {
    for (const field of metricsEnginePlugin.fields) {
      expect(() => PluginFieldSchema.parse(field)).not.toThrow();
    }
  });

  it('renders direct svg embed markdown by default', () => {
    const output = metricsEnginePlugin.renderMarkdown(metricsEnginePlugin.defaultConfig, {
      user: { github: 'monalisa' },
      theme: 'dark',
      accentColor: '#8b5cf6',
      badgeStyle: 'for-the-badge',
      align: 'center',
    });

    const res = typeof output === 'string' ? { markdown: output } : output;
    expect(res.markdown).toContain('https://metrics.lecoq.io/monalisa');
    expect(res.markdown).toContain('isocalendar=1');
  });

  it('renders github action workflow when action mode is selected', () => {
    const output = metricsEnginePlugin.renderMarkdown(
      {
        ...metricsEnginePlugin.defaultConfig,
        outputMode: 'action',
        languagesLimit: 12,
        leetcode: true,
        leetcodeUser: 'monalisa_code',
      },
      {
        user: { github: 'monalisa' },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'center',
      }
    );

    expect(typeof output).toBe('object');
    if (typeof output === 'object') {
      expect(output.workflows).toBeDefined();
      const workflow = output.workflows?.['.github/workflows/readmeforge-metrics.yml'];
      expect(workflow).toContain('name: ReadmeForge Metrics');
      expect(workflow).toContain('plugin_languages_limit: 12');
      expect(workflow).toContain('plugin_leetcode_user: monalisa_code');
    }
  });
});

