'use client';

import { useState } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { pluginRegistry } from '#/lib/plugins/registry';
import { LivePreviewPane } from './LivePreviewPane';
import { FadeIn } from '#/components/motion/FadeIn';
import {
  User,
  Palette,
  Code2,
  BarChart3,
  Share2,
  FolderGit2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';

const STEPS = [
  { id: 'identity', label: 'Identity', icon: User },
  { id: 'style', label: 'Style & Vibe', icon: Palette },
  { id: 'skills', label: 'Skills & Tech', icon: Code2 },
  { id: 'plugins', label: 'Stats & Plugins', icon: BarChart3 },
  { id: 'socials', label: 'Social & Links', icon: Share2 },
  { id: 'projects', label: 'Projects & Bio', icon: FolderGit2 },
];

export function WizardContainer() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { config, setGithub, updateSettings, addSection, removeSection, updateSection } = useReadmeStore();

  const user = config.settings.user;
  const currentStep = STEPS[currentStepIndex];

  // Helper to check if a plugin is active in sections
  const isPluginActive = (pluginId: string) =>
    config.sections.some(s => s.type === pluginId);

  const togglePlugin = (pluginId: string) => {
    const existing = config.sections.find(s => s.type === pluginId);
    if (existing) {
      removeSection(existing.id);
    } else {
      const plugin = pluginRegistry.find(p => p.id === pluginId);
      addSection(pluginId, { content: plugin?.defaultConfig || {} });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-80px)] p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Wizard Form Column */}
      <div className="lg:col-span-7 flex flex-col space-y-6">
        {/* Step Indicator Bar */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-palette-soft/50 border border-palette-line overflow-x-auto scrollbar">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-sm'
                    : isCompleted
                    ? 'text-cyan-400 hover:bg-palette-soft'
                    : 'text-palette-contrast/70 hover:bg-palette-soft'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{step.label}</span>
                {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Active Step Content Form */}
        <div className="flex-1 p-6 rounded-xl border border-palette-line bg-palette-base shadow-sm">
          <FadeIn key={currentStep.id}>
            {/* Step 1: Identity */}
            {currentStep.id === 'identity' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-palette-contrast">Developer Identity</h3>
                  <p className="text-xs text-palette-contrast/60">
                    Set up your GitHub handle, professional title, and primary tagline.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-palette-contrast/80">GitHub Username *</label>
                    <input
                      type="text"
                      value={user.github || ''}
                      onChange={e => setGithub(e.target.value)}
                      placeholder="e.g. torvalds"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-palette-line bg-palette-soft text-palette-contrast focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-palette-contrast/80">Full / Display Name</label>
                    <input
                      type="text"
                      value={user.name || ''}
                      onChange={e => updateSettings({ user: { ...user, name: e.target.value } })}
                      placeholder="e.g. Linus Torvalds"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-palette-line bg-palette-soft text-palette-contrast focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-palette-contrast/80">Professional Title / Role</label>
                    <input
                      type="text"
                      value={user.role || ''}
                      onChange={e => updateSettings({ user: { ...user, role: e.target.value } })}
                      placeholder="e.g. Full-Stack Engineer & Open Source Enthusiast"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-palette-line bg-palette-soft text-palette-contrast focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-palette-contrast/80">Short Tagline / Bio</label>
                    <textarea
                      rows={2}
                      value={user.bio || ''}
                      onChange={e => updateSettings({ user: { ...user, bio: e.target.value } })}
                      placeholder="Building high-performance software and developer tooling."
                      className="w-full px-3 py-2 text-sm rounded-lg border border-palette-line bg-palette-soft text-palette-contrast focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-palette-contrast/80">Location</label>
                    <input
                      type="text"
                      value={user.location || ''}
                      onChange={e => updateSettings({ user: { ...user, location: e.target.value } })}
                      placeholder="e.g. San Francisco, CA"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-palette-line bg-palette-soft text-palette-contrast focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-palette-contrast/80">Pronouns</label>
                    <input
                      type="text"
                      value={user.pronouns || ''}
                      onChange={e => updateSettings({ user: { ...user, pronouns: e.target.value } })}
                      placeholder="e.g. they/them"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-palette-line bg-palette-soft text-palette-contrast focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-palette-contrast/80">Current Status (Working on / learning)</label>
                    <input
                      type="text"
                      value={user.status || ''}
                      onChange={e => updateSettings({ user: { ...user, status: e.target.value } })}
                      placeholder="e.g. Building Next.js apps and studying Rust"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-palette-line bg-palette-soft text-palette-contrast focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Style & Vibe */}
            {currentStep.id === 'style' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-palette-contrast">Visual Design & Badges</h3>
                  <p className="text-xs text-palette-contrast/60">
                    Customize alignment, accent color, and Shields.io badge styling.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-palette-contrast/80">Document Alignment</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['left', 'center', 'right'] as const).map(align => (
                        <button
                          key={align}
                          type="button"
                          onClick={() => updateSettings({ align })}
                          className={`px-3 py-2 text-xs font-medium rounded-lg border capitalize ${
                            config.settings.align === align
                              ? 'border-violet-500 bg-violet-500/10 text-violet-400 font-semibold'
                              : 'border-palette-line bg-palette-soft text-palette-contrast hover:border-palette-line/80'
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-palette-contrast/80">Badge Style</label>
                    <select
                      value={config.settings.badgeStyle}
                      onChange={e => updateSettings({ badgeStyle: e.target.value as any })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-palette-line bg-palette-soft text-palette-contrast focus:border-violet-500 focus:outline-none"
                    >
                      <option value="for-the-badge">For-The-Badge (Bold & High Contrast)</option>
                      <option value="flat">Flat Standard</option>
                      <option value="flat-square">Flat Square</option>
                      <option value="plastic">Plastic Embossed</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-palette-contrast/80">Primary Accent Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.settings.accentColor}
                        onChange={e => updateSettings({ accentColor: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-palette-line bg-transparent"
                      />
                      <input
                        type="text"
                        value={config.settings.accentColor}
                        onChange={e => updateSettings({ accentColor: e.target.value })}
                        className="flex-1 px-3 py-2 text-sm font-mono rounded-lg border border-palette-line bg-palette-soft text-palette-contrast"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Skills & Tech */}
            {currentStep.id === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-palette-contrast">Skills & Tech Stack Badges</h3>
                    <p className="text-xs text-palette-contrast/60">
                      Powered by Ileriayo/markdown-badges with official SVG icons and branded colors.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePlugin('markdown-badges')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                      isPluginActive('markdown-badges')
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-palette-line bg-palette-soft text-palette-contrast hover:border-violet-500'
                    }`}
                  >
                    {isPluginActive('markdown-badges') ? 'Active on Canvas' : '+ Enable Badges'}
                  </button>
                </div>

                {isPluginActive('markdown-badges') ? (
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-medium text-palette-contrast/80">Select Tech Stack Badges:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto scrollbar p-2 rounded-lg border border-palette-line bg-palette-soft/50">
                      {[
                        'typescript', 'javascript', 'python', 'rust', 'go',
                        'react', 'nextjs', 'vue', 'tailwind', 'nodejs',
                        'postgres', 'mongodb', 'docker', 'kubernetes',
                        'aws', 'gcp', 'git', 'linux'
                      ].map(tech => {
                        const badgeSection = config.sections.find(s => s.type === 'markdown-badges');
                        const selected: string[] = (badgeSection?.props.content.selectedBadges as string[]) || [];
                        const isSelected = selected.includes(tech);

                        const toggleTech = () => {
                          if (!badgeSection) return;
                          const nextBadges = isSelected
                            ? selected.filter(b => b !== tech)
                            : [...selected, tech];
                          updateSection(badgeSection.id, {
                            content: { ...badgeSection.props.content, selectedBadges: nextBadges },
                          });
                        };

                        return (
                          <button
                            key={tech}
                            type="button"
                            onClick={toggleTech}
                            className={`px-2.5 py-1.5 text-xs rounded-md border text-left flex items-center justify-between capitalize transition-all ${
                              isSelected
                                ? 'border-cyan-500 bg-cyan-500/15 text-cyan-300 font-semibold'
                                : 'border-palette-line bg-palette-base text-palette-contrast/70 hover:border-palette-line/80'
                            }`}
                          >
                            <span>{tech}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center border border-dashed border-palette-line rounded-xl space-y-2">
                    <Code2 className="w-8 h-8 text-palette-contrast/40 mx-auto" />
                    <p className="text-sm font-medium text-palette-contrast">Tech Badges are currently disabled</p>
                    <p className="text-xs text-palette-contrast/60">Click above to add the tech stack section to your profile.</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Stats & Plugins */}
            {currentStep.id === 'plugins' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-palette-contrast">Stats Cards & Interactive Widgets</h3>
                  <p className="text-xs text-palette-contrast/60">
                    Toggle dynamic widgets from top OSS profile projects.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'readme-typing-svg', title: 'Typing SVG Hero', desc: 'Animated typewriter header with customizable text.' },
                    { id: 'github-readme-stats', title: 'GitHub Readme Stats', desc: 'Real-time commits, stars, PRs, and top languages.' },
                    { id: 'github-profile-trophy', title: 'GitHub Trophies', desc: 'Showcase achievements and ranking trophies.' },
                    { id: 'snk', title: 'Contribution Snake (snk)', desc: 'Generates animated snake eating your contribution graph.' },
                    { id: 'waka-readme-stats', title: 'WakaTime Stats', desc: 'Coding hours and weekly breakdown.' },
                    { id: 'visitor-counter', title: 'Visitor Counter', desc: 'Live profile view counter badge.' },
                    { id: 'portfolio-contributions', title: 'Contribution Graph Grid', desc: 'Visual 3D contribution matrix.' },
                  ].map(plugin => {
                    const active = isPluginActive(plugin.id);
                    return (
                      <div
                        key={plugin.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                          active
                            ? 'border-violet-500 bg-violet-500/5 shadow-sm'
                            : 'border-palette-line bg-palette-soft/40 hover:border-palette-line/80'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-semibold text-palette-contrast">{plugin.title}</h4>
                            {active && <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 font-medium">Active</span>}
                          </div>
                          <p className="text-xs text-palette-contrast/60 mt-1">{plugin.desc}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => togglePlugin(plugin.id)}
                          className={`w-full py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            active
                              ? 'border-rose-500/40 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
                              : 'border-violet-500/40 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20'
                          }`}
                        >
                          {active ? 'Remove Widget' : '+ Add Widget'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 5: Social & Links */}
            {currentStep.id === 'socials' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-palette-contrast">Social Media & Contact Links</h3>
                  <p className="text-xs text-palette-contrast/60">
                    Add direct badges linking to your socials and online presence.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    { label: 'LinkedIn URL / Handle', placeholder: 'https://linkedin.com/in/username' },
                    { label: 'X / Twitter Handle', placeholder: '@username' },
                    { label: 'Personal Website / Portfolio', placeholder: 'https://yourportfolio.dev' },
                    { label: 'Contact Email', placeholder: 'you@domain.com' },
                    { label: 'Discord Server / Tag', placeholder: 'username#0000' },
                    { label: 'YouTube Channel', placeholder: 'https://youtube.com/@channel' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <label className="text-xs font-medium text-palette-contrast/80">{item.label}</label>
                      <input
                        type="text"
                        placeholder={item.placeholder}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-palette-line bg-palette-soft text-palette-contrast focus:border-violet-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Projects & Highlights */}
            {currentStep.id === 'projects' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-palette-contrast">Projects & Fun Highlights</h3>
                  <p className="text-xs text-palette-contrast/60">
                    Showcase key featured repositories and personal facts.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-palette-contrast/80">Currently Building</label>
                    <input
                      type="text"
                      placeholder="e.g. An AI-powered profile README generator"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-palette-line bg-palette-soft text-palette-contrast focus:border-violet-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-palette-contrast/80">Fun Fact / Personal Note</label>
                    <input
                      type="text"
                      placeholder="e.g. I run on coffee and open-source contributions ☕"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-palette-line bg-palette-soft text-palette-contrast focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </FadeIn>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            disabled={currentStepIndex === 0}
            onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg border border-palette-line bg-palette-soft disabled:opacity-40 disabled:cursor-not-allowed hover:bg-palette-line/30 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs text-palette-contrast/60">
            Step {currentStepIndex + 1} of {STEPS.length}
          </span>

          <button
            type="button"
            disabled={currentStepIndex === STEPS.length - 1}
            onClick={() => setCurrentStepIndex(prev => Math.min(STEPS.length - 1, prev + 1))}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:opacity-95 transition-all"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live Preview Column */}
      <div className="lg:col-span-5 h-[calc(100vh-120px)] sticky top-6">
        <LivePreviewPane />
      </div>
    </div>
  );
}
