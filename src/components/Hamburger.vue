<template>
  <div class="burger">
    <input type="checkbox" id="toggle-custom-size" v-model="toggle"/>
    <label for="toggle-custom-size"><i></i></label>
    <div class="mobile-em">
      <div class="mobile-menu">
        <!-- <router-link class="mobile-menu-item" to="/matters">Matters</router-link>
        <router-link class="mobile-menu-item" to="/clients">Clients</router-link> -->
        <router-link
          class="mobile-menu-item"
          to="/clients"
          @click.native="toggleMenu"
        >
          Clients
        </router-link>
        <router-link
          class="mobile-menu-item"
          to="/matters"
          @click.native="toggleMenu"
        >
          Matters
        </router-link>

        <!-- <button v-on:click="counter += 1">Add 1</button>
        <p>The button above has been clicked {{ counter }} times.</p>
        <div id="mydiv" ref="myid"> </div>
        <button v-on:click="toggle = false">Hide</button>
        <div>toggle: {{toggle}}</div> -->

      </div>

    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueRouter from 'vue-router';


export default Vue.extend({
  name: 'Hamburger',
  props: {
    msg: String,
  },
  data: function() {
    return {
      counter: 0,
      toggle: false
    };
  },
  methods: {
    toggleMenu: function (event: any) {
      //this.$emit('appSidebarInlineButtonClick');
      this.toggle = !this.toggle;
    }
  }
});
</script>


<style lang="scss" scoped>
  @import 'hamburger.scss';
  .burger {
    float: right;
    color: #f2f2f2;
    text-align: center;
    padding: 16px 20px 0px 0px;
    text-decoration: none;
    font-size: 17px;
  }

  .mobile-menu a {
    display: block;
    float: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
    list-style-type: none;
  }

  .mobile-menu-item a {
    float: none;
    color: black;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
    list-style-type: none;
  }

  .mobile-em {
    color: black;
    text-align: center;
  }

  .mobile-menu-item:hover {
  background-color: #ddd;
  color: black;
  }

</style>