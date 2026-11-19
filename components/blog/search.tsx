'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type ReactNode, useState } from 'react';

import type { InboxItem } from '@/lib/blog';
import { blogHome, copy, type Locale } from '@/lib/i18n';

// The search of the blog (⌘K). The index is the list of posts that the page
// already has, built at build time, so it runs in the browser with no server.
// A word in the title counts most, then a tag, then the text. Each word must
// match somewhere.

type Props = { locale: Locale; items: InboxItem[]; onClose: () => void };

function score(item: InboxItem, words: string[]) {
  const title = item.title.toLowerCase();
  const tags = item.tags.join(' ').toLowerCase();
  const text = `${item.description} ${item.text}`.toLowerCase();

  let total = 0;

  for (const word of words) {
    const points = (title.includes(word) ? 5 : 0) + (tags.includes(word) ? 3 : 0) + (text.includes(word) ? 1 : 0);

    if (points === 0) return 0;

    total += points;
  }

  return total;
}

export function find(items: InboxItem[], query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);

  if (words.length === 0) return { words, hits: items.slice(0, 6) };

  const hits = items
    .map(item => ({ item, points: score(item, words) }))
    .filter(entry => entry.points > 0)
    .sort((a, b) => b.points - a.points)
    .map(entry => entry.item);

  return { words, hits };
}

function escape(word: string) {
  return word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text: string, words: string[]): ReactNode {
  if (words.length === 0) return text;

  const parts = text.split(new RegExp(`(${words.map(escape).join('|')})`, 'gi'));

  return parts.map((part, index) => (index % 2 === 1 ? <mark key={index} className="bg-transparent font-bold text-brandtext">{part}</mark> : part));
}

export function SearchPalette({ locale, items, onClose }: Props) {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const t = copy[locale].blog.inbox;
  const { words, hits } = find(items, query);
  const index = Math.min(active, Math.max(hits.length - 1, 0));

  function open(item: InboxItem) {
    onClose();
    router.push(`${blogHome[locale]}${item.slug}/`);
  }

  function onKey(event: React.KeyboardEvent) {
    if (event.key === 'Escape') onClose();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(Math.min(index + 1, hits.length - 1));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(Math.max(index - 1, 0));
    }

    if (event.key === 'Enter' && hits[index]) open(hits[index]);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={event => event.target === event.currentTarget && onClose()}
    >
      <div role="dialog" aria-label={t.search} className="w-full max-w-[620px] overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_40px_90px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3.5">
          <Search size={18} className="text-sub" aria-hidden="true" />

          <input
            id="blog-search"
            autoFocus
            value={query}
            onChange={event => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKey}
            placeholder={t.searchHint}
            autoComplete="off"
            className="flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-sub"
          />

          <kbd className="rounded border border-line px-1.5 font-mono text-[11px] text-sub">esc</kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-1.5">
          {hits.length === 0 && <p className="px-5 py-10 text-center text-[14px] text-sub">{t.noResults(query)}</p>}

          {hits.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => open(item)}
              onMouseEnter={() => setActive(i)}
              className={`grid w-full gap-0.5 rounded-lg px-3 py-2.5 text-left ${i === index ? 'bg-brandwash' : ''}`}
            >
              <strong className="text-[14px] text-ink">{highlight(item.title, words)}</strong>

              <span className="truncate text-[12px] text-sub">{highlight(item.description, words)}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-3.5 border-t border-line px-3.5 py-2 text-[11px] text-sub">
          <span>↑↓ {t.move}</span>

          <span>↵ {t.open}</span>

          <span>esc {t.close}</span>
        </div>
      </div>
    </div>
  );
}
