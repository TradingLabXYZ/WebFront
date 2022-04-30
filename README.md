# Purpose
This repository contains the frontend of TradingLab.

It is written in Typescript using Vuejs as framework.

The code is hosted on Stormkit.

There are two main branches: production and staging.

## Architecutre

This webapp follows a typical Vuejs structure.

There is a store divided into modules:
- User Module
- Metamask Module
- Contract Module

Every time a user connects Metamask, a new session is created. 

Each session has its own id, which is stored three times:
- in the backend database
- in a frontend cookie
- in a frontend indexeddb

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

### Test
```
jest
```

To run a specific test, for example only about *Connect.vue*:
```
jest Connect.vue
``` 

or even more specifically to a single test:
```
jest Connect.vue -t=loginMetamask
``` 

### Upgrade node and solve vulnerabilities

``` 
yarn-audit-fix
yarn audit
yarn upgrade
```
