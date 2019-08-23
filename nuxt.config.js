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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'dns-prefetch',
        href: '//fonts.gstatic.com'
      },
      {
        rel: 'stylesheet',
        href: '//fonts.googleapis.com/css?family=Nunito+Sans|Roboto|Helvetica+Neue'
      }
    ],
    script: [
      { src: '//kit.fontawesome.com/ed3def2da2.js' }
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
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
    { src: '~plugins/toast.js', ssr: false }
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
    '@nuxtjs/universal-storage',
    'nuxt-purgecss',
    'nuxt-payload-extractor',
    '@nuxtjs/proxy'
  ],

  /*
  proxy: {
    '/.netlify': {
      target: process.env.GRAPHQL_HOST,
      pathRewrite: { '^/.netlify/functions': '' }
    }
  },
  */

  /**
  * Build properties
  */
  build: {
    extractCSS: true
  },

  /**
  * Render properties
  */
  render: {
    csp: {
      reportOnly: true,
      hashAlgorithm: 'sha256',
      // unsafeInlineCompatiblity: true,
      policies: {
        'default-src': [ "'self'", '*.fontawesome.com', '*.gstatic.com', '*.google.com' ],
        'img-src': [ "'self'", 'https:', '*.google-analytics.com' ],
        // 'worker-src': [ "'self'", `blob:`, PRIMARY_HOSTS, '*.logrocket.io'],
        'style-src': [ "'self'", "'unsafe-inline'", '*.fontawesome.com', '*.funinatl.com', '*.funinatl.test', '*.googleapis.com', 'https://fonts.googleapis.com', 'https://keen-agnesi-3298d5.netlify.com/' ],
        'script-src': [ "'self'", "'unsafe-inline'", '*.fontawesome.com', '*.funinatl.com', '*.funinatl.test', 'fathom.adaptcms.com', '*.gstatic.com', '*.google-analytics.com', '*.google.com', 'https://keen-agnesi-3298d5.netlify.com/' ],
        'connect-src': [ "'self'", '*.funinatl.com', '*.funinatl.test', 'fathom.adaptcms.com', '*.google-analytics.com', '*.gstatic.com', '*.fontawesome.com', 'https://priceless-bhabha-0e3944.netlify.com/', '*.fonts.googleapis.com', 'https://keen-agnesi-3298d5.netlify.com/' ],
        'form-action': ["'self'"],
        'font-src': [ "'self'", "*.fonts.googleapis.com", "*.fonts.gstatic.com", "https://fonts.gstatic.com/", "https://kit-free.fontawesome.com/" ],
        'frame-ancestors': ["'none'"],
        'object-src': ["'none'"],
        'base-uri': [ 'https://dev.funinatl.com', 'http://funinatl.test', 'https://www.funinatl.com' ],
        'report-uri': [
          `https://sentry.io/api/254487/security/?sentry_key=609cf649abb24452a77cee6da89fc11326c1f41a6d63405bae6f104ecbc5beac`
        ]
      }
    }
  },

  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.API_ENDPOINT
  },

  // Apollo Server Setup
  apollo: {
    tokenName: 'funinatl', // optional, default: apollo-token
    cookieAttributes: {
      /**
        * Define when the cookie will be removed. Value can be a Number
        * which will be interpreted as days from time of creation or a
        * Date instance. If omitted, the cookie becomes a session cookie.
        */
      expires: 7, // optional, default: 7 (days)

      /**
        * Define the path where the cookie is available. Defaults to '/'
        */
      path: '/', // optional
      /**
        * Define the domain where the cookie is available. Defaults to
        * the domain of the page where the cookie was created.
        */
      domain: process.env.COOKIE_DOMAIN, // optional

      /**
        * A Boolean indicating if the cookie transmission requires a
        * secure protocol (https). Defaults to false.
        */
      secure: false,
    },
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
    // errorHandler: '~/plugins/apollo-error-handler.js',
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
        persisting: true, // Optional
        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        // websocketsOnly: false // Optional,
      }
      // default: '~/plugins/apollo-config.js'
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
    exclude: [
      /^(?=.*\buser\b).*$/
    ],
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
