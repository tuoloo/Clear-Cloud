<template>
  <div class="search-container">
    <input
        v-model="searchText"
        class="search-input"
        type="text"
        placeholder="输入搜索内容"
    />
    <button @click="search" class="search-button">
      <el
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: '' // 用于存储用户输入的搜索文本
    };
  },
  methods: {
    search() {
      // 实现搜索逻辑
      console.log('搜索内容：', this.searchText);
      // 在这里执行搜索相关的逻辑，比如向后端请求数据等
    }
  }
};
</script>

<style>
.search-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
}

.search-input {
  flex: 1;
  border: none;
  padding: 10px;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.search-button {
  background-color: #409EFF;
  color: #fff;
  border: none;
  border-radius: 0 5px 5px 0;
  padding: 10px 15px;
  cursor: pointer;
}
</style>
