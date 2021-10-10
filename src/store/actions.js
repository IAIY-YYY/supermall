export default {
    // 默认参数context 获取上下文
    // 新商品添加与原商品+1分开操作，进行Vuex跟踪
    addCart(context,payload){
       return new Promise((resolve,reject)=>{
            // payload 新添加的商品(在已有的商品中添加新商品时进行判断)
        // 第一种方法
        // let oldproduct = null;
        // for (let item of state.cartList) {
        //     if(item.iid === payload.iid){
        //         oldproduct = item
        //     }
        // }


        // 第二种方法  find()方法判断
        // 1.查找之前的数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid===payload.iid)


        // 2.判断oldProduct
        if(oldProduct){
            // oldProduct.count +=1  放入mutation中操作进行跟踪
            context.commit('addCounter',oldProduct)
            resolve("商品+1")
        }else{
            // 如果购物车本来就没有商品，则给payload添加count = 1 并添加商品
            payload.count = 1
            // 添加商品信息
            // context.state.cartList.push(payload)   放入mutation 中的方法进行分隔跟踪 方便查看与维护
            context.commit('addCToCart',payload)
            resolve("添加了新的商品")
        }
       })
    }
}