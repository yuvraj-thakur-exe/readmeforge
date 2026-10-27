import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  toBase64Utf8,
  fromBase64Utf8,
  fetchRemoteReadme,
  pushReadmeToGitHub,
  sanitizeErrorMessage,
  isValidRepoIdentifier,
} from './sync';

describe('github sync client', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('security and validation helpers', () => {
    it('validates safe repository and owner identifiers', () => {
      expect(isValidRepoIdentifier('octocat')).toBe(true);
      expect(isValidRepoIdentifier('profile-repo_v2.0')).toBe(true);
      expect(isValidRepoIdentifier('')).toBe(false);
      expect(isValidRepoIdentifier('octo/cat')).toBe(false);
      expect(isValidRepoIdentifier('../malicious')).toBe(false);
      expect(isValidRepoIdentifier('test$repo')).toBe(false);
    });

    it('sanitizes tokens and auth headers from error strings', () => {
      const sensitiveToken = 'ghp_secretTokenABC123XYZ9876543210';
      const rawError = `Request failed with ${sensitiveToken} using Bearer token123`;
      const sanitized = sanitizeErrorMessage(rawError, sensitiveToken);

      expect(sanitized).not.toContain('secretTokenABC');
      expect(sanitized).toContain('[REDACTED_TOKEN]');
      expect(sanitized).toContain('Bearer [REDACTED_TOKEN]');

      // Test fine-grained PAT redaction
      const patError = 'Failed: github_pat_11ABCDE_9876543210fedcba';
      expect(sanitizeErrorMessage(patError)).toBe('Failed: [REDACTED_TOKEN]');
    });
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

    it('rejects invalid repo identifiers before fetching', async () => {
      const fetchSpy = vi.fn();
      global.fetch = fetchSpy;

      const res = await fetchRemoteReadme('bad/owner', 'bad..repo');
      expect(res.exists).toBe(false);
      expect(res.error).toContain('Invalid repository name');
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('handles 401 unauthorized gracefully', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        status: 401,
        ok: false,
      } as Response);

      const res = await fetchRemoteReadme('octocat', 'octocat', 'ghp_expired');
      expect(res.exists).toBe(false);
      expect(res.error).toContain('Authentication failed');
    });

    it('detects rate limits on 403 with x-ratelimit-remaining: 0', async () => {
      const headers = new Headers();
      headers.set('x-ratelimit-remaining', '0');

      global.fetch = vi.fn().mockResolvedValue({
        status: 403,
        ok: false,
        headers,
      } as Response);

      const res = await fetchRemoteReadme('octocat', 'octocat');
      expect(res.exists).toBe(false);
      expect(res.error).toContain('rate limit exceeded');
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

    it('rejects invalid owner or repo format', async () => {
      const res = await pushReadmeToGitHub({
        owner: 'octo/cat',
        repo: 'octocat',
        token: 'ghp_validToken',
        content: '# New README',
      });
      expect(res.success).toBe(false);
      expect(res.error).toContain('Invalid repository name');
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
        headers: new Headers(),
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

    it('handles 403 permission denied', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        headers: new Headers(),
        json: async () => ({ message: 'Resource not accessible by personal access token' }),
      } as Response);

      const res = await pushReadmeToGitHub({
        owner: 'octocat',
        repo: 'octocat',
        token: 'ghp_validToken',
        content: '# Test',
      });

      expect(res.success).toBe(false);
      expect(res.error).toContain('Permission denied');
    });

    it('redacts tokens if error response contains token value', async () => {
      const leakedToken = 'ghp_leakedSecretToken1234567890';
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        headers: new Headers(),
        json: async () => ({ message: `Internal error processing ${leakedToken}` }),
      } as Response);

      const res = await pushReadmeToGitHub({
        owner: 'octocat',
        repo: 'octocat',
        token: leakedToken,
        content: '# Test',
      });

      expect(res.success).toBe(false);
      expect(res.error).not.toContain('leakedSecretToken');
      expect(res.error).toContain('[REDACTED_TOKEN]');
    });
  });
});
