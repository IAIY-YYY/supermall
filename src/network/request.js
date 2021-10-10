import axios from "axios";


export function request(config){
        const instance = axios.create({
            // 1.创建axios的实例
            baseURL:'http://152.136.185.210:7878/api/hy66/',
            timeout: 5000
       })

       /* 
        四种拦截情况:
            响应成功 失败
            请求成功 失败
       */
        //2.axios的拦截器
        /* 
            use()使用拦截器,传入两个函数

            config和err是自己命名的
            请求成功来到config
            请求失败来到err
        */
       /* 拦截请求 */
        instance.interceptors.request.use(config=>{
            // 1.比如config中的信息不符合服务器的要求，可以配置多一些信息
            // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
            // 某些网络请求(比如登录(token))，必须携带一些特殊的信息
            
            // console.log(config);
            
            /* 
                拦截之后要返回，否则之后的的代码报错
            */
            return config
        },err=>{
            console.log(err)
        })

        /* 拦截响应 */
        /* 
            res得到的是结果
            err是错误信息
        */
        instance.interceptors.response.use(res=>{
            // console.log(res);
            /* 
                返回data，只有data才 是需要的
            */
            return res.data
        },err=>{
            // console.log(err)
        })


        //发送真正的网络请求
        //传入conifg配置信息 
        /* 
            在源码中,axios返回的就是一个Promise信息
            因此直接返回instance就可以了
        */   
       return instance(config)
 }