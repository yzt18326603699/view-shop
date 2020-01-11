import Vue from "vue"; 

//按需导入VANT组件
import {
    Button,
    NavBar,
    Tabbar,
    TabbarItem,
    Swipe, SwipeItem,
    Toast,
    Lazyload,
    Grid, GridItem, 
    
    Card,
    PullRefresh,
    Search,
    Icon,
    Divider,
    Tag,
    Cell, CellGroup ,
    SwipeCell,
    Field,
    Popup,
    Dialog,

    Tab,
    Tabs,
    Image,
    ImagePreview 
} from 'vant'


    
// 文章详情
    Vue.use(Card);
    Vue.use(PullRefresh);
    Vue.use(Tag);

// 商品搜索
    Vue.use(Search)
    Vue.use(Icon)
    Vue.use(Divider)
    Vue.use(Tag)
    Vue.use(Cell).use(CellGroup)
    Vue.use(SwipeCell)
    Vue.use(Field)
    Vue.use(Popup)
    Vue.use(Dialog)

// 图片详情
    Vue.use(Tab)
    Vue.use(Tabs)
    Vue.use(Image)
    Vue.use(ImagePreview)


Vue.use(Button);
Vue.use(NavBar);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Toast);
Vue.use(Lazyload);
Vue.use(Grid).use(GridItem);
