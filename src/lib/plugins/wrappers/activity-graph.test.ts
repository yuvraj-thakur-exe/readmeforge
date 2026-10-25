import { describe, it, expect } from 'vitest';
import { activityGraphPlugin } from './activity-graph';
import { UserSettings } from '../types';

describe('activityGraphPlugin', () => {
  const mockSettings: UserSettings = {
    user: {
      github: 'octocat',
      name: 'The Octocat',
    },
    theme: 'dark',
    accentColor: '#6366f1',
    badgeStyle: 'flat',
    align: 'center',
  };

  const getMarkdown = (output: ReturnType<typeof activityGraphPlugin.renderMarkdown>) => {
    return typeof output === 'object' && output ? output.markdown : String(output);
  };

  it('renders default activity graph with custom title and url', () => {
    const result = activityGraphPlugin.renderMarkdown(
      activityGraphPlugin.defaultConfig,
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('<div align="center">');
    expect(md).toContain('https://ghchart.rshah.org/6366F1/octocat');
    expect(md).toContain('Annual Contribution Activity');
  });

  it('respects custom color and title', () => {
    const result = activityGraphPlugin.renderMarkdown(
      { color: '#22D3EE', title: 'Commit Velocity Heatmap' },
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('https://ghchart.rshah.org/22D3EE/octocat');
    expect(md).toContain('Commit Velocity Heatmap');
  });
});
