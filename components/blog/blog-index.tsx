import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';
import { formatDate, type Post, posts } from '@/lib/blog';
import { blogHome, copy, htmlLang, type Locale, ogLocale } from '@/lib/i18n';
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

// A dark card with a violet glow, and Bila large on the right: the same
// family as the hero of the landing page, quieter, so the posts lead.
const bannerClass = [
  'relative overflow-hidden rounded-[28px] border border-line',
  'bg-[radial-gradient(ellipse_at_85%_45%,rgba(106,53,230,0.55),transparent_60%),linear-gradient(180deg,#151126_0%,#0c0a14_100%)]',
].join(' ');

export function BlogIndex({ locale }: { locale: Locale }) {
  const t = copy[locale].blog;
  const other: Locale = locale === 'en' ? 'pt-br' : 'en';
  const list = posts(locale);

  // Cards of a fixed width. Up to 3 posts sit in the middle, so a short list
  // does not leave an empty side; 4 or more start on the left, as a list.
  // auto-fit, not auto-fill: the empty columns collapse, so the centre is
  // the centre of the cards and not of a row of empty tracks.
  const align = list.length <= 3 ? 'justify-center' : 'justify-start';
  const gridClass = `grid grid-cols-1 gap-5 sm:grid-cols-[repeat(auto-fit,minmax(300px,360px))] ${align}`;

  return (
    <>
      <Header locale={locale} alternate={blogHome[other]} />

      <main lang={htmlLang[locale]} className="flex-1 pb-24">
        <section className="px-4 pt-[calc(env(safe-area-inset-top)+80px)]">
          <div className={bannerClass}>
            <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-6 py-14 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:px-12 md:py-16">
              <div className="flex min-w-0 flex-col gap-5">
                <p className="w-fit rounded-full bg-lime px-3 py-1 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#16161a]">
                  {t.eyebrow}
                </p>

                <h1 className="text-balance font-display text-[38px] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink md:text-[54px]">
                  {t.headline}
                </h1>

                <p className="max-w-xl text-[17px] leading-relaxed text-sub md:text-[18px]">{t.description}</p>
              </div>

              <div className="relative hidden justify-center md:flex">
                <span className="absolute inset-x-8 bottom-4 top-8 rounded-full bg-[radial-gradient(closest-side,rgba(241,236,254,0.32),transparent)]" aria-hidden="true" />

                <img src="/brand/bila-mascot.svg" alt="" width={360} height={300} className="relative w-full max-w-[360px]" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 px-4" aria-label={t.title}>
          <div className={gridClass}>
            {list.map(entry => (
              <PostCard key={entry.slug} entry={entry} locale={locale} />
            ))}
          </div>
        </section>
      </main>

      <Footer locale={locale} alternate={blogHome[other]} />
    </>
  );
}

function href(entry: Post, locale: Locale) {
  return `${blogHome[locale]}${entry.slug}/`;
}

// One post in the grid: its image, the date and the author, the title, the
// text, and a link to read it.
function PostCard({ entry, locale }: { entry: Post; locale: Locale }) {
  const t = copy[locale].blog;

  return (
    <Link
      href={href(entry, locale)}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-colors hover:border-line2"
    >
      <Cover entry={entry} />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Meta entry={entry} locale={locale} />

        <h2 className="text-balance font-display text-[20px] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink group-hover:text-brandtext">
          {entry.title}
        </h2>

        <p className="line-clamp-3 text-[14.5px] leading-relaxed text-sub">{entry.description}</p>

        <span className="mt-auto inline-flex items-center gap-2 pt-1 text-[14px] font-semibold text-brandtext">
          {t.read}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

// The image of the post (its cover, or else its first image) fills the
// frame (object-fit: cover), from its top left, where a screenshot has its
// title. A post with no image gets Bila on a violet stage and its title, so
// the card is never empty.
function Cover({ entry }: { entry: Post }) {
  const frame = 'aspect-[16/10]';

  if (entry.image) {
    return (
      <div className={`relative overflow-hidden border-b border-line bg-panel2 ${frame}`}>
        <img
          src={entry.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-4 overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,rgba(185,162,255,0.35),transparent_60%),linear-gradient(135deg,#2a1268_0%,#4320ad_55%,#6a35e6_100%)] p-6 ${frame}`}
    >
      <img src="/brand/bila-white.svg" alt="" width={96} height={80} />

      <span className={`max-w-md text-center font-display font-extrabold leading-[1.08] tracking-[-0.03em] text-white text-[26px]`}>
        {entry.title}
      </span>
    </div>
  );
}

function Meta({ entry, locale }: { entry: Post; locale: Locale }) {
  const t = copy[locale].blog;

  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-sub">
      <time dateTime={entry.date} className="rounded-full border border-line2 px-2.5 py-0.5 text-ink">
        {formatDate(entry.date, locale)}
      </time>

      <span>
        {t.by} {entry.author}
      </span>
    </p>
  );
}
