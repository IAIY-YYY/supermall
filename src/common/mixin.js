import {debounce} from 'common/utils.js'
import BackTop from 'components/content/backTop/BackTop.vue'

// 导出混入(相当于Java中的继承，将公共部分取出)
export const itemListenerMixin = {
    // 不止生命周期可以混入，数据组件等也可以
    components: {
        
    },
    methods: {
        
    },
    data () {
        return {
            itemImagListenner:null
        }
    },
    // 组件加载完成后执行，生命周期
    mounted () {
        // 导入debounce函数，对图片进行刷新
        const refresh = debounce(this.$refs.scroll.refresh,200)

        // 对
        this.itemImagListenner = ()=>{
             refresh()
        }

        // 接收监听事件
        this.$bus.$on('itemImagLoad', this.itemImagListenner)

    }   
}



// backTop的点击返回顶部封装
export const backTopMixin = {
    components: {
        BackTop
    },
    data () {
        return {
            isShowBackTop:false
        }
    },
    methods: {
        backClick(){
            /* 
                通过ref获取子组件中scroll的对象并调用scrollTo()方法 
                scrollTo(x,y,time)
            */
            // this.$refs.scroll.scroll.scrollTo(0,0,500)
            // 稍微封装，提高可读性
            this.$refs.scroll.scrollTo(0,0)
        },
        listenShoWBack(position){
            this.isShowBackTop = -(position.y)>600
        }
    }
}