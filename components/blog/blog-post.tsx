import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getMDXComponents } from '@/components/mdx';
import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';
import { day, formatDate, post, posts, translation } from '@/lib/blog';
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

  const t = copy[locale].blog;
  const other = translation(entry);
  const alternate = other ? path(other.locale, slug) : blogHome[locale === 'en' ? 'pt-br' : 'en'];
  const MDX = entry.body;

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

      <Header locale={locale} alternate={alternate} />

      <main lang={htmlLang[locale]} className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-32 md:px-6 md:pt-40">
        <Link href={blogHome[locale]} className="inline-flex items-center gap-2 text-[14px] text-sub hover:text-ink">
          <ArrowLeft size={16} aria-hidden="true" />
          {t.back}
        </Link>

        <article className="mt-8">
          <header className="flex flex-col gap-4 border-b border-line pb-8">
            <h1 className="font-display text-[40px] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink md:text-[56px]">
              {entry.title}
            </h1>

            <p className="text-[18px] leading-relaxed text-sub">{entry.description}</p>

            <p className="font-mono text-[13px] text-sub">
              <time dateTime={entry.date}>{formatDate(entry.date, locale)}</time> · {t.by} {entry.author}
            </p>
          </header>

          <div className="prose mt-10 max-w-none">
            <MDX components={getMDXComponents()} />
          </div>
        </article>
      </main>

      <Footer locale={locale} alternate={alternate} />
    </>
  );
}
