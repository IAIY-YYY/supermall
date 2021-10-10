<template>
<!-- 所有的item都展示同一个图片，同一个文字 -->
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive"><!-- 加一层包装，尽量不要再插槽内设置 -->
            <slot name="item-icon"></slot><!-- 关于图片决定 -->
        </div>
        <div v-else>
             <slot name="item-icon-active"></slot><!-- 活跃时显示的图片 -->
        </div>
        <div :style="activeStyle"><!-- 不可放在slot里，如果放入则最终会被外部替换掉  -->
            <slot name="item-text"></slot><!-- 关于文本决定 最终被外部内容替换 -->
        </div>
        

        <!--  
            块元素自动分行 
            封装不能固定内容，需要用插槽
        -->
        <!--         
            <img src="../../assets/img/tabbar/home.svg" alt="">
            <div>首页</div> 
         -->
    </div>
</template>

<script>
export default {
    /*  props父传子，父组件传递参数给子组件  */
    props:{
        path:String,
        activeColor:{/*  动态绑定颜色，增加业务需求*/
            type:String,
            default:'salmon'
        }
    },
    data () {
        return {
            // isActive:true,
        } 
    },
    computed:{
        isActive(){ 
            /* 
                this.$route.path 处于活跃中的路由path始终只有一个
                当活跃的路由和当前的路由处于相等时，则为true。其他为false
            */
            return this.$route.path == this.path
            /*
             indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
              或   return this.$route.path.indexOf(this.path) !== -1;
            */
            
        },
        activeStyle(){
            /* 
            过于复杂的可以放在methods或computed 
            isActive处于活跃时，则运行后面代码   三目运算符
            */
            return this.isActive?{color:this.activeColor}:{}
        }
    },
    methods:{
        itemClick(){
            /* 跳转的路径不能固定，使用props父组件向子组件传递数据 */
            this.$router.push(this.path);


        }
    }
}
</script>

<style>

.tab-bar-item{
  flex: 1;/* 均等分布 */
  text-align: center;/* 居中 */
  height: 49px; /* tab-bar高度一般都是49，黄金比例 */
  font-size: 14px;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;/* 去除图片本身的空间像素 */
  margin-bottom: 2px;
}
/* 
    无法动态绑定   不需要
    .active{
        color: salmon;
    } 
*/
</style>