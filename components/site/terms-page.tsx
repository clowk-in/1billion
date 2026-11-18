import type { Metadata } from 'next';

import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';
import { copy, htmlLang, type Locale, ogLocale, terms } from '@/lib/i18n';
import { shareImageFor } from '@/lib/seo';
import { site } from '@/lib/site';

export function termsMetadata(locale: Locale): Metadata {
  const t = copy[locale].terms;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: terms[locale],
      languages: { en: terms.en, 'pt-BR': terms['pt-br'], 'x-default': terms.en },
    },
    openGraph: {
      title: `${t.title} | ${site.name}`,
      description: t.description,
      url: `${site.url}${terms[locale]}`,
      siteName: site.name,
      type: 'website',
      locale: ogLocale[locale],
      images: [shareImageFor(locale)],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.title} | ${site.name}`,
      description: t.description,
      images: [shareImageFor(locale)],
    },
  };
}

export function TermsPage({ locale }: { locale: Locale }) {
  const t = copy[locale].terms;
  const other: Locale = locale === 'en' ? 'pt-br' : 'en';

  return (
    <>
      <Header locale={locale} alternate={terms[other]} />

      <main lang={htmlLang[locale]} className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-32 md:px-6 md:pt-40">
        <h1 className="font-display text-[40px] font-bold tracking-[-0.035em] text-ink">{t.title}</h1>

        <div className="mt-10 flex flex-col gap-10">
          {t.sections.map(section => (
            <section key={section.title} className="flex flex-col gap-3">
              <h2 className="text-[19px] font-semibold text-ink">{section.title}</h2>

              <p className="text-[16px] leading-relaxed text-sub">{section.text}</p>
            </section>
          ))}
        </div>

        <p className="mt-12 text-[14px] text-sub">
          {t.questions}{' '}
          <a href={site.github} className="text-brandtext hover:underline">
            GitHub
          </a>
          .
        </p>
      </main>

      <Footer locale={locale} alternate={terms[other]} />
    </>
  );
}
