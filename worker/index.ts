import { forward } from './forward.ts';
import { pickLocale } from './locale.ts';

// The Worker in front of the static site. wrangler.toml runs it first only for
// / and for the old paths of the console (worker/forward.ts), so every other
// path goes straight to the files in out/. An old path goes to the console or
// the API host. A reader of / who should get Portuguese is sent to /pt-br/;
// everyone else gets / in English.

type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
};

type CloudflareRequest = Request & { cf?: { country?: string } };

const worker = {
  async fetch(request: CloudflareRequest, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const target = forward(url.pathname, request.method);

    if (target) {
      const to = new URL(`${url.pathname}${url.search}`, target.origin);

      if (target.action === 'redirect') return Response.redirect(to.toString(), 301);

      return fetch(new Request(to.toString(), request));
    }

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
