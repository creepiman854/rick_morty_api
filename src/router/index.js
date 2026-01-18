import { createRouter, createWebHistory } from 'vue-router'
import { userAuthenticated, isAuthReady } from '@/services/authentication'

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

router.beforeEach(async (to, from, next) => {
  while (!isAuthReady()) {
    await new Promise((res) => setTimeout(res, 10))
  }

  if (to.meta.authRequired && !userAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})

export default router
