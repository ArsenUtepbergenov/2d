import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('@/pages/Home.vue')
const About = () => import('@/pages/About.vue')
const Articles = () => import('@/pages/Articles.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      enterClass: 'animate__animated animate__fadeInLeft',
      leaveClass: 'animate__animated animate__fadeOutRight'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      enterClass: 'animate__animated animate__fadeInRight',
      leaveClass: 'animate__animated animate__fadeOutLeft'
    }
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router