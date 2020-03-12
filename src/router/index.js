import Vue from 'vue'
import VueRouter from 'vue-router'
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
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.loginState && to.name !== 'Login') next('/')
  else if (store.state.loginState && to.name === 'Login') next(`/daily/${store.state.today}`)
  else next()
})

export default router
