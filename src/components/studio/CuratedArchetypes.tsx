'use client';

import { useState } from 'react';
import { Link } from '#/i18n/navigation';
import { Code2, ArrowRight } from 'lucide-react';
import { TemplateGallery } from '#/components/landing/TemplateGallery';

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
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  return (
    <section className="relative bg-white border-b-2 border-neutral-900 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-neutral-900 pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-950 mb-2">
              <span className="px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 font-black border border-neutral-900">
                [ 06 // SIGNATURE ARCHETYPES ]
              </span>
              <span>MARCO MADONNA &amp; POULO INSPIRED</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 uppercase font-sans">
              CURATED PROFILE STARTERS.
            </h2>
          </div>

          <Link
            href="/wizard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-neutral-950 text-xs font-mono font-black border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]  hover:bg-[#ffe600] hover:text-neutral-950 transition-all"
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
              className="rounded-2xl border-2 border-neutral-900 bg-white p-6 flex flex-col justify-between shadow-[4px_4px_0px_#18181b]  hover:shadow-[2px_2px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-neutral-900"
                    style={{ backgroundColor: arch.accentColor }}
                  />
                  <span className="text-[10px] font-mono font-black text-neutral-600 uppercase tracking-wider">
                    {arch.role}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-xl text-neutral-950 group-hover:text-amber-500 transition-colors">
                    {arch.name}
                  </h3>
                  <p className="text-xs text-neutral-800 font-mono mt-2 leading-relaxed">
                    {arch.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {arch.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-black bg-neutral-50 text-neutral-950 border-2 border-neutral-900 shadow-[1px_1px_0px_#18181b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t-2 border-neutral-900 flex items-center justify-between">
                <Link
                  href="/wizard"
                  className="px-3.5 py-2 rounded-xl bg-[#ffe600] text-neutral-950 text-xs font-mono font-black border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] hover:bg-[#ffdf00] inline-flex items-center gap-1.5 transition-all btn-tactile"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/developer"
                  className="p-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] transition-all"
                  title="Edit in Monaco Raw Mode"
                >
                  <Code2 className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Full Interactive Template Gallery */}
        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={() => setShowAllTemplates(!showAllTemplates)}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#ffe600] text-neutral-950 font-mono text-xs sm:text-sm font-black border-2 border-neutral-900 shadow-[4px_4px_0px_#18181b] hover:shadow-[2px_2px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer btn-tactile"
          >
            <span>{showAllTemplates ? '▲ COLLAPSE ARCHETYPE VAULT' : '▼ EXPLORE ALL 50+ ARCHETYPES WITH LIVE SEARCH & PREVIEW'}</span>
          </button>
        </div>

        {/* Embedded Full Template Gallery */}
        {showAllTemplates && (
          <div className="pt-10 border-t-2 border-neutral-900 animate-in fade-in duration-300">
            <TemplateGallery />
          </div>
        )}
      </div>
    </section>
  );
}
