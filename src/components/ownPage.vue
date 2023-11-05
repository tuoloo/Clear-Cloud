<template>
  <div style="height: 100%;width: 100%" class="container-main">
    <div class="container">
      <div class="topMessage">
        <div style="flex: 0.2"></div>
        <div class="user-image">
          <img :src=userMessages.avatar>
          <div class="user-message">
            <span>{{ userMessages.nickName }}</span>
            <div class="text1">
              关注
              <span @click="viewAttention"
                    style="color: black;cursor: pointer">{{ userMessages.followCount }}</span>
              &nbsp; 粉丝
              <span @click="viewFans" style="color: black;cursor: pointer">{{ userMessages.fanCount }}</span>
              &nbsp;获赞
              <span style="color: black">{{ userMessages.likedCount}}</span>
            </div>
            <span class="text1">{{ userMessages.signature }}</span>
          </div>
        </div>
        <div style="flex: 1"></div>
        <div class="fix-message">
          <el-button @click="fixMessage" type="info" plain>编辑资料</el-button>
        </div>
      </div>
      <div class="videoList">
        <div style="flex: 0.2"></div>
        <div class="videoUpto">
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="作品" name="first">
              <el-scrollbar height="550px" >
                <el-row class="video-lists-css">
<!--                  上传视频-->
                  <el-col
                      :xs="24" :sm="12" :md="8" :lg="4"
                  >
                    <el-card class="video-card">
                        <el-icon class="avatar-uploader-icon" @click="addWork"><Plus /></el-icon>
                    </el-card>
                  </el-col>
