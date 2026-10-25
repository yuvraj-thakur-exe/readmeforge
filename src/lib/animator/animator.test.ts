import { describe, it, expect } from 'vitest';
import { generateAnimatedSvg, escapeXml } from './presets';
import { validateSvg } from './validator';
import {
  generateMarkdownSnippet,
  encodeConfigToBase64,
  decodeConfigFromBase64,
  generateHostedDemoUrl,
} from './export-utils';
import {
  AnimationConfig,
  DEFAULT_ANIMATION_CONFIG,
  TextEffect,
  BackgroundEffect,
  SvgEffect,
  ThreeDEffect,
} from './types';

describe('Animator Engine - Expanded Effects Pipeline', () => {
  const textEffects: TextEffect[] = ['typing', 'scramble', 'gradient', 'glitch', 'wave', 'reveal'];
  const backgrounds: BackgroundEffect[] = ['particles', 'grids', 'stars', 'animated-gradient', 'matrix', 'solid'];
  const svgEffects: SvgEffect[] = ['line-drawing', 'path-morphing', 'animated-logo', 'none'];
  const threeDEffects: ThreeDEffect[] = ['rotating-cube', 'interactive-card', 'particle-environment', 'none'];

  it.each(textEffects)('renders text effect correctly: %s', textEffect => {
    const config: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      textEffect,
      headline: 'CUSTOM TEXT EFFECT',
    };

    const svg = generateAnimatedSvg(config);
    expect(svg).toContain('<svg');
    expect(svg).toContain('CUSTOM TEXT EFFECT');

    const validation = validateSvg(svg);
    expect(validation.isValid).toBe(true);
    expect(validation.isGitHubSafe).toBe(true);
  });

  it.each(backgrounds)('renders background layer correctly: %s', backgroundEffect => {
    const config: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      backgroundEffect,
    };

    const svg = generateAnimatedSvg(config);
    expect(svg).toContain('<svg');

    const validation = validateSvg(svg);
    expect(validation.isValid).toBe(true);
    expect(validation.isGitHubSafe).toBe(true);
  });

  it.each(svgEffects)('renders SVG overlay effect correctly: %s', svgEffect => {
    const config: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      svgEffect,
    };

    const svg = generateAnimatedSvg(config);
    expect(svg).toContain('<svg');

    const validation = validateSvg(svg);
    expect(validation.isValid).toBe(true);
    expect(validation.isGitHubSafe).toBe(true);
  });

  it.each(threeDEffects)('renders 3D effect overlay correctly: %s', threeDEffect => {
    const config: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      threeDEffect,
    };

    const svg = generateAnimatedSvg(config);
    expect(svg).toContain('<svg');

    const validation = validateSvg(svg);
    expect(validation.isValid).toBe(true);
    expect(validation.isGitHubSafe).toBe(true);
  });

  it('injects accessibility styles when reducedMotion is active', () => {
    const config: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      reducedMotion: true,
    };

    const svg = generateAnimatedSvg(config);
    expect(svg).toContain('animation: none !important');
    expect(svg).toContain('@media (prefers-reduced-motion: reduce)');
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
    expect(leftSvg).toContain('x="50"');
    expect(centerSvg).toContain('text-anchor="middle"');
    expect(centerSvg).toContain('x="500"');
    expect(rightSvg).toContain('text-anchor="end"');
    expect(rightSvg).toContain('x="950"');
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
});

describe('Animator Engine - Export Snippets & Hosted Demos', () => {
  it('encodes and decodes configuration state roundtrip via base64', () => {
    const original: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      headline: 'TEST DECODE',
      textEffect: 'scramble',
      backgroundEffect: 'stars',
    };

    const encoded = encodeConfigToBase64(original);
    const decoded = decodeConfigFromBase64(encoded);

    expect(decoded).not.toBeNull();
    expect(decoded?.headline).toBe('TEST DECODE');
    expect(decoded?.textEffect).toBe('scramble');
    expect(decoded?.backgroundEffect).toBe('stars');
  });

  it('generates hosted demo URL and all markdown snippet variants', () => {
    const config: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      headline: 'HOSTED DEMO BANNER',
    };

    const demoUrl = generateHostedDemoUrl(config, 'https://readmeforge.dev');
    expect(demoUrl).toContain('https://readmeforge.dev/animator?c=');

    const snippets = generateMarkdownSnippet(config, 'my-banner.svg', 'https://readmeforge.dev');

    expect(snippets.relative).toContain('<img src="my-banner.svg"');
    expect(snippets.relative).toContain('alt="HOSTED DEMO BANNER"');
    expect(snippets.githubRaw).toContain('https://raw.githubusercontent.com/<username>/<repo>/main/my-banner.svg');
    expect(snippets.dataUri).toContain('data:image/svg+xml;utf8,%3Csvg');
    expect(snippets.hostedDemo).toContain('https://readmeforge.dev/animator?c=');
  });
});
