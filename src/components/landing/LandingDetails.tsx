'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Wand2,
  Terminal,
  Puzzle,
  ShieldCheck,
  Download,
  GitBranch,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  FileCode,
  Sparkles,
  ChevronDown,
  Eye,
  Code2,
} from 'lucide-react';
import { FadeIn } from '#/components/motion/FadeIn';
import { Stagger, StaggerItem } from '#/components/motion/Stagger';

export const LandingDetails: React.FC = () => {
  const t = useTranslations('landing');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [previewTab, setPreviewTab] = useState<'preview' | 'markdown'>('preview');

  const toggleFaq = (index: number) => {
    setActiveFaq(prev => (prev === index ? null : index));
  };

  const featureCards = [
    {
      icon: <Wand2 className="w-5 h-5 text-violet-400" />,
      title: t('features.wizardTitle'),
      description: t('features.wizardDesc'),
      badge: 'Visual Builder',
    },
    {
      icon: <Terminal className="w-5 h-5 text-cyan-400" />,
      title: t('features.monacoTitle'),
      description: t('features.monacoDesc'),
      badge: '/developer IDE',
    },
    {
      icon: <Puzzle className="w-5 h-5 text-fuchsia-400" />,
      title: t('features.pluginsTitle'),
      description: t('features.pluginsDesc'),
      badge: '8+ OSS Widgets',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: t('features.enrichmentTitle'),
      description: t('features.enrichmentDesc'),
      badge: 'Confirm Gate',
    },
    {
      icon: <Download className="w-5 h-5 text-amber-400" />,
      title: t('features.exportTitle'),
      description: t('features.exportDesc'),
      badge: 'Multi-Format',
    },
    {
      icon: <GitBranch className="w-5 h-5 text-blue-400" />,
      title: t('features.diffSyncTitle'),
      description: t('features.diffSyncDesc'),
      badge: 'Diff Preview',
    },
  ];

  const workflowSteps = [
    {
      number: '01',
      title: t('workflow.step1Title'),
      description: t('workflow.step1Desc'),
      detail: t('workflow.step1Detail'),
    },
    {
      number: '02',
      title: t('workflow.step2Title'),
      description: t('workflow.step2Desc'),
      detail: t('workflow.step2Detail'),
    },
    {
      number: '03',
      title: t('workflow.step3Title'),
      description: t('workflow.step3Desc'),
      detail: t('workflow.step3Detail'),
    },
  ];

  const safeguards = [
    {
      icon: <Lock className="w-5 h-5 text-violet-400" />,
      title: t('safeguards.confirmGateTitle'),
      description: t('safeguards.confirmGateDesc'),
    },
    {
      icon: <GitBranch className="w-5 h-5 text-cyan-400" />,
      title: t('safeguards.diffPreviewTitle'),
      description: t('safeguards.diffPreviewDesc'),
    },
    {
      icon: <Layers className="w-5 h-5 text-fuchsia-400" />,
      title: t('safeguards.singleStoreTitle'),
      description: t('safeguards.singleStoreDesc'),
    },
    {
      icon: <FileCode className="w-5 h-5 text-emerald-400" />,
      title: t('safeguards.pureEngineTitle'),
      description: t('safeguards.pureEngineDesc'),
    },
  ];

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
  ];

  return (
    <div className="w-full space-y-24 py-16 px-4 max-w-7xl mx-auto">
      {/* 1. Profile Preview Mockup */}
      <section className="space-y-6">
        <FadeIn direction="up">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-800/80 text-violet-300 text-xs font-semibold">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t('preview.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-100">
              {t('preview.title')}
            </h2>
            <p className="text-sm text-neutral-400">
              {t('preview.subtitle')}
            </p>
          </div>
        </FadeIn>

        {/* Mockup Frame */}
        <FadeIn delay={0.1} direction="up">
          <div className="rounded-2xl border border-neutral-800/90 bg-neutral-950 shadow-2xl overflow-hidden max-w-5xl mx-auto">
            {/* Window Topbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/90 border-b border-neutral-800/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-[11px] text-neutral-400 hidden sm:inline">
                  github.com/developer/README.md
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-neutral-950/80 p-0.5 rounded-lg border border-neutral-800">
                <button
                  type="button"
                  onClick={() => setPreviewTab('preview')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    previewTab === 'preview'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {t('preview.tabVisual')}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('markdown')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    previewTab === 'markdown'
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {t('preview.tabMarkdown')}
                </button>
              </div>
            </div>

            {/* Profile Mockup Content Area */}
            {previewTab === 'preview' ? (
              <div className="p-6 md:p-8 space-y-6 bg-gradient-to-b from-neutral-950 via-neutral-900/50 to-neutral-950">
                {/* Simulated Header Banner with Animated Cyber-Grid Overlay */}
                <div className="relative rounded-xl overflow-hidden h-36 sm:h-44 border border-violet-500/30 flex items-center justify-between px-6 bg-neutral-950">
                  <img
                    src="/assets/banner-animated.svg"
                    alt="ReadmeForge Animated Banner"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/75 to-transparent pointer-events-none" />
                  <div className="space-y-1.5 z-10">
                    <span className="text-[11px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">
                      Full-Stack &bull; AI Agent Architect
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Alex Mercer <span className="text-violet-400 font-mono">(@octocat)</span>
                    </h3>
                    <p className="text-xs text-neutral-300 max-w-md">
                      Building next-generation intelligent developer tools and distributed web platforms.
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 z-10">
                    <span className="p-2 rounded-lg bg-neutral-950/80 border border-neutral-800 text-cyan-400 font-mono text-xs backdrop-blur-sm">
                      ⚡ Open to Collaboration
                    </span>
                  </div>
                </div>

                {/* Two-Column Mockup Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                  {/* Left Column Profile Card */}
                  <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800/80 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 p-0.5">
                        <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center font-bold text-white text-sm">
                          AM
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-neutral-100 text-sm">Alex Mercer</div>
                        <div className="text-[11px] text-neutral-400">San Francisco, CA 🇺🇸</div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-neutral-800 text-neutral-300">
                      <div>🔭 <b>Working on:</b> Autonomous dev agents</div>
                      <div>🌱 <b>Mastering:</b> Rust & WebAssembly</div>
                      <div>💬 <b>Ask me about:</b> Next.js, Python, LLMs</div>
                      <div>⚡ <b>Philosophy:</b> Less code, maximum leverage</div>
                    </div>

                    <div className="pt-2 border-t border-neutral-800 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800 text-[10px]">
                        TypeScript
                      </span>
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px]">
                        Python
                      </span>
                      <span className="px-2 py-0.5 rounded bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-800 text-[10px]">
                        React
                      </span>
                    </div>
                  </div>

                  {/* Right Column (2 spans) */}
                  <div className="md:col-span-2 space-y-4">
                    {/* Tech Badges Row */}
                    <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800/80 space-y-2">
                      <span className="font-semibold text-neutral-200 block text-xs">
                        🛠️ Tech Stack & Arsenal
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['TypeScript', 'React', 'Next.js', 'Tailwind', 'Python', 'Firebase', 'Docker', 'PostgreSQL'].map(tech => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* GitHub Stats Mockup */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 space-y-1.5">
                        <span className="text-[11px] text-neutral-400 font-mono block">GitHub Live Stats</span>
                        <div className="text-xl font-extrabold text-cyan-400">1,842 Commits</div>
                        <div className="text-[10px] text-neutral-500">A+ Rank &bull; 98.4% PR Acceptance</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 space-y-1.5">
                        <span className="text-[11px] text-neutral-400 font-mono block">Contribution Streak</span>
                        <div className="text-xl font-extrabold text-violet-400">42 Days Active</div>
                        <div className="text-[10px] text-neutral-500">Longest: 118 Days &bull; Steady Rhythm</div>
                      </div>
                    </div>

                    {/* Contribution Activity Heatmap Mockup */}
                    <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-neutral-200 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                          <span>Contribution Activity</span>
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          1,842 contributions in the last year
                        </span>
                      </div>

                      {/* 36-column x 7-row interactive activity grid */}
                      <div className="overflow-x-auto pb-1">
                        <div className="flex gap-[3px] min-w-[500px]">
                          {Array.from({ length: 36 }).map((_, cIdx) => (
                            <div key={cIdx} className="flex flex-col gap-[3px]">
                              {Array.from({ length: 7 }).map((_, rIdx) => {
                                const weight = (cIdx * 5 + rIdx * 7 + (cIdx % 4) * 3) % 11;
                                const level = weight < 3 ? 0 : weight < 6 ? 1 : weight < 8 ? 2 : weight < 10 ? 3 : 4;
                                const colors = [
                                  'bg-neutral-800/80',
                                  'bg-emerald-950 border border-emerald-900/50',
                                  'bg-emerald-800',
                                  'bg-emerald-500',
                                  'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]',
                                ];
                                return (
                                  <span
                                    key={rIdx}
                                    className={`w-2.5 h-2.5 rounded-[2px] ${colors[level]} transition-transform hover:scale-125 cursor-pointer`}
                                    title={`Week ${cIdx + 1}, Day ${rIdx + 1}: ${level * 3 + 1} contributions`}
                                  />
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-neutral-500 pt-1 border-t border-neutral-800/60 font-mono">
                        <div className="flex gap-6">
                          <span>Jan</span>
                          <span>Mar</span>
                          <span>May</span>
                          <span>Jul</span>
                          <span>Sep</span>
                          <span>Nov</span>
                          <span>Dec</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Less</span>
                          <span className="w-2 h-2 rounded-[2px] bg-neutral-800 inline-block" />
                          <span className="w-2 h-2 rounded-[2px] bg-emerald-950 inline-block" />
                          <span className="w-2 h-2 rounded-[2px] bg-emerald-800 inline-block" />
                          <span className="w-2 h-2 rounded-[2px] bg-emerald-500 inline-block" />
                          <span className="w-2 h-2 rounded-[2px] bg-cyan-400 inline-block" />
                          <span>More</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-neutral-950 font-mono text-xs text-neutral-300 overflow-x-auto leading-relaxed">
                <pre>{`# ⚔️ Alex Mercer (@octocat)
### Software Architect • Full-Stack Developer • AI Agent Builder

[![GitHub Stats](https://github-readme-stats.vercel.app/api?username=octocat&theme=tokyonight)](https://github.com/octocat)
[![Streak Stats](https://streak-stats.demolab.com/?user=octocat&theme=tokyonight)](https://github.com/octocat)

### 🟩 Contribution Activity
[![Contribution Chart](https://ghchart.rshah.org/22d3ee/octocat)](https://github.com/octocat)

### 🛠️ Tech Stack
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)

- 🔭 Working on: Autonomous dev agent loops
- 🌱 Currently mastering: Distributed WebAssembly architectures
- 💬 Ask me about: Full-Stack React, Python, Cloud Systems`}</pre>
              </div>
            )}
          </div>
        </FadeIn>
      </section>

      {/* 2. Feature Cards Grid */}
      <section className="space-y-8">
        <FadeIn direction="up">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('features.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-100">
              {t('features.title')}
            </h2>
            <p className="text-sm text-neutral-400">
              {t('features.subtitle')}
            </p>
          </div>
        </FadeIn>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureCards.map((card, idx) => (
            <StaggerItem key={idx}>
              <div className="h-full p-6 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-violet-500/50 transition-all flex flex-col justify-between group shadow-sm hover:shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 group-hover:scale-110 transition-transform">
                      {card.icon}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-100 group-hover:text-violet-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 3. Three-Step Workflow */}
      <section className="space-y-8">
        <FadeIn direction="up">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-800/80 text-violet-300 text-xs font-semibold">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t('workflow.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-100">
              {t('workflow.title')}
            </h2>
            <p className="text-sm text-neutral-400">
              {t('workflow.subtitle')}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workflowSteps.map((step, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} direction="up">
              <div className="relative p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-4xl font-extrabold font-mono bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-100">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-500">
                  {step.detail}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 4. Safeguards & Trust Invariants */}
      <section className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-neutral-900/80 to-neutral-950 border border-neutral-800 space-y-8">
        <FadeIn direction="up">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t('safeguards.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-100">
              {t('safeguards.title')}
            </h2>
            <p className="text-sm text-neutral-400">
              {t('safeguards.subtitle')}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {safeguards.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2.5"
            >
              <div className="p-2 rounded-lg bg-neutral-900 w-fit border border-neutral-800">
                {item.icon}
              </div>
              <h4 className="text-sm font-bold text-neutral-200">
                {item.title}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Developer Mode Callout */}
      <section className="relative overflow-hidden p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-violet-950/50 via-neutral-900 to-cyan-950/40 border border-violet-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/50 border border-violet-700/60 text-violet-300 text-xs font-semibold">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('developerMode.badge')}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-100">
            {t('developerMode.title')}
          </h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
            {t('developerMode.subtitle')}
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            href="/developer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold shadow-lg shadow-violet-900/30 transition-all hover:scale-105"
          >
            <Terminal className="w-4 h-4" />
            <span>{t('developerMode.cta')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. Frequently Asked Questions (FAQ) */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <FadeIn direction="up">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-100">
              {t('faq.title')}
            </h2>
            <p className="text-sm text-neutral-400">
              {t('faq.subtitle')}
            </p>
          </div>
        </FadeIn>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-neutral-200 hover:text-white transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform ${
                      isOpen ? 'rotate-180 text-violet-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default LandingDetails;
