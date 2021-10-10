<template>
    <div id="tab-bar">
      <slot></slot><!-- 创建插槽 独立组件 -->
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
#tab-bar{
  /* 
    弹性盒子布局 水平分布 
    设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。
  */
  display: flex;
  background-color: #f6f6f6;
  /* 
    绝对定位和absolute ，拉动滚动条位置不会改变
    fixed：固定定位，相对于网页的（0，0）做定位
   */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
  box-shadow: 0 -1px 1px rgba(100, 100, 100, .2);
}
</style>