'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TopNav } from '#/components/navigation/TopNav';
import { WizardContainer } from '#/components/wizard';
import { CanvasTemplate } from '#/components/templates/canvas';
import { LayoutDashboard, ListOrdered, Sparkles } from 'lucide-react';

function WizardContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams?.get('mode') === 'guided' ? 'guided' : 'canvas';
  const [studioMode, setStudioMode] = useState<'canvas' | 'guided'>(initialMode);

  return (
    <div className="min-h-screen bg-palette-surface text-palette-contrast flex flex-col">
      <TopNav />

      {/* Studio Mode Switcher Bar */}
      <div className="bg-neutral-900/90 border-b border-neutral-800/80 px-4 py-2 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-neutral-950 p-1 rounded-lg border border-neutral-800">
            <button
              type="button"
              onClick={() => setStudioMode('canvas')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                studioMode === 'canvas'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold shadow-md'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Visual Canvas Studio</span>
            </button>
            <button
              type="button"
              onClick={() => setStudioMode('guided')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                studioMode === 'guided'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold shadow-md'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Step-by-Step Wizard</span>
            </button>
          </div>
        </div>

        <div className="text-xs text-neutral-400 hidden sm:flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            {studioMode === 'canvas'
              ? 'Click or drag sections to visually customize your profile layout'
              : 'Guided questions with automated archetype generation'}
          </span>
        </div>
      </div>

      <main className="flex-1 overflow-hidden">
        {studioMode === 'canvas' ? <CanvasTemplate /> : <WizardContainer />}
      </main>
    </div>
  );
}

export default function WizardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-palette-surface text-palette-contrast flex items-center justify-center text-xs font-mono">
          Loading Studio...
        </div>
      }
    >
      <WizardContent />
    </Suspense>
  );
}
