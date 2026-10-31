import { Plugin, UserSettings } from '../types';

export interface FigmaPluginProps {
  style?: 'badge' | 'showcase-card' | 'prototype-link' | 'design-system';
  figmaUrl?: string;
  projectName?: string;
  description?: string;
  badgeStyle?: 'for-the-badge' | 'flat' | 'flat-square';
  align?: 'left' | 'center' | 'right';
}

export const figmaDesignPlugin: Plugin = {
  id: 'figma-design',
  name: 'Figma UI/UX & Design Showcase',
  description: 'Showcase your Figma design systems, UI/UX prototypes, and design badges directly in your GitHub profile README.',
  author: 'MonoForge',
  repository: 'https://github.com/monoforge/MONOFORGE',
  category: 'widgets',
  icon: 'figma',
  fields: [
    {
      name: 'style',
      label: 'Display Style',
      type: 'select',
      defaultValue: 'showcase-card',
      options: [
        { label: 'Showcase Card (Figma Banner & CTA)', value: 'showcase-card' },
        { label: 'Design System Bento (Tokens & Specs)', value: 'design-system' },
        { label: 'Interactive Prototype Link Callout', value: 'prototype-link' },
        { label: 'Official Figma Shield Badge', value: 'badge' },
      ],
      required: false,
    },
    {
      name: 'figmaUrl',
      label: 'Figma Profile or File URL',
      type: 'text',
      defaultValue: 'https://www.figma.com/@developer',
      placeholder: 'https://www.figma.com/@yourname or https://figma.com/design/...',
      description: 'Link to your public Figma profile, Community portfolio, or project file',
      required: true,
    },
    {
      name: 'projectName',
      label: 'Design Project Name',
      type: 'text',
      defaultValue: 'Design System & Component Library',
      placeholder: 'Design System & Component Library',
      required: false,
    },
    {
      name: 'description',
      label: 'Design Description',
      type: 'text',
      defaultValue: 'Crafting pixel-perfect design tokens, accessible components, and interactive prototypes.',
      placeholder: 'Brief summary of your design philosophy or system specs',
      required: false,
    },
    {
      name: 'align',
      label: 'Alignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      required: false,
    },
  ],
  defaultConfig: {
    style: 'showcase-card',
    figmaUrl: 'https://www.figma.com/@developer',
    projectName: 'Design System & Component Library',
    description: 'Crafting pixel-perfect design tokens, accessible components, and interactive prototypes.',
    align: 'center',
    badgeStyle: 'for-the-badge',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const align = (props.align as string) || settings.align || 'center';
    const style = (props.style as string) || 'showcase-card';
    const rawUrl = String(props.figmaUrl || 'https://www.figma.com/@developer').trim();
    const figmaUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
    const projectName = String(props.projectName || 'Design System & Component Library').trim();
    const description = String(props.description || 'Crafting pixel-perfect design tokens, accessible components, and interactive prototypes.').trim();
    const badgeStyle = (props.badgeStyle as string) || settings.badgeStyle || 'for-the-badge';

    // 1. Badge Style
    if (style === 'badge') {
      const badgeImg = `https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white&style=${badgeStyle}`;
      return {
        markdown: `<div align="${align}">\n  <a href="${figmaUrl}" target="_blank" rel="noreferrer">\n    <img src="${badgeImg}" alt="Figma Design Portfolio" />\n  </a>\n</div>`,
      };
    }

    // 2. Interactive Prototype Link Callout
    if (style === 'prototype-link') {
      return {
        markdown: `<div align="${align}">\n  <a href="${figmaUrl}" target="_blank" rel="noreferrer">\n    <img src="https://img.shields.io/badge/🎨_Inspect_Interactive_Prototype-Figma-F24E1E?style=${badgeStyle}&logo=figma&logoColor=white" alt="Inspect Prototype in Figma" />\n  </a>\n  <p><sub>✦ Click above to test the live Figma prototype and interaction flow ✦</sub></p>\n</div>`,
      };
    }

    // 3. Design System Bento Grid Style
    if (style === 'design-system') {
      return {
        markdown: `<div align="${align}">\n  <h3>🎨 ${projectName}</h3>\n  <p>${description}</p>\n  <p>\n    <a href="${figmaUrl}" target="_blank" rel="noreferrer">\n      <img src="https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white&style=${badgeStyle}" alt="Figma" />\n    </a>\n    <img src="https://img.shields.io/badge/Tokens-Auto_Layout_5.0-blueviolet?style=${badgeStyle}" alt="Auto Layout" />\n    <img src="https://img.shields.io/badge/A11y-WCAG_AAA-00C853?style=${badgeStyle}" alt="WCAG AAA" />\n    <img src="https://img.shields.io/badge/Components-120+_Variants-00B0FF?style=${badgeStyle}" alt="Variants" />\n  </p>\n</div>`,
      };
    }

    // 4. Default: Showcase Card (Camo-Compliant HTML Table & Badges)
    return {
      markdown: `<div align="${align}">\n  <table width="100%">\n    <tr>\n      <td>\n        <a href="${figmaUrl}" target="_blank" rel="noreferrer">\n          <img src="https://img.shields.io/badge/Figma_Design_System-F24E1E?logo=figma&logoColor=white&style=${badgeStyle}" alt="Figma Project" />\n        </a>\n        <br/>\n        <b>${projectName}</b>\n        <br/>\n        <sub>${description}</sub>\n      </td>\n      <td align="right" width="180">\n        <a href="${figmaUrl}" target="_blank" rel="noreferrer">\n          <img src="https://img.shields.io/badge/Open_in_Figma-000000?style=${badgeStyle}&logo=figma" alt="Open in Figma" />\n        </a>\n      </td>\n    </tr>\n  </table>\n</div>`,
    };
  },
};

