'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How does the native Telemetry Engine work without third-party servers?',
    answer:
      'MonoForge renders 100% self-hosted SVG keyframes either at build time, via an automated GitHub Action workflow, or through our high-speed Next.js edge endpoint. Unlike legacy widgets that rely on slow external endpoints, MonoForge telemetry has 0% uptime dependency on third-party services.',
  },
  {
    question: 'Why are MonoForge animated SVGs 100% immune to GitHub Camo breaks?',
    answer:
      'GitHub proxies all README images through its strict Camo CDN (camo.githubusercontent.com) and sanitizes any <script>, <foreignObject>, or external font links. MonoForge vector animations strictly use GPU-accelerated CSS @keyframes, transform-box: fill-box, and system font stacks. Every single SVG passes strict Camo compliance before export.',
  },
  {
    question: 'What makes /developer Raw Mode better than standard README generators?',
    answer:
      '/developer provides a full-fledged Monaco IDE editor (the engine behind VS Code) paired with real-time AST linting, autocomplete, and live rendered Markdown. You get full control over your raw profile JSON schema without being constrained by rigid form builders.',
  },
  {
    question: 'Can I automate nightly profile telemetry updates?',
    answer:
      'Yes. MonoForge generates a ready-to-run GitHub Action (.github/workflows/monoforge-telemetry.yml) that executes nightly via cron to regenerate your commit spheres, language bars, and coding habits directly into your repo with 100% git history integrity.',
  },
];

export function NomokeyManifesto() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative bg-[#faf8f5] dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Manifesto Block */}
        <div className="p-8 sm:p-12 rounded-3xl border-2 border-neutral-900 dark:border-neutral-100 bg-white dark:bg-neutral-900 shadow-[6px_6px_0px_#18181b] dark:shadow-[6px_6px_0px_#f4f4f5] space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            <span>[ 05 // THE MONOFORGE MANIFESTO ]</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-neutral-500">NO MONKEY BUSINESS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 dark:text-white uppercase leading-[1.05]">
            FIRST IMPRESSIONS ON GITHUB ARE PERMANENT. STOP SETTLING FOR BORING.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs font-mono leading-relaxed text-neutral-700 dark:text-neutral-300">
            <div className="space-y-2 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <span className="text-amber-500 font-bold block text-sm">01 / CRAFT</span>
              <p>
                We believe engineering excellence should be visible at first glance. Generic bulleted READMEs fail to communicate the caliber of your technical skill.
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <span className="text-cyan-500 font-bold block text-sm">02 / INTEGRITY</span>
              <p>
                No third-party trackers, no tracking cookies, no fragile third-party CDNs that break when maintainers abandon them. 100% self-hosted &amp; open-source.
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <span className="text-emerald-500 font-bold block text-sm">03 / VELOCITY</span>
              <p>
                From raw JSON in /developer to one-click confirmed GitHub commit in under 60 seconds. Precision tooling without friction.
              </p>
            </div>
          </div>
        </div>

        {/* Technical FAQ Accordion */}
        <div className="space-y-4">
          <div className="border-b-2 border-neutral-900 dark:border-neutral-100 pb-4 mb-6">
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-neutral-950 dark:text-white">
              TECHNICAL ARCHITECTURE &amp; FAQ
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border-2 border-neutral-900 dark:border-neutral-100 bg-white dark:bg-neutral-900 overflow-hidden shadow-[3px_3px_0px_#18181b] dark:shadow-[3px_3px_0px_#f4f4f5] transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-sm sm:text-base flex items-center justify-between text-neutral-950 dark:text-white hover:text-amber-500 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-500' : 'text-neutral-400'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-mono leading-relaxed border-t border-neutral-100 dark:border-neutral-800">
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
