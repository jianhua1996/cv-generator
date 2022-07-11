<template>
  <!-- 全局水印 -->
  <n-watermark
    v-if="waterMark.show"
    :content="waterMark.content"
    cross
    fullscreen
    :font-size="28"
    :line-height="16"
    :width="750"
    :height="300"
    :x-offset="-120"
    :y-offset="250"
    :rotate="-30"
  />
  <!-- 主布局 -->
  <div class="main-wrapper">
    <div class="left">
      <compoBox />
    </div>
    <div class="right">
      <mainStage />
    </div>
  </div>
</template>

<script setup>
import { reactive, provide, shallowRef, ref } from 'vue';
import { NWatermark } from 'naive-ui'; // 水印
import compoBox from './components/compoBox.vue'; // 左侧组件盒子
import mainStage from './components/mainStage.vue'; // 右侧主舞台

const waterMark = reactive({
  show: true,
  content: '前端工程师-陈建华'
});

provide('compoListWillRender', ref([]));
</script>

<style lang="scss" scoped>
.main-wrapper {
  display: flex;
  min-height: 800px;
  padding: 0 12px;
  box-sizing: border-box;
  .left {
    width: 260px;
  }
  .right {
    flex: 1;
    background-color: #ddd;
  }
}
</style>
