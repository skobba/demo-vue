<template>
  <div class="container">
    <div class="clients">Admin Page</div>
    <div class="wrapper">
      <div class="box a">
        <h3>Vuex state management</h3>
        <counter></counter>
      </div>
      <div class="box aa">
        <h3>JWT Token (<router-link to="/login">Login</router-link>)</h3>
        <h4>access_token global variable</h4>
        <!-- <pre>accessToken: {{(accessToken == '' ? '""' : accessToken.substring(0,8) + '...' )}}</pre> -->
        <div class="accessToken">accessToken: {{accessToken}}</div>
        <pre>me: {{JSON.stringify(me, null, 2)}}</pre>
      </div>
      <div class="box b">
            <cookies></cookies>
      </div>
      <div class="box c">
        <h3>Grapgql Queries</h3>
        <button @click="sendGqlQueryMethod1">Method1 (run on component display)</button>
        <button @click="sendGqlQueryMethod2">Method2</button>
        <button @click="refreshAccessToken">refreshAccessToken</button>
      </div>
      <div class="box d">
        <h3>Grapgql Result</h3>
        <pre>result: {{JSON.stringify(result, null, 2)}}</pre>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Counter from './Counter.vue'
import Cookies from './Cookies.vue'
import ACCOUNT from '../graphql/Account.gql'
import ACCESS_TOKEN from '../graphql/GetAccessToken.gql'

import { getAccessToken, setAccessToken } from "../accessToken";

export default Vue.extend({
  name: 'Admin',
  components: { Counter, Cookies },
  data: () => {
    return {
      myVariables: null,
      result: {}
    }
  },
  apollo: {
    me: {
      query: ACCOUNT,
      fetchPolicy: 'no-cache',
      variables () {
        // Use vue reactive properties here
        return this.myVariables
      },
      update (data) {
        this.result = data;
        console.log("apollo update"); // eslint-disable-line
      }
      // skip () {
      //   return !this.myVariables
      // }
    }
  },
  computed: {
    // a computed getter
    accessToken: function () {
      // `this` points to the vm instance
      return getAccessToken();
    }
  },
  methods: {
    refreshAccessToken () {
      console.log("refreshAccessToken"); // eslint-disable-line

        fetch("http://localhost:3000/refresh_token", {
          method: "POST",
          credentials: "include"
        }).then(data => {
        console.log("data: " + JSON.stringify(data, null, 2)) // eslint-disable-line
      });

      //this.$apollo.query({
      //   query: ACCESS_TOKEN,
      //   variables: { },
      //   fetchPolicy: 'no-cache'
      // }).then(data => {
      //   this.result = data;
      //   console.log("data: " + JSON.stringify(data, null, 2)) // eslint-disable-line
      // });
    },
    sendGqlQueryMethod1 () {
      console.log("sendGqlQueryMethod1"); // eslint-disable-line
      // this.myVariables = null;
      this.$apollo.queries.me.refresh()
    },
    sendGqlQueryMethod2 () {
      console.log("sendGqlQueryMethod2"); // eslint-disable-line
      this.$apollo.query({
        query: ACCOUNT,
        variables: { },
        fetchPolicy: 'no-cache'
      }).then(data => {
        this.result = data;
        console.log("data: " + JSON.stringify(data, null, 2)) // eslint-disable-line
      });
    }
  }
});
</script>

<style scoped>
.container {
  margin: 40px 0 0;
  grid-template-columns: 12px 12px 12px;
  grid-template-rows: 12px 12px 12px;
}

body {
  margin: 40px;
}

.accessToken {
  text-align: left;
  font-family: monospace;
  overflow-wrap: break-word !important;
  word-break: break-all !important;
}
.wrapper {
  display: grid;
  grid-gap: 10px;
  margin: 10px;
  /* grid-template-columns: 100px 100px 100px; */
  /* grid-template-columns: 100% 100% 100%; */
  background-color: #fff;
  color: #444;
}

.box {
  background-color: #444;
  color: #fff;
  border-radius: 5px;
  padding: 20px;
  /* font-size: 150%; */
}

.a {
  grid-column: 1;
  grid-row: 1;
  background-color: green;
}
.aa {
  grid-column: 2;
  grid-row: 1;
  background-color: firebrick;
}
.b {
  grid-column: 3 ;
  grid-row: 1 / 3;
  background-color: navy;
}
.c {
  grid-column: 1 ;
  grid-row: 2 ;
  background-color: mediumvioletred;
}
.d {
  grid-column: 2;
  grid-row: 2;
  background-color: mediumvioletred;
}

</style>