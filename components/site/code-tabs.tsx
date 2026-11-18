'use client';

import { useState, type ReactNode } from 'react';

export type CodeTab = {
  label: string;
  file: string;
  code: ReactNode;
};

// The tabs only switch which file shows. The code and the answer come
// highlighted from the server (SendExample), so no highlighter ships to the
// browser. The answer is the same for every tab: it is the same mail.
type Props = { tabs: CodeTab[]; response: ReactNode; responseLabel: string };

export function CodeTabs({ tabs, response, responseLabel }: Props) {
  const [current, setCurrent] = useState(0);
  const tab = tabs[current];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-1 overflow-x-auto border-b border-line" role="tablist" aria-label="Language">
        {tabs.map((item, index) => (
          <TabButton key={item.label} label={item.label} active={index === current} onPick={() => setCurrent(index)} />
        ))}
      </div>

      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-deep lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <figure className="code-panel code-editor flex min-w-0 flex-col border-line lg:border-r" role="tabpanel" aria-label={tab.label}>
          <figcaption className="flex items-center gap-2 border-b border-line px-3 py-2.5">
            <span className="rounded-md bg-panel2 px-3 py-1 font-mono text-[12.5px] text-ink">{tab.file}</span>
          </figcaption>

          {tab.code}
        </figure>

        <figure className="code-panel flex min-w-0 flex-col border-t border-line bg-bar lg:border-t-0">
          <figcaption className="flex items-center gap-2 border-b border-line px-3 py-2.5">
            <span className="rounded-md bg-panel2 px-3 py-1 text-[12.5px] font-medium text-ink">{responseLabel}</span>

            <span className="font-mono text-[12px] text-ok">202 Accepted</span>
          </figcaption>

          {response}
        </figure>
      </div>
    </div>
  );
}

function TabButton({ label, active, onPick }: { label: string; active: boolean; onPick: () => void }) {
  const tone = active ? 'border-brandtext text-ink' : 'border-transparent text-sub hover:text-ink';

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onPick}
      className={`-mb-px min-h-11 flex-none border-b-2 px-4 text-[15px] font-medium ${tone}`}
    >
      {label}
    </button>
  );
}
