# demo-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Eslint
## GraphQL files
./node_modules/.bin/eslint ./src/graphql/ --ext .gql --ext .graphql           

fetch("http://localhost:3000/graphql", {"credentials":"include","headers":{"accept":"*/*","accept-language":"en,nb;q=0.9,no;q=0.8,nn;q=0.7,en-US;q=0.6","authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTNkMWNlMGUzYjA3OTBlZWM0ZWExODIiLCJpYXQiOjE1ODI0NTA1MTgsImV4cCI6MTU4MjQ1MDU3OH0.oOwjC-hBlLuGzqsu1DJGakvjvtiCiiaoRH5uRDP5MlA","content-type":"application/json","sec-fetch-mode":"cors","sec-fetch-site":"same-site"},"referrer":"http://localhost:8080/login","referrerPolicy":"no-referrer-when-downgrade","body":"{\"operationName\":\"GetAccessToken\",\"variables\":{}},\"query\":\"mutation GetAccessToken {\\n  GetAccessToken {\\n    accessToken }\\n}\\n\"}","method":"POST","mode":"cors"});


fetch("http://localhost:3000/graphql", {
      method: "POST",
      "headers": {
        "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTNkMWNlMGUzYjA3OTBlZWM0ZWExODIiLCJpYXQiOjE1ODI0NTE2ODcsImV4cCI6MTU4MjQ1MjU4N30.IfJs-BG_5ViR62DdUeiXnMw387fhWPgyyufhu4fGtAA"
      },
      credentials: "include",
      body: "{\"operationName\":\"GetAccessToken\",\"variables\":{},\"query\":\"mutation GetAccessToken {\\n  GetAccessToken {\\n    accessToken }\\n}\\n\"}"
    });

fetch("http://localhost:3000/graphql", {"credentials":"include","headers":{"accept":"*/*","accept-language":"en,nb;q=0.9,no;q=0.8,nn;q=0.7,en-US;q=0.6","authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTNkMWNlMGUzYjA3OTBlZWM0ZWExODIiLCJpYXQiOjE1ODI0NDg4NzMsImV4cCI6MTU4MjQ0OTc3M30.Z9Ihc00ibfNgVD0kU5xTS2j7a5fsWn8i1QDkz7feBOs","content-type":"application/json","sec-fetch-mode":"cors","sec-fetch-site":"same-origin"},"referrer":"http://localhost:3000/graphql","referrerPolicy":"no-referrer-when-downgrade",

"body":"{\"operationName\":null,\"variables\":{},\"query\":\"mutation {\\n  GetAccessToken {\\n    accessToken\\n  }\\n}\\n\"}",

"method":"POST",
"mode":"cors"
});



fetch("http://localhost:3000/graphql", {
      method: "POST",
      "headers": {
        "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTNkMWNlMGUzYjA3OTBlZWM0ZWExODIiLCJpYXQiOjE1ODI0NTE2ODcsImV4cCI6MTU4MjQ1MjU4N30.IfJs-BG_5ViR62DdUeiXnMw387fhWPgyyufhu4fGtAA"
      },
      credentials: "include",
      "body":"{\"operationName\":null,\"variables\":{},\"query\":\"mutation {\\n  GetAccessToken {\\n    accessToken\\n  }\\n}\\n\"}",
    });



fetch("http://localhost:3000/graphql", {"credentials":"include","headers":{"accept":"*/*","accept-language":"en,nb;q=0.9,no;q=0.8,nn;q=0.7,en-US;q=0.6","authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTNkMWNlMGUzYjA3OTBlZWM0ZWExODIiLCJpYXQiOjE1ODI0NTIzNDEsImV4cCI6MTU4MjQ1MzI0MX0.-dWXLyyg9pjAjxzEQtISACv6IhZ27fHcA3o9_h8Ixzw","content-type":"application/json","sec-fetch-mode":"cors","sec-fetch-site":"same-site"},"referrer":"http://localhost:8080/admin","referrerPolicy":"no-referrer-when-downgrade","body":"{\"operationName\":\"GetAccessToken\",\"variables\":{},\"query\":\"mutation GetAccessToken {\\n  GetAccessToken {\\n    accessToken\\n    __typename\\n  }\\n}\\n\"}","method":"POST","mode":"cors"});


# Login with REST
curl -X POST -H "Content-Type: application/json" --data '{ "email": "gjermund@skobba.net", "password": "pw" }' http://localhost:3000/login