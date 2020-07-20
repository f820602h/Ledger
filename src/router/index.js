import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Daily from '@/views/Daily'
import Login from '@/views/Login'
import DashBoard from '@/views/DashBoard'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/daily/:timestamp',
    name: 'Daily',
    component: Daily
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: '*',
    redirect: {
      name: 'Login'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    if (store.state.loginState) next(`/daily/${store.state.today}`)
    else {
      axios.get(`${process.env.VUE_APP_URL}ledger/login`).then(res => {
        if (res.data.success) {
          store.commit('SET_LOGIN_STATE', true)
          store.dispatch('INIT_DATA').then(() => {
            next(`/daily/${store.state.today}`)
          })
        } else {
          store.commit('SET_LOGIN_STATE', false)
          next()
        }
      })
    }
  }
  if (to.name !== 'Login') {
    if (store.state.loginState) next()
    else {
      axios.get(`${process.env.VUE_APP_URL}ledger/login`).then(res => {
        if (res.data.success) {
          store.commit('SET_LOGIN_STATE', true)
          store.dispatch('INIT_DATA').then(() => {
            next()
          })
        } else {
          store.commit('SET_LOGIN_STATE', false)
          next('/')
        }
      })
    }
  }
})

export default router
