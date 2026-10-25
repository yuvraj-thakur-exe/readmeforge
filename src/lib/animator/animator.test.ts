import { describe, it, expect } from 'vitest';
import { generateAnimatedSvg, escapeXml } from './presets';
import { validateSvg } from './validator';
import { generateMarkdownSnippet } from './export-utils';
import { AnimationConfig, DEFAULT_ANIMATION_CONFIG, AnimationPresetId } from './types';

describe('Animator Engine - Presets & Generation', () => {
  const allPresets: AnimationPresetId[] = [
    'glitch',
    'typing',
    'wave',
    'matrix',
    'neon',
    'particle',
    'terminal',
    '3d-banner',
    'minimal',
  ];

  it.each(allPresets)('generates valid, self-contained SVG for preset: %s', preset => {
    const config: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      preset,
      headline: 'TEST HEADLINE',
      subtitle: 'Testing Subtitle',
      tag: 'TAG',
    };

    const svg = generateAnimatedSvg(config);

    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('viewBox="0 0 900 280"');
    expect(svg).toContain('TEST HEADLINE');
    expect(svg).toContain('Testing Subtitle');
    expect(svg).toContain('TAG');
    expect(svg).toContain('@keyframes');

    // Run validator
    const validation = validateSvg(svg);
    expect(validation.isValid).toBe(true);
    expect(validation.isGitHubSafe).toBe(true);
    expect(validation.sizeBytes).toBeGreaterThan(100);
    expect(validation.sizeBytes).toBeLessThan(50 * 1024); // Well under 50KB
  });

  it('escapes XML characters properly to prevent malformed SVG', () => {
    const unsafe = '<Script> & "Quote" \'Apostrophe\' >';
    const escaped = escapeXml(unsafe);

    expect(escaped).toBe('&lt;Script&gt; &amp; &quot;Quote&quot; &apos;Apostrophe&apos; &gt;');
    expect(escaped).not.toContain('<Script>');
  });

  it('adjusts text coordinates based on alignment setting', () => {
    const leftConfig: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      alignment: 'left',
      width: 1000,
    };
    const centerConfig: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      alignment: 'center',
      width: 1000,
    };
    const rightConfig: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      alignment: 'right',
      width: 1000,
    };

    const leftSvg = generateAnimatedSvg(leftConfig);
    const centerSvg = generateAnimatedSvg(centerConfig);
    const rightSvg = generateAnimatedSvg(rightConfig);

    expect(leftSvg).toContain('text-anchor="start"');
    expect(leftSvg).toContain('x="45"');
    expect(centerSvg).toContain('text-anchor="middle"');
    expect(centerSvg).toContain('x="500"');
    expect(rightSvg).toContain('text-anchor="end"');
    expect(rightSvg).toContain('x="955"');
  });

  it('supports transparent background toggle', () => {
    const solidConfig: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      transparentBackground: false,
    };
    const transConfig: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      transparentBackground: true,
    };

    const solidSvg = generateAnimatedSvg(solidConfig);
    const transSvg = generateAnimatedSvg(transConfig);

    expect(solidSvg).toContain(`fill="${solidConfig.backgroundColor}"`);
    expect(transSvg).not.toContain(`fill="${transConfig.backgroundColor}"`);
  });
});

describe('Animator Engine - Validator & Reliability Controls', () => {
  it('detects and flags unsafe executable tags (<script>, <foreignObject>)', () => {
    const badSvg1 = '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>';
    const badSvg2 = '<svg xmlns="http://www.w3.org/2000/svg"><foreignObject><div>test</div></foreignObject></svg>';

    const res1 = validateSvg(badSvg1);
    const res2 = validateSvg(badSvg2);

    expect(res1.isGitHubSafe).toBe(false);
    expect(res2.isGitHubSafe).toBe(false);
  });

  it('detects inline event handlers (onload, onclick)', () => {
    const badSvg = '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"></svg>';
    const res = validateSvg(badSvg);

    expect(res.isGitHubSafe).toBe(false);
  });

  it('flags external stylesheet imports', () => {
    const badSvg = '<svg xmlns="http://www.w3.org/2000/svg"><style>@import url("http://evil.com/style.css");</style></svg>';
    const res = validateSvg(badSvg);

    expect(res.isGitHubSafe).toBe(false);
  });
});

describe('Animator Engine - Export Snippets', () => {
  it('generates relative, githubRaw, and dataUri markdown snippets', () => {
    const config: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      headline: 'BANNER TITLE',
    };

    const snippets = generateMarkdownSnippet(config, 'my-banner.svg');

    expect(snippets.relative).toContain('<img src="my-banner.svg"');
    expect(snippets.relative).toContain('alt="BANNER TITLE"');
    expect(snippets.githubRaw).toContain('https://raw.githubusercontent.com/<username>/<repo>/main/my-banner.svg');
    expect(snippets.dataUri).toContain('data:image/svg+xml;utf8,%3Csvg');
  });
});
