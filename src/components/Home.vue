<template>

  <div class="home">
    <h1>Home Page</h1>
    <router-link to="/login">Login</router-link>
  </div>
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

<style scoped>
.home {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: block;
    background: #fff;
    transition: all 0.2s;
    z-index: 10000000;
    /* transform: translateY(10%); */
    /* top: 0px;
    right: 0px;
    height: 10px;
    width: 100px; */
}
</style>
