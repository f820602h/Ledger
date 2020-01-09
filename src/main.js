import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap'
import '@/assets/main.scss'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.filter('currency', function (value) {
  return '$ ' + String(value).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
})
Vue.filter('time', function (value) {
  let config = { hour12: true, hour: '2-digit', minute: '2-digit' }
  return new Date(value).toLocaleString('zh', config).replace(/\D{2}/, '$& ')
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
