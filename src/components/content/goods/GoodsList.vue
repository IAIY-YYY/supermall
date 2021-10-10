<template>
    <div class="goods">
        <goods-list-item v-for="item in goods" :key="item.titles" :goodsItem="item"/>
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'


export default {
  components: { 
      GoodsListItem 
      },
    props: {
        goods:{
            type:Array,
            dafault(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.goods{
    display: flex;/* 均分 */
    /* 
        默认nowrap —— 不包裹，所有东西一行均分
        wrap ——包裹，根据宽度设置一行分几个
    */
    flex-wrap: wrap;
    justify-content: space-evenly;/*  均等分 */
}
</style>