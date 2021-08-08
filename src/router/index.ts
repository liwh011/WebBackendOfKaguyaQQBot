import { createRouter, createWebHistory, createWebHashHistory, } from 'vue-router';

const routes = [
    {
        name: 'Home',
        path: '/',
        redirect: { name: 'ServiceManage' }
    },
    {
        path: '/svmng/sv',
        name: 'ServiceManage',
        component: () => import('../pages/ServiceManage.vue'),
    },
    {
        path: '/svmng/sv/:svname',
        name: 'ServiceDetail',
        component: () => import('../pages/ServiceDetail.vue'),
    },
    {
        path: '/svmng/group',
        name: 'GroupManage',
        component: () => import('../pages/GroupManage.vue'),
    },
    {
        path: '/svmng/group/:gid',
        name: 'ServiceDetailOfGroup',
        component: () => import('../components/TheServiceDetailOfGroup.vue')
    },
    {
        path: '/usermng',
        name: 'UserManage',
        component: () => import('../pages/UserManage.vue'),
    },
    {
        path: '/unauthorized',
        name: 'Unauthorized',
        component: () => import('../pages/Unauthorized.vue')
    },
    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: () => import('../pages/NotFound.vue')
    },
]


const router = createRouter({
    routes,
    history: createWebHistory('/mng/'),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});


export default router;