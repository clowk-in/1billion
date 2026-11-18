import type { Metadata } from 'next';

import type { Locale } from '@/lib/i18n';
import { site } from '@/lib/site';

// The version of the share images. Bump it after `node scripts/og.mjs`, so
// Facebook, LinkedIn, WhatsApp, Slack and X fetch the new file instead of
// the one they keep in their cache.
const v = 3;

const alts: Record<Locale, string> = {
  en: '1billion: the mail your users wait for, in the inbox. Free forever: 100,000 credits every day.',
  'pt-br': '1billion: o e-mail que seu usuário espera, na caixa de entrada. Grátis para sempre: 100 mil créditos todo dia.',
};

// The share image of one language (public/og/home-<locale>.png). Open Graph
// is read by Facebook, Instagram, WhatsApp, LinkedIn and Slack, and the
// twitter tags by X.
export function shareImageFor(locale: Locale) {
  const url = `${site.url}/og/home-${locale}.png?v=${v}`;

  return { url, secureUrl: url, width: 1200, height: 630, alt: alts[locale], type: 'image/png' };
}

// The docs are in English, so they share the English image.
export const shareImage = shareImageFor('en');

export const clowk = {
  '@type': 'Organization',
  '@id': `${site.clowk}/#organization`,
  name: 'Clowk',
  url: site.clowk,
};

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
};

// The metadata of one page. A page that sets openGraph replaces the parent
// openGraph in full, so each page sets the image, the site name, and the URL.
export function pageMetadata({ title, description, path, type = 'website' }: PageMeta): Metadata {
  const url = `${site.url}${path}`;
  const shareTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url,
      type,
      siteName: site.name,
      locale: 'en_US',
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [shareImage.url],
    },
  };
}

// Structured data for search engines and AI assistants.
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
