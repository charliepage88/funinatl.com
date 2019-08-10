import pkg from './package'
import axios from 'axios'
require('dotenv').config()

export default {
  // SSR app
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#3B8070'
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/sass/app.sass'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/image-loader.js',
    '~plugins/filters.js',
    '~plugins/axios.js',
    '~plugins/mq.js',
    { src: '~plugins/toast.js', ssr: false },
    '~plugins/scroll-to.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    [ '@nuxtjs/pwa', {
      icon: false
    }],
    '@nuxtjs/apollo',
    [ 'nuxt-buefy', { 
      css: true,
      materialDesignIcons: false
    }],
    [
      'nuxt-mq',
      {
        // Default breakpoint for SSR
        defaultBreakpoint: 'default',
        breakpoints: {
          sm: 450,
          md: 1250,
          lg: Infinity
        }
      }
    ],
    '@nuxtjs/sitemap',
    '@nuxtjs/dotenv',
    '@nuxtjs/recaptcha',
    'vue-scrollto/nuxt'
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.API_ENDPOINT
  },

  // Apollo Server Setup
  apollo: {
    // tokenName: 'yourApolloTokenName', // optional, default: apollo-token
    // tokenExpires: 10, // optional, default: 7 (days)
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    // authenticationType: 'Basic', // optional, default: 'Bearer'
    // (Optional) Default 'apollo' definition
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    clientConfigs: {
      default: {
        // required
        httpEndpoint: process.env.GRAPHQL_ENDPOINT,
        // optional
        // See https://www.apollographql.com/docs/link/links/http.html#options
        // httpLinkOptions: {
        //   credentials: 'include'
        // },
        // headers: {
        //   'Authorization: Bearer': 'TzDnhXuLrKMVTFqMLJTy5rDo1lvYSX3OF3Zau3e0'
        // },
        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        // wsEndpoint: 'ws://localhost:4000', // optional
        wsEndpoint: null,
        // LocalStorage token
        // tokenName: 'funinatl', // optional
        // Enable Automatic Query persisting with Apollo Engine
        // persisting: true, // Optional
        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        // websocketsOnly: false // Optional
      }
    }
  },

  // Nuxt PWA -> Workbox
  workbox: {
    runtimeCaching: [
      {
        // Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
        urlPattern: `${process.env.CDN_ENDPOINT}/.*`,
        // Defaults to `networkFirst` if omitted
        handler: 'cacheFirst',
        // Defaults to `GET` if omitted
        method: 'GET'
      }
    ],
    cachingExtensions: '@/plugins/workbox-range-request.js'
  },

  // Nuxt PWA -> Meta
  meta: {
    name: 'FunInATL',
    author: 'Charlie Page',
    description: pkg.description,
    mobileAppIOS: true,
    ogHost: process.env.PUBLIC_HOST
  },

  // Nuxt PWA -> Manifest
  manifest: {
    name: 'FunInATL',
    lang: 'en'
  },

  // Generate
  generate: {
    concurrency: 10,
    interval: 0,
    async routes () {
      return await axios.get(`${process.env.API_ENDPOINT}/api/routes`)
        .then((res) => res.data.routes)
    }
  },

  // Sitemap
  sitemap: {
    hostname: process.env.PUBLIC_URL,
    gzip: true,
    async routes () {
      return await axios.get(`${process.env.API_ENDPOINT}/api/routes`)
        .then(res => res.data.routes.map(row => row.route))
    }
  },

  // Recaptcha
  recaptcha: {
    hideBadge: true,
    siteKey: '6LdWwasUAAAAALZcr7N9x7zNt8mkXzxA3L0LWp5n',
    version: 3
  }
}
