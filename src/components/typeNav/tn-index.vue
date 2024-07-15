<script>
import {mapState} from "vuex";
import {throttle} from "@/commonJS";

export default {
  name: "tn-index",
  data() {
    return {
      currentIndex: -1,
      isShow: true
    }
  },
  mounted(){
    if(this.$route.path.includes('search')){
      this.isShow = false;
    }
  },
  computed: {
    // ...mapState({
    //   count: state => state.home.count
    // })
    // ...mapState('home', {
    //   count: state => state.count,
    //   categoryList: state => state.categoryList
    // })
    ...mapState('home', ['count','categoryList'])
  },
  methods: {
    //列表切换
    changeIndex: throttle(function (index){
      this.currentIndex = index;
    }, 50),
    //列表显示或隐藏
    showList(){
      if(!this.$route.path.includes('home')){
        this.isShow = true;
      }
    },
    hideList(){
      this.currentIndex = -1;
      if(!this.$route.path.includes('home')){
        this.isShow = false;
      }
    },
    //跳转搜索页
    goSearchPage(event){
      let target = event.target;
      let {catename, catelevel, cateid} = target.dataset;
      if(catename){
        this.$router.push({name: 'Search', query: {categoryName: catename, categoryLevel: catelevel, categoryId: cateid}});
      }
      // this.$router.push({name:'Search', params: {keyword: this.searchKeyword}, query: {k: this.searchKeyword}});
    },

  }
}
</script>

<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="showList" @mouseleave="hideList">
        <h2 class="all" >全部商品分类</h2>
        <div class="sort" @mouseleave="changeIndex(-1)" v-show="isShow">
          <div class="all-sort-list2" @click="goSearchPage">
            <div class="item" v-for="(oneItem, index) in categoryList" :key="oneItem.categoryId" :class="{curBgColor:currentIndex==index}">
              <h3 @mouseenter="changeIndex(index)">
                <a :data-catename="oneItem.categoryName" data-catelevel="1" :data-cateid="oneItem.categoryId">{{ oneItem.categoryName }}</a>
              </h3>
              <div class="item-list clearfix" v-show="currentIndex == index">
                <div class="subitem" v-for="towItem in oneItem.categoryChild" :key="towItem.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-catename="towItem.categoryName" data-catelevel="2" :data-cateid="towItem.categoryId">{{towItem.categoryName}}</a>
                    </dt>
                    <dd>
                      <em  v-for="threeItem in towItem.categoryChild" :key="threeItem.categoryId">
                        <a :data-catename="threeItem.categoryName" data-catelevel="3" :data-cateid="threeItem.categoryId">{{ threeItem.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            //display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //&:hover {
          //  background-color: deepskyblue;
          //  .item-list {
          //    display: block;
          //  }
          //}
        };
        .curBgColor {
          background-color: deepskyblue;
        }
      }
    }
  }
}
</style>