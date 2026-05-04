import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://blockandmortar.ai',
  integrations: [
    react(),
    sitemap(),
  ],
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  vite: {
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client'],
    },
  },
});
