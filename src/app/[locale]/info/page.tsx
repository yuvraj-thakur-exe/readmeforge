'use client';

import { Suspense } from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import { InfoHub } from '#/components/info/InfoHub';

export default function LocalizedInfoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100 selection:bg-violet-500 selection:text-white">
      <TopNav />
      <Suspense
        fallback={
          <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400 font-mono text-xs">
            Loading ReadmeForge Documentation &amp; Info Hub...
          </div>
        }
      >
        <InfoHub />
      </Suspense>
    </div>
  );
}
