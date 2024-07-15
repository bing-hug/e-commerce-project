<script>
import listContainer from '@/pages/Home/listContainer/lC-index.vue'
import todayRecommend from '@/pages/Home/todayRecommend/tr-index.vue'
import rank from '@/pages/Home/rank/rank-index.vue'
import like from '@/pages/Home/like/like-index.vue'
import floor from '@/pages/Home/floor/floor-index.vue'
import brand from '@/pages/Home/brand/brand-index.vue'
import { mapState } from "vuex";

export default {
  name: "hm-index",
  components: {
    listContainer,
    todayRecommend,
    rank,
    like,
    floor,
    brand
  },
  mounted() {
    this.$store.dispatch('home/getFloorList');
  },
  computed: {
    ...mapState('home', ['floorList'])
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
    <floor v-for="floor in floorList" :key="floor.id" :floor="floor"/>
    <brand/>
   </div>
</template>

<style scoped lang="scss">

</style>