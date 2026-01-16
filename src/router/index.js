import { createRouter, createWebHistory } from 'vue-router'
import { userAuthenticated } from '@/services/authentication'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/MainView.vue') },
    { path: '/login', component: () => import('@/views/LoginView.vue') },
    { path: '/register', component: () => import('@/views/RegisterView.vue') },
    {
      path: '/userProfile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { authRequired: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired && !userAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
