'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

import { copy, type Locale } from '@/lib/i18n';

// The theme of the blog: the OS setting, until the reader picks one here.
// The pick goes to html[data-blog-theme] and to localStorage; the script in
// components/blog/blog-layout.tsx sets it again before the next first paint.

const key = '1billion:blog:theme';
const query = '(prefers-color-scheme: light)';
const changed = 'blog-theme';

type Theme = 'light' | 'dark';

function current(): Theme {
  const picked = document.documentElement.dataset.blogTheme;

  if (picked === 'light' || picked === 'dark') return picked;

  return window.matchMedia(query).matches ? 'light' : 'dark';
}

function subscribe(listener: () => void) {
  const media = window.matchMedia(query);

  media.addEventListener('change', listener);
  window.addEventListener(changed, listener);

  return () => {
    media.removeEventListener('change', listener);
    window.removeEventListener(changed, listener);
  };
}

function pick(theme: Theme) {
  document.documentElement.dataset.blogTheme = theme;

  try {
    localStorage.setItem(key, theme);
  } catch {
    // Blocked storage: the pick lives until the page closes.
  }

  window.dispatchEvent(new Event(changed));
}

export function ThemeSwitch({ locale }: { locale: Locale }) {
  const theme = useSyncExternalStore(subscribe, current, () => 'dark' as Theme);

  const t = copy[locale].blog.inbox;
  const next: Theme = theme === 'dark' ? 'light' : 'dark';
  const label = next === 'light' ? t.toLight : t.toDark;

  return (
    <button
      type="button"
      onClick={() => pick(next)}
      aria-label={label}
      title={label}
      className="flex size-10 items-center justify-center rounded-md text-sub hover:bg-panel2 hover:text-ink"
    >
      {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}
