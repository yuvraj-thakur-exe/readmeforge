import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { TemplateGallery, TEMPLATES } from './TemplateGallery';
import { useReadmeStore } from '#/store/useReadmeStore';

// Mock confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('TemplateGallery Component', () => {
  beforeEach(() => {
    useReadmeStore.getState().resetConfig();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders section title and template items', () => {
    render(<TemplateGallery />);
    expect(screen.getByText(/Curated Starter Archetypes/i)).toBeDefined();
    expect(screen.getAllByText(/Minimalist Clean/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Cyberpunk & Gamer/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Full-Stack Polyglot/i).length).toBeGreaterThan(0);
  });

  it('filters templates when clicking a category pill', () => {
    render(<TemplateGallery />);

    // Click 'Gaming' category pill
    const gamingPill = screen.getByRole('button', { name: /^Gaming/i });
    fireEvent.click(gamingPill);

    expect(screen.getAllByText(/Cyberpunk & Gamer/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Full-Stack Polyglot/i)).toBeNull();
  });

  it('filters templates when searching via the search bar', () => {
    render(<TemplateGallery />);

    const searchInput = screen.getByPlaceholderText(/Search by archetype/i);
    fireEvent.change(searchInput, { target: { value: 'Kubernetes' } });

    // Cloud & DevOps Master mentions Kubernetes in description
    expect(screen.getAllByText(/Cloud & DevOps Master/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Cyberpunk & Gamer/i)).toBeNull();
  });

  it('opens interactive preview modal and allows tab switching', () => {
    render(<TemplateGallery />);

    // Click Preview on the first template (Minimalist Clean)
    const previewButtons = screen.getAllByRole('button', { name: /Preview/i });
    fireEvent.click(previewButtons[0]);

    // Modal should be open with dialog role
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText(/Visual Preview/i)).toBeDefined();
    expect(screen.getByText(/Markdown Output/i)).toBeDefined();
    expect(screen.getByText(/AI Generator Prompt/i)).toBeDefined();

    // Switch to Markdown tab
    fireEvent.click(screen.getByText(/Markdown Output/i));
    expect(screen.getByText(/Generated Markdown Output/i)).toBeDefined();

    // Switch to Prompt tab
    fireEvent.click(screen.getByText(/AI Generator Prompt/i));
    expect(screen.getByText(/AI Prompt for LLMs/i)).toBeDefined();
  }, 15000);

  it('allows removing a plugin in the preview modal', () => {
    render(<TemplateGallery />);

    // Click preview on Cyberpunk (2nd template in list)
    const previewButtons = screen.getAllByRole('button', { name: /Preview/i });
    fireEvent.click(previewButtons[1]);

    // Go to Manage Plugins tab
    fireEvent.click(screen.getByText(/Manage Plugins/i));
    expect(screen.getByText(/Active Plugins in this Archetype/i)).toBeDefined();

    // Click Remove on one plugin
    const removeButtons = screen.getAllByRole('button', { name: /Remove/i });
    expect(removeButtons.length).toBeGreaterThan(0);
    fireEvent.click(removeButtons[0]);

    // Should show restore button
    expect(screen.getByText(/Restore All Plugins/i)).toBeDefined();
  }, 15000);

  it('copies AI prompt when clicking copy prompt button', () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<TemplateGallery />);

    const copyPromptButtons = screen.getAllByTitle(/Copy AI Prompt/i);
    expect(copyPromptButtons.length).toBeGreaterThan(0);

    fireEvent.click(copyPromptButtons[0]);
    expect(writeTextMock).toHaveBeenCalledWith(TEMPLATES[0].prompt);
  });

  it('applies template to store on 1-click apply', () => {
    render(<TemplateGallery />);

    const applyButtons = screen.getAllByRole('button', { name: /Apply/i });
    fireEvent.click(applyButtons[0]);

    const storeConfig = useReadmeStore.getState().config;
    expect(storeConfig.settings.user.name).toBe(TEMPLATES[0].config.settings.user.name);
  });

  it('merges plugins to current profile without overwriting existing user bio', () => {
    // Set a custom user in store first
    useReadmeStore.getState().updateSettings({
      user: {
        github: 'myusername',
        name: 'My Custom Name',
        role: 'Engineer',
        bio: 'My existing bio',
        location: '',
        pronouns: '',
        status: '',
      },
    });

    render(<TemplateGallery />);

    // Merge Cyberpunk template (which has 5 plugins)
    const addButtons = screen.getAllByRole('button', { name: /Add to Profile/i });
    fireEvent.click(addButtons[1]);

    const storeConfig = useReadmeStore.getState().config;
    // User settings should remain intact
    expect(storeConfig.settings.user.name).toBe('My Custom Name');
    expect(storeConfig.settings.user.bio).toBe('My existing bio');
    // Sections should now contain Cyberpunk's sections
    expect(storeConfig.sections.length).toBe(TEMPLATES[1].config.sections.length);
  });
});
