import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 5
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  }
})
