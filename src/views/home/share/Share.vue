<template>
  <div>
    <!-- 标签栏模块 -->
    <van-tabs v-model="activeName">
      <van-tab
        v-for="(item,i) in picCate"
        :name="item.id"
        :title="item.title "
        :key="i"
         @click="changeTab"  
      >
     
        <!-- 内容 {{ }} -->
        <!-- 内容区 -->
        <!-- <img v-for="img in imageList" v-lazy="img" :textarea='textarea'> -->
        <div v-for="(item,i) in picList" class="divpic" :key="i">
          <van-image lazy-load :src="item.img_url" @click="detailpic(item.id)" />
          <div class="divpic1">{{item.title}}</div>
          <p class="divpic2">{{item.zhaiyao}}</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 图文列表
      picList: [],
      //图片分类列表
      picCate: [],
      activeName: 0
    };
  },

  created() {
    //图片列表
    this.getpicList();
    // 图片分类
    this.getImgCategory();
  },

  methods: {
    // 图文列表
    async getpicList() {
      const result = await this.$http.get(`/api/getimages/${this.activeName}`);
      //console.log(result)
      if (result.status != 0) return Toast.fail("获取图文列表数据失败");
      //否则
      this.picList = result.message;
      console.log(this.picList);
      // this.picList.forEach(item => {
      //   this.imageList.push(item.img_url);
      // });
    },
    //  获取图片分类函数
    async getImgCategory() {
      const resCate = await this.$http.get("/api/getimgcategory");
      // console.log(resCate)
      if (resCate.status != 0) return Toast.fail("获取商品分类数据失败");
      //否则
      resCate.message.unshift({ title: "全部", id: 0 });
      this.picCate = resCate.message;
      console.log(this.picCate);
    },
    changeTab(name) {
      this.activeName = name;
    },
    // 点击跳转到详情页
    detailpic(id) {
       //console.log(id);

      this.$router.push({path:'/detail',query:{id:id}})
    }
  }
};
</script>

<style lang='less' scoped>
.van-image {
  width: 100%;
}
.van-tab {
  position: fixed;
  top: 20px;
}
.divpic {
  position: relative;
  font-size: 14px;
  color: #fff;
}
.divpic1 {
  position: absolute;
  bottom: 85px;
}
.divpic2 {
  position: absolute;
  bottom: -4px;
}
</style>
