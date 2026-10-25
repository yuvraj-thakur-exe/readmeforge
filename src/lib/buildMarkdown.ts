import { ReadmeConfig } from './plugins/types';
import { getPluginById } from './plugins/registry';

export interface BuildMarkdownResult {
  markdown: string;
  workflows: Record<string, string>;
}

export function buildMarkdown(config: ReadmeConfig): string {
  return buildMarkdownWithWorkflows(config).markdown;
}

export function buildMarkdownWithWorkflows(config: ReadmeConfig): BuildMarkdownResult {
  const workflows: Record<string, string> = {};
  const markdownParts: string[] = [];

  const { settings, sections } = config;
  const { user, align = 'left' } = settings;

  // Header / Bio Block if configured in user settings
  if (user.name || user.role || user.bio) {
    const headerLines: string[] = [];
    if (user.name) {
      headerLines.push(`# Hi there, I'm ${user.name} 👋`);
    }
    if (user.role) {
      headerLines.push(`### ${user.role}`);
    }
    if (user.bio) {
      headerLines.push(`\n${user.bio}\n`);
    }

    const metaItems: string[] = [];
    if (user.location) metaItems.push(`📍 Based in **${user.location}**`);
    if (user.status) metaItems.push(`🔭 Currently: **${user.status}**`);
    if (user.pronouns) metaItems.push(`💬 Pronouns: **${user.pronouns}**`);

    if (metaItems.length > 0) {
      headerLines.push(`\n- ${metaItems.join('\n- ')}\n`);
    }

    markdownParts.push(`<div align="${align}">\n\n${headerLines.join('\n\n')}\n\n</div>`);
  }

  // Iterate over sections and render via plugins
  for (const section of sections) {
    const plugin = getPluginById(section.type);

    if (plugin) {
      const output = plugin.renderMarkdown(section.props.content, settings);

      if (typeof output === 'string') {
        if (output.trim()) {
          markdownParts.push(output.trim());
        }
      } else if (output && output.markdown) {
        if (output.markdown.trim()) {
          markdownParts.push(output.markdown.trim());
        }
        if (output.workflows) {
          Object.assign(workflows, output.workflows);
        }
      }
    } else {
      // Fallback for custom or direct text blocks
      const content = section.props.content;
      if (typeof content?.text === 'string' && content.text.trim()) {
        const as = (content.as as string) || 'p';
        const text = content.text.trim();
        if (as === 'h1') markdownParts.push(`# ${text}`);
        else if (as === 'h2') markdownParts.push(`## ${text}`);
        else if (as === 'h3') markdownParts.push(`### ${text}`);
        else markdownParts.push(text);
      }
    }
  }

  // Footer attribution
  const footer = `\n---\n<p align="center">\n  <sub>⚡ Powered by <a href="https://readmeforge.dev"><b>ReadmeForge</b></a> — Forge a GitHub profile that gets noticed.</sub>\n</p>`;
  markdownParts.push(footer);

  const fullMarkdown = markdownParts.join('\n\n<br/>\n\n');

  return {
    markdown: fullMarkdown,
    workflows,
  };
}
