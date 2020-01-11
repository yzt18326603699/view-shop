<template>
  <div>
    <van-cell-group>
        <van-field  placeholder="请输入商品名称"  v-model="value" />
    </van-cell-group>
    <button class="van-button van-button--primary van-button--large" @click='addGoods'>
        <span class="van-button__text" >添加商品</span>
    </button>
  </div>
</template>

<script>
export default {

  data () {
    return {
      value:''
    }
  },

  methods: {
     async addGoods(){
        // console.log(this.value)
      const res=await this.$http.post('/api/addproduct',`name=${this.value}`)
      if(res.status!==0) return this.$toast.fail('失败')
      // Toast.success('成功文案');
// Toast.fail('失败文案');
      this.$toast.success('成功')
      this.value=''
      // console.log(res)
      }
  },

  created () {
  }
}
</script>

<style lang='less' scoped>

.van-button--large {
    height: 40px;
    line-height: 40px;
    margin: 40px 0;
    width: 90%;
    left:5%
}



</style>
