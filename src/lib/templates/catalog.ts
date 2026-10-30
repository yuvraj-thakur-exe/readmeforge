import { ReadmeConfig } from '#/lib/plugins/types';

export interface TemplateItem {
  id: string;
  name: string;
  description: string;
  category: string;
  accent: string;
  prompt: string;
  config: ReadmeConfig;
}

export function buildRichPrompt(item: {
  id: string;
  name: string;
  description: string;
  category: string;
  accent: string;
  prompt?: string;
  config: ReadmeConfig;
}): string {
  const user = item.config.settings.user;
  const settings = item.config.settings;
  const sections = item.config.sections;

  const hasFigma = sections.some(s => s.type === 'figma-design');
  const hasPinterest = sections.some(s => s.type === 'pinterest-image');
  const hasMascot = sections.some(s => s.type === 'mascot-bio');
  const hasTyping = sections.some(s => s.type === 'readme-typing-svg');
  const hasSnake = sections.some(s => s.type === 'snk');
  const hasCapsule = sections.some(s => s.type === 'capsule-banner');
  const hasTrophy = sections.some(s => s.type === 'github-profile-trophy');
  const has3D = sections.some(s => s.type === 'portfolio-contributions');

  const animationDirectives: string[] = [
    `1. Dynamic Hero Visuals: Use GitHub Camo-compliant SVG (0 scripts, 0 foreignObject, 60fps hardware-accelerated CSS animations).`,
  ];

  if (hasCapsule) {
    animationDirectives.push(`2. Capsule Hero Banner: Curved waving or geometric animated header with gradient colors tuned to ${item.accent}.`);
  }
  if (hasTyping) {
    animationDirectives.push(`3. Kinetic Typewriter: Real-time typing SVG terminal effect highlighting key engineering specializations.`);
  }
  if (hasMascot) {
    animationDirectives.push(`4. Vector Kinematics Mascot: Animated developer avatar / companion with idle hovering, thruster glow, or coffee steam.`);
  }
  if (hasSnake) {
    animationDirectives.push(`5. Retro Arcade Game: Interactive contribution snake eating through GitHub contribution blocks.`);
  }
  if (hasFigma) {
    animationDirectives.push(`6. Figma Design Integration: Interactive Figma showcase cards, token badges, and prototype links.`);
  }
  if (hasPinterest) {
    animationDirectives.push(`7. Aesthetic Visual Moodboard: Curated high-resolution design / anime moodboard via Pinterest integration.`);
  }
  if (hasTrophy) {
    animationDirectives.push(`8. Gamified Achievements: Golden trophy cards celebrating stars, pull requests, and commit streaks.`);
  }
  if (has3D) {
    animationDirectives.push(`9. 3D Contribution Landscape: Isometric skyscraper block visualization of GitHub contribution history.`);
  }

  const sectionsList =
    sections.length > 0
      ? sections.map((s, idx) => `  ${idx + 1}. [${s.type}]: ${JSON.stringify(s.props.content)}`).join('\n')
      : `  * Minimalist layout using structured markdown cards, crisp blockquotes, and targeted badge clusters.`;

  return [
    `You are an elite developer personal branding consultant and open-source portfolio engineer.`,
    `Generate an exceptional, high-impact, production-grade GitHub Profile README based on the "${item.name}" archetype.`,
    ``,
    `### 🎯 Developer Persona & Narrative`,
    `- **Professional Role**: ${user.role || item.name}`,
    `- **Engineering Philosophy**: ${user.bio || item.description}`,
    `- **Archetype Vibe & Focus**: ${item.description}`,
    `- **Visual Accent Color**: ${item.accent} (Base Theme: ${settings.theme})`,
    `- **Badge & Component Styling**: ${settings.badgeStyle} (Alignment: ${settings.align})`,
    `- **Domain & Category**: ${item.category}`,
    ``,
    `### 🎨 Visual Motion & Asset Directives`,
    ...animationDirectives,
    `- Strictly comply with GitHub Camo image proxy sanitizer standards (system font fallbacks, dark/light theme adaptability).`,
    ``,
    `### 🧩 Section Breakdown & Registered Plugins`,
    sectionsList,
    ``,
    `### 🛠️ Complete ReadmeForge Machine-Readable Configuration (JSON)`,
    `\`\`\`json`,
    JSON.stringify(item.config, null, 2),
    `\`\`\``,
    ``,
    `Generate the full, polished, copy-pasteable README.md output incorporating all the sections, aesthetics, and badges described above.`
  ].join('\n');
}

