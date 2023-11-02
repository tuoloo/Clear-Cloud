import http from "@/utils/http"

//加载对应的视频
export const videoLoad=(params)=>{
    //params是一个对象
    return http.post('',params)
}
