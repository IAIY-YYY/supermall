<template>
    <div id="home">
        <!-- 上导航栏 -->
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <!-- 设置一个额外的 tab-control -->
        <tab-control class="tab-control" ref="tabControl1"
                                :titles="['流行','新款','精选']"
                                @tabClick="tabClick" v-show="isTabFixed"/>

        <!-- 将better-scroll封装一层,以便后期方便管理 -->
        <!-- :probe-type 加：是确定数字类型，如果不加：，则都是统一默认为字符串 -->
            <scroll class="content" 
                    ref="scroll" 
                    :probe-type="3" 
                    @scroll="contentScroll"
                    :pull-up-load="true"
                    @pullingUp="loadMore">
                <!-- 抽取轮播图信息，简化组件树 -->
                <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
                <!-- Home第二层信息展示 -->
                <recommend-view :recommends="recommends"/>
                <!-- 本周流行图片 -->
                <feature-view></feature-view>
                <!--  '流行','新款','精选' 选项栏-->
                <!-- 子组件发送的是tabClick事件，所以需要监听的是tabClick，而不是click -->
                <tab-control ref="tabControl2"
                                :titles="['流行','新款','精选']"
                                @tabClick="tabClick"/>
                <!-- 动态确定goods数组的内容 -->
                <goods-list :goods="showGoods"/>
            </scroll>

        <!-- 无法直接监听组件，如果要监听组件需要接上修饰符.native -->
        <back-top @click.native="backClick" v-show="isShowbackTop"/>
    </div>
</template>

<script>
// Home子组件
import HomeSwiper from './childCompos/HomeSwiper.vue'
import RecommendView from './childCompos/RecommendView.vue'
import FeatureView from './childCompos/FeatureView.vue'

// 公共的组件或文件组件
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

// 额外的数据导入
import {
        getHomeMultidata,
        getHomeGoods
    } from 'network/home.js'
//mixin.js中使用 
import {debounce} from 'common/utils.js'
import {itemListenerMixin} from 'common/mixin.js'


