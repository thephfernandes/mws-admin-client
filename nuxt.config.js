import colors from "vuetify/es5/util/colors";
import dotenv from "dotenv";
dotenv.config();

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  env: {
    api_url: process.env.NUXT_ENV_API_URL,
    xFunctionsKey: process.env.NUXT_ENV_X_FUNCTIONS_KEY,
    https: process.env.NUXT_ENV_HTTPS,
    user: process.env.NUXT_ENV_USER
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/vue-tel-input',
    '~/plugins/dateFormat',
    { src: '~/plugins/persistedState.client.js' }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "@nuxtjs/auth-next"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.NUXT_ENV_API_URL,
    headers: {
      get: {
        'x-functions-key': process.env.NUXT_ENV_X_FUNCTIONS_KEY
      },
      post: {
        'x-functions-key': process.env.NUXT_ENV_X_FUNCTIONS_KEY
      }
    },
    https: process.env.https == true,
    proxy: false
  },
  ignore: process.env.NODE_ENV === "production" && ["pages/customers*", "pages/manage/*", "pages/orders/*.vue"],
  auth: {
    redirect: {
      login: '/login',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'token'
        },
        user: {
          property: 'name'
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          user: process.env.user == true
        },
        tokenRequired: true,
        autoFetchUser: true,
        logout: false,
      },
    },
  },
  router: {
    middleware: ['auth', 'refreshToken'],
    mode: 'hash',
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/scss/variables.scss"],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /* 
  ** Share variables, mixins, functions across all style files (no @import needed)
  ** See @nuxtjs/style-resources on http://npmjs.com
  */
  styleResources: {
    scss: ["~/assets/scss/main.scss"]
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  loading: {
    color: 'green',
    height: '5px'
  }
};
