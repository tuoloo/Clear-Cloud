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
                  <el-icon class="el-input__icon" @click="searchInput" style="cursor: pointer">
                    <search/>
                  </el-icon>
                </template>
              </el-input>
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
            <router-view></router-view>
          </div>
        </div>
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

//选择
function selectCategory(index) {
  //跳转到视频
  router.push({ path: '/', query: { 'select':index } })
}

//去往搜索页面
function searchInput() {
  router.push({ path: '/handle/search', query: { 'searchText':searchText.value } })
}

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
  border-right: #c1c3c852 solid 1.5px;
}

.sidebar {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: arial, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
  width: 170px;
  color: #706969
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
  padding-left: 5px;
  display: flex;
  flex-direction: column;
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
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 10px;
}

.sidebar-items ul li.active {
  color: black;
  background-color: #F7F7F7;
  border-radius: 15px;
}

.sidebar-items ul li:hover {
  color: black;
  background-color: #F7F7F7;
  border-radius: 15px;
}

.right {
  flex: 1;
  /*background-color:greenyellow;*/
  display: flex;
  flex-direction: column;
  padding-right: 15px;
}

.top {
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: #c1c3c852 solid 1.5px;
  margin-bottom: 15px;
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
</style>
