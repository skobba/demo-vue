<template>
  <div class="cookies">
    <h3>Cookies</h3>
    <p>HttpOnly cookies can only be set by backend and read by backend</p>
    <button @click="setCookie">Set cookie</button>
    <button @click="sendRequest">Send Request with Cookies</button>
    
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

