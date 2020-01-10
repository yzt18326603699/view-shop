<template>
  <div id="app">
    <!-- 头部 -->
    <van-nav-bar
      title="app项目"
      :left-arrow="showArrow"
      fixed
      :left-text="backText"
      :border="false"
      @click-left="onClickLeft"
    />
    <!-- 内容 -->
    <router-view class="router"></router-view>
    <!-- 尾部 -->
    <footer class="public_footer">
      <van-tabbar router v-model="footer_active" active-color="#53bf8e" inactive-color="#888">
        <van-tabbar-item icon="wap-home" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/user">会员</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/shopCar" :info="showNums">购物车</van-tabbar-item>
        <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footer_active: 0,
      showArrow: true,
      showNums: 0,
      backText: ""
    };
  },
  methods: {
    // 点击左侧箭头后退
    onClickLeft() {
      this.$router.go(-1);
    },
    // 根据跳转的路径判断 是否显示左侧箭头
    checkBar() {
      if (
        this.$route.path == "/home" ||
        this.$route.path == "/user" ||
        this.$route.path == "/shopcar" ||
        this.$route.path == "/search"
      ) {
        this.showArrow = false;
        this.backText = "";
      } else {
        this.showArrow = true;
        this.backText = "返回";
      }
    }
  },
  watch: {
    // <1> 监视路由变化, 控制返回按钮的显示与隐藏
    $route(to, from) {
      if (
        to.path == "/home" ||
        to.path == "/user" ||
        to.path == "/shopcar" ||
        to.path == "/search"
      ) {
        this.showArrow = false;
        this.backText = "";
      } else {
        this.showArrow = true;
        this.backText = "返回";
      }
    }
  },
  created() {
    this.checkBar();
  }
};
</script>
<style lang="less">
.router {
  padding: 45px 0 50px 0;
}
.van-nav-bar {
  background: linear-gradient(to right, #0ab871, #0ad0a6);
  .van-nav-bar__title {
    font-weight: 700;
    color: #fff;
  }
  .van-nav-bar__text {
    font-weight: 700;
    color: #fff;
  }
  .van-icon {
    color: #eee !important;
  }
}
.van-tabbar {
  border-top: 1px solid #eee;
}
</style>
