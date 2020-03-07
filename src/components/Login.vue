<template>
  <div 
  class="login"
  :class="{ 'gjermund': skobba }"
  
  >
        <h2>Login</h2>
        <form>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <!-- <div class="form-group">
                <button  v-on:click="handleSubmit">Login</button>
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/register" class="btn btn-link">Register</router-link>
            </div> -->
        </form>
        <button  v-on:click="login">Login</button>
        <button  v-on:click="getAccessToken">GetAccessToken</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LOGIN from '../graphql/Login.gql';
import GET_ACCESS_TOKEN from '../graphql/GetAccessToken.gql'
import ADD_MESSAGE from '../graphql/AddMessage.gql';
import { USER_ID, ACCESS_TOKEN } from '../settings';
import { getAccessToken, setAccessToken } from "../accessToken";

export default Vue.extend({
    name: 'login',
    props: {
    msg: String,
    },
    data () {
        return {
            skobba: false,
            isActive: true,
            username: '',
            password: '',
            submitted: false
        }
    },
    created () {
        // reset login status
        //this.logout();
    },
    methods: {
        login() {
            this.$apollo.mutate({
                // Query
                mutation: LOGIN,
                // Parameters
                variables: {
                    //input: {email:"gjermund@skobba.net", password: "pw"},
                    input: {email: this.username, password: this.password},
                },
                // Update the cache with the result
                // The query will be updated with the optimistic response
                // and then with the real result of the mutation
                update: (store, { data }) => {
                    console.log("data: " + JSON.stringify(data, null, 2)); // eslint-disable-line

                    setAccessToken(data.Login.accessToken);
                    //this.saveUserData(data.Login.user._id , data.Login.accessToken);
                    // Read the data from our cache for this query.
                    // const data = store.readQuery({ query: TAGS_QUERY })
                    // // Add our tag from the mutation to the end
                    // data.tags.push(addTag)
                    // // Write our data back to the cache.
                    // store.writeQuery({ query: TAGS_QUERY, data })


/*                     console.log("setCookie (refresh_token)"); // eslint-disable-line
                    let key = 'refresh_token';
                    let value = data.Login.accessToken;
                    let thirty = 60 * 60 * 24 * 30;
                    document.cookie = `${key}=${value};path=/;max-age=${thirty};`; // one cookie at a time */

                    this.skobba = !this.skobba;
            

                    setTimeout(() => { 
                        this.$router.push({ path: 'admin' })
                    }, 200);
                },
                // Optimistic UI
                // Will be treated as a 'fake' result as soon as the request is made
                // so that the UI can react quickly and the user be happy
                // optimisticResponse: {
                //     __typename: 'Mutation',
                //     addTag: {
                //     __typename: 'Tag',
                //     id: -1,
                //     label: newTag,
                //     },
                // },
                // }).then((data) => {
                // // Result
                // console.log(data)
                // }).catch((error) => {
                // // Error
                // console.error(error)
                // // We restore the initial user input
                // this.newTag = newTag
                // })
            
            })
        },
        saveUserData (_id: string, accessToken: string) {
            localStorage.setItem(USER_ID, _id)
            localStorage.setItem(ACCESS_TOKEN, accessToken)
            this.$root.$data.userId = localStorage.getItem(USER_ID)
        },
        handleClick(e: any) {
            console.log("handleClick"); //eslint-disable-line no-console
            this.skobba = !this.skobba;
            

            setTimeout(() => { 
                this.$router.push({ path: 'matters' })
            }, 200);


        },
        getAccessToken() {
            this.$apollo.mutate({
                // Mutation
                mutation: GET_ACCESS_TOKEN,
                // Parameters
                // variables: {
                //     input: {email:"gjermund@skobba.net", password: "pw"},
                // },

                update: (store, { data }) => {
                    //console.log("data: " + JSON.stringify(data, null, 2)); // eslint-disable-line
                    console.log("getAccessToken from refresh_token)"); // eslint-disable-line

                },
                // Optimistic UI
                // Will be treated as a 'fake' result as soon as the request is made
                // so that the UI can react quickly and the user be happy
                // optimisticResponse: {
                //     __typename: 'Mutation',
                //     addTag: {
                //     __typename: 'Tag',
                //     id: -1,
                //     label: newTag,
                //     },
                // },
                // }).then((data) => {
                // // Result
                // console.log(data)
                // }).catch((error) => {
                // // Error
                // console.error(error)
                // // We restore the initial user input
                // this.newTag = newTag
                // })
            
            })
        },
        handleSubmit(e: any) {

                //this.$router.push({ path: 'clients' })
                console.log("handleSubmit"); //eslint-disable-line no-console
                this.isActive = false;            
                this.submitted = true;
                

            // setTimeout(() => { 
            //     //alert("Hello");
            //     this.$router.push({ path: 'clients' })
            //     console.log("handleSubmit"); //eslint-disable-line no-console
            //     this.isActive = false;            
            //     this.submitted = true;

            // }, 200);

            // const { username, password } = this;
            // if (username && password) {
            //     //this.login({ username, password })
            // }
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gjermund {
        color: firebrick;
        transform: translateY(-100%);
        transition: all 0.2s;
    }
h2 {
    color: black;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.login {
    visibility: visible;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: block;
    background: #666;
    transition: all 0.2s;
    z-index: 10000000;
    /* transform: translateY(10%); */
    /* top: 0px;
    right: 0px;
    height: 10px;
    width: 100px; 
    transform: translateY(10%);*/
    transition: all 0.2s;
    
}
.active {
    /* visibility: hidden; */
    transform: translateY(-100%);
    transition: all 0.2s;
    visibility: hidden;
}
</style>
