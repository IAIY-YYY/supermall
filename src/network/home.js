import { request } from "./request";

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}



export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{/*  通过params或quest传递   /home/data?type&page */
            type,
            page
        }
    })
}
// 函数调用-> 压入函数栈(保存函数调用过程中所有变量都是存在的)
// 函数调用结束 -> 弹出函数栈(释放函数中所有的变量，被回收销毁)
/* function test(){
    const names = ['']
}
test() */
