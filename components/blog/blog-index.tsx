import type { Metadata } from 'next';

import { PostPane } from '@/components/blog/blog-post';
import { posts } from '@/lib/blog';
import { feedAlternate } from '@/lib/feed';
import { blogHome, copy, type Locale, ogLocale } from '@/lib/i18n';
import { shareImageFor } from '@/lib/seo';
import { site } from '@/lib/site';

export function blogIndexMetadata(locale: Locale): Metadata {
  const t = copy[locale].blog;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: blogHome[locale],
      languages: { en: blogHome.en, 'pt-BR': blogHome['pt-br'], 'x-default': blogHome.en },
      types: feedAlternate(locale),
    },
    openGraph: {
      title: `${t.title} | ${site.name}`,
      description: t.description,
      url: `${site.url}${blogHome[locale]}`,
      siteName: site.name,
      type: 'website',
      locale: ogLocale[locale],
      images: [shareImageFor(locale)],
    },
    twitter: { card: 'summary_large_image', images: [shareImageFor(locale)] },
  };
}

// The index of the blog opens the newest post in the reading pane. On a phone
// the list shows instead (components/blog/inbox.tsx).
export function BlogIndex({ locale }: { locale: Locale }) {
  const newest = posts(locale)[0];

  if (!newest) return null;

  return <PostPane entry={newest} locale={locale} />;
}
