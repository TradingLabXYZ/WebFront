import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import '@/assets/css/tailwind.css'
Vue.config.productionTip = true;
Vue.config.devtools = true;
Vue.config.performance = true;
Vue.use(VueMeta);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
