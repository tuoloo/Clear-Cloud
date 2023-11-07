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


//删除视频
export const deleteVideo=(params)=>{
    //params是一个对象
    return http.delete('/video/deleteVideo',params)
}

//获取用户喜欢的视频
export const getLikeVideos=(params)=>{
    //params是一个对象
    return http.get('/user/getLikeVideos',params)
}
//获取用户收藏的视频
export const getCollectVideos=(params)=>{
    //params是一个对象
    return http.get('/user/getCollectVideos',params)
}

//搜索视频
export const searchVideo=(params)=>{
    //params是一个对象
    return http.get('/video/searchVideo',params)
}