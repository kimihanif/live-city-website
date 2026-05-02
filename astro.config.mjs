import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    define: {
      'import.meta.env.PUBLIC_CITY': JSON.stringify(process.env.PUBLIC_CITY ?? 'chennai'),
    },
  },
});
