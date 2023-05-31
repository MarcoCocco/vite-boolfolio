import { createRouter, createWebHistory } from "vue-router";

import AppHome from './pages/AppHome.vue';
import AppAbout from './pages/AppAbout.vue';
import ProjectsIndex from './pages/ProjectsIndex.vue';
import SingleProject from './pages/SingleProject.vue';

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
            meta: {
                title: 'Homepage',
            }
        },
        {
            path: '/about-me',
            name: 'about',
            component: AppAbout,
            meta: {
                title: 'About me',
            }
        },
        {
            path: '/projects',
            name: 'projects.index',
            component: ProjectsIndex,
            meta: {
                title: 'Projects',
            }
        },
        {
            path: '/projects/:slug',
            name: 'projects.show',
            component: SingleProject,
        }
    ],
});

router.beforeEach((to) => {
    document.title = to.meta?.title ? 'Boolfolio - ' + to.meta.title : 'Boolfolio';
});

export { router };