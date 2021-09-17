import HomeOut from '../views/HomeOut.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

export default [
  {
    path: '/',
    name: 'HomeOut',
    component: HomeOut
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
