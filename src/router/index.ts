import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'TestSpot',
    component: () => import('@/pages/TestSpot.vue'),
    alias: '/test',
  },
  {
    path: '/rpg',
    name: 'PRG',
    component: () => import('@/pages/PRG.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'PRG' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
})

export default router
