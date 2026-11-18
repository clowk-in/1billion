# 1billion website — guide for AI agents

The public website of 1billion: the landing page, the docs and the blog, at https://1billion.clowk.in. It is
the public face of the product (SEO and marketing). The service itself (the MTA and the console) is in a
private repository and is never named by its internals here.

## Stack

- Next.js with `output: 'export'`: a static site in `out/`.
- Fumadocs MDX: the docs in `content/docs/`, the blog in `content/blog/<locale>/<slug>.mdx`.
- A Cloudflare Worker (`worker/`) serves the files and sends a first visit to `/` from a Portuguese-speaking
  country to `/pt-br/`. The cookie `lang` of the language switch wins.
- English at `/`, Brazilian Portuguese at `/pt-br/`. The copy of the landing page is in `lib/i18n.ts`.

## Run and test

```bash
pnpm dev
pnpm lint && pnpm typecheck && pnpm test && pnpm build
node scripts/og.mjs   # the share images, after a change of the tagline or the offer; then bump v in lib/seo.tsx
```

## Rules

- **True facts only:** limits, prices and statuses come from the API docs of 1billion. Never invent numbers.
- **Both languages** for the landing page and the blog.
- **Pnpm only.** ESLint flat config with the blank-line rules; no comments inside JSX.
- **Validate the UI** with a headless screenshot (1440 and 360) before you finish a visual change.
- **The brand:** the files in `public/brand/` come from `brand/` of the 1billion repo. Bila appears once per page.
- **Deploy:** a `v*` tag deploys (`.github/workflows/deploy.yml`). The route on `1billion.clowk.in` is off until
  the cutover (see `wrangler.toml`).
- **Git:** Conventional Commits. Commit only when the maintainer asks. Never credit Claude in a commit or a PR.
