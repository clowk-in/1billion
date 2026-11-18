// Renders the share images (Open Graph and X) into public/og/<name>.png, one
// for each language, with the brand fonts. Run it when the tagline or the
// free offer changes, commit the PNG files, and bump `v` in lib/seo.tsx so
// the networks fetch the new image.
//
//   node scripts/og.mjs
//
// It needs a Chromium browser: Brave or Chrome on macOS, or set OG_BROWSER.

import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'public/og');

// The brand files, inlined, so the page needs no server.
const inline = file => `data:image/svg+xml;base64,${readFileSync(join(root, 'public/brand', file)).toString('base64')}`;

const logo = inline('logo-white.svg');
const bila = inline('bila-mascot.svg');

const browsers = [
  process.env.OG_BROWSER,
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

const images = [
  {
    name: 'home-en',
    lang: 'en',
    titleA: 'The mail your users wait for.',
    titleB: 'In the inbox.',
    offer: 'Free forever · 100,000 credits every day',
    url: '1billion.clowk.in',
  },
  {
    name: 'home-pt-br',
    lang: 'pt-BR',
    titleA: 'O e-mail que seu usuário espera.',
    titleB: 'Na caixa de entrada.',
    offer: 'Grátis para sempre · 100 mil créditos todo dia',
    url: '1billion.clowk.in/pt-br',
  },
];

function html(image) {
  return `<!doctype html>
<html lang="${image.lang}">
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  body { margin: 0; width: 1200px; height: 630px; background: #0c0a14; font-family: Archivo, sans-serif; }
  .card {
    box-sizing: border-box; position: absolute; inset: 24px; border-radius: 36px; padding: 64px 72px;
    display: flex; flex-direction: column; overflow: hidden; color: #fff;
    background: radial-gradient(ellipse at 80% 15%, rgba(185,162,255,0.32), transparent 55%),
      linear-gradient(135deg, #2a1268 0%, #4320ad 45%, #6a35e6 100%);
  }
  .logo { height: 54px; width: auto; align-self: flex-start; }
  .bila { position: absolute; right: 40px; top: 24px; width: 380px; filter: drop-shadow(0 24px 36px rgba(12,4,40,0.45)); }
  .light { position: absolute; right: 10px; top: 0; width: 460px; height: 380px; background: radial-gradient(circle, rgba(241,236,254,0.45), transparent 65%); }
  h1 { margin: auto 0 0; font-weight: 800; font-size: 70px; line-height: 1.04; letter-spacing: -0.035em; max-width: 720px; }
  h1 span { display: block; color: #cdbfff; }
  .foot { margin-top: 36px; display: flex; align-items: center; justify-content: space-between; }
  .offer { padding: 12px 22px; border-radius: 999px; background: rgba(255,255,255,0.14); border: 2px solid rgba(255,255,255,0.28); font-size: 26px; font-weight: 700; }
  .url { font-family: 'JetBrains Mono', monospace; font-size: 24px; color: rgba(255,255,255,0.78); }
</style>
</head>
<body>
  <div class="card">
    <img class="logo" src="${logo}">
    <div class="light"></div>
    <img class="bila" src="${bila}">
    <h1>${image.titleA}<span>${image.titleB}</span></h1>
    <div class="foot">
      <span class="offer">${image.offer}</span>
      <span class="url">${image.url}</span>
    </div>
  </div>
</body>
</html>`;
}

const browser = browsers.find(path => {
  try {
    execFileSync(path, ['--version'], { stdio: 'ignore' });

    return true;
  } catch {
    return false;
  }
});

if (!browser) throw new Error('No Chromium browser found: set OG_BROWSER');

mkdirSync(out, { recursive: true });

const work = mkdtempSync(join(tmpdir(), 'og-'));

for (const image of images) {
  const page = join(work, `${image.name}.html`);

  writeFileSync(page, html(image));

  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1200,630',
    '--virtual-time-budget=5000',
    `--screenshot=${join(out, `${image.name}.png`)}`,
    `file://${page}`,
  ], { stdio: 'ignore' });
}

console.warn(`og: ${images.length} images in public/og`);
