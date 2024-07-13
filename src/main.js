import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import typeNav from '@/components/typeNav/tn-index'
import store from "@/store";
Vue.config.productionTip = false
Vue.component('typeNav', typeNav);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
