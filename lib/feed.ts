import { posts } from '@/lib/blog';
import { blogHome, copy, htmlLang, type Locale } from '@/lib/i18n';
import { site } from '@/lib/site';

// The RSS 2.0 feed of the blog in one language, built at build time:
// app/blog/feed.xml and app/pt-br/blog/feed.xml write it to out/.

export const feedPath: Record<Locale, string> = {
  en: `${blogHome.en}feed.xml`,
  'pt-br': `${blogHome['pt-br']}feed.xml`,
};

// The link tag of the feed, for alternates.types in the metadata of a page.
export function feedAlternate(locale: Locale) {
  return { 'application/rss+xml': feedPath[locale] };
}

function escape(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function item(locale: Locale, entry: ReturnType<typeof posts>[number]) {
  const url = `${site.url}${blogHome[locale]}${entry.slug}/`;
  const cover = entry.image ? `<enclosure url="${escape(`${site.url}${entry.image}`)}" type="image/png" length="0"/>` : '';
  const categories = entry.tags.map(tag => `<category>${escape(tag)}</category>`).join('');

  return [
    '<item>',
    `<title>${escape(entry.title)}</title>`,
    `<link>${url}</link>`,
    `<guid isPermaLink="true">${url}</guid>`,
    `<description>${escape(entry.description ?? '')}</description>`,
    `<pubDate>${new Date(entry.date).toUTCString()}</pubDate>`,
    `<dc:creator>${escape(entry.author)}</dc:creator>`,
    categories,
    cover,
    '</item>',
  ].join('');
}

export function feedXml(locale: Locale) {
  const t = copy[locale].blog;
  const list = posts(locale);
  const home = `${site.url}${blogHome[locale]}`;
  const self = `${site.url}${feedPath[locale]}`;
  const updated = list[0] ? new Date(list[0].date).toUTCString() : new Date().toUTCString();

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '<channel>',
    `<title>${escape(`${t.title} | ${site.name}`)}</title>`,
    `<link>${home}</link>`,
    `<description>${escape(t.description)}</description>`,
    `<language>${htmlLang[locale]}</language>`,
    `<lastBuildDate>${updated}</lastBuildDate>`,
    `<atom:link href="${self}" rel="self" type="application/rss+xml"/>`,
    ...list.map(entry => item(locale, entry)),
    '</channel>',
    '</rss>',
  ].join('\n');
}

export function feedResponse(locale: Locale) {
  return new Response(feedXml(locale), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
