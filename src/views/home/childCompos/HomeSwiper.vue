<template>
    <!-- 封装好的轮播组件-->
        <swiper>
            <!-- 通过v-for循环出banners中的数据 -->
            <swiper-item v-for="item in banners" :key="item.title">
                <!-- 点击图片跳转链接 -->
                <a :href="item.link">
                    <!-- 获取图片 -->
                    <img :src="item.image" alt="" @load="imageLoad">
                </a>
            </swiper-item>
        </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'


export default {
    props:{
        banners:{
            type:Array,
            dafault(){
            return []
            }
        }
    },
    data () {
        return {
            isLoad:false
        }
    },
    components:{
        Swiper,
        SwiperItem
    },
    methods: {
        // 监听图片加载完成
        imageLoad(){
            // 设置逻辑让emit只发射一次事件就好。四次也可以，优化性能而已
            if (!this.isLoad) {
                this.$emit('swiperImageLoad')
                this.isLoad = true
            }
            
        }
    }
}
</script>

<style scoped>

</style>