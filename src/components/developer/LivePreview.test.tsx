import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { LivePreview } from './LivePreview';
import { useReadmeStore } from '#/store/useReadmeStore';

describe('LivePreview Developer Component', () => {
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
        title: 'Developer Profile',
        settings: {
          user: {
            github: 'alexdev',
            name: 'Alex Developer',
            role: 'Full Stack Engineer',
            bio: 'Building awesome web tools',
            location: 'San Francisco, CA',
            pronouns: 'they/them',
            status: '🚀 coding',
          },
          theme: 'dark',
          accentColor: '#8b5cf6',
          badgeStyle: 'for-the-badge',
          align: 'left',
        },
        sections: [
          {
            id: 's-1',
            type: 'header-bio',
            props: { content: {}, styles: {} },
          },
        ],
      },
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders markdown preview content and stats', () => {
    render(<LivePreview />);

    expect(screen.getByText(/rendered/i)).toBeDefined();
    expect(screen.getByText(/raw/i)).toBeDefined();
    expect(screen.getByText(/lines ·/i)).toBeDefined();
  });

  it('switches between Rendered and Raw Markdown tabs', () => {
    render(<LivePreview />);

    const rawTab = screen.getByRole('button', { name: /raw/i });
    fireEvent.click(rawTab);

    expect(screen.getByText(/Alex Developer/i)).toBeDefined();
  });

  it('copies generated markdown to clipboard on click', async () => {
    render(<LivePreview />);

    const copyBtn = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
      expect(screen.getByText(/copied/i)).toBeDefined();
    });
  });
});
