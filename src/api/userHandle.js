import http from "@/utils/http"

//获取个人信息
export const getUserInformation=()=>{
    //params是一个对象
    return http.get('/user/getUserInformation')
}

//修改个人基本信息
export const updateSelfInfo=(params)=>{
    //params是一个对象
    return http.put('/user/updateSelfInfo',params)
}

//上传头像接口
export const uploadAvatar=(params)=>{
    //params是一个对象
    return http.post('/user/uploadAvatar',params)
}