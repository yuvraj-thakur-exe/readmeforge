import { describe, it, expect } from 'vitest';
import {
  generateIsocalendarSvg,
  generateLanguagesDonutSvg,
  generateHabitsRadarSvg,
  generateAchievementsRackSvg,
  generateTerminalHudSvg,
  generatePageSpeedAuditSvg,
  generateMusicPlayerSvg,
  generateLeetCodeStatsSvg,
} from './svg-generators';

describe('ReadmeForge Telemetry SVG Generator Suite', () => {
  it('generates valid 3D Isometric Calendar SVG without metrics naming', () => {
    const svg = generateIsocalendarSvg({ username: 'test-user', streak: 45 });
    expect(svg).toContain('<svg');
    expect(svg).toContain('Isometric Contribution Landscape');
    expect(svg).toContain('@test-user');
    expect(svg).toContain('45');
    expect(svg).not.toContain('<foreignObject>');
    expect(svg).not.toContain('<script>');
  });

  it('generates valid Languages Donut SVG', () => {
    const svg = generateLanguagesDonutSvg({ username: 'polyglot', uniqueCount: 15 });
    expect(svg).toContain('<svg');
    expect(svg).toContain('Polyglot Language Telemetry');
    expect(svg).toContain('@polyglot');
    expect(svg).toContain('TypeScript');
    expect(svg).not.toContain('<foreignObject>');
    expect(svg).not.toContain('<script>');
  });

  it('generates valid Habits Radar SVG', () => {
    const svg = generateHabitsRadarSvg({ username: 'nightowl', peakHour: 23 });
    expect(svg).toContain('<svg');
    expect(svg).toContain('Coding Habits &amp; 24-Hour Rhythm');
    expect(svg).toContain('23:00');
    expect(svg).not.toContain('<foreignObject>');
  });

  it('generates valid Achievements Showcase SVG', () => {
    const svg = generateAchievementsRackSvg({ username: 'champion' });
    expect(svg).toContain('<svg');
    expect(svg).toContain('Achievements Showcase &amp; Medals');
    expect(svg).toContain('RANK S TIER');
    expect(svg).not.toContain('<foreignObject>');
  });

  it('generates valid Terminal HUD SVG', () => {
    const svg = generateTerminalHudSvg({ username: 'sysadmin', repos: 99 });
    expect(svg).toContain('<svg');
    expect(svg).toContain('readmeforge@sysadmin');
    expect(svg).toContain('99');
    expect(svg).not.toContain('<foreignObject>');
  });

  it('generates valid PageSpeed Audit SVG', () => {
    const svg = generatePageSpeedAuditSvg({ url: 'readmeforge.dev' });
    expect(svg).toContain('<svg');
    expect(svg).toContain('PageSpeed &amp; Web Vitals Audit');
    expect(svg).toContain('Performance');
    expect(svg).not.toContain('<foreignObject>');
  });

  it('generates valid Music Player SVG', () => {
    const svg = generateMusicPlayerSvg({ track: 'Synthwave Dreams' });
    expect(svg).toContain('<svg');
    expect(svg).toContain('Synthwave Dreams');
    expect(svg).toContain('disc-spin');
    expect(svg).not.toContain('<foreignObject>');
  });

  it('generates valid LeetCode Stats SVG', () => {
    const svg = generateLeetCodeStatsSvg({ username: 'algo-master', solved: 850 });
    expect(svg).toContain('<svg');
    expect(svg).toContain('LeetCode Algorithmic Mastery');
    expect(svg).toContain('850');
    expect(svg).not.toContain('<foreignObject>');
  });
});
