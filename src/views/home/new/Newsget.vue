<template>
  <div class="z1">
    <div class="header">
        <h3>{{message.title}}</h3>
        <div class="timeclick">
            <div class="time">发表时间:{{message.add_time|dateFormat}}</div>
            <div class="click">点击:{{message.click}}</div>
        </div>
    </div>
    <div v-html="message.content" class="content">
        {{message.content}}
    </div>
    <div class="commentBox">
        <h4>发表评论</h4>
        <hr>
        <textarea  placeholder="请输入留言" v-model="text"></textarea>
        <van-button type="info" @click="send">发表评论</van-button>
        <div v-for="item in list" :key="item.id">
            <div class="p1">第{{item.index-0+1}}楼 用户:{{item.user_name}} 发表时间:{{item.add_time|dateFormat}}</div>
            <div class="p2">{{item.content}}</div>
        </div>
    </div>

  </div>
</template>

<script>
export default {

  data () {
    return {
        cateId:0,
        message:{},
        text:'',
        list:[],
    }
  },

  methods: {
    // 详细访问
    async gettext(){
        //   取得地址栏参数
        this.cateId=this.$route.query.id
        const res =  await  this.$http.get(`/api/getnew/${this.cateId}`)
        // console.log((res))
        this.message=res.message[0]
        // console.log(this.message)
    }, 
    // 发表评论
    async send(){
        console.log(this.text)
        const params= new URLSearchParams()
        params.append('content',this.text)
        const res= await  this.$http.post(`/api/postcomment/${this.cateId}`,params)
        if(res.status!==0) return this.$toast.fail('失败')
        console.log(res)
        this.getList()
        this.text=''
        this.$toast.success('成功');
    },
    // 获取评论列表
     async getList(){
    //    console.log(typeof(this.cateId))  
        const res=  await this.$http.get(`/api/getcomments/${this.cateId}?pageindex=1`)
        // console.log(res)
        if(res.status!==0) return this.$toast.fail('失败')
        res.message.forEach((value,index) => {
            // console.log(index)
            res.message[index]['index']=index
        });
        this.list=res.message
        // console.log(this.list)
    }
  },

  created () {
      this.gettext()  
      this.getList() 
  }
}
</script>

<style lang='less' scoped>

.z1{
    margin: 0 10px;
    .header{
        h3{
            overflow: hidden;
            color: #1989fa;
            font-size: 14px;
            text-align: center;
            line-height: 30px;
            height: 30px;
            margin: 0;
            padding: 5px 0; 
        }
        .timeclick{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: #1989fa;
            border-bottom: 1px solid #ccc;
            padding: 7px 0;
            .time{}
            .click{}
        }
    }
    .content{
        /deep/ p{
            margin-top: 16px;
            color: #535353
        }
    }
    .commentBox{
        padding: 0px 5px;
        h4{
            margin: 21px 0;
        }
        hr{
            margin: 8px 0;
            border-top: 1px solid #aaa; 
        }
        textarea{
            padding: 10px 15px;
            resize:none;
            width: 100%;
            height:100px;
            border:1px solid #ccc;
            color: #323233;
            font-size: 14px;
            line-height: 24px;
            background-color: #fff;
        }
        .van-button{
            width: 100%;
            margin: 5px 0;
        }
        .p1{
            overflow: hidden;
            height: 30px;
            background-color: #ccc;
            font-size: 12px;
            line-height: 30px;
        }
        .p2{
            line-height: 35px;
            text-indent: 2em;
            font-size: 12px;
        }
    }
}


</style>
