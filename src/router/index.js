import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignUp from '../views/SignUpView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },

    {
        path: '/login',
        name: 'Login',
        component: LoginView,
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
