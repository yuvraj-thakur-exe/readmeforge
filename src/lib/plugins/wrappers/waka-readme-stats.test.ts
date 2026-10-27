import { describe, it, expect } from 'vitest';
import { wakaReadmeStatsPlugin } from './waka-readme-stats';
import { UserSettings } from '../types';

describe('wakaReadmeStatsPlugin', () => {
  const mockSettings: UserSettings = {
    user: {
      github: 'octocat',
      name: 'The Octocat',
    },
    theme: 'dark',
    accentColor: '#6366f1',
    badgeStyle: 'flat',
    align: 'left',
  };

  it('safely returns empty string when wakaUsername is empty to prevent GraphQL 404 error cards', () => {
    const result = wakaReadmeStatsPlugin.renderMarkdown(
      wakaReadmeStatsPlugin.defaultConfig,
      mockSettings
    );
    expect(result).toBe('');
  });

  it('safely returns empty string when wakaUsername is octocat or placeholder to avoid broken public profile error', () => {
    const result1 = wakaReadmeStatsPlugin.renderMarkdown(
      { wakaUsername: 'octocat' },
      mockSettings
    );
    expect(result1).toBe('');

    const result2 = wakaReadmeStatsPlugin.renderMarkdown(
      { wakaUsername: 'username' },
      mockSettings
    );
    expect(result2).toBe('');
  });

  it('renders valid WakaTime card when explicit valid username is provided', () => {
    const result = wakaReadmeStatsPlugin.renderMarkdown(
      { wakaUsername: 'anmol098', theme: 'tokyonight' },
      mockSettings
    );
    expect(typeof result).toBe('object');
    if (typeof result === 'object') {
      expect(result.markdown).toContain('https://github-readme-stats.vercel.app/api/wakatime?username=anmol098');
      expect(result.markdown).toContain('theme=tokyonight');
    }
  });
});
