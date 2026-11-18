import type { MetadataRoute } from 'next';

import { day, posts } from '@/lib/blog';
import { site } from '@/lib/site';
import { source } from '@/lib/source';

// A static export writes this as out/sitemap.xml at build time.
export const dynamic = 'force-static';

function withSlash(path: string) {
  return path.endsWith('/') ? path : `${path}/`;
}

// The hreflang alternates of a page that exists in both languages.
function both(en: string, pt: string) {
  return { en: `${site.url}${en}`, 'pt-BR': `${site.url}${pt}` };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1, alternates: { languages: both('/', '/pt-br/') } },
    { url: `${site.url}/pt-br/`, lastModified: now, changeFrequency: 'weekly', priority: 1, alternates: { languages: both('/', '/pt-br/') } },
    { url: `${site.url}/terms/`, lastModified: now, changeFrequency: 'yearly', priority: 0.2, alternates: { languages: both('/terms/', '/pt-br/terms/') } },
    { url: `${site.url}/pt-br/terms/`, lastModified: now, changeFrequency: 'yearly', priority: 0.2, alternates: { languages: both('/terms/', '/pt-br/terms/') } },
  ];

  const docs: MetadataRoute.Sitemap = source.getPages().map(page => ({
    url: `${site.url}${withSlash(page.url)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: page.url === '/docs' ? 0.9 : 0.7,
  }));

  const blog: MetadataRoute.Sitemap = [
    { url: `${site.url}/blog/`, lastModified: now, changeFrequency: 'weekly', priority: 0.6, alternates: { languages: both('/blog/', '/pt-br/blog/') } },
    { url: `${site.url}/pt-br/blog/`, lastModified: now, changeFrequency: 'weekly', priority: 0.6, alternates: { languages: both('/blog/', '/pt-br/blog/') } },
    ...[...posts('en'), ...posts('pt-br')].map(entry => ({
      url: `${site.url}${entry.locale === 'en' ? '/blog/' : '/pt-br/blog/'}${entry.slug}/`,
      lastModified: new Date(`${day(entry.date)}T12:00:00Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return [...pages, ...docs, ...blog];
}
