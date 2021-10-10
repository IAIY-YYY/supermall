export default {
    // 通过默认参数修改state数据
    // mutations唯一的目的就是修改state中的状态
    // mutation中的每一个方法尽可能完成的事件比较单一一点  用actions进行分工
    addCounter(state,payload){
        payload.count++
    },
    addCToCart(state,payload){
            // 添加商品信息
            // 添加默认选中状态
            payload.checked = true
            state.cartList.push(payload)   
    }
}