import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMatomo from 'vue-matomo'
import '@/assets/css/tailwind.css'
Vue.config.productionTip = true;
Vue.config.devtools = true;
Vue.config.performance = true;
Vue.use(VueMatomo, {
  host: "https://analytics.tradinglab.xyz",
  siteId: 1,
  router: router
});
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
