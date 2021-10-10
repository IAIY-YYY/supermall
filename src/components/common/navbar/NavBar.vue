<template>
    <div class="nav-bar">
        <div class="left">
            <slot name="left"></slot><!-- 具名插槽 -->
        </div>
        <div class="center">
            <slot name="center"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.nav-bar{
    display: flex;/* flex 布局 */
    line-height: 44px;/* 行高 */
    height: 44px;
    text-align: center;
    /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    box-shadow: 0 1px 1px rgba(100, 100, 100, .2);
}
.left,.right{
  
    width: 60px;
    /* background-color: red; */
}
.center{
    flex: 1;/* 比例   如果剩下的都设定好，name只剩下自己会将所有剩余的空间占据 */
    /* background-color: blue; */
}
</style>