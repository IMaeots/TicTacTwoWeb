import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/game',
        name: 'game',
        component: () => import('@/views/GameView.vue')
    },
    {
        path: '/game-over',
        name: 'gameOver',
        component: () => import('@/views/GameOverView.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
