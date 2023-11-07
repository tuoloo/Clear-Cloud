import http from "@/utils/http"

//获取个人信息
export const getUserInformation=(params)=>{
    //params是一个对象
    return http.get('/user/getUserInformation',params)
}

//修改个人基本信息
export const updateSelfInfo=(params)=>{
    //params是一个对象
    return http.put('/user/updateSelfInfo',params)
}


//发布作品
export const publishWork=(params)=>{
    //params是一个对象
    return http.post('video/publishWork',params)
}

//关注用户
export const follow=(params)=>{
    //params是一个对象
    return http.get('/user/follow',params)
}

//取消关注用户
export const unfollow=(params)=>{
    //params是一个对象
    return http.get('/user/unfollow',params)
}
//获取关注列表
export const getFollowList=(params)=>{
    //params是一个对象
    return http.get('/user/getFollowList',params)
}

//获取粉丝列表
export const getFansList=(params)=>{
    //params是一个对象
    return http.get('/user/getFansList',params)
}