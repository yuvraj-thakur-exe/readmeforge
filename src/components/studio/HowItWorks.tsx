'use client';

import { Link } from '#/i18n/navigation';
import {
  Sparkles,
  SlidersHorizontal,
  BarChart3,
  Eye,
  GitPullRequest,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Open MonoForge Studio',
    description: 'Launch the interactive visual builder or jump straight into the Monaco /developer raw editor.',
    icon: Sparkles,
    badge: 'START',
    link: '/wizard',
    ctaText: 'Open Studio',
  },
  {
    step: '02',
    title: 'Customize Your Profile',
    description: 'Choose from 18+ visual archetypes, configure section headers, badges, and cyber monkey companions.',
    icon: SlidersHorizontal,
    badge: 'DESIGN',
    link: '/wizard',
    ctaText: 'Pick Archetype',
  },
  {
    step: '03',
    title: 'Add Developer Telemetry',
    description: 'Select from 47+ live plugins: 3D isocalendars, commit radars, streak trackers, LeetCode, and WakaTime.',
    icon: BarChart3,
    badge: 'METRICS',
    link: '/telemetry',
    ctaText: 'Browse 47+ Plugins',
  },
  {
    step: '04',
    title: 'Preview Your README',
    description: 'Inspect live Markdown and 60fps Camo SVGs side-by-side with zero latency before publishing.',
    icon: Eye,
    badge: 'LIVE VIEW',
    link: '/developer',
    ctaText: 'View Split Preview',
  },
  {
    step: '05',
    title: 'Synchronize With GitHub',
    description: 'Review color-coded git diffs and approve changes through a safe, confirmation-gated OAuth commit flow.',
    icon: GitPullRequest,
    badge: 'DIFF SAFE',
    link: '/developer',
    ctaText: 'Review Diff Flow',
  },
  {
    step: '06',
    title: 'Showcase Your Identity',
    description: 'Your forged, high-impact profile is live on GitHub—commanding attention from recruiters and peers.',
    icon: CheckCircle2,
    badge: 'DEPLOYED',
    link: '/wizard',
    ctaText: 'Forge Now',
  },
];

export function HowItWorks() {
  return (
    <section className="relative bg-white border-b-2 border-neutral-900 py-16 sm:py-24 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-neutral-900 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-950">
              <span className="px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs">
                [ 04 // HOW IT WORKS ]
              </span>
              <span>SIX PRECISION STEPS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 uppercase font-sans">
              HOW MONOFORGE WORKS.
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-neutral-700 max-w-md">
            From an empty profile to a high-impact, Camo-safe developer showcase in under 60 seconds. Zero monkey business.
          </p>
        </div>

        {/* 6-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="group p-6 sm:p-7 rounded-2xl border-2 border-neutral-900 bg-white hover:bg-[#fffde6] shadow-[4px_4px_0px_#18181b] hover:shadow-[2px_2px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-900">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-[#ffe600] text-neutral-950 font-mono text-sm font-black flex items-center justify-center border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]">
                        {step.step}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white text-neutral-950 text-[10px] font-mono font-black border border-neutral-900 shadow-2xs">
                        {step.badge}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-neutral-100 border border-neutral-900 group-hover:bg-[#ffe600] transition-colors">
                      <Icon className="w-4 h-4 text-neutral-950" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-neutral-950 font-sans tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-mono text-neutral-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Card Bottom CTA Link */}
                <div className="pt-5 mt-4 border-t border-neutral-200">
                  <Link
                    href={step.link}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-black text-neutral-950 group-hover:text-amber-700 transition-colors"
                  >
                    <span>{step.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

