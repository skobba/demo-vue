<template>
  <div>

    <div class="clients">Clients Page</div>
    <counter></counter>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Counter from './Counter.vue'

export default Vue.extend({
  name: 'Clients',
  props: {
    msg: String,
  },
  components: { Counter }
});
</script>
