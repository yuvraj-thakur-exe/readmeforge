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
});
