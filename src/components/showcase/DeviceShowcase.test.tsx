import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { DeviceShowcase } from './DeviceShowcase';

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

describe('DeviceShowcase Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders section title and device selector buttons', () => {
    render(<DeviceShowcase />);
    expect(screen.getByText('Engineered for Every Screen & Device')).toBeDefined();
    expect(screen.getByText('MacBook Pro')).toBeDefined();
    expect(screen.getByText('Cyber Terminal')).toBeDefined();
    expect(screen.getByText('iPhone Mobile')).toBeDefined();
  });

  it('switches between device views when clicking buttons', () => {
    render(<DeviceShowcase />);
    // Switch to Terminal
    const terminalBtn = screen.getByText('Cyber Terminal');
    fireEvent.click(terminalBtn);
    expect(screen.getByText(/monoforge inspect --profile/)).toBeDefined();

    // Switch to Mobile
    const mobileBtn = screen.getByText('iPhone Mobile');
    fireEvent.click(mobileBtn);
    expect(screen.getByText('GitHub Mobile App')).toBeDefined();
  });

  it('allows switching between featured archetypes and copies markdown', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    render(<DeviceShowcase />);
    const bentoBtn = screen.getByText('#5 Bento Signal Grid');
    fireEvent.click(bentoBtn);

    const copyBtn = screen.getByText('Copy Markdown');
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('bento-dashboard-full.svg')
    );
  });
});

