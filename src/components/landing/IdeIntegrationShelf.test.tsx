import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { IdeIntegrationShelf } from './IdeIntegrationShelf';
import { useReadmeStore } from '#/store/useReadmeStore';

// Mock canvas-confetti for jsdom environment
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('IdeIntegrationShelf Component', () => {
  beforeEach(() => {
    useReadmeStore.getState().resetConfig();
    vi.clearAllMocks();

    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders all 6 IDE ecosystem cards', () => {
    render(<IdeIntegrationShelf />);

    expect(screen.getAllByText('Claude Code').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Anthropic MCP').length).toBeGreaterThan(0);

    expect(screen.getAllByText('Antigravity').length).toBeGreaterThan(0);
    expect(screen.getAllByText('DeepMind IDE').length).toBeGreaterThan(0);

    expect(screen.getAllByText('VS Code').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Split Preview').length).toBeGreaterThan(0);

    expect(screen.getAllByText('Cursor').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AI Generator').length).toBeGreaterThan(0);

    expect(screen.getAllByText('Windsurf').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Codeium Flow').length).toBeGreaterThan(0);

    expect(screen.getAllByText('Neovim').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Terminal CLI').length).toBeGreaterThan(0);
  });

  it('renders Supported Platforms suite with Zero Telemetry', () => {
    render(<IdeIntegrationShelf />);

    expect(screen.getByText(/Supported Platforms & AI Runtimes/i)).toBeDefined();
    expect(screen.getAllByText(/Zero Telemetry/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/DeepMind Agent Studio/i)).toBeDefined();
    expect(screen.getByText(/VS Code & Cursor/i)).toBeDefined();
  });

  it('triggers onSelectTab and copies command when clicking an IDE card', async () => {
    const handleSelectTab = vi.fn();
    render(<IdeIntegrationShelf onSelectTab={handleSelectTab} />);

    const claudeCards = screen.getAllByText('Claude Code');
    const claudeButton = claudeCards[0].closest('button');
    expect(claudeButton).not.toBeNull();
    if (claudeButton) {
      fireEvent.click(claudeButton);
      expect(handleSelectTab).toHaveBeenCalledWith('claude');
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('claude')
      );
    }
  });

  it('copies command for supported platform cards', async () => {
    render(<IdeIntegrationShelf />);

    const copyButtons = screen.getAllByRole('button', { name: /Copy MCP Config/i });
    expect(copyButtons.length).toBeGreaterThan(0);
    fireEvent.click(copyButtons[0]);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
