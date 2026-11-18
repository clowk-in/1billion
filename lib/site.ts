import type { SocialName } from '@/components/site/social-icon';

// One place for the names and links that the landing page, the docs, and the
// metadata share.
export const site = {
  name: '1billion',
  url: 'https://1billion.clowk.in',
  description:
    '1billion is transactional e-mail on its own sending servers. One API call sends a login code, a receipt or a reset link, and you follow each mail from accepted to delivered.',
  github: 'https://github.com/clowk-in/1billion',
  clowk: 'https://clowk.in',
  app: 'https://app.1billion.clowk.in',
  api: 'https://api.1billion.clowk.in',
  openapi: 'https://api.1billion.clowk.in/openapi.yml',
  // The networks in the header and the footer. Add one here (and its mark in
  // components/site/social-icon.tsx) when its profile exists.
  social: [{ name: 'GitHub', url: 'https://github.com/clowk-in/1billion', icon: 'github' }] as { name: string; url: string; icon: SocialName }[],
  sdks: {
    ruby: 'https://github.com/clowk-in/1billion-ruby',
    go: 'https://github.com/clowk-in/1billion-go',
    js: 'https://github.com/clowk-in/1billion-js',
  },
};
