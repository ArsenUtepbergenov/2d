import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/rpg',
    name: 'PRG',
    component: () => import('@/pages/PRG.vue'),
    alias: '/game',
  },
  {
    path: '/',
    name: 'TestSpot',
    component: () => import('@/pages/TestSpot.vue'),
    alias: '/test-spot',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'TestSpot' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
})

export default router
