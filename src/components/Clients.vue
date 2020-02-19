<template>
  <div>

    <div class="clients">Clients Page</div>
    <router-link to="/login">Login</router-link>
    <counter></counter>
    <cookies></cookies>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Counter from './Counter.vue'
import Cookies from './Cookies.vue'

export default Vue.extend({
  name: 'Clients',
  props: {
    msg: String,
  },
  components: { Counter, Cookies }
});
</script>
