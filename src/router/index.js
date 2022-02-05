import { createRouter, createWebHistory } from 'vue-router';
import { nonAuthenticatedRoute, authenticatedRoute } from '@/helpers';

const routes = [
  {
    path: '/login',
    name: 'Login',
    beforeEnter: [nonAuthenticatedRoute],
    component: () => import(/* webpackChunkName: "auth" */ '../views/Login.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "auth" */ '../views/Logout.vue'),
  },
  {
    path: '/',
    name: 'Dashboard',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "auth" */ '../views/dashboard/Dashboard.vue'),
  },
  {
    path: '/listings',
    name: 'Listings',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "auth" */ '../views/listings/Listings.vue'),
  },
  {
    path: '/product/:id',
    name: 'Product Detail',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "auth" */ '../views/listings/ProductDetail.vue'),
  },
  {
    path: '/transactions',
    name: 'Transactions',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "auth" */ '../views/transactions/Transactions.vue'),
  },
  {
    path: '/transaction/:id',
    name: 'Transaction Detail',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "auth" */ '../views/transactions/TransactionDetail.vue'),
  },
  {
    path: '/payments',
    name: 'Payments',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "auth" */ '../views/payments/Payments.vue'),
  },
  {
    path: '/payment/:id',
    name: 'Payment Detail',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "auth" */ '../views/payments/PaymentDetail.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "auth" */ '../views/users/Users.vue'),
  },
  {
    path: '/user/:id',
    name: 'User Detail',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "auth" */ '../views/users/UserDetail.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    beforeEnter: [authenticatedRoute],
    component: () => import(/* webpackChunkName: "auth" */ '../views/settings/Settings.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
