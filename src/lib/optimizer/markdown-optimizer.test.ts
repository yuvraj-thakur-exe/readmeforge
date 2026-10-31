import { describe, it, expect } from 'vitest';
import { optimizeMarkdown } from './markdown-optimizer';

describe('optimizeMarkdown', () => {
  it('strips redundant empty lines and trailing spaces', () => {
    const raw = '# Title   \n\n\n\nParagraph text here.   \n\n\n';
    const result = optimizeMarkdown(raw);
    expect(result.optimizedMarkdown).toBe('# Title\n\nParagraph text here.\n');
    expect(result.stats.camoSafe).toBe(true);
    expect(result.stats.bytesSaved).toBeGreaterThan(0);
  });

  it('adds loading="lazy" and decoding="async" to img tags for Camo compliance', () => {
    const raw = '<img src="https://example.com/banner.svg" alt="Banner">';
    const result = optimizeMarkdown(raw);
    expect(result.optimizedMarkdown).toContain('loading="lazy"');
    expect(result.optimizedMarkdown).toContain('decoding="async"');
    expect(result.stats.imageCount).toBe(1);
  });

  it('sanitizes unsafe script tags', () => {
    const raw = '<script>alert("unsafe")</script>\n# Hello';
    const result = optimizeMarkdown(raw);
    expect(result.optimizedMarkdown).not.toContain('<script>');
    expect(result.stats.camoSafe).toBe(true);
  });
});

