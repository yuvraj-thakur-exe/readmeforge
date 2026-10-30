import '#/styles/global.css';
import '#/styles/markdown-theme.css';
import '#/styles/prism-syntax-theme.css';

import '#/features/text/text-styles.css';

// Suppress React 19 false-positive warning for next-themes inline script injection during SSR
if (typeof console !== 'undefined') {
  const origError = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
      return;
    }
    origError.apply(console, args);
  };
}

import type { Metadata, Viewport } from 'next';

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';

import { config } from '#/config';
import { Handles } from '#/components/handles';
import { Modal } from '#/components/molecules/modal';
import { Features } from '#/features';
import { routing } from '#/i18n/routing';
import { ThemeProvider } from '#/components/theme/ThemeProvider';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, 'children'>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'metadata' });

  const title = t('title');
  const description = t('description');
  const appUrl = config.general.urls.app;

  const languages: Record<string, string> = {
    'x-default': `${appUrl}/en`,
  };
  for (const loc of routing.locales) {
    languages[loc] = `${appUrl}/${loc}`;
  }

  return {
    metadataBase: new URL(appUrl),
    title,
    description,
    authors: [{ name: t('author') }],
    keywords: t.raw('keywords') as string[],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'ai:ready': 'true',
      'ai:model-context': `${appUrl}/llms.txt`,
      'ai:agent-skill': `${appUrl}/.agents/skills/readmeforge/SKILL.md`,
      'ai:mcp': 'npx monoforge mcp',
    },
    manifest: '/manifest.json',
    icons: {
      icon: '/logo-icon.svg',
      shortcut: '/favicon.svg',
      apple: '/logo-icon.svg',
    },
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: 'MONOFORGE',
      images: '/api/og',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: '/api/og',
      creator: 'https://github.com/yuvraj-thakur-exe/MONOFORGE',
    },
    alternates: {
      canonical: `${appUrl}/${locale}`,
      languages,
    },
    verification: {
      google: ['google6fe900e7443f16a1', 'nH_oO8Fxc76PZpqDg9y4loKj8DNPDL84Zz0zAKgAaSA'],
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#f59e0b',
};

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
        <link
          rel="preload"
          href="/assets/animated-characters.svg"
          as="image"
          type="image/svg+xml"
        />
        <link rel="help" href="/llms.txt" />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Context" />
        <link rel="describedby" href="/api/schema" />
        <meta name="ai:ready" content="true" />
        <meta name="ai:agent-skill" content="/.agents/skills/readmeforge/SKILL.md" />
        <meta name="google-site-verification" content="google6fe900e7443f16a1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['WebApplication', 'SoftwareApplication'],
              name: 'MONOFORGE',
              softwareVersion: '2.0.0',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'All',
              url: config.general.urls.app,
              description:
                'AI-native GitHub profile README studio and precision telemetry engine featuring visual studio, raw Monaco /developer IDE, Camo-safe SVG animations, and zero-drift plugin registry.',
              featureList: [
                'GitHub Profile README Generator',
                'Visual Studio with Real-time Preview',
                'Developer Raw Mode Monaco IDE',
                '47+ Scraped Telemetry Engines',
                'Camo-safe 60fps Vector Animations',
                'Interactive Cyber Monkey Companion',
                'Direct Authenticated GitHub Push with Diff Preview',
              ],
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              creator: {
                '@type': 'Person',
                name: 'Yuvraj Thakur',
                url: 'https://github.com/yuvraj-thakur-exe',
              },
              sameAs: [
                'https://github.com/yuvraj-thakur-exe/MONOFORGE',
              ],
            }),
          }}
        />
      </head>
      <body className="palette-surface min-h-screen">
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Handles />

            {children}

            <Modal />
            <Features />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
