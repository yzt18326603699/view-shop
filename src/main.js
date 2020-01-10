import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/global.css"
import "./plugins/vant.js"; //导入vant配置文件

import axios from "axios"

// 设置axios请求基准地址
axios.defaults.baseURL = "http://www.liulongbin.top:3005/"
// 设置axios响应拦截器 
axios.interceptors.response.use(response => {
  return response.data; //筛选axios打包数据
});

Vue.prototype.$http = axios
// 全局过滤器
Vue.filter("dateFormat", val => {
  // 格式化时间
  const D = new Date(val)
  const y = D.getFullYear()
  const m = (D.getMonth() + 1).toString().padStart(2, "0")
  const d = D.getDate().toString().padStart(2, "0")
  const h = D.getHours().toString().padStart(2, "0")
  const mm = D.getMinutes().toString().padStart(2, "0")
  const s = D.getSeconds().toString().padStart(2, "0")
  return `${y}-${m}-${d} ${h}:${mm}:${s}`;
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
