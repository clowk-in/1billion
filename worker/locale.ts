// Which language a reader of / gets. The cookie `lang`, set by the language
// switch of the site, wins. Then the country of the request (Cloudflare gives
// it in request.cf.country). With no country, the first language of the
// browser decides.

export type Locale = 'en' | 'pt-br';

// The countries where Portuguese is an official language.
const portuguese = new Set(['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL', 'GQ']);

type Input = {
  country?: string;
  cookie?: string | null;
  acceptLanguage?: string | null;
};

function fromCookie(cookie: string): Locale | undefined {
  const match = cookie.match(/(?:^|;\s*)lang=([^;]+)/);
  const value = match?.[1];

  if (value === 'en' || value === 'pt-br') return value;

  return undefined;
}

export function pickLocale({ country, cookie, acceptLanguage }: Input): Locale {
  const chosen = cookie ? fromCookie(cookie) : undefined;

  if (chosen) return chosen;

  if (country) return portuguese.has(country.toUpperCase()) ? 'pt-br' : 'en';

  const first = acceptLanguage?.split(',')[0]?.trim().toLowerCase() ?? '';

  return first.startsWith('pt') ? 'pt-br' : 'en';
}
