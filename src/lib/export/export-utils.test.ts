import { describe, it, expect } from 'vitest';
import { encodeConfigToUrl, decodeConfigFromUrl } from './export-utils';
import { ReadmeConfig } from '#/lib/plugins/types';

describe('export-utils: URL encoding & decoding', () => {
  const sampleConfig: ReadmeConfig = {
    version: '1.0.0',
    title: 'Test Profile ✨',
    settings: {
      user: {
        github: 'octocat',
        name: 'Mona Lisa',
        role: 'Full-Stack Lead 🚀',
        bio: 'Coding under the stars ✨',
        location: 'GitHub City',
        pronouns: 'she/her',
        status: 'Building tools',
      },
      theme: 'dark',
      accentColor: '#8b5cf6',
      badgeStyle: 'for-the-badge',
      align: 'left',
    },
    sections: [
      {
        id: 'sec-1',
        type: 'stats',
        props: { content: { username: 'octocat' }, styles: {}, state: 'default' },
      },
    ],
  };

  it('encodes and cleanly decodes a config with unicode / emojis', () => {
    const encoded = encodeConfigToUrl(sampleConfig);
    expect(encoded).toBeTruthy();
    expect(typeof encoded).toBe('string');

    const decoded = decodeConfigFromUrl(encoded);
    expect(decoded).not.toBeNull();
    expect(decoded?.title).toBe(sampleConfig.title);
    expect(decoded?.settings.user.name).toBe('Mona Lisa');
    expect(decoded?.settings.user.role).toBe('Full-Stack Lead 🚀');
    expect(decoded?.sections).toHaveLength(1);
  });

  it('safely handles corrupted or invalid base64 input', () => {
    expect(decodeConfigFromUrl('not-valid-base64-!@#$')).toBeNull();
    // Valid base64 but invalid JSON schema (sections must be array)
    const invalidJsonBase64 = btoa(JSON.stringify({ sections: 'invalid-not-array' }));
    expect(decodeConfigFromUrl(invalidJsonBase64)).toBeNull();
  });
});
