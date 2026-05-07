// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ilshatsharapov69-afk.github.io',
  base: '/tattech-website',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    assets: 'assets',
  },
  integrations: [sitemap()],
});
