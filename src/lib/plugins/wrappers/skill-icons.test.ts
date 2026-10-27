import { describe, it, expect } from 'vitest';
import { skillIconsPlugin } from './skill-icons';
import { UserSettings } from '../types';

describe('skillIconsPlugin', () => {
  const mockSettings: UserSettings = {
    user: { github: 'octocat' },
    theme: 'dark',
    accentColor: '#10b981',
    badgeStyle: 'for-the-badge',
    align: 'center',
  };

  const getMarkdown = (output: ReturnType<typeof skillIconsPlugin.renderMarkdown>) => {
    return typeof output === 'object' && output ? output.markdown : String(output);
  };

  it('renders skillicons url with default icons and dark theme', () => {
    const md = getMarkdown(skillIconsPlugin.renderMarkdown(skillIconsPlugin.defaultConfig, mockSettings));
    expect(md).toContain('<div align="center">');
    expect(md).toContain('https://skillicons.dev/icons?i=');
    expect(md).toContain('theme=dark');
    expect(md).toContain('perline=15');
  });

  it('respects light mode and custom icon list', () => {
    const md = getMarkdown(
      skillIconsPlugin.renderMarkdown(
        { icons: 'c,cpp,python,react,linux', theme: 'light', perLine: 10 },
        { ...mockSettings, theme: 'light' }
      )
    );
    expect(md).toContain('i=c,cpp,python,react,linux');
    expect(md).toContain('theme=light');
    expect(md).toContain('perline=10');
  });
});
