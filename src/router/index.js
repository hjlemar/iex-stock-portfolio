import Vue from 'vue';
import Router from 'vue-router';
import Details from '@/components/Details';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/details',
      name: 'Details',
      component: Details,
    },
  ],
});
