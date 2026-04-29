import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from '@sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? 'brri6o86';
const dataset   = process.env.SANITY_STUDIO_DATASET   ?? 'production';
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_URL ?? 'https://blockandmortar.ai';

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
      },
    }),

    visionTool(), // GROQ query explorer — useful for debugging
  ],

  schema: {
    types: schemaTypes,
  },
});
