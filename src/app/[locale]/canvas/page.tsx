'use client';

import { TopNav } from '#/components/navigation/TopNav';
import { CanvasTemplate } from '#/components/templates/canvas';

export default function CanvasPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 flex flex-col font-sans">
      <TopNav />
      <main className="flex-1 overflow-hidden bg-white">
        <CanvasTemplate />
      </main>
    </div>
  );
}
