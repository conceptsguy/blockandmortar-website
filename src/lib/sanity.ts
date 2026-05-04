import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset   = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';

const studioUrl = import.meta.env.PUBLIC_SANITY_STUDIO_URL
  ?? (import.meta.env.DEV ? 'http://localhost:3333' : 'https://blockandmortar.sanity.studio');

const stub = { fetch: async () => null } as unknown as ReturnType<typeof createClient>;

// Published client — used for normal page requests
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
      perspective: 'published',
    })
  : stub;

// Preview client — used when draft mode cookie is set; stega encodes field paths into text
// so the Sanity Studio can map DOM elements back to their source fields
export const previewClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false,
      perspective: 'published',
      stega: {
        enabled: true,
        studioUrl,
      },
    })
  : stub;

export function getClient(isDraftMode: boolean) {
  return isDraftMode ? previewClient : sanityClient;
}
