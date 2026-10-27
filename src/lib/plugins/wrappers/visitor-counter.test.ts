import { describe, it, expect } from 'vitest';
import { visitorCounterPlugin, sanitizeGitHubUsername, sanitizeHexColor } from './visitor-counter';
import { UserSettings } from '../types';

describe('visitor-counter wrapper', () => {
  const baseSettings: UserSettings = {
    user: { github: 'octocat' },
    theme: 'dark',
    accentColor: '#8b5cf6',
    badgeStyle: 'for-the-badge',
    align: 'center',
  };

  describe('sanitizeGitHubUsername', () => {
    it('accepts valid GitHub usernames', () => {
      expect(sanitizeGitHubUsername('octocat')).toBe('octocat');
      expect(sanitizeGitHubUsername('yuvraj-thakur-exe')).toBe('yuvraj-thakur-exe');
      expect(sanitizeGitHubUsername('john-doe-123')).toBe('john-doe-123');
    });

    it('falls back to default for empty or missing usernames', () => {
      expect(sanitizeGitHubUsername('')).toBe('username');
      expect(sanitizeGitHubUsername(undefined)).toBe('username');
      expect(sanitizeGitHubUsername('   ')).toBe('username');
    });

    it('rejects usernames with invalid characters and falls back to safe default', () => {
      expect(sanitizeGitHubUsername('octo<script>cat')).toBe('username');
      expect(sanitizeGitHubUsername('user@domain.com')).toBe('username');
      expect(sanitizeGitHubUsername('-leading-dash')).toBe('username');
      expect(sanitizeGitHubUsername('trailing-dash-')).toBe('username');
    });
  });

  describe('sanitizeHexColor', () => {
    it('normalizes valid 6-character hex colors', () => {
      expect(sanitizeHexColor('#8b5cf6')).toBe('8b5cf6');
      expect(sanitizeHexColor('FF5733')).toBe('ff5733');
    });

    it('expands valid 3-character hex colors', () => {
      expect(sanitizeHexColor('#f00')).toBe('ff0000');
      expect(sanitizeHexColor('ABC')).toBe('aabbcc');
    });

    it('falls back to safe default for invalid hex colors', () => {
      expect(sanitizeHexColor('red')).toBe('8b5cf6');
      expect(sanitizeHexColor('invalidhex')).toBe('8b5cf6');
      expect(sanitizeHexColor('#12345')).toBe('8b5cf6');
      expect(sanitizeHexColor(undefined)).toBe('8b5cf6');
    });
  });

  describe('renderMarkdown', () => {
    it('properly encodes komarev provider URL and parameters', () => {
      const output = visitorCounterPlugin.renderMarkdown(
        { provider: 'komarev', color: '#ff5733', label: 'MY VISITS & STATS' },
        baseSettings
      );

      const markdown = typeof output === 'string' ? output : output.markdown;
      expect(markdown).toContain('https://komarev.com/ghpvc/?username=octocat&label=MY%20VISITS%20%26%20STATS&color=ff5733&style=for-the-badge');
      expect(markdown).toContain('<div align="center">');
    });

    it('properly encodes hits provider URL and parameters', () => {
      const output = visitorCounterPlugin.renderMarkdown(
        { provider: 'hits', color: '#3b82f6', label: 'PROFILE HITS' },
        { ...baseSettings, user: { github: 'john-doe' } }
      );

      const markdown = typeof output === 'string' ? output : output.markdown;
      expect(markdown).toContain('https://hits.seeyoufarm.com/api/count/incr/badge.svg');
      expect(markdown).toContain('url=https%3A%2F%2Fgithub.com%2Fjohn-doe');
      expect(markdown).toContain('count_bg=%233b82f6');
      expect(markdown).toContain('title=PROFILE%20HITS');
    });

    it('handles dangerous or unencoded parameters securely', () => {
      const output = visitorCounterPlugin.renderMarkdown(
        { provider: 'komarev', color: '"><script>alert(1)</script>', label: '"><svg onload=alert(1)>' },
        { ...baseSettings, user: { github: 'malicious/user' } }
      );

      const markdown = typeof output === 'string' ? output : output.markdown;
      // Malicious color must fall back to 8b5cf6
      expect(markdown).toContain('color=8b5cf6');
      // Malicious username must be sanitized
      expect(markdown).not.toContain('malicious/user');
      // Label must be URL encoded
      expect(markdown).not.toContain('<script>');
      expect(markdown).toContain('%22%3E%3Csvg%20onload%3Dalert(1)%3E');
    });
  });
});
