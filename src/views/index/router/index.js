import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
        // 登陆后首页
        {
            path: '/',
            name: 'index',
            component: resolve => require(['@/views/index/components/HelloVue'], resolve)
        },
        // 404
        {
            path: '*',
            name: 'notFound',
            component: resolve => require(['@/views/index/components/NotFound'], resolve)
        }
    ]
});
