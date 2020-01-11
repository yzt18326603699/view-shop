<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div v-for="item in message" :key="item.id" >
        <van-card @click="to(item.id)">
          <div slot="thumb" >
              <img :src="imageSrc[item.id]">
          </div>
          <div slot="title">
              <div class="title">{{item.title}}</div>
          </div>
          <div slot="price">
              <p class="price">发表时间:{{item.add_time|dateFormat}}</p>
          </div>
          <div slot="num">
              <p class="num">点击:{{item.click}}</p>
          </div>
        </van-card>
      </div>

  </van-pull-refresh> 

</template>

<script>
export default {

  data() {
    return {

      message:[],
      count: 0,
      isLoading: false,
      imageSrc:{},
    }
  },

  methods: {
    // 页面加载效果
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    // 点击新闻事件
    to(id){
      this.$router.push({path:"/newsget",query:{id}})
    },
    // 新闻数据访问
    async getList(){
      const res =  await  this.$http.get('/api/getnewslist')
      // console.log(res)
      this.message=res.message
      res.message.forEach((item,index,arr)=> {
        // console.log(item.id)
        this.imageSrc[item.id]=item.img_url
        
      })
      // console.log(this.imageSrc)
    }
  },

  created () {
    this.getList()
  },


}
</script>

<style lang='less' scoped>
  img{
    width: 42px;
    height:42px;
  }

  .van-card{
    background-color: #fff;
    border-bottom: 1px solid #eee;
    margin: 0 10px;
    padding: 10px;
  }
  // 文本区域
  .van-card__content{
    min-width: 0;
    min-height: 46px;
  }
  // 图片区域
  .van-card__thumb{
    width: 50px;
    height: 50px;
  }
  .title{
    font-size: 14px;
    font-weight: 700;
    color: #000;
    font-weight: 700;
    height: 14px;
    line-height: 16px;
    overflow: hidden;
  }
  .price {
    line-height: 30px;
    font-weight: 500;
    font-size: 12px;
    color: #226aff;
  }
  .num{
    line-height: 30px;
    font-weight: 500;
    font-size: 12px;
    color: #226aff;
  }
</style>
