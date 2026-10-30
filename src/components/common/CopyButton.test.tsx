import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { CopyButton } from './CopyButton';

// Mock confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('CopyButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders with label and copies text to clipboard on click', async () => {
    render(<CopyButton textToCopy="npx monoforge@latest" label="Copy Command" />);

    const button = screen.getByRole('button', { name: /Copy Command/i });
    expect(button).toBeDefined();

    fireEvent.click(button);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('npx monoforge@latest');
      expect(screen.getByText('Copied!')).toBeDefined();
    });
  });

  it('invokes onCopied callback when provided', async () => {
    const handleCopied = vi.fn();
    render(
      <CopyButton
        textToCopy="test-snippet"
        label="Copy"
        onCopied={handleCopied}
      />
    );

    const button = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(handleCopied).toHaveBeenCalledTimes(1);
    });
  });

  it('renders icon-only mode when specified', () => {
    render(
      <CopyButton
        textToCopy="icon-test"
        iconOnly
        title="Copy Snippet"
      />
    );

    const button = screen.getByRole('button', { name: /Copy Snippet/i });
    expect(button).toBeDefined();
  });
});
