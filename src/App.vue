<template>
  <div id="app">
    <Header></Header>
    <Footer></Footer>
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
  }
}
</script>

<style>
</style>
