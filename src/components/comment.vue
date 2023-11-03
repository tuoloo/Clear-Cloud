<template>
  <div class="commentArea">
    <div class="top">
      <div v-if="isLogin" class="father-input">
        <!--        <img :src="userMessage.avatar" class="user-image">-->
        <img src="../assets/image/test.jpg" class="user-image">
        <el-input v-model="myComment" placeholder="请输入评论...."></el-input>
        <el-button type="primary" plain @click="sendComment(-1)">发送</el-button>
      </div>
      <div v-else class="login-tips">请先登录
      </div>
    </div>
    <div class="mainContainer">
      <div class="first-comment"
           v-for="(item,index) in comments">
        <div class="comment-message">
          <img :src="item.avatar" class="user-image" @click="toUser(item.pkUserId)">
          <div class="user-message">
            <span class="name-css">{{item.nickName}}</span>
            <span class="time-css">{{item.time}}</span>
          </div>
          <div style="flex: 1;"></div>
          <div class="icon-css" @click="commentClick(index,item.commentID)">
            <img src="../assets/image/coment.svg">
            {{item.commentNum}}
          </div>
          <div class="icon-css" @click="likeClick(item.commentID)">
            <img src="../assets/image/like0.svg">
            {{item.like}}
          </div>
        </div>
        <div class="comment-write">
          {{item.comment}}
        </div>
        <el-divider content-position="left" v-if="!item.isVisible&&item.commentNum!=0" @click="openChild(index)">展开评论</el-divider>
        <div class="child-comment"
             v-for="(item0,index0) in item.reply"
             v-if="item.isVisible">
          <div class="comment-message">
            <img :src="item0.avatar" class="user-image" @click=toUser(item0.pkUserId)>
            <div class="user-message">
              <span class="name-css">{{item0.nickName}}</span>
              <span class="time-css">{{item0.time}}</span>
            </div>
            <div style="flex: 1;"></div>
            <div class="icon-css" @click="commentClick(index,item0.commentID)">
              <img src="../assets/image/coment.svg">
              {{item0.commentNum}}
            </div>
            <div class="icon-css" @click="likeClick(item0.commentID)">
              <img src="../assets/image/like0.svg">
              {{item0.like}}
            </div>
          </div>
          <div class="comment-write">
            <span >回复{{item0.toName}}:</span>
            {{item0.comment}}
          </div>
        </div>
        <el-divider content-position="left" v-if="item.isVisible" @click="closeChild(index)">收起评论</el-divider>
        <div class="top" v-if="item.isComment">
          <div class="father-input">
            <img src="../assets/image/test.jpg" class="user-image">
            <el-input v-model="myComment" placeholder="请输入评论...."></el-input>
            <el-button type="primary" plain @click="sendComment(index)">发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {defineProps, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import router from "@/router";

const comments = ref('')
const userMessage = ref('')//我的个人信息
let myComment = ref('');//我的评论
//当前回复ID
let commentSerial=ref(0)
//当前展示的评论块
let CommentIndex=ref(0)

let isLogin = ref(false)

const props = defineProps({
  info: String,
});
onMounted(() => {
  //评论代码初始化
    getResouce();
  //查看是否登录
  if (localStorage.getItem('user')) {
    userMessage.value = localStorage.getItem('user');
    isLogin.value = true;
  }
  bindChild()
  console.log(comments)
})

//获取评论数据源头
function getResouce(){
  console.log("当前视频:"+props.info)
  //向后端请求
  comments.value =  [
    // 评论对象数组在这里
    {
      commentID: 10001,
      nickName: '小明',
      pkUserId: 1001,
      avatar: 'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',
      comment: '我发布一张新专辑Norman Fucking Rockwell,大家快来听啊',
      time: '2019年9月16日 18:43',
      commentNum: 2,
      like: 15,
      isLike: false,//我是否喜欢了
      reply: [
        {
          commentID: 10002,
          nickName: '小红',
          pkUserId: 1002,
          avatar: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
          toName: '小明',//回复人姓名
          toCommentID: 10001,//回复人ID
          comment: '我很喜欢你的新专辑！！',
          time: '2019年9月16日 18:43',
          commentNum: 1,
          like: 15,
          isLike: false,//我是否喜欢了
        },
        {
          commentID: 10003,
          nickName: '小水',
          pkUserId: 1003,
          avatar: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
          toName: '小红',//回复人姓名
          toCommentID: 10002,//回复人ID
          comment: '我也是！！',
          time: '2019年9月16日 18:43',
          commentNum: 0,
          like: 15,
          isLike: false,//我是否喜欢了
        },
      ]
    },
    {
      commentID: 10008,
      nickName: '小牛',
      pkUserId: 1006,
      avatar: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
      comment: '我发行了我的新专辑Lover',
      time: '2019年9月16日 18:43',
      commentNum: 1,
      like: 5,
      isLike: false,//我是否喜欢了
      reply: [
        {
          commentID: 10010,
          nickName: '小样',
          pkUserId: 1010,
          avatar: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
          toName: '小牛',//回复人姓名
          toCommentID: 10008,//回复人ID
          comment: '我发行了我的新专辑Lover',
          time: '2019年9月16日 18:43',
          commentNum: 0,
          like: 5,
          isLike: false,//我是否喜欢了
        }
      ]
    },
    {
      commentID: 10009,
      nickName: '小咯',
      pkUserId: 1006,
      avatar: 'https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg',
      comment: '我发行了我的新专辑Lover',
      time: '2019年9月16日 18:43',
      commentNum: 0,
      like: 5,
      isLike: false,//我是否喜欢了
      reply: []
    },
  ]
}

//展示评论子集
function openChild(index){
  comments.value[index].isVisible=true;
}
//关闭评论子集
function closeChild(index){
  comments.value[index].isVisible=false;
}

//展示发表评论块
function commentClick(index,nowID){
//先看是否登录
  if (!localStorage.getItem('user')) {
    ElMessage.error('您还未登录')
  }else {
    //根据index展示评论块
    //关闭上一个发表评论块
    comments.value[CommentIndex.value].isComment=false;
    CommentIndex.value=index;
    comments.value[CommentIndex.value].isComment=true;
    //更新当前回复的人的值
    commentSerial.value=nowID;
    console.log("正在回复："+commentSerial.value)
  }

}

//发送评论
function sendComment(id){
//1.id=-1时为视频评论，一级评论


  if(id==-1){
    console.log(myComment.value)
  }
  // 2.id为具体的评论ID,二级评论
  else {
    console.log(myComment.value)
    console.log(commentSerial.value)
  }
  myComment.value='';
}

//点赞  取消点赞
function likeClick(id){
  if (!localStorage.getItem('user')) {
    ElMessage.error('您还未登录')
  }else {
  //告诉后端我要重复相反的操作
  console.log(id)
  //
}
}

//为每个一级评论绑定一个是否可见子评论   以及评论区块
function bindChild(){
  // 使用 for 循环遍历评论数组
  for (let i = 0; i < comments.value.length; i++) {
    // 获取当前评论对象
    const comment = comments.value[i];

    // 为当前评论对象添加 isVisible 属性，并将其值设置为 false
    comment.isVisible = false;
    comment.isComment=false;
  }
}
//去往他人主页
//跳转到他人主页
// 传递 ID 给下一个页面
function toUser(userID) {
  const routeData = router.resolve({name: 'otherPage', query: {'userId':userID}});
  window.open(routeData.href, '_blank');
}

</script>

<style scoped>
.commentArea {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.top{
  height: 40px;
  margin: 10px;
}
.father-input{
  height:100%;
  width: 100%;
  display: flex;
  align-items: center;
}
.login-tips{
  height:100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-image{
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 10px;
}
.mainContainer{
  flex: 1;
  background-color:oldlace;
}
.first-comment{
  margin-top: 25px;
  width: 100%;
  /*background-color: #7ff2a0;*/
}
.comment-message{
  display: flex;

}
.user-message{
  display: flex;
  flex-direction: column;
  text-align: left;

}
.icon-css{
  color: black;
  font-size: 13px;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.icon-css img{
  width: 20px;
}

.comment-write{
  overflow-wrap: break-word;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.child-comment{
  margin-left: 45px;
  margin-top: 15px;
}
</style>
