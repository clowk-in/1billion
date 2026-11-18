import type { ReactNode } from 'react';

import { copy, type Locale } from '@/lib/i18n';

type Copy = (typeof copy)['en']['why'];

// The color of each row eyebrow, in the order of copy.why.rows.
const tones = ['text-brandtext', 'text-ok', 'text-amber', 'text-[#7cc4fa]'];

// The color of each result in the two mono tables.
const checkTones = ['text-ok', 'text-amber', 'text-[#ff8a8a]', 'text-[#ff8a8a]'];
const retryTones = ['text-ok', 'text-ok', 'text-amber', 'text-sub'];
const journeyTones = ['bg-brandtext', 'bg-brandtext', 'bg-amber', 'bg-ok'];

export function Why({ locale }: { locale: Locale }) {
  const t = copy[locale].why;

  const visuals: ReactNode[] = [
    <RouteCompare key="routes" t={t} />,
    <MonoTable key="checks" rows={t.checks} tones={checkTones} />,
    <Timeline key="journey" steps={t.journey} />,
    <MonoTable key="retries" rows={t.retries} tones={retryTones} />,
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-32">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <p className="font-mono text-[13px] font-medium uppercase tracking-[0.16em] text-brandtext">{t.eyebrow}</p>

        <h2 className="font-display text-[30px] font-extrabold leading-tight tracking-[-0.035em] text-ink md:text-[56px]">
          {t.title}
        </h2>

        <p className="text-[16px] leading-relaxed text-sub md:text-[19px]">{t.text}</p>
      </div>

      <div className="mt-8 flex flex-col md:mt-16">
        {t.rows.map((row, index) => (
          <WhyRow
            key={row.eyebrow}
            eyebrow={row.eyebrow}
            title={row.title}
            text={row.text}
            tone={tones[index]}
            visual={visuals[index]}
            last={index === t.rows.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

type RowProps = {
  eyebrow: string;
  title: string;
  text: string;
  tone: string;
  visual: ReactNode;
  last: boolean;
};

function WhyRow({ eyebrow, title, text, tone, visual, last }: RowProps) {
  const border = last ? '' : 'border-b border-line';

  return (
    <div className={`grid grid-cols-1 items-center gap-6 py-10 md:gap-10 md:py-14 lg:grid-cols-2 lg:gap-16 ${border}`}>
      <div className="flex min-w-0 flex-col gap-4">
        <p className={`font-mono text-[13px] font-medium uppercase tracking-[0.16em] ${tone}`}>{eyebrow}</p>

        <h3 className="font-display text-[26px] font-bold tracking-[-0.02em] text-ink md:text-[30px]">{title}</h3>

        <p className="text-[16px] leading-relaxed text-sub md:text-[17px]">{text}</p>
      </div>

      <div className="min-w-0">{visual}</div>
    </div>
  );
}

function RouteCompare({ t }: { t: Copy }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <RouteCard title={t.relay.title} note={t.relay.note} hops={t.relay.hops} />

      <RouteCard title={t.ours.title} note={t.ours.note} hops={t.ours.hops} strong />
    </div>
  );
}

function RouteCard({ title, note, hops, strong }: { title: string; note: string; hops: string[]; strong?: boolean }) {
  const frame = strong
    ? 'border-brandtext/60 shadow-[0_0_0_1px_rgba(185,162,255,0.25),0_18px_40px_-18px_rgba(106,53,230,0.6)]'
    : 'border-line';

  const titleTone = strong ? 'text-brandtext' : 'text-ink';

  return (
    <div className={`flex flex-col items-center gap-5 rounded-2xl border bg-panel px-5 py-6 ${frame}`}>
      <ol className="flex w-full flex-col items-center">
        {hops.map((hop, index) => (
          <Hop key={hop} label={hop} first={index === 0} strong={strong && index === 1} />
        ))}
      </ol>

      <div className="flex flex-col items-center gap-1 text-center">
        <span className={`text-[16px] font-semibold ${titleTone}`}>{title}</span>

        <span className="text-[13px] text-sub">{note}</span>
      </div>
    </div>
  );
}

function Hop({ label, first, strong }: { label: string; first: boolean; strong?: boolean }) {
  const box = strong ? 'border-brandtext/70 bg-brandwash text-ink' : 'border-line2 bg-panel2 text-sub';

  return (
    <li className="flex flex-col items-center">
      {!first && <span className="h-5 w-px bg-line2" aria-hidden="true" />}

      <span className={`rounded-lg border px-3 py-1.5 font-mono text-[12px] ${box}`}>{label}</span>
    </li>
  );
}

type MonoRow = { left: string; right: string };

function MonoTable({ rows, tones }: { rows: MonoRow[]; tones: string[] }) {
  return (
    <ul className="flex flex-col">
      {rows.map((row, index) => (
        <li
          key={row.left}
          className={`flex flex-col gap-1 py-4 font-mono text-[13.5px] sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${index > 0 ? 'border-t border-line' : ''}`}
        >
          <span className="text-ink">{row.left}</span>

          <span className={`sm:text-right ${tones[index]}`}>{row.right}</span>
        </li>
      ))}
    </ul>
  );
}

function Timeline({ steps }: { steps: { status: string; text: string }[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => (
        <li key={step.status} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className={`mt-1.5 size-3 flex-none rounded-full ${journeyTones[index]}`} aria-hidden="true" />

            {index < steps.length - 1 && <span className="w-px flex-1 bg-line2" aria-hidden="true" />}
          </div>

          <div className="flex flex-col gap-1 pb-6">
            <span className="font-mono text-[14px] text-ink">{step.status}</span>

            <span className="text-[14px] text-sub">{step.text}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
