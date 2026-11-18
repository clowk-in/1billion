import Link from 'next/link';

import { Logo } from '@/components/brand/logo';
import { LanguageSwitch } from '@/components/site/language-switch';
import { SocialIcon } from '@/components/site/social-icon';
import { blogHome, copy, home, type Locale, terms } from '@/lib/i18n';
import { site } from '@/lib/site';

type Props = {
  locale?: Locale;
  // The same page in the other language, for the language switch.
  alternate?: string;
};

function groups(locale: Locale) {
  const t = copy[locale].footer;

  return [
    {
      title: t.docs,
      links: [
        { href: '/docs/getting-started', label: t.links.quickstart },
        { href: '/docs/api', label: t.links.api },
        { href: '/docs/guides/webhooks', label: t.links.webhooks },
        { href: '/docs/guides/domains', label: t.links.domains },
      ],
    },
    {
      title: t.sdks,
      links: [
        { href: site.sdks.ruby, label: t.links.ruby },
        { href: site.sdks.js, label: t.links.js },
        { href: site.sdks.go, label: t.links.go },
      ],
    },
    {
      title: t.product,
      links: [
        { href: site.app, label: t.links.console },
        { href: `${home[locale]}#pricing`, label: t.links.pricing },
        { href: blogHome[locale], label: copy[locale].blog.nav },
        { href: terms[locale], label: t.links.terms },
        { href: '/llms.txt', label: 'llms.txt' },
      ],
    },
  ];
}

export function Footer({ locale = 'en', alternate }: Props) {
  const t = copy[locale].footer;
  const other = locale === 'en' ? 'pt-br' : 'en';

  return (
    <footer className="border-t border-line pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6">
        <div className="col-span-2 flex flex-col gap-5 md:col-span-1">
          <Link href={home[locale]} aria-label={copy[locale].nav.home}>
            <Logo height={26} />
          </Link>

          <p className="max-w-xs text-[14px] leading-relaxed text-sub">{t.about}</p>

          <div className="flex gap-1">
            {site.social.map(network => (
              <a
                key={network.name}
                href={network.url}
                aria-label={`1billion on ${network.name}`}
                className="flex size-10 items-center justify-center rounded-md text-sub hover:bg-panel2 hover:text-ink"
              >
                <SocialIcon name={network.icon} />
              </a>
            ))}
          </div>

          <LanguageSwitch locale={locale} href={alternate ?? home[other]} />
        </div>

        {groups(locale).map(group => (
          <div key={group.title} className="flex flex-col gap-3">
            <h3 className="text-[14px] font-semibold text-ink">{group.title}</h3>

            {group.links.map(link => (
              <a key={link.href} href={link.href} className="text-[14px] text-sub hover:text-ink">
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
