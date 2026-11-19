import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMDXComponents } from '@/components/mdx';
import { day, formatDate, type Post, post, posts, translation } from '@/lib/blog';
import { blogHome, copy, htmlLang, type Locale, ogLocale } from '@/lib/i18n';
import { clowk, JsonLd, shareImageFor } from '@/lib/seo';
import { site } from '@/lib/site';

export function postParams(locale: Locale) {
  return posts(locale).map(entry => ({ slug: entry.slug }));
}

function path(locale: Locale, slug: string) {
  return `${blogHome[locale]}${slug}/`;
}

export function postMetadata(locale: Locale, slug: string): Metadata {
  const entry = post(locale, slug);

  if (!entry) return {};

  const other = translation(entry);
  const languages: Record<string, string> = { [htmlLang[locale]]: path(locale, slug) };

  if (other) languages[htmlLang[other.locale]] = path(other.locale, slug);

  return {
    title: entry.title,
    description: entry.description,
    authors: [{ name: entry.author }],
    alternates: { canonical: path(locale, slug), languages },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: `${site.url}${path(locale, slug)}`,
      siteName: site.name,
      type: 'article',
      publishedTime: day(entry.date),
      authors: [entry.author],
      locale: ogLocale[locale],
      images: [shareImageFor(locale)],
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.description,
      images: [shareImageFor(locale)],
    },
  };
}

export function BlogPost({ locale, slug }: { locale: Locale; slug: string }) {
  const entry = post(locale, slug);

  if (!entry) notFound();

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: entry.title,
    description: entry.description,
    datePublished: day(entry.date),
    inLanguage: htmlLang[locale],
    author: { '@type': 'Person', name: entry.author },
    publisher: clowk,
    url: `${site.url}${path(locale, slug)}`,
    image: shareImageFor(locale).url,
  };

  return (
    <>
      <JsonLd data={data} />

      <PostPane entry={entry} locale={locale} />
    </>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// The open post, as a mail: who sent it and when, the subject, the tags, the
// cover, the text, and a reply box that asks the reader to start sending.
export function PostPane({ entry, locale }: { entry: Post; locale: Locale }) {
  const t = copy[locale].blog;
  const MDX = entry.body;

  return (
    <div className="max-w-[760px] px-4 pb-16 pt-6 md:px-8">
      <header className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-x-3.5 gap-y-1 border-b border-line pb-4 md:grid-cols-[44px_minmax(0,1fr)_auto]">
        <span className="row-span-2 grid size-11 place-items-center rounded-full bg-brand font-extrabold text-white" aria-hidden="true">
          {initials(entry.author)}
        </span>

        <span className="truncate font-bold">{entry.author}</span>

        <time dateTime={entry.date} className="hidden self-start text-[12px] text-sub md:row-span-2 md:block">
          {formatDate(entry.date, locale)}
        </time>

        <span className="text-[13px] text-sub">
          {t.inbox.to} · {t.inbox.folder[entry.folder]}
          <span className="md:hidden"> · {formatDate(entry.date, locale)}</span>
        </span>
      </header>

      <h1 className="mb-2.5 mt-6 text-balance font-display text-[28px] font-extrabold leading-[1.1] tracking-[-0.025em] text-ink md:text-[36px]">
        {entry.title}
      </h1>

      {entry.tags.length > 0 && (
        <p className="mb-5 flex flex-wrap gap-1.5">
          {entry.tags.map(tag => (
            <span key={tag} className="rounded-full bg-brandwash px-2 py-0.5 font-mono text-[11px] text-brandtext">
              #{tag}
            </span>
          ))}
        </p>
      )}

      {entry.cover && (
        <img src={entry.cover} alt="" width={1200} height={630} className="mb-6 w-full rounded-xl border border-line" />
      )}

      <div className="prose max-w-none">
        <MDX components={getMDXComponents()} />
      </div>

      <section className="mt-10 overflow-hidden rounded-xl border border-line">
        <p className="border-b border-line bg-panel2 px-3.5 py-2.5 font-mono text-[12px] text-sub">
          {t.inbox.reply} {entry.title}
        </p>

        <div className="flex flex-col gap-3.5 p-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[15px] leading-normal text-ink">{t.inbox.replyText}</p>

          <a href={site.app} className="btn-buy shrink-0 rounded-lg px-4 py-2.5 text-center text-[14px] font-bold">
            {t.inbox.start}
          </a>
        </div>
      </section>
    </div>
  );
}
