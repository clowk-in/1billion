import type { Metadata } from 'next';
import Link from 'next/link';

import { Logo } from '@/components/brand/logo';

// A missing page is never indexed, and its links still are.
export const metadata: Metadata = { title: 'Page not found', robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <img src="/brand/bila-mascot.svg" alt="" width={260} height={217} />

      <Logo height={30} />

      <h1 className="font-display text-[32px] font-semibold tracking-[-0.03em] text-ink">This page does not exist</h1>

      <p className="max-w-md text-[16px] text-sub">The link is old, or the address has a typo. Start again from the docs.</p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/docs" className="btn-buy rounded-xl px-5 py-3 text-[15px] font-semibold">
          Open the docs
        </Link>

        <Link href="/" className="rounded-xl border border-line2 px-5 py-3 text-[15px] font-semibold text-ink hover:bg-panel2">
          Go to the home page
        </Link>
      </div>
    </main>
  );
}
