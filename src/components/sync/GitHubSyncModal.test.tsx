import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { GitHubSyncModal } from './GitHubSyncModal';

// Mock dependencies
vi.mock('#/store/useReadmeStore', () => ({
  useReadmeStore: (selector: (state: any) => any) =>
    selector({
      config: {
        settings: {
          user: { github: 'testuser' },
          align: 'left',
        },
        sections: [],
      },
    }),
}));

vi.mock('#/lib/github/sync', async (importOriginal) => {
  const actual = await importOriginal<typeof import('#/lib/github/sync')>();
  return {
    ...actual,
    fetchRemoteReadme: vi.fn().mockResolvedValue({
      exists: true,
      content: '# Current remote content',
      sha: 'test-sha-123',
      repoExists: true,
    }),
    pushReadmeToGitHub: vi.fn(),
  };
});

describe('GitHubSyncModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('proactively purges any legacy token from localStorage on mount', () => {
    localStorage.setItem('monoforge_gh_token', 'ghp_legacyToken123');
    render(<GitHubSyncModal isOpen={true} onClose={vi.fn()} />);

    expect(localStorage.getItem('monoforge_gh_token')).toBeNull();
  });

  it('does NOT write token to localStorage when typed', () => {
    render(<GitHubSyncModal isOpen={true} onClose={vi.fn()} />);

    const tokenInput = screen.getByLabelText(/personal access token/i);
    fireEvent.change(tokenInput, { target: { value: 'ghp_ephemeralToken456' } });

    expect(localStorage.getItem('monoforge_gh_token')).toBeNull();
  });

  it('shows clear in-memory security notice to user', () => {
    render(<GitHubSyncModal isOpen={true} onClose={vi.fn()} />);

    const notice = screen.getByText(/in-memory only\. never written to storage/i);
    expect(notice).toBeDefined();
  });
});
