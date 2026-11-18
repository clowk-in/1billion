import type { LucideIcon } from 'lucide-react';
import { AppWindow, Braces, Cloud, CodeXml, Gem, Hexagon } from 'lucide-react';
import Link from 'next/link';

import { copy, type Locale } from '@/lib/i18n';

// The icon and the guide of each runtime, in the order of copy.runtimes.items.
const extras: { icon: LucideIcon; href: string; warn?: boolean }[] = [
  { icon: Gem, href: '/docs/sdks/ruby' },
  { icon: Hexagon, href: '/docs/sdks/javascript' },
  { icon: CodeXml, href: '/docs/sdks/go' },
  { icon: Cloud, href: '/docs/sdks/aws-lambda' },
  { icon: Braces, href: '/docs/api' },
  { icon: AppWindow, href: '/docs/sdks/javascript#front-end-apps' },
];

export function Runtimes({ locale }: { locale: Locale }) {
  const t = copy[locale].runtimes;

  return (
    <section className="border-t border-line bg-deep/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="font-mono text-[13px] font-medium uppercase tracking-[0.16em] text-brandtext">{t.eyebrow}</p>

          <h2 className="font-display text-[38px] font-extrabold leading-tight tracking-[-0.035em] text-ink md:text-[56px]">
            {t.title}
          </h2>

          <p className="text-[17px] leading-relaxed text-sub md:text-[19px]">{t.text}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, index) => (
            <RuntimeCard key={item.name} {...item} {...extras[index]} />
          ))}
        </div>

        <p className="mt-8 text-center text-[15px] text-sub">{t.note}</p>
      </div>
    </section>
  );
}

type CardProps = {
  name: string;
  how: string;
  text: string;
  icon: LucideIcon;
  href: string;
  warn?: boolean;
};

function RuntimeCard({ name, how, text, icon: Icon, href, warn }: CardProps) {
  const frame = warn ? 'border-amber/40 hover:border-amber/70' : 'border-line hover:border-line2';
  const badge = warn ? 'bg-amber/15 text-amber' : 'bg-brandwash text-brandtext';

  return (
    <Link href={href} className={`flex min-w-0 flex-col gap-3 rounded-2xl border bg-panel p-6 transition-colors ${frame}`}>
      <div className="flex items-center gap-3">
        <span className={`flex size-10 flex-none items-center justify-center rounded-xl ${badge}`}>
          <Icon size={19} aria-hidden="true" />
        </span>

        <div className="flex min-w-0 flex-col">
          <h3 className="text-[17px] font-semibold text-ink">{name}</h3>

          <span className="truncate font-mono text-[12px] text-sub">{how}</span>
        </div>
      </div>

      <p className="text-[15px] leading-relaxed text-sub">{text}</p>
    </Link>
  );
}
