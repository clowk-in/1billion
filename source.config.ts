import { defineCollections, defineConfig, defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
});

// The blog: content/blog/<locale>/<slug>.mdx. A post in both languages has
// the same slug in each folder, so the two pages link to each other.
export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    // Quote it in the frontmatter (date: '2026-11-18'): YAML reads a bare
    // date as a Date object, not as text. A time orders two posts of one day
    // (date: '2026-11-18T18:00:00Z').
    date: z.union([z.iso.date(), z.iso.datetime()]),
    author: z.string(),
    // The image of the post in the blog index, a file in public/.
    cover: z.string().optional(),
  }),
});

export default defineConfig();
