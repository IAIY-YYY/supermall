<template>
    <div class="tab-control">
        <!-- 
            当只有文字不一样时,可以定义一个数组属性，用来传递
            index获取当前下标
            :class="{active:index===currentIndex}  index===currentIndex的时候为true 其他时候不相等，为false不显示
         -->
        <div v-for="(item,index) in titles" :key="index"
            class="tab-control-item"
            :class="{active:index===currentIndex}"
            @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{/* 自定义数组 */
        titles:{
            type:Array,
            default(){/* 当数组是一个对象或函数时，default必须是一个函数 */
                return [] 
            }
        }
    },
    data () {
        return {
            currentIndex:0,/* 创建一个属性，用来记录当前状态 */
        }
    },
    methods:{
        itemClick(index){
            // 判断当前是谁处于点击状态
            // 将index赋值给currentIndex之后，再判断：class的false还是true
            this.currentIndex = index;

            /* 将index传入父组件Home */
            this.$emit('tabClick',index);
        }
    }
}
</script>
    
<style scoped>
.tab-control{
    display: flex;/* 均衡布局 */
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff; 
}
.tab-control-item{
    flex: 1;
}
.active span{
    padding: 5px;
    color: var(--color-high-text);
    border-bottom: 3px solid pink;
}
</style>