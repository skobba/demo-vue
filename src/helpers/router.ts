import Vue from 'vue';
import Router from 'vue-router';

import { authenticationService } from '@/_services';
import { Role } from './role';
import Home from './components/Home.vue';
import Account from './components/Account.vue';
import Admin from './components/Admin.vue';
import Clients from './components/Clients.vue';
import Matters from './components/Matters.vue';
import Login from './components/Login.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        { 
            path: '/', 
            component: Home, 
            meta: { authorize: [] } 
        },
        { 
            path: '/admin', 
            component: Admin, 
            meta: { authorize: [Role.Admin] } 
        },
        { 
            path: '/login', 
            component: Login 
        },

        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const { authorize } = to.meta;
    const currentUser = authenticationService.currentUserValue;

    if (authorize) {
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return next({ path: '/login', query: { returnUrl: to.path } });
        }

        // check if route is restricted by role
        if (authorize.length && !authorize.includes(currentUser.role)) {
            // role not authorised so redirect to home page
            return next({ path: '/' });
        }
    }

    next();
})