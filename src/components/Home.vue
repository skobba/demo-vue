<template>
  <div class="home">Home Page</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  props: {
    msg: String,
  },
});
</script>
