<template>
  <div class="hello">
    <div>count: {{ count }}</div>
      <p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
      </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '../store';

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    }
  }
});
</script>

