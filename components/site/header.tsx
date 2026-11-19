'use client';

import Link from 'next/link';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import { Logo } from '@/components/brand/logo';
import { LanguageSwitch } from '@/components/site/language-switch';
import { SocialIcon } from '@/components/site/social-icon';
import { blogHome, copy, home, type Locale } from '@/lib/i18n';
import { site } from '@/lib/site';

function navLinks(locale: Locale) {
  const t = copy[locale].nav;

  return [
    { href: '/docs', label: t.docs },
    { href: '/docs/api', label: t.api },
    { href: '/docs/sdks', label: t.sdks },
    { href: `${home[locale]}#pricing`, label: t.pricing },
    { href: blogHome[locale], label: copy[locale].blog.nav },
  ];
}

// At the top the bar sits on the page with no frame. Once the reader scrolls,
// it becomes a floating pill, as on solidjs.com. It hides when the reader
// scrolls down and shows again on the way up.
// On a phone, the menu button opens a full screen menu and locks the page
// scroll behind it.
type Props = {
  locale?: Locale;
  // The same page in the other language, for the language switch.
  alternate?: string;
  // The blog: a bar of the full width on top of the inbox, which never hides,
  // because the page itself does not scroll.
  wide?: boolean;
  // More buttons before the language switch (the search of the blog).
  actions?: ReactNode;
};

export function Header({ locale = 'en', alternate, wide, actions }: Props) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

  const t = copy[locale].nav;
  const links = navLinks(locale);
  const switchTo = alternate ?? home[locale === 'en' ? 'pt-br' : 'en'];

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;

      setHidden(y > lastScrollY.current && y > 80);
      setScrolled(y > 24);

      lastScrollY.current = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // The pill keeps a gap to the edges of the screen, and the safe area of iOS
  // sits above that gap.
  const floatingBar = [
    'fixed inset-x-0 top-0 z-40 px-3 pt-[calc(env(safe-area-inset-top)+12px)]',
    'transition-transform duration-300',
    hidden && !open ? '-translate-y-[calc(100%+12px)]' : 'translate-y-0',
  ].join(' ');

  const wideBar = 'relative z-40 shrink-0 border-b border-line bg-bg pt-[env(safe-area-inset-top)]';

  const frame = scrolled || open
    ? 'border-line bg-bg/80 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur'
    : 'border-transparent bg-transparent';

  const floatingPill = `mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border px-4 transition-colors duration-300 md:px-5 ${frame}`;
  const widePill = 'flex h-16 items-center justify-between gap-3 px-4 md:px-6';

  const barClass = wide ? wideBar : floatingBar;
  const pillClass = wide ? widePill : floatingPill;

  // The menu is a sibling of the header, not a child: the blur and the slide
  // of the header make it the box of any fixed child, and the menu must cover
  // the whole screen.
  return (
    <>
      <header className={barClass}>
        <div className={pillClass}>
          <div className="flex items-center gap-6">
            <Link href={home[locale]} aria-label={t.home} className="rounded-md">
              {wide ? (
                <>
                  <span className="blog-logo-dark">
                    <Logo height={26} />
                  </span>

                  <img src="/brand/logo-black.svg" alt="1billion" width={114} height={26} className="blog-logo-light h-[26px] w-auto" />
                </>
              ) : (
                <Logo height={26} />
              )}
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
              {links.map(link => (
                <a key={link.href} href={link.href} className="rounded-md px-3 py-2 text-[14px] text-sub hover:bg-panel2 hover:text-ink">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            {actions}

            <MenuButton open={open} label={open ? t.closeMenu : t.openMenu} onToggle={() => setOpen(value => !value)} />
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {actions}

            <LanguageSwitch locale={locale} href={switchTo} compact />

            {site.social.map(network => (
              <a
                key={network.name}
                href={network.url}
                aria-label={`1billion on ${network.name}`}
                className="flex size-10 items-center justify-center rounded-md text-sub hover:bg-panel2 hover:text-ink"
              >
                <SocialIcon name={network.icon} />
              </a>
            ))}

            <a href={site.app} className="btn-buy ml-2 rounded-lg px-4 py-2 text-[14px] font-semibold">
              {t.signIn}
            </a>
          </div>
        </div>
      </header>

      {open && <MobileMenu locale={locale} switchTo={switchTo} links={links} signIn={t.signIn} onClose={() => setOpen(false)} />}
    </>
  );
}

function MenuButton({ open, label, onToggle }: { open: boolean; label: string; onToggle: () => void }) {
  const bar = 'absolute left-0 h-0.5 w-5 rounded-full bg-ink transition-all duration-200';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={label}
      className="relative -mr-2 flex size-10 items-center justify-center rounded-md md:hidden"
    >
      <span className="relative block h-3.5 w-5">
        <span className={`${bar} ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />

        <span className={`${bar} top-1.5 ${open ? 'opacity-0' : 'opacity-100'}`} />

        <span className={`${bar} ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
      </span>
    </button>
  );
}

type MenuProps = {
  locale: Locale;
  switchTo: string;
  links: { href: string; label: string }[];
  signIn: string;
  onClose: () => void;
};

function MobileMenu({ locale, switchTo, links, signIn, onClose }: MenuProps) {
  return (
    <nav
      id="mobile-menu"
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 top-[calc(4.75rem+env(safe-area-inset-top))] z-40 flex flex-col gap-1 bg-bg px-4 py-6 md:hidden"
    >
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="rounded-md px-3 py-3 font-display text-[22px] font-medium text-ink hover:bg-panel2"
        >
          {link.label}
        </a>
      ))}

      <div className="mt-2 flex items-center gap-1 px-1">
        <LanguageSwitch locale={locale} href={switchTo} compact />

        {site.social.map(network => (
          <a
            key={network.name}
            href={network.url}
            aria-label={`1billion on ${network.name}`}
            className="flex size-11 items-center justify-center rounded-md text-sub hover:bg-panel2 hover:text-ink"
          >
            <SocialIcon name={network.icon} />
          </a>
        ))}
      </div>

      <a href={site.app} onClick={onClose} className="btn-buy mt-4 rounded-lg px-4 py-3 text-center text-[16px] font-semibold">
        {signIn}
      </a>
    </nav>
  );
}
