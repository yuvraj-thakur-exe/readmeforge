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
    <div className="min-h-screen bg-white text-neutral-950 flex flex-col font-sans selection:bg-[#ffe600] selection:text-neutral-950">
      <TopNav />

      {/* Studio Mode Switcher Bar */}
      <div className="bg-white border-b-2 border-neutral-900 px-4 py-2 flex items-center justify-between z-20 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white p-1 rounded-xl border-2 border-neutral-900 gap-1.5 shadow-[2px_2px_0px_#18181b]">
            <button
              type="button"
              onClick={() => setStudioMode('canvas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all btn-tactile cursor-pointer ${
                studioMode === 'canvas'
                  ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-[1px_1px_0px_#18181b]'
                  : 'bg-white text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>VISUAL CANVAS STUDIO</span>
            </button>
            <button
              type="button"
              onClick={() => setStudioMode('guided')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all btn-tactile cursor-pointer ${
                studioMode === 'guided'
                  ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-[1px_1px_0px_#18181b]'
                  : 'bg-white text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>STEP-BY-STEP WIZARD</span>
            </button>
          </div>
        </div>

        <div className="text-xs font-mono font-bold text-neutral-700 hidden sm:flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>
            {studioMode === 'canvas'
              ? 'Click or drag telemetry sections to visually customize your layout'
              : 'Guided questions with automated archetype generation'}
          </span>
        </div>
      </div>

      <main className="flex-1 overflow-hidden bg-white">
        {studioMode === 'canvas' ? <CanvasTemplate /> : <WizardContainer />}
      </main>
    </div>
  );
}

export default function WizardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white text-neutral-950 flex items-center justify-center text-xs font-mono">
          Loading Visual Studio...
        </div>
      }
    >
      <WizardContent />
    </Suspense>
  );
}
