import { Plugin, UserSettings } from '../types';

export const snkPlugin: Plugin = {
  id: 'snk',
  name: 'Contribution Snake (snk)',
  description: 'Generates a snake eating your contribution graph animation via GitHub Actions.',
  author: 'Platane',
  repository: 'https://github.com/Platane/snk',
  category: 'fun',
  icon: 'activity',
  fields: [
    {
      name: 'theme',
      label: 'Snake Theme',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark Mode (default)', value: 'dark' },
        { label: 'Light Mode', value: 'light' },
      ],
      required: false,
    },
  ],
  defaultConfig: {
    theme: 'dark',
  },
  renderMarkdown: (props: Record<string, unknown>, settings: UserSettings) => {
    const user = settings.user.github || 'username';
    const align = settings.align || 'left';
    const isDark = props.theme !== 'light';
    const filename = isDark
      ? 'github-contribution-grid-snake-dark.svg'
      : 'github-contribution-grid-snake.svg';

    const rawUrl = `https://raw.githubusercontent.com/${user}/${user}/output/${filename}`;

    const workflowYaml = `name: generate snake animation

on:
  schedule:
    - cron: "0 */24 * * *" 
  workflow_dispatch:
  push:
    branches:
    - master
    - main

jobs:
  generate:
    permissions: 
      contents: write
    runs-on: ubuntu-latest
    timeout-minutes: 5
    
    steps:
      - name: generate github-contribution-grid-snake.svg
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: \${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
          
      - name: push github-contribution-grid-snake.svg to the output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;

    return {
      markdown: `<div align="${align}">\n  <picture>\n    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake-dark.svg">\n    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake.svg">\n    <img alt="github contribution grid snake animation" src="${rawUrl}">\n  </picture>\n</div>`,
      workflows: {
        '.github/workflows/snake.yml': workflowYaml,
      },
    };
  },
};
