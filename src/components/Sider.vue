<template>
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
</template>

<script setup >
import {onMounted, ref} from 'vue';
import { defineEmits } from 'vue';
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


const sidebarItems = ref([
  {image: image1, text: '推荐'},
  {image: image2, text: '热门'},
  {image: image3, text: '美食'},
  {image: image4, text: '我的'},
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

  sidebarItems.value[selectedCategory.value].image = changeItems[selectedCategory.value].image1;
  const emit = defineEmits(['changeSelect'])
      //选择
  function selectCategory(index) {
    //复原图像
    sidebarItems.value[selectedCategory.value].image = changeItems[selectedCategory.value].image;

    selectedCategory.value = index
    sidebarItems.value[index].image = changeItems[index].image1;
    //向父亲发送当前选中数据
    emit('changeSelect', sidebarItems.value[index].text);
  }

onMounted(() => {
  //1.首先向后端请求一个数据视频集【推荐视频】
selectedCategory(sidebarItems.value[selectedCategory.value].text)
})

</script>

<style scoped>
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
  /*align-items: center;*/
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
  color: #898A90;
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
</style>
