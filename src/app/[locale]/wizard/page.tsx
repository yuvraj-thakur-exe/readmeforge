'use client';

import { TopNav } from '#/components/navigation/TopNav';
import { WizardContainer } from '#/components/wizard';

export default function WizardPage() {
  return (
    <div className="min-h-screen bg-palette-surface text-palette-contrast flex flex-col">
      <TopNav />
      <main className="flex-1">
        <WizardContainer />
      </main>
    </div>
  );
}
