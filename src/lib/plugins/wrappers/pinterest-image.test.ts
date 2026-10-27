import { describe, it, expect } from 'vitest';
import { pinterestImagePlugin } from './pinterest-image';
import { UserSettings } from '../types';

describe('pinterestImagePlugin', () => {
  const mockSettings: UserSettings = {
    user: { github: 'octocat' },
    theme: 'dark',
    accentColor: '#8b5cf6',
    badgeStyle: 'for-the-badge',
    align: 'center',
  };

  const getMarkdown = (output: ReturnType<typeof pinterestImagePlugin.renderMarkdown>) => {
    return typeof output === 'object' && output ? output.markdown : String(output);
  };

  it('renders default lofi-coder preset with center alignment and caption', () => {
    const md = getMarkdown(pinterestImagePlugin.renderMarkdown(pinterestImagePlugin.defaultConfig, mockSettings));
    expect(md).toContain('<div align="center">');
    expect(md).toContain('https://i.pinimg.com/originals/0a/61/52/0a6152a25992955f134764b86378e994.gif');
    expect(md).toContain('width="100%"');
    expect(md).toContain('Turning coffee and midnight playlists');
  });

  it('upgrades custom pinimg.com thumbnails to uncompressed originals', () => {
    const md = getMarkdown(
      pinterestImagePlugin.renderMarkdown(
        {
          preset: 'custom',
          pinUrl: 'https://i.pinimg.com/564x/24/49/a0/2449a022416b0817024f227b23395b28.jpg',
          width: '80%',
          linkUrl: 'https://pinterest.com/myprofile',
        },
        mockSettings
      )
    );
    expect(md).toContain('https://i.pinimg.com/originals/24/49/a0/2449a022416b0817024f227b23395b28.jpg');
    expect(md).toContain('width="80%"');
    expect(md).toContain('href="https://pinterest.com/myprofile"');
  });

  it('supports selecting different presets like cyberpunk-neon and cat-typing', () => {
    const mdCyber = getMarkdown(
      pinterestImagePlugin.renderMarkdown({ preset: 'cyberpunk-neon' }, mockSettings)
    );
    expect(mdCyber).toContain('2449a022416b0817024f227b23395b28.gif');

    const mdCat = getMarkdown(
      pinterestImagePlugin.renderMarkdown({ preset: 'cat-typing' }, mockSettings)
    );
    expect(mdCat).toContain('e426702edf874b181aced1e2fa5c6cde.gif');
  });
});
