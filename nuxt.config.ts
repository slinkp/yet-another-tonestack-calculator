export default defineNuxtConfig({
  srcDir: 'src/',

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontaine'
  ],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    buildAssetsDir: '/_/',
  },

  compatibilityDate: '2026-04-01'
})