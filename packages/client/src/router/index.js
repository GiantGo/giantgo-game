import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/robot',
      name: 'home'
    },
    {
      path: '/cxgd',
      name: 'cxgd',
      component: () => import('../views/CXGD.vue')
    },
    {
      path: '/tft',
      name: 'tft',
      component: () => import('../views/TFT.vue')
    },
    {
      path: '/sprite',
      name: 'sprite',
      component: () => import('../views/SpriteAnimation.vue')
    },
    {
      path: '/robot',
      name: 'robot',
      component: () => import('../views/RobotView.vue')
    }
  ]
})

export default router
