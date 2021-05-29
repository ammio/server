import { createRouter, createWebHistory } from 'vue-router'
import dashboard from '../views/dashboard'
import Login from '../views/Login'
import home from '../views/home'
import { token } from '../api/authentication'

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
    component: Login,
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
  if (to.matched.some(route => route.meta.private) && token === null) next({ path: '/login', params: { nextURL: to.fullPath } })
  else if (to.matched.some(route => !route.meta.private) && token !== null) next({ path: '/', params: { nextURL: to.fullPath } })
  else next()
})

export default router
