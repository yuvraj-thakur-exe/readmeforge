import { z } from 'zod';

export const PluginFieldTypeSchema = z.enum([
  'text',
  'number',
  'boolean',
  'select',
  'color',
  'multiselect',
  'textarea',
]);

export type PluginFieldType = z.infer<typeof PluginFieldTypeSchema>;

export const PluginFieldOptionSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number(), z.boolean()]),
});

export type PluginFieldOption = z.infer<typeof PluginFieldOptionSchema>;

export const PluginFieldSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  label: z.string(),
  type: PluginFieldTypeSchema,
  defaultValue: z.unknown().optional(),
  options: z.array(PluginFieldOptionSchema).optional(),
  placeholder: z.string().optional(),
  description: z.string().optional(),
  required: z.boolean().optional(),
});

export type PluginField = z.infer<typeof PluginFieldSchema>;

export const PluginCategorySchema = z.enum([
  'stats',
  'socials',
  'techs',
  'widgets',
  'fun',
  'badges',
  'header',
  'wakatime',
  'trophy',
]);

export type PluginCategory = z.infer<typeof PluginCategorySchema>;

export const PluginOutputSchema = z.object({
  markdown: z.string(),
  workflows: z.record(z.string(), z.string()).optional(),
});

export type PluginOutput = z.infer<typeof PluginOutputSchema>;

export const UserSettingsSchema = z.object({
  user: z.object({
    github: z.string().default(''),
    name: z.string().optional(),
    role: z.string().optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    pronouns: z.string().optional(),
    status: z.string().optional(),
  }).default({ github: '' }),
  theme: z.enum(['light', 'dark', 'auto']).default('dark'),
  accentColor: z.string().default('#8b5cf6'),
  badgeStyle: z.enum(['flat', 'flat-square', 'plastic', 'for-the-badge']).default('for-the-badge'),
  align: z.enum(['left', 'center', 'right']).default('left'),
});

export type UserSettings = z.infer<typeof UserSettingsSchema>;

export const SectionPropsSchema = z.object({
  content: z.record(z.string(), z.unknown()).default({}),
  styles: z.record(z.string(), z.unknown()).default({}),
  state: z.string().optional(),
});

export type SectionProps = z.infer<typeof SectionPropsSchema>;

export const SectionConfigSchema = z.object({
  id: z.string(),
  type: z.string(),
  props: SectionPropsSchema,
});

export type SectionConfig = z.infer<typeof SectionConfigSchema>;

export const ReadmeConfigSchema = z.object({
  version: z.string().default('1.0.0'),
  title: z.string().default('ReadmeForge Profile'),
  settings: UserSettingsSchema.default({
    user: { github: '' },
    theme: 'dark',
    accentColor: '#8b5cf6',
    badgeStyle: 'for-the-badge',
    align: 'left',
  }),
  sections: z.array(SectionConfigSchema).default([]),
});

export type ReadmeConfig = z.infer<typeof ReadmeConfigSchema>;

export interface Plugin {
  id: string;
  name: string;
  version?: string;
  tags?: string[];
  description: string;
  author: string;
  repository?: string;
  category: PluginCategory;
  icon: string;
  fields: PluginField[];
  defaultConfig: Record<string, unknown>;
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => PluginOutput | string;
}

const PLACEHOLDER_USERNAMES = new Set([
  '',
  'username',
  'your-username',
  'your_username',
  'zusername',
  'user',
  'placeholder',
  'example',
  'login',
]);

export function isPlaceholderUsername(username?: string): boolean {
  if (!username || typeof username !== 'string') return true;
  const clean = username.trim().toLowerCase();
  return clean === '' || PLACEHOLDER_USERNAMES.has(clean) || clean.startsWith('your-username');
}

export function resolveEffectiveUsername(
  props?: Record<string, unknown>,
  settings?: UserSettings,
  fallback = 'octocat'
): string {
  const propUser =
    typeof props?.username === 'string'
      ? props.username.trim()
      : typeof props?.github === 'string'
      ? props.github.trim()
      : '';

  if (propUser && !isPlaceholderUsername(propUser)) {
    return propUser;
  }

  const globalUser =
    typeof settings?.user?.github === 'string' ? settings.user.github.trim() : '';

  if (globalUser && !isPlaceholderUsername(globalUser)) {
    return globalUser;
  }

  return fallback;
}
