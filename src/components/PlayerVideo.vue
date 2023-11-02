<template>
  <div class="video-container">
    <div v-if="!isDataLoaded" style="margin: auto">
      <!-- 显示加载中动画或文本 -->
      <loading></loading>
    </div>
    <div v-else class="video-lists" id="videoContainer">
      <video
          class="video-js   vjs-big-play-centered my-video"
          id="videoPlayer"
          controls
          loop
      >
      </video>
      <div class="buttons">
        <img
            @click="preVideo"
            :src=up
            class="control-button"
        />
        <img
            @click="nextVideo"
            :src=down
            class="control-button"
        />
        <div>
          <el-avatar @click="toUser" style="width: 50px;height: 50px"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
          </el-avatar>
        </div>

        <div class="button-var">
          <img
              @click="toggleLike(1)"
              :src="videoMessageNow.isLiked ? like : like0"
              alt="Like Button"
          />
          {{ videoMessageNow.likenums }}
        </div>
        <div class="button-var">

          <img
              @click="comentShow"
              :src=commentIcon
              alt="comment Button"
          />
          {{ videoMessageNow.commentnums }}
        </div>
        <div class="button-var">
          <img
              @click="toggleLike(0)"
              :src="videoMessageNow.isEnshrine ? enshrine : enshrine0"
              alt="enshrine Button"
          />
          {{ videoMessageNow.enshrinenums }}
        </div>
        <div class="button-var">
          <img
              @click="shareClick"
              :src=share
              alt="share Button"
          />
          {{ videoMessageNow.share }}
        </div>
      </div>
      <div class="video-messages">
        <div class="m1">
          <span>
            {{videoMessageNow.writer.writerName}}
          </span>
          <span style="font-size: 12px;">{{ '\u00a0'}}{{ '\u00a0'}}{{ '\u00a0'}}{{ '\u00a0'}}{{ '\u00a0'}}{{videoMessageNow.time}}
          </span>
        </div>
        <div class="m2">
          <span>
          {{videoMessageNow.title}}
        </span >
          <span style="margin-left: 10px;color: gold">#
        {{videoMessageNow.target}}
          </span>
        </div>
      </div>
    </div>
    <div class="commentArea" v-if=ifShow>
      <comment :info="cid"></comment>
    </div>
  </div>
</template>

<script setup>
import videojs from 'video.js';
import {defineProps, onBeforeUnmount, onMounted, ref, watch} from "vue";
import router from "../router/index.js";
import like0 from '@/assets/image/like0.svg'
import like from '@/assets/image/like.svg'
import commentIcon from '@/assets/image/coment.svg'
import enshrine0 from '@/assets/image/enshrine0.svg'
import enshrine from '@/assets/image/enshrine.svg'
import share from '@/assets/image/share.svg'
import up from '@/assets/image/up.svg'
import down from '@/assets/image/down.svg'
import Loading from "@/components/loading";
import testImage from '@/assets/image/test2.jpg'
import comment from '@/components/comment'
import Comment from "@/components/comment";

let player = null;
const props = defineProps({
  info: String,
  tip:String,
  serial:Number,
});
//动态监听侧边栏的分类
const videoClass = ref(props.info);
watch(() => props.info,
     (newValue, oldValue) => {
      isDataLoaded.value = false

      videoResources = getResources()
      // 更新视频源
      isDataLoaded.value = true
      player.src(videoResources.value[currentVideoIndex.value].videoSrc);
      changeBackgroud()
      player.load()
    }
);
const currentVideoIndex = ref(0); // 当前播放视频的索引
let ifShow = ref(0)
const isDataLoaded = ref(false);
let videoMessageNow=ref();//当前视频源
let videoResources = ref([]);//视频源集合
let cid=ref('')

//点赞或者收藏
function toggleLike(index) {
  console.log(index)
  //index=1时为点赞，为0时为收藏
//切换点赞状态
  if (index) {
    videoResources.value[currentVideoIndex.value].isLiked = !videoResources.value[currentVideoIndex.value].isLiked
    console.log(videoResources.value[currentVideoIndex.value].isLiked)
  }
  //切换收藏状态
  else {
    videoResources.value[currentVideoIndex.value].isEnshrine = !videoResources.value[currentVideoIndex.value].isEnshrine;
  }
  //返回后端，更改后端数据  喜欢和收藏的值

}

//打开或者关闭评论区
function comentShow() {
  ifShow.value = !ifShow.value
}

//转发逻辑
function shareClick() {

}

// 获取视频源
onMounted( () => {
  console.log("初始化了一次")
  try {
    if(player!=null)
      player.dispose()
    // 从API获取视频源的函数，用实际方法代替   初始值是推荐
    videoResources =  getResources();
    console.log(props.info)
    videoMessageNow.value=videoResources.value[currentVideoIndex.value];//更新当前视频
    isDataLoaded.value = true; // 数据加载完成，可以渲染视频组件
    cid.value=videoResources.value[currentVideoIndex.value].id;//更新评论区
    changeBackgroud()
    //绑定当前视频
    setTimeout(() => {
      bindCurrentVideo()
      // player.src(videoResources.value[currentVideoIndex.value].videoSrc);
    }, 10)
  } catch (error) {
    console.error('Failed to fetch video source:', error);
  }
}
);
// 在组件销毁前执行操作
onBeforeUnmount(() => {
    player.dispose(); // 执行销毁函数
  console.log("销毁了一次")
})

