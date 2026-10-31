'use client';

import { Link } from '#/i18n/navigation';
import { Sparkles, Github, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';

export function FinalCta() {
  return (
    <section className="relative bg-white border-b-2 border-neutral-900 py-16 sm:py-24 px-4 sm:px-6 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl border-2 border-neutral-900 bg-[#fafafa] p-8 sm:p-14 shadow-[8px_8px_0px_#18181b] overflow-hidden text-center space-y-8">
          {/* Subtle Corner Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffe600] text-neutral-950 font-mono text-xs font-black border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>ZERO MONKEY BUSINESS. PURE PRECISION ENGINEERING.</span>
          </div>

          {/* Center Graphic */}
          <div className="flex justify-center">
            <div className="relative p-2 rounded-2xl bg-white border-2 border-neutral-900 shadow-[4px_4px_0px_#18181b]">
              <MonoForgeMonkeyIcon className="w-16 h-16 sm:w-20 sm:h-20" />
              <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-[#ffe600] text-neutral-950 text-[10px] font-mono font-black border border-neutral-900 shadow-2xs">
                OFFICIAL
              </span>
            </div>
          </div>

          {/* Statement Headline */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 uppercase font-sans leading-tight">
              BUILD A PROFILE WORTH EXPLORING.
            </h2>
            <p className="text-sm sm:text-base font-mono text-neutral-700 leading-relaxed">
              Your GitHub profile is more than a list of repositories. It is your developer identity. Make it visual. Make it personal. Make it yours.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/wizard"
              data-cursor-label="STUDIO"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-black text-sm tracking-wide border-2 border-neutral-900 shadow-[4px_4px_0px_#18181b] hover:shadow-[2px_2px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all btn-tactile"
            >
              <Sparkles className="w-4 h-4 text-neutral-950 group-hover:rotate-12 transition-transform" />
              <span>LAUNCH STUDIO</span>
              <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="https://github.com/monoforge/MONOFORGE"
              target="_blank"
              rel="noreferrer"
              data-cursor-label="GITHUB"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-neutral-950 font-bold text-sm tracking-wide border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] hover:shadow-[1px_1px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all btn-tactile"
            >
              <Github className="w-4 h-4 text-neutral-950" />
              <span>EXPLORE ON GITHUB</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-600 border-t border-neutral-200">
            <span className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Free &amp; Open Source (MIT)</span>
            </span>
            <span className="text-neutral-400">&bull;</span>
            <span className="font-bold">Zero External Tracking</span>
            <span className="text-neutral-400">&bull;</span>
            <span className="font-bold">60fps Camo CDN Safe</span>
          </div>
        </div>
      </div>
    </section>
  );
}

