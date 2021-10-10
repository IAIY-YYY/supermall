<template>
  <div class='button-bar'>
    <div class="check-content">
      <check-button   class="check-button" 
                      :isChecked="isSelectAll"
                      @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去计算：({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
 
export default {
  components: {
    CheckButton
  },
  computed: {
    totalPrice(){
      return "￥" + this.$store.state.cartList.filter(item => {
        // 返回符合条件的商品对象
        return item.checked
      }).reduce((preValue,item)=>{/* reduce汇总 */
        return preValue + item.price * item.count
      },0).toFixed(2)/* 初始化0   保留两位小数*/
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      // 第一种方法 去除未选中的按钮。并返回长度，如果有长度，则为true，则取反。如果没有有长度.则长度为0，false，取反则为true
      //  if(this.$store.state.cartList.length ===0) return false;
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)


      // 第二种方法
      // find() 查找某个函数  
      // 如果找到，则有一个是不选中的，有值的情况下返回一个true 取反返回一个false
      if(this.$store.state.cartList.length ===0) return false;
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods:{
    checkClick(){
      if (this.isSelectAll) {//全部选中
      // 遍历出来，将checked = false
        this.$store.state.cartList.forEach(item => item.checked = false);
      }else{//有部分或全部选中
         this.$store.state.cartList.forEach(item => item.checked = true );
      }
    }
  }
}
</script>

<style scoped>
.button-bar{
  position: relative;
  display: flex;
  
  height: 40px;
  
  bottom: 40px;
  line-height: 40px;
  background-color: #eee;
    
  font-size: 14px;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 40px;
  flex: 1;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.price{
  margin-left: 20px;
}
.calculate{
  width: 90px;
  margin-left: 20px;
  background-color: red;
  
}
</style>