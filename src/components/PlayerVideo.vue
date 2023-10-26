<template>
  <div>
    <video id="videoPlayer"
           class="video-js vjs-default-skin vjs-big-play-centered my-video"
           controls loop
           :poster="image"
    >
    </video>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import videojs from 'video.js';
import image from '@/assets/image/picture1.jpg'

const path = ref("http://s32vad0na.bkt.clouddn.com/%E8%A7%86%E9%A2%912.mp4")
const path1 = ref("http://vjs.zencdn.net/v/oceans.mp4")


// 在组件挂载后创建 Video.js 播放器
onMounted(() => {
  const player = videojs('videoPlayer', {
      autoplay: true, //自动播放，如果浏览器阻止的话会先静音再自动播放。
      fluid: true, // 自适应填充区域

  });
  player.src(path.value);
  player.on("ended", () => {
    console.log("播放完成")
  })

  player.on("error", () => {
    const error = player.error();
    console.log("video error:" + error.code + "-" + error.message);
  });
  player.on("pause", () => {
    console.log("暂停");
  });
  player.on("playing", () => {
  console.log("可以播放")
  });


  // //初始化界面
// axios({
//   method: 'GET',
//   url: '',
// }).then(function (resp){
//   path.value=resp.data
//   console.log()
// })


});
</script>
<style scoped>
.my-video{
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
}
</style>
