<template>
  <div id="app">
   <Header></Header>
   <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header/headIndex.vue";
import Footer from "@/components/Footer/footerIndex.vue";
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
