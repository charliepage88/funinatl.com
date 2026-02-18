import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: { Figtree: [400, 500, 600, 700] },
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      apiBase: 'https://api.funinatl.com/api',
      recaptchaSiteKey: '',
    },
  },

  app: {
    head: {
      title: 'FunInATL – Things to Do in Atlanta',
      meta: [
        { name: 'description', content: 'Find fun things to do in Atlanta, GA – events, concerts, festivals, family activities and more.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
})
