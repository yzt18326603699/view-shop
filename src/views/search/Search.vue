<template>
  <div>
    <div class='z-tj' @click='adds'>添加</div>
    <form action="/">
      <van-search 
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
      @clear="clearSearch"
    
      />
    </form>
     <!-- 搜索历史 -->
    <div class="history">
      <p>搜索历史</p>
      <van-icon @click="deleteArr" name="delete"/>
    </div>
    <!-- 默认展示无记录 -->
    <van-divider v-if="show" :style="{ color: '#333',borderColor: '#ccc', fontSize:'16px', padding: '0 16px' }">暂无搜索历史</van-divider>
    <!-- 有搜索记录时展示 -->
    <div class="taglist" v-if="!show">
      <van-tag v-for="(item,index) in localArr" :key="index">{{item}}</van-tag>
    </div>
     <!-- 展示搜索内容 -->
    <div class="box" v-show="isShow">
      <van-cell-group v-for="item in resArr" :key="item.id">
        <van-swipe-cell :name="item.id">
          <van-cell :title="item.name">
            <template slot="default">
              <span>{{item.ctime | dateFormat}}</span>
            </template>
          </van-cell>
        </van-swipe-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      value:'',
      show: true,
      //查询到的数据
      resArr:[],
      isShow: false,
      //需要存储的值
      localArr: [] 
    }
  },

  methods: {
    // <1> 获取本地历史记录
    getHis() {
      this.localArr = JSON.parse(localStorage.getItem("history"))
        ? JSON.parse(localStorage.getItem("history")).reverse()
        : [];
      if (this.localArr.length > 0) {
        this.show = false;
      }
    },
    //搜索事件
    async onSearch(){
       if (this.value.trim() == "") return this.$toast("请输入搜索内容");
      const res = await this.$http.get("api/getprodlist");
      console.log(res);
      if (res.status !== 0) return this.$notify("服务器错误");
      this.resArr = res.message;
      if (this.resArr.length == 0) this.hasRes = true;
      this.isShow = true;
    // 把搜索过的值保存起来
      if (this.localArr.indexOf(this.value) >= 0)
        this.localArr.splice(this.localArr.indexOf(this.value), 1);
      if (this.localArr.length >= 5) this.localArr.shift();
      this.localArr.push(this.value);
      localStorage.setItem("history", JSON.stringify(this.localArr));
      this.getHis();
    },
    // 取消事件
    onCancel() {
      // 内容置空
      this.value = "";
    },
    // 可清除按钮触发的事件
    clearSearch() {
      this.value = "";
    },
    // 删除标签记录
    deleteArr() {
     this.$dialog
        .confirm({
          title: "标题",
          message: "确认清空历史记录吗？"
        })
        .then(async () => {
          this.localArr = [];
          localStorage.removeItem("history");
          this.getHis();
          this.show = true;
        })
        .catch(() => {
          this.$toast("已取消删除");
        });
    },
     adds(){
    this.$router.push('/addgoods')
  }
  },
  // 监听输入框的值
  watch: {
    value: function(newValue) {
      if (newValue.trim() == "") {
        this.isShow = false;
      }
    }
  },
  created () {
      this.getHis();
  },
 
}
</script>

<style lang='less' scoped>
.z-tj{
    position: fixed;
    top: 10px;
    font-size: 13px;
    color: #fff;
    right: 10px;
    z-index: 2;
}
.history{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  font-size: 18px;
}
.taglist {
  display: flex;
  align-items: center;
  padding: 15px 10px;
  .van-tag {
    margin: 0 5px;
  }
}
.box {
  position: fixed;
  padding: 10px;
  top: 100px;
  left: 10px;
  right: 10px;
  bottom: 70px;
  box-shadow: 0 0px 5px #eee;
  background: #fff;
}

</style>
