'use client';

import { useMemo, useSyncExternalStore } from 'react';

// The posts that this reader opened, by slug, in localStorage. A slug is the
// same in both languages, so a post read in one is read in the other.
// Nothing leaves the browser. A private window or blocked storage reads as
// "nothing read yet" and never breaks the page.

const key = '1billion:blog:read';

const listeners = new Set<() => void>();

let cache: string | null = null;

function read(): string {
  try {
    return localStorage.getItem(key) ?? '[]';
  } catch {
    return '[]';
  }
}

function snapshot() {
  cache ??= read();

  return cache;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  function onStorage(event: StorageEvent) {
    if (event.key !== key) return;

    cache = null;
    listener();
  }

  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function parse(value: string | null): Set<string> | null {
  if (value === null) return null;

  try {
    return new Set(JSON.parse(value) as string[]);
  } catch {
    return new Set();
  }
}

// null before the page runs in the browser: the server does not know what
// this reader read, so the inbox shows no unread mark until then.
export function useReadPosts(): Set<string> | null {
  const value = useSyncExternalStore(subscribe, snapshot, () => null);

  return useMemo(() => parse(value), [value]);
}

export function markRead(slug: string) {
  const done = parse(snapshot()) ?? new Set<string>();

  if (done.has(slug)) return;

  done.add(slug);
  cache = JSON.stringify([...done]);

  try {
    localStorage.setItem(key, cache);
  } catch {
    // Blocked storage: the mark lives until the page closes.
  }

  listeners.forEach(listener => listener());
}
