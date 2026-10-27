import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { PluginPanel } from './PluginPanel';
import { useReadmeStore } from '#/store/useReadmeStore';

describe('PluginPanel Developer Component', () => {
  beforeEach(() => {
    cleanup();
    useReadmeStore.setState({
      config: {
        version: '1.0.0',
        title: 'Plugin Test',
        settings: {
          user: { github: 'dev', name: 'Dev User' },
          theme: 'dark',
          accentColor: '#8b5cf6',
          badgeStyle: 'for-the-badge',
          align: 'left',
        },
        sections: [],
      },
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders search input and category pills', () => {
    render(<PluginPanel />);

    const searchInput = screen.getByPlaceholderText(/search badges, stats, widgets/i);
    expect(searchInput).toBeDefined();

    const allPill = screen.getByRole('button', { name: /^all$/i });
    expect(allPill).toBeDefined();
  });

  it('filters plugins by typing a search query', () => {
    render(<PluginPanel />);

    const searchInput = screen.getByPlaceholderText(/search badges, stats, widgets/i);
    fireEvent.change(searchInput, { target: { value: 'trophy' } });

    expect(screen.getByText(/github profile trophy/i)).toBeDefined();
  });

  it('inserts plugin into store and invokes callback on click', () => {
    const handleInserted = vi.fn();
    render(<PluginPanel onPluginInserted={handleInserted} />);

    const searchInput = screen.getByPlaceholderText(/search badges, stats, widgets/i);
    fireEvent.change(searchInput, { target: { value: 'typing' } });

    const insertBtn = screen.getByRole('button', { name: /insert/i });
    fireEvent.click(insertBtn);

    expect(handleInserted).toHaveBeenCalledWith('readme-typing-svg');
    const sections = useReadmeStore.getState().config.sections;
    expect(sections.some(s => s.type === 'readme-typing-svg')).toBe(true);
  });

  it('switches to Templates tab and applies archetype', () => {
    render(<PluginPanel />);

    const templatesTab = screen.getByRole('button', { name: /templates/i });
    fireEvent.click(templatesTab);

    expect(screen.getByText(/minimalist clean/i)).toBeDefined();
    const loadButtons = screen.getAllByRole('button', { name: /load preset/i });
    expect(loadButtons.length).toBeGreaterThan(0);
    fireEvent.click(loadButtons[0]);

    const title = useReadmeStore.getState().config.title;
    expect(title).toBe('Minimalist Clean Profile');
  });

  it('switches to AI & Schema tab and triggers copy prompt', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });

    render(<PluginPanel />);

    const schemaTab = screen.getByRole('button', { name: /ai & schema/i });
    fireEvent.click(schemaTab);

    expect(screen.getByText(/ai agent pairing/i)).toBeDefined();
    const copyPromptBtn = screen.getByRole('button', { name: /copy agent prompt/i });
    fireEvent.click(copyPromptBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
