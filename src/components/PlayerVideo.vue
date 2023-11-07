<template>
  <div class="video-container">
    <!-- 显示加载中动画或文本 -->
    <div v-if="!isDataLoaded" style="margin: auto">
      <loading></loading>
    </div>
    <!--    视频界面-->
    <div v-else class="video-lists" id="videoContainer">
      <video
          class="video-js   vjs-big-play-centered my-video"
          id="videoPlayer"
          controls
          loop
      >
      </video>
      <!--      视频按键-->
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
                     :src=videoMessageNow.authorVO.avatar>
          </el-avatar>
        </div>

        <div class="button-var">
          <img
              @click="toggleLike(true)"
              :src="videoMessageNow.authorVO.like ? like : like0"
              alt="Like Button"
          />
          {{ videoMessageNow.likedCount }}
        </div>
        <div class="button-var">

          <img
              @click="comentShow"
              :src=commentIcon
              alt="comment Button"
          />
          {{ videoMessageNow.commentedCount }}
        </div>
        <div class="button-var">
          <img
              @click="toggleLike(false)"
              :src="videoMessageNow.authorVO.collect?enshrine:enshrine0"
              alt="enshrine Button"
          />
          {{ videoMessageNow.collectedCount }}
        </div>
        <div class="button-var">
          <img
              :src=share
              alt="share Button"
          />
        </div>
      </div>
      <!--      视频基本信息-->
      <div class="video-messages">
        <div class="m1">
          <span>
            @{{ videoMessageNow.authorVO.nickName }}
          </span>
          <span
              style="font-size: 12px;">{{ '\u00a0' }}{{ '\u00a0' }}{{ '\u00a0' }}{{ '\u00a0' }}{{'\u00a0' }}
            {{ videoMessageNow.createTime }}
          </span>
        </div>
        <div class="m2">
          <span>
          {{ videoMessageNow.videoDescription }}
        </span>
          <span style="margin-left: 10px;color: gold">#
        {{ videoMessageNow.type }}
          </span>
        </div>
      </div>
    </div>
    <!--    评论区-->
    <div class="commentArea" v-if=ifShow>
      <comment :info="cid" :incrementCommentedCount="incrementCommentedCount"  ></comment>
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
import Comment from "@/components/comment";
import {ElMessage} from "element-plus";
import {
  videoLoad,
  likeVideo,
  cancelLikeVideo,
  collectVideo,
  cancelCollectVideo,
  getLikeVideos, getCollectVideos, searchVideo
} from "@/api/videoHandle";
import {getUserInformation} from "@/api/userHandle";

let player = null;//绑定当前videojs
const props = defineProps({
  info: String,//类别，推荐，热门，搜索（做单独判断），作品（做单独判断），喜欢，收藏
  tip: String,//用于传输用户的id,方便获取作品
  serial: Number,//观看视频时的序号
});

const currentVideoIndex = ref(0); // 当前播放视频的索引
let ifShow = ref(false) //评论区显示
const isDataLoaded = ref(false);
let videoMessageNow = ref();//当前视频
let videoResources = ref([]);//视频源集合
let cid = ref('')//评论区绑定
let num = ref('')
// 初始化，获取视频源
onMounted(async () => {
      console.log("初始化了一次")
      if (player != null)
        player.dispose()
      // 从API获取视频源的函数，用实际方法代替   初始值是推荐
      videoResources.value = await getResources();
      videoMessageNow.value = videoResources.value[currentVideoIndex.value];//更新当前视频
      isDataLoaded.value = true; // 数据加载完成，可以渲染视频组件
      //评论区是否更新需要检测
      // cid.value = videoResources.value[currentVideoIndex.value].pkVideoId;//更新评论区
      num.value=videoMessageNow.value.commentedCount
      changeBackgroud();//更换背景
      //绑定当前视频
      setTimeout(() => {
        bindCurrentVideo()
      }, 10)
    }
);

