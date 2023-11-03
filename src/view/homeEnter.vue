<template>
  <div class="body">
    <div class="left">
      <div class="sidebar">
        <div class="logo">
          <img :src=logo style="height: 50px;">
        </div>
        <div class="sidebar-items">
          <ul>
            <li
                v-for="(item, index) in sidebarItems"
                :key="index"
                @click="selectCategory(index)"
                :class="{ 'active': selectedCategory === index }"
            >
              <img :src="item.image" alt="Category Icon" class="category-icon"/>
              {{ item.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div style="flex: 1">
        </div>
        <div class="search-css">
          <el-input v-model="searchText" class="w-50 m-2" placeholder="输入搜索内容">
            <template #prefix>
              <el-icon class="el-input__icon" @click="searchInput">
                <search/>
              </el-icon>
            </template>
          </el-input>
          <button @click="searchInput" class="search-button">搜索</button>
        </div>
        <div class="user-login">
          <button class="login-css" v-if="loginButton" @click="loginIn">登录</button>
          <div class="user-image" @click="toMy">
              <img :src="userImage" style="width: 40px;height: 40px;border-radius: 50%;display: flex;align-items: center;">
          </div>
        </div>
        <div style="flex: 0.2">
        </div>
      </div>
        <div class="bottom">
          <PlayerVideo class="play-video" :info="cid"></PlayerVideo>
        </div>
      </div>
    <el-dialog class="layout"  width="30%" v-model="loginDialog"  style="border-radius: 20px">
      <div class="leftDialog">
        <img src="../assets/image/pureLogo.png" style="width: 65px">
        <span class="text">清云</span>
        <p class="text2">创造生动瞬间，闪亮点点星光</p>
      </div>
      <div class="rightDialog">
        <el-tabs type="border-card" style="border: none">
          <el-tab-pane label="登录">
            <el-form
                label-position="right"
                label-width="60px"
                style="max-width: 460px"
                class="loginForm"
            >
              <el-form-item label="邮箱：">
                <el-input v-model="form.Email"/>
              </el-form-item>
              <el-form-item label="密码：">
                <el-input type="password" v-model="form.password"/>
              </el-form-item>

              <el-row>
                <el-checkbox
                    class="checkBox"
                    v-model="form.isAgree"
                    label="同意用户使用准则"
                    name="type"
                />
              </el-row>
              <el-button
                  v-if="form.isAgree"
                  type="primary"
                  class="loginBtn"
                  @click="login"
              >
                登录
              </el-button>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="注册">
            <el-form
                label-position="right"
                label-width="100px"
                style="max-width: 460px"
                class="loginForm"
            >
              <el-form-item label="邮箱：">
                <el-input v-model="registerForm.rEmail"/>
              </el-form-item>
              <el-form-item label="密码：">
                <el-input type="password" v-model="registerForm.rPassword"/>
              </el-form-item>
              <el-form-item label="确认密码：">
                <el-input
                    type="password"
                    v-model="registerForm.confirmPassword"
                    @blur="confirmFunc"
                />
              </el-form-item>
              <el-row>
                <el-checkbox
                    class="checkBox"
                    v-model="registerForm.rAgree"
                    label="同意用户使用准则"
                    name="type"
                />
              </el-row>
              <el-button
                  v-if="registerForm.rAgree"
                  type="primary"
                  class="loginBtn"
                  @click="register"
              >
                注册
              </el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import logo from "@/assets/image/logo.png";
import image1 from "@/assets/image/recomment0.svg"
import image01 from "@/assets/image/recomment.svg"
import image2 from "@/assets/image/hot0.svg"
import image02 from "@/assets/image/hot.svg"
import image3 from "@/assets/image/food0.svg"
import image03 from "@/assets/image/food.svg"
import image4 from "@/assets/image/my0.svg"
import image04 from "@/assets/image/my.svg"
import image5 from "@/assets/image/fun0.svg"
import image05 from "@/assets/image/fun.svg"
import image6 from "@/assets/image/two0.svg"
import image06 from "@/assets/image/two.svg"
import image7 from "@/assets/image/music0.svg"
import image07 from "@/assets/image/music.svg"
import image8 from "@/assets/image/fashion0.svg"
import image08 from "@/assets/image/fashion.svg"
import image9 from "@/assets/image/sport0.svg"
import image09 from "@/assets/image/sport.svg"
import image10 from "@/assets/image/education0.svg"
import image010 from "@/assets/image/education.svg"
import image11 from "@/assets/image/game0.svg"
import image011 from "@/assets/image/game.svg"
import router from "@/router";
import PlayerVideo from "@/components/PlayerVideo";
import {logoUser, signUser} from "@/api/index"
import unlogin from '@/assets/image/unLogin.svg'

//用户是否登录头像
let userImage=ref(unlogin)
//用户登陆按键是否存在
let loginButton = ref(true)
//输入框内容
let searchText = ref('')
//导航栏数据
const sidebarItems = ref([
  {image: image1, text: '推荐'},
  {image: image2, text: '热门'},
  {image: image3, text: '美食'},
  {image: image4, text: '关注'},
  {image: image5, text: '娱乐'},
  {image: image6, text: '动漫'},
  {image: image7, text: '音乐'},
  {image: image8, text: '时尚'},
  {image: image9, text: '体育'},
  {image: image10, text: '教育'},
  {image: image11, text: '游戏'},
])

//改变后的图像
const changeItems = [
  {image1: image01, image: image1},
  {image1: image02, image: image2},
  {image1: image03, image: image3},
  {image1: image04, image: image4},
  {image1: image05, image: image5},
  {image1: image06, image: image6},
  {image1: image07, image: image7},
  {image1: image08, image: image8},
  {image1: image09, image: image9},
  {image1: image010, image: image10},
  {image1: image011, image: image11}
]

//初始值是推荐
let selectedCategory = ref(0);

const cid = ref(sidebarItems.value[selectedCategory.value].text);

//选择
function selectCategory(index) {
  if(index!=3){
    //复原图像
    sidebarItems.value[selectedCategory.value].image = changeItems[selectedCategory.value].image;
    selectedCategory.value = index
    sidebarItems.value[index].image = changeItems[index].image1;
    //子组件变化
    cid.value = sidebarItems.value[selectedCategory.value].text;
  }
  else {
    //判断是否登录
    if(localStorage.getItem('user')){
      //复原图像
      sidebarItems.value[selectedCategory.value].image = changeItems[selectedCategory.value].image;
      selectedCategory.value = index
      sidebarItems.value[index].image = changeItems[index].image1;
      //子组件变化
      cid.value = sidebarItems.value[selectedCategory.value].text;
      console.log(cid)
    }
    else {
      ElMessage.error('您还未登录')
    }
  }
}
//路由传值判断
const route = useRoute()
const select = ref(null)
//初始化
onMounted(() => {
  //如果有路由值设置初始值为路由值
    select.value = route.query.select;
    if(select.value!=null){
      selectedCategory.value=select.value
      setTimeout(function (){
        cid.value = sidebarItems.value[selectedCategory.value].text;
      },100)
    }
    // 设置默认路由为推荐页面
  sidebarItems.value[selectedCategory.value].image = changeItems[selectedCategory.value].image1;

  //用户是否登录判断头像
     if(localStorage.getItem('user')){
      userImage.value=JSON.parse(localStorage.getItem('user')).avatar
       loginButton.value=false;
    }
});
//去往搜索页面
function searchInput() {
  router.push({ path: '/handle/search', query: { 'searchText':searchText.value } })
}
// 去往我的主页
function toMy(){
  router.push({ path: '/handle/ownPage'})
}
//登录弹出框显示
let loginDialog=ref(false)
//登录弹出框按钮
function loginIn(){
  loginDialog.value=true;
}
//关闭登录
function handleClose(){
  loginDialog.value=false;
}

import {ElMessage} from "element-plus";
import {useRoute} from "vue-router";
//登录表单数据
const form = ref({
  Email: "",
  password: "",
  isAgree: 0,
});
//注册表单数据
const registerForm = ref({
  rEmail: "",
  rPassword: "",
  confirmPassword: "",
  identifyCode: "",
  rAgree: 0,
});

// 登录
function login() {
  console.log("登录", form);
  logoUser({
    userEmail:form.value.Email,
    passWord:form.value.password
  }
).then(res => {
    if (res.code==1) {
      ElMessage({
        message: '登陆成功',
        type: 'success',
      })
      console.log(res.data)
      //本地存储
      localStorage.setItem('user',JSON.stringify(res.data))
      loginDialog.value=false;
      loginButton.value=false;
      userImage.value=JSON.parse(localStorage.getItem('user')).avatar;
    } else {
      ElMessage({
        message: res.message,
        type: 'warning',
      })
    }
  })
  // 登录成功后重置表单数据
  form.value.Email = '';
  form.value.password = '';
  form.value.isAgree = false;
}

// 注册
function register() {
  signUser({
        userEmail:registerForm.value.rEmail,
        passWord:registerForm.value.rPassword
      }
  ).then(res => {
    if (res.code==1) {
      ElMessage({
        message: '注册成功',
        type: 'success',
      })
    } else {
      ElMessage({
        message: res.message,
        type: 'warning',
      })
    }
  })
  //在本地存储存储用户信息

  // 注册后重置表单数据
  registerForm.value.Email = '';
  registerForm.value.password = '';
  registerForm.value.isAgree = false;
}

// 确认密码
const confirmFunc = () => {
  if (registerForm.confirmPassword !== registerForm.rPassword)
    ElMessage.error("密码与确认密码不一致.");
};

</script>

<style scoped>
.body {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.left {
  width: 180px;
  /*background-color: #42b983;*/
  overflow: hidden;
  display: flex;
  flex-direction: row-reverse;
}

.right {
  flex: 1;
  /*background-color:greenyellow;*/
  display: flex;
  flex-direction: column;
  padding-right: 15px;
}

.top {
  height: 80px;
  display: flex;
  align-items: center;
}

.search-css {
  display: flex;
}

.search-button {
  cursor: pointer;
  background-color: white;
  border: none;
  font-size: 15px;
  color: #00000070;
  opacity: 0.5;
  border-radius: 10px;
  margin-left: 5px;
}

.top .el-input {
  opacity: 0.7;
  flex: 1;
  min-width: 400px;
  border-radius: 10px;
  min-height: 35px;
}

.user-login {
  flex: 1;
  flex-direction: row-reverse;
  display: flex;
}
.user-image{
  margin-right: 10px;
}
/*.login-css{*/
/*  cursor: pointer;*/
/*  background-color: #d9578bb0;*/
/*  border: none;*/
/*  font-size: 15px;*/
/*  color: #2b333f;*/
/*  border-radius: 15px;*/
/*  width: 60px;*/
/*}*/
.login-css{
  background: rgba(217, 87, 139, 0.99);
  background-image: linear-gradient(to bottom, rgba(217, 87, 139, 0.88), rgba(35, 196, 224, 0.82));
  border-radius: 11px;
  color: #fafafa;
  font-size: 15px;
  cursor: pointer;
  border: none;
  width: 50px;
}
/* 悬停样式 */
.login-css:hover {
  background: #2079b0;
  background-image: -webkit-linear-gradient(top, #2079b0, #eb94d0);
  background-image: -moz-linear-gradient(top, #2079b0, #eb94d0);
  background-image: -ms-linear-gradient(top, #2079b0, #eb94d0);
  background-image: -o-linear-gradient(top, #2079b0, #eb94d0);
  background-image: linear-gradient(to bottom, #2079b0, #eb94d0);
  text-decoration: none;
}

.bottom {
  flex: 1;
  /*background-color: black;*/
  position: relative;
}

.play-video {
  position: absolute;
  width: 100%;
  height: 95%;
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.sidebar {
  position: fixed;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0px 5px 0px 5px;
  align-items: center;
  font-family: arial, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
  margin-left: 20px;
  width: 170px;
}

.logo {
  height: 50px;
  width: 88%;
  margin-top: 20px;
  margin-left: auto;
}

.sidebar-items {
  flex: 1;
  margin-top: 10px;
  width: 100%;
}

.sidebar-items ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.category-icon {
  width: 22px;
  height: 22px;
  margin-right: 10px; /* 添加一些右边距以分隔图标和文本 */
}

.sidebar-items ul li {
  cursor: pointer;
  align-items: center;
  font-size: 15px;
  height: 50px;
  color:#393b49;
  display: flex;
  width: 80%;
  justify-content: center;
  margin-bottom: 3px;
}

.sidebar-items ul li.active {
  background-color: rgba(85, 85, 85, 0.28);
  border-radius: 15px;
  color: white;
}

.sidebar-items ul li:hover {
  background-color: rgba(85, 85, 85, 0.34);
  border-radius: 15px;
  color: white;
}
.layout {
  background-color: white;
  position: absolute;
  left: calc(50% - 250px);
  top: 20%;
  width: 700px;
  height: 300px;
  display: flex;
  border-radius: 15px;
  overflow: hidden;
}

.leftDialog {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

}

.rightDialog {
  flex: 1;
}

.loginBtn {
  width: 100px;
}

.loginForm {
  text-align: center;
}

.checkBox {
  margin-left: 7px;
}

.inpWidth {
  width: 165px;
}
.text{
  color: cornflowerblue;
  font-size: 25px;
  margin-top: 5px;
}

.text:hover {
  animation: animate 0.5s linear infinite;
}
@keyframes animate {

  0%,
  25% {
    text-shadow: 2px 2px 2px #ff6384;
  }

  50% {
    text-shadow: 2px -2px 2px #ff6384;
  }

  75% {
    text-shadow: -2px 2px 2px #ff6384;
  }

  100% {
    text-shadow: -2px -2px 2px #ff6384;
  }
}

.text2{
  background: #EEE url(../assets/image/background1.png) repeat;
  text-shadow: 5px -5px #047ef99e, 4px -4px white;;
  font-weight: bold;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  font-size: 20px;
}
</style>
