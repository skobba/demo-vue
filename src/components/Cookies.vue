<template>
  <div class="cookies">
    <h3>Cookies</h3>
    <button @click="sendRequest">sendRequest</button>
    <button @click="setCookie">Set cookie</button>
    <button @click="setHttpOnlyCookie">Set HttpOnly cookie</button>
    
    <pre>{{ cookies }}</pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '../store';

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
    setHttpOnlyCookie () {
      console.log("setHttpOnlyCookie"); // eslint-disable-line
      let key = 'fromvue-httponly';
      let value = 'somevaluefromfrontend-httponly';
      let thirty = 60 * 60 * 24 * 30;
      document.cookie = `${key}=${value};path=/;max-age=${thirty};HttpOnly`; // one cookie at a time
    },
    sendRequest () {
      fetch("http://localhost:3000/refresh_token", {
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

