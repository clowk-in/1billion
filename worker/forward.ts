// Where an old path of 1billion.clowk.in goes, once the website takes that host.
// Before, the console, the API, the unsubscribe links and the webhooks all
// answered on it, and SDKs, mail already sent and other services still name it.
//
// - The API is proxied to the API host: an SDK can not follow a redirect of a
//   POST (Ruby's Net::HTTP does not follow one at all).
// - The unsubscribe links and the webhooks are proxied to the console host.
// - A page of the console gets a 301 to the console host; any other method is
//   proxied, so a form keeps its body.
// - Every other path is the website.

const API = 'https://api.1billion.clowk.in';
const APP = 'https://app.1billion.clowk.in';

const apiPaths = ['/send', '/messages', '/validate', '/suppressions', '/openapi.yml'];
const appPaths = ['/unsubscribe', '/unsubscribes', '/webhooks'];

// The pages of the console (bin/rails routes of apps/web). /docs is not here:
// on this host it is the docs of the website.
export const consolePaths = [
  '/account',
  '/apps',
  '/clowk',
  '/connect',
  '/credits',
  '/domains',
  '/emails',
  '/invites',
  '/login',
  '/members',
  '/oauth',
  '/settings',
  '/sign_in',
  '/sign_out',
  '/sign_up',
  '/start',
  '/usage',
  '/validation',
  '/workspaces',
];

export type Forward = { action: 'proxy' | 'redirect'; origin: string };

// A path matches a prefix when it is the prefix, or the prefix and a slash.
function under(path: string, prefixes: string[]) {
  return prefixes.some(prefix => path === prefix || path.startsWith(`${prefix}/`));
}

export function forward(path: string, method: string): Forward | undefined {
  if (under(path, apiPaths)) return { action: 'proxy', origin: API };

  if (under(path, appPaths)) return { action: 'proxy', origin: APP };

  if (!under(path, consolePaths)) return undefined;

  const read = method === 'GET' || method === 'HEAD';

  return { action: read ? 'redirect' : 'proxy', origin: APP };
}
