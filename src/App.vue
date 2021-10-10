<template>
  <div id="app">
    <!-- 让router不随意销毁掉 保持状态 -->
    <!-- exclude 需要在相应的组件中设置name属性识别 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar.vue'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import url("assets/css/base.css");
</style>
