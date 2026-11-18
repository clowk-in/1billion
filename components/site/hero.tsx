import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { CopyCommand } from '@/components/site/copy-command';
import { HeroArt } from '@/components/site/hero-art';
import { copy, type Locale } from '@/lib/i18n';
import { site } from '@/lib/site';

// A large rounded card in a deep purple gradient, almost as wide as the
// screen, as on solidjs.com.
// It fills the screen from the menu down to the stats bar, so the bar sits
// at the fold, and it is wider than the content of the rest of the page.
// The height stops at 860px, so a tall screen does not stretch it.
const cardClass = [
  'relative flex overflow-hidden rounded-[28px] border border-white/10',
  'bg-[radial-gradient(ellipse_at_70%_20%,rgba(185,162,255,0.28),transparent_55%),linear-gradient(135deg,#2a1268_0%,#4320ad_45%,#6a35e6_100%)]',
  'min-h-[clamp(600px,calc(100svh-env(safe-area-inset-top)-176px),860px)]',
  'px-5 pb-10 pt-6 md:px-16 md:pb-16 md:pt-8',
].join(' ');

export function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale].hero;

  return (
    <section className="w-full px-4 pt-[calc(env(safe-area-inset-top)+80px)]">
      <div className={cardClass}>
        <HeroArt />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col">
          <Link
            href="/docs/sdks"
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/25 bg-white/10 py-1 pl-1 pr-3.5 text-[14px] text-white backdrop-blur hover:bg-white/15"
          >
            <span className="rounded-full bg-lime px-2.5 py-0.5 text-[12px] font-bold text-[#16161a]">{t.badge}</span>
            {t.pill}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>

          <div className="mt-auto grid grid-cols-1 items-end gap-10 pt-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <h1 className="font-display text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] text-white md:text-[76px]">
              {t.titleA}
              <span className="block text-[#cdbfff]">{t.titleB}</span>
            </h1>

            <div className="flex min-w-0 flex-col gap-6">
              <p className="text-[17px] leading-relaxed text-white/85 md:text-[18px]">{t.text}</p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={site.app} className="btn-buy rounded-xl px-5 py-3 text-center text-[15px] font-semibold">
                  {t.start}
                </a>

                <Link
                  href="/docs/getting-started"
                  className="rounded-xl border border-white/20 bg-[#140a33]/70 px-5 py-3 text-center text-[15px] font-semibold text-white hover:bg-[#140a33]"
                >
                  {t.quickstart}
                </Link>
              </div>

              <div className="max-w-md">
                <CopyCommand command="bundle add 1billion" />
              </div>

              <p className="text-[13px] text-white/70">{t.note}</p>
            </div>
          </div>
        </div>
      </div>

      <Stats stats={t.stats} />
    </section>
  );
}

function Stats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="mx-auto mt-2 grid max-w-6xl grid-cols-1 gap-3 rounded-2xl border border-line bg-panel px-6 py-5 sm:grid-cols-3">
      {stats.map(stat => (
        <div key={stat.label} className="flex items-baseline justify-center gap-3">
          <span className="font-display text-[30px] font-bold tracking-[-0.03em] text-ink">{stat.value}</span>

          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-sub">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
