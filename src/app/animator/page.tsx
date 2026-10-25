'use client';

import { Suspense } from 'react';
import { AnimatorStudio } from '#/components/animator/AnimatorStudio';

export default function AnimatorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-palette-base flex items-center justify-center text-neutral-400 font-mono text-xs">
          Loading Animation Studio...
        </div>
      }
    >
      <AnimatorStudio />
    </Suspense>
  );
}
