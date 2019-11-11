module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        name: 'theme-color',
        content: '#8b9db5'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  router: {
    // base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/sticza.com/' : '',
    linkExactActiveClass: 'active',
    linkActiveClass: ''
  },
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/google-maps.js', ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
    '@nuxtjs/pwa',
    '@nuxtjs/svg'
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  markdownit: {
    injected: true
  },
  generate: {
    routes() {
      const fs = require('fs')
      return [
        ...fs.readdirSync('./assets/content/blog').map((file) => {
          return {
            route: `/blog/${file.slice(2, -5)}`, // Remove the .json from the end of the filename
            payload: require(`./assets/content/blog/${file}`)
          }
        }),
        ...fs.readdirSync('./assets/content/project').map((file) => {
          return {
            route: `/project/${file.slice(2, -5)}`, // Remove the .json from the end of the filename
            payload: require(`./assets/content/project/${file}`)
          }
        }),
        ...fs.readdirSync('./assets/content/service').map((file) => {
          return {
            route: `/service/${file.slice(2, -5)}`, // Remove the .json from the end of the filename
            payload: require(`./assets/content/service/${file}`)
          }
        })
      ]
    }
  }
}
