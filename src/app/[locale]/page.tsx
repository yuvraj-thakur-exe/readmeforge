'use client';

import React from 'react';
import { TopNav } from '#/components/navigation/TopNav';
import { WizardContainer } from '#/components/wizard/WizardContainer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-palette-base text-palette-contrast">
      <TopNav />
      <main className="flex-1">
        <WizardContainer />
      </main>
    </div>
  );
}
