import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import typeNav from '@/components/typeNav/tn-index'
import carouselList from "@/components/Carousel/ca-index";
import pagination from "@/components/Pagination/pg-index.vue"
import store from "@/store";
import "@/mock/mockServe"
import "swiper/swiper-bundle.css"
Vue.config.productionTip = false
Vue.component('typeNav', typeNav);
Vue.component('carouselList', carouselList);
Vue.component('pageBreak', pagination);
new Vue({
  render: h => h(App),
  beforeMount() {
    Vue.prototype.$bus = this;
  },
  router,
  store
}).$mount('#app')
