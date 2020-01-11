<template>
  <div>
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white" loop>
        <van-swipe-item v-for="(image, index) in swipeList" :key="index">
          <img :src="image">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 九宫格 -->
    <!-- 宫格导航 -->
    <van-grid clickable :border="false" :column-num="3">
      <van-grid-item to="/news">
        <img src="../../assets/images/menu1.png" alt="">
        <p>新闻资讯</p>
      </van-grid-item>
      <van-grid-item to="/share">
        <img src="../../assets/images/menu2.png" alt="">
        <p>图片分享</p>
      </van-grid-item>
      <van-grid-item to="/goodslist">
        <img src="../../assets/images/menu3.png" alt="">
        <p>商品购买</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../../assets/images/menu4.png" alt="">
        <p>留言反馈</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../../assets/images/menu5.png" alt="">
        <p>视频专区</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../../assets/images/menu6.png" alt="">
        <p>联系我们</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swipeList: []
    };
  },

  methods: {
    // 请求轮播图
    async querySwipeData() {
      const res = await this.$http.get("api/getlunbo"); //请求
      // 处理结果
      console.log(res);

      if (res.status !== 0)
        return this.$toast.fail("服务器异常，请求轮播图片失败"); //failed
      // succeed 将数据保存在该组件的data中
      res.message.forEach(item => {
        this.swipeList.push(item.img);
      });
    }
  },

  created() {
    this.querySwipeData();
  }
};
</script>

<style lang='less' scoped>
body {
  background-color: #fff;
}
.banner {
  height: 220px;
  margin: 0 auto;
  overflow: hidden;
  img {
    width: 100%;
    height: 220px;
  }
}

// 宫格导航
.van-grid {
  width: 100%;
  .van-grid-item {
    img {
      width: 50% !important;
    }
    p {
      margin-top: 10px;
      font-size: 14px;
      color: #777;
    }
  }
}
</style>
