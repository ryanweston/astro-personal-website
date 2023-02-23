import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  // build draft pages
  mardown: { 
    drafts: true
  },
  integrations: [tailwind(), mdx({ 
    drafts: true,
  })],
  output: "server",
  adapter: vercel()
});