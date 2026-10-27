import { config } from '#/config';
import { routing } from '#/i18n/routing';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const basePath = config.general.urls.app;
  const today = new Date();

  // Public indexable routes across locales
  const pathnames = ['', '/wizard', '/developer', '/animator', '/info', '/privacy-policy'];

  return routing.locales.flatMap(locale => {
    const isDefault = locale === routing.defaultLocale;

    return pathnames.map(pathname => ({
      url: `${basePath}/${locale}${pathname}`,
      lastModified: today,
      changeFrequency: pathname === '' ? 'daily' : 'weekly',
      priority: isDefault && pathname === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map(loc => [loc, `${basePath}/${loc}${pathname}`])
        ),
      },
    }));
  });
}
