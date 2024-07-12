import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import typeNav from '@/pages/Home/typeNav/tn-index'
Vue.config.productionTip = false
Vue.component('typeNav', typeNav);
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
