import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { DesignTokensPlayground } from './DesignTokensPlayground';

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe('DesignTokensPlayground Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders design tokens playground title and accent token controls', () => {
    render(<DesignTokensPlayground />);
    expect(screen.getByText('Interactive Tokens & Theme Engine')).toBeDefined();
    expect(screen.getByText('ACCENT COLOR TOKEN')).toBeDefined();
    expect(screen.getByText('SHIELD BADGE GEOMETRY')).toBeDefined();
  });

  it('switches badge geometry and mascot companion', () => {
    render(<DesignTokensPlayground />);
    const flatBadgeBtn = screen.getByText('Flat Modern');
    fireEvent.click(flatBadgeBtn);

    const catMascotBtn = screen.getByText('Peeking Cat');
    fireEvent.click(catMascotBtn);

    expect(screen.getByAltText('Peeking Cat')).toBeDefined();
  });

  it('copies tokens markdown snippet to clipboard', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    render(<DesignTokensPlayground />);
    const copyBtn = screen.getByText('Copy Tokens Markdown');
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});

