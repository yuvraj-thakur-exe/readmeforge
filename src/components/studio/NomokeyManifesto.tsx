'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What is MonoForge?',
    answer:
      'MonoForge is an open-source platform for creating, customizing, and managing GitHub profile READMEs with visual editing, developer telemetry, animated SVG graphics, and safe GitHub synchronization.',
  },
  {
    question: 'Is MonoForge free?',
    answer:
      'Yes. MonoForge is 100% free and open-source, released under the permissive MIT License for all developers worldwide.',
  },
  {
    question: 'Do I need coding knowledge?',
    answer:
      'No. You can use the Visual Studio wizard to craft layouts with guided drag-and-drop options. Developers who prefer direct configuration editing can jump into the Monaco-powered /developer raw IDE.',
  },
  {
    question: 'Can I use the generated components in my GitHub README?',
    answer:
      'Yes. MonoForge generates embeddable Markdown and 60fps Camo-compliant SVG components specifically architected for GitHub profile READMEs without external server dependencies.',
  },
  {
    question: 'Does MonoForge support automated updates?',
    answer:
      'Yes. GitHub Actions integration can generate and synchronize telemetry on scheduled cron runs, manual triggers, or repository pushes with zero maintenance.',
  },
  {
    question: 'Can I review changes before pushing them?',
    answer:
      'Yes. GitHub synchronization enforces an explicit confirmation-gated workflow with a side-by-side git diff review before committing anything to your repository.',
  },
  {
    question: 'Can organizations use MonoForge?',
    answer:
      'Yes. The telemetry engine and visual components support individual developer profiles as well as GitHub organizations, teams, and open-source projects.',
  },
];

export function NomokeyManifesto() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleIdx = (idx: number) => {
    (window as unknown as { __monoforge_playClick?: (freq?: number) => void }).__monoforge_playClick?.(800);
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="relative bg-white border-b-2 border-neutral-900 py-16 sm:py-24 px-4 sm:px-6 transition-colors">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Manifesto Block */}
        <div className="p-8 sm:p-12 rounded-3xl border-2 border-neutral-900 bg-white shadow-[6px_6px_0px_#18181b] space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-950">
            <span className="px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs">
              [ 07 // THE MONOFORGE MANIFESTO ]
            </span>
            <span>NO MONKEY BUSINESS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 uppercase leading-[1.05] font-sans">
            FIRST IMPRESSIONS ON GITHUB ARE PERMANENT. STOP SETTLING FOR BORING.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs font-mono leading-relaxed text-neutral-800">
            <div className="space-y-2 p-5 rounded-2xl bg-neutral-50 border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]">
              <span className="text-amber-600 font-black block text-sm">01 / CRAFT</span>
              <p>
                We believe engineering excellence should be visible at first glance. Generic bulleted READMEs fail to communicate the caliber of your technical skill.
              </p>
            </div>
            <div className="space-y-2 p-5 rounded-2xl bg-neutral-50 border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]">
              <span className="text-cyan-600 font-black block text-sm">02 / INTEGRITY</span>
              <p>
                No third-party trackers, no tracking cookies, no fragile third-party CDNs that break when maintainers abandon them. 100% self-hosted &amp; open-source.
              </p>
            </div>
            <div className="space-y-2 p-5 rounded-2xl bg-neutral-50 border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b]">
              <span className="text-emerald-600 font-black block text-sm">03 / VELOCITY</span>
              <p>
                From raw JSON in /developer to one-click confirmed GitHub commit in under 60 seconds. Precision tooling without friction.
              </p>
            </div>
          </div>
        </div>

        {/* Technical FAQ Accordion */}
        <div className="space-y-4">
          <div className="border-b-2 border-neutral-900 pb-4 mb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-600 uppercase mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-neutral-950 font-sans">
                EVERYTHING YOU NEED TO KNOW
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-neutral-500 hidden sm:inline">
              7 QUESTIONS ANSWERED
            </span>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-neutral-900 bg-white overflow-hidden shadow-[3px_3px_0px_#18181b] transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleIdx(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full p-5 text-left font-bold text-sm sm:text-base flex items-center justify-between text-neutral-950 hover:bg-[#fffde6] transition-colors cursor-pointer"
                  >
                    <span className="font-sans font-black pr-4">{faq.question}</span>
                    <div className="p-1 rounded-lg border border-neutral-900 bg-[#ffe600] shrink-0">
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-950 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${idx}`}
                      className="px-5 pb-5 text-xs sm:text-sm font-mono text-neutral-800 leading-relaxed border-t border-neutral-200 pt-3 animate-in fade-in duration-150"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
