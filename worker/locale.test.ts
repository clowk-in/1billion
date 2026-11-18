import assert from 'node:assert/strict';
import { test } from 'node:test';

import { pickLocale } from './locale.ts';

test('a choice in the cookie wins over the country', () => {
  assert.equal(pickLocale({ country: 'BR', cookie: 'lang=en' }), 'en');
  assert.equal(pickLocale({ country: 'US', cookie: 'theme=dark; lang=pt-br' }), 'pt-br');
});

test('a Portuguese-speaking country gets Portuguese', () => {
  for (const country of ['BR', 'PT', 'AO', 'MZ']) {
    assert.equal(pickLocale({ country }), 'pt-br');
  }
});

test('another country gets English', () => {
  assert.equal(pickLocale({ country: 'US' }), 'en');
  assert.equal(pickLocale({ country: 'DE', acceptLanguage: 'de-DE,de;q=0.9' }), 'en');
});

test('with no country, the first language of the browser decides', () => {
  assert.equal(pickLocale({ acceptLanguage: 'pt-BR,pt;q=0.9,en;q=0.8' }), 'pt-br');
  assert.equal(pickLocale({ acceptLanguage: 'en-US,en;q=0.9,pt;q=0.5' }), 'en');
  assert.equal(pickLocale({}), 'en');
});

test('a bad cookie value is ignored', () => {
  assert.equal(pickLocale({ country: 'BR', cookie: 'lang=fr' }), 'pt-br');
});
