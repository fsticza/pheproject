require('browser-env')()
const hooks = require('require-extension-hooks')
const Vue = require('vue')

if (Vue && Vue.config) {
  Vue.config.productionTip = false
}

if (Vue && Vue.default && Vue.default.config) {
  Vue.default.config.productionTip = false
}

// https://github.com/nuxt/create-nuxt-app/issues/180#issuecomment-463069941
window.Date = global.Date = Date

hooks('vue')
  .plugin('vue')
  .push()
hooks(['vue', 'js'])
  .exclude(({ filename }) => filename.match(/\/node_modules\//))
  .plugin('babel')
  .push()
