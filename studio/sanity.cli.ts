import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'brri6o86',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
});
