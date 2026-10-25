import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import {
  ReadmeConfig,
  ReadmeConfigSchema,
  SectionConfig,
  UserSettings,
} from '#/lib/plugins/types';

export interface ReadmeStoreState {
  config: ReadmeConfig;
  activeSectionId: string | null;
  previewMode: boolean;
  history: ReadmeConfig[];
  future: ReadmeConfig[];

  // Actions
  setGithub: (github: string) => void;
  updateSettings: (settings: Partial<UserSettings> | ((prev: UserSettings) => UserSettings)) => void;
  addSection: (type: string, initialProps?: Record<string, unknown>) => string;
  removeSection: (id: string) => void;
  updateSection: (id: string, updater: Partial<SectionConfig['props']> | ((prev: SectionConfig['props']) => SectionConfig['props'])) => void;
  reorderSections: (newOrderedIds: string[]) => void;
  setActiveSection: (id: string | null) => void;
  setPreviewMode: (enabled: boolean) => void;
  setEntireConfig: (newConfig: ReadmeConfig | string) => boolean;
  resetConfig: () => void;
  undo: () => void;
  redo: () => void;
}

const DEFAULT_CONFIG: ReadmeConfig = {
  version: '1.0.0',
  title: 'ReadmeForge Profile',
  settings: {
    user: {
      github: '',
      name: '',
      role: '',
      bio: '',
      location: '',
      pronouns: '',
      status: '',
    },
    theme: 'dark',
    accentColor: '#8b5cf6',
    badgeStyle: 'for-the-badge',
    align: 'left',
  },
  sections: [],
};

const pushHistory = (state: { config: ReadmeConfig; history: ReadmeConfig[]; future: ReadmeConfig[] }) => {
  const MAX_HISTORY = 30;
  const newHistory = [...state.history, state.config].slice(-MAX_HISTORY);
  return { history: newHistory, future: [] };
};

export const useReadmeStore = create<ReadmeStoreState>()(
  persist(
    (set, get) => ({
      config: DEFAULT_CONFIG,
      activeSectionId: null,
      previewMode: false,
      history: [],
      future: [],

      setGithub: (github: string) => {
        set(state => ({
          ...pushHistory(state),
          config: {
            ...state.config,
            settings: {
              ...state.config.settings,
              user: {
                ...state.config.settings.user,
                github: github.trim(),
              },
            },
          },
        }));
      },

      updateSettings: settings => {
        set(state => {
          const nextSettings =
            typeof settings === 'function'
              ? settings(state.config.settings)
              : { ...state.config.settings, ...settings };

          return {
            ...pushHistory(state),
            config: {
              ...state.config,
              settings: nextSettings,
            },
          };
        });
      },

      addSection: (type, initialProps = {}) => {
        const id = uuidv4();
        const newSection: SectionConfig = {
          id,
          type,
          props: {
            content: (initialProps.content as Record<string, unknown>) ?? {},
            styles: (initialProps.styles as Record<string, unknown>) ?? {},
            state: 'default',
          },
        };

        set(state => ({
          ...pushHistory(state),
          config: {
            ...state.config,
            sections: [...state.config.sections, newSection],
          },
          activeSectionId: id,
        }));

        return id;
      },

      removeSection: id => {
        set(state => ({
          ...pushHistory(state),
          config: {
            ...state.config,
            sections: state.config.sections.filter(s => s.id !== id),
          },
          activeSectionId: state.activeSectionId === id ? null : state.activeSectionId,
        }));
      },

      updateSection: (id, updater) => {
        set(state => {
          const sectionIndex = state.config.sections.findIndex(s => s.id === id);
          if (sectionIndex === -1) return state;

          const currentSection = state.config.sections[sectionIndex];
          const nextProps =
            typeof updater === 'function'
              ? updater(currentSection.props)
              : { ...currentSection.props, ...updater };

          const updatedSections = [...state.config.sections];
          updatedSections[sectionIndex] = {
            ...currentSection,
            props: nextProps,
          };

          return {
            ...pushHistory(state),
            config: {
              ...state.config,
              sections: updatedSections,
            },
          };
        });
      },

      reorderSections: newOrderedIds => {
        set(state => {
          const sectionMap = new Map(state.config.sections.map(s => [s.id, s]));
          const reordered: SectionConfig[] = [];

          for (const id of newOrderedIds) {
            const found = sectionMap.get(id);
            if (found) {
              reordered.push(found);
              sectionMap.delete(id);
            }
          }

          // Append any remaining sections that weren't in newOrderedIds
          for (const remaining of sectionMap.values()) {
            reordered.push(remaining);
          }

          return {
            ...pushHistory(state),
            config: {
              ...state.config,
              sections: reordered,
            },
          };
        });
      },

      setActiveSection: id => {
        set({ activeSectionId: id });
      },

      setPreviewMode: enabled => {
        set({ previewMode: enabled });
      },

      setEntireConfig: newConfig => {
        try {
          const parsed =
            typeof newConfig === 'string'
              ? JSON.parse(newConfig)
              : newConfig;

          const validated = ReadmeConfigSchema.parse(parsed);

          set(state => ({
            ...pushHistory(state),
            config: validated,
            activeSectionId: validated.sections[0]?.id ?? null,
          }));

          return true;
        } catch {
          return false;
        }
      },

      resetConfig: () => {
        set(state => ({
          ...pushHistory(state),
          config: DEFAULT_CONFIG,
          activeSectionId: null,
        }));
      },

      undo: () => {
        const { history, config, future } = get();
        if (history.length === 0) return;

        const previous = history[history.length - 1];
        const newHistory = history.slice(0, -1);

        set({
          config: previous,
          history: newHistory,
          future: [config, ...future],
        });
      },

      redo: () => {
        const { history, config, future } = get();
        if (future.length === 0) return;

        const next = future[0];
        const newFuture = future.slice(1);

        set({
          config: next,
          history: [...history, config],
          future: newFuture,
        });
      },
    }),
    {
      name: '@readmeforge-store',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: state => ({ config: state.config }),
    }
  )
);
