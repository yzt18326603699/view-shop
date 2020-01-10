import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import Search from '../views/search/Search.vue'
import Shop from '../views/shop/shopCar.vue'
import User from '../views/user/Users.vue'
import News from '../views/home/new/News.vue'
import Share from '../views/home/share/Share.vue'
import Goodslist from '../views/home/goods/Goodslist.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  // 首页
  {
    path: '/home',
    component: Home
  },
  // 搜索
  {
    path: '/search',
    component: Search
  },
  // 购物车
  {
    path: '/shopCar',
    component: Shop
  },
  // 用户
  {
    path: '/user',
    component: User
  },
  // 新闻资讯
  {
    path: '/news',
    component: News
  },
  // 图片分享
  {
    path: '/share',
    component: Share
  },
  // 商品购买
  {
    path: '/goodslist',
    component: Goodslist
  }

]

const router = new VueRouter({
  routes
})

export default router
