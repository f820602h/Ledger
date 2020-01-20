import Vue from 'vue'
import VueRouter from 'vue-router'
import Daily from '@/views/Daily'
import DashBoard from '@/views/DashBoard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Daily',
    component: Daily
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoard
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
