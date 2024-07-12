<script>
import listContainer from '@/pages/Home/listContainer/lC-index.vue'
import todayRecommend from '@/pages/Home/todayRecommend/tr-index.vue'
import rank from '@/pages/Home/rank/rank-index.vue'
import like from '@/pages/Home/like/like-index.vue'
import floor from '@/pages/Home/floor/floor-index.vue'
import brand from '@/pages/Home/brand/brand-index.vue'
export default {
  name: "hm-index",
  components: {
    listContainer,
    todayRecommend,
    rank,
    like,
    floor,
    brand
  }
}
</script>

<template>
  <div>
    <typeNav/>
    <list-container/>
    <todayRecommend/>
    <rank/>
    <like/>
    <floor/>
    <brand/>
  </div>
</template>

<style scoped lang="scss">

</style>