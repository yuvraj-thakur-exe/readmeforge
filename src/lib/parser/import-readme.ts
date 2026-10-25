import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { ReadmeConfig, SectionConfig } from '#/lib/plugins/types';
import { v4 as uuidv4 } from 'uuid';

export interface ImportResult {
  config: ReadmeConfig;
  detectedFeatures: string[];
}

export function importReadmeFromMarkdown(markdown: string): ImportResult {
  const detectedFeatures: string[] = [];

  const config: ReadmeConfig = {
    version: '1.0.0',
    title: 'Imported Profile',
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

  if (!markdown || !markdown.trim()) {
    return { config, detectedFeatures };
  }

  // Basic regex extractions for high-fidelity detection
  // 1. Detect GitHub username from stats / trophy cards
  const githubMatch = markdown.match(/(?:github-readme-stats|github-profile-trophy|github-readme-streak-stats)[^/]*\/api\?username=([a-zA-Z0-9_-]+)/i) ||
                      markdown.match(/github\.com\/([a-zA-Z0-9_-]+)(?:\/|\))/i);
  if (githubMatch && githubMatch[1] && githubMatch[1] !== 'readmeforge') {
    config.settings.user.github = githubMatch[1];
    detectedFeatures.push('GitHub Username');
  }

  // 2. Detect Name from primary heading `# Hi, I'm <Name>` or `# <Name>`
  const headingMatch = markdown.match(/^#+\s+(?:Hi(?:,\s+I'm|\s+there[!,]?\s+I'm)?\s+)?([^\n<]+)/im);
  if (headingMatch && headingMatch[1]) {
    const rawName = headingMatch[1].replace(/👋|✨|🚀/g, '').trim();
    if (rawName && !rawName.toLowerCase().startsWith('readme')) {
      config.settings.user.name = rawName;
      detectedFeatures.push('Name');
    }
  }

  // 3. Detect Role from secondary heading `## <Role>` or `### <Role>`
  const roleMatch = markdown.match(/^#{2,3}\s+([A-Za-z0-9\s/|&+-]+(?:Developer|Engineer|Designer|Architect|Student|Creator)[^\n<]*)/im);
  if (roleMatch && roleMatch[1]) {
    config.settings.user.role = roleMatch[1].trim();
    detectedFeatures.push('Role');
  }

  // 4. Parse AST with unified and remark
  try {
    const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);

    // Scan for stats widget
    if (/github-readme-stats/i.test(markdown)) {
      const statsSection: SectionConfig = {
        id: uuidv4(),
        type: 'github-readme-stats',
        props: {
          content: {
            username: config.settings.user.github || 'octocat',
            showIcons: true,
            theme: 'radical',
          },
          styles: {},
          state: 'default',
        },
      };
      config.sections.push(statsSection);
      detectedFeatures.push('GitHub Readme Stats');
    }

    // Scan for trophies
    if (/github-profile-trophy/i.test(markdown)) {
      const trophySection: SectionConfig = {
        id: uuidv4(),
        type: 'github-profile-trophy',
        props: {
          content: {
            username: config.settings.user.github || 'octocat',
            theme: 'onedark',
          },
          styles: {},
          state: 'default',
        },
      };
      config.sections.push(trophySection);
      detectedFeatures.push('GitHub Profile Trophy');
    }

    // Scan for snake
    if (/github-contribution-grid-snake|snk/i.test(markdown)) {
      const snkSection: SectionConfig = {
        id: uuidv4(),
        type: 'snk',
        props: {
          content: {
            username: config.settings.user.github || 'octocat',
            theme: 'dark',
          },
          styles: {},
          state: 'default',
        },
      };
      config.sections.push(snkSection);
      detectedFeatures.push('Contribution Snake');
    }

    // Scan for badges (shields.io)
    const badgeMatches = markdown.match(/https:\/\/img\.shields\.io\/badge\/[^\s)"]+/g);
    if (badgeMatches && badgeMatches.length > 0) {
      detectedFeatures.push(`${badgeMatches.length} Shields.io Badges`);
    }

    // Scan for bio lines starting with emoji bullet points
    const bioLines: string[] = [];
    const lines = markdown.split('\n');
    for (const line of lines) {
      if (/^[*-]\s*(?:🔭|🌱|👯|💬|📫|⚡|😄)\s*/.test(line)) {
        bioLines.push(line.replace(/^[*-]\s*/, '').trim());
      }
    }
    if (bioLines.length > 0) {
      config.settings.user.bio = bioLines.join('\n');
      detectedFeatures.push('Bio Bullet Points');
    }
  } catch {
    // Graceful fallback
  }

  return { config, detectedFeatures };
}
