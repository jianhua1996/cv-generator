<template>
  <!-- 主布局 -->
  <div class="main-wrapper font-harmony">
    <div class="top">
      <n-button type="error" @click="clearStageSnap(true)" class="btn-features"> 删除所有组件并清空缓存 </n-button>
      <n-button type="warning" @click="clearStageSnap()" class="btn-features"> 删除所有组件 </n-button>
      <n-button type="info" @click="saveStageSnap" class="btn-features"> 保存 </n-button>
      <n-button type="info" @click="generatePDF" :loading="generating" class="btn-features"> 生成pdf </n-button>
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
  <n-message-provider>
    <messageContent />
  </n-message-provider>
</template>

<script setup>
import { ref, provide, onMounted, nextTick } from 'vue';
import { NButton, NMessageProvider } from 'naive-ui'; // 水印
import compoBox from './components/compoBox.vue'; // 左侧组件盒子
import mainStage from './components/mainStage.vue'; // 右侧主舞台
import messageContent from './components/messageContent.vue';
import { useLSWatcher } from 'next-vue-storage-watcher';
import domtoimage from './static/dom-to-image';
import { jsPDF } from 'jspdf';
import useStoreComActions from '@/effects/useStoreComActions';

const ls = useLSWatcher();

const compoListWillRender = ref([]); // 主舞台上的组件列表
const isProd = ref(false);
provide('compoListWillRender', compoListWillRender);
provide('isProd', isProd);

const generating = ref(false);

const { saveComToStore, loadComFromStore, clearStoreCom } = useStoreComActions();

function saveStageSnap() {
  saveComToStore(ls, compoListWillRender.value)
    .then(() => {
      window.$message.success('保存成功');
    })
    .catch(err => {
      window.$message.error('保存失败');
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
        window.$message.success('缓存已清空');
      })
      .catch(err => {
        window.$message.error('缓存清空失败');
      });
  }
}

function generatePDF() {
  generating.value = true;
  isProd.value = true;
  nextTick().then(() => {
    const el = document.querySelector('.n-scrollbar-content');
    const conf = {
      bgcolor: '#fff',
      scale: 1.5,
      cacheBust: true,
      filter: el => {
        if (el.tagName && el.tagName.toLowerCase() === 'img' && !el.getAttribute('src')) {
          // 过滤掉没有src的图片元素
          return false;
        }
        return true;
      }
    };
    domtoimage
      .toJpeg(el, conf)
      .then(({ dataUrl, width, height }) => {
        const doc = new jsPDF({ unit: 'px' });
        const docWidth = doc.internal.pageSize.getWidth();
        const radio = docWidth / width;
        doc.addImage(dataUrl, 'JPEG', 0, 0, docWidth, height * radio);
        doc.save('test.pdf');
      })
      .finally(() => {
        isProd.value = false;
        generating.value = false;
      });
  });
}

onMounted(() => {
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
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;

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
<style>
@import './static/main.css';
</style>
