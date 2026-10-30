import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { TelemetryArsenalGrid } from './TelemetryArsenalGrid';

// Mock next-intl navigation Link
vi.mock('#/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe('TelemetryArsenalGrid Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders section title and standalone vector previews', () => {
    render(<TelemetryArsenalGrid />);
    expect(screen.getByText('Scraped & Native Plugin Catalog')).toBeDefined();
    expect(screen.getAllByText('3D Isometric Calendar').length).toBeGreaterThan(0);
  });

  it('filters plugins via search input', () => {
    render(<TelemetryArsenalGrid />);
    const searchInput = screen.getByPlaceholderText(/Search 47\+ plugins/);
    fireEvent.change(searchInput, { target: { value: 'wakatime' } });

    expect(screen.getByText('WakaTime Developer Time')).toBeDefined();
  });

  it('filters plugins when selecting category pills', () => {
    render(<TelemetryArsenalGrid />);
    const codePill = screen.getByText('Code & Languages');
    fireEvent.click(codePill);

    expect(codePill.className).toContain('bg-amber-400');
  });
});
