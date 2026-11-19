'use client';

import { ArrowLeft, BookOpen, Check, Code, Inbox as InboxIcon, Lightbulb, Link2, Mail, Maximize2, Megaphone, Minimize2, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import { SearchPalette } from '@/components/blog/search';
import { ThemeSwitch } from '@/components/blog/theme-switch';
import { Header } from '@/components/site/header';
import type { InboxItem } from '@/lib/blog';
import { blogHome, copy, htmlLang, type Locale } from '@/lib/i18n';
import { markRead, useReadPosts } from '@/lib/read-posts';
import { site } from '@/lib/site';

// The blog as a mail app: mailboxes, the list of posts, and the post that is
// open. Each post keeps its own page (/blog/<slug>/), built at build time; a
// click in the list is a client navigation of Next.js, so the URL changes,
// the back button works, and this shell (the list, its scroll, the folder)
// stays. On a phone it shows one pane at a time: the list on /blog/, the post
// on /blog/<slug>/.

type Box = 'all' | 'unread' | InboxItem['folder'];

const folderIcons = { concepts: Lightbulb, sdks: Code, guides: BookOpen, product: Megaphone };

const folders: InboxItem['folder'][] = ['concepts', 'sdks', 'guides', 'product'];

type Props = {
  locale: Locale;
  items: InboxItem[];
  // The slugs of the posts in the other language, for the language switch.
  otherSlugs: string[];
  children: ReactNode;
};

export function Inbox({ locale, items, otherSlugs, children }: Props) {
  const pathname = usePathname();
  const read = useReadPosts();
  const readPane = useRef<HTMLElement>(null);

  const [box, setBox] = useState<Box>('all');
  const [focus, setFocus] = useState(false);
  const [searching, setSearching] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = copy[locale].blog.inbox;
  const home = blogHome[locale];
  const other: Locale = locale === 'en' ? 'pt-br' : 'en';

  const current = pathname.startsWith(home) ? pathname.slice(home.length).replace(/\/$/, '') : '';
  const selected = current || items[0]?.slug;
  const alternate = current && otherSlugs.includes(current) ? `${blogHome[other]}${current}/` : blogHome[other];

  const visible = items.filter(item => inBox(item, box, read));

  useEffect(() => {
    if (current) markRead(current);

    readPane.current?.scrollTo({ top: 0 });
  }, [current]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearching(value => !value);

        return;
      }

      if (event.key === 'Escape') setFocus(false);
    }

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${site.url}${home}${selected}/`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  const reading = current !== '';

  const panesClass = focus
    ? 'grid min-h-0 flex-1 grid-cols-1'
    : 'grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[220px_340px_minmax(0,1fr)]';

  const sideClass = focus ? 'hidden' : 'hidden overflow-y-auto border-r border-line bg-deep px-2.5 py-3.5 lg:block';
  const listClass = focus ? 'hidden' : `${reading ? 'hidden md:flex' : 'flex'} min-h-0 flex-col border-r border-line`;
  const readClass = `${reading || focus ? 'block' : 'hidden md:block'} min-w-0 overflow-y-auto bg-panel`;

  const searchButton = (
    <>
      <ThemeSwitch locale={locale} />

      <button
      type="button"
      onClick={() => setSearching(true)}
      aria-label={t.search}
      className="flex h-10 items-center gap-2 rounded-lg border border-line bg-panel px-3 text-[13px] text-sub hover:text-ink md:w-64"
    >
      <Search size={15} aria-hidden="true" />

      <span className="hidden flex-1 text-left md:inline">{t.search}</span>

      <kbd className="hidden rounded border border-line px-1.5 font-mono text-[11px] md:inline">⌘K</kbd>
      </button>
    </>
  );

  return (
    <div lang={htmlLang[locale]} className="blog flex h-svh flex-col overflow-hidden bg-bg text-ink">
      <Header locale={locale} alternate={alternate} wide actions={searchButton} />

      <div className={panesClass}>
        <nav className={sideClass} aria-label={t.folders}>
          <BoxButton icon={InboxIcon} label={t.all} count={items.length} on={box === 'all'} onClick={() => setBox('all')} />

          <BoxButton
            icon={Mail}
            label={t.unread}
            count={read ? items.filter(item => !read.has(item.slug)).length : 0}
            on={box === 'unread'}
            onClick={() => setBox('unread')}
          />

          <h2 className="mx-2.5 mb-1.5 mt-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-sub">{t.folders}</h2>

          {folders.map(folder => (
            <BoxButton
              key={folder}
              icon={folderIcons[folder]}
              label={t.folder[folder]}
              count={items.filter(item => item.folder === folder).length}
              on={box === folder}
              onClick={() => setBox(folder)}
            />
          ))}
        </nav>

        <section className={listClass} aria-label={copy[locale].blog.title}>
          <div className="flex items-baseline justify-between border-b border-line px-4 pb-2.5 pt-3.5">
            <h1 className="font-display text-[20px] font-extrabold tracking-[-0.02em]">{boxLabel(box, t)}</h1>

            <span className="text-[12px] text-sub">{t.posts(visible.length)}</span>
          </div>

          <MobileFolders box={box} setBox={setBox} t={t} />

          <div className="flex-1 overflow-y-auto">
            {visible.length === 0 && <p className="px-5 py-10 text-center text-[14px] text-sub">{t.allRead}</p>}

            {visible.map(item => (
              <Row
                key={item.slug}
                item={item}
                locale={locale}
                on={item.slug === selected}
                unread={read !== null && !read.has(item.slug)}
              />
            ))}
          </div>
        </section>

        <article ref={readPane} className={readClass}>
          <div className="sticky top-0 z-10 flex items-center gap-1.5 border-b border-line bg-panel px-4 py-2.5 md:px-5">
            <Link href={home} className={`${toolClass} md:hidden`}>
              <ArrowLeft size={15} aria-hidden="true" />
              {copy[locale].blog.back}
            </Link>

            <button type="button" onClick={copyLink} className={toolClass}>
              {copied ? <Check size={15} aria-hidden="true" /> : <Link2 size={15} aria-hidden="true" />}
              {copied ? t.copied : t.copyLink}
            </button>

            <span className="ml-auto hidden min-w-0 truncate font-mono text-[12px] text-sub md:inline">
              {home}
              {selected}/
            </span>

            <button type="button" onClick={() => setFocus(value => !value)} className={`${toolClass} hidden md:flex`}>
              {focus ? <Minimize2 size={15} aria-hidden="true" /> : <Maximize2 size={15} aria-hidden="true" />}
              {focus ? t.exitFullScreen : t.fullScreen}
            </button>
          </div>

          {children}
        </article>
      </div>

      {searching && <SearchPalette locale={locale} items={items} onClose={() => setSearching(false)} />}
    </div>
  );
}

const toolClass = 'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] text-sub hover:bg-panel2 hover:text-ink';

function inBox(item: InboxItem, box: Box, read: Set<string> | null) {
  if (box === 'all') return true;

  if (box === 'unread') return read !== null && !read.has(item.slug);

  return item.folder === box;
}

function boxLabel(box: Box, t: (typeof copy)['en']['blog']['inbox']) {
  if (box === 'all') return t.all;

  if (box === 'unread') return t.unread;

  return t.folder[box];
}

type BoxProps = {
  icon: typeof Mail;
  label: string;
  count: number;
  on: boolean;
  onClick: () => void;
};

function BoxButton({ icon: Icon, label, count, on, onClick }: BoxProps) {
  const look = on ? 'bg-brandwash text-brandtext' : 'text-ink hover:bg-panel2';

  return (
    <button type="button" onClick={onClick} aria-pressed={on} className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-[14px] ${look}`}>
      <Icon size={16} aria-hidden="true" />

      {label}

      <span className={`ml-auto font-mono text-[11px] ${on ? 'text-brandtext' : 'text-sub'}`}>{count}</span>
    </button>
  );
}

