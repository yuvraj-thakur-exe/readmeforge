'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Text } from '#/components/atoms/text';
import { Panel } from '#/components/organisms/panel';
import { useReadmeStore } from '#/store/useReadmeStore';
import { canvasStore } from '#/stores/canvas-store';
import { Sections } from '#/types';
import { runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import {
  Figma,
  Image as ImageIcon,
  Sparkles,
  Shield,
  Plus,
  Link2,
  CheckCheck,
  Eye,
} from 'lucide-react';

type TabType = 'figma' | 'image' | 'svg' | 'badge';

export const PanelRecommendedResources: React.FC = () => {
  const t = useTranslations('ui');
  const [activeTab, setActiveTab] = useState<TabType>('figma');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Figma State
  const [figmaUrl, setFigmaUrl] = useState<string>(
    'https://www.figma.com/@designsystem/portfolio'
  );
  const [figmaTitle, setFigmaTitle] = useState<string>(
    'Product Design System & Component Kit'
  );
  const [figmaStyle, setFigmaStyle] = useState<
    'showcase-card' | 'design-system' | 'badge'
  >('showcase-card');
  const [figmaRole, setFigmaRole] = useState<string>(
    'Lead UI/UX Designer & Systems Architect'
  );

  // Image & GIF State
  const [imageUrl, setImageUrl] = useState<string>(
    '/assets/profile/pixel-retro-pc.png'
  );
  const [imageAlt, setImageAlt] = useState<string>('Developer Workspace Setup');
  const [imageLink, setImageLink] = useState<string>('https://github.com');
  const [imageAlign, setImageAlign] = useState<'center' | 'left' | 'right'>(
    'center'
  );

  // SVG State
  const [svgUrl, setSvgUrl] = useState<string>(
    '/assets/isometric-terminal.svg'
  );
  const [svgTitle, setSvgTitle] = useState<string>('3D Isometric Terminal');

  // Badge & Shield State
  const [badgeLabel, setBadgeLabel] = useState<string>('FIGMA');
  const [badgeMsg, setBadgeMsg] = useState<string>('DESIGN SYSTEM');
  const [badgeColor, setBadgeColor] = useState<string>('F24E1E');
  const [badgeLogo, setBadgeLogo] = useState<string>('figma');
  const [badgeLink, setBadgeLink] = useState<string>('https://figma.com');

  const generatedBadgeUrl = `https://img.shields.io/badge/${encodeURIComponent(
    badgeLabel.replace(/-/g, '--')
  )}-${encodeURIComponent(badgeMsg.replace(/-/g, '--'))}-${badgeColor}?style=for-the-badge&logo=${encodeURIComponent(
    badgeLogo
  )}&logoColor=white`;

  const handleNotifySuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  // Add Figma Section
  const handleAddFigma = () => {
    if (!figmaUrl.trim()) return;

    // 1. Add to Zustand store
    useReadmeStore.getState().addSection('figma-design', {
      figmaUrl: figmaUrl.trim(),
      title: figmaTitle.trim() || 'Figma Design Showcase',
      style: figmaStyle,
      role: figmaRole.trim() || 'UI/UX Designer',
    });

    // 2. Add to MobX canvas store
    runInAction(() => {
      canvasStore.sections.push({
        id: uuidv4(),
        type: Sections.IMAGE,
        props: {
          url: '/assets/animated-characters.svg',
          alt: figmaTitle.trim() || 'Figma Showcase',
          align: 'center',
          width: '100%',
        },
      } as any);
    });

    handleNotifySuccess('Added Figma Design Showcase to your profile!');
  };

  // Add Image Section
  const handleAddImage = () => {
    if (!imageUrl.trim()) return;

    useReadmeStore.getState().addSection('pinterest-image', {
      imageUrl: imageUrl.trim(),
      caption: imageAlt.trim() || 'Visual Showcase',
      linkUrl: imageLink.trim() || undefined,
      altText: imageAlt.trim() || 'Image',
      width: '100%',
    });

    runInAction(() => {
      canvasStore.sections.push({
        id: uuidv4(),
        type: Sections.IMAGE,
        props: {
          url: imageUrl.trim(),
          alt: imageAlt.trim() || 'Image',
          align: imageAlign,
          width: '100%',
        },
      } as any);
    });

    handleNotifySuccess('Added Image to your profile!');
  };

  // Add SVG Section
  const handleAddSvg = () => {
    if (!svgUrl.trim()) return;

    useReadmeStore.getState().addSection('pinterest-image', {
      imageUrl: svgUrl.trim(),
      caption: svgTitle.trim() || 'Animated SVG Banner',
      linkUrl: '',
      altText: svgTitle.trim() || 'Animated Vector',
      width: '100%',
    });

    runInAction(() => {
      canvasStore.sections.push({
        id: uuidv4(),
        type: Sections.IMAGE,
        props: {
          url: svgUrl.trim(),
          alt: svgTitle.trim() || 'Animated SVG',
          align: 'center',
          width: '100%',
        },
      } as any);
    });

    handleNotifySuccess('Added Animated SVG to your profile!');
  };

  // Add Badge Section
  const handleAddBadge = () => {
    useReadmeStore.getState().addSection('pinterest-image', {
      imageUrl: generatedBadgeUrl,
      caption: `${badgeLabel} Badge`,
      linkUrl: badgeLink.trim() || undefined,
      altText: `${badgeLabel} - ${badgeMsg}`,
      width: 'auto',
    });

    runInAction(() => {
      canvasStore.sections.push({
        id: uuidv4(),
        type: Sections.IMAGE,
        props: {
          url: generatedBadgeUrl,
          alt: `${badgeLabel} - ${badgeMsg}`,
          align: 'center',
          width: 'auto',
        },
      } as any);
    });

    handleNotifySuccess('Added Shield Badge to your profile!');
  };

  return (
    <div className="flex flex-col gap-3 h-full text-neutral-100">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1 rounded-md bg-gradient-to-tr from-violet-600 to-cyan-500 text-white">
            <Link2 className="w-4 h-4" />
          </div>
          <Text.Heading as="h2" className="text-base font-bold text-neutral-100">
            {t('recommended-resources.heading')}
          </Text.Heading>
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed">
          {t('recommended-resources.description1')}
        </p>
      </div>

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Mode Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-neutral-900 border border-neutral-800 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab('figma')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[11px] font-semibold transition-all ${
            activeTab === 'figma'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
          }`}
        >
          <Figma className="w-3.5 h-3.5 mb-1 text-purple-300" />
          <span>Figma</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('image')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[11px] font-semibold transition-all ${
            activeTab === 'image'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 mb-1 text-cyan-300" />
          <span>Image</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('svg')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[11px] font-semibold transition-all ${
            activeTab === 'svg'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 mb-1 text-amber-300" />
          <span>SVG</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('badge')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[11px] font-semibold transition-all ${
            activeTab === 'badge'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
          }`}
        >
          <Shield className="w-3.5 h-3.5 mb-1 text-emerald-300" />
          <span>Badge</span>
        </button>
      </div>

      <Panel.Scrollable className="space-y-4 pr-1">
        {/* TAB 1: FIGMA */}
        {activeTab === 'figma' && (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                Figma File or Prototype URL
              </label>
              <input
                type="url"
                value={figmaUrl}
                onChange={e => setFigmaUrl(e.target.value)}
                placeholder="https://www.figma.com/design/..."
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-violet-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={figmaTitle}
                onChange={e => setFigmaTitle(e.target.value)}
                placeholder="Product Design System & Component Kit"
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                  Display Style
                </label>
                <select
                  value={figmaStyle}
                  onChange={e => setFigmaStyle(e.target.value as any)}
                  className="w-full px-2.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-violet-500"
                >
                  <option value="showcase-card">Showcase Card</option>
                  <option value="design-system">Design System</option>
                  <option value="badge">Compact Badge</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                  Role / Description
                </label>
                <input
                  type="text"
                  value={figmaRole}
                  onChange={e => setFigmaRole(e.target.value)}
                  placeholder="UI/UX Designer"
                  className="w-full px-2.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1.5">
                Quick Figma Presets
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  {
                    name: 'Design System Kit',
                    url: 'https://www.figma.com/@designsystem',
                    role: 'Design System Lead',
                  },
                  {
                    name: 'Mobile App Wireframes',
                    url: 'https://www.figma.com/@mobilekit',
                    role: 'Product Designer',
                  },
                  {
                    name: 'Brand & Visual Identity',
                    url: 'https://www.figma.com/@brandassets',
                    role: 'Visual Identity Lead',
                  },
                ].map(p => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      setFigmaUrl(p.url);
                      setFigmaTitle(p.name);
                      setFigmaRole(p.role);
                    }}
                    className="text-[10px] px-2 py-1 rounded bg-neutral-900/90 hover:bg-violet-950/60 border border-neutral-800 hover:border-violet-500/40 text-neutral-300 transition-colors"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 flex items-center gap-1 font-semibold">
                <Eye className="w-3 h-3" /> Live Markdown Card Preview
              </span>
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-purple-500/30 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-950/80 border border-purple-500/50 text-purple-300">
                  <Figma className="w-5 h-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-xs font-bold text-neutral-100 truncate">
                    {figmaTitle || 'Figma Design Showcase'}
                  </div>
                  <div className="text-[10px] text-neutral-400 truncate">
                    {figmaRole} &bull; {figmaStyle}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddFigma}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-md shadow-violet-900/40 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Figma Showcase to Profile</span>
            </button>
          </div>
        )}

        {/* TAB 2: IMAGE & GIF */}
        {activeTab === 'image' && (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                Image or GIF URL (.png, .jpg, .webp, .gif)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://.../banner.png"
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                  Alt Description
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={e => setImageAlt(e.target.value)}
                  placeholder="Developer Workspace"
                  className="w-full px-2.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                  Alignment
                </label>
                <select
                  value={imageAlign}
                  onChange={e => setImageAlign(e.target.value as any)}
                  className="w-full px-2.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-cyan-500"
                >
                  <option value="center">Center</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                Clickable Target Link (Optional)
              </label>
              <input
                type="url"
                value={imageLink}
                onChange={e => setImageLink(e.target.value)}
                placeholder="https://mywebsite.com"
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Presets */}
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1.5">
                Curated Visual Assets
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    name: 'Retro PC Desk',
                    src: '/assets/profile/pixel-retro-pc.png',
                  },
                  {
                    name: 'Night Coder Hoodie',
                    src: '/assets/profile/night-coder-hoodie.png',
                  },
                  {
                    name: 'Code Build Repeat',
                    src: '/assets/profile/code-build-repeat.png',
                  },
                  {
                    name: 'Genesis Hands',
                    src: '/assets/profile/digital-hands-genesis.png',
                  },
                ].map(p => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      setImageUrl(p.src);
                      setImageAlt(p.name);
                    }}
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-neutral-900/90 hover:bg-cyan-950/40 border border-neutral-800 hover:border-cyan-500/40 text-left transition-colors"
                  >
                    <img
                      src={p.src}
                      alt={p.name}
                      className="w-7 h-7 rounded object-cover border border-neutral-700"
                    />
                    <span className="text-[10px] text-neutral-300 truncate font-mono">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1 font-semibold">
                <Eye className="w-3 h-3" /> Live Image Preview
              </span>
              <div className="rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900/60 max-h-36 flex items-center justify-center p-2">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="max-h-32 object-contain rounded"
                  onError={e => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddImage}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110 text-white font-bold text-xs shadow-md shadow-cyan-900/40 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Image to Profile</span>
            </button>
          </div>
        )}

        {/* TAB 3: ANIMATED SVG */}
        {activeTab === 'svg' && (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                SVG URL or Asset Path
              </label>
              <input
                type="url"
                value={svgUrl}
                onChange={e => setSvgUrl(e.target.value)}
                placeholder="/assets/terminal_animated.svg"
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                SVG Banner Title
              </label>
              <input
                type="text"
                value={svgTitle}
                onChange={e => setSvgTitle(e.target.value)}
                placeholder="Animated Vector Banner"
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Presets */}
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1.5">
                Curated 60fps Vector Animations
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  {
                    name: 'Isometric Terminal',
                    src: '/assets/isometric-terminal.svg',
                  },
                  {
                    name: 'Matrix Digital Rain',
                    src: '/assets/terminal_animated.svg',
                  },
                  {
                    name: 'DevOps Desk',
                    src: '/assets/developer-desk.svg',
                  },
                  {
                    name: '3D City Cat',
                    src: '/assets/wow-profile-full.svg',
                  },
                  {
                    name: 'Coding Unicorn',
                    src: '/assets/coding-unicorn.svg',
                  },
                  {
                    name: 'Confetti Owl',
                    src: '/assets/owl-confetti.svg',
                  },
                  {
                    name: 'Retro Pacman',
                    src: '/assets/pacman.svg',
                  },
                  {
                    name: 'Bento Telemetry',
                    src: '/assets/bento-dashboard-full.svg',
                  },
                ].map(p => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      setSvgUrl(p.src);
                      setSvgTitle(p.name);
                    }}
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-neutral-900/90 hover:bg-amber-950/40 border border-neutral-800 hover:border-amber-500/40 text-left transition-colors"
                  >
                    <img
                      src={p.src}
                      alt={p.name}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-[10px] text-neutral-300 truncate font-mono">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1 font-semibold">
                <Eye className="w-3 h-3" /> Live Animated SVG Preview
              </span>
              <div className="rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900/60 min-h-24 flex items-center justify-center p-2">
                <img
                  src={svgUrl}
                  alt={svgTitle}
                  className="max-h-28 w-full object-contain"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddSvg}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:brightness-110 text-white font-bold text-xs shadow-md shadow-amber-900/40 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add SVG Animation to Profile</span>
            </button>
          </div>
        )}

        {/* TAB 4: BADGE & SHIELDS */}
        {activeTab === 'badge' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={badgeLabel}
                  onChange={e => setBadgeLabel(e.target.value)}
                  placeholder="FIGMA"
                  className="w-full px-2.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                  Message
                </label>
                <input
                  type="text"
                  value={badgeMsg}
                  onChange={e => setBadgeMsg(e.target.value)}
                  placeholder="DESIGN SYSTEM"
                  className="w-full px-2.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                  Hex Color (No #)
                </label>
                <input
                  type="text"
                  value={badgeColor}
                  onChange={e => setBadgeColor(e.target.value)}
                  placeholder="F24E1E"
                  className="w-full px-2.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                  Logo Slug
                </label>
                <input
                  type="text"
                  value={badgeLogo}
                  onChange={e => setBadgeLogo(e.target.value)}
                  placeholder="figma"
                  className="w-full px-2.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                Target URL
              </label>
              <input
                type="url"
                value={badgeLink}
                onChange={e => setBadgeLink(e.target.value)}
                placeholder="https://figma.com/@myprofile"
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            {/* Presets */}
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1.5">
                Popular Shield Presets
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'FIGMA', msg: 'SHOWCASE', col: 'F24E1E', logo: 'figma' },
                  { label: 'TYPESCRIPT', msg: '5.8 CORE', col: '3178C6', logo: 'typescript' },
                  { label: 'NEXT.JS', msg: 'APP ROUTER', col: '000000', logo: 'next.js' },
                  { label: 'TAILWIND', msg: 'CSS 4.0', col: '06B6D4', logo: 'tailwindcss' },
                  { label: 'GITHUB CAMO', msg: '60FPS VERIFIED', col: '22C55E', logo: 'github' },
                ].map(p => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      setBadgeLabel(p.label);
                      setBadgeMsg(p.msg);
                      setBadgeColor(p.col);
                      setBadgeLogo(p.logo);
                    }}
                    className="text-[10px] px-2 py-1 rounded bg-neutral-900/90 hover:bg-emerald-950/60 border border-neutral-800 hover:border-emerald-500/40 text-neutral-300 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1 font-semibold">
                <Eye className="w-3 h-3" /> Live Badge Preview
              </span>
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 flex items-center justify-center">
                <img
                  src={generatedBadgeUrl}
                  alt={`${badgeLabel} ${badgeMsg}`}
                  className="h-7"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddBadge}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold text-xs shadow-md shadow-emerald-900/40 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Shield Badge to Profile</span>
            </button>
          </div>
        )}
      </Panel.Scrollable>
    </div>
  );
};
