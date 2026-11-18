<p align="center">
  <a href="https://1billion.clowk.in">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/brand/logo-white.svg">
      <img src="public/brand/logo-color.svg" alt="1billion" height="64">
    </picture>
  </a>
</p>
<p align="center">
  <b>Transactional e-mail on its own sending servers.</b><br>
  Free forever: 100,000 credits every day.
</p>

<p align="center">
  <a href="https://1billion.clowk.in"><b>Website</b></a> ·
  <a href="https://app.1billion.clowk.in"><b>Console</b></a> ·
  <a href="https://1billion.clowk.in/docs"><b>Docs</b></a> ·
  <a href="https://1billion.clowk.in/blog"><b>Blog</b></a>
</p>

This repository holds the website of 1billion: the landing page, the docs and the blog, in English and in
Brazilian Portuguese. The service itself is not here.

## SDKs

| Repository | Install |
|---|---|
| [clowk-in/1billion-ruby](https://github.com/clowk-in/1billion-ruby) | `bundle add 1billion` |
| [clowk-in/1billion-js](https://github.com/clowk-in/1billion-js) | `pnpm add @clowk/1billion` |
| [clowk-in/1billion-go](https://github.com/clowk-in/1billion-go) | `go get github.com/clowk-in/1billion-go` |

## Run the site

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Next.js with `output: 'export'`, the docs and the blog in MDX (Fumadocs), and a Cloudflare Worker that serves
the static files and picks the language of `/` by country (`worker/`). A `v*` tag deploys (`.github/workflows/deploy.yml`).

- A docs page: `content/docs/`. A blog post: `content/blog/<en|pt-br>/<slug>.mdx`.
- The share images: `node scripts/og.mjs`.
- The brand files come from `brand/` of the 1billion repo.
