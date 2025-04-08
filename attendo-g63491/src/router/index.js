import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SessionView from '@/views/SessionView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', component: HomeView, name: 'Home'},
  { path: '/sessions', component: SessionView, name: 'Session'},
  { path: '/about', component: AboutView, name: 'About'},

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
