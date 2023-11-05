import http from "@/utils/http"

//加载对应的视频
export const videoLoad=(params)=>{
    //params是一个对象
    return http.get('/video/getVideoStream',params)
}

//点赞视频
export const likeVideo=(params)=>{
    //params是一个对象
    return http.get('/video/likeVideo',params)
}
//取消点赞视频
export const cancelLikeVideo=(params)=>{
    //params是一个对象
    return http.get('/video/cancelLikeVideo',params)
}

//收藏视频
export const collectVideo=(params)=>{
    //params是一个对象
    return http.get('/video/collectVideo',params)
}

//取消收藏视频
export const cancelCollectVideo=(params)=>{
    //params是一个对象
    return http.get('/video/cancelCollectVideo',params)
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