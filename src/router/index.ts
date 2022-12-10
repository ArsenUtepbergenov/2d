import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'PRG',
    component: () => import('@/pages/PRG.vue'),
    alias: '/rpg',
  },
  {
    path: '/test',
    name: 'TestSpot',
    component: () => import('@/pages/TestSpot.vue'),
    alias: '/test-spot',
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
