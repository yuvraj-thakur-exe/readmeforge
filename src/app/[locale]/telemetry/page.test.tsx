import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import TelemetryStudioPage from './page';

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

describe('MonoForge Telemetry Studio Page', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the studio title and sample profile presets', () => {
    render(<TelemetryStudioPage />);
    expect(screen.getByText('MonoForge Telemetry')).toBeDefined();
    expect(screen.getByText('@octocat')).toBeDefined();
    expect(screen.getByText('@torvalds')).toBeDefined();
  });

  it('updates the GitHub username input and toggles template', () => {
    render(<TelemetryStudioPage />);
    const usernameInput = screen.getByTestId('github-username-input') as HTMLInputElement;
    fireEvent.change(usernameInput, { target: { value: 'yuvraj' } });
    expect(usernameInput.value).toBe('yuvraj');

    // Click Terminal template
    const terminalBtn = screen.getByText('Terminal');
    fireEvent.click(terminalBtn);
    expect(terminalBtn.parentElement?.className).toContain('text-amber-300');
  });

  it('switches between Live Preview, Markdown, Action, and URL tabs', () => {
    render(<TelemetryStudioPage />);
    // Switch to Action tab
    const actionTab = screen.getByTestId('tab-action');
    fireEvent.click(actionTab);
    expect(screen.getByText('File: .github/workflows/monoforge-telemetry.yml')).toBeDefined();

    // Switch to Markdown tab
    const mdTab = screen.getByTestId('tab-markdown');
    fireEvent.click(mdTab);
    expect(screen.getByText('Copy-paste this directly into your GitHub profile README.md')).toBeDefined();

    // Switch to URL tab
    const urlTab = screen.getByTestId('tab-url');
    fireEvent.click(urlTab);
    expect(screen.getByText('Direct SVG Endpoint (Native Server)')).toBeDefined();
  });

  it('allows selecting standalone SVG visualizers such as Languages Donut and Terminal HUD', () => {
    render(<TelemetryStudioPage />);
    const langsBtn = screen.getByText('Languages Donut');
    fireEvent.click(langsBtn);

    const previewTab = screen.getByTestId('tab-preview');
    fireEvent.click(previewTab);

    expect(screen.getByText(/telemetry-languages\.svg/)).toBeDefined();

    const terminalBtn = screen.getAllByText('Terminal HUD')[0];
    fireEvent.click(terminalBtn);
    expect(screen.getByText(/telemetry-terminal\.svg/)).toBeDefined();
  });

  it('allows filtering plugins by category and search term', () => {
    render(<TelemetryStudioPage />);
    const searchInput = screen.getByPlaceholderText(/Search 47\+ plugins/);
    fireEvent.change(searchInput, { target: { value: 'isocalendar' } });
    expect(screen.getByText('3D Isometric Calendar')).toBeDefined();

    const codePill = screen.getByText('Code & Languages');
    fireEvent.click(codePill);
    expect(codePill.className).toContain('bg-amber-400');
  });
});
