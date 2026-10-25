import { Plugin, UserSettings } from '../types';

export const readmeTypingSvgPlugin: Plugin = {
  id: 'readme-typing-svg',
  name: 'Readme Typing SVG',
  description: 'Dynamically generated typing text SVG animation for profile introductions and headlines.',
  author: 'DenverCoder1',
  repository: 'https://github.com/DenverCoder1/readme-typing-svg',
  category: 'header',
  icon: 'type',
  fields: [
    {
      name: 'lines',
      label: 'Typing Lines (semicolon-separated)',
      type: 'textarea',
      defaultValue: 'Hi there, I am a developer! 👋;Building full-stack apps with TypeScript;Welcome to my GitHub profile!',
      placeholder: 'Line 1;Line 2;Line 3',
      required: true,
    },
    {
      name: 'color',
      label: 'Text Color',
      type: 'color',
      defaultValue: '#36BCF7',
      required: false,
    },
    {
      name: 'size',
      label: 'Font Size (px)',
      type: 'number',
      defaultValue: 22,
      required: false,
    },
    {
      name: 'duration',
      label: 'Typing Duration (ms)',
      type: 'number',
      defaultValue: 4000,
      required: false,
    },
    {
      name: 'pause',
      label: 'Pause Duration (ms)',
      type: 'number',
      defaultValue: 1000,
      required: false,
    },
  ],
  defaultConfig: {
    lines: 'Hi there, I am a developer! 👋;Building full-stack apps with TypeScript;Welcome to my GitHub profile!',
    color: '#36BCF7',
    size: 22,
    duration: 4000,
    pause: 1000,
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const rawLines = (props.lines as string) || 'Hi there! 👋';
    const lines = rawLines
      .split(';')
      .map(line => encodeURIComponent(line.trim()))
      .join(';');

    const color = ((props.color as string) || '#36BCF7').replace('#', '');
    const size = props.size || 22;
    const duration = props.duration || 4000;
    const pause = props.pause || 1000;
    const align = settings.align || 'left';
    const center = align === 'center' ? '&center=true' : '';

    const url = `https://readme-typing-svg.demolab.com?font=Fira+Code&size=${size}&duration=${duration}&pause=${pause}&color=${color}${center}&vCenter=true&width=500&lines=${lines}`;

    return {
      markdown: `<div align="${align}">\n  <a href="https://git.io/typing-svg">\n    <img src="${url}" alt="Typing SVG" />\n  </a>\n</div>`,
    };
  },
};
