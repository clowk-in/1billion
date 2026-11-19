'use client';

import { Languages } from 'lucide-react';

import { copy, type Locale } from '@/lib/i18n';

// A link to the same page in the other language. The click keeps the choice
// in the cookie `lang` for a year, and the Worker (worker/index.ts) then never
// moves this reader by country again.
type Props = {
  locale: Locale;
  href: string;
  // The short form for the menu: the icon and the language of this page (EN
  // or PT). A click goes to the other one.
  compact?: boolean;
};

export function LanguageSwitch({ locale, href, compact }: Props) {
  const other: Locale = locale === 'en' ? 'pt-br' : 'en';

  function keep() {
    document.cookie = `lang=${other}; path=/; max-age=31536000; samesite=lax`;
  }

  const t = copy[locale].language;

  const look = compact
    ? 'h-10 rounded-md px-2.5 text-[13px] font-semibold'
    : 'rounded-lg border border-line px-3 py-2 text-[14px]';

  return (
    <a
      href={href}
      hrefLang={other === 'en' ? 'en' : 'pt-BR'}
      onClick={keep}
      aria-label={`${t.label}: ${t.other}`}
      className={`inline-flex w-fit items-center gap-2 text-sub hover:bg-panel2 hover:text-ink ${look}`}
    >
      <Languages size={16} aria-hidden="true" />
      {compact ? t.short : t.other}
    </a>
  );
}
