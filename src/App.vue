<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header/hd-index.vue";
import Footer from "@/components/Footer/ft-index.vue"
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    this.$store.dispatch('home/getCategoryList');
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
