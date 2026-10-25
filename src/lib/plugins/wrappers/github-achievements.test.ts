import { describe, it, expect } from 'vitest';
import { githubAchievementsPlugin } from './github-achievements';
import { UserSettings } from '../types';

describe('githubAchievementsPlugin', () => {
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

  const getMarkdown = (output: ReturnType<typeof githubAchievementsPlugin.renderMarkdown>) => {
    return typeof output === 'object' && output ? output.markdown : String(output);
  };

  it('renders default achievement badges', () => {
    const result = githubAchievementsPlugin.renderMarkdown(
      githubAchievementsPlugin.defaultConfig,
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('<div align="center">');
    expect(md).toContain('https://github.com/octocat?tab=achievements');
    expect(md).toContain('alt="Pull Shark"');
    expect(md).toContain('alt="Quickdraw"');
    expect(md).toContain('alt="Starstruck"');
    expect(md).toContain('alt="Galaxy Brain"');
  });

  it('respects custom badge size', () => {
    const result = githubAchievementsPlugin.renderMarkdown(
      { ...githubAchievementsPlugin.defaultConfig, badgeSize: 96 },
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('width="96"');
    expect(md).toContain('height="96"');
  });

  it('handles optional YOLO badge toggle', () => {
    const result = githubAchievementsPlugin.renderMarkdown(
      { ...githubAchievementsPlugin.defaultConfig, yolo: true },
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('alt="YOLO"');
  });
});
