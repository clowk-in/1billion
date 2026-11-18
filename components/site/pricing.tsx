import { Check } from 'lucide-react';

import { copy, type Locale } from '@/lib/i18n';
import { site } from '@/lib/site';

export function Pricing({ locale }: { locale: Locale }) {
  const t = copy[locale].pricing;

  return (
    <section id="pricing" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <h2 className="max-w-2xl font-display text-[30px] font-bold leading-tight tracking-[-0.03em] text-ink md:text-[40px]">
          {t.title}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <PlanCard {...t.free} cta={{ href: site.app, label: t.free.cta }} strong />

          <PlanCard {...t.pack} cta={{ href: site.app, label: t.pack.cta }} />
        </div>
      </div>
    </section>
  );
}

type Plan = {
  name: string;
  price: string;
  note: string;
  items: string[];
  cta: { href: string; label: string };
  strong?: boolean;
};

function PlanCard({ name, price, note, items, cta, strong }: Plan) {
  const frame = strong ? 'border-brand bg-brandwash/40' : 'border-line bg-panel';

  const button = strong
    ? 'btn-buy'
    : 'border border-line2 text-ink hover:bg-panel2';

  return (
    <div className={`flex min-w-0 flex-col gap-5 rounded-xl border p-6 md:p-8 ${frame}`}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[19px] font-semibold text-ink">{name}</h3>

        <span className="font-display text-[32px] font-extrabold tracking-[-0.03em] text-ink">{price}</span>
      </div>

      <p className="text-[15px] leading-relaxed text-sub">{note}</p>

      <ul className="flex flex-col gap-2.5">
        {items.map(item => (
          <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
            <Check size={17} className="mt-0.5 flex-none text-brandtext" aria-hidden="true" />

            {item}
          </li>
        ))}
      </ul>

      <a href={cta.href} className={`mt-auto rounded-md px-5 py-3 text-center text-[15px] font-semibold ${button}`}>
        {cta.label}
      </a>
    </div>
  );
}
