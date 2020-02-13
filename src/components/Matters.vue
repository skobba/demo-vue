<template>
  <div>
    <h1>Matters Page</h1>
    <ApolloExample></ApolloExample>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import ApolloExample from './ApolloExample.vue';

export default Vue.extend({
  name: 'Matters',
  props: {
    msg: String,
  },
  components: {
    ApolloExample
  }
});
</script>
