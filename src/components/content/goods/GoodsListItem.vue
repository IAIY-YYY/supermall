<template>
<!-- 每一个小组件所展示的格式信息 -->
    <div class="goods-list-item" @click="itemClick">
        <!-- 商品图片路径 -->
        <!-- @load监听img动态刷新 -->
        <img :src="showImage" alt="" @load="imageLoad">
        <div class="goods-info">
            <!-- 商品名称 -->
            <p>{{goodsItem.title}}</p>
            <!-- 价格 -->
            <span class="price">{{goodsItem.price}}</span>
            <!-- 收藏 -->
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        goodsItem:{
            type:Object,
            dafault(){
                return {}
            }
        }
    },
    computed: {
      // 创建一个计算函数，判断recommends传过来的数据格式
        showImage(){
          return this.goodsItem.image || this.goodsItem.show.img
        }
    },
    methods:{
      imageLoad(){
          this.$bus.$emit('itemImagLoad')

        // // 根据路由做出判断
        // if (this.$route.path.indexOf('/home')) {
        //   // 向事件总线发出事件  让Home监听img事件
        //   this.$bus.$emit('homeitemImageLoad')
        // }else if(this.$route.path.indexOf('/detail')){
        //   this.$bus.$emit('detailitemImageLoad')
        // }
      },
      itemClick(){
        /* 
          push可以返回
          replace不可以返回
        */
      //  设置动态路由之后传递id参数
        this.$router.push('/detail/'+this.goodsItem.iid)
        // this.$router.push({
        //   path:'/detail',
        //   query:{
              //query传递参数
        //   }
        // })
      }
    }
}
</script>

<style scoped>
 .goods-list-item {
    padding-bottom: 40px;
    position: relative;/* 相对定位 */

    width: 30%;
  }
  .goods-list-item img {
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;/* 绝对定位 */
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>