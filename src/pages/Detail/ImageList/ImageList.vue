<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(imgItem, imgIndex) in skuImageList" :key="imgItem.id">
        <img :src="imgItem.imgUrl" :class="{active: currentIndex == imgIndex}" @click="changeIndex(imgIndex)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper/bundle";

  export default {
    name: "ImageList",
    props: ['skuImageList'],
    data(){
      return {
        currentIndex: 0
      }
    },
    methods: {
      changeIndex(index) {
        console.log(this);
        this.currentIndex = index;
        this.$bus.$emit("getIndex", this.currentIndex);
      },
    },
    watch: {
      skuImageList() {
        this.$nextTick(() => {
           new Swiper(document.querySelector(".swiper"), {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
             slidesPerView : 5,
             // 每一次切换图片个数
            // slidesPerGroup: 1,
          });
        });
      },
    },
  }
</script>

<style lang="scss" scoped>
  .swiper {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>