import { describe, it, expect, beforeEach } from 'vitest';
import { useReadmeStore } from './useReadmeStore';

describe('useReadmeStore', () => {
  beforeEach(() => {
    useReadmeStore.getState().resetConfig();
  });

  it('initializes with default config and empty sections', () => {
    const state = useReadmeStore.getState();
    expect(state.config.title).toBe('MonoForge Profile');
    expect(state.config.sections).toEqual([]);
    expect(state.activeSectionId).toBeNull();
  });

  it('updates github username and user settings', () => {
    const store = useReadmeStore.getState();
    store.setGithub('octocat');
    expect(useReadmeStore.getState().config.settings.user.github).toBe('octocat');

    store.updateSettings({
      theme: 'light',
      accentColor: '#06b6d4',
    });
    expect(useReadmeStore.getState().config.settings.theme).toBe('light');
    expect(useReadmeStore.getState().config.settings.accentColor).toBe('#06b6d4');
  });

  it('adds, updates, reorders, and removes sections', () => {
    const store = useReadmeStore.getState();
    const id1 = store.addSection('header', { content: { title: 'Hello World' } });
    const id2 = store.addSection('stats', { content: { showStats: true } });

    let state = useReadmeStore.getState();
    expect(state.config.sections).toHaveLength(2);
    expect(state.activeSectionId).toBe(id2);

    // Update section
    store.updateSection(id1, { content: { title: 'Updated Title' } });
    state = useReadmeStore.getState();
    expect(state.config.sections[0].props.content.title).toBe('Updated Title');

    // Reorder sections
    store.reorderSections([id2, id1]);
    state = useReadmeStore.getState();
    expect(state.config.sections[0].id).toBe(id2);
    expect(state.config.sections[1].id).toBe(id1);

    // Remove section
    store.removeSection(id1);
    state = useReadmeStore.getState();
    expect(state.config.sections).toHaveLength(1);
    expect(state.config.sections[0].id).toBe(id2);
  });

  it('supports undo and redo', () => {
    const store = useReadmeStore.getState();
    store.setGithub('first-user');
    store.setGithub('second-user');

    expect(useReadmeStore.getState().config.settings.user.github).toBe('second-user');

    store.undo();
    expect(useReadmeStore.getState().config.settings.user.github).toBe('first-user');

    store.redo();
    expect(useReadmeStore.getState().config.settings.user.github).toBe('second-user');
  });

  it('validates and applies entire JSON config', () => {
    const store = useReadmeStore.getState();
    const validJson = JSON.stringify({
      version: '1.0.0',
      title: 'Imported Profile',
      settings: {
        user: { github: 'dev-master' },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 's1',
          type: 'stats',
          props: { content: {}, styles: {}, state: 'default' },
        },
      ],
    });

    const success = store.setEntireConfig(validJson);
    expect(success).toBe(true);
    expect(useReadmeStore.getState().config.title).toBe('Imported Profile');
    expect(useReadmeStore.getState().config.sections).toHaveLength(1);

    // Invalid JSON/schema returns false and does not corrupt state
    const invalidSuccess = store.setEntireConfig('{ invalid json }');
    expect(invalidSuccess).toBe(false);
  });
});