//取得数据
async function getResources() {
  if(props.info=="作品"){
    currentVideoIndex.value = props.serial;
    //像后端发送请求个人信息  作品列表
    const res = await getUserInformation({
      userId:props.tip
    }); // 使用 await 等待 videoLoad({}) 的结果
    return res.data.videoInfoList; // 返回获取的数据
  }else if(props.info=="喜欢"){
    currentVideoIndex.value = props.serial;
    const res = await getLikeVideos({
      userId: JSON.parse(localStorage.getItem('user')).pkUserId
    }); // 使用 await 等待 videoLoad({}) 的结果
    return res.data; // 返回获取的数据

  }else if(props.info=="收藏"){
    currentVideoIndex.value = props.serial;
    const res = await getCollectVideos({
      userId: JSON.parse(localStorage.getItem('user')).pkUserId
    }); // 使用 await 等待 videoLoad({}) 的结果
    return res.data; // 返回获取的数据
  }
  else if(props.info=="搜索"){
    currentVideoIndex.value = props.serial;
    const res = await  searchVideo({
      searchQuery:props.tip
    })
    return res.data;
  }else {
    currentVideoIndex.value = 0;
    try {
      const res = await videoLoad({
        type:props.info
      }); // 使用 await 等待 videoLoad({}) 的结果
      return res.data; // 返回获取的数据
    }catch (error){
      console.error("不能加载视频",error)
      return null
    }

  }
}

// 创建方法，用于增加 commentedCount
const incrementCommentedCount = () => {
  videoMessageNow.value.commentedCount++;
};

