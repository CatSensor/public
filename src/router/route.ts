import { createRouter, createWebHistory } from 'vue-router'

import MarketingLayout from '@/layouts/MarketingLayout.vue'
import PolicyLayout from '@/layouts/PolicyLayout.vue'
import HomePage from '@/pages/home/HomePage.vue'
import PrivacyPage from '@/pages/privacy/PrivacyPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MarketingLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomePage,
        },
      ],
    },
    {
      path: '/',
      component: PolicyLayout,
      children: [
        {
          path: 'privacy',
          name: 'privacy',
          component: PrivacyPage,
        },
      ],
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
