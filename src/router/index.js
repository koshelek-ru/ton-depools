import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '@/plugins/i18n';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () =>
      import(/* webpackChunkName: "main" */ '@/views/Main/Main.vue'),
    meta: {
      title: `FreeTON Staking - ${i18n.t('links.main')}`,
    },
    children: [
      {
        path: '/depool/:dePoolAddress',
        name: 'SearchDePool',
        component: () =>
          import(/* webpackChunkName: "main" */ '@/views/Main/Main.vue'),
        meta: {
          title: 'FreeTON Staking - Main',
        },
      },
    ],
  },
  {
    path: '/mystakes',
    name: 'MyStakes',
    component: () =>
      import(
        /* webpackChunkName: "my-stakes" */ '@/views/MyStakes/MyStakes.vue'
      ),
    meta: {
      title: `FreeTON Staking - ${i18n.t('links.myStakes')}`,
    },
    children: [
      {
        path: '/mystakes/:clientAddress',
        name: 'MyStakesLoggedIn',
        meta: {
          title: `FreeTON Staking - ${i18n.t('links.myStakes')}`,
        },
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
