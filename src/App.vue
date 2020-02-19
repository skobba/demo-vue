<template>
  <div id="app">
    <Header/>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ApolloExample from './components/ApolloExample.vue';
import Header from './components/Header.vue';
import store from './store';

export default Vue.extend({
  name: 'app',
  components: {
    Header
  },
  computed: {
    count () {
      return store.state.count
    }
  }
});
</script>

<style>
body { margin: 0; }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

pre {
  text-align: left;

  white-space: pre-wrap;       /* Since CSS 2.1 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>
