import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Echarts from '@/views/Echarts.vue';

import Zrender from '@/views/Zrender.vue';
import Calculator from '@/views/Calculator.vue';

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    {
    path: '/',
    redirect:'/echarts'
    },
    {
      path: '/echarts',
      name: 'Echarts',
      component: Echarts
    },
    {
      path: '/calculator',
      name: 'Calculator',
      component: Calculator
    },
    {
      path:'/zrender',
      name: 'Zrender',
      component: Zrender
    }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
