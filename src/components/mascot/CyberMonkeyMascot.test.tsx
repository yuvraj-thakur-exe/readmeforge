import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { CyberMonkeyMascot } from './CyberMonkeyMascot';

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('CyberMonkeyMascot Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the mascot title and initial quote bubble', () => {
    render(<CyberMonkeyMascot />);
    expect(screen.getByText('CYBER MONKEY MASCOT')).toBeDefined();
    expect(screen.getByText(/Zero monkey business/)).toBeDefined();
  });

  it('cycles through witty developer quotes when clicking quote bubble', () => {
    render(<CyberMonkeyMascot />);
    const quoteBubble = screen.getByText(/Zero monkey business/);
    fireEvent.click(quoteBubble);
    expect(screen.getByText(/Compiling Camo-safe SVG keyframes/)).toBeDefined();
  });

  it('toggles cyber visor and headphones gear', () => {
    render(<CyberMonkeyMascot />);
    const visorBtn = screen.getByText('Cyber Visor');
    fireEvent.click(visorBtn);
    expect(screen.getByText('OFF')).toBeDefined();

    const beatsBtn = screen.getByText('Studio Beats');
    fireEvent.click(beatsBtn);
    expect(screen.getAllByText('OFF').length).toBe(2);
  });

  it('copies the Camo-safe SVG markdown snippet to clipboard', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    render(<CyberMonkeyMascot />);
    const copyBtn = screen.getByText('Copy to README');
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('cyber-monkey-mascot.svg')
    );
  });
});

