<template>
  <div style="height: 100%;width: 100%" class="container-main">
    <div class="container">
      <div class="videoList">
        <div style="flex: 0.2"></div>
        <div class="videoUpto">
          <el-tabs  class="demo-tabs">
              <el-scrollbar height="800px" >
                <el-row class="video-lists-css">
                  <!--  搜索结果-->
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
      <PlayerVideo class="view-video-list" :info="cid" :tip="tip" :serial="num"></PlayerVideo>
    </el-dialog>
  </div>
</template>

<script setup>
//首先定义
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
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

let searchText=ref('')
let videoResults=ref('')
const cid = ref('');
const num=ref(0)
const tip="search"
onMounted(() => {
  //接收搜索结果//
  searchText.value=route.query.searchText;
  cid.value=searchText.value;
  console.log(searchText.value)
  console.log("初始化了一次")
  //像后端发送搜索内容
  //向后端获取资料

});

//监听搜索结果
watch(
    () => route.query.searchText,
    (newSearchText) => {
      searchText.value = newSearchText || '';
      // 在这里进行搜索结果的更新或其他相关操作
      cid.value=searchText.value
      //像后端发送搜索内容
      //向后端获取资料
    }
);


//查看视频
const visibleVideo = ref(false)
//播放视频
function playVideo(index) {
  visibleVideo.value=true
  num.value=index;
  console.log(visibleVideo.value)
}

//退出视频
function exitClick(){
  visibleVideo.value=false;
}

</script>

<style scoped>
.container {
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: auto;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color:white;
  min-width: 700px;
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