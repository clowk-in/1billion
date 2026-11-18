import { Infinity as Forever } from 'lucide-react';
import Link from 'next/link';

import { copy, type Locale } from '@/lib/i18n';
import { site } from '@/lib/site';

const cardClass = [
  'relative flex flex-col items-start gap-8 overflow-hidden rounded-[28px] border border-white/10 p-8 md:flex-row md:items-end md:justify-between md:p-14',
  'bg-[radial-gradient(ellipse_at_85%_10%,rgba(185,162,255,0.3),transparent_55%),linear-gradient(135deg,#2a1268_0%,#4320ad_50%,#6a35e6_100%)]',
].join(' ');

export function Cta({ locale }: { locale: Locale }) {
  const t = copy[locale].cta;

  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className={cardClass}>
          <div className="flex max-w-2xl flex-col gap-4">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-white">
              <Forever size={15} aria-hidden="true" />
              {t.eyebrow}
            </p>

            <h2 className="font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.035em] text-white md:text-[52px]">
              {t.title}
            </h2>

            <p className="text-[16px] leading-relaxed text-white/85 md:text-[17px]">{t.text}</p>
          </div>

          <div className="flex w-full flex-none flex-col items-start gap-5 sm:w-auto md:items-end">
            <img src="/brand/bila-mascot.svg" alt="" width={220} height={183} className="hidden drop-shadow-[0_18px_30px_rgba(12,4,40,0.45)] md:block" />

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:flex-col lg:flex-row">
              <a href={site.app} className="btn-buy whitespace-nowrap rounded-xl px-6 py-3.5 text-center text-[16px] font-bold">
                {t.key}
              </a>

              <Link
                href="/docs/getting-started"
                className="whitespace-nowrap rounded-xl border border-white/30 bg-[#140a33]/60 px-6 py-3.5 text-center text-[16px] font-semibold text-white hover:bg-[#140a33]"
              >
                {t.quickstart}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
