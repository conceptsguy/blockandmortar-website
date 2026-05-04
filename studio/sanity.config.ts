import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool, defineDocuments } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'brri6o86';
const dataset   = process.env.SANITY_STUDIO_DATASET   ?? 'production';
// Preview URL: localhost in dev, Vercel site in production
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_URL
  ?? (process.env.NODE_ENV === 'production' ? 'https://blockandmortar-website.vercel.app' : 'http://localhost:4321');

// Shared secret that the frontend validates when enabling draft mode.
// In local dev the fallback 'dev-preview-secret' matches the frontend fallback,
// so no env var is needed. In production, set SANITY_STUDIO_PREVIEW_SECRET and
// SANITY_PREVIEW_SECRET (same value) in Vercel and Sanity deploy environments.
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET ?? 'dev-preview-secret';

export default defineConfig({
  name: 'block-and-mortar',
  title: 'Block & Mortar',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('teamMember').title('Team Members'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('legalPage').title('Legal Pages'),
            // Home Page is a singleton — always the same document ID
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('singleton-homePage'),
              ),
          ]),
    }),

    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: `/api/draft-mode/enable?secret=${encodeURIComponent(previewSecret)}`,
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          { route: '/',              filter: `_type == "homePage"` },
          { route: '/team',          filter: `_type == "teamMember"` },
          { route: '/accessibility', filter: `_type == "legalPage" && pageKey == "accessibility"` },
          { route: '/privacy',       filter: `_type == "legalPage" && pageKey == "privacy"` },
          { route: '/terms',         filter: `_type == "legalPage" && pageKey == "terms"` },
        ]),
      },
    }),

    visionTool(), // GROQ query explorer — useful for debugging
  ],

  schema: {
    types: schemaTypes,
  },
});
