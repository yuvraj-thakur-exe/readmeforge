import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer IDE Mode — ReadmeForge',
  description: 'Power-user raw JSON editor with Monaco, real-time Zod schema diagnostics, plugin ecosystem, and live GitHub README rendering.',
};

export default function DeveloperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {children}
    </div>
  );
}
