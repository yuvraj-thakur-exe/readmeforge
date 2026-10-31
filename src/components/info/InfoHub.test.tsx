import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { InfoHub } from './InfoHub';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

// Mock #/i18n/navigation
vi.mock('#/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: any) => (
    <a href={typeof href === 'string' ? href : '#'} {...props}>
      {children}
    </a>
  ),
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/en/info',
}));

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('InfoHub Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the Information & Guide portal with key metrics and tabs', () => {
    render(<InfoHub />);

    expect(screen.getAllByText(/MonoForge/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /Install & Quickstart/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /README Archetypes/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Live Mini-Studio/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Badge Arsenal/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Studio Walkthrough/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /Architecture & Security/i })).toBeDefined();
  });

  it('renders 1-line installation commands for Linux and Windows', () => {
    render(<InfoHub />);

    expect(screen.getByText(/Automated Development Setup/i)).toBeDefined();
    expect(screen.getAllByText(/curl -fsSL/i).length).toBeGreaterThan(0);

    // Click Windows PowerShell button
    const winBtn = screen.getByRole('button', { name: /Windows PowerShell/i });
    fireEvent.click(winBtn);

    expect(screen.getAllByText(/install\.ps1/i).length).toBeGreaterThan(0);
  });

  it('switches to Archetypes tab and displays template cards', () => {
    render(<InfoHub />);

    const templatesTab = screen.getByRole('button', { name: /README Archetypes/i });
    fireEvent.click(templatesTab);

    expect(screen.getByText(/Minimalist Clean/i)).toBeDefined();
    expect(screen.getByText(/Cyberpunk & Gamer/i)).toBeDefined();
    expect(screen.getByText(/Full-Stack Polyglot/i)).toBeDefined();
    expect(screen.getByText(/Mobile & Cross-Platform/i)).toBeDefined();
  });

  it('switches to Live Mini-Studio tab and allows parameter changes', () => {
    render(<InfoHub />);

    const playgroundTab = screen.getByRole('button', { name: /Live Mini-Studio/i });
    fireEvent.click(playgroundTab);

    expect(screen.getByText(/Instant Profile Playground/i)).toBeDefined();
    expect(screen.getByText(/Profile Parameters/i)).toBeDefined();
    expect(screen.getByText(/Live Render Canvas/i)).toBeDefined();
  });

  it('switches to Badge Arsenal tab and shows shield badges', () => {
    render(<InfoHub />);

    const badgeTab = screen.getByRole('button', { name: /Badge Arsenal/i });
    fireEvent.click(badgeTab);

    expect(screen.getByText(/Tech Badge Arsenal/i)).toBeDefined();
    expect(screen.getAllByText(/TypeScript/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Python/i).length).toBeGreaterThan(0);
  });

  it('switches to Architecture tab and displays security invariants', () => {
    render(<InfoHub />);

    const aboutTab = screen.getByRole('button', { name: /Architecture & Security/i });
    fireEvent.click(aboutTab);

    expect(screen.getAllByText(/About MonoForge/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/100% Client-Side Privacy/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Confirmation-Gated Operations/i)).toBeDefined();
    expect(screen.getByText(/MonoForge Core Contributors/i)).toBeDefined();
  });
});
