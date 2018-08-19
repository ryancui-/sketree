// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import TreeView from 'vue-json-tree-view';

import App from './App';
import store from './store';

Vue.config.productionTip = false;

Vue.use(TreeView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store
});
