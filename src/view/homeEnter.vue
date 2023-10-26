<template>
  <div class="body">
    <div class="left">
      <Sider></Sider>
    </div>
    <div class="right">
      <div class="top">

      </div>
      <div class="bottom">
        <player-video></player-video>
      </div>
    </div>
    <div class="buttons">

    </div>
  </div>

</template>

<script setup>
import PlayerVideo from "../components/PlayerVideo.vue";
import Sider from "../components/Sider"


</script>

<style scoped>
.body {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.left {
  display: flex;
  flex: 1;
  /*background-color: #42b983;*/
}

.right {
  flex: 6;
  background-color: peru;
  display: flex;
  flex-direction: column;
}
.buttons{
  flex: 0.2;
  background-color: pink;
}
.top{
  flex: 1;
}
.bottom{
  flex: 13;
  padding: 15px;
  background-color: black;
  position: relative;
}

</style>
