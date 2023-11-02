<template>
  <div style="display: flex; flex-direction: column">
    <img
        @click="toggleLike(1)"
        :src="isLiked.value ? like : like0"
        alt="Like Button"
    />
    <img
        @click="comentShow"
        :src="comment"
        alt="comment Button"
    />
    <img
        @click="toggleLike(0)"
        :src="isEnshrine.value ? enshrine : enshrine0"
        alt="enshrine Button"
    />
    <img
        @click="shareClick"
        :src="share"
        alt="share Button"
    />
  </div>
</template>

<script>
import like0 from '@/assets/image/like0.svg'
import like from '@/assets/image/like.svg'
import comment from '@/assets/image/coment.svg'
import enshrine0 from '@/assets/image/enshrine0.svg'
import enshrine from '@/assets/image/enshrine.svg'
import share from '@/assets/image/share.svg'
import {ref} from "vue";
let ifShow = ref(true)
//向后端询问是否喜欢，是否收藏
let isLiked=ref(false)
let isEnshrine=ref(true)

function toggleLike(index){
  //index=1时为点赞，为0时为收藏
//切换点赞状态
  if(index){
    isLiked.value=!isLiked.value;
  }
  //切换收藏状态
else {
    isEnshrine.value=!isEnshrine.value;
  }
  //返回后端，更改后端数据



}
//打开或者关闭评论区
function comentShow(){
 ifShow.value=!ifShow.value
}
//转发逻辑
function shareClick(){

}
</script>

<style scoped>

</style>