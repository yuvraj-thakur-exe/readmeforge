'use client';

import { Suspense } from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import { InfoHub } from '#/components/info/InfoHub';

export default function LocalizedInfoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f6] text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 selection:bg-amber-500/20 selection:text-amber-900 dark:selection:text-amber-200">
      <TopNav />
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#faf9f6] dark:bg-neutral-950 flex items-center justify-center text-neutral-500 dark:text-neutral-400 font-mono text-xs">
            Loading MonoForge Documentation &amp; Info Hub...
          </div>
        }
      >
        <InfoHub />
      </Suspense>
    </div>
  );
}
