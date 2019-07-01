import pkg from './package'

export default {
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

  meta: {
    name: 'FunInATL',
    author: 'Charlie Page',
    description: pkg.description,
    mobileAppIOS: true,
    ogHost: 'funinatl.com'
  },

  manifest: {
    name: 'FunInATL',
    lang: 'en'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/sass/app.sass'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/image-loader.js',
    '~plugins/filters.js',
    '~plugins/search.js',
    '~plugins/axios.js',
    { src: '~plugins/toast.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
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
    '@nuxtjs/recaptcha'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.API_ENDPOINT
  },

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
    // optional
    // errorHandler (error) {
      // console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    // },
    // required
    clientConfigs: {
      default: {
        // required  
        httpEndpoint: 'http://localhost:4000/graphql',
        // optional
        // See https://www.apollographql.com/docs/link/links/http.html#options
        // httpLinkOptions: {
          // credentials: 'same-origin'
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

  sitemap: {
    hostname: 'https://www.funinatl.com',
    gzip: true,
    routes: [
      '/'
    ]
  },

  recaptcha: {
    hideBadge: true,
    siteKey: '6LcFeaAUAAAAAEopR3oUfEQ2l6YevmqqD0pp8kUm',
    version: 3,
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: [
      'vue-instantsearch',
      'instantsearch.js/es'
    ],

    extend(config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'

      if (ctx.isDev && ctx.isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(vue)$/,
        //   loader: 'vue-loader',
        //   exclude: /(node_modules)/
        // })

        // config.module.rules.push({
        //   test: /\.(graphql|gql)$/,
        //   exclude: /node_modules/,
        //   loader: 'graphql-tag/loader'
        // })
      }
    }
  }
}