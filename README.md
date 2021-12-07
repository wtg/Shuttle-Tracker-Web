# Shuttle-Tracker-Web
New shuttle tracker web UI implemented in Vue.js.
View the temporary testing site [here](https://staging.web.shuttletracker.app/).
The shuttle tracker web UI does not help with crowd-sourcing location data.

## BREAKING CHANGE
If you are using Node.js version 17 and up, it uses openSSL 3.0, which is not compatible with the `vue-cli` tool. Add environmental variable `NODE_OPTIONS=--openssl-legacy-provider` for backward compatibility.

For Linux:
```
export NODE_OPTIONS=--openssl-legacy-provider
```
For Windows Powershell:
```
set NODE_OPTIONS=--openssl-legacy-provider
```

## Dependency Installation
```
npm install
```

### Compiles and hot-reloads for development
There are two development environments: `development` and `production`. 
The `development` mode gives developers access to devtools and information that isn't shown in the `production` build.
Run it with the following command:
```
npm run serve
```
To simulate the `production` build (which is how the final deployment would look like), run the following command:
```
npm run serve_prod
```

### Compiles and minifies for production
For normal `production` build, run the following command:
```
npm run build
```
To build with `development` mode, run the following command:
```
npm run build_dev
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
