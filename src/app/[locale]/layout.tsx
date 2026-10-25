import '#/styles/global.css';
import '#/styles/markdown-theme.css';
import '#/styles/prism-syntax-theme.css';

import '#/features/text/text-styles.css';

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

  const pathnames = ['/', '/result', '/privacy-policy'];

  const languages = pathnames.reduce<Record<string, string>>(
    (acc, pathname) => {
      for (const loc of routing.locales) {
        acc[`${appUrl}/${loc}${pathname === '/' ? '' : pathname}`] = loc;
      }
      return acc;
    },
    {}
  );

  return {
    metadataBase: new URL(appUrl),
    title,
    description,
    authors: [{ name: t('author') }],
    keywords: t.raw('keywords') as string[],
    robots: {
      index: true,
      follow: false,
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
      siteName: 'ReadmeForge',
      images: '/assets/app.png',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: '/assets/app.png',
      creator: 'https://github.com/readmeforge',
    },
    alternates: {
      languages,
    },
    verification: {
      google: 'nH_oO8Fxc76PZpqDg9y4loKj8DNPDL84Zz0zAKgAaSA',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#8b5cf6',
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
