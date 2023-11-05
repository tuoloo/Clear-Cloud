<template>
  <div style="height: 100%;width: 100%" class="container-main">
    <div class="container">
      <div class="topMessage">
        <div style="flex: 0.2"></div>
        <div class="user-image">
          <img :src=userMessage.userImage>
          <div class="user-message">
            <span>{{ userMessage.userName }}</span>
            <div class="text1">
              关注
              <span style="color: black;cursor: pointer">{{ userMessage.userAttentionNums }}</span>
              &nbsp; 粉丝
              <span  style="color: black;cursor: pointer">{{ userMessage.likeNums }}</span>
              &nbsp;获赞
              <span style="color: black">{{ userMessage.userFanNums }}</span>
            </div>
            <span class="text1">{{ userMessage.userWrite }}</span>
          </div>
        </div>
        <div style="flex: 1"></div>
        <div class="buttons" style="flex: 1">
          <button v-show="userMessage.state === 0" @click="follow()" style="background-color: #D9578B">关注</button>
          <button v-show="userMessage.state === 1" @click="unfollow()" style="background-color:rgb(161 164 175);">已关注</button>
          <button v-show="userMessage.state === 2" @click="unfollow()" style="background-color:rgb(161 164 175);">相互关注</button>
        </div>
      </div>
      <div class="videoList">
        <div style="flex: 0.2"></div>
        <div class="videoUpto">
          <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="作品" name="first">
              <el-scrollbar height="550px" >
                <el-row class="video-lists-css">
                  <!--   作品列-->
                  <el-col
                      v-for="(video, index) in 20"
                      :key="index"
                      :xs="24" :sm="12" :md="8" :lg="4"
                  >
                    <el-card class="video-card">
                      <div style="position: relative; display: flex;flex-direction: column;width: 100%;height: 100%">
                        <img style="height: 100%;width: 100%;flex: 3;object-fit: scale-down;border-bottom: #00000052 solid 0.1px;"
                             src="../assets/image/test2.jpg"
                             @click="playVideo(index)"
                        />
                        <div style="position: absolute;display: flex;top: 60%;left: 5%;">
                          <img src="../assets/image/emptyLike.svg"  style="width: 25px;height: 25px;margin-right: 10px">{{20}}
                        </div>
                        <div style="flex: 1">
                          <span class="title" >Yummy hamburger</span>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div style="flex: 0.2"></div>
      </div>
    </div>
    <el-dialog class="show-video"
               v-if="visibleVideo"
               :show-close=false
               v-model="visibleVideo"
               :fullscreen="true"
    >
      <img :src="exit" class="exit-button" @click="exitClick">
      <PlayerVideo class="view-video-list" :info="cid" :serial="num"></PlayerVideo>
    </el-dialog>
  </div>
</template>

<script setup>
//首先定义
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import image1 from '@/assets/image/test.jpg'
import {ElMessage, TabsPaneContext} from 'element-plus'
import router from "@/router";
import PlayerVideo from "@/components/PlayerVideo";
import exit from "@/assets/image/exit.svg"

const route = useRoute()
//他人主页的所有信息
const userMessage=ref('');
//关注列表  不关注0 关注1  相互关注2
//初始化   视频列表要是ref数据
onMounted(() => {
  //接收当前用户
  //像后端发送请求个人信息  关注列表，粉丝列表 作品列表吧
  let userId=route.query.userId;
  console.log(userId)
  //向后端获取资料
  userMessage.value = {
    userId: 1,
    userImage: image1,
    userName: "地球爆炸",
    userWrite: "想死了，但是死的另有其人",
    userAttentionNums: 12,
    userFanNums: 123,
    likeNums: 45,
    state:2
  }

});

//关注逻辑
//关注
function follow() {
  //关注了别人 向后端询问是1还是2
  userMessage.value.state=1;
  console.log("关注")
}
//取消关注
function unfollow() {
  //
  userMessage.value.state=0;
  console.log("取消关注")
}

//切换作品 喜欢 收藏
const activeName = ref('first') //默认值
//到时候要传入他人的id
const cid = ref('作品');

const num=ref(0)
//查看视频
const visibleVideo = ref(false)
//播放视频
function playVideo(index) {
  visibleVideo.value=true
  console.log(index)
  num.value=index;
}
//退出视频
function exitClick(){
  visibleVideo.value=false;
}

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: auto;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  min-width: 700px;
}

.topMessage {
  flex: 1;
  width: 100%;
  /*background-color: #7ff2a0;*/
  display: flex;
  align-items: center;
}

.user-image {
  display: flex;
  flex: 2;
  font-size: 25px;
}

.user-image img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.user-message {
  color: black;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 25px;
}

.text1 {
  margin-top: 10px;
  font-size: 17px;
  color: #8A8B90
}

.scrollbar-demo-item {
  display: flex;
  height: 80px;
  margin: 10px;
  border-bottom: #00000040 solid 0.2px;
  align-items: center;
}
.buttons button{
  color: white;
  border: none;
  font-size: 20px;
  border-radius: 8px;
  height: 35px;
}
:deep(.el-dialog__body) {
  padding-top: 0;
}
.videoList {
  flex: 3;
  width: 100%;
  display: flex;
  /*background-color: #2979f1;*/
  height: 100%;
}

.videoUpto{
  margin-top: 20px;
  flex: 3;
}

:deep .el-scrollbar .el-scrollbar__wrap {
  /*将横向滚动条隐藏*/
  overflow-x: hidden;
}
.video-lists-css {
  display: flex;
  flex-wrap: wrap;
}

.video-card {
  margin: 10px;
  /* Additional styling for your cards */
  min-height: 250px;
  height: 90%;
  width: 90%;
}
:deep .el-card .el-card__body{
  padding: 0;
  height: 100%;
}
.title{
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 18px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.show-video{
  width: 100%;
  height: 100%;


}
:deep .show-video .el-dialog__header {
  display: none;
}
:deep .show-video .el-dialog__body {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0;
}
.view-video-list{
  width: 100%;
  height: 95%;
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.exit-button{
  width: 40px;
  z-index:9999;
}
</style>