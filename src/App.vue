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
    <div class="top">
      <n-button type="error" @click="clearStageSnap(true)" class="btn-features"> 删除所有组件并清空缓存 </n-button>
      <n-button type="warning" @click="clearStageSnap()" class="btn-features"> 删除所有组件 </n-button>
      <n-button type="info" @click="saveStageSnap" class="btn-features"> 保存 </n-button>
    </div>
    <div class="bottom">
      <div class="left">
        <compoBox />
      </div>
      <div class="right">
        <mainStage />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, provide, onMounted } from 'vue';
import { NWatermark, NButton, createDiscreteApi } from 'naive-ui'; // 水印
import compoBox from './components/compoBox.vue'; // 左侧组件盒子
import mainStage from './components/mainStage.vue'; // 右侧主舞台
import { useLSWatcher } from 'next-vue-storage-watcher';
import useStoreComActions from '@/effects/useStoreComActions';

const ls = useLSWatcher();

const waterMark = reactive({
  show: true,
  content: '前端工程师-陈建华'
}); // 水印配置

const compoListWillRender = ref([]); // 主舞台上的组件列表
provide('compoListWillRender', compoListWillRender);

let message;

const { saveComToStore, loadComFromStore, clearStoreCom } = useStoreComActions();

function saveStageSnap() {
  saveComToStore(ls, compoListWillRender.value)
    .then(() => {
      message.success('保存成功');
    })
    .catch(err => {
      message.error('保存失败');
    });
}

function loadStageSnap() {
  loadComFromStore(ls)
    .then(comList => {
      compoListWillRender.value = comList;
    })
    .catch(err => {});
}

function clearStageSnap(clearLocal = false) {
  compoListWillRender.value = []; // 置空数组
  if (clearLocal) {
    clearStoreCom(ls)
      .then(() => {
        message.success('缓存已清空');
      })
      .catch(err => {
        message.error('缓存清空失败');
      });
  }
}

onMounted(() => {
  message = createDiscreteApi(['message']).message; // 需要等到App.vue挂载后才能使用createDiscreteApi
  loadStageSnap();
});
</script>

<style lang="scss" scoped>
.main-wrapper {
  display: flex;
  height: 100vh;
  padding: 0 12px;
  box-sizing: border-box;
  flex-direction: column;
  .top {
    line-height: 40px;
    text-align: right;
    .btn-features {
      &:not(:last-of-type) {
        margin-right: 6px;
      }
    }
  }
  .bottom {
    flex: 1;
    display: flex;
    .left {
      width: 260px;
      padding-right: 12px;
      box-sizing: border-box;
    }
    .right {
      flex: 1;
      background-color: #ddd;
    }
  }
}
</style>
<style lang="scss">
.__drag-select {
  box-shadow: inset 2px 2px rgb(77, 77, 231), inset -2px -2px rgb(77, 77, 231);
  .--actions {
    display: flex !important;
  }
}
</style>
