'use client';

import { TopNav } from '#/components/navigation/TopNav';
import { CanvasTemplate } from '#/components/templates/canvas';

export default function CanvasPage() {
  return (
    <div className="min-h-screen bg-palette-surface text-palette-contrast flex flex-col">
      <TopNav />
      <main className="flex-1 overflow-hidden">
        <CanvasTemplate />
      </main>
    </div>
  );
}
