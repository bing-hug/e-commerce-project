import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import typeNav from '@/components/typeNav/tn-index'
import carouselList from "@/components/Carousel/ca-index";
import store from "@/store";
import "@/mock/mockServe"
import "swiper/swiper-bundle.css"
Vue.config.productionTip = false
Vue.component('typeNav', typeNav);
Vue.component('carouselList', carouselList);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
