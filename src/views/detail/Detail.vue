<template>
    <div id="detail">
        <!-- 导航栏显示 -->
        <detail-navbar class="detail-nav" @titleClick="titleClick" ref="nav"/>

        <!-- scroll必须要有固定的高度 -->
        <scroll class="content" ref="scroll" 
                @scroll="contentScroll" 
                :probe-type="3" >
        <!-- 1.轮播图显示  -->
        <detail-swiper :topImages="topImages"/>
        <!-- 2.商品信息数据显示 -->
        <detail-base-info :goods="Goods"/>
        <!-- 3.商品店铺信息显示 -->
        <detail-shop-info :shop="shop"/>
        <!-- 4.商品的详细数据 -->
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
        <!-- 5.参数的信息 -->
        <detail-param-info :paramInfo="paramInfo" ref="params"/>
        <!-- 6.评论信息 -->
        <deatil-comment-info :commentInfo="commentInfo" ref="comment"/>
        <!-- 7.推荐商品信息 -->
        <goods-list :goods="recommends" ref="recommend"/>
        </scroll>
        
        <!-- 下导航栏，点击加入购物车 -->
        <detail-buttom-bar @addToCart="addToCart"/>

        <!-- 无法直接监听组件，如果要监听组件需要接上修饰符.native 在mixin中-->
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        
        <!-- 弹窗 -->
        <!-- <toast :message="message" :show="show"></toast> -->

    </div>
</template>

<script>
// 导入子组件
import DetailNavbar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DeatilCommentInfo from './childComps/DeatilCommentInfo.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import DetailButtomBar from './childComps/DetailButtomBar.vue'

// import Toast from 'components/common/toast/Toast.vue'

import Scroll from 'components/common/scroll/Scroll.vue'

//导入数据
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
import {debounce} from 'common/utils.js'



