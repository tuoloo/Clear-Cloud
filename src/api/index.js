import http from "@/utils/http"
//登录
export const logoUser=(params)=>{
    //params是一个对象
    return http.post('/user/login',params)
}


//注册
export const signUser=(params)=>{
    //params是一个对象
    return http.post('/user/register',params)
}