<!--                  我的作品列-->
                  <el-col
                      v-for="(video, index) in 20"
                      :key="index"
                      :xs="24" :sm="12" :md="8" :lg="4"
                  >
                    <el-card class="video-card">
                      <div style="position: relative; display: flex;flex-direction: column;width: 100%;height: 100%">
                        <el-popconfirm title="你确定要删除这个作品吗" @confirm="handleConfirm(video.id)" >
                          <template #reference>
                            <img src="../assets/image/delete.svg" style="width: 40px;position: absolute;right: 5%;">
                          </template>
                        </el-popconfirm>
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
            <el-tab-pane label="喜欢" name="second">
              <el-scrollbar height="550px" >
                <el-row class="video-lists-css">
                  <!--                  我的喜欢列-->
                  <el-col
                      v-for="(video, index) in 8"
                      :key="index"
                      :xs="24" :sm="12" :md="8" :lg="4"
                  >
                    <el-card class="video-card" @click="playVideo(index)">
                      <div style="position: relative; display: flex;flex-direction: column;width: 100%;height: 100%">
                        <img style="height: 100%;width: 100%;flex: 3;object-fit: scale-down;border-bottom: #00000052 solid 0.1px;"
                             src="../assets/image/test2.jpg"
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
            <el-tab-pane label="收藏" name="third">
              <el-scrollbar height="550px" >
                <el-row class="video-lists-css">
                  <!--                  我的收藏列-->
                  <el-col
                      v-for="(video, index) in 2"
                      :key="index"
                      :xs="24" :sm="12" :md="8" :lg="4"
                  >
                    <el-card class="video-card" @click="playVideo(index)">
                      <div style="position: relative; display: flex;flex-direction: column;width: 100%;height: 100%">
                        <img style="height: 100%;width: 100%;flex: 3;object-fit: scale-down;border-bottom: #00000052 solid 0.1px;"
                             src="../assets/image/test2.jpg"
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
    <el-dialog class="add-work" v-model="visibleAddWork" style="width: 550px">
      <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;min-height:500px">
        <div class="up-video" style="border: #2b333f solid 1px">
          <el-upload
              class="avatar-uploader"
              action="http://192.168.200.129:14565/video/uploadVideo"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleVideoSuccess"
              :before-upload="beforeVideoUpload"
              name="video"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
        <div class="bottom-message" style="margin-top: 30px">
          <span>标题：</span>
          <el-input v-model="titleContent"></el-input>
          <el-select v-model="value" class="m-2" placeholder="选择视频分类" size="large" style="margin-top: 30px">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>
        <div class="bottom-buttons" style="margin-top: 40px">
          <el-button type="primary" @click="uploadVideo">确认</el-button>
          <el-button @click="cancleUpload">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog class="attentions-list" v-model="visibleAttention" style="  padding: 10px;border-radius: 20px;">
      <el-scrollbar height="600px" style="min-width: 550px" >
        <p style="font-size: 22px;color: black;padding: 10px;  border-bottom: #313138 solid 0.5px;">关注列表</p>
        <div v-for="(item, index) in attentionList" :key="index" class="scrollbar-demo-item">
          <div style="display: flex;flex: 1">
            <div> <img style="border-radius: 50%;width: 45px;height: 45px" :src="item.userImage"  @click="toManHome(index)"></div>
            <div style="margin-left: 10px">
              <span style="display: block;color: #2b333f;font-size: 18px;text-align: left">{{item.userName}}</span>
              <span>{{item.userWrite}}</span>
            </div>
          </div>
          <div style="flex: 1"></div>
          <div class="buttons" >
            <button v-show="item.state === 0" @click="follow(index)" style="background-color: #D9578B">关注</button>
            <button v-show="item.state === 1" @click="unfollow(index)" style="background-color:rgb(161 164 175);">已关注</button>
          </div>
        </div>
      </el-scrollbar>
    </el-dialog>
    <el-dialog class="fans-list" v-model="visibleFans" style="  padding: 10px;border-radius: 20px;">
      <el-scrollbar height="600px" style="min-width: 550px" >
        <p style="font-size: 22px;color: black;padding: 10px;  border-bottom: #313138 solid 0.5px;">粉丝列表</p>
        <div v-for="(item, index) in fanList" :key="index" class="scrollbar-demo-item">
          <div style="display: flex;flex: 1">
            <div> <img style="border-radius: 50%;width: 45px;height: 45px" :src="item.userImage"  @click="toManHome(index)"></div>
            <div style="margin-left: 10px">
              <span style="display: block;color: #2b333f;font-size: 18px;text-align: left">{{item.userName}}</span>
              <span>{{item.userWrite}}</span>
            </div>
          </div>
          <div style="flex: 1"></div>
          <div class="buttons" >
            <button v-show="item.state === 0" @click="follow1(index)" style="background-color: #D9578B">关注</button>
            <button v-show="item.state === 1" @click="unfollow1(index)" style="background-color:rgb(161 164 175);">已关注</button>
          </div>
        </div>
      </el-scrollbar>
    </el-dialog>
    <el-dialog class="fix-message-dialog" v-model="fixDialog" style="width: 500px;height: 500px ;border-radius: 20px">
      <p style="">编辑资料</p>
      <el-form
          label-position="top"
          label-width="100px"
          style="max-width: 460px"
          :model="userMessagesCopy"
      >
        <el-form-item label="头像">
          <el-upload
              class="avatar-uploader"
              action="http://192.168.212.129:14565/user/uploadAvatar"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="headers"
              name="avatar"
          >
            <img :src="userMessages.avatar" style="width: 120px;height: 120px;border-radius: 50%;" />
          </el-upload>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="userMessagesCopy.nickName"/>
        </el-form-item>
        <el-form-item label="签名">
          <el-input v-model="userMessagesCopy.signature"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveUserInfo">保存</el-button>
          <el-button color="#98a7b7" :dark="isDark" plain @click="cancelEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import image1 from '@/assets/image/test.jpg'
import {ElMessage, TabsPaneContext} from 'element-plus'
import router from "@/router";
import PlayerVideo from "@/components/PlayerVideo";
import exit from "@/assets/image/exit.svg"
import {getUserInformation,updateSelfInfo,publishWork,unfollow,follow,getFansList,getFollowList} from '@/api/userHandle'

let token = JSON.parse(localStorage.getItem('user')).access_token;
console.log(token)
const headers={"Authorization":"Bearer "+token}

//个人主页的所有信息
const userMessages = ref('')
let userMessagesCopy = ref('')

//关注列表  不关注0 关注1
let attentionList = ref('')
//粉丝列表  相互关注2
let fanList = ref('')
//初始化   视频列表要是ref数据
onMounted(() => {
  //像后端发送请求个人信息  作品列表
  getUserInformation().then(res=>{
    if(res.code==1){
    userMessages.value=res.data;
  }else {
      ElMessage({
        message: res.message,
        type: 'warning',
      })
    }
  })
  //关注列表
  getFollowList().then(res=>{
    attentionList.value=res.data
  })
  //粉丝列表
  getFansList().then(res=>{
    fanList.value=res.data
  })
  attentionList.value = [{
    userId: 101,
    userImage: image1,
    userName: "你好",
    userWrite: "想死了，但是死的另有其人",
    state: 1,
  }, {
    userId: 102,
    userImage: image1,
    userName: "你好",
    userWrite: "想死了，但是死的另有其人",
    state: 1,
  }, {
    userId: 103,
    userImage: image1,
    userName: "你好",
    userWrite: "想死了，但是死的另有其人",
    state: 2
  }]
  fanList.value = [{
    userId: 101,
    userImage: image1,
    userName: "你好",
    userWrite: "想死了，但是死的另有其人",
    state: 1,
  }, {
    userId: 102,
    userImage: image1,
    userName: "你好",
    userWrite: "想死了，但是死的另有其人",
    state: 1,
  }, {
    userId: 103,
    userImage: image1,
    userName: "你好",
    userWrite: "想死了，但是死的另有其人",
    state: 2
  }
  ]
  userMessagesCopy.value = JSON.parse(JSON.stringify(userMessages.value))
});

