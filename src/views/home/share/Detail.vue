<template>
  <div class="main">

    <div class="divz" v-for="(item,i) in DetailList" :key="i">
      <p class="detailP">{{item.title}}</p>
      <div class="detailSpan">
        <span class="detailspan1">
          发表时间:
          {{item.add_time.substr(0,10)}}
        </span>
        <span class="detailspan2">点击:{{item.click}}</span>
      </div>
      <hr />
      <!-- 缩率图 -->
      <ul class="clearfix">
        <li v-for="(item,i) in DetailSuolv" :key="i" class="suolvli">
          <img :src="item.src" alt @click='imageshow(index)'/>
        </li>
      </ul>

      <!-- 内容描述区 -->
      <div v-html="item.content"></div>

      <!-- 图片预览功能 -->
          <!-- <van-image-preview
        v-model="show"
        :images="images"
        @change="onChange"
      >
        <template v-slot:index>第{{ index }}页</template>
      </van-image-preview> -->

      <van-image-preview ></van-image-preview>

      <h4>发表评论</h4>
      <hr />
      <!-- 文本域 -->
      <textarea placeholder="请输入留言内容" class="txt"></textarea>
      
      <!-- 按钮 -->
      <van-button type="info" class="btn" @click="fabiao">发表评论</van-button>
      <!-- 评论列表 -->
      <div v-for="(item,i) in  pinglunList" :key="i" class="pinlundiv">
        第
        <span>{{i+1}}</span>楼 用户:
        <span>{{item.user_name}}</span>发表时间:
        <span>{{item.add_time.substr(0,10)}}</span>
        <p>{{item.content}}</p>
      </div>
      <!-- 加载更多 -->
      <a href="javascript:;" class="load" @click="load">加载更多</a>
    </div>
  </div>
</template>

<script>

// 单独引入
import { ImagePreview } from 'vant';



export default {
  data() {
    return {
      DetailList: [],
      //缩率图数组
      DetailSuolv: [],
      //获取评论
      pinglunList: [],
      // show: false,
      show: false,
      index: 0,
      images: [],

      pageindex: 1
    };
  },
  created() {
    console.log(this.$route.query.id);
    this.getDetailList();
    //图片缩略图
    this.getDetailSuolv();
    //获取评论
    this.getPinlun();
   
  },
  methods: {
    imageshow(index){
      
        ImagePreview({
          // 'https://img.yzcdn.cn/1.jpg',
          // 'https://img.yzcdn.cn/2.jpg'
          images:this.images,
          startPostion:index
        });
    },
    async getDetailList() {
      const result = await this.$http.get(
        `/api/getimageInfo/${this.$route.query.id}`
      );
      if (result.status != 0) return Toast.fail("获取详情页数据失败");
      //console.log(result);
      this.DetailList = result.message;
      console.log(this.DetailList);
    },
    //获取缩率图
    async getDetailSuolv() {
      const result = await this.$http.get(
        `/api/getthumimages/${this.$route.query.id}`
      );
      //console.log(result)
      if (result.status != 0) return Toast.fail("获取缩率图失败");
      //否则
      this.DetailSuolv = result.message;
      //console.log(this.DetailSuolv);
      this.DetailSuolv.forEach(value => {
        this.images.push(value.src);
      });
      console.log(this.images);
    },
    // 获取评论
    async getPinlun() {
      const result = await this.$http.get(
        `/api/getcomments/${this.$route.query.id}?pageindex=${this.pageindex}`
      );
      //  console.log(result)
      if (result.status != 0) return Toast.fail("获取评论失败");
      //否则
      this.pinglunList = result.message;
      console.log(this.pinglunList);
    },

    // onChange(index) {
    //   this.index = index;
    // },

    //发表评论
    async fabiao() {
      var txt = document.querySelector(".txt");
      var txtvalue = txt.value;
      console.log(txtvalue);
      //  const result=await  this.$http.post(`/api/postcomment/${this.$route.query.id}`,{content:txtvalue})
      // console.log(result)
      var params = new URLSearchParams();
      params.append("content", txtvalue);

      const result = await this.$http.post(
        `/api/postcomment/${this.$route.query.id}`,
        params
      );
      console.log(result);
      //把数据放到评论数组列表中
      // this.pinglunList.push(txtvalue)
      // //清空留言区域内容
      txt.value = "";
      //再次刷新品论列表数据
      this.getPinlun();
    },
    //加载更多
    async load() {
      this.pageindex++;
      //发送服务器请求
      const result = await this.$http.get(
        `/api/getcomments/${this.$route.query.id}?pageindex=${this.pageindex}`
      );
      console.log(result);
      //  if(result.status!=0) return Toast.fail("获取更多评论失败");
      //  //否则
      result.message.forEach(value => {
        this.pinglunList.push(value);
      });
    }
  }
};
</script>


<style lang="less" scoped>
.detailP {
  color: #26a2ff;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
  margin: 25px 0;

  height: 10px;
}
.detailspan1 {
  float: left;
  font-size: 12px;
  color: #8f8f94;
}
.detailspan2 {
  float: right;
  font-size: 12px;
  color: #8f8f94;
}
.detailSpan {
  padding: 0 10px;
  margin: 25px 0;
  height: 10px;
}

.main {
  padding: 50px 10px;
}
.suolvli {
  width: 90px;
  height: 90px;
  float: left;
  margin: 5px;
}
.suolvli img {
  width: 100%;
}
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
textarea {
  width: 100%;
  height: 100px;
}
.btn {
  width: 100%;
  border-radius: 5px;
}
.pinlundiv {
  font-size: 12px;
  background-color: #ccc;
  margin-top: 5px;
}
.pinlundiv p {
  background-color: #fff;
}
.load {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #ffa1a1;
  color: #ff4444;
  margin: 15px auto;
}
</style>