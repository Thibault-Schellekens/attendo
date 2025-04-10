import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SessionsView from '@/views/SessionsView.vue';
import SessionDetails from "@/views/SessionDetails.vue";
import UeEventsDetailsView from "@/views/UeEventsDetailsView.vue";
import AboutView from '../views/AboutView.vue';
import {useAuthStore} from "@/stores/AuthStore.js";
import EventRoomsView from "@/views/EventRoomsView.vue";
import ExaminationRoomView from "@/views/ExaminationRoomView.vue";

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
        name: 'SessionDetails',
        props: true,
        meta: {requiresAuth: true, breadcrumb: 'SessionDetails', parent: 'Sessions'},
    },
    {
        path: '/session/:id/ue/:ue',
        component: UeEventsDetailsView,
        name: 'UeEventsDetails',
        props: true,
        meta: {requiresAuth: true, breadcrumb: 'UeEventsDetails', parent: 'SessionDetails'},
    },
    {
        path: '/session/:id/ue/:ue/event/:eventId',
        component: EventRoomsView,
        name: 'EventRooms',
        props: true,
        meta: {requiresAuth: true, breadcrumb: 'EventRooms', parent: 'UeEventsDetails'},
    },
    {
        path: '/session/:id/ue/:ue/event/:eventId/examRoom/:examRoomId',
        component: ExaminationRoomView,
        name: 'ExaminationRoom',
        props: true,
        meta: {requiresAuth: true, breadcrumb: 'ExaminationRooms', parent: 'EventRooms'},
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
