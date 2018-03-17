import Vue from 'vue';
import Vuetify from 'vuetify';

import App from './App';
import router from './router';
import store from './store';


import('../node_modules/vuetify/dist/vuetify.min.css');
import('../node_modules/vis/dist/vis.css');

Vue.use(Vuetify);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
