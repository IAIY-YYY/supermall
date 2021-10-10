<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
        
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props: {
        probeType:{
            type:Number,
            default:0
        },
        // 第一种上拉加载图片的方法
        pullUpload:{
            type:Boolean,
            default:false
        }
    },
    data () {
        return {
            scroll:null
        }
    },
    mounted () {
        // 通过vm$refs获取节点更准确 refs的另一种用法
        /* 
            ref如果绑定在组件中，那么通过 vm$refs.refname 获取到的是一个组件对象
            ref如果绑定在普通的元素中，那么通过 vm$refs.refname 获取到的是一个元素对象(DOM节点)
        */
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,/* 动态设置传入的值是多少 */
            click:true,
            pullUpload:this.pullUpload
        })

        //监听滚动的位置
        if (this.probeType===2 || this.probeType===3) {
            this.scroll.on('scroll',(position)=>{
                // 对外自定义一个事件发送出去
                // this.$emit('scroll', position)
                this.$emit('scroll',position)
            })

        }
        
        // 监听上拉事件
        this.scroll.on('pullingUp',()=>{
            // 发送事件
            this.$emit('pullingUp')
        })
        
        
    },
    methods: {
        // ES6 语法，默认值  
        scrollTo(x,y,time=300){
             this.scroll &&this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll && this.scroll.refresh()

        },
        getScrollY(){
            // this.scroll.y scroll存在一个位置的y值
            return this.scroll ?  this.scroll.y:0
        }
    }
}
</script>

<style scoped>
/* scoped作用域 */
</style>