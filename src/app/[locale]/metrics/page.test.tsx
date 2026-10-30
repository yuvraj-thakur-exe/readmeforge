import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import MetricsStudioPage from './page';

// Mock TopNav
vi.mock('#/components/navigation/TopNav', () => ({
  TopNav: () => <div data-testid="top-nav">TopNav</div>,
}));

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ReadmeForge Metrics Studio Page', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the studio title and sample profile presets', () => {
    render(<MetricsStudioPage />);
    expect(screen.getByText('ReadmeForge Metrics')).toBeDefined();
    expect(screen.getByText('@octocat')).toBeDefined();
    expect(screen.getByText('@torvalds')).toBeDefined();
  });

  it('updates the GitHub username input and toggles template', () => {
    render(<MetricsStudioPage />);
    const usernameInput = screen.getByTestId('github-username-input') as HTMLInputElement;
    fireEvent.change(usernameInput, { target: { value: 'yuvraj' } });
    expect(usernameInput.value).toBe('yuvraj');

    // Click Terminal template
    const terminalBtn = screen.getByText('Terminal');
    fireEvent.click(terminalBtn);
    expect(terminalBtn.className).toContain('text-amber-300');
  });

  it('switches between Live Preview, Markdown, and Action tabs', () => {
    render(<MetricsStudioPage />);
    // Switch to Action tab
    const actionTab = screen.getByTestId('tab-action');
    fireEvent.click(actionTab);
    expect(screen.getByText('File: .github/workflows/readmeforge-metrics.yml')).toBeDefined();

    // Switch to Markdown tab
    const mdTab = screen.getByTestId('tab-markdown');
    fireEvent.click(mdTab);
    expect(screen.getByText('Copy-paste this directly into your GitHub profile README.md')).toBeDefined();
  });
});
