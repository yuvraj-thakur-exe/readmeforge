import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { KineticStickerDock } from './KineticStickerDock';
import { useReadmeStore } from '#/store/useReadmeStore';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('KineticStickerDock Component', () => {
  beforeEach(() => {
    useReadmeStore.getState().resetConfig();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders sticker dock title and stickers', () => {
    render(<KineticStickerDock />);
    expect(screen.getByText(/Interactive Tactile Sticker Vault/i)).toBeDefined();
    expect(screen.getAllByText(/Next\.js 16/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/React 19/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Cyber Monkey/i).length).toBeGreaterThan(0);
  });

  it('allows selecting a sticker and updates snippet view', () => {
    render(<KineticStickerDock />);
    const rustStickerBtn = screen.getByText('Rust Core');
    fireEvent.click(rustStickerBtn);

    expect(screen.getByText(/Selected: Rust Core/i)).toBeDefined();
    expect(screen.getByText(/logo=rust/i)).toBeDefined();
  });

  it('injects sticker skill to store on button click', () => {
    render(<KineticStickerDock />);
    const injectBtn = screen.getByRole('button', { name: /Inject to Profile/i });
    fireEvent.click(injectBtn);

    const storeConfig = useReadmeStore.getState().config;
    expect(storeConfig.sections.length).toBeGreaterThan(0);
  });
});
