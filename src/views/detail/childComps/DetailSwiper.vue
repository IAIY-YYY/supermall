<template>
        <swiper  class="detail-swiper">
            <swiper-item  v-for="item in topImages" :key="item">
                <img :src="item" alt="">
            </swiper-item>
        </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        // 自定义属性获取父组件信息
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
</style>