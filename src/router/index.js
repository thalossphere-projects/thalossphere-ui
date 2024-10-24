import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/service/search'
    },
    {
        path: '/home',
        name: '主页',
        meta: {
            title: '主页',
            neglectLogin: true
        },
        component: () => import('../view/Home.vue'),
        redirect: '/index',
        children: [
            {
                path: '/service/search',
                meta: {
                    title: '用户管理'
                },
                component: () => import('../view/service/ServiceSearch.vue'),
            }
        ]
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 导出路由
export default router