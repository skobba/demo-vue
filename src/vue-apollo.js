import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client'
import ApolloClient, { DefaultOptions } from 'apollo-client';
import { ApolloLink, concat, split } from 'apollo-link';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getAccessToken, setAccessToken } from "./accessToken";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

// Http endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:3000/graphql'
// Files URL root
export const filesRoot = process.env.VUE_APP_FILES_ROOT || httpEndpoint.substr(0, httpEndpoint.indexOf('/graphql'))

Vue.prototype.$filesRoot = filesRoot

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  //wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'ws://localhost:3000/graphql',
  wsEndpoint: null,
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  // link: myLink

  // Override default cache
  // cache: myCache

  // Override the way the Authorization header is set
  // getAuth: (tokenName) => ...

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
}
// const link = new TokenRefreshLink({
//   accessTokenField: 'accessToken',
//   isTokenValidOrUndefined: () => boolean,
//   fetchAccessToken: () => Promise<Response>,
//   handleFetch: (accessToken: string) => void,
//   handleResponse?: (operation, accessTokenField) => response => any,
//   handleError?: (err: Error) => void,
// });

const linkRefresh = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {

    console.log("isTokenValidOrUndefined");  // eslint-disable-line

    const token = getAccessToken();

    if (!token) {
      return false;
    }

    console.log("isTokenValidOrUndefined - 2");  // eslint-disable-line

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        console.log("isTokenValidOrUndefined - FALSE - need update");  // eslint-disable-line
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    console.log("fetchAccessToken");  // eslint-disable-line

    return fetch("http://localhost:3000/refresh_token", {
      method: "POST",
      credentials: "include"
    });

    // return fetch("http://localhost:3000/graphql", {"credentials":"include","headers":{"accept":"*/*","accept-language":"en,nb;q=0.9,no;q=0.8,nn;q=0.7,en-US;q=0.6","authorization": getAccessToken(),"content-type":"application/json","sec-fetch-mode":"cors","sec-fetch-site":"same-site"},"referrer":"http://localhost:8080/admin","referrerPolicy":"no-referrer-when-downgrade","body":"{\"operationName\":\"GetAccessToken\",\"variables\":{},\"query\":\"mutation GetAccessToken {\\n  GetAccessToken {\\n    accessToken\\n    __typename\\n  }\\n}\\n\"}","method":"POST","mode":"cors"});

    // return fetch("http://localhost:3000/graphql", {
    //   method: "POST",
    //   credentials: "include",
    //   body: "{\"operationName\":\"GetAccessToken\",\"variables\":{},\"query\":\"mutation GetAccessToken {\\n  GetAccessToken {\\n    accessToken }\\n}\\n\"}"
    // });
  },
  handleFetch: accessToken => {
    console.log("handleFetch");  // eslint-disable-line
    setAccessToken(accessToken);
  },
  handleError: err => {
    // eslint-disable-next-line no-console
    console.warn("Your refresh token is invalid. Try to relogin");
    // eslint-disable-next-line no-console
    console.error(err);
  }
})

const authMiddleware = new ApolloLink((operation, forward) => {

  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: getAccessToken()
    }
  });
  return forward(operation);
})

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
});

//const link = new HttpLink({ uri: 'http://localhost:3000/graphql' });

// Call this in the Vue app file
export function createProvider (options = {}) {
  // Create apollo client with: vue-cli-plugin-apollo/graphql-client
/*   const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  }) */

  const defaultApolloClientOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

  const apolloClient = new ApolloClient({
    link: ApolloLink.from([linkRefresh, authMiddleware, link]),
    //link: concat(authMiddleware, link),
    cache: new InMemoryCache()
    //,defaultOptions: defaultApolloClientOptions
  });

  //apolloClient.wsClient = wsClient

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler (error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
  })

  return apolloProvider
}

// Manually call this when user log in
export async function onLogin (apolloClient, token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
}

// Manually call this when user log out
export async function onLogout (apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN)
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  }
}
