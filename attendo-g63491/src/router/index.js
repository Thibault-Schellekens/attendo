import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SessionView from '@/views/SessionView.vue'
import AboutView from '../views/AboutView.vue'
import {useAuthStore} from "@/stores/AuthStore.js";

const routes = [
    {
        path: '/',
        component: HomeView,
        name: 'Home',
        meta: {breadcrumb: 'Accueil'},
    },
    {
        path: '/sessions',
        component: SessionView,
        name: 'Session',
        meta: {requiresAuth: true, breadcrumb: 'Sessions', parent: 'Home'},
    },
    {
        path: '/about',
        component: AboutView,
        name: 'About',
        meta: {breadcrumb: 'À propos'},
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isConnected) {
        next({name: 'Home'});
    } else {
        next();
    }
})

export default router