export default {
    name:'Detail',/* 创建name ，标记exclude */
    components: { 
        DetailNavbar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,  
        DeatilCommentInfo,
        Scroll,
        GoodsList,
        DetailButtomBar,
        // Toast
    }, 
    data () {
        return {
            iid:null,
            topImages:[],/* 存储轮播图片数据 */
            /* 
                存放轮播图下的商品详细信息数据(因数据获取路径不同，
                故创建一个对象来统一保存，方便后面组件获取)
                undefined和null无法转换为object
             */
            Goods:{},/* 商品信息 */
            shop:{},/* 店铺信息 */
            detailInfo:{},/* 商品的详细数据 */
            paramInfo: {},/* 参数信息 */
            commentInfo:{},/* 评论信息 */
            recommends:[],/* 推荐数据 */
            //itemImagListenner:null,/* 存储goodsListitem发射过来的事件  Mixin中*/
            themeTopYs:[],/*获取对应的offsettop，存入数组 根据下标index跳转 */
            getThemeTopY:null,/* 关于防抖 */
            currentIndex:0,/* 记录index的变化 */
           // message:'',
           // show:false,/* 弹窗相关 */
        }
    },
    created () {
        /* this.$route.params.iid 获取路由中iid的数据  并保存下来  */
        this.iid = this.$route.params.iid

        //2.从detail.js中根据iid请求详情数据
        getDetail(this.iid).then(res=>{
            //根据iid获取各个商品的单个数据信息
            // console.log(res)
            // 1.获取数据
            const data = res.result

            //2.获取顶部的图片轮播图数据
            this.topImages = res.result.itemInfo.topImages

            //3.获取商品信息  创建一个对象统一存储
            this.Goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

            //4.创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            //5.保存商品的详细数据
            this.detailInfo = data.detailInfo

            // 6.获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

            // 7.获取评论信息
            if (data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }

            //  值不对，去其他地方存放函数
            // //将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
            // // DOM 现在更新了
            // // `this` 绑定到当前实例
            // // 因为DOM渲染了，但是图片还没有渲染，所以themeTopYs会出现高度误差
            // this.$nextTick(()=>{
                
            //     // nextTick 根据最新的数据，对应的DOM是已经被渲染出来
            //     // 但是图片依然是没有加载完成(目前获取的offsetTop不包含其中的图片)
            //     // offsetTop值不对的时候，都是因为图片的没有加载完成
            //     this.themeTopYs = [];/* 初始化一下 */

            //     //动态获取对应信息的offsetTop
            //     this.themeTopYs.push(0);
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);/* 参数的高度 通过ref获取对应的参数信息 */
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);/* 评论的高度 */
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);/* 推荐的高度 */
            //     console.log(this.themeTopYs)
            // }) 
        })
        //3.获取推荐数据
        getRecommend().then(res=>{
            this.recommends = res.data.list
        })

        // 防抖函数
        // 4.给getThemeTopY赋值(对给this.themeTopYs 赋值操作进行防抖)
        this.getThemeTopY = debounce(()=>{
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);/* 参数的高度 通过ref获取对应的参数信息 */
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);/* 评论的高度 */
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);/* 推荐的高度 */
                this.themeTopYs.push(Number.MAX_VALUE);/* 给数组增加一个最大值，为下面的滚动contentScroll判断提供方法 */
                // console.log(this.themeTopYs)
        })
    },
    mixins: [itemListenerMixin,backTopMixin],
    mounted () {
        // 存入mixin中了
    },
    // 只要有数据变化就会更新updated
    updated () {
                // 也可以放在这里
                // this.themeTopYs.push(0);
                // this.themeTopYs.push(this.$refs.params.$el.offsetTop);/* 参数的高度 通过ref获取对应的参数信息 */
                // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);/* 评论的高度 */
                // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);/* 推荐的高度 */
                // console.log(this.themeTopYs)
    },
    // 生命周期销毁
    destroyed(){
        // 退出详情页时进行事件销毁
        this.$bus.$off('itemImagLoad',this.itemImagListenner)
    },
    methods: {
        // 图片防抖
        imageLoad(){
            this.$refs.scroll.refresh();
            this.getThemeTopY();/* 防抖函数的执行 回调的是一个函数 */
        },
        // 点击顶部导航栏进行滚动到对应的位置
        titleClick(index){
            // console.log(index)
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],0)
        },
        // 监听Scroll滚动事件
        contentScroll(position){
            // 1.获取Y值
            const positionY = -position.y

            // 2.positonY和主题中的值进行对比
            // [0, 2878, 3723, 4013,Number.MAX_VALUE]
            // positonY在0~2878之间，index = 0
            // positonY在2878~3723之间，index = 1
            // positonY在3723~4013之间，index = 2
            // positonY超过4013时，index = 3

            // 获取的是下标i  i是字符串   for in 使用来遍历对象的
            // for(let i in this.themeTopYs){
            //     // 获取 到的是字符串
            //     console.log(i);
            //     if (positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) {
            //         console.log(i);
            //     }
            // }

            let length = this.themeTopYs.length;
            //添加Number.MAX_VALUE之后,长度需要-1
            for (let i = 0; i < length-1; i++) {
                // if (positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) {
                //     // 拿不到3
                //     console.log(i);
                // }


                /* 
                    普通做法  不加 Number.MAX_VALUE
                //判断 (妈的)
                // this.currentIndex != i  防止赋值过于频繁
                if (this.currentIndex != i && (i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) || (i===length-1&&positionY>=this.themeTopYs[i])) {
                    this.currentIndex = i;
                    //console.log(this.currentIndex)
                    // 将获取的值赋予detail-navbar中
                    this.$refs.nav.currentIndex =  this.currentIndex
                }
                 */

                // hack做法
                // 添加Number.MAX_VALUE之后的做法
                if (this.currentIndex != i && (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])) {
                    // 将i赋值
                     this.currentIndex = i;
                    //  将值传递给detail-navba中的currentIndex
                     this.$refs.nav.currentIndex =  this.currentIndex
                }
            }

            this.listenShoWBack(position)
        },
        addToCart(){ 
            // 1.获取购物车需要展示的信息
            const product = {};
            // 添加图片
            product.image = this.topImages[0];
            // 添加标题 Goods.title在detail.js中定义整合了
            product.title = this.Goods.title;
            // 描述信息
            product.desc = this.Goods.desc;
            // 价格
            product.price = this.Goods.realPrice;
            // 传递iid  一定要传 用来判断购买的商品
            product.iid = this.iid;

            // 2.将商品添加到购物车，利用Vuex实现
            // this.$store.commit('addCart',product) 传入mutation中的方法

            // diapatch传给action
            // dispatch会返回一个Promise
            this.$store.dispatch('addCart',product).then(res=>{
                // console.log(res);/* 弹窗 */
                // this.show = true;
                // this.message = res;

                // setTimeout(() => {
                //     this.show = false;
                //     this.message = ''
                // }, 1500);    将Toast进行封装使用
            })
        }
    }
}
</script>

<style scoped>
#detail{
    /* 样式名称尽量不要用一样的 */
    /* 将下导航栏覆盖掉  因为下导航栏脱离了标准流，所以会出现在详情页 */
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;/* 设置父元素100%视口高度  需要设置，否则calc的高度会被内容撑高*/
}
.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.content{
    /* 需要空格 */
    height: calc(100% - 44px - 55px);
    overflow: hidden;
}
</style>