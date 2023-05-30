import { createRouter, createWebHistory } from "vue-router";

import AppHome from './pages/AppHome.vue';
import AppAbout from './pages/AppAbout.vue';
import ProjectsIndex from './pages/ProjectsIndex.vue';

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
        },
        {
            path: '/about-me',
            name: 'about',
            component: AppAbout,
        },
        {
            path: '/projects',
            name: 'projects.index',
            component: ProjectsIndex,
        }
    ],
});

export { router };