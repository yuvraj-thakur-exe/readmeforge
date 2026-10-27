import { describe, it, expect } from 'vitest';
import { figmaDesignPlugin } from './figma-design';
import { UserSettings } from '../types';

describe('figmaDesignPlugin', () => {
  const mockSettings: UserSettings = {
    user: { github: 'octocat' },
    theme: 'dark',
    accentColor: '#9333ea',
    badgeStyle: 'for-the-badge',
    align: 'center',
  };

  const getMarkdown = (output: ReturnType<typeof figmaDesignPlugin.renderMarkdown>) => {
    return typeof output === 'object' && output ? output.markdown : String(output);
  };

  it('has valid plugin metadata and schema compliance', () => {
    expect(figmaDesignPlugin.id).toBe('figma-design');
    expect(figmaDesignPlugin.name).toContain('Figma');
    expect(figmaDesignPlugin.category).toBe('widgets');
  });

  it('renders showcase-card markdown by default', () => {
    const output = getMarkdown(
      figmaDesignPlugin.renderMarkdown(
        {
          figmaUrl: 'https://figma.com/@designer',
          projectName: 'Neon Design Tokens',
        },
        mockSettings
      )
    );

    expect(output).toContain('Neon Design Tokens');
    expect(output).toContain('https://figma.com/@designer');
    expect(output).toContain('Figma');
  });

  it('renders official badge style when selected', () => {
    const output = getMarkdown(
      figmaDesignPlugin.renderMarkdown(
        {
          style: 'badge',
          figmaUrl: 'https://figma.com/@prodev',
        },
        mockSettings
      )
    );

    expect(output).toContain('https://img.shields.io/badge/Figma-F24E1E');
    expect(output).toContain('https://figma.com/@prodev');
  });

  it('renders interactive prototype callout', () => {
    const output = getMarkdown(
      figmaDesignPlugin.renderMarkdown(
        {
          style: 'prototype-link',
          figmaUrl: 'https://figma.com/proto/12345',
        },
        { ...mockSettings, align: 'left', badgeStyle: 'flat' }
      )
    );

    expect(output).toContain('Inspect_Interactive_Prototype');
    expect(output).toContain('https://figma.com/proto/12345');
  });

  it('renders design system token pills', () => {
    const output = getMarkdown(
      figmaDesignPlugin.renderMarkdown(
        {
          style: 'design-system',
          projectName: 'Prism System',
          figmaUrl: 'https://figma.com/file/abc',
        },
        mockSettings
      )
    );

    expect(output).toContain('Prism System');
    expect(output).toContain('Auto_Layout_5.0');
    expect(output).toContain('WCAG_AAA');
  });
});

