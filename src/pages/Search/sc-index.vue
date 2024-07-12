<script>
export default {
  name: "sc-index",
  mounted() {
    console.log(this.$route.params.keyword);
  }
}
</script>

<template>
  <div>我是搜索页</div>
</template>

<style scoped lang="scss">

</style>