//修改信息
let fixDialog = ref(false)
function fixMessage() {
  fixDialog.value = true;
}
// 头像上传成功处理
const handleAvatarSuccess = (response, uploadFile) => {
  userMessages.value.avatar=response.data;
}

// 头像上传前处理
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('图片格式必须是JPG!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  }
  return true
}

//保存修改信息
function saveUserInfo() {
  // 将暂存变量的值赋给 userMessages.userName
  userMessages.value = userMessagesCopy.value;
  //将数据发到后端
  updateSelfInfo({
    pkUserId:userMessages.value.pkUserId,
    nickName:userMessages.value.nikeName,
    signature:userMessages.value.signature
  }).then(res=>{
    ElMessage.success("修改成功")
  })
  fixDialog.value = false; // 关闭编辑框
}

//取消编辑
function cancelEdit() {
  fixDialog.value = false; // 取消编辑，关闭编辑框
}

//查看关注
let visibleAttention = ref(false)

function viewAttention() {
  visibleAttention.value = true
}
//关注逻辑
//关注
function follow(index) {
  //关注了别人
  follow({
    targetUserId:attentionList.value[index]
  })
  attentionList.value[index].state=1;
  console.log("关注")
}
//取消关注
function unfollow(index) {
  //
  attentionList.value[index].state=0;
  console.log("取消关注")
}

//查看粉丝
let visibleFans = ref(false)

function viewFans() {
  visibleFans.value = true
}
//粉丝操作逻辑
function follow1(index) {
  //关注了别人 向后端询问是1还是2
  fanList.value[index].state=1;
  console.log("关注")
}
//取消关注
function unfollow1(index) {
  //
  fanList.value[index].state=0;
  console.log("取消关注")
}

//去别人主页
function  toManHome(index){
  const routeData = router.resolve({name: 'otherPage', query: {'userId':index}});
  window.open(routeData.href, '_blank');
}

//切换作品 喜欢 收藏
const activeName = ref('first') //默认值
const handleClick = (tab, event) => {
      cid.value=tab.props.label;
}

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

//增加视频
let visibleAddWork=ref(false)

//点击增加作品按钮
function addWork(){
  visibleAddWork.value=true
}
//视频分类
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: '美食',
  },
  {
    value: 'Option2',
    label: '娱乐',
  },
  {
    value: 'Option3',
    label: '动漫',
  },
  {
    value: 'Option4',
    label: '音乐',
  },
  {
    value: 'Option5',
    label: '时尚',
  },
  {
    value: 'Option6',
    label: '体育',
  },
  {
    value: 'Option7',
    label: '教育',
  },
  {
    value: 'Option8',
    label: '游戏',
  },

]
//视频标题
let titleContent=ref('')

//视频封面地址
let imageUrl=ref('')
let videoURL=ref('')

//上传前处理
const beforeVideoUpload = (rawFile) => {
  if (rawFile.type != 'video/mp4') {
    ElMessage.error('视频类型不合法！')
    return false
  }
  return true
}
//成功上传视频
const handleVideoSuccess = (response, uploadFile) => {
 //上传成功后   获取封面地址
 imageUrl.value= response.data.coverURL
  //获取视频地址
  videoURL.value= response.data.videoURL
}
//取消上传
function cancleUpload(){
  visibleAddWork.value=false
}

//确认上传
function uploadVideo(){
  //上传
  publishWork({
    userId:userMessages.value.pkUserId,
    type:value.value,
    videoDescription:titleContent.value,
    videoCover:imageUrl.value,
    playUrl:videoURL.value
  })
  //更新视频源头

}


//删除视频
function handleConfirm(id){
  //向后端传递删除id
  //重新渲染数据
  console.log(id)
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

.fix-message {
  flex: 1;
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

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
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

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
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