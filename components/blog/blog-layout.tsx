import type { ReactNode } from 'react';

import { Inbox } from '@/components/blog/inbox';
import { inbox, posts } from '@/lib/blog';
import type { Locale } from '@/lib/i18n';

// The theme that the reader chose with the switch, set before the first
// paint, so a light reader does not see the dark page flash.
const themeScript = "try{var t=localStorage.getItem('1billion:blog:theme');if(t)document.documentElement.dataset.blogTheme=t}catch(e){}";

// The shell of every page of the blog in one language. It stays mounted
// while the reader moves between posts.
export function BlogLayout({ locale, children }: { locale: Locale; children: ReactNode }) {
  const other: Locale = locale === 'en' ? 'pt-br' : 'en';

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />

      <Inbox locale={locale} items={inbox(locale)} otherSlugs={posts(other).map(entry => entry.slug)}>
      {children}
    </Inbox>
    </>
  );
}
