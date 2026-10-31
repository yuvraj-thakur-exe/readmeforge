'use client';

import { Suspense } from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import { AnimatorStudio } from '#/components/animator/AnimatorStudio';

export default function LocalizedAnimatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900 selection:bg-[#ffe600] selection:text-neutral-950 font-sans">
      <TopNav />
      <Suspense
        fallback={
          <div className="min-h-screen bg-white flex items-center justify-center text-neutral-500 font-mono text-xs">
            Loading MonoForge Vector Animation Studio...
          </div>
        }
      >
        <AnimatorStudio />
      </Suspense>
    </div>
  );
}
