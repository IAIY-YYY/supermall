import Vue from "vue";
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 安装插件
Vue.use(Vuex)


// 2.创建Store对象
const state = {
    // 用于存储商品
    cartList:[]
}

const store = new Vuex.Store({
    // 数据存放   封装
    state,
    // 唯一的能直接对state进行修改   封装
    mutations,
    // 异步操作或分工   封装
    actions,
    getters
})

// 3.挂载在Vue实例上
export default store;