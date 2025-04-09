import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SessionsView from '@/views/SessionsView.vue';
import SessionDetails from "@/views/SessionDetails.vue";
import AboutView from '../views/AboutView.vue';
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
        component: SessionsView,
        name: 'Sessions',
        meta: {requiresAuth: true, breadcrumb: 'Sessions', parent: 'Home'},
    },
    {
        path: '/session/:id',
        component: SessionDetails,
        name: 'SessionxDetails',
        props: true,
        meta: {requiresAuth: true, breadcrumb: 'SessionDetails', parent: 'Sessions'},
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
