<template>
  <div class="pagination">

    <button :disabled="pageStart == 1" @click="$emit('paginationChange', pageStart - 1 )">上一页</button>
    <button v-show="pageStart > 1" @click="$emit('paginationChange', 1)" :class="{active: pageStart == 1}">1</button>
    <button v-show="pageStart > 2">···</button>

    <button v-for="(page, index) in pageEnd" :key="index" v-show="page >= (pageEnd - pgdata.continue)" @click="$emit('paginationChange', page)" :class="{active: pageStart == page}">{{ page }}</button>

    <button v-show="pageEnd < pageTotal - 1">···</button>
    <button
        v-show="pageEnd < pageTotal"
        @click="$emit('paginationChange', pageTotal)"
        :class="{ active: pageStart == pageTotal }"
    >
      {{ pageTotal }}
    </button>
    <button :disabled="pageStart == pageTotal" @click="$emit('paginationChange', pageTotal)">下一页</button>

    <button style="margin-left: 30px">共 {{ pgdata.total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "pg-index",
  props: ['pgdata'],
  computed: {
    pageStart(){
      return this.pgdata.pageNo
    },
    pageEnd(){
      let end = this.pgdata.continue + this.pgdata.pageNo - 1;
      // let size = Math.ceil(this.pgdata.total/this.pgdata.pageSize);
      if(end >= this.pageTotal){
        end = this.pageTotal
      }
      return end
    },
    pageTotal(){
      return Math.ceil(this.pgdata.total/this.pgdata.pageSize);
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>