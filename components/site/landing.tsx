import type { Metadata } from 'next';

import { Cta } from '@/components/site/cta';
import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';
import { Hero } from '@/components/site/hero';
import { Pricing } from '@/components/site/pricing';
import { Runtimes } from '@/components/site/runtimes';
import { SendExample } from '@/components/site/send-example';
import { Why } from '@/components/site/why';
import { copy, home, htmlLang, type Locale, ogLocale } from '@/lib/i18n';
import { clowk, JsonLd, shareImageFor } from '@/lib/seo';
import { site } from '@/lib/site';

// The metadata of the home page of one locale, with the hreflang links that
// tie the two languages together for search engines.
export function landingMetadata(locale: Locale): Metadata {
  const t = copy[locale].meta;
  const url = `${site.url}${home[locale]}`;
  const image = shareImageFor(locale);

  return {
    title: { absolute: t.title },
    description: t.description,
    alternates: {
      canonical: home[locale],
      languages: { en: home.en, 'pt-BR': home['pt-br'], 'x-default': home.en },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url,
      siteName: site.name,
      type: 'website',
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[locale === 'en' ? 'pt-br' : 'en']],
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: [image],
    },
  };
}

function structuredData(locale: Locale) {
  const t = copy[locale].meta;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      clowk,
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        name: site.name,
        url: site.url,
        description: t.description,
        publisher: { '@id': clowk['@id'] },
        inLanguage: htmlLang[locale],
      },
      {
        '@type': 'SoftwareApplication',
        name: site.name,
        url: site.url,
        description: t.description,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@id': clowk['@id'] },
        sameAs: [site.github, site.sdks.ruby, site.sdks.go, site.sdks.js],
      },
    ],
  };
}

export function Landing({ locale }: { locale: Locale }) {
  const other: Locale = locale === 'en' ? 'pt-br' : 'en';

  return (
    <>
      <JsonLd data={structuredData(locale)} />

      <Header locale={locale} alternate={home[other]} />

      <main className="flex-1" lang={htmlLang[locale]}>
        <Hero locale={locale} />

        <Why locale={locale} />

        <SendExample locale={locale} />

        <Runtimes locale={locale} />

        <Pricing locale={locale} />

        <Cta locale={locale} />
      </main>

      <Footer locale={locale} alternate={home[other]} />
    </>
  );
}
