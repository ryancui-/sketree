import Vuex from 'vuex';
import Vue from 'vue';

import TreeUtils from './utils/tree-util';

Vue.use(Vuex);

const treeUtils = new TreeUtils();

const store = new Vuex.Store({
  state: {
    nodes: []
  },
  mutations: {
    addNode(state, node) {
      state.nodes.push(node);
    },
    removeNode(state, node) {
      const idx = state.nodes.findIndex(n => n === node);
      if (idx !== -1) {
        state.nodes.splice(idx, 1);
      }
    }
  },
  getters: {
    treeData(state) {
      return treeUtils.buildTreeJson(state.nodes);
    }
  }
});

export default store;
