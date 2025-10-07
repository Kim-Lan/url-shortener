import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store.js'

const routes = [
  {
    path: '/admin/login',
    name: 'login',
    component: () => import('../views/AdminLogin.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/admin/register',
    name: 'register',
    component: () => import('../views/AdminRegister.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    component: () => import('../views/AdminDashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

router.beforeEach((to, from) => {
  const auth = useAuthStore();

  if (to.name === 'login' && !to.query.redirect) {
    return { name: 'login', query: { redirect: from.fullPath }};
  } else if (to.meta.requiresAuth && !auth.user) {
    return { name: 'login', query: { redirect: to.fullPath }};
  } else if (to.meta.requiresGuest && auth.user) {
    return { name: 'dashboard'};
  }
})

export default router;
