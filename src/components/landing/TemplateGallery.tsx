'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ReadmeConfig } from '#/lib/plugins/types';
import { buildMarkdown } from '#/lib/buildMarkdown';
import confetti from 'canvas-confetti';
import {
  Check,
  ArrowRight,
  LayoutTemplate,
  Sparkles,
  Copy,
  Eye,
  X,
  Plus,
  Search,
  Code,
  CheckCheck,
  RefreshCw,
  Trash2,
  Layers,
} from 'lucide-react';

export interface TemplateItem {
  id: string;
  name: string;
  description: string;
  category: string;
  accent: string;
  prompt: string;
  config: ReadmeConfig;
}

export const TEMPLATES: TemplateItem[] = [
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
    id: 'metrics-telemetry-dashboard',
    name: 'Metrics & Telemetry Dashboard',
    description: 'Telemetry dashboard inspired by lowlighter/metrics with PageSpeed scores, 3D contribution calendar, commit activity graphs, and tech icons.',
    category: 'Popular',
    accent: '#10b981',
    prompt:
      'Generate a dark-mode GitHub profile README in the style of lowlighter/metrics with a telemetry dashboard, PageSpeed insights scores, 3D isometric contributions calendar, coding habits hourly/daily activity graphs, top languages breakdown, and mastered technologies icon grid.',
    config: {
      version: '1.0.0',
      title: 'Metrics Telemetry Profile',
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
              markdown: `<div align="center">\n  <img src="https://raw.githubusercontent.com/yuvrajlaptop2008-byte/readmeforge/main/public/assets/peeking-cat-header.svg" width="100%" alt="Peeking Cat Header" />\n</div>`,
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
              markdown: `<div align="center">\n  <img src="https://raw.githubusercontent.com/yuvrajlaptop2008-byte/readmeforge/main/public/assets/bento-dashboard-header.svg" width="100%" alt="Bento Dashboard Header" />\n</div>`,
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
];

const KEYWORDS = [
  'stand out from day one',
  'level up your GitHub branding',
  'demand recruiter attention',
  'showcase clean architectures',
  'impress open-source peers',
];

export const TemplateGallery: React.FC = () => {
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  const [appliedId, setAppliedId] = useState<string | null>(null);
  const [mergedId, setMergedId] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Preview & Customize Modal State
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [previewConfig, setPreviewConfig] = useState<ReadmeConfig | null>(null);
  const [previewTab, setPreviewTab] = useState<'visual' | 'markdown' | 'prompt' | 'plugins'>('visual');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamic Keyword Text Animation
  const [keywordIdx, setKeywordIdx] = useState<number>(0);
  const [fadeKeyword, setFadeKeyword] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeKeyword(false);
      setTimeout(() => {
        setKeywordIdx(prev => (prev + 1) % KEYWORDS.length);
        setFadeKeyword(true);
      }, 250);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const categories = useMemo(() => [
    'all',
    'Popular',
    'Minimal',
    'Gaming',
    'DevOps',
    'AI / ML',
    'Open Source',
    'Mobile',
    'Security',
    'Design',
    'Student',
  ], []);

  const filtered = useMemo(() => {
    return TEMPLATES.filter(tmpl => {
      const matchesCat = activeCategory === 'all' || tmpl.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;

      const matchesSearch =
        tmpl.name.toLowerCase().includes(q) ||
        tmpl.description.toLowerCase().includes(q) ||
        tmpl.category.toLowerCase().includes(q) ||
        tmpl.config.sections.some(s => s.type.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Apply template (replaces entire config & copies markdown)
  const handleApply = (template: TemplateItem) => {
    setEntireConfig(template.config);
    setAppliedId(template.id);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: [template.accent, '#8b5cf6', '#06b6d4'],
      });
    } catch {
      // Ignored
    }

    const md = buildMarkdown(template.config);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(md);
      showToast(`Template "${template.name}" applied & Markdown copied!`);
    } else {
      showToast(`Template "${template.name}" applied to your profile!`);
    }

    setTimeout(() => {
      setAppliedId(null);
    }, 1500);
  };

  // Merge template (appends sections to existing user config)
  const handleMerge = (template: TemplateItem) => {
    const current = useReadmeStore.getState().config;
    const mergedSections = [...current.sections, ...template.config.sections];
    setEntireConfig({
      ...current,
      sections: mergedSections,
    });
    setMergedId(template.id);
    showToast(`${template.config.sections.length} plugin(s) from "${template.name}" added to your profile!`);

    try {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#10b981', '#3b82f6', template.accent],
      });
    } catch {
      // Ignored
    }

    setTimeout(() => {
      setMergedId(null);
    }, 1500);
  };

  // Copy AI prompt to clipboard with tactile confetti
  const handleCopyPrompt = (template: TemplateItem) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(template.prompt);
      setCopiedPromptId(template.id);
      showToast(`AI prompt for "${template.name}" copied to clipboard!`);

      try {
        confetti({
          particleCount: 22,
          spread: 55,
          origin: { y: 0.8 },
          colors: ['#fbbf24', '#34d399', '#38bdf8', '#818cf8'],
        });
      } catch {
        // Ignored
      }

      setTimeout(() => {
        setCopiedPromptId(null);
      }, 2200);
    }
  };

  // Open Preview Modal
  const handleOpenPreview = (template: TemplateItem) => {
    setPreviewTemplate(template);
    // Deep clone to allow removing plugins in preview without mutating constant
    setPreviewConfig(JSON.parse(JSON.stringify(template.config)));
    setPreviewTab('visual');
  };

  // Remove a plugin from the active preview
  const handleRemovePluginFromPreview = (sectionId: string) => {
    if (!previewConfig) return;
    setPreviewConfig({
      ...previewConfig,
      sections: previewConfig.sections.filter(s => s.id !== sectionId),
    });
    showToast('Plugin removed from preview');
  };

  // Reset plugins in preview to original template state
  const handleResetPreviewPlugins = () => {
    if (!previewTemplate) return;
    setPreviewConfig(JSON.parse(JSON.stringify(previewTemplate.config)));
    showToast('All plugins restored to template default');
  };

  // Apply directly from preview modal
  const handleApplyFromPreview = () => {
    if (!previewConfig || !previewTemplate) return;
    setEntireConfig(previewConfig);
    const md = buildMarkdown(previewConfig);
    setPreviewTemplate(null);
    setPreviewConfig(null);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(md);
      showToast(`Customized "${previewTemplate.name}" applied & Markdown copied!`);
    } else {
      showToast(`Customized "${previewTemplate.name}" applied to profile!`);
    }
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch {
      // Ignored
    }
  };

  // Merge directly from preview modal
  const handleMergeFromPreview = () => {
    if (!previewConfig || !previewTemplate) return;
    const current = useReadmeStore.getState().config;
    setEntireConfig({
      ...current,
      sections: [...current.sections, ...previewConfig.sections],
    });
    setPreviewTemplate(null);
    setPreviewConfig(null);
    showToast(`Plugins from "${previewTemplate.name}" merged into your profile!`);
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch {
      // Ignored
    }
  };

  // Generated Markdown for preview
  const previewMarkdown = useMemo(() => {
    if (!previewConfig) return '';
    try {
      return buildMarkdown(previewConfig);
    } catch {
      return '# README Preview';
    }
  }, [previewConfig]);

  return (
    <section className="py-14 px-4 max-w-7xl mx-auto space-y-8 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-neutral-900/95 border border-violet-500/50 text-white text-xs font-medium shadow-2xl backdrop-blur-md animate-fade-in">
          <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Dynamic Text Animation */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-violet-300 text-xs font-semibold backdrop-blur-md shadow-sm">
          <LayoutTemplate className="w-3.5 h-3.5 text-violet-400" />
          <span>Curated Starters & Archetypes</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400 font-mono">10 Ready-to-Ship</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight">
          Curated Starter Archetypes
        </h2>

        {/* Animated Subtitle */}
        <p className="text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          One-click apply clean, structured templates designed to{' '}
          <span
            className={`font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 transition-opacity duration-300 ${
              fadeKeyword ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {KEYWORDS[keywordIdx]}
          </span>
          .
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-3 max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by archetype, tech stack, or keyword..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-neutral-500 hover:text-neutral-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map(cat => {
          const count = cat === 'all' ? TEMPLATES.length : TEMPLATES.filter(t => t.category === cat).length;
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-900/30 scale-100'
                  : 'bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
              } active:scale-95`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
        {filtered.map(tmpl => {
          const isApplied = appliedId === tmpl.id;
          const isMerged = mergedId === tmpl.id;
          const isCopied = copiedPromptId === tmpl.id;

          return (
            <div
              key={tmpl.id}
              className="relative p-6 rounded-2xl bg-neutral-900/70 hover:bg-neutral-900/95 border border-white/[0.08] hover:border-violet-500/50 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-[0_12px_40px_rgba(139,92,246,0.18)] hover:-translate-y-1 overflow-hidden"
            >
              {/* Dynamic Accent Top Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, ${tmpl.accent}, transparent)`,
                }}
              />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-800/90 text-neutral-300 border border-neutral-700/60 font-semibold">
                    {tmpl.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-sm animate-pulse"
                      style={{ backgroundColor: tmpl.accent }}
                    />
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">{tmpl.accent}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-neutral-100 group-hover:text-violet-300 transition-colors">
                  {tmpl.name}
                </h3>

                <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                  {tmpl.description}
                </p>

                {/* Visual Preview Window (Above) */}
                <div
                  onClick={() => handleOpenPreview(tmpl)}
                  className="my-3 rounded-xl border border-neutral-800/80 bg-neutral-950/80 p-3 hover:border-violet-500/40 cursor-pointer transition-all group/preview relative overflow-hidden"
                >
                  {/* macOS Window Controls */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800/60">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                      <span className="ml-1 text-[10px] font-mono text-neutral-500">README.md</span>
                    </div>
                    <span className="text-[10px] font-mono text-violet-400 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Preview
                    </span>
                  </div>

                  {/* Profile Snapshot Header */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
                        style={{ backgroundColor: `${tmpl.accent}20`, color: tmpl.accent, border: `1px solid ${tmpl.accent}50` }}
                      >
                        {tmpl.config.settings.user.name?.[0] || 'A'}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-neutral-200 truncate">
                          {tmpl.config.settings.user.name || 'Developer'}
                        </p>
                        <p className="text-[10px] text-neutral-500 truncate">
                          {tmpl.config.settings.user.role || 'Software Engineer'}
                        </p>
                      </div>
                    </div>

                    {/* Mini badges simulation */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {tmpl.config.sections.slice(0, 3).map(sec => (
                        <span
                          key={sec.id}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
                        >
                          {sec.type}
                        </span>
                      ))}
                      {tmpl.config.sections.length > 3 && (
                        <span className="text-[9px] font-mono px-1 py-0.5 text-neutral-600">
                          +{tmpl.config.sections.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* AI Prompt Drawer (Prompt Below to Make It) */}
                <div className="mt-2.5 p-2.5 rounded-xl bg-neutral-950/90 border border-neutral-800/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" /> Prompt to Make It
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyPrompt(tmpl);
                      }}
                      className="text-[10px] font-mono text-neutral-400 hover:text-amber-300 transition-colors flex items-center gap-1 px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800"
                    >
                      {isCopied ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-400/90 font-mono line-clamp-2 leading-relaxed bg-neutral-900/50 p-1.5 rounded border border-neutral-800/40">
                    {tmpl.prompt}
                  </p>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="pt-4 mt-5 border-t border-neutral-800/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-mono font-medium">
                    {tmpl.config.sections.length} plugin{tmpl.config.sections.length === 1 ? '' : 's'} configured
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Copy Prompt Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(tmpl)}
                      title="Copy AI Prompt"
                      className={`relative p-1.5 rounded-lg border transition-all overflow-hidden ${
                        isCopied
                          ? 'animate-copy-pop bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                          : 'bg-neutral-800/90 hover:bg-neutral-700 text-neutral-400 hover:text-amber-300 border-neutral-700/50'
                      }`}
                    >
                      {/* Specular gleam on copied */}
                      {isCopied && (
                        <span className="absolute inset-0 overflow-hidden pointer-events-none">
                          <span className="absolute inset-0 -translate-x-full animate-copy-gleam bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        </span>
                      )}
                      {isCopied ? (
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-300 animate-check-spring drop-shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Preview Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenPreview(tmpl)}
                      title="Preview Template"
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800/90 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/50 text-xs font-medium transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Merge into Current Profile */}
                  <button
                    type="button"
                    onClick={() => handleMerge(tmpl)}
                    title="Add sections to your current profile without replacing bio"
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 border border-neutral-700/60 text-neutral-300 hover:text-white transition-all active:scale-95"
                  >
                    {isMerged ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Merged!
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Add to Profile</span>
                      </>
                    )}
                  </button>

                  {/* Apply Template */}
                  <button
                    type="button"
                    onClick={() => handleApply(tmpl)}
                    className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 duration-200 ${
                      isApplied
                        ? 'bg-emerald-600 text-white shadow-emerald-900/40'
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-900/30'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" /> Applied!
                      </>
                    ) : (
                      <>
                        <span>Apply</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <p className="text-sm text-neutral-400">No archetypes matched your search query "{searchQuery}".</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ========================================================
          FULL INTERACTIVE PREVIEW & CUSTOMIZE MODAL
          ======================================================== */}
      {mounted && previewTemplate && previewConfig && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-neutral-950 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full shadow-sm animate-pulse"
                  style={{ backgroundColor: previewTemplate.accent }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-neutral-100">{previewTemplate.name}</h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-semibold border border-neutral-700">
                      {previewTemplate.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-1">{previewTemplate.description}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setPreviewTemplate(null);
                  setPreviewConfig(null);
                }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs Bar */}
            <div className="flex items-center gap-2 px-6 py-2.5 bg-neutral-950/60 border-b border-neutral-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setPreviewTab('visual')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  previewTab === 'visual'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visual Preview</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewTab('markdown')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  previewTab === 'markdown'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Markdown Output</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewTab('prompt')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  previewTab === 'prompt'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Generator Prompt</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewTab('plugins')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  previewTab === 'plugins'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Manage Plugins ({previewConfig.sections.length})</span>
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* TAB 1: Visual Simulated GitHub Profile */}
              {previewTab === 'visual' && (
                <div className="space-y-4">
                  {/* macOS Profile Header Box */}
                  <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-3 shadow-inner">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <span className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span className="ml-2 font-mono text-xs text-neutral-400">
                          {previewConfig.settings.user.github || 'developer'} / README.md
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Live Preview
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-neutral-100">
                        Hi there, I'm {previewConfig.settings.user.name} 👋
                      </h4>
                      <p className="text-sm font-semibold text-violet-400 font-mono">
                        {previewConfig.settings.user.role}
                      </p>
                      <p className="text-xs text-neutral-300 pt-1 leading-relaxed">
                        {previewConfig.settings.user.bio}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2 text-xs text-neutral-400 font-mono">
                      {previewConfig.settings.user.location && (
                        <span>📍 Based in <b>{previewConfig.settings.user.location}</b></span>
                      )}
                      {previewConfig.settings.user.status && (
                        <span>🔭 <b>{previewConfig.settings.user.status}</b></span>
                      )}
                      {previewConfig.settings.user.pronouns && (
                        <span>💬 Pronouns: <b>{previewConfig.settings.user.pronouns}</b></span>
                      )}
                    </div>
                  </div>

                  {/* Plugins Simulated Cards */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                      Included Profile Modules ({previewConfig.sections.length})
                    </h5>

                    {previewConfig.sections.length === 0 ? (
                      <div className="p-4 rounded-xl border border-dashed border-neutral-800 text-center text-xs text-neutral-500">
                        This archetype is ultra-minimalist and relies purely on clean bio, markdown lists, and typography.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {previewConfig.sections.map(sec => (
                          <div
                            key={sec.id}
                            className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between"
                          >
                            <div className="space-y-0.5">
                              <span className="font-mono text-xs font-bold text-violet-300">
                                {sec.type}
                              </span>
                              <p className="text-[10px] text-neutral-500 font-mono">
                                ID: {sec.id}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemovePluginFromPreview(sec.id)}
                              className="p-1 rounded text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                              title="Remove plugin from this preview"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* AI Prompt to Make It (Directly below preview) */}
                  <div className="rounded-xl border border-neutral-800 bg-neutral-950/90 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> AI Prompt to Make It
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(previewTemplate)}
                        className="text-xs font-mono text-neutral-300 hover:text-amber-300 transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </button>
                    </div>
                    <p className="text-xs text-neutral-300 font-mono leading-relaxed bg-neutral-900/60 p-3 rounded-lg border border-neutral-800/60 select-all">
                      {previewTemplate.prompt}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: Raw Markdown Source */}
              {previewTab === 'markdown' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-mono">Generated Markdown Output</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof navigator !== 'undefined' && navigator.clipboard) {
                          navigator.clipboard.writeText(previewMarkdown);
                          setCopiedMarkdown(true);
                          showToast('Markdown copied to clipboard!');
                          try {
                            confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 }, colors: ['#34d399', '#38bdf8'] });
                          } catch {
                            // Ignored
                          }
                          setTimeout(() => setCopiedMarkdown(false), 2200);
                        }
                      }}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all overflow-hidden ${
                        copiedMarkdown
                          ? 'animate-copy-pop bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700'
                      }`}
                    >
                      {copiedMarkdown && (
                        <span className="absolute inset-0 overflow-hidden pointer-events-none">
                          <span className="absolute inset-0 -translate-x-full animate-copy-gleam bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        </span>
                      )}
                      {copiedMarkdown ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300 animate-check-spring" />
                          <span>Copied Markdown!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Copy Markdown</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 font-mono overflow-x-auto whitespace-pre-wrap max-h-80 select-all leading-relaxed">
                    {previewMarkdown}
                  </pre>
                </div>
              )}

              {/* TAB 3: AI Prompt */}
              {previewTab === 'prompt' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-violet-950/30 via-neutral-950 to-neutral-950 border border-violet-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-neutral-100">AI Prompt for LLMs</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        Claude • ChatGPT • Gemini • DeepSeek
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed font-sans bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
                      {previewTemplate.prompt}
                    </p>

                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(previewTemplate)}
                        className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 overflow-hidden ${
                          copiedPromptId === previewTemplate.id
                            ? 'animate-copy-pop bg-emerald-500 text-neutral-950 shadow-[0_0_20px_rgba(52,211,153,0.5)]'
                            : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'
                        }`}
                      >
                        {copiedPromptId === previewTemplate.id && (
                          <span className="absolute inset-0 overflow-hidden pointer-events-none">
                            <span className="absolute inset-0 -translate-x-full animate-copy-gleam bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                          </span>
                        )}
                        {copiedPromptId === previewTemplate.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 animate-check-spring" />
                            <span>Prompt Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Prompt for AI</span>
                          </>
                        )}
                      </button>
                  </div>
                </div>
              )}

              {/* TAB 4: Manage Plugins */}
              {previewTab === 'plugins' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-200">
                        Active Plugins in this Archetype ({previewConfig.sections.length})
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        Remove or toggle plugins to customize before applying to your profile.
                      </p>
                    </div>
                    {previewConfig.sections.length < previewTemplate.config.sections.length && (
                      <button
                        type="button"
                        onClick={handleResetPreviewPlugins}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300"
                      >
                        <RefreshCw className="w-3 h-3 text-cyan-400" />
                        <span>Restore All Plugins</span>
                      </button>
                    )}
                  </div>

                  {previewConfig.sections.length === 0 ? (
                    <div className="p-6 rounded-xl border border-dashed border-neutral-800 text-center space-y-2">
                      <p className="text-xs text-neutral-400">All plugins have been removed from this preview.</p>
                      <button
                        type="button"
                        onClick={handleResetPreviewPlugins}
                        className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
                      >
                        Restore Plugins
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {previewConfig.sections.map((sec, idx) => (
                        <div
                          key={sec.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-neutral-800 flex items-center justify-center font-mono text-[11px] text-neutral-400 font-bold">
                              {idx + 1}
                            </span>
                            <div>
                              <span className="text-xs font-bold text-violet-300 font-mono">
                                {sec.type}
                              </span>
                              <p className="text-[10px] text-neutral-500 font-mono">
                                {JSON.stringify(sec.props.content).slice(0, 70)}...
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemovePluginFromPreview(sec.id)}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-neutral-950 border-t border-neutral-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyPrompt(previewTemplate)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all overflow-hidden ${
                    copiedPromptId === previewTemplate.id
                      ? 'animate-copy-pop bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.35)]'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700/60'
                  }`}
                >
                  {copiedPromptId === previewTemplate.id && (
                    <span className="absolute inset-0 overflow-hidden pointer-events-none">
                      <span className="absolute inset-0 -translate-x-full animate-copy-gleam bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </span>
                  )}
                  {copiedPromptId === previewTemplate.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-300 animate-check-spring" />
                      <span>Prompt Copied!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      navigator.clipboard.writeText(previewMarkdown);
                      setCopiedMarkdown(true);
                      showToast('Markdown copied to clipboard!');
                      try {
                        confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 }, colors: ['#34d399', '#38bdf8'] });
                      } catch {
                        // Ignored
                      }
                      setTimeout(() => setCopiedMarkdown(false), 2200);
                    }
                  }}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all overflow-hidden ${
                    copiedMarkdown
                      ? 'animate-copy-pop bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700/60'
                  }`}
                >
                  {copiedMarkdown && (
                    <span className="absolute inset-0 overflow-hidden pointer-events-none">
                      <span className="absolute inset-0 -translate-x-full animate-copy-gleam bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </span>
                  )}
                  {copiedMarkdown ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300 animate-check-spring" />
                      <span>Copied Markdown!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Copy Markdown</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Append to existing profile */}
                <button
                  type="button"
                  onClick={handleMergeFromPreview}
                  title="Add sections from this template without overwriting your profile bio"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-xs font-bold transition-all active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Add to My Profile</span>
                </button>

                {/* Apply entire template */}
                <button
                  type="button"
                  onClick={handleApplyFromPreview}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-900/40 transition-all active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply Template</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default TemplateGallery;
