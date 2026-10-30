'use client';

import { Link } from '#/i18n/navigation';
import { Code2, ArrowRight } from 'lucide-react';

interface ArchetypeItem {
  id: string;
  name: string;
  role: string;
  description: string;
  tags: string[];
  accentColor: string;
}

const ARCHETYPES: ArchetypeItem[] = [
  {
    id: 'cyber-monkey-hud',
    name: 'Cyber Monkey HUD',
    role: 'Systems & Infrastructure',
    description: 'High-density terminal HUD with real-time cursor tracking, radar circles, and nightly action telemetry.',
    tags: ['Interactive SVG', '47+ Telemetry', 'Terminal HUD'],
    accentColor: '#f59e0b',
  },
  {
    id: 'swiss-minimalist',
    name: 'Swiss Typographer',
    role: 'Product Designer & Frontend',
    description: 'Generous whitespace, stark typographic hierarchy, and subtle monochrome micro-borders inspired by Poulo.',
    tags: ['Editorial', 'Monochrome', 'Zero Noise'],
    accentColor: '#18181b',
  },
  {
    id: 'isometric-polyglot',
    name: 'Isometric Polyglot',
    role: 'Full-Stack Polyglot',
    description: 'Full-year 3D isometric commit cube sphere paired with precise language time-distribution analytics.',
    tags: ['3D Isocalendar', 'Language Radar', 'LeetCode'],
    accentColor: '#06b6d4',
  },
  {
    id: 'pixel-craftsman',
    name: 'Pixel Craftsman',
    role: 'Game Dev & Creative Engineer',
    description: 'Dual-monitor pixel developer workstation with rising coffee steam, matrix scanlines, and retro stickers.',
    tags: ['Pixel Art', '60fps Loop', 'Stickers'],
    accentColor: '#10b981',
  },
];

export function CuratedArchetypes() {
  return (
    <section className="relative bg-[#fafafa] dark:bg-neutral-950 border-b-2 border-neutral-900 dark:border-neutral-800 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-neutral-900 dark:border-neutral-100 pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100 mb-2">
              <span className="px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 font-black border border-neutral-900">
                [ 06 // SIGNATURE ARCHETYPES ]
              </span>
              <span>MARCO MADONNA &amp; POULO INSPIRED</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 dark:text-white uppercase font-sans">
              CURATED PROFILE STARTERS.
            </h2>
          </div>

          <Link
            href="/wizard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 text-neutral-950 dark:text-neutral-100 text-xs font-mono font-black border-2 border-neutral-900 dark:border-neutral-100 shadow-[2px_2px_0px_#18181b] dark:shadow-[2px_2px_0px_#f4f4f5] hover:bg-[#ffe600] hover:text-neutral-950 transition-all"
          >
            <span>View All 18+ Archetypes in Wizard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Archetypes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARCHETYPES.map((arch) => (
            <div
              key={arch.id}
              className="rounded-2xl border-2 border-neutral-900 dark:border-neutral-100 bg-[#faf8f5] dark:bg-neutral-950 p-6 flex flex-col justify-between shadow-[4px_4px_0px_#18181b] dark:shadow-[4px_4px_0px_#f4f4f5] hover:shadow-[2px_2px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-neutral-900"
                    style={{ backgroundColor: arch.accentColor }}
                  />
                  <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                    {arch.role}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-xl text-neutral-950 dark:text-white group-hover:text-amber-500 transition-colors">
                    {arch.name}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                    {arch.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {arch.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-neutral-200/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <Link
                  href="/wizard"
                  className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-500 inline-flex items-center gap-1"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/developer"
                  className="p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  title="Edit in Monaco Raw Mode"
                >
                  <Code2 className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
