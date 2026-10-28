import { describe, expect, it } from 'vitest';
import { socialsPlugin } from './socials';
import { UserSettings } from '../types';

const mockSettings: UserSettings = {
  theme: 'dark',
  accentColor: '#8b5cf6',
  align: 'center',
  badgeStyle: 'for-the-badge',
  user: {
    github: 'dev',
    name: 'Developer',
    role: 'Engineer',
    bio: 'Bio',
  },
};

describe('Socials Plugin', () => {
  it('has correct plugin metadata', () => {
    expect(socialsPlugin.id).toBe('socials');
    expect(socialsPlugin.category).toBe('socials');
    expect(socialsPlugin.name).toContain('Social Media');
  });

  it('renders default badges including LinkedIn, X, Discord, YouTube, Gmail, HackerRank', () => {
    const md = socialsPlugin.renderMarkdown(socialsPlugin.defaultConfig, mockSettings) as string;
    expect(md).toContain('linkedin');
    expect(md).toContain('0077B5');
    expect(md).toContain('hackerrank');
    expect(md).toContain('2EC866');
    expect(md).toContain('youtube');
    expect(md).toContain('FF0000');
    expect(md).toContain('gmail');
    expect(md).toContain('D14836');
    expect(md).toContain('discord');
  });

  it('renders custom social links and respects alignments', () => {
    const props = {
      content: {
        socials: {
          linkedin: { link: 'https://linkedin.com/in/octocat' },
          leetcode: { link: 'https://leetcode.com/octocat', message: 'LeetCode', color: 'FFA116' },
        },
        styles: {
          style: 'flat-square',
          type: 'badge',
          height: 35,
        },
      },
      styles: {
        align: 'left',
        spacing: 12,
      },
    };

    const md = socialsPlugin.renderMarkdown(props, mockSettings) as string;
    expect(md).toContain('align="left"');
    expect(md).toContain('https://linkedin.com/in/octocat');
    expect(md).toContain('style=flat-square');
    expect(md).toContain('leetcode');
    expect(md).toContain('FFA116');
  });

  it('returns empty string if no socials are present', () => {
    const md = socialsPlugin.renderMarkdown({ content: { socials: {} } }, mockSettings);
    expect(md).toBe('');
  });
});
