<template>
    <div class="recommend">
        <!-- 将从父组件Home中的数据进行迭代 -->
        <div v-for="item in recommends" :key="item.title" class="recommend-item">
            <!-- 点击图片进行跳转链接 -->
            <a :href="item.link">
                <img :src="item.image" alt="">
                <!-- 显示与图片相对应的文字 -->
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    // 获取父组件Home中的数据返回
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.recommend{
    display: flex;
    text-align:center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
}
.recommend-item{
    flex: 1;/* 均等分 */
}
.recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 6px;
    
}
</style>