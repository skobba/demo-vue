<template>
  <div class="cookies">
    <h3>Cookies</h3>
    <p>HttpOnly cookies can only be set by backend and read by backend</p>
    <button @click="setCookie">Set cookie</button>
    <button @click="sendRequest">Send Request with Cookies</button>
    
    <div class="cookiesResult">cookiesResult: {{accessToken}}</div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '../store';

// eslint-disable-next-line
console.log("process.env.VUE_APP_GRAPHQL_HTTP=" + process.env.VUE_APP_GRAPHQL_HTTP);
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP;// || 'http://localhost:3000/graphql'
// Files URL root
let filesRoot: string = "";
if ( httpEndpoint ) {
  // eslint-disable-next-line
  console.log("Files URL root: " + httpEndpoint.substr(0, httpEndpoint.indexOf('/graphql')));
  filesRoot = process.env.VUE_APP_FILES_ROOT || httpEndpoint.substr(0, httpEndpoint.indexOf('/graphql'))
}



export default Vue.extend({
  name: 'Cookies',
  props: {
    msg: String,
  },
  computed: {
    cookies () {
      return document.cookie;
    }
  },
  methods: {
    setCookie () {
      console.log("setCookie"); // eslint-disable-line
      let key = 'fromvue';
      let value = 'somevaluefromfrontend';
      let thirty = 60 * 60 * 24 * 30;
      document.cookie = `${key}=${value};path=/;max-age=${thirty};`; // one cookie at a time
    },
    sendRequest () {
      fetch(`${filesRoot}/refresh_token`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Access-Control-Allow-Credentials': 'true'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // mode: 'no-cors'
      });

    }
  }
});
</script>

<style scoped>
.cookiesResult {
  text-align: left;
  font-family: monospace;
  overflow-wrap: break-word !important;
  word-break: break-all !important;
}
</style>
