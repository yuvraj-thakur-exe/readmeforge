import { describe, it, expect } from 'vitest';
import { importReadmeFromMarkdown } from './import-readme';

describe('importReadmeFromMarkdown', () => {
  it('handles empty or whitespace-only markdown', () => {
    const { config, detectedFeatures } = importReadmeFromMarkdown('');
    expect(config.title).toBe('Imported Profile');
    expect(config.sections).toEqual([]);
    expect(detectedFeatures).toEqual([]);
  });

  it('extracts name, role, and github username', () => {
    const md = `
# Hi, I'm Alex Mercer 👋
### Full-Stack Cloud Engineer

[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=alexmercer&show_icons=true)](https://github.com/alexmercer)

- 🔭 I'm currently working on Next.js architectures
- 🌱 I'm currently learning Rust & WebAssembly
    `;

    const { config, detectedFeatures } = importReadmeFromMarkdown(md);
    expect(config.settings.user.name).toBe('Alex Mercer');
    expect(config.settings.user.role).toContain('Full-Stack Cloud Engineer');
    expect(config.settings.user.github).toBe('alexmercer');
    expect(config.settings.user.bio).toContain("I'm currently working on Next.js architectures");
    expect(detectedFeatures).toContain('Name');
    expect(detectedFeatures).toContain('Role');
    expect(detectedFeatures).toContain('GitHub Username');
    expect(detectedFeatures).toContain('GitHub Readme Stats');
  });

  it('detects snake, trophies, and stats sections', () => {
    const md = `
# Developer

https://github-profile-trophy.vercel.app/?username=devpro
https://github-readme-stats.vercel.app/api?username=devpro
https://github.com/devpro/snk/raw/output/github-contribution-grid-snake.svg
    `;

    const { config, detectedFeatures } = importReadmeFromMarkdown(md);
    expect(config.settings.user.github).toBe('devpro');
    expect(config.sections.map(s => s.type)).toContain('github-profile-trophy');
    expect(config.sections.map(s => s.type)).toContain('github-readme-stats');
    expect(config.sections.map(s => s.type)).toContain('snk');
    expect(detectedFeatures).toContain('Contribution Snake');
  });
});
