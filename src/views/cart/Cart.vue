<template>
    <div>
        <!-- 上导航栏 -->
        <nav-bar class="nav-bar">
            <div slot="center">
                购物街({{length}})
            </div>
        </nav-bar>
        <!-- 商品的列表 -->
        <cart-list class="car"/>
        <!-- 底部的汇总 -->
        <car-bottom-bar/>
    </div>
</template>

<script>
// 子组件
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childCompos/CartList.vue'
import CarBottomBar from './childCompos/CarBottomBar.vue'


// Vuex导入的方法
import {mapGetters} from 'vuex'



export default {
    components: {
        NavBar,
        CartList,
        CarBottomBar
    },
    computed: {
        // cartLength(){
        //     return this.$store.getters.cartLength
        // }


        // 两种用法
        // mapGetters 可以将getters中的方法遍历出来直接使用
        // ...mapGetters(['cartLength','cartList'])  数组
        ...mapGetters({/* 对象 */
            length:'cartLength'
        })
    }
}
</script>

<style scoped>
.nav-bar{
    background-color: pink;
    color: #fff;
}

</style>