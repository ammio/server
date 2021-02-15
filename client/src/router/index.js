import { createRouter, createWebHistory } from 'vue-router'
import dashboard from '../views/dashboard'
import login from '../views/login'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: dashboard,
    meta: {
      private: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      private: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.private) && (localStorage.getItem('authenticated') === null && localStorage.getItem('token') === null)) next({ path: '/login', params: { nextURL: to.fullPath } })
  else if (to.matched.some(route => !route.meta.private) && (localStorage.getItem('authenticated') === true || localStorage.getItem('token') !== null)) next({ path: '/', params: { nextURL: to.fullPath } })
  else next()
})

export default router