// Below the large screen the mailboxes column hides, so the folders become a
// row of chips over the list.
function MobileFolders({ box, setBox, t }: { box: Box; setBox: (box: Box) => void; t: (typeof copy)['en']['blog']['inbox'] }) {
  const boxes: Box[] = ['all', 'unread', ...folders];

  return (
    <div className="flex gap-1.5 overflow-x-auto border-b border-line px-4 py-2 lg:hidden">
      {boxes.map(value => (
        <button
          key={value}
          type="button"
          onClick={() => setBox(value)}
          aria-pressed={box === value}
          className={`shrink-0 rounded-full px-3 py-1 text-[12px] ${box === value ? 'bg-brandwash text-brandtext' : 'text-sub hover:text-ink'}`}
        >
          {boxLabel(value, t)}
        </button>
      ))}
    </div>
  );
}

function shortDate(date: string, locale: Locale) {
  const tag = locale === 'en' ? 'en-US' : 'pt-BR';

  return new Date(`${date.slice(0, 10)}T12:00:00Z`).toLocaleDateString(tag, { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

type RowProps = { item: InboxItem; locale: Locale; on: boolean; unread: boolean };

function Row({ item, locale, on, unread }: RowProps) {
  const look = on ? 'bg-brand text-white' : 'hover:bg-panel2';
  const muted = on ? 'text-white/80' : 'text-sub';
  const dot = on ? 'bg-white' : 'bg-brandtext';

  return (
    <Link
      href={`${blogHome[locale]}${item.slug}/`}
      aria-current={on ? 'page' : undefined}
      className={`grid grid-cols-[10px_minmax(0,1fr)] gap-x-2.5 border-b border-line px-4 py-3 ${look}`}
    >
      <span className={`mt-1.5 size-2 rounded-full ${dot} ${unread ? 'visible' : 'invisible'}`} aria-hidden="true" />

      <span className="grid min-w-0 gap-1">
        <span className="flex items-baseline gap-2">
          <strong className="flex-1 text-[14px] font-semibold leading-snug">{item.title}</strong>

          <time dateTime={item.date} className={`shrink-0 text-[12px] tabular-nums ${muted}`}>
            {shortDate(item.date, locale)}
          </time>
        </span>

        <span className={`line-clamp-2 text-[13px] leading-snug ${muted}`}>{item.description}</span>

        {item.tags.length > 0 && (
          <span className={`font-mono text-[11px] ${on ? 'text-white/80' : 'text-brandtext'}`}>
            #{item.tags.slice(0, 2).join(' #')}
          </span>
        )}
      </span>
    </Link>
  );
}