const RAW_TEMPLATES: TemplateItem[] = [
{
    id: 'minimalist',
    name: 'Minimalist Clean',
    description: 'Ultra-clean profile with understated typography, essential skills, and compact socials.',
    category: 'Minimal',
    accent: '#64748b',
    prompt:
      'Act as a principal developer branding specialist. Write an ultra-clean, minimalist GitHub profile README for a Software Craftsman. Keep typography understated, crisp, and high-impact. Include essential tech stack badges, a 1-sentence engineering philosophy, and compact social links without distracting widgets or bloated stat cards.',
    config: {
      version: '1.0.0',
      title: 'Minimalist Clean Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Alex Mercer',
          role: 'Software Craftsman',
          bio: 'Building minimal, reliable systems for the modern web.',
          location: 'San Francisco, CA',
          pronouns: 'they/them',
          status: 'Exploring distributed architectures',
        },
        theme: 'dark',
        accentColor: '#64748b',
        badgeStyle: 'flat',
        align: 'left',
      },
      sections: [],
    },
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk & Gamer',
    description: 'High-energy neon theme featuring contribution snake, trophies, and radical stat cards.',
    category: 'Gaming',
    accent: '#ec4899',
    prompt:
      'Generate a high-voltage Cyberpunk & Gamer developer GitHub profile README featuring neon pink/purple accents, contribution snake eating green dots, dark-mode 3D trophies, top-languages breakdown, and radical GitHub stats highlighting WebGL and game development.',
    config: {
      version: '1.0.0',
      title: 'Cyberpunk Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Neon Rider',
          role: 'Full-Stack Glitcher & Game Dev',
          bio: 'Synthesizing cybernetic code, WebGL shaders, and high-frequency algorithms.',
          location: 'Neo-Tokyo',
          pronouns: 'he/him',
          status: 'Leveling up Rust & Three.js',
        },
        theme: 'dark',
        accentColor: '#ec4899',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'snk-1',
          type: 'snk',
          props: { content: { username: 'octocat', theme: 'dark' }, styles: {}, state: 'default' },
        },
        {
          id: 'pie-cyber',
          type: 'pie-chart',
          props: { content: { chartMode: 'top-langs-donut', theme: 'radical', title: 'Top Languages Breakdown' }, styles: {}, state: 'default' },
        },
        {
          id: 'activity-cyber',
          type: 'activity-graph',
          props: { content: { color: 'EC4899', title: 'Annual Contribution Activity' }, styles: {}, state: 'default' },
        },
        {
          id: 'trophy-1',
          type: 'github-profile-trophy',
          props: { content: { username: 'octocat', theme: 'radical' }, styles: {}, state: 'default' },
        },
        {
          id: 'stats-1',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'radical', showIcons: true }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Polyglot',
    description: 'Dynamic typing-SVG banner, GitHub stats, skills matrix, and trophy rack.',
    category: 'Popular',
    accent: '#8b5cf6',
    prompt:
      'Generate a senior Full-Stack Polyglot GitHub profile README with a dynamic animated typing SVG header, a structured skills matrix categorized into Frontend, Backend, DevOps, and Cloud, commit velocity activity graph, and TokyoNight theme stats card highlighting end-to-end web architecture.',
    config: {
      version: '1.0.0',
      title: 'Full-Stack Developer Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Morgan Reed',
          role: 'Senior Full-Stack Engineer',
          bio: 'Turning complex business domains into elegant, scalable cloud software.',
          location: 'London, UK',
          pronouns: 'she/her',
          status: 'Architecting event-driven microservices',
        },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'typing-1',
          type: 'readme-typing-svg',
          props: {
            content: {
              lines: ['Senior Full-Stack Engineer', 'Open Source Contributor', 'Cloud Systems Enthusiast'],
              color: '8b5cf6',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'pie-fullstack',
          type: 'pie-chart',
          props: { content: { chartMode: 'top-langs-donut', theme: 'tokyonight', title: 'Top Languages Breakdown' }, styles: {}, state: 'default' },
        },
        {
          id: 'activity-fullstack',
          type: 'activity-graph',
          props: { content: { color: '6366F1', title: 'Commit Velocity & Contribution Graph' }, styles: {}, state: 'default' },
        },
        {
          id: 'stats-1',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'tokyonight', showIcons: true }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'cloud-architect',
    name: 'Cloud & DevOps Master',
    description: 'Designed for SREs and platform engineers highlighting Kubernetes, Terraform, and CI/CD.',
    category: 'DevOps',
    accent: '#06b6d4',
    prompt:
      'Act as a Staff Platform & SRE Engineer. Write a modern GitHub profile README focusing on multi-region Kubernetes, Terraform IaC, automated GitOps CI/CD pipelines, high-velocity deployment metrics, and zero-trust mesh architectures.',
    config: {
      version: '1.0.0',
      title: 'Cloud DevOps Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Jordan Rivera',
          role: 'Staff Platform & SRE Engineer',
          bio: 'Automating everything between commit and production across multi-region Kubernetes.',
          location: 'Seattle, WA',
          pronouns: 'he/him',
          status: 'Hardening GitOps & zero-trust meshes',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'activity-cloud',
          type: 'activity-graph',
          props: { content: { color: '06B6D4', title: 'Platform Deployment & Commit Velocity' }, styles: {}, state: 'default' },
        },
        {
          id: 'stats-cloud',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'nord', showIcons: true }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'ai-ml',
    name: 'AI & Data Scientist',
    description: 'Showcase deep learning research, Python stacks, Hugging Face models, and paper citations.',
    category: 'AI / ML',
    accent: '#10b981',
    prompt:
      'Write a scientific, research-focused AI & Data Scientist GitHub profile README. Highlight transformer architectures, PyTorch and Hugging Face repositories, arXiv research citations, dataset contributions, and clean training velocity charts.',
    config: {
      version: '1.0.0',
      title: 'AI Researcher Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Dr. Evelyn Zhang',
          role: 'AI Researcher & ML Engineer',
          bio: 'Investigating transformer architectures, multi-modal reasoning, and efficient fine-tuning.',
          location: 'Toronto, Canada',
          pronouns: 'she/her',
          status: 'Training diffusion and LLM agent models',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'flat',
        align: 'left',
      },
      sections: [
        {
          id: 'pie-aiml',
          type: 'pie-chart',
          props: { content: { chartMode: 'top-langs-pie', theme: 'tokyonight', title: 'Languages & Research Distribution' }, styles: {}, state: 'default' },
        },
        {
          id: 'activity-aiml',
          type: 'activity-graph',
          props: { content: { color: '10B981', title: 'Model Training & Commit Velocity' }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'oss-maintainer',
    name: 'Open-Source Maintainer',
    description: 'Equipped with visitor counter, contribution chart, WakaTime metrics, and sponsorship links.',
    category: 'Open Source',
    accent: '#f59e0b',
    prompt:
      'Generate an Open-Source Maintainer GitHub profile README with a real-time visitor counter, global contributor guidelines, key project badges, sponsorship links (GitHub Sponsors/Patreon), and an active community contribution chart.',
    config: {
      version: '1.0.0',
      title: 'OSS Maintainer Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Samir Patel',
          role: 'Open-Source Craftsman & Author',
          bio: 'Maintaining developer tools loved by 50,000+ developers worldwide.',
          location: 'Berlin, Germany',
          pronouns: 'he/they',
          status: 'Building next-gen CLI productivity suites',
        },
        theme: 'dark',
        accentColor: '#f59e0b',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'counter-1',
          type: 'visitor-counter',
          props: { content: { username: 'octocat', color: 'f59e0b', style: 'for-the-badge' }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'mobile-dev',
    name: 'Mobile & Cross-Platform',
    description: 'Optimized for Flutter, React Native, Swift, and Kotlin mobile engineers.',
    category: 'Mobile',
    accent: '#38bdf8',
    prompt:
      'Generate a mobile engineer GitHub profile README highlighting cross-platform iOS & Android applications built with Flutter, React Native, Swift, and Kotlin, with links to App Store / Google Play showcases and 60fps mobile architecture notes.',
    config: {
      version: '1.0.0',
      title: 'Mobile Engineer Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Mateo Silva',
          role: 'Staff Mobile Engineer (iOS & Android)',
          bio: 'Building 60fps native mobile experiences, offline-first architectures, and design systems.',
          location: 'Austin, TX',
          pronouns: 'he/him',
          status: 'Shipping cross-platform Flutter & Swift apps',
        },
        theme: 'dark',
        accentColor: '#38bdf8',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'activity-mobile',
          type: 'activity-graph',
          props: { content: { color: '38BDF8', title: 'Mobile Release Velocity & Commits' }, styles: {}, state: 'default' },
        },
        {
          id: 'stats-mobile',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'tokyonight', showIcons: true }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'security-researcher',
    name: 'Cybersecurity & DevSecOps',
    description: 'Tailored for penetration testers, security researchers, and DevSecOps practitioners.',
    category: 'Security',
    accent: '#ef4444',
    prompt:
      'Generate a Cybersecurity & DevSecOps Engineer GitHub profile README featuring an ethical hacking bug bounty showcase, CVE discovery tracker, security auditing methodology, and hardened CI/CD pipeline automation metrics.',
    config: {
      version: '1.0.0',
      title: 'Security Researcher Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Cipher Nova',
          role: 'Offensive Security & DevSecOps Lead',
          bio: 'Auditing cryptographic primitives, discovering CVEs, and engineering zero-trust pipelines.',
          location: 'Stockholm, Sweden',
          pronouns: 'they/them',
          status: 'Hunting bug bounties & hardening clusters',
        },
        theme: 'dark',
        accentColor: '#ef4444',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'typing-security',
          type: 'readme-typing-svg',
          props: {
            content: {
              lines: ['Offensive Security Researcher', 'DevSecOps Specialist', 'Bug Bounty Hunter'],
              color: 'ef4444',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-security',
          type: 'activity-graph',
          props: { content: { color: 'EF4444', title: 'Exploit Research & Patch Velocity' }, styles: {}, state: 'default' },
        },
        {
          id: 'trophy-security',
          type: 'github-profile-trophy',
          props: { content: { username: 'octocat', theme: 'radical' }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'creative-frontend',
    name: 'Creative Frontend & UI/UX',
    description: 'Vibrant showcase for WebGL, 3D Canvas, design system creators, and creative coders.',
    category: 'Design',
    accent: '#c084fc',
    prompt:
      'Write a vibrant Creative Technologist & UI/UX Designer GitHub profile README emphasizing WebGL shaders, Three.js 3D Canvas, physics-based micro-interactions, accessible design systems, and creative web experiments.',
    config: {
      version: '1.0.0',
      title: 'Creative Frontend Developer Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Aria Vance',
          role: 'Creative Technologist & UI/UX Designer',
          bio: 'Harmonizing physics shaders, micro-interactions, and accessible design tokens on the web.',
          location: 'Tokyo / Remote',
          pronouns: 'she/her',
          status: 'Crafting WebGL shaders and interactive 3D portfolios',
        },
        theme: 'dark',
        accentColor: '#c084fc',
        badgeStyle: 'flat',
        align: 'center',
      },
      sections: [
        {
          id: 'snk-creative',
          type: 'snk',
          props: { content: { username: 'octocat', theme: 'dark' }, styles: {}, state: 'default' },
        },
        {
          id: 'pie-creative',
          type: 'pie-chart',
          props: { content: { chartMode: 'top-langs-donut', theme: 'radical', title: 'Creative Stack Breakdown' }, styles: {}, state: 'default' },
        },
        {
          id: 'stats-creative',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'radical', showIcons: true }, styles: {}, state: 'default' },
        },
        {
          id: 'figma-showcase-creative',
          type: 'figma-design',
          props: {
            content: {
              style: 'showcase-card',
              projectName: 'WebGL UI & Physics Shaders Kit',
              figmaUrl: 'https://figma.com/@creativetech',
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'cs-student',
    name: 'CS Student & Competitive Coder',
    description: 'Designed for university students and coding bootcamp graduates highlighting algorithms.',
    category: 'Student',
    accent: '#3b82f6',
    prompt:
      'Write a standout Computer Science Student & Competitive Coder GitHub profile README. Highlight LeetCode problem-solving milestone trophies, core algorithms, data structures coursework, open-source pull requests, and summer software internship objectives.',
    config: {
      version: '1.0.0',
      title: 'CS Student & Aspiring Software Engineer',
      settings: {
        user: {
          github: 'octocat',
          name: 'Lucas Kim',
          role: 'Computer Science Student & LeetCode Enthusiast',
          bio: 'Passionate about algorithms, low-latency systems, and building open-source developer tooling.',
          location: 'Seoul / California',
          pronouns: 'he/him',
          status: 'Seeking Summer 2027 Software Engineering Internships',
        },
        theme: 'dark',
        accentColor: '#3b82f6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'trophy-student',
          type: 'github-profile-trophy',
          props: { content: { username: 'octocat', theme: 'tokyonight' }, styles: {}, state: 'default' },
        },
        {
          id: 'activity-student',
          type: 'activity-graph',
          props: { content: { color: '3B82F6', title: 'Daily Problem Solving & Commit Velocity' }, styles: {}, state: 'default' },
        },
        {
          id: 'stats-student',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'tokyonight', showIcons: true }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'forge-telemetry-dashboard',
    name: 'Developer Telemetry Dashboard',
    description: 'High-impact telemetry dashboard with PageSpeed scores, 3D isometric calendar, commit activity graphs, and tech icons.',
    category: 'Popular',
    accent: '#10b981',
    prompt:
      'Generate a dark-mode GitHub profile README featuring a developer telemetry dashboard with PageSpeed insights scores, 3D isometric contributions calendar, coding habits hourly/daily activity graphs, top languages breakdown, and mastered technologies icon grid.',
    config: {
      version: '1.0.0',
      title: 'Developer Telemetry Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Alex Rivers',
          role: 'Principal Systems Architect & Open-Source Engineer',
          bio: 'Designing resilient distributed systems, high-throughput pipelines, and developer tooling.',
          location: 'San Francisco, CA',
          pronouns: 'they/them',
          status: 'Benchmarking low-latency architectures',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'telemetry-pagespeed',
          type: 'custom',
          props: {
            content: {
              markdown: `<div align="center">\n  <img src="https://img.shields.io/badge/Performance-97%25-10B981?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Performance" />\n  <img src="https://img.shields.io/badge/Accessibility-100%25-10B981?style=for-the-badge&logo=w3c&logoColor=white" alt="Accessibility" />\n  <img src="https://img.shields.io/badge/Best_Practices-100%25-10B981?style=for-the-badge&logo=lighthouse&logoColor=white" alt="Best Practices" />\n  <img src="https://img.shields.io/badge/SEO-100%25-10B981?style=for-the-badge&logo=google&logoColor=white" alt="SEO" />\n</div>`,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'contrib-3d',
          type: 'portfolio-contributions',
          props: { content: { username: 'octocat' }, styles: {}, state: 'default' },
        },
        {
          id: 'activity-metrics',
          type: 'activity-graph',
          props: { content: { color: '10B981', title: 'Commit Velocity & Habits' }, styles: {}, state: 'default' },
        },
        {
          id: 'pie-metrics',
          type: 'pie-chart',
          props: { content: { chartMode: 'top-langs-donut', theme: 'tokyonight', title: 'Language Activity & Distribution' }, styles: {}, state: 'default' },
        },
        {
          id: 'skills-metrics',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'js,ts,python,cpp,vue,docker,git,aws,gcp,arduino,raspberrypi,linux,bash,react',
              theme: 'dark',
              perLine: 14,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-metrics',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'tokyonight', showIcons: true }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'neon-craftsman-owl',
    name: 'Purple Neon & Digital Craftsman',
    description: 'Curved waving purple neon banner (HELLO WORLD), two-column layout with emoji status bullets and a celebratory owl party popper mascot sticker.',
    category: 'Design',
    accent: '#9333ea',
    prompt:
      'Generate a vibrant developer profile featuring a curved waving purple neon header banner (HELLO WORLD / WELCOME TO MY PROFILE), two-column layout with emoji status bullets on the left and a celebratory owl party popper mascot on the right, profile views counter badge, and tech stack.',
    config: {
      version: '1.0.0',
      title: 'Digital Craftsman Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Morgan Reed',
          role: 'Digital Craftsman (Developer / Programmer)',
          bio: 'Full Stack Developer and Systems Enthusiast with a passion for Python, TypeScript, React, distributed data pipelines, and elegant UI.',
          location: 'Remote / Global',
          pronouns: 'they/them',
          status: 'Exploring AI reasoning agents & distributed nodes',
        },
        theme: 'dark',
        accentColor: '#9333ea',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'banner-neon',
          type: 'capsule-banner',
          props: {
            content: {
              bannerType: 'waving',
              colorTheme: 'purple-neon',
              text: 'HELLO WORLD',
              desc: 'WELCOME TO MY PROFILE',
              height: 220,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'mascot-craftsman',
          type: 'mascot-bio',
          props: {
            content: {
              mascot: 'owl-confetti',
              headline: "⚡ I'm a Digital Craftsman!",
              subtitle: 'Digital Craftsman (Developer / Programmer)',
              bio: 'Full Stack Developer and Systems Enthusiast with a passion for Python, TypeScript, React, distributed data pipelines, and elegant UI.',
              bullets: "🌱 Student of life :)\n🔭 Currently learning distributed systems, cloud-native Go, and AI reasoning agents\n👨‍💻 Lifetime open-source contributor and technical mentor\n✍️ I write technical deep dives on systems engineering\n🤝 Passionate about collaborative open-source\n📫 Connect with me to discuss architectures and projects",
              showViewsBadge: true,
              viewsBadgeColor: '9333ea',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-craftsman',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'python,react,nodejs,django,postgres,fastapi,typescript,docker,git,linux',
              theme: 'dark',
              perLine: 12,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-craftsman',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'radical', showIcons: true }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'minimal-light-unicorn',
    name: 'Minimal Light & Coding Unicorn',
    description: 'Clean light-mode layout with centered greeting, monochromatic social badges row, checkmarked bio achievements, and cute pastel coding unicorn at laptop sticker.',
    category: 'Minimal',
    accent: '#3b82f6',
    prompt:
      'Generate a clean, light-themed developer profile README with centered friendly greeting, monochromatic social badges row, two-column layout with checkmarked bio achievements and a cute pastel coding unicorn at laptop sticker on the right, skill icons grid, and light GitHub stats.',
    config: {
      version: '1.0.0',
      title: 'Minimal Light Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Jordan Lee',
          role: 'Software Engineer | Technical Writer | Open Source Enthusiast',
          bio: 'A budding Full-Stack Software Developer & Systems Craftsman who is obsessed with the idea of writing clean, resilient code and building delightful digital experiences.',
          location: 'Global / Remote',
          pronouns: 'they/them',
          status: 'Building delightful developer tools',
        },
        theme: 'light',
        accentColor: '#3b82f6',
        badgeStyle: 'flat',
        align: 'center',
      },
      sections: [
        {
          id: 'socials-unicorn',
          type: 'custom',
          props: {
            content: {
              markdown: `<div align="center">\n  <a href="https://linkedin.com"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n  <a href="https://dev.to"><img src="https://img.shields.io/badge/Dev.to-0A0A0A?style=flat&logo=devdotto&logoColor=white" alt="Dev.to" /></a>\n  <a href="https://leetcode.com"><img src="https://img.shields.io/badge/LeetCode-FFA116?style=flat&logo=leetcode&logoColor=black" alt="LeetCode" /></a>\n  <a href="https://medium.com"><img src="https://img.shields.io/badge/Medium-12100E?style=flat&logo=medium&logoColor=white" alt="Medium" /></a>\n  <a href="https://github.com/octocat"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub" /></a>\n</div>`,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'mascot-unicorn',
          type: 'mascot-bio',
          props: {
            content: {
              mascot: 'coding-unicorn',
              headline: '🌟 Talking about Personal Stuffs...',
              subtitle: 'Software Engineer & Technical Content Writer',
              bio: 'Learning while HOPING & HUSTLING! Building scalable apps and sharing knowledge along the way.',
              bullets: "✔ Pronouns: they/them\n✔ Currently developing payment gateways & microservices\n✔ Learning ReactJS, NodeJS & cloud architecture\n✔ Looking to collaborate on high-impact open source\n✔ Regularly writing technical blogs and tutorials\n✔ Active problem solver on LeetCode\n✔ Fun fact: I turn coffee into clean, well-tested commits",
              showViewsBadge: true,
              viewsBadgeColor: '3b82f6',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-unicorn',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'c,cpp,python,flask,css,html,js,nodejs,react,sass,git,linux',
              theme: 'light',
              perLine: 12,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-unicorn',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'default', showIcons: true }, styles: {}, state: 'default' },
        },
        {
          id: 'snk-unicorn',
          type: 'snk',
          props: { content: { username: 'octocat', theme: 'light' }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'constellation-devops-desk',
    name: 'Constellation DevOps & Workstation',
    description: 'Dark constellation cyberpunk DevOps engineer profile with deep space banner, SRE bullet points, and programmer at workstation desk illustration.',
    category: 'DevOps',
    accent: '#38bdf8',
    prompt:
      'Generate a dark constellation cyberpunk DevOps engineer GitHub profile README with a dark starfield banner, two-column layout featuring SRE/DevOps cloud bullets on the left and a programmer with beanie and glasses at workstation desk illustration on the right, followed by cloud stack badges and GitHub stats.',
    config: {
      version: '1.0.0',
      title: 'Constellation DevOps Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Samir Patel',
          role: 'DevOps & Cloud Infrastructure Engineer',
          bio: 'Automating everything between commit and production across multi-region Kubernetes, Terraform IaC, and zero-trust GitOps pipelines.',
          location: 'Remote / Global',
          pronouns: 'he/him',
          status: 'Hardening Kubernetes clusters & eBPF observability',
        },
        theme: 'dark',
        accentColor: '#38bdf8',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-devops',
          type: 'capsule-banner',
          props: {
            content: {
              bannerType: 'rect',
              colorTheme: 'dark-constellation',
              text: 'Hey! I am a DevOps Engineer',
              desc: 'Automating everything between commit and production',
              height: 180,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'mascot-devops',
          type: 'mascot-bio',
          props: {
            content: {
              mascot: 'developer-desk',
              headline: "Hi 👋, I'm a DevOps Engineer",
              subtitle: 'Passionate and aspiring DevOps & Cloud Infrastructure Engineer',
              bio: 'Dedicated to high-availability distributed systems, automated CI/CD pipelines, and infrastructure as code.',
              bullets: "🔭 Currently engineering multi-region Kubernetes clusters\n🌱 Learning eBPF, service mesh observability, and zero-trust security\n👨‍💻 Stack: Git, Docker, Kubernetes, Jenkins, Ansible, AWS, GCP, Grafana\n⚡ Passionate about automated testing, 99.99% uptime, and sub-minute deploys\n📫 Reach out to collaborate on platform engineering",
              showViewsBadge: true,
              viewsBadgeColor: '38bdf8',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-devops',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'docker,kubernetes,aws,gcp,linux,git,ansible,grafana,prometheus,bash,python,go',
              theme: 'dark',
              perLine: 12,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-devops',
          type: 'activity-graph',
          props: { content: { color: '38BDF8', title: 'Platform Deployment & Commit Velocity' }, styles: {}, state: 'default' },
        },
        {
          id: 'stats-devops',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'tokyonight', showIcons: true }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'isometric-terminal-connect',
    name: 'Isometric Terminal & Fullstack Connect',
    description: '3D isometric terminal cube header banner, Competitive Programmer subtitle, vibrant "Let\'s Connect and have a Chat!" callout with colorful rounded social badge arsenal, skills matrix, and trophy rack.',
    category: 'Popular',
    accent: '#6366f1',
    prompt:
      'Generate a dark full-stack engineer GitHub profile README featuring a 3D isometric terminal cube header banner, Competitive Programmer subtitle, vibrant "Let\'s Connect and have a Chat!" callout with colorful rounded social badge arsenal, skills matrix, and trophy rack.',
    config: {
      version: '1.0.0',
      title: 'Fullstack Terminal Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Casey Vance',
          role: 'Full-Stack Developer & Competitive Programmer',
          bio: 'Passionate developer specializing in Spring Boot, MERN stack, high-frequency algorithms, and cloud architectures.',
          location: 'Remote / Global',
          pronouns: 'they/them',
          status: 'Solving algorithmic puzzles & building full-stack platforms',
        },
        theme: 'dark',
        accentColor: '#6366f1',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'banner-terminal',
          type: 'capsule-banner',
          props: {
            content: {
              bannerType: 'cylinder',
              colorTheme: 'cyber-cylinder',
              text: "Hey ! I'm a Full-Stack Developer",
              desc: '>_ Competitive Programmer & Cloud Architect',
              height: 200,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'connect-socials',
          type: 'custom',
          props: {
            content: {
              markdown: `<div align="center">\n  <h3>Let's Connect and have a Chat! 💭</h3>\n  <a href="https://github.com/octocat"><img src="https://img.shields.io/badge/Portfolio-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" /></a>\n  <a href="https://linkedin.com"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n  <a href="https://dev.to"><img src="https://img.shields.io/badge/DEV.TO-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white" alt="Dev.to" /></a>\n  <a href="https://twitter.com"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>\n  <a href="https://instagram.com"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>\n</div>`,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-terminal',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'java,spring,ts,react,nodejs,mongodb,docker,git,mysql,aws,redux,tailwind',
              theme: 'dark',
              perLine: 12,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'trophy-terminal',
          type: 'github-profile-trophy',
          props: { content: { username: 'octocat', theme: 'radical' }, styles: {}, state: 'default' },
        },
        {
          id: 'activity-terminal',
          type: 'activity-graph',
          props: { content: { color: '6366F1', title: 'Commit Velocity & Contribution Graph' }, styles: {}, state: 'default' },
        },
        {
          id: 'stats-terminal',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'tokyonight', showIcons: true }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'wow-3d-city-cat',
    name: '#1 Wow Profile (3D City & Peeking Cat)',
    description: 'Turn your GitHub profile into a work of art with a peeking black cat mascot, retro pixel-art avatar header, 3D isometric contribution city, glowing language stack, and featured projects.',
    category: 'Popular',
    accent: '#10b981',
    prompt:
      'Act as a principal developer branding architect. Generate a stunning #1 Wow Profile GitHub README turning the profile into a work of art. Include a peeking black cat mascot header, animated dark macOS window frame, developer headline with skill badges (Kotlin, Rust, JavaScript, Python), retro pixel-art avatar, 3D isometric contribution city graph ("The city I built this year" with 672 contributions, 112 active days), glowing horizontal repository-weighted language stack bars, and a dual-card featured projects showcase with ring completion charts.',
    config: {
      version: '1.0.0',
      title: '#1 Wow Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Alex Rivers',
          role: 'Frontend or full-stack engineer',
          bio: 'Turning code into interactive digital art, craft architectures, and playful user experiences.',
          location: 'San Francisco / Remote',
          pronouns: 'he/him',
          status: 'Crafting WebGL shaders & Rust runtimes',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'peeking-cat-hero',
          type: 'custom',
          props: {
            content: {
              markdown: `<div align="center">\n  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/public/assets/wow-profile-full.svg" width="100%" alt="#1 Wow Profile 3D City & Peeking Cat" />\n</div>`,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'city-contrib-3d',
          type: 'portfolio-contributions',
          props: { content: { username: 'octocat' }, styles: {}, state: 'default' },
        },
        {
          id: 'language-stack-skills',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'kotlin,rust,javascript,python,typescript,react,docker,git',
              theme: 'dark',
              perLine: 12,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-city',
          type: 'activity-graph',
          props: { content: { color: '10B981', title: 'Commit Velocity & Habits' }, styles: {}, state: 'default' },
        },
        {
          id: 'stats-city',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'tokyonight', showIcons: true }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'bento-signal-dashboard',
    name: '#5 Signal Dashboard (Bento Grid & Anime Cat)',
    description: 'Data-driven GitHub stats bento grid with anime cinematic banner, live profile signal metrics (Stars, Commits, Repos, Followers), emerald contribution activity graph, and featured repo showcase.',
    category: 'Popular',
    accent: '#38bdf8',
    prompt:
      'Generate a dark, modern #5 Signal Dashboard GitHub profile README turning GitHub stats into a data-driven story. Feature a sleek macOS bento header with moody anime silhouette banner art, "A developer who builds in public" bio with tag pills (Developer, Open-Source, Building, Learning, Shipping), live profile signal metric widgets (Stars, Contributions, Repositories, Followers with icons), annual contribution heatmap activity graph in emerald green, repository-weighted language stack, and featured repositories showcase cards with star counts.',
    config: {
      version: '1.0.0',
      title: '#5 Signal Dashboard',
      settings: {
        user: {
          github: 'octocat',
          name: 'Casey Vance',
          role: 'A developer who builds in public',
          bio: 'I like turning ideas into useful software, learning in public, and collaborating with great people.',
          location: 'Global / Remote',
          pronouns: 'they/them',
          status: 'Shipping open source & learning in public',
        },
        theme: 'dark',
        accentColor: '#38bdf8',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'bento-hero-banner',
          type: 'custom',
          props: {
            content: {
              markdown: `<div align="center">\n  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/public/assets/bento-dashboard-full.svg" width="100%" alt="#5 Signal Dashboard Bento Grid" />\n</div>`,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-bento',
          type: 'activity-graph',
          props: { content: { color: '10B981', title: 'Annual Contribution Activity' }, styles: {}, state: 'default' },
        },
        {
          id: 'languages-bento',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'c,rust,python,bash,linux,docker,git,react,typescript',
              theme: 'dark',
              perLine: 12,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'trophy-bento',
          type: 'github-profile-trophy',
          props: { content: { username: 'octocat', theme: 'tokyonight' }, styles: {}, state: 'default' },
        },
        {
          id: 'stats-bento',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'tokyonight', showIcons: true }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'pinterest-lofi-aesthetic',
    name: 'Aesthetic Lo-Fi & Pinterest Art',
    description: 'Vibrant, cozy developer profile with animated Lo-Fi midnight coding desk artwork from Pinterest, ambient music player, aesthetic tech badges, and clean stats.',
    category: 'Design',
    accent: '#ec4899',
    prompt:
      'Generate an aesthetic Lo-Fi developer GitHub profile README featuring a cozy animated Pinterest midnight coding desk artwork banner, ambient playlist aesthetics, pastel tech badges, gentle typography, and clean GitHub contribution activity stats.',
    config: {
      version: '1.0.0',
      title: 'Aesthetic Lo-Fi Profile',
      settings: {
        user: {
          github: 'octocat',
          name: 'Aria Vance',
          role: 'Creative Technologist & Lo-Fi Enthusiast',
          bio: 'Turning coffee, ambient synth, and midnight ideas into elegant digital software.',
          location: 'Tokyo / Remote',
          pronouns: 'she/her',
          status: 'Listening to Lo-Fi beats & shipping creative UI',
        },
        theme: 'dark',
        accentColor: '#ec4899',
        badgeStyle: 'for-the-badge',
        align: 'center',
      },
      sections: [
        {
          id: 'pinterest-art-1',
          type: 'pinterest-image',
          props: {
            content: {
              preset: 'lofi-coder',
              width: '100%',
              caption: '✦ Turning coffee and midnight playlists into clean software architectures ✦',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'typing-aesthetic',
          type: 'readme-typing-svg',
          props: {
            content: {
              lines: ['Creative Technologist', 'Aesthetic Web Architect', 'Midnight Lo-Fi Coder'],
              color: 'ec4899',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-aesthetic',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'ts,react,nextjs,tailwind,nodejs,python,docker,git',
              theme: 'dark',
              perLine: 12,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-aesthetic',
          type: 'activity-graph',
          props: { content: { color: 'EC4899', title: 'Aesthetic Commit Velocity' }, styles: {}, state: 'default' },
        },
        {
          id: 'stats-aesthetic',
          type: 'github-readme-stats',
          props: { content: { username: 'octocat', theme: 'radical', showIcons: true }, styles: {}, state: 'default' },
        },
      ],
    },
  },
  {
    id: 'data-engineer-streaming',
    name: 'Data Engineer & Stream Processor',
    description: 'High-throughput data pipelines, Kafka streaming, Spark transformations, and Snowflake analytics warehouse.',
    category: 'AI & Data',
    accent: '#0284c7',
    prompt: 'Act as a staff data engineer. Generate a production-grade GitHub profile README highlighting streaming data pipelines, event architectures, Kafka, PySpark, Snowflake, and DBT telemetry.',
    config: {
      version: '1.0.0',
      title: 'Data Engineer & Stream Processor',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Staff Data Platform Engineer',
          bio: 'Architecting petabyte-scale real-time streaming architectures, distributed DAG workflows, and reliable analytics lakehouses.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#0284c7',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-data-engineer-streaming',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Data Platform & Distributed Systems',
              desc: 'Streaming billions of events per second with sub-second latency',
              color: '0:0f172a,100:0284c7',
              textColor: 'ffffff',
              descColor: '0284c7',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-data-engineer-streaming',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'python,kafka,apache,spark,postgres,docker,aws,linux,git,bash',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-data-engineer-streaming',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '0284c7',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-data-engineer-streaming',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'game-dev-3d-graphics',
    name: '3D Game Developer & Graphics Engineer',
    description: 'Real-time ray tracing, custom HLSL/GLSL shaders, Unreal Engine 5, Unity, and procedural generation.',
    category: 'Design',
    accent: '#ec4899',
    prompt: 'Write an elite GitHub profile README for an Unreal Engine 5 & C++ graphics engineer with particle shaders and game physics telemetry.',
    config: {
      version: '1.0.0',
      title: '3D Game Developer & Graphics Engineer',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Lead Graphics & Game Engine Programmer',
          bio: 'Pushing real-time rendering boundaries with compute shaders, Nanite geometries, and immersive WebGL simulations.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#ec4899',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-game-dev-3d-graphics',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: '3D Graphics & Game Engine Architecture',
              desc: 'Translating mathematical equations into living, breathing real-time worlds',
              color: '0:0f172a,100:ec4899',
              textColor: 'ffffff',
              descColor: 'ec4899',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-game-dev-3d-graphics',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'cpp,rust,unity,unreal,blender,js,webgl,git,linux',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-game-dev-3d-graphics',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'ec4899',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-game-dev-3d-graphics',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'web3-solidity-defi',
    name: 'Web3 & DeFi Smart Contract Architect',
    description: 'Gas-optimized EVM bytecode, formal smart contract verification, Foundry test suites, and decentralized finance.',
    category: 'Mobile & Web3',
    accent: '#8b5cf6',
    prompt: 'Create a high-security Web3 protocol engineer GitHub README showcasing audited smart contracts, zero-knowledge circuits, and DeFi protocols.',
    config: {
      version: '1.0.0',
      title: 'Web3 & DeFi Smart Contract Architect',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Smart Contract & Protocol Security Architect',
          bio: 'Designing trustless economic mechanisms, gas-optimized Solidity primitives, and mathematically verified zk-SNARK protocols.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-web3-solidity-defi',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Trustless Decentralized Protocols',
              desc: 'Formal verification, sub-21k gas execution, and cryptographic security',
              color: '0:0f172a,100:8b5cf6',
              textColor: 'ffffff',
              descColor: '8b5cf6',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-web3-solidity-defi',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'solidity,rust,ethereum,ts,ipfs,git,linux,bash',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-web3-solidity-defi',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '8b5cf6',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-web3-solidity-defi',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'embedded-iot-firmware',
    name: 'Embedded Systems & IoT Firmware Engineer',
    description: 'Bare-metal C/C++, FreeRTOS multitasking, STM32 microcontrollers, low-power Bluetooth, and hardware drivers.',
    category: 'Systems',
    accent: '#10b981',
    prompt: 'Write an embedded firmware engineer profile with hardware pinouts, FreeRTOS telemetry, and microsecond-accurate timer loops.',
    config: {
      version: '1.0.0',
      title: 'Embedded Systems & IoT Firmware Engineer',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Senior Embedded Firmware & IoT Specialist',
          bio: 'Bridging software and physical silicon through bare-metal drivers, real-time operating systems, and energy-harvested sensors.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-embedded-iot-firmware',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Bare-Metal & Real-Time Firmware',
              desc: 'Deterministic execution in microsecond budgets on resource-constrained silicon',
              color: '0:0f172a,100:10b981',
              textColor: 'ffffff',
              descColor: '10b981',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-embedded-iot-firmware',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'c,cpp,rust,linux,arduino,raspberrypi,git,bash',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-embedded-iot-firmware',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '10b981',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-embedded-iot-firmware',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'creative-technologist-motion',
    name: 'Creative Technologist & Interaction Designer',
    description: 'Fluid GLSL canvas shaders, reactive micro-interactions, generative SVG animations, and design systems.',
    category: 'Design',
    accent: '#f43f5e',
    prompt: 'Write a breathtaking Creative Technologist GitHub profile featuring interactive motion design, WebGL experiments, and UI aesthetics.',
    config: {
      version: '1.0.0',
      title: 'Creative Technologist & Interaction Designer',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Creative Technologist & Interaction Architect',
          bio: 'Crafting expressive digital interfaces where mathematical motion, generative art, and accessible typography intersect.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#f43f5e',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-creative-technologist-motion',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Interactive Motion & Generative Systems',
              desc: 'Sculpting delightful digital interactions at silky 60fps',
              color: '0:0f172a,100:f43f5e',
              textColor: 'ffffff',
              descColor: 'f43f5e',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-creative-technologist-motion',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'react,ts,threejs,figma,tailwind,css,html,git,nextjs',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-creative-technologist-motion',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'f43f5e',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-creative-technologist-motion',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'quantum-algorithms-physicist',
    name: 'Quantum Computing & Algorithms Researcher',
    description: 'Quantum circuits, Qiskit error mitigation, topological qubits, and quantum variational eigensolvers.',
    category: 'AI & Data',
    accent: '#6366f1',
    prompt: 'Generate an academic & industry research GitHub README for a Quantum Information Physicist with Bloch sphere circuits and tensor networks.',
    config: {
      version: '1.0.0',
      title: 'Quantum Computing & Algorithms Researcher',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Quantum Information & Algorithms Scientist',
          bio: 'Investigating noisy intermediate-scale quantum (NISQ) algorithms, tensor network contractions, and error correction codes.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#6366f1',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-quantum-algorithms-physicist',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Quantum Information & Superposition',
              desc: 'Harnessing quantum entanglement to solve classically intractable problems',
              color: '0:0f172a,100:6366f1',
              textColor: 'ffffff',
              descColor: '6366f1',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-quantum-algorithms-physicist',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'python,julia,c,linux,git,latex,bash',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-quantum-algorithms-physicist',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '6366f1',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-quantum-algorithms-physicist',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'site-reliability-sre-chaos',
    name: 'Site Reliability Engineer (SRE & Observability)',
    description: 'Multi-region Kubernetes clusters, 99.999% SLA budgeting, eBPF telemetry, and chaos engineering drills.',
    category: 'DevOps',
    accent: '#f59e0b',
    prompt: 'Act as a Principal Site Reliability Engineer. Generate a GitHub profile README showcasing high-availability telemetry, SLO dashboards, and chaos testing.',
    config: {
      version: '1.0.0',
      title: 'Site Reliability Engineer (SRE & Observability)',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Principal SRE & Infrastructure Resiliency Lead',
          bio: 'Engineering automated self-healing distributed platforms with rigorous error budgets, sub-second rollbacks, and zero data loss.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#f59e0b',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-site-reliability-sre-chaos',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Five-Nines Uptime & Chaos Engineering',
              desc: 'Automated self-healing infrastructure engineered for planetary scale',
              color: '0:0f172a,100:f59e0b',
              textColor: 'ffffff',
              descColor: 'f59e0b',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-site-reliability-sre-chaos',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'kubernetes,docker,prometheus,grafana,linux,bash,go,python,terraform',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-site-reliability-sre-chaos',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'f59e0b',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-site-reliability-sre-chaos',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'competitive-programmer-grandmaster',
    name: 'Competitive Programmer & Algorithmic Specialist',
    description: 'Master of graph theory, dynamic programming, Segment Trees, and sub-millisecond C++20 execution.',
    category: 'Systems',
    accent: '#ef4444',
    prompt: 'Write an elite competitive programming GitHub README featuring rated contest trophies, algorithmic complexity mastery, and C++ speed.',
    config: {
      version: '1.0.0',
      title: 'Competitive Programmer & Algorithmic Specialist',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Competitive Programmer & Data Structures Specialist',
          bio: 'Cracking complex algorithmic puzzles with O(N log N) optimality, cache-friendly memory layouts, and clean mathematical reasoning.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#ef4444',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-competitive-programmer-grandmaster',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Optimal Algorithms & Sub-Millisecond Speed',
              desc: 'Transforming NP-hard computational challenges into elegant optimal solutions',
              color: '0:0f172a,100:ef4444',
              textColor: 'ffffff',
              descColor: 'ef4444',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-competitive-programmer-grandmaster',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'cpp,java,python,c,linux,git,bash',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-competitive-programmer-grandmaster',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'ef4444',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-competitive-programmer-grandmaster',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'indie-hacker-solopreneur',
    name: 'Solo Founder & Indie Hacker',
    description: 'Shipping profitable micro-SaaS products, public revenue metrics, full-stack velocity, and user-centric features.',
    category: 'Popular',
    accent: '#10b981',
    prompt: 'Create a transparent Indie Hacker GitHub profile README with building-in-public metrics, product launch links, and rapid shipping velocity.',
    config: {
      version: '1.0.0',
      title: 'Solo Founder & Indie Hacker',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Solo Founder & Full-Stack Builder',
          bio: 'Turning customer problems into profitable, automated SaaS products with Next.js, Supabase, Stripe, and relentless shipping speed.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-indie-hacker-solopreneur',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Building in Public & Bootstrapping SaaS',
              desc: 'Zero fluff, zero meetings, 100% customer value delivered weekly',
              color: '0:0f172a,100:10b981',
              textColor: 'ffffff',
              descColor: '10b981',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-indie-hacker-solopreneur',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'nextjs,react,ts,tailwind,postgres,supabase,git,html,css',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-indie-hacker-solopreneur',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '10b981',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-indie-hacker-solopreneur',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'bioinformatics-genomics-core',
    name: 'Bioinformatics & Computational Genomics Specialist',
    description: 'Whole-genome sequencing pipelines, variant effect prediction, single-cell RNA-seq, and reproducibility.',
    category: 'AI & Data',
    accent: '#06b6d4',
    prompt: 'Write a computational biology GitHub profile showcasing Nextflow pipelines, structural biology analysis, and genomic variant annotation.',
    config: {
      version: '1.0.0',
      title: 'Bioinformatics & Computational Genomics Specialist',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Computational Biologist & Genomics Data Scientist',
          bio: 'Decoding genomic variation and biomolecular mechanisms through reproducible Nextflow workflows and high-performance statistics.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#06b6d4',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-bioinformatics-genomics-core',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Genomic Big Data & Molecular Discovery',
              desc: 'Accelerating therapeutic breakthroughs with statistical genomics and distributed pipelines',
              color: '0:0f172a,100:06b6d4',
              textColor: 'ffffff',
              descColor: '06b6d4',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-bioinformatics-genomics-core',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'python,r,linux,bash,docker,git',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-bioinformatics-genomics-core',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '06b6d4',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-bioinformatics-genomics-core',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'audio-dsp-audio-engineer',
    name: 'Audio Programmer & DSP Software Engineer',
    description: 'Real-time VST/AU plugins, low-latency SIMD buffers, spatial HRTF synthesis, and musical acoustics.',
    category: 'Systems',
    accent: '#a855f7',
    prompt: 'Write an audio DSP software engineer GitHub README highlighting real-time audio buffering, JUCE synthesizer plugins, and frequency response.',
    config: {
      version: '1.0.0',
      title: 'Audio Programmer & DSP Software Engineer',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Audio DSP Engineer & Synthesizer Architect',
          bio: 'Crafting zero-latency virtual instruments, spatial audio convolutions, and SIMD-accelerated digital signal processors.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#a855f7',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-audio-dsp-audio-engineer',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Digital Signal Processing & Acoustics',
              desc: 'Microsecond buffer latency, pristine harmonics, and real-time DSP filters',
              color: '0:0f172a,100:a855f7',
              textColor: 'ffffff',
              descColor: 'a855f7',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-audio-dsp-audio-engineer',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'cpp,c,rust,python,linux,git',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-audio-dsp-audio-engineer',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'a855f7',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-audio-dsp-audio-engineer',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'backend-systems-rust-tokio',
    name: 'High-Concurrency Distributed Systems Engineer',
    description: 'Lock-free data structures, Tokio async runtime, Raft consensus, and microsecond IPC communication.',
    category: 'Systems',
    accent: '#ea580c',
    prompt: 'Write a hardcore Rust systems programmer profile with async runtime telemetry, lock-free queues, and distributed consensus.',
    config: {
      version: '1.0.0',
      title: 'High-Concurrency Distributed Systems Engineer',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Staff Distributed Systems & Rust Architect',
          bio: 'Architecting zero-cost abstraction backends that process millions of requests per second without garbage collection pauses.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#ea580c',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-backend-systems-rust-tokio',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Zero-Cost Abstractions & Concurrency',
              desc: 'Memory safety without garbage collection, scaling horizontally across global regions',
              color: '0:0f172a,100:ea580c',
              textColor: 'ffffff',
              descColor: 'ea580c',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-backend-systems-rust-tokio',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'rust,go,redis,postgres,docker,linux,git,bash',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-backend-systems-rust-tokio',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'ea580c',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-backend-systems-rust-tokio',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'enterprise-java-spring-boot',
    name: 'Enterprise Java & Microservices Architect',
    description: 'Domain-Driven Design, event-driven Kafka messaging, Spring Boot 3, and mission-critical reliability.',
    category: 'Systems',
    accent: '#b45309',
    prompt: 'Write a polished enterprise solution architect GitHub profile showcasing clean DDD boundaries, event choreography, and high-scale Spring systems.',
    config: {
      version: '1.0.0',
      title: 'Enterprise Java & Microservices Architect',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Principal Enterprise Solutions Architect',
          bio: 'Transforming legacy enterprise monoliths into modular, observable, and resilient event-driven cloud architectures.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#b45309',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-enterprise-java-spring-boot',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Enterprise Resilience & Event Sourcing',
              desc: 'Domain-Driven Design, robust transaction boundaries, and 99.999% enterprise uptime',
              color: '0:0f172a,100:b45309',
              textColor: 'ffffff',
              descColor: 'b45309',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-enterprise-java-spring-boot',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'java,spring,docker,kubernetes,postgres,aws,git,linux',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-enterprise-java-spring-boot',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'b45309',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-enterprise-java-spring-boot',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'flutter-crossplatform-specialist',
    name: 'Cross-Platform Mobile Architect',
    description: 'Pixel-perfect mobile applications for iOS & Android, offline-first sync, reactive Riverpod state, and native plugins.',
    category: 'Mobile & Web3',
    accent: '#0284c7',
    prompt: 'Create an engaging cross-platform mobile developer GitHub profile showcasing Flutter animations, offline-first local storage, and app store releases.',
    config: {
      version: '1.0.0',
      title: 'Cross-Platform Mobile Architect',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Lead Mobile Application Architect',
          bio: 'Delivering silky 120fps cross-platform mobile experiences with clean architecture, offline synchronization, and native platform bindings.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#0284c7',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-flutter-crossplatform-specialist',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'High-Performance Cross-Platform Mobile',
              desc: 'Single codebase, 120fps native performance across iOS, Android, and Desktop',
              color: '0:0f172a,100:0284c7',
              textColor: 'ffffff',
              descColor: '0284c7',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-flutter-crossplatform-specialist',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'flutter,dart,react,ts,swift,kotlin,git,figma',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-flutter-crossplatform-specialist',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '0284c7',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-flutter-crossplatform-specialist',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'red-team-ethical-hacker',
    name: 'Penetration Tester & Offensive Security Specialist',
    description: 'Red team adversary simulation, binary exploitation, zero-day research, and network intrusion analysis.',
    category: 'Systems',
    accent: '#dc2626',
    prompt: 'Write a discreet, elite ethical hacker GitHub README featuring vulnerability disclosures, binary reverse engineering, and threat modeling.',
    config: {
      version: '1.0.0',
      title: 'Penetration Tester & Offensive Security Specialist',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Offensive Security Researcher & Red Team Lead',
          bio: 'Uncovering critical vulnerabilities through binary decompilation, kernel exploitation, and automated fuzzing before malicious actors do.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#dc2626',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-red-team-ethical-hacker',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Offensive Security & Binary Exploitation',
              desc: 'Discovering edge-case attack vectors to harden mission-critical software defense',
              color: '0:0f172a,100:dc2626',
              textColor: 'ffffff',
              descColor: 'dc2626',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-red-team-ethical-hacker',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'python,bash,linux,c,git',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-red-team-ethical-hacker',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'dc2626',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-red-team-ethical-hacker',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'synthwave-outrun-coder',
    name: 'Synthwave 80s Cyber Hacker',
    description: 'Retro 80s synthwave horizon, neon purple chrome gradients, electronic beats, and ultra-fast frontend applications.',
    category: 'Design',
    accent: '#d946ef',
    prompt: 'Create an aesthetic 80s synthwave / outrun themed GitHub profile README with glowing neon magenta aesthetics and retro grids.',
    config: {
      version: '1.0.0',
      title: 'Synthwave 80s Cyber Hacker',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Frontend Artisan & Retro Aesthetics Enthusiast',
          bio: 'Coding under the neon glow of retro synthwave grids with blazing fast modern frontend frameworks and radical visual vibes.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#d946ef',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-synthwave-outrun-coder',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Neon Outrun & Retro Synth Aesthetics',
              desc: 'Cruising down the digital highway with 80s synths and modern clean code',
              color: '0:0f172a,100:d946ef',
              textColor: 'ffffff',
              descColor: 'd946ef',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-synthwave-outrun-coder',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'vue,ts,tailwind,vite,pinia,git,html,css',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-synthwave-outrun-coder',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'd946ef',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-synthwave-outrun-coder',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'terminal-matrix-digital-rain',
    name: 'Neo Matrix Cyber Terminal',
    description: 'Phosphor green digital rain, pure terminal cadence, Linux kernel hacker aesthetic, and minimal overhead.',
    category: 'Popular',
    accent: '#22c55e',
    prompt: 'Generate an iconic Matrix green terminal GitHub README featuring digital cipher rain, command prompts, and hacker telemetry.',
    config: {
      version: '1.0.0',
      title: 'Neo Matrix Cyber Terminal',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Kernel Hacker & Low-Level Specialist',
          bio: 'Peering directly into the matrix of registers, syscalls, and network packets with zero abstraction layers in the way.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#22c55e',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-terminal-matrix-digital-rain',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Phosphor Green Matrix Terminal',
              desc: 'Wake up, Neo... The terminal holds the truth',
              color: '0:0f172a,100:22c55e',
              textColor: 'ffffff',
              descColor: '22c55e',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-terminal-matrix-digital-rain',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'c,bash,linux,git,python',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-terminal-matrix-digital-rain',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '22c55e',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-terminal-matrix-digital-rain',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'frontend-design-system-lead',
    name: 'Design Systems Lead & UI Architect',
    description: 'Token architectures, WCAG AAA accessibility, component libraries, Storybook documentation, and micro-interactions.',
    category: 'Design',
    accent: '#3b82f6',
    prompt: 'Write a comprehensive design systems engineer profile showcasing token hierarchies, accessible primitives, and Storybook component suites.',
    config: {
      version: '1.0.0',
      title: 'Design Systems Lead & UI Architect',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Design Systems Architect & Staff Frontend Engineer',
          bio: 'Bridging the design-engineering divide with composable React component systems, semantic tokens, and rigid accessibility guarantees.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#3b82f6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-frontend-design-system-lead',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Accessible Design Systems & Tokens',
              desc: 'Pixel precision, WCAG AAA conformance, and effortless multi-brand theming',
              color: '0:0f172a,100:3b82f6',
              textColor: 'ffffff',
              descColor: '3b82f6',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-frontend-design-system-lead',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'react,ts,tailwind,nextjs,figma,html,css,git',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-frontend-design-system-lead',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '3b82f6',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-frontend-design-system-lead',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'figma-tokens-design-system-lead',
          type: 'figma-design',
          props: {
            content: {
              style: 'design-system',
              projectName: 'Prism System Tokens & WCAG AAA',
              figmaUrl: 'https://figma.com/@designsystem',
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'deep-learning-computer-vision',
    name: 'Deep Learning & Computer Vision Researcher',
    description: 'Convolutional neural networks, Vision Transformers (ViT), real-time object detection, and edge tensor runtimes.',
    category: 'AI & Data',
    accent: '#8b5cf6',
    prompt: 'Create a deep learning CV researcher GitHub README showcasing model benchmarks, tensor pruning, and vision transformer papers.',
    config: {
      version: '1.0.0',
      title: 'Deep Learning & Computer Vision Researcher',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Computer Vision & Deep Learning Specialist',
          bio: 'Teaching machines to perceive, segment, and understand the 3D visual world through self-supervised representations and tensor optimization.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-deep-learning-computer-vision',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Spatial Vision & Neural Representations',
              desc: 'Real-time multi-modal perception models running inference on edge hardware',
              color: '0:0f172a,100:8b5cf6',
              textColor: 'ffffff',
              descColor: '8b5cf6',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-deep-learning-computer-vision',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'pytorch,python,opencv,linux,docker,git,bash',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-deep-learning-computer-vision',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '8b5cf6',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-deep-learning-computer-vision',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'platform-engineer-kubernetes',
    name: 'Platform Engineer & Developer Portal Specialist',
    description: 'Internal Developer Platforms (IDP), GitOps with ArgoCD, golden path infrastructure templates, and developer happiness.',
    category: 'DevOps',
    accent: '#0ea5e9',
    prompt: 'Write a developer platform engineer GitHub README showcasing golden path abstractions, Backstage integrations, and automated PR preview environments.',
    config: {
      version: '1.0.0',
      title: 'Platform Engineer & Developer Portal Specialist',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Staff Platform Engineer & Developer Velocity Lead',
          bio: 'Eliminating cognitive overhead for engineering teams through standardized golden paths, ephemereal preview clusters, and GitOps pipelines.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#0ea5e9',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-platform-engineer-kubernetes',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Internal Developer Platforms & GitOps',
              desc: 'Empowering product engineers to deploy with confidence in seconds, not hours',
              color: '0:0f172a,100:0ea5e9',
              textColor: 'ffffff',
              descColor: '0ea5e9',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-platform-engineer-kubernetes',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'kubernetes,docker,terraform,go,linux,bash,git,aws',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-platform-engineer-kubernetes',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '0ea5e9',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-platform-engineer-kubernetes',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'graphql-api-architect',
    name: 'API Architect & GraphQL Specialist',
    description: 'Federated GraphQL supergraphs, schema stitching, ultra-fast Fastify servers, and OpenAPI contract testing.',
    category: 'Systems',
    accent: '#e11d48',
    prompt: 'Generate an API architect profile focusing on GraphQL federation, sub-5ms caching layers, and declarative API schema contracts.',
    config: {
      version: '1.0.0',
      title: 'API Architect & GraphQL Specialist',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Principal API & Distributed Gateway Architect',
          bio: 'Unifying fragmented microservice ecosystems under strongly typed, federated GraphQL supergraphs and sub-millisecond edge caches.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#e11d48',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-graphql-api-architect',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Federated Graph Architecture & Gateway',
              desc: 'Type-safe client contracts with zero over-fetching and millisecond response times',
              color: '0:0f172a,100:e11d48',
              textColor: 'ffffff',
              descColor: 'e11d48',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-graphql-api-architect',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'nodejs,ts,graphql,postgres,redis,docker,git,linux',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-graphql-api-architect',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'e11d48',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-graphql-api-architect',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'database-tuner-dba',
    name: 'Database Architect & Performance Tuner',
    description: 'Query plan optimization, pgvector similarity indexing, horizontal sharding, and high-availability replication.',
    category: 'Systems',
    accent: '#0284c7',
    prompt: 'Write a database specialist profile README with query execution plan analysis, WAL tuning, and petabyte partitioning schemes.',
    config: {
      version: '1.0.0',
      title: 'Database Architect & Performance Tuner',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Database Reliability Engineer & Storage Architect',
          bio: 'Diagnosing sequential scan bottlenecks, orchestrating zero-downtime schema migrations, and fine-tuning storage engines for maximum IOPS.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#0284c7',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-database-tuner-dba',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'High-Throughput Relational & Vector Storage',
              desc: 'Zero-downtime failovers, index optimization, and sub-millisecond query execution',
              color: '0:0f172a,100:0284c7',
              textColor: 'ffffff',
              descColor: '0284c7',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-database-tuner-dba',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'postgres,redis,linux,bash,python,docker,git',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-database-tuner-dba',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '0284c7',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-database-tuner-dba',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'blue-team-soc-analyst',
    name: 'Security Operations & Blue Team Defense Specialist',
    description: 'Threat hunting, SIEM log correlation, automated incident response playbooks, and perimeter defense.',
    category: 'Systems',
    accent: '#3b82f6',
    prompt: 'Create a blue team cybersecurity defender profile with log analytics, incident containment telemetry, and threat intelligence feeds.',
    config: {
      version: '1.0.0',
      title: 'Security Operations & Blue Team Defense Specialist',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Lead Threat Hunter & Defensive Security Architect',
          bio: 'Monitoring network perimeters, analyzing anomalous telemetry, and executing rapid containment workflows against advanced persistent threats.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#3b82f6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-blue-team-soc-analyst',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Defensive Perimeter & Threat Detection',
              desc: 'Uncompromising security posture, automated containment, and 24/7 resilience',
              color: '0:0f172a,100:3b82f6',
              textColor: 'ffffff',
              descColor: '3b82f6',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-blue-team-soc-analyst',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'python,bash,linux,docker,git',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-blue-team-soc-analyst',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '3b82f6',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-blue-team-soc-analyst',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'robotics-ros2-navigation',
    name: 'Robotics & Autonomous Navigation Engineer',
    description: 'Simultaneous Localization and Mapping (SLAM), ROS2 micro-nodes, trajectory planning, and hardware sensor fusion.',
    category: 'Systems',
    accent: '#f97316',
    prompt: 'Write an autonomous robotics engineer profile featuring sensor fusion (LiDAR, IMU, cameras), kinematic models, and ROS2 telemetry.',
    config: {
      version: '1.0.0',
      title: 'Robotics & Autonomous Navigation Engineer',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Robotics & Autonomous Systems Engineer',
          bio: 'Engineering physical autonomous robots capable of real-time mapping, dynamic obstacle avoidance, and precise sub-centimeter navigation.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#f97316',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-robotics-ros2-navigation',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Autonomous Navigation & Sensor Fusion',
              desc: 'Real-time kinematic planning, multi-sensor integration, and deterministic hardware control',
              color: '0:0f172a,100:f97316',
              textColor: 'ffffff',
              descColor: 'f97316',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-robotics-ros2-navigation',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'cpp,python,linux,ros,git,docker,bash',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-robotics-ros2-navigation',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'f97316',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-robotics-ros2-navigation',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'spatial-computing-visionos',
    name: 'Spatial Computing & VisionOS Developer',
    description: 'Volumetric windows, RealityKit spatial anchors, hand-tracking gestures, and immersive 3D mixed reality.',
    category: 'Mobile & Web3',
    accent: '#6366f1',
    prompt: 'Write a cutting-edge VisionOS & Spatial Computing developer profile with volumetric entity systems and intuitive eye/pinch gestures.',
    config: {
      version: '1.0.0',
      title: 'Spatial Computing & VisionOS Developer',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Spatial Computing & XR Experience Developer',
          bio: 'Pioneering volumetric computing paradigms that seamlessly blend digital software into physical spatial environments.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#6366f1',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-spatial-computing-visionos',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Spatial Computing & Volumetric Realities',
              desc: 'Transcending flat screens with interactive spatial anchors and mixed reality physics',
              color: '0:0f172a,100:6366f1',
              textColor: 'ffffff',
              descColor: '6366f1',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-spatial-computing-visionos',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'swift,apple,unity,blender,git,figma',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-spatial-computing-visionos',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '6366f1',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-spatial-computing-visionos',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'tech-educator-content-creator',
    name: 'Technical Content Creator & Educator',
    description: 'Visual coding tutorials, open-source educational repositories, engineering guides, and community mentorship.',
    category: 'Popular',
    accent: '#eab308',
    prompt: 'Generate an inspiring technical educator profile with community reach badges, published tutorials, and open-source learning repositories.',
    config: {
      version: '1.0.0',
      title: 'Technical Content Creator & Educator',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Developer Advocate & Technical Educator',
          bio: 'Demystifying complex computer science concepts through intuitive visual diagrams, interactive code walkthroughs, and open source mentorship.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#eab308',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-tech-educator-content-creator',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Open Knowledge & Developer Mentorship',
              desc: 'Empowering the next million engineers with free, accessible, and crystal-clear technical education',
              color: '0:0f172a,100:eab308',
              textColor: 'ffffff',
              descColor: 'eab308',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-tech-educator-content-creator',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'js,ts,react,python,git,markdown,html,css',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-tech-educator-content-creator',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'eab308',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-tech-educator-content-creator',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'kernel-driver-lowlevel-dev',
    name: 'Linux Kernel & Low-Level Driver Developer',
    description: 'Ring-0 privilege programming, memory-mapped I/O, PCIe device drivers, and kernel crash dump analysis.',
    category: 'Systems',
    accent: '#64748b',
    prompt: 'Write a hardcore Linux kernel developer GitHub profile with interrupt handling, custom character drivers, and hardware memory registers.',
    config: {
      version: '1.0.0',
      title: 'Linux Kernel & Low-Level Driver Developer',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Kernel & Hardware Driver Engineer',
          bio: 'Developing interrupt-driven kernel modules, custom character drivers, and high-performance PCIe DMA subsystems.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#64748b',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-kernel-driver-lowlevel-dev',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Kernel Internals & Memory Architecture',
              desc: 'Operating at Ring 0, where every byte and cycle directly controls physical hardware',
              color: '0:0f172a,100:64748b',
              textColor: 'ffffff',
              descColor: '64748b',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-kernel-driver-lowlevel-dev',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'c,linux,bash,git',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-kernel-driver-lowlevel-dev',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '64748b',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-kernel-driver-lowlevel-dev',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'fintech-hft-low-latency',
    name: 'FinTech & High-Frequency Trading Developer',
    description: 'Sub-microsecond order execution, kernel-bypass networking, FPGA packet parsing, and modern C++20.',
    category: 'Systems',
    accent: '#059669',
    prompt: 'Create a High-Frequency Trading (HFT) developer GitHub profile showcasing sub-microsecond latency benchmarks and lock-free execution.',
    config: {
      version: '1.0.0',
      title: 'FinTech & High-Frequency Trading Developer',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Quantitative Software Engineer (Low Latency)',
          bio: 'Optimizing financial order matching engines with kernel-bypass sockets, zero-allocation ring buffers, and cache-line aligned structures.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#059669',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-fintech-hft-low-latency',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Sub-Microsecond Quantitative Systems',
              desc: 'Deterministic nanosecond performance where latency directly equals competitive advantage',
              color: '0:0f172a,100:059669',
              textColor: 'ffffff',
              descColor: '059669',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-fintech-hft-low-latency',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'cpp,python,linux,git,bash',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-fintech-hft-low-latency',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '059669',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-fintech-hft-low-latency',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'edtech-simulation-developer',
    name: 'EdTech & Interactive Simulation Developer',
    description: 'Interactive STEM physics simulations, mathematical visualizations, HTML5 Canvas animations, and gamified learning.',
    category: 'Design',
    accent: '#8b5cf6',
    prompt: 'Write an EdTech developer profile showcasing interactive physics models, mathematical canvas widgets, and gamified education.',
    config: {
      version: '1.0.0',
      title: 'EdTech & Interactive Simulation Developer',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Interactive Learning & Simulation Engineer',
          bio: 'Building playful, highly tactile educational simulators that allow students to physically experiment with physics and mathematics.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-edtech-simulation-developer',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Interactive STEM Simulations',
              desc: 'Visualizing abstract mathematical principles into playful, intuitive tactile explorations',
              color: '0:0f172a,100:8b5cf6',
              textColor: 'ffffff',
              descColor: '8b5cf6',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-edtech-simulation-developer',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'js,react,ts,html,css,git',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-edtech-simulation-developer',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '8b5cf6',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-edtech-simulation-developer',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'pixel-art-indie-gamedev',
    name: 'Cozy Pixel Artist & Retro Indie Gamedev',
    description: '16-bit nostalgic worlds, chiptune soundscapes, Godot game mechanics, and handcrafted sprite animations.',
    category: 'Design',
    accent: '#f59e0b',
    prompt: 'Create a charming pixel art indie game developer profile with retro sprite sheets, cozy aesthetic colors, and game dev devlogs.',
    config: {
      version: '1.0.0',
      title: 'Cozy Pixel Artist & Retro Indie Gamedev',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Indie Game Developer & Pixel Artist',
          bio: 'Handcrafting heartwarming 16-bit pixel adventures filled with memorable characters, cozy environments, and delightful chiptune melodies.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#f59e0b',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-pixel-art-indie-gamedev',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: '16-Bit Nostalgia & Handcrafted Games',
              desc: 'Painting retro worlds one pixel at a time with endless heart and imagination',
              color: '0:0f172a,100:f59e0b',
              textColor: 'ffffff',
              descColor: 'f59e0b',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-pixel-art-indie-gamedev',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'godot,blender,git,linux,python',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-pixel-art-indie-gamedev',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'f59e0b',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-pixel-art-indie-gamedev',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'cloud-serverless-specialist',
    name: 'Cloud Native Serverless Architect',
    description: 'Event-driven architectures, DynamoDB single-table design, zero-idle infrastructure cost, and AWS CDK/SST.',
    category: 'DevOps',
    accent: '#f97316',
    prompt: 'Write an AWS Serverless architect profile featuring event-driven architectures, DynamoDB single-table design, and automated SST deployments.',
    config: {
      version: '1.0.0',
      title: 'Cloud Native Serverless Architect',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Staff Serverless & Event-Driven Architect',
          bio: 'Eliminating idle server costs through resilient, auto-scaling event architectures that scale from zero to millions of concurrent invocations.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#f97316',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-cloud-serverless-specialist',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'True Serverless & Event Choreography',
              desc: 'Scaling from 0 to 100,000 requests in milliseconds with zero idle infrastructure spend',
              color: '0:0f172a,100:f97316',
              textColor: 'ffffff',
              descColor: 'f97316',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-cloud-serverless-specialist',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'aws,ts,nodejs,docker,git,linux,bash',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-cloud-serverless-specialist',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: 'f97316',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-cloud-serverless-specialist',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
  {
    id: 'developer-experience-dx-lead',
    name: 'Developer Experience & Documentation Engineer',
    description: 'Instant CLI toolchain feedback, interactive SDK documentation, AST code generation, and ergonomic APIs.',
    category: 'Popular',
    accent: '#10b981',
    prompt: 'Write a Developer Experience (DX) lead GitHub README showcasing documentation portals, instant CLI workflows, and SDK developer joy.',
    config: {
      version: '1.0.0',
      title: 'Developer Experience & Documentation Engineer',
      settings: {
        user: {
          github: 'octocat',
          name: 'Developer Craftsman',
          role: 'Head of Developer Experience & Tooling',
          bio: 'Obsessed with reducing time-to-first-commit through lightning-fast toolchains, self-documenting code, and joyful developer journeys.',
          location: 'San Francisco / Remote',
          pronouns: 'they/them',
          status: 'Actively building & contributing to open source',
        },
        theme: 'dark',
        accentColor: '#10b981',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: 'banner-developer-experience-dx-lead',
          type: 'capsule-banner',
          props: {
            content: {
              type: 'waving',
              height: 170,
              text: 'Zero-Friction Developer Experience',
              desc: 'Transforming painful onboarding friction into effortless, delightfully fast workflows',
              color: '0:0f172a,100:10b981',
              textColor: 'ffffff',
              descColor: '10b981',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'skills-developer-experience-dx-lead',
          type: 'skill-icons',
          props: {
            content: {
              icons: 'astro,react,ts,tailwind,markdown,git,nextjs',
              theme: 'dark',
              perline: 10,
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'activity-developer-experience-dx-lead',
          type: 'activity-graph',
          props: {
            content: {
              theme: 'tokyonight',
              color: '10b981',
              pointColor: 'ffffff',
            },
            styles: {},
            state: 'default',
          },
        },
        {
          id: 'stats-developer-experience-dx-lead',
          type: 'github-readme-stats',
          props: {
            content: {
              showIcons: true,
              theme: 'tokyonight',
              includeAllCommits: true,
            },
            styles: {},
            state: 'default',
          },
        },
      ],
    },
  },
];

export const TEMPLATES: TemplateItem[] = RAW_TEMPLATES.map(t => ({
  ...t,
  prompt: buildRichPrompt(t),
}));
