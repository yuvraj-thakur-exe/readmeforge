import { describe, it, expect } from 'vitest';
import { capsuleBannerPlugin } from './capsule-banner';
import { UserSettings } from '../types';

describe('capsuleBannerPlugin', () => {
  const mockSettings: UserSettings = {
    user: { github: 'octocat' },
    theme: 'dark',
    accentColor: '#9333ea',
    badgeStyle: 'for-the-badge',
    align: 'center',
  };

  const getMarkdown = (output: ReturnType<typeof capsuleBannerPlugin.renderMarkdown>) => {
    return typeof output === 'object' && output ? output.markdown : String(output);
  };

  it('renders waving purple neon header banner by default', () => {
    const md = getMarkdown(capsuleBannerPlugin.renderMarkdown(capsuleBannerPlugin.defaultConfig, mockSettings));
    expect(md).toContain('https://capsule-render.vercel.app/api?type=waving');
    expect(md).toContain('HELLO%20WORLD');
    expect(md).toContain('WELCOME%20TO%20MY%20PROFILE');
    expect(md).toContain('width="100%"');
  });

  it('respects custom shapes like rect and cylinder and dark constellation colors', () => {
    const md = getMarkdown(
      capsuleBannerPlugin.renderMarkdown(
        {
          bannerType: 'rect',
          colorTheme: 'dark-constellation',
          text: 'Hey! I am a DevOps Engineer',
          desc: 'Automating everything',
          height: 180,
        },
        mockSettings
      )
    );
    expect(md).toContain('type=rect');
    expect(md).toContain('color=0:090d16,100:111827');
    expect(md).toContain('Hey!%20I%20am%20a%20DevOps%20Engineer');
    expect(md).toContain('Automating%20everything');
    expect(md).toContain('height=180');
  });
});
