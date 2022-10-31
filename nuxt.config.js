export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'r4-test-front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/dotenv', { filename: '.env' }]
  ],


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],
  auth:{
    vuex: false,
    strategies: {
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        url: process.env.BASE_URL_API,
        endpoints: {
          login: { 
            url: process.env.LOGIN, 
            method: 'post'
          },
          logout: {
            url: process.env.LOGOUT,
            method: 'get'
          }
        }
      }
    }
  },
  axios: {
    credentials: true, // this error -  changed it from Credential
    baseURL: process.env.BASE_URL_API,
  }, 
  router:{
    middleware: ['auth'],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
    }
  }
}
