import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  toBase64Utf8,
  fromBase64Utf8,
  fetchRemoteReadme,
  pushReadmeToGitHub,
} from './sync';

describe('github sync client', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('correctly encodes and decodes UTF-8 strings in Base64', () => {
    const original = '# Hi there 👋\nFeaturing emoji ✨ and symbols & < > "';
    const encoded = toBase64Utf8(original);
    const decoded = fromBase64Utf8(encoded);
    expect(decoded).toBe(original);
  });

  describe('fetchRemoteReadme', () => {
    it('returns remote content and SHA when file exists (200)', async () => {
      const mockContent = toBase64Utf8('# Existing README content');
      global.fetch = vi.fn().mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => ({
          content: mockContent,
          sha: 'sha-abc-123',
        }),
      } as Response);

      const res = await fetchRemoteReadme('octocat', 'octocat', 'ghp_test123');
      expect(res.exists).toBe(true);
      expect(res.content).toBe('# Existing README content');
      expect(res.sha).toBe('sha-abc-123');
      expect(res.repoExists).toBe(true);
    });

    it('detects when repository exists but README does not (404 on README, 200 on repo)', async () => {
      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          status: 404,
          ok: false,
        } as Response)
        .mockResolvedValueOnce({
          status: 200,
          ok: true,
        } as Response);

      const res = await fetchRemoteReadme('octocat', 'octocat');
      expect(res.exists).toBe(false);
      expect(res.content).toBe('');
      expect(res.sha).toBeNull();
      expect(res.repoExists).toBe(true);
    });

    it('returns error when repository itself is not found (404 on repo)', async () => {
      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          status: 404,
          ok: false,
        } as Response)
        .mockResolvedValueOnce({
          status: 404,
          ok: false,
        } as Response);

      const res = await fetchRemoteReadme('nonexistent', 'profile');
      expect(res.repoExists).toBe(false);
      expect(res.error).toContain('does not exist on GitHub');
    });
  });

  describe('pushReadmeToGitHub', () => {
    it('requires a GitHub token', async () => {
      const res = await pushReadmeToGitHub({
        owner: 'octocat',
        repo: 'octocat',
        token: '',
        content: '# New README',
      });
      expect(res.success).toBe(false);
      expect(res.error).toContain('Token is required');
    });

    it('performs real PUT request and returns commit URL', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          commit: {
            html_url: 'https://github.com/octocat/octocat/commit/def456',
          },
        }),
      } as Response);

      const res = await pushReadmeToGitHub({
        owner: 'octocat',
        repo: 'octocat',
        token: 'ghp_validToken',
        content: '# Pushed Readme',
        existingSha: 'sha-old-123',
      });

      expect(res.success).toBe(true);
      expect(res.commitUrl).toBe('https://github.com/octocat/octocat/commit/def456');
    });

    it('handles 409 conflict gracefully', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 409,
        json: async () => ({ message: 'Conflict' }),
      } as Response);

      const res = await pushReadmeToGitHub({
        owner: 'octocat',
        repo: 'octocat',
        token: 'ghp_validToken',
        content: '# Conflicting change',
      });

      expect(res.success).toBe(false);
      expect(res.error).toContain('Conflict');
    });
  });
});
