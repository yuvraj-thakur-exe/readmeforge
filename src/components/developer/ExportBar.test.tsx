import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { ExportBar } from './ExportBar';
import { useReadmeStore } from '#/store/useReadmeStore';

// Mock confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('ExportBar Developer Component', () => {
  beforeEach(() => {
    cleanup();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
    useReadmeStore.setState({
      config: {
        version: '1.0.0',
        title: 'Export Test',
        settings: {
          user: {
            github: 'devuser',
            name: 'Dev User',
            role: '',
            bio: '',
            location: '',
            pronouns: '',
            status: '',
          },
          theme: 'dark',
          accentColor: '#8b5cf6',
          badgeStyle: 'for-the-badge',
          align: 'left',
        },
        sections: [],
      },
      history: [],
      future: [],
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders export buttons and disabled undo/redo by default', () => {
    render(<ExportBar />);

    expect(screen.getByRole('button', { name: /copy readme/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /readme\.md/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /share/i })).toBeDefined();

    const undoBtn = screen.getByTitle('Undo');
    expect(undoBtn.hasAttribute('disabled')).toBe(true);
  });

  it('copies generated markdown and triggers celebration on Copy README click', async () => {
    render(<ExportBar />);

    const copyBtn = screen.getByRole('button', { name: /copy readme/i });
    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
      expect(screen.getByText(/copied/i)).toBeDefined();
    });
  });

  it('triggers onOpenSync when Sync button is clicked', () => {
    const handleSync = vi.fn();
    render(<ExportBar onOpenSync={handleSync} />);

    const syncBtn = screen.getByTitle('Push directly to GitHub repository');
    fireEvent.click(syncBtn);

    expect(handleSync).toHaveBeenCalled();
  });

  it('copies AI prompt when AI Prompt button is clicked', async () => {
    render(<ExportBar />);

    const aiBtn = screen.getByRole('button', { name: /ai prompt/i });
    fireEvent.click(aiBtn);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
      expect(screen.getByText(/prompt copied/i)).toBeDefined();
    });
  });
});
