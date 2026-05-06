import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/home/HomePage.vue'
import PrivacyPage from '@/pages/privacy/PrivacyPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyPage,
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return {
      top: 0,
    }
  },
})
