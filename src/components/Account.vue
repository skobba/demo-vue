<template>
  <div>

    <div class="clients">Account Page</div>
    <pre>accessToken: {{accessToken.substring(0,8)}}...</pre>
    <pre>me: {{JSON.stringify(me, null, 2)}}</pre>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ACCOUNT from '../graphql/Account.gql'
import { getAccessToken, setAccessToken } from "../accessToken";

export default Vue.extend({
  name: 'Account',
  data: () => {
    return {
      myVariables: null,
      result: {}
    }
  },
  apollo: {
    me: {
      query: ACCOUNT,
      fetchPolicy: 'no-cache'
      // variables () {
      //   // Use vue reactive properties here
      //   return this.myVariables
      // },
      // update (data) {
      //   this.result = data;
      //   console.log("apollo update"); // eslint-disable-line
      // }
    }
  },
  components: { },
  computed: {
    // a computed getter
    accessToken: function () {
      // `this` points to the vm instance
      return getAccessToken();
    }
  }
});
</script>
