import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

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
      // TODO Generate tree JSON data
      return state.nodes;
    }
  }
});

export default store;