export default {
    components:{
        TabControl,
        NavBar,
        GoodsList,
        Scroll,
        BackTop,

        HomeSwiper,
        RecommendView,
        FeatureView,
       
        
    },
    data () {
        return {
            /* 逐个获取数据存储 */
            banners:[],/* 轮播图数据 */
            recommends:[],/* 推荐图数据 */
            // 创建数据存放模型
            goods:{
                'pop':{page:0,list:[]},/* 流行页数据存放 */
                'new':{page:0,list:[]},/* 新款页数据存放 */
                'sell':{page:0,list:[]},/* 精选页数据存放 */
            },
            currentType:'pop',/* 默认创建一个当前类型 */
            isShowbackTop:false,/* 创建 backTop 是否显示*/
            taboffsetTop:0,/* 用来动态存储tab-control距离 */
            isTabFixed:false,/* 用来判断tab-control的显示 */
            saveY:0,/* keep-alive两个生命周期保存的比变量 */
            //itemImagListenner:null,/* 存储goodsListitem发射过来的事件  Mixin中*/
        }
    },
    // 生命周期函数，组件创建完毕执行
    created(){
        // 1.请求多个数据
        this.getHomeMultidata();
        //2.请求商品数据
        // 获取第一页数据  当想要获取第二页数据数，可以通过设置上拉加载更过 获取后面页码的数据
        this.getHomeGoods('pop');/* 当前为  type=pop&page=1 */
        this.getHomeGoods('new');/* 当前为  type=new&page=1 */
        this.getHomeGoods('sell');/* 当前为  type=sell&page=1 */
    },
    // mixin混入
    mixins: [itemListenerMixin],
    mounted () {

        /* 
            图片加载完成的事件监听
        */
        //防抖动
        // 200毫秒内执行多少次refresh函数
        // 此步操作移入混入函数mixin中操作
        // const refresh = debounce(this.$refs.scroll.refresh,200)

        // // 对监听的事件进行保存
        // this.itemImagListenner = ()=>{
        //     // console.log(this.$refs.scroll.refresh)
        //     // img图片执行一次@load，就执行一次refresh    
        //     // 
        //     // this.$refs.scroll.refresh()   会出现未知报错
        //     // 这里的refresh执行太多次，有多少图片刷新就执行多少次，需要进行优化
        //     // this.$refs.scroll && this.$refs.scroll.refresh()/* 解决报错 */

        //     /* 优化后的结果 */
        //     refresh()
        // }

        // // create中创建的话获取不到信息。Dom元素还没有挂载
        // // 3.监听item中图片的加载完成
        // this.$bus.$on('itemImagLoad', this.itemImagListenner)
    },
    // 生命周期 —— 组件摧毁时执行内容
    destroyed(){
        console.log("-------------")
    },
    // keep-alive存在时存在的生命周期
    // 组件活跃时
    activated () {
        // 返回原来的位置
        this.$refs.scroll.scrollTo(0,this.saveY,1)
        // 2.用来刷新界面，防止出现界面无法滚动问题
        this.$refs.scroll.refresh()
    },
    // keep-alive存在时存在的生命周期
    // 组件不活跃时
    deactivated () {
        //1.组件不活跃时动态获取滚动位置的距离
        this.saveY = this.$refs.scroll.getScrollY()
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    methods:{
        /* 
            事件监听相关
         */
        // TabControl中的$emit传入的参数index
        tabClick(index){
            // switch用来指定当前Home的内容展示
            switch (index) {
                case 0:
                    this.currentType = 'pop'
                    break;
                case 1:
                    this.currentType = 'new'
                    break;
                case 2:
                    this.currentType = 'sell'
                    break;
            }
            // 同步两个tabControl 点击时一直选项
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
        },
        backClick(){
            /* 
                通过ref获取子组件中scroll的对象并调用scrollTo()方法 
                scrollTo(x,y,time)
            */
            // this.$refs.scroll.scroll.scrollTo(0,0,500)
            // 稍微封装，提高可读性
            this.$refs.scroll.scrollTo(0,0)
        },
        // Scroll中的$emit传入的事件获取数据position
        contentScroll(position){
            // 1.判断BackTop是否显示
           this.isShowbackTop = -(position.y)>600

            //2.决定tabControl是否吸顶(position:fixed)
            this.isTabFixed = (-position.y)>this.taboffsetTop
        },
        // 上拉加载更多   
        loadMore(){
            // 封装好的方法，直接改变页数即可
            this.getHomeGoods(this.currentType);

            /* 
                更换为使用$bus监听img图片更新，解决卡顿问题

                如果不调用这个refresh()方法，当上拉加载更多地时候出现数据，则无法继续向下拉
                因为最初的时候scroll已经最初获取到初始高度，当加载更多的时候，异步操作图片还没有加载完成，
                但是组件已经加载，使得容器高度撑大，所以会出现无法继续向下拉的bug。
                调用refresh()方法，自动刷新容器高度，解决bug

                refresh()  会自动根据最新的高度来刷新界面
            */
            // this.$refs.scroll.scroll.refresh()
        },
        swiperImageLoad(){
             /* 
                获取tabControl的offsetTop   动态获取组件高度
                所有组件都有一个属性$el:用于获取组件中的元素
            */
            //保存获取的值   
            this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
        },
        /* 
            网络请求相关
        */
        // 再进行封装一层
        getHomeMultidata(){
            //  getHomeMultidata()返回的config完成后内部会自动执行Promise 的 resolve()
            getHomeMultidata().then(res =>{
            // console.log(res);
            /* 存储数据，防止数据被回收 */
            // 轮播图数据
            this.banners = res.data.banner.list/* 获取res.data中的banner数据 */
            this.recommends = res.data.recommend.list
            }) 
        },
        getHomeGoods(type){
            // 获取goods中的page再加上 1    
            const page = this.goods[type].page +1
            getHomeGoods(type,page).then(res=>{
                // ...Array 是解析结构，特殊语法,可以将数组中的内容一个个解析出来
                this.goods[type].list.push(...res.data.list)
                // 原page加上1，page为获取数据的页码  之后还有2,3页内容需要获取
                this.goods[type].page += 1

                 /* 
                    每次触发 pullingUp 钩子后，
                    你应该主动调用 finishPullUp() 告诉 BetterScroll 准备好下一次的 pullingUp 钩子。
                */
                this.$refs.scroll.finishPullUp();
            })
        }
    }
}
</script>

<style scoped>
#home{
    /* padding-top: 44px;外边距 */
    height: 100vh;/* vh视口  获取当前界面高度*/
    position: relative;  
}
.home-nav{
    background-color: pink;
    color: #fff;


    /* 
        元素会被移出正常文档流，并不为元素预留空间，
        而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。
        元素的位置在屏幕滚动时不会改变。
        打印时，元素会出现在的每页的固定位置

        fixed总是以body为定位时的对象，
        总是根据浏览器的窗口来进行元素的定位，通
        过"left"、 "top"、 "right"、 "bottom" 属性进行定位。
     */
    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
}
/* 使用better-scroll失效，无法检测到具体情况 */
.tab-control{
    /* 
    position: static; 默认定位
    position: relative;相对定位
    position: absolute; 绝对定位
    position: fixed;
    
    粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。
     position: sticky;粘性定位
    以windows窗口为父容器，必须指定一个位置top|bottom|left|right  当滚动到相对位置时，转换为绝对定位
    */
    /* position: sticky;
    top: 44px;
    z-index: 9;    弃用了       */

    position: relative;
    z-index: 9;
}
.content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 44px;
    left: 0;
    right: 0;
}

/* 动态计算 设置滚动高度 */
/*
.content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 0px;
} */
</style>