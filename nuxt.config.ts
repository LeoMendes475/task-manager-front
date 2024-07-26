import { defineNuxtConfig } from 'nuxt/config';
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
  ],
  css: [
    '~/src/assets/css/main.css',
    '@primevue/themes/aura/toast',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: '2024-07-22',
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0' },
      ],
    },
  },
  plugins: [
    '~/src/plugins/primevue.js',
    '~/src/plugins/axios.js',
  ],
  primevue: {
    options: {
      ripple: true,
      unstyled: false,
      theme: {
        preset: Aura,
      }
    },
    components: {
      prefix: 'Prime',
      include: '*',
    },
  }
});
