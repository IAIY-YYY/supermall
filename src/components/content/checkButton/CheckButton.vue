<template>
  <div class='check-button' :class="{check:isChecked}">
      <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    props: {
        // 不能直接改变，一般都是在模型中定义选中状态
        isChecked:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style scoped>
.check-button{
    
    border-radius: 50%;
    border: 2px solid #aaa;
}
.check{
    border-color: red;
    background-color: red;
}
</style>