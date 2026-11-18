import assert from 'node:assert/strict';
import { test } from 'node:test';

import { forward } from './forward.ts';

test('the old API paths go to the API host, by proxy, with any method', () => {
  assert.deepEqual(forward('/send', 'POST'), { action: 'proxy', origin: 'https://api.1billion.clowk.in' });
  assert.deepEqual(forward('/messages/9f2c', 'GET'), { action: 'proxy', origin: 'https://api.1billion.clowk.in' });
  assert.deepEqual(forward('/suppressions/jane%40example.com', 'DELETE'), { action: 'proxy', origin: 'https://api.1billion.clowk.in' });
  assert.deepEqual(forward('/validate', 'POST'), { action: 'proxy', origin: 'https://api.1billion.clowk.in' });
  assert.deepEqual(forward('/openapi.yml', 'GET'), { action: 'proxy', origin: 'https://api.1billion.clowk.in' });
});

test('the unsubscribe links and the webhooks go to the console, by proxy', () => {
  assert.deepEqual(forward('/unsubscribe/abc', 'GET'), { action: 'proxy', origin: 'https://app.1billion.clowk.in' });
  assert.deepEqual(forward('/unsubscribe/abc', 'POST'), { action: 'proxy', origin: 'https://app.1billion.clowk.in' });
  assert.deepEqual(forward('/webhooks/pay', 'POST'), { action: 'proxy', origin: 'https://app.1billion.clowk.in' });
});

test('a page of the console is moved to the console host, and a form is proxied', () => {
  assert.deepEqual(forward('/emails', 'GET'), { action: 'redirect', origin: 'https://app.1billion.clowk.in' });
  assert.deepEqual(forward('/domains/abc', 'GET'), { action: 'redirect', origin: 'https://app.1billion.clowk.in' });
  assert.deepEqual(forward('/login', 'HEAD'), { action: 'redirect', origin: 'https://app.1billion.clowk.in' });
  assert.deepEqual(forward('/apps', 'POST'), { action: 'proxy', origin: 'https://app.1billion.clowk.in' });
});

test('the pages of the website stay on the website', () => {
  for (const path of ['/', '/pt-br/', '/docs/api/send/', '/blog/free-forever/', '/terms/', '/brand/logo-white.svg']) {
    assert.equal(forward(path, 'GET'), undefined);
  }
});

test('a path that only starts like a console path is not taken', () => {
  assert.equal(forward('/emailsx', 'GET'), undefined);
  assert.equal(forward('/sender', 'POST'), undefined);
});

test('wrangler.toml runs the Worker on each old path', async () => {
  const { readFileSync } = await import('node:fs');
  const { consolePaths } = await import('./forward.ts');

  const toml = readFileSync(new URL('../wrangler.toml', import.meta.url), 'utf8');
  const list = toml.slice(toml.indexOf('run_worker_first'), toml.indexOf(']', toml.indexOf('run_worker_first')));

  for (const path of ['/send', '/messages', '/validate', '/suppressions', '/unsubscribe', '/unsubscribes', '/webhooks', ...consolePaths]) {
    assert.ok(list.includes(`"${path}"`) && list.includes(`"${path}/*"`), `run_worker_first misses ${path}`);
  }

  assert.ok(list.includes('"/openapi.yml"'), 'run_worker_first misses /openapi.yml');
});
