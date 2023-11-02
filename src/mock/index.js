const Mock = require("mockjs");
let data = Mock.mock({
        "": [
            {
                "id|+1": 1000,
                "writer": {
                    "writerName": "jack",
                    "writerImage": "",
                    "writerId|+1": 101
                },
                "titile": "@ctitle(10)",
                "time": "2022-03-21",
                "videoSrc|1": [
                    "http://s32vad0na.bkt.clouddn.com/test-video1.mp4",
                    "http://s32vad0na.bkt.clouddn.com/test-video2.mp4",
                    "http://s32vad0na.bkt.clouddn.com/test-video3.mp4",
                    "http://s32vad0na.bkt.clouddn.com/test-video4.mp4",
                    "http://s32vad0na.bkt.clouddn.com/test-video5.mp4",
                    "http://s32vad0na.bkt.clouddn.com/test-video6.mp4",
                    "http://s32vad0na.bkt.clouddn.com/test-video7.mp4",
                    "http://s32vad0na.bkt.clouddn.com/test-video8.mp4",
                    "http://s32vad0na.bkt.clouddn.com/test-video9.mp4",
                    "http://s32vad0na.bkt.clouddn.com/test-video10.mp4"
                ],
                "isLiked|1": [true, false],
                "isEnshrine|1": [true, false],
                "likenums|30-1000": 30,
                "enshrinenums|30-1000": 30,
                "commentnums|30-1000": 30,
                "share|30-1000": 30
            }
        ]
    }

)
Mock.mock(/goods\/goodAll/, 'get', () => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    return data
})
