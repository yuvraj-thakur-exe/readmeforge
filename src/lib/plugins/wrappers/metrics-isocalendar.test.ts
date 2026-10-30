import { describe, it, expect } from 'vitest';
import { metricsIsocalendarPlugin } from './metrics-isocalendar';
import { PluginFieldSchema } from '../types';

describe('Metrics Isocalendar Plugin Wrapper', () => {
  it('validates fields against PluginFieldSchema', () => {
    for (const field of metricsIsocalendarPlugin.fields) {
      expect(() => PluginFieldSchema.parse(field)).not.toThrow();
    }
  });

  it('renders 3D isometric calendar markdown', () => {
    const output = metricsIsocalendarPlugin.renderMarkdown(
      { username: 'octocat', duration: 'full-year' },
      {
        user: { github: 'octocat' },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'center',
      }
    );

    const res = typeof output === 'string' ? { markdown: output } : output;
    expect(res.markdown).toContain('isocalendar=1');
    expect(res.markdown).toContain('isocalendar.duration=full-year');
    expect(res.markdown).toContain('Isometric 3D Calendar');
  });
});

