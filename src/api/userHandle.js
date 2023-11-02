import http from "@/utils/http"

export const logoUser=(params)=>{
    //params是一个对象
    return http.post('/user/login',params)
}
