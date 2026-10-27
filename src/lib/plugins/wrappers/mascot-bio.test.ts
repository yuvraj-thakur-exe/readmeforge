import { describe, it, expect } from 'vitest';
import { mascotBioPlugin } from './mascot-bio';
import { UserSettings } from '../types';

describe('mascotBioPlugin', () => {
  const mockSettings: UserSettings = {
    user: { github: 'octocat' },
    theme: 'dark',
    accentColor: '#9333ea',
    badgeStyle: 'for-the-badge',
    align: 'left',
  };

  const getMarkdown = (output: ReturnType<typeof mascotBioPlugin.renderMarkdown>) => {
    return typeof output === 'object' && output ? output.markdown : String(output);
  };

  it('renders two-column table with owl-confetti mascot and views badge by default', () => {
    const md = getMarkdown(mascotBioPlugin.renderMarkdown(mascotBioPlugin.defaultConfig, mockSettings));
    expect(md).toContain('<table>');
    expect(md).toContain('width="65%"');
    expect(md).toContain('width="35%"');
    expect(md).toContain('owl-confetti.svg');
    expect(md).toContain('komarev.com/ghpvc/?username=octocat');
    expect(md).toContain("⚡ I'm a Digital Craftsman!");
  });

  it('renders coding-unicorn mascot and custom bullet achievements', () => {
    const md = getMarkdown(
      mascotBioPlugin.renderMarkdown(
        {
          mascot: 'coding-unicorn',
          headline: '🌟 Talking about Personal Stuffs...',
          subtitle: 'Software Engineer',
          bullets: '✔ Learning React\n✔ Building open source',
          showViewsBadge: true,
          viewsBadgeColor: '3b82f6',
        },
        mockSettings
      )
    );
    expect(md).toContain('coding-unicorn.svg');
    expect(md).toContain('🌟 Talking about Personal Stuffs...');
    expect(md).toContain('<li>✔ Learning React</li>');
    expect(md).toContain('<li>✔ Building open source</li>');
    expect(md).toContain('color=3b82f6');
  });

  it('renders developer-desk and octocat-coffee mascots correctly', () => {
    const mdDev = getMarkdown(
      mascotBioPlugin.renderMarkdown({ mascot: 'developer-desk' }, mockSettings)
    );
    expect(mdDev).toContain('developer-desk.svg');

    const mdCat = getMarkdown(
      mascotBioPlugin.renderMarkdown({ mascot: 'octocat-coffee' }, mockSettings)
    );
    expect(mdCat).toContain('octocat-coffee.svg');
  });
});
