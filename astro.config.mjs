// @ts-check
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import preact from '@astrojs/preact'
import devFunctions from './netlify/dev-functions.mjs'

// @unoff/ui only exposes its barrel file in `exports`, which pulls the CSS of
// every component. An alias lets us import one component (and its CSS) at a time.
const unoffDist = fileURLToPath(
  new URL('./node_modules/@unoff/ui/dist', import.meta.url)
)

const unoffPackages = ['@unoff/ui', '@unoff/utils']

// The @unoff/ui <Button> imports <Icon>, which pulls the stylesheet of every
// icon as data URIs (~69 KB gzip). The site renders no @unoff/ui icon, so that
// stylesheet is replaced by an empty file. Remove this alias before using
// <Icon> or the `icon` prop of <Button>.
const unoffIconsStylesheet = {
  find: /^\.\.\/\.\.\/assets\/styles\/icons\/icons\.css$/,
  replacement: fileURLToPath(
    new URL('./src/styles/stubs/empty.css', import.meta.url)
  ),
}

export default defineConfig({
  site: 'https://ui-color-palette.com',
  // Keep the exact URLs of the Figma Sites version (/pricing, not /pricing/).
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  // compat: @unoff/ui is written for React; Preact renders it at build time.
  // devFunctions: Netlify functions (/api/*) on the dev server.
  integrations: [preact({ compat: true }), sitemap(), devFunctions()],
  vite: {
    // @unoff/ui imports its CSS from JS: let Vite bundle it during SSR.
    environments: {
      prerender: { resolve: { noExternal: unoffPackages } },
      ssr: { resolve: { noExternal: unoffPackages } },
    },
    resolve: {
      alias: [
        unoffIconsStylesheet,
        { find: '@unoff-dist', replacement: unoffDist },
        { find: '@unoff-assets', replacement: `${unoffDist}/assets` },
      ],
    },
  },
})
