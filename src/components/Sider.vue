<template>
  <div class="sidebar">
    <div class="logo">
      <img :src=logo style="height: 35px;margin-right: 50px;">
    </div>
    <ul class="sidebar-items">
      <li
          v-for="(item, index) in sidebarItems"
          :key="index"
          @click="selectCategory(item.text)"
      >
        <img :src="item.image" alt="Category Icon" class="category-icon" />
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import image0 from "@/assets/image/food.png"
import image1 from "@/assets/image/hot.png";
import image2 from "@/assets/image/renconment.png";
import image3 from "@/assets/image/education.png";
import image4 from "@/assets/image/game.png";
import image5 from "@/assets/image/happy.png";
import image6 from "@/assets/image/laugh.png";
import image7 from "@/assets/image/music.png";
import image8 from "@/assets/image/fashing.png";
import image9 from "@/assets/image/sport.png";
import logo from  "@/assets/image/log.png";

const sidebarItems = [
  {image:image2,text:'推荐'},
  {image:image1,text:'热门'},
  {image:image0,text:'美食'},
  {image:image3,text:'教育'},
  {image:image4,text:'游戏'},
  {image:image5,text:'娱乐'},
  {image:image6,text:'搞笑'},
  {image:image7,text:'音乐'},
  {image:image8,text:'时尚'},
  {image:image9,text:'体育'},
];
const selectedCategory = ref('推荐');


const changeCategory = (index) => {
  selectedCategory.value = sidebarItems[index].text;
};

const selectCategory = (category) => {
  selectedCategory.value = category;
  // 发送自定义事件以将分类传递给父组件
  emit('category-selected', category);
};

</script>

<style scoped>
.sidebar {
  width: 220px;
  height: 100%;
  color: #fff;
  position: fixed;
}

.category-icon {
 width: 20px;
  height: 20px;
  margin-right: 10px; /* 添加一些右边距以分隔图标和文本 */
  margin-left: 10px;
}

.sidebar-items {
  list-style: none;
  padding: 0 45px 0 50px;
}

.sidebar-items li {
  display: flex;
  cursor: pointer;
  transition: background-color 0.2s;
  align-items: center;
  font-size: 18px;
  margin-top: 18px;
  height: 40px;
  color: #898A90;
}

.sidebar-items li:hover {
  background-color: #555;
  border-radius: 15px;
  color: white;
}
.logo{
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

</style>
