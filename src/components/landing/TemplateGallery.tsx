'use client';

import React, { useState } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ReadmeConfig } from '#/lib/plugins/types';
import confetti from 'canvas-confetti';
import { Check, ArrowRight, LayoutTemplate } from 'lucide-react';

interface TemplateItem {
  id: string;
  name: string;
  description: string;
  category: string;
  accent: string;
  config: ReadmeConfig;
}

export const TEMPLATES: TemplateItem[] = [
  {
    id: 'minimalist',
    name: 'Minimalist Clean',
    description: 'Ultra-clean profile with understated typography, essential skills, and compact socials.',
    category: 'Minimal',
    accent: '#64748b',
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
];

export const TemplateGallery: React.FC = () => {
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);
  const [appliedId, setAppliedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Popular', 'Minimal', 'Gaming', 'DevOps', 'AI / ML', 'Open Source'];

  const filtered = activeCategory === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === activeCategory);

  const handleApply = (template: TemplateItem) => {
    setEntireConfig(template.config);
    setAppliedId(template.id);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: [template.accent, '#8b5cf6', '#06b6d4'],
      });
    } catch {
      // Ignored
    }

    setTimeout(() => {
      setAppliedId(null);
      // Smooth scroll to wizard builder
      document.getElementById('wizard-builder')?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };

  return (
    <section className="py-14 px-4 max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-violet-300 text-xs font-semibold backdrop-blur-md shadow-sm">
          <LayoutTemplate className="w-3.5 h-3.5 text-violet-400" />
          <span>Curated Starters</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight">
          Curated Starter Archetypes
        </h2>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
          One-click apply clean, structured templates designed to make your developer profile stand out from day one.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-900/30 scale-100'
                : 'bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
            } active:scale-95`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
        {filtered.map(tmpl => {
          const isApplied = appliedId === tmpl.id;

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
              </div>

              <div className="pt-4 mt-5 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-mono font-medium">
                  {tmpl.config.sections.length} plugins configured
                </span>
                <button
                  type="button"
                  onClick={() => handleApply(tmpl)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 duration-200 ${
                    isApplied
                      ? 'bg-emerald-600 text-white shadow-emerald-900/40'
                      : 'bg-neutral-800 hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 text-neutral-200 hover:text-white'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" /> Applied!
                    </>
                  ) : (
                    <>
                      <span>Apply Template</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TemplateGallery;
