import Vue from "vue"; //

//按需导入VANT组件
import {
    Button,
    NavBar,
    Tabbar,
    TabbarItem,
    Swipe, SwipeItem,
    Toast,
    Lazyload,
    Grid, GridItem
} from 'vant';

Vue.use(Button);
Vue.use(NavBar);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Toast);
Vue.use(Lazyload);
Vue.use(Grid).use(GridItem);
