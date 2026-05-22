import { defineNuxtConfig } from 'nuxt/config'

function getContentRoutes() {
  return []
}

const nitroPreset =
  process.env.NITRO_PRESET ||
  (process.env.NETLIFY ? 'netlify' : 'node-server')
const contentRoutes = getContentRoutes()

export default defineNuxtConfig({
  /*
   ** Headers of the page
   */
  app: {
    head: {
      title: 'PHE project development & consulting',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Mérnöki megoldások mindenki számára'
        },
        {
          name: 'theme-color',
          content: '#8b9db5'
        },
        {
          property: 'og:image',
          content: '/img/index-head2.jpg'
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
    }
  },
  nitro: {
    preset: nitroPreset,
    compatibilityDate: '2026-05-21',
    prerender: {
      crawlLinks: false,
      failOnError: false,
      routes: contentRoutes
    }
  },
  router: {
    linkExactActiveClass: 'active',
    linkActiveClass: ''
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/markdown.ts'
  ],
  modules: [],
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-kit', 'markdown-it']
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: [
            'import',
            'global-builtin',
            'color-functions',
            'if-function',
            'abs-percent',
            'legacy-js-api'
          ]
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    loaders: {
      scss: {
        sassOptions: {
          quietDeps: true,
          silenceDeprecations: ['import', 'legacy-js-api']
        }
      }
    },
    // publicPath: 'https://d1loboc6rox52k.cloudfront.net',
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (!ctx.isDev) {
      }
    }
  },
  routeRules: {}
})
