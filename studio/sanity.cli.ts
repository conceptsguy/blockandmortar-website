import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    // Replace with your actual project ID from sanity.io/manage
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'REPLACE_ME',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
});
