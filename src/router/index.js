import firebase from 'firebase';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignUp from '../views/SignUpView.vue';

const routes = [
    {
        path: '/:pathMatch(.*)*',
        redirect: '/login',
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        meta: {
            requiresAuth: true,
        },
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

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !currentUser) next('login');
    else if (!requiresAuth && currentUser) next('home');
    else next();
});

export default router;
