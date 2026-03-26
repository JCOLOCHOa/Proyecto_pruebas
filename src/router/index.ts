import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ofertas',
      name: 'offers',
      component: () => import('../views/OfertasView.vue')
    },
    {
      path: '/nuevos',
      name: 'new',
      component: () => import('../views/NuevosView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/categoria/:category',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    }
  ]
});

export default router;