//更改背景的url
function changeBackgroud(){
  const container = document.querySelector('.video-lists');
  //图片路径
  const newBackgroundImage = testImage; // 新的背景图片 URL
  // 创建一个style标签
  const style = document.createElement('style');
  // 设置该style的内容，这里使用字符串模板设置伪元素的样式
  style.textContent = `
    .video-lists::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${newBackgroundImage});
      background-size: cover;
      filter: blur(5px); /* 模糊效果，根据需要调整 */
      opacity: 0.5; /* 透明度，根据需要调整 */
    }
  `;
  // 将这个style插入到head中
  document.head.appendChild(style);
}

//取得数据
function getResources() {
  console.log("内容:"+props.info+"标签:"+props.tip+"序号："+props.serial)
  if(props.serial){
    currentVideoIndex.value = props.serial
  }
  else {
    currentVideoIndex.value = 0
  }
  //是否是搜索
  if(props.tip){
    console.log(props.target)
  }
  //设置视频源头   向后端请求  或者父容器传递视频源
  return ref([
    {
      id: 1001,
      writer: {
        writerName: "jack", witerImage: "", writerId: 101
      },
      title: "你好吗？",
      time: "2022-03-21",
      videoSrc: "http://s32vad0na.bkt.clouddn.com/%E8%A7%86%E9%A2%912.mp4",
      posterSrc: "",
      isLiked: true,
      isEnshrine: false,
      likenums: 10,
      enshrinenums: 125,
      commentnums: 21,
      share: 20,
      target:"大家都别想活"
    },
    {
      id: 1002,
      writer: {
        writerName: "jack", witerImage: "", writerId: 102
      },
      title: "你不好？",
      time: "2022-03-21",
      videoSrc: "http://s32vad0na.bkt.clouddn.com/test-video10.mp4",
      isLiked: true,
      isEnshrine: false,
      likenums: 10,
      enshrinenums: 155,
      commentnums: 21,
      share: 20,
      target:"大家都别想活"
    },
    {
      id: 1003,
      writer: {
        writerName: "jack", witerImage: "", writerId: 103
      },
      title: "你好二分法吗？",
      time: "2022-03-21",
      videoSrc: "http://s32vad0na.bkt.clouddn.com/test-video3.mp4",
      isLiked: true,
      isEnshrine: false,
      likenums: 100,
      enshrinenums: 145,
      commentnums: 21,
      share: 20,
      target:"大家都别想活"
    },
    {
      id: 1003,
      writer: {
        writerName: "jack", witerImage: "", writerId: 104
      },
      title: "你好吗？",
      time: "2022-03-21",
      videoSrc: "http://s32vad0na.bkt.clouddn.com/test-video2.mp4",
      isLiked: true,
      isEnshrine: true,
      likenums: 100,
      enshrinenums: 145,
      commentnums: 21,
      share: 20,
      target:"大家都别想活"
    },
    {
      id: 1003,
      writer: {
        writerName: "jack", witerImage: "", writerId: 105
      },
      title: "你好吗？",
      time: "2022-03-21",
      videoSrc: "http://s32vad0na.bkt.clouddn.com/test-video3.mp4",
      isLiked: true,
      isEnshrine: true,
      likenums: 100,
      enshrinenums: 127,
      commentnums: 21,
      share: 20,
      target:"大家都别想活"
    },
    {
      id: 1004,
      writer: {
        writerName: "jack", witerImage: "", writerId: 101
      },
      title: "你好吗？",
      time: "2022-03-21",
      videoSrc: "http://s32vad0na.bkt.clouddn.com/test-video4.mp4",
      isLiked: true,
      isEnshrine: true,
      likenums: 100,
      enshrinenums: 725,
      commentnums: 21,
      share: 20,
      target:"大家都别想活"
    },
  ]);
}


//上一个视频
function preVideo() {
  //如果为第一个视频，则刷新视频源
  if (!(currentVideoIndex.value)) {
    //更换视频源 向后端重新请求
    console.log("这是第一个视频")
  } else {
    currentVideoIndex.value = currentVideoIndex.value - 1;
    //重新绑定视频源头
    updateVideo()
  }
}

//下一个视频
function nextVideo() {
  console.log(currentVideoIndex.value)
  //如果为最后一个视频，则刷新视频源
  if (currentVideoIndex.value > videoResources.value.length - 2) {
    //更换视频源 向后端重新请求
    console.log("这是最后一个视频了")
  } else {
    currentVideoIndex.value = currentVideoIndex.value + 1;
    //重新绑定视频源头
    updateVideo()
  }
}

