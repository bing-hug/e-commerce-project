<script>
import { mapGetters } from "vuex";

export default {
  name: "hd-index",
  data(){
    return {
      searchKeyword: ''
    }
  },
  methods: {
    goSearchPage(){
      this.$router.push({name:'Search', params: {keyword: this.searchKeyword}, query: {}});
    },
    async logout(){
      await this.$store.dispatch('user/logout');
      this.$router.push({name: 'Login'});
    }
  },
  computed: {
    ...mapGetters('user', ['userName'])
  }
}
</script>

<template>
  <!-- 头部 -->
  <header class="header">
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link class="login" to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ userName }} </a> |
            <a @click="logout" style="color: red">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <router-link to="/cartList">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>

    <!--搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/">
            <img src="./images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="search" class="input-error input-xxlarge" v-model="searchKeyword"/>
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearchPage()">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<style scoped lang='scss'>
.header {
  &>.top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .login{
            padding: 0 5px;
            color: #ea4a36;
          }

          .register {
            @extend .login;
            border-left: 1px solid #b3aeae;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          &+a {
            border-left: 1px solid #b3aeae;
          }
        }

      }

    }
  }

  &>.bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>