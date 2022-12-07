import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'TestSpot',
    component: () => import('@/pages/TestSpot.vue'),
    alias: '/test',
  },
  {
    path: '/world',
    name: 'World',
    component: () => import('@/pages/World.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'World' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
})

export default router
