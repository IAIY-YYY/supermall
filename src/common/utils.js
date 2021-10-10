/* 
    (固定函数)防抖函数debounce(func,delay)
    防抖操作(需要传入两个必要参数)
    func：需要执行的函数
    delay：等待时间
*/
export function debounce(func,delay){
    let timer = null
        
    // 解构args，可以传递多个参数
    //args代表参数  ...args可代表多个参数
    return function(...args) {
    /* 
        第一次的时候timer没有，短时间内图片刷新多次，则每次都取消上一次延时器
    */
    if(timer) clearTimeout(timer)
                            
    /* 
        异步函数，delay时间结束后只执行一次操作
    */
    timer = setTimeout(() => {
        // 执行函数
            func.apply(this,args)
        }, delay);
    }
}

// 封装好的时间戳格式化
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };
  