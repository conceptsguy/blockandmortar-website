import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ---------------------------------------------------------------------------
// team — one YAML file per person, rendered on /team
// ---------------------------------------------------------------------------
const team = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/team' }),
  schema: z.object({
    /** Display name */
    name: z.string(),
    /** Job title shown on card */
    role: z.string(),
    /** Two-letter fallback when photo is unavailable */
    initials: z.string().max(2),
    /** Accent hex colour for card border / tint overlay */
    tint: z.string(),
    /** Absolute path to photo in /public, e.g. /assets/team-usman.jpg */
    photo: z.string(),
    /** 1–2 sentence bio */
    bio: z.string(),
    /** Controls display order on the page (ascending) */
    order: z.number().int().min(1),
  }),
});

// ---------------------------------------------------------------------------
// blog — MDX posts; empty for launch, ready for first article
// ---------------------------------------------------------------------------
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
    excerpt: z.string(),
    author: z.string().optional(),
    /** Keep true until ready to surface on the site */
    draft: z.boolean().default(true),
  }),
});

export const collections = { team, blog };