//更新当前视频路径
function updateVideo() {
  if (player.src) {
    player.pause()
    videoMessageNow.value=videoResources.value[currentVideoIndex.value];
    player.src(videoResources.value[currentVideoIndex.value].videoSrc);
    cid.value=videoResources.value[currentVideoIndex.value].id;//更新评论区
    changeBackgroud()
    player.play()
  } else {
    bindCurrentVideo()
  }
}

// 绑定当前视频源头
function bindCurrentVideo() {
  console.log("绑定了一次")
  player = videojs('videoPlayer', {
    autoplay: true, // 自动播放
    controlBar: { // 设置控制条组件
      // 设置控制条里面组件的相关属性及显示与否
      currentTimeDisplay:true,// 是否显示当前播放时间
      durationDisplay:true, // 是否显示总时长
      remainingTimeDisplay: true, // 是否显示剩余时间
      playbackRateMenuButton : true,  //播放速率
      // children: [
      //   {name: 'playToggle'}, // 播放按钮
      //   {name: 'currentTimeDisplay'}, // 当前已播放时间
      //   {
      //     name: 'volumePanel', // 音量控制
      //     inline: false, // 不使用水平方式
      //   },
      //   {name: 'progressControl'}, // 播放进度条
      //   { name:'playbackRateMenuButton'},  //播放速率}
      //   {name: 'durationDisplay'}, // 总时间
      //   { // 倍数播放
      //     name: 'playbackRateMenuButton',
      //     'playbackRates': [0.5, 1, 1.5, 2, 2.5]
      //   },
      //   {name: 'FullscreenToggle'} // 全屏
      // ]
    },
  });
  player.src(videoResources.value[currentVideoIndex.value].videoSrc);
  player.load()
  player.on("ended", () => {
    console.log("播放完成");
  });
  player.on("error", () => {
    const error = player.error();
    console.log("video error:" + error.code + "-" + error.message);
  });
  player.on("pause", () => {
    console.log("暂停");
  });
  player.on("playing", () => {
    console.log("可以播放");
  });
}

//跳转到他人主页
// 传递 ID 给下一个页面
function toUser() {
  const userId = videoResources.value[currentVideoIndex.value].writer.writerId; // 从某处获取用户 ID
  const routeData = router.resolve({name: 'otherPage', query: {'userId':userId}});
  window.open(routeData.href, '_blank');
}

</script>

<style scoped>
.video-container {
  /*background-color: beige;*/
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 100%;
}

.video-lists {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* 添加相对定位 */
  flex: 1;
}
/*.video-list::before {*/
/*  backdrop-filter: blur(8px);*/
/*  background-color: rgba(255, 255, 255, 0.5);*/
/*  z-index: 0;*/
/*  content: "";*/
/*  background-size: cover;*/
/*  overflow: hidden;*/
/*  position: absolute;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  filter: blur(25px);*/
/*  --bg-image: url('../assets/image/test.jpg');*/
/*}*/


.my-video {
  margin: auto;
  flex: 1;
  height: 100%;
}

.buttons {
  right: 20px; /* 调整按钮的位置 */
  top: 40%;
  z-index: 2; /* 设置按钮的层级高于视频 */
  display: flex;
  flex-direction: column;
  position: absolute; /* 添加绝对定位 */
  align-items: center;
}

.buttons img {
  width: 40px;
}

.button-var {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-weight: bold;
  margin-top: 10px;
}

.control-button {
  width: 40px;
  background-color: rgb(50 52 66 / 69%);
  border-radius: 50%;
  margin-bottom: 15px;
}

.commentArea {
  background-color: paleturquoise;
  width: 350px;
  height: 100%;
}

.control-button:hover {
  background-color: rgba(204, 204, 204, 0.99);
}
.video-messages{
left: 30px;
  top: 88%;
  z-index: 2; /* 设置按钮的层级高于视频 */
  display: flex;
  flex-direction: column;
  position: absolute; /* 添加绝对定位 */
color: white;
  font-size: 20px;
  font-weight: 500;
}
.video-js .vjs-time-control{display:block;}
.video-js .vjs-current-time{display: block}
:deep .video-js{
  background-color:#fdfdfd00;
}
.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar {
  visibility: visible;
  opacity: 1;
  pointer-events: none;
}
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
  display: block;
}
div .video-js .button.vjs-big-play-button{
  font-size: 2.5em;
  line-height: 2.3em;
  height: 2.5em;
  width: 2.5em;
  -webkit-border-radius: 2.5em;
  -moz-border-radius: 2.5em;
  border-radius: 2.5em;
  background-color: #73859f;
  background-color: rgba(115,133,159,.5);
  border-width: 0.15em;
  margin-top: -1.25em;
  margin-left: -1.75em;
}
/* 中间的播放箭头 */
.vjs-big-play-button .vjs-icon-placeholder {
  font-size: 1.63em;
}
/* 加载圆圈 */
.vjs-loading-spinner {
  font-size: 2.5em;
  width: 2em;
  height: 2em;
  border-radius: 1em;
  margin-top: -1em;
  margin-left: -1.5em;
}

</style>