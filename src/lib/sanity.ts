import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset   = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';

/**
 * Shared Sanity client — used ONLY in Astro frontmatter at build time.
 * Do NOT import this into React client:only components (they run in the browser
 * and would expose credentials and defeat the static-build model).
 *
 * When PUBLIC_SANITY_PROJECT_ID is not set (local dev before a Sanity project
 * is created) all fetch() calls return null / [] via the null-client below.
 */
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
      perspective: 'published',
    })
  : /** Stub that returns null for every fetch so pages use fallback data */ {
      fetch: async () => null,
    } as unknown as ReturnType<typeof createClient>;
