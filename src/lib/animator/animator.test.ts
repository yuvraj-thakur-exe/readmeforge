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
  CharacterType,
  CharacterAction,
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

  it('generates valid SVG for fire effect and fire-border frame', () => {
    const fireConfig: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      backgroundEffect: 'fire',
      frameEffect: 'fire-border',
    };

    const svg = generateAnimatedSvg(fireConfig);
    expect(svg).toContain('id="fireBaseGrad"');
    expect(svg).toContain('class="fire-frame"');
    const val = validateSvg(svg);
    expect(val.isValid).toBe(true);
    expect(val.isGitHubSafe).toBe(true);
  });

  it('generates valid SVG for water effect and glassmorphism frame', () => {
    const waterConfig: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      backgroundEffect: 'water',
      frameEffect: 'glassmorphism',
    };

    const svg = generateAnimatedSvg(waterConfig);
    expect(svg).toContain('id="oceanGrad"');
    expect(svg).toContain('class="glass-sheen"');
    const val = validateSvg(svg);
    expect(val.isValid).toBe(true);
    expect(val.isGitHubSafe).toBe(true);
  });

  it('renders all frame effect styles safely (cyber-neon, terminal-crt, hologram, gold-metallic)', () => {
    const frames = ['cyber-neon', 'terminal-crt', 'hologram', 'gold-metallic'] as const;
    for (const frame of frames) {
      const cfg: AnimationConfig = {
        ...DEFAULT_ANIMATION_CONFIG,
        frameEffect: frame,
      };
      const svg = generateAnimatedSvg(cfg);
      const val = validateSvg(svg);
      expect(val.isValid).toBe(true);
      expect(val.isGitHubSafe).toBe(true);
    }
  });

  it('renders characters walking across the banner baseline safely', () => {
    const characters: CharacterType[] = [
      'pixel-dev',
      'cyber-bot',
      'builder-crafter',
      'ninja-coder',
      'wizard-mage',
      'blue-bot',
      'blue-bean',
      'ninja-turtle',
      'red-dragon',
      'purple-monster',
      'chibi-deadpool',
      'pink-wyvern',
      'insectoid-warrior',
      'dragonborn-paladin',
    ];
    for (const charType of characters) {
      const cfg: AnimationConfig = {
        ...DEFAULT_ANIMATION_CONFIG,
        characterType: charType,
        characterAction: 'walk',
      };
      const svg = generateAnimatedSvg(cfg);
      expect(svg).toContain('class="char-walk-carrier"');
      expect(svg).toContain('class="char-ground-line"');
      const val = validateSvg(svg);
      expect(val.isValid).toBe(true);
      expect(val.isGitHubSafe).toBe(true);
    }
  });

  it('renders building action with stacked blocks, swinging hammer, and sparks', () => {
    const cfg: AnimationConfig = {
      ...DEFAULT_ANIMATION_CONFIG,
      characterType: 'builder-crafter',
      characterAction: 'build',
    };
    const svg = generateAnimatedSvg(cfg);
    expect(svg).toContain('class="construction-site"');
    expect(svg).toContain('class="char-hammer-arm"');
    expect(svg).toContain('class="build-spark"');
    expect(svg).toContain('class="build-top-block"');
    expect(svg).toContain('BUILD: OK');

    const val = validateSvg(svg);
    expect(val.isValid).toBe(true);
    expect(val.isGitHubSafe).toBe(true);
  });

  it('renders coding, construct welding, and cheering victory actions safely', () => {
    const actions: CharacterAction[] = ['code', 'construct', 'cheer'];
    for (const action of actions) {
      const cfg: AnimationConfig = {
        ...DEFAULT_ANIMATION_CONFIG,
        characterType: 'pixel-dev',
        characterAction: action,
      };
      const svg = generateAnimatedSvg(cfg);
      const val = validateSvg(svg);
      expect(val.isValid).toBe(true);
      expect(val.isGitHubSafe).toBe(true);

      if (action === 'code') {
        expect(svg).toContain('class="coding-terminal"');
      } else if (action === 'construct') {
        expect(svg).toContain('class="construction-truss"');
        expect(svg).toContain('class="weld-flash"');
      } else if (action === 'cheer') {
        expect(svg).toContain('class="char-cheer-carrier"');
        expect(svg).toContain('class="confetti-1"');
      }
    }
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
