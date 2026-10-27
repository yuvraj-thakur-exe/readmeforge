import { ReadmeConfig } from './plugins/types';
import { getPluginById } from './plugins/registry';

export interface BuildMarkdownResult {
  markdown: string;
  workflows: Record<string, string>;
}

/**
 * Strips dangerous executable script tags and unsafe event handlers from markdown inputs
 * while safely preserving standard markdown, emoji, unicode, tables, and fenced code blocks.
 */
export function sanitizeInputText(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/<(?:script|iframe|object|embed|applet|style)[\s\S]*?<\/(?:script|iframe|object|embed|applet|style)>/gi, '')
    .replace(/<\/?(?:script|iframe|object|embed|applet|style|base|form)[\s\S]*?>/gi, '')
    .replace(/on\w+\s*=\s*(?:["'][^"']*["']|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '');
}

export function buildMarkdown(config: ReadmeConfig): string {
  return buildMarkdownWithWorkflows(config).markdown;
}

export function buildMarkdownWithWorkflows(config: ReadmeConfig): BuildMarkdownResult {
  const workflows: Record<string, string> = {};
  const markdownParts: string[] = [];

  const settings = config?.settings || ({} as ReadmeConfig['settings']);
  const sections = Array.isArray(config?.sections) ? config.sections : [];
  const user = settings?.user || ({} as ReadmeConfig['settings']['user']);

  // Strict whitelist for layout alignment attribute
  const rawAlign = settings?.align;
  const align = rawAlign === 'center' || rawAlign === 'right' ? rawAlign : 'left';

  // Header / Bio Block if configured in user settings
  const name = sanitizeInputText(user.name || '');
  const role = sanitizeInputText(user.role || '');
  const bio = sanitizeInputText(user.bio || '');

  if (name || role || bio) {
    const headerLines: string[] = [];
    if (name) {
      headerLines.push(`# Hi there, I'm ${name} 👋`);
    }
    if (role) {
      headerLines.push(`### ${role}`);
    }
    if (bio) {
      headerLines.push(`\n${bio}\n`);
    }

    const metaItems: string[] = [];
    if (user.location) {
      metaItems.push(`📍 Based in **${sanitizeInputText(user.location)}**`);
    }
    if (user.status) {
      metaItems.push(`🔭 Currently: **${sanitizeInputText(user.status)}**`);
    }
    if (user.pronouns) {
      metaItems.push(`💬 Pronouns: **${sanitizeInputText(user.pronouns)}**`);
    }

    if (metaItems.length > 0) {
      headerLines.push(`\n- ${metaItems.join('\n- ')}\n`);
    }

    markdownParts.push(`<div align="${align}">\n\n${headerLines.join('\n\n')}\n\n</div>`);
  }

  // Iterate over sections and render via plugins
  for (const section of sections) {
    if (!section || !section.type) continue;
    const plugin = getPluginById(section.type);

    if (plugin) {
      try {
        const contentProps = section.props?.content || {};
        const output = plugin.renderMarkdown(contentProps, settings);

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
      } catch {
        // Resiliently isolate plugin errors without crashing full generation
      }
    } else {
      // Fallback for custom or direct text blocks
      const content = section.props?.content;
      if (typeof content?.text === 'string' && content.text.trim()) {
        const as = (content.as as string) || 'p';
        const text = sanitizeInputText(content.text.trim());
        if (as === 'h1') markdownParts.push(`# ${text}`);
        else if (as === 'h2') markdownParts.push(`## ${text}`);
        else if (as === 'h3') markdownParts.push(`### ${text}`);
        else markdownParts.push(text);
      } else if (typeof content?.markdown === 'string' && content.markdown.trim()) {
        markdownParts.push(sanitizeInputText(content.markdown.trim()));
      } else if (typeof content?.raw === 'string' && content.raw.trim()) {
        markdownParts.push(sanitizeInputText(content.raw.trim()));
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
