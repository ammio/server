import { createRouter, createWebHistory } from 'vue-router'
import dashboard from '../views/dashboard'
import login from '../views/login'
import home from '../views/home'

const routes = [
  {
    path: '/dashboard',
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
  },
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      private: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.private) && localStorage.getItem('token') === null) next({ path: '/login', params: { nextURL: to.fullPath } })
  else if (to.matched.some(route => !route.meta.private) && localStorage.getItem('token') !== null) next({ path: '/', params: { nextURL: to.fullPath } })
  else next()
})

export default router
