import { describe, it, expect } from 'vitest';
import { githubProfileTrophyPlugin } from './github-profile-trophy';
import { UserSettings } from '../types';

describe('githubProfileTrophyPlugin', () => {
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

  const getMarkdown = (output: ReturnType<typeof githubProfileTrophyPlugin.renderMarkdown>) => {
    return typeof output === 'object' && output ? output.markdown : String(output);
  };

  it('renders with default high-availability mirror to bypass 402 downtime', () => {
    const result = githubProfileTrophyPlugin.renderMarkdown(
      githubProfileTrophyPlugin.defaultConfig,
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('<div align="center">');
    expect(md).toContain('https://github-profile-repo.vercel.app/?username=octocat');
    expect(md).toContain('theme=flat');
    expect(md).toContain('row=1');
    expect(md).toContain('column=6');
    expect(md).toContain('&no-bg=true');
    expect(md).toContain('alt="octocat trophies"');
  });

  it('allows switching to alternate high-availability mirror', () => {
    const result = githubProfileTrophyPlugin.renderMarkdown(
      {
        ...githubProfileTrophyPlugin.defaultConfig,
        mirror: 'https://github-profile-trophy-unserori.vercel.app',
      },
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('https://github-profile-trophy-unserori.vercel.app/?username=octocat');
  });

  it('supports custom self-hosted Vercel endpoint per ryo-ma spec', () => {
    const result = githubProfileTrophyPlugin.renderMarkdown(
      {
        ...githubProfileTrophyPlugin.defaultConfig,
        customUrl: 'https://my-custom-trophy.vercel.app/',
      },
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('https://my-custom-trophy.vercel.app/?username=octocat');
  });

  it('respects row, column, theme, and frame options', () => {
    const result = githubProfileTrophyPlugin.renderMarkdown(
      {
        ...githubProfileTrophyPlugin.defaultConfig,
        theme: 'dracula',
        row: 2,
        column: 4,
        noBg: false,
        noFrame: true,
      },
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('theme=dracula');
    expect(md).toContain('row=2');
    expect(md).toContain('column=4');
    expect(md).not.toContain('&no-bg=true');
    expect(md).toContain('&no-frame=true');
  });

  it('safely falls back to octocat instead of broken literal username or zusername', () => {
    const emptySettings: UserSettings = {
      ...mockSettings,
      user: { github: '' },
    };
    const result1 = githubProfileTrophyPlugin.renderMarkdown(
      githubProfileTrophyPlugin.defaultConfig,
      emptySettings
    );
    const md1 = getMarkdown(result1);
    expect(md1).toContain('?username=octocat');
    expect(md1).not.toContain('?username=username');
    expect(md1).not.toContain('alt="username trophies"');

    const placeholderSettings: UserSettings = {
      ...mockSettings,
      user: { github: 'Zusername' },
    };
    const result2 = githubProfileTrophyPlugin.renderMarkdown(
      githubProfileTrophyPlugin.defaultConfig,
      placeholderSettings
    );
    const md2 = getMarkdown(result2);
    expect(md2).toContain('?username=octocat');
    expect(md2).not.toContain('?username=Zusername');
  });

  it('supports explicit username override via props', () => {
    const result = githubProfileTrophyPlugin.renderMarkdown(
      {
        ...githubProfileTrophyPlugin.defaultConfig,
        username: 'torvalds',
      },
      mockSettings
    );
    const md = getMarkdown(result);
    expect(md).toContain('?username=torvalds');
    expect(md).toContain('alt="torvalds trophies"');
  });
});
