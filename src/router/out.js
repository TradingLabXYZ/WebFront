import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import idb from "@/db/idb.js"

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
    },
    beforeEnter: routeHomeIfUserHasCookie
  }, {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false,
    }
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
    }
  }
]

async function routeHomeIfUserHasCookie (to, from, next) {
  if(document.cookie.indexOf("sessionId") > -1) {
    var session_id = document.cookie.split("sessionId=")[1].split(";")[0];
    var userData = await idb.getUser(session_id);
    next("/" + userData.Username);
  } else {
    next(); 
  }
}
