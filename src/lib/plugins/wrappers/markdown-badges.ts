import { Plugin, UserSettings } from '../types';

export const markdownBadgesPlugin: Plugin = {
  id: 'markdown-badges',
  name: 'Tech Stack Badges',
  description: 'Curated high-contrast Shields.io badges for languages, frameworks, cloud, and tools.',
  author: 'Ileriayo',
  repository: 'https://github.com/Ileriayo/markdown-badges',
  category: 'badges',
  icon: 'layers',
  fields: [
    {
      name: 'selectedBadges',
      label: 'Selected Technologies',
      type: 'multiselect',
      defaultValue: ['typescript', 'react', 'nextjs', 'tailwind', 'nodejs', 'docker'],
      options: [
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'Python', value: 'python' },
        { label: 'Rust', value: 'rust' },
        { label: 'Go', value: 'go' },
        { label: 'React', value: 'react' },
        { label: 'Next.js', value: 'nextjs' },
        { label: 'Vue.js', value: 'vue' },
        { label: 'Tailwind CSS', value: 'tailwind' },
        { label: 'Node.js', value: 'nodejs' },
        { label: 'PostgreSQL', value: 'postgres' },
        { label: 'MongoDB', value: 'mongodb' },
        { label: 'Docker', value: 'docker' },
        { label: 'Kubernetes', value: 'kubernetes' },
        { label: 'AWS', value: 'aws' },
        { label: 'Google Cloud', value: 'gcp' },
        { label: 'Git', value: 'git' },
        { label: 'Linux', value: 'linux' },
        { label: 'Pinterest', value: 'pinterest' },
      ],
      required: false,
    },
    {
      name: 'badgeStyle',
      label: 'Badge Style',
      type: 'select',
      defaultValue: 'for-the-badge',
      options: [
        { label: 'For The Badge', value: 'for-the-badge' },
        { label: 'Flat', value: 'flat' },
        { label: 'Flat Square', value: 'flat-square' },
        { label: 'Plastic', value: 'plastic' },
      ],
      required: false,
    },
  ],
  defaultConfig: {
    selectedBadges: ['typescript', 'react', 'nextjs', 'tailwind', 'nodejs', 'docker'],
    badgeStyle: 'for-the-badge',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const align = settings.align || 'left';
    const style = (props.badgeStyle as string) || settings.badgeStyle || 'for-the-badge';
    const selected = (props.selectedBadges as string[]) || [];

    const BADGE_MAP: Record<string, { label: string; logo: string; color: string; logoColor: string }> = {
      typescript: { label: 'TypeScript', logo: 'typescript', color: '3178C6', logoColor: 'white' },
      javascript: { label: 'JavaScript', logo: 'javascript', color: 'F7DF1E', logoColor: 'black' },
      python: { label: 'Python', logo: 'python', color: '3776AB', logoColor: 'white' },
      rust: { label: 'Rust', logo: 'rust', color: '000000', logoColor: 'white' },
      go: { label: 'Go', logo: 'go', color: '00ADD8', logoColor: 'white' },
      react: { label: 'React', logo: 'react', color: '20232A', logoColor: '61DAFB' },
      nextjs: { label: 'Next.js', logo: 'nextdotjs', color: '000000', logoColor: 'white' },
      vue: { label: 'Vue.js', logo: 'vuedotjs', color: '35495E', logoColor: '4FC08D' },
      tailwind: { label: 'Tailwind_CSS', logo: 'tailwindcss', color: '38B2AC', logoColor: 'white' },
      nodejs: { label: 'Node.js', logo: 'nodedotjs', color: '339933', logoColor: 'white' },
      postgres: { label: 'PostgreSQL', logo: 'postgresql', color: '316192', logoColor: 'white' },
      mongodb: { label: 'MongoDB', logo: 'mongodb', color: '47A248', logoColor: 'white' },
      docker: { label: 'Docker', logo: 'docker', color: '2496ED', logoColor: 'white' },
      kubernetes: { label: 'Kubernetes', logo: 'kubernetes', color: '326CE5', logoColor: 'white' },
      aws: { label: 'Amazon_AWS', logo: 'amazonwebservices', color: '232F3E', logoColor: 'white' },
      gcp: { label: 'Google_Cloud', logo: 'googlecloud', color: '4285F4', logoColor: 'white' },
      git: { label: 'Git', logo: 'git', color: 'F05032', logoColor: 'white' },
      linux: { label: 'Linux', logo: 'linux', color: 'FCC624', logoColor: 'black' },
      pinterest: { label: 'Pinterest', logo: 'pinterest', color: 'BD081C', logoColor: 'white' },
    };

    const badgesHtml = selected
      .map(key => {
        const item = BADGE_MAP[key];
        if (!item) return '';
        const url = `https://img.shields.io/badge/${encodeURIComponent(item.label)}-${item.color}?style=${style}&logo=${item.logo}&logoColor=${item.logoColor}`;
        return `<img src="${url}" alt="${item.label}" />`;
      })
      .filter(Boolean)
      .join(' ');

    return {
      markdown: `<div align="${align}">\n  ${badgesHtml}\n</div>`,
    };
  },
};