//更改背景的url
function changeBackgroud() {
  const container = document.querySelector('.video-lists');
  //图片路径
  const newBackgroundImage = videoMessageNow.value.videoCover; // 新的背景图片 URL
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

// 绑定当前视频源头
function bindCurrentVideo() {
  console.log("绑定了一次")
  player = videojs('videoPlayer', {
    controls: true, // 是否显示控制条
    poster: 'xxx', // 视频封面图地址
    preload: 'auto',
    autoplay: true,
    language: 'zh-CN', // 设置语言
    muted: false, // 是否静音
    inactivityTimeout: false,
    controlBar: { // 设置控制条组件
      /* 设置控制条里面组件的相关属性及显示与否  */
      'currentTimeDisplay': true,
      'durationDisplay': true,
      'remainingTimeDisplay': false,
      'playbackRateMenuButton': true,
      volumePanel: {
        inline: false,
      },
      /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
      children: ['playToggle',
        'volumeMenuButton',
        'currentTimeDisplay',
        'progressControl',
        'durationDisplay',
        'customControlSpacer',
        'playbackRateMenuButton',
        'chaptersButton',
        'subtitlesButton',
        'captionsButton',
        'fullscreenToggle']
    },
  });
  player.src(videoResources.value[currentVideoIndex.value].playUrl);
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

//动态监听传入的info,代表请求视频的类型，内容
watch( () => props.info,
    async (newValue, oldValue) => {
      isDataLoaded.value = false;//加载界面
      if(player)
      player.dispose()
      const loadedResources = await getResources()//获取视频资源
      // 更新视频源
      if (loadedResources) {
        videoResources.value = loadedResources
        // 监听视频加载完成事件
        videoMessageNow.value = videoResources.value[currentVideoIndex.value];//更新当前视频
        isDataLoaded.value = true; // 数据加载完成，可以渲染视频组件
        //评论区是否更新需要检测
        // cid.value = videoResources.value[currentVideoIndex.value].pkVideoId;//更新评论区
        num.value=videoMessageNow.value.commentedCount
        changeBackgroud();//更换背景
        //绑定当前视频
        setTimeout(() => {
          bindCurrentVideo()
        }, 10)
      }
    }
);


//点赞或者收藏
function toggleLike(index) {
  //首先判断是否登录
  if (localStorage.getItem('user')) {
    //index=1时为点赞，为0时为收藏
    //切换点赞状态
    if (index) {
      // 当为取消点赞时
      if (videoMessageNow.value.authorVO.like) {
        console.log("正在取消点赞")
        cancelLikeVideo({
              videoId: videoMessageNow.value.pkVideoId
            })
        videoMessageNow.value.likedCount--;
      } else {
      likeVideo({
        videoId: videoMessageNow.value.pkVideoId
      })
        videoMessageNow.value.likedCount++;
      }
      videoMessageNow.value.authorVO.like===!videoMessageNow.value.authorVO.like;
      console.log(videoMessageNow.value.authorVO.like)
      videoResources.value[currentVideoIndex.value].authorVO.like = !videoResources.value[currentVideoIndex.value].authorVO.like
    }
    //切换收藏状态
    else {
      // 当为取消收藏时
      if (videoMessageNow.value.authorVO.collect) {
        cancelLikeVideo({
          videoId: videoMessageNow.value.pkVideoId
        })
        videoMessageNow.value.collectedCount--;
      } else {
        collectVideo({
          videoId: videoMessageNow.value.pkVideoId
        })
        videoMessageNow.value.collectedCount++;
      }
      videoMessageNow.value.authorVO.collect===!videoMessageNow.value.authorVO.collect;
      videoResources.value[currentVideoIndex.value].authorVO.collect = !videoResources.value[currentVideoIndex.value].authorVO.collect;
    }
  } else {
    ElMessage.error('您还未登录')
  }
}

//打开或者关闭评论区
function comentShow() {
  ifShow.value = !ifShow.value
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
    videoResources = getResources()
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
    videoMessageNow.value = videoResources.value[currentVideoIndex.value];
    player.src(videoMessageNow.value.playUrl);
    cid.value = videoMessageNow.value.pkVideoId;//更新评论区
    changeBackgroud()
    player.play()
  } else {
    bindCurrentVideo()
  }
}


//跳转到他人主页
// 传递 ID 给下一个页面
function toUser() {
  // / 获取用户 ID
  const userId = videoResources.value[currentVideoIndex.value].authorVO.pkUserId;
  const routeData = router.resolve({name: 'otherPage', query: {'userId': userId}});
  window.open(routeData.href, '_blank');
}

// 在组件销毁前执行操作
onBeforeUnmount(() => {
  player.dispose(); // 执行销毁函数
  console.log("销毁了一次")
})

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

.my-video {
  margin: auto;
  flex: 1;
  height: 100%;
}

:deep(.video-js .vjs-control-bar .vjs-live .vjs-time-control, .vjs-live .vjs-time-divider, .video-js .vjs-current-time, .video-js .vjs-duration) {
  display: block;
}

:deep(.video-js .vjs-time-control) {
  display: block;
}

:deep(.video-js .vjs-remaining-time) {
  display: block;
}

:deep(.video-js .vjs-control-bar ) {
  background-color: rgb(77 79 83 / 30%);
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
  /*background-color: paleturquoise;*/
  width: 350px;
  height: 100%;
}

.control-button:hover {
  background-color: rgba(204, 204, 204, 0.99);
}

.video-messages {
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

.video-js .vjs-time-control {
  display: block;
}

.video-js .vjs-current-time {
  display: block
}

:deep .video-js {
  background-color: #fdfdfd00;
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

div .video-js .button.vjs-big-play-button {
  font-size: 2.5em;
  line-height: 2.3em;
  height: 2.5em;
  width: 2.5em;
  -webkit-border-radius: 2.5em;
  -moz-border-radius: 2.5em;
  border-radius: 2.5em;
  background-color: #73859f;
  background-color: rgba(115, 133, 159, .5);
  border-width: 0.15em;
  margin-top: -1.25em;
  margin-left: -1.75em;
}

/* 中间的播放箭头 */
:deep .vjs-big-play-button .vjs-icon-placeholder {
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
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
  display: block;
}
.video-js .vjs-big-play-button{
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


</style>