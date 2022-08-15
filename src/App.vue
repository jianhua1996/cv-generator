<template>
  <!-- 主布局 -->
  <div class="main-wrapper">
    <div class="top">
      <n-button type="error" @click="clearStageSnap(true)" class="btn-features"> 删除所有组件并清空缓存 </n-button>
      <n-button type="warning" @click="clearStageSnap()" class="btn-features"> 删除所有组件 </n-button>
      <n-button type="info" @click="saveStageSnap" class="btn-features"> 保存 </n-button>
      <n-button type="info" @click="generatePDF" class="btn-features"> 生成pdf </n-button>
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
import { ref, provide, onMounted, nextTick } from 'vue';
import { NButton, createDiscreteApi } from 'naive-ui'; // 水印
import compoBox from './components/compoBox.vue'; // 左侧组件盒子
import mainStage from './components/mainStage.vue'; // 右侧主舞台
import { useLSWatcher } from 'next-vue-storage-watcher';
import useStoreComActions from '@/effects/useStoreComActions';
import html2pdf from 'html2pdf.js';

const ls = useLSWatcher();

const compoListWillRender = ref([]); // 主舞台上的组件列表
const isProd = ref(false);
provide('compoListWillRender', compoListWillRender);
provide('isProd', isProd);

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

function generatePDF() {
  isProd.value = true;
  nextTick().then(() => {
    const el = document.querySelector('.n-scrollbar-content');
    const worker = html2pdf().from(el).save();
    worker
      .then(() => {})
      .catch(e => {})
      .finally(() => {
        isProd.value = false;
      });
  });
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
  overflow: hidden;
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
