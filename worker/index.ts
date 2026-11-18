import { pickLocale } from './locale.ts';

// The Worker in front of the static site. wrangler.toml runs it first only
// for /, so every other path goes straight to the files in out/. A reader who
// should get Portuguese is sent to /pt-br/; everyone else gets / in English.

type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
};

type CloudflareRequest = Request & { cf?: { country?: string } };

const worker = {
  async fetch(request: CloudflareRequest, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const locale = pickLocale({
      country: request.cf?.country,
      cookie: request.headers.get('cookie'),
      acceptLanguage: request.headers.get('accept-language'),
    });

    if (url.pathname === '/' && locale === 'pt-br') {
      url.pathname = '/pt-br/';

      return new Response(null, {
        status: 302,
        headers: { location: url.toString(), vary: 'cookie, accept-language' },
      });
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
