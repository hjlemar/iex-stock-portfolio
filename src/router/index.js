import Vue from 'vue';
import Router from 'vue-router';
import Details from '@/components/Details';
import Portfolio from '@/components/portfolio/Portfolio';

Vue.use(Router);

export default new Router({
  routes: [

    {
      path: '/details/:stock',
      name: 'Details',
      component: Details,
    },
    {
      path: '/portfolio/:portfolio',
      name: 'Portfolio',
      component: Portfolio,
    },
  ],
});
