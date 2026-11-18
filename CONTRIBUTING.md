# Contributing to the 1billion website

Thank you for your help. Fixes to the docs, broken links and typos are welcome.

## Before you start

- The SDKs have repositories of their own: [Ruby](https://github.com/clowk-in/1billion-ruby), [JavaScript](https://github.com/clowk-in/1billion-js) and [Go](https://github.com/clowk-in/1billion-go).
- For a large change, open an issue first.
- Security problems: see [SECURITY.md](SECURITY.md).

## Set up

You need Node.js 24 and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

## Rules

- **True facts only.** Each limit, price and status on the site comes from the API. Do not invent numbers.
- **Two languages.** The landing page and the blog are in English and in Brazilian Portuguese. The copy of the landing page is in `lib/i18n.ts`; a blog post is `content/blog/<en|pt-br>/<slug>.mdx`, with the same slug in both folders. The docs are in English.
- **Simple words.** Short sentences, one idea each (ASD-STE100 style), as the existing pages.
- **The brand.** The logo and Bila come from the `brand/` folder of 1billion. Do not redraw them, and do not type the name in a font as a logo.
- **Commits.** [Conventional Commits](https://www.conventionalcommits.org): `docs: ...`, `feat: ...`, `fix: ...`.

## License

The text and the images of this site belong to Clowk. By contributing, you agree that Clowk can publish your change on the site.
