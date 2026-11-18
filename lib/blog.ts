import { readFileSync } from 'node:fs';

import { blog } from 'collections/server';

import type { Locale } from '@/lib/i18n';

// The posts of the blog, from content/blog/<locale>/<slug>.mdx, newest first.
// The file name is the slug, so a post in both languages has one slug.

export type Post = (typeof blog)[number] & { slug: string; locale: Locale; image?: string };

// The first image of a post that is a file in public/ (![alt](/path.png)).
// It runs at build time only: the site is a static export.
function firstImage(fullPath: string) {
  const text = readFileSync(fullPath, 'utf8');

  return text.match(/!\[[^\]]*\]\((\/[^)\s]+)\)/)?.[1];
}

function parse(entry: (typeof blog)[number]): Post {
  const [locale, file] = entry.info.path.split('/');

  // The cover of the frontmatter wins; with none, the first image of the post.
  const image = entry.cover ?? firstImage(entry.info.fullPath);

  return { ...entry, locale: locale as Locale, slug: file.replace(/\.mdx$/, ''), image };
}

const all = blog.map(parse).sort((a, b) => b.date.localeCompare(a.date));

export function posts(locale: Locale) {
  return all.filter(post => post.locale === locale);
}

export function post(locale: Locale, slug: string) {
  return all.find(entry => entry.locale === locale && entry.slug === slug);
}

// The same post in the other language, when it exists.
export function translation(post: Post) {
  const other: Locale = post.locale === 'en' ? 'pt-br' : 'en';

  return all.find(entry => entry.locale === other && entry.slug === post.slug);
}

// The day of a post: its date, or the day of its date and time.
export function day(date: string) {
  return date.slice(0, 10);
}

export function formatDate(date: string, locale: Locale) {
  const tag = locale === 'en' ? 'en-US' : 'pt-BR';

  return new Date(`${day(date)}T12:00:00Z`).toLocaleDateString(tag, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
