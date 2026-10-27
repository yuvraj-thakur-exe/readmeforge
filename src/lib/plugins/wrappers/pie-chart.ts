import { Plugin, UserSettings, resolveEffectiveUsername } from '../types';

export const pieChartPlugin: Plugin = {
  id: 'pie-chart',
  name: 'Skills & Language Pie Chart',
  description: 'Generate dynamic visual pie charts and donut charts representing skill distributions or language metrics.',
  author: 'ReadmeForge',
  repository: 'https://github.com/yuvraj-thakur-exe/readmeforge',
  category: 'stats',
  icon: 'pie-chart',
  fields: [
    {
      name: 'chartMode',
      label: 'Rendering Engine',
      type: 'select',
      defaultValue: 'donut',
      options: [
        { label: 'GitHub Languages Donut (Live GitHub Data)', value: 'top-langs-donut' },
        { label: 'GitHub Languages Pie (Live GitHub Data)', value: 'top-langs-pie' },
        { label: 'Mermaid Native Markdown Pie (Zero External Images)', value: 'mermaid' },
        { label: 'Custom Skill Breakdown (QuickChart Graphic)', value: 'custom-donut' },
      ],
      required: false,
    },
    {
      name: 'title',
      label: 'Chart Title',
      type: 'text',
      defaultValue: 'Core Technical Focus',
      required: false,
    },
    {
      name: 'theme',
      label: 'Color Palette',
      type: 'select',
      defaultValue: 'tokyonight',
      options: [
        { label: 'Tokyo Night', value: 'tokyonight' },
        { label: 'Radical Cyber', value: 'radical' },
        { label: 'Dracula', value: 'dracula' },
        { label: 'One Dark', value: 'onedark' },
        { label: 'Nord Ice', value: 'nord' },
      ],
      required: false,
    },
  ],
  defaultConfig: {
    chartMode: 'top-langs-donut',
    title: 'Core Technical Focus',
    theme: 'tokyonight',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const effectiveUser = resolveEffectiveUsername(props, settings);
    const user = encodeURIComponent(effectiveUser);
    const mode = (props.chartMode as string) || 'top-langs-donut';
    const title = (props.title as string) || 'Core Technical Focus';
    const theme = (props.theme as string) || 'tokyonight';
    const align = settings.align || 'center';

    const titleBlock = title ? `<p><strong>${title}</strong></p>\n  ` : '';

    if (mode === 'top-langs-donut') {
      const url = `https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=donut&langs_count=8&theme=${theme}&hide_border=false`;
      return {
        markdown: `<div align="${align}">\n  ${titleBlock}<a href="https://github.com/${user}">\n    <img src="${url}" alt="${user}'s Language Donut Chart" />\n  </a>\n</div>`,
      };
    }

    if (mode === 'top-langs-pie') {
      const url = `https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=pie&langs_count=8&theme=${theme}&hide_border=false`;
      return {
        markdown: `<div align="${align}">\n  ${titleBlock}<a href="https://github.com/${user}">\n    <img src="${url}" alt="${user}'s Language Pie Chart" />\n  </a>\n</div>`,
      };
    }

    if (mode === 'mermaid') {
      return {
        markdown: `\`\`\`mermaid\npie title ${title}\n    "Frontend Architecture" : 35\n    "Backend & Distributed APIs" : 30\n    "Cloud & DevOps Automation" : 20\n    "AI & Autonomous Workflows" : 15\n\`\`\``,
      };
    }

    // Default: Custom skill breakdown via QuickChart
    const qcConfig = encodeURIComponent(
      JSON.stringify({
        type: 'doughnut',
        data: {
          labels: ['Full-Stack', 'Cloud / SRE', 'AI Engineering', 'Open Source'],
          datasets: [{ data: [40, 25, 20, 15], backgroundColor: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'] }],
        },
        options: {
          plugins: {
            legend: { position: 'bottom', labels: { fontColor: '#f8fafc' } },
            title: { display: true, text: title, fontColor: '#f8fafc', fontSize: 16 },
          },
        },
      })
    );
    const qcUrl = `https://quickchart.io/chart?c=${qcConfig}&w=460&h=260&bkg=%230b0f19`;

    return {
      markdown: `<div align="${align}">\n  <img src="${qcUrl}" alt="${title}" width="440" />\n</div>`,
    };
  },
};
