import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Highcahrts from 'highcharts'

import 'bootstrap'
import '@/assets/main.scss'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Highcahrts.setOptions({
  lang: {
    thousandsSep: ','
  },
  colors: ['rgb(236, 208, 120)', 'rgba(217, 91, 67, 0.7)', 'rgba(192, 41, 66, 0.7)', 'rgba(84, 36, 55, 0.7)', 'rgba(83, 119, 122, 0.7)', 'rgba(119, 146, 174, 0.7)', '#636368']
})

Vue.filter('currency', function (value) {
  return '$ ' + String(value).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
})
Vue.filter('dateRange', function (value) {
  let config = { year: 'numeric', month: '2-digit', day: '2-digit' }
  let start = new Date(value.start).toLocaleString('zh', config)
  let end = new Date(value.end - 1).toLocaleString('zh', config)
  return `${start} - ${end}`
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
