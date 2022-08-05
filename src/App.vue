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
      <n-button type="error" @click="clearStage(true)" class="btn-features"> 删除所有组件并清空缓存 </n-button>
      <n-button type="warning" @click="clearStage()" class="btn-features"> 删除所有组件 </n-button>
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
import cComList from './components/c-components/index'; //  所有c-组件
import { useLSWatcher } from 'next-vue-storage-watcher';

let message;
const ls = useLSWatcher();

const waterMark = reactive({
  show: true,
  content: '前端工程师-陈建华'
});

const compoListWillRender = ref([]);
provide('compoListWillRender', compoListWillRender);

function saveStageSnap() {
  try {
    ls.setItem(
      'compo_data',
      compoListWillRender.value.map(comObj => {
        // debugger;
        const o = {
          ...comObj
        };
        delete o.compo; // 为了降低缓存数据的复杂度，不再保存compo字段
        return o;
      })
    );
    message.success('保存成功');
  } catch (e) {
    message.error('保存失败');
  }
}

function clearStage(clearLocalStorage = false) {
  // debugger;
  compoListWillRender.value = []; //清空数组
  if (clearLocalStorage) {
    try {
      ls.removeItem('compo_data');
    } catch (e) {
      console.warn('移除localStorage缓存项 "compo_data" 失败');
    }
  }
}

onMounted(() => {
  message = createDiscreteApi(['message']).message; // mount之后再使用createDiscreteApi
  const compoDataSnap = ls.getItem('compo_data'); // 从localStorage中拿到上次保存的组件数据结构
  if (compoDataSnap.value) {
    // compoDataSnap.value是之前保存的组件数组。 注意，这里没有保存compo字段，需要根据组件的名称重新加载
    const loadCompoCache = {};
    compoListWillRender.value = compoDataSnap.value.map(comObj => {
      // debugger;
      let srcCompo;
      if (loadCompoCache[comObj.name]) {
        // 如果缓存过该名称对应的组件，则直接取出
        srcCompo = loadCompoCache[comObj.name];
      } else {
        // 否则需要在所有组件里进行查询
        srcCompo = cComList.find(item => item.name === comObj.name);
        loadCompoCache[comObj.name] = srcCompo; // 然后缓存该名称对应组件
      }

      const o = {
        // 重新赋值一遍
        id: comObj.id,
        name: comObj.name,
        compo: srcCompo.compo,
        defineStates: srcCompo.defineStates,
        defineActions: srcCompo.defineActions,
        compoStates: reactive({ ...comObj.compoStates }), // 这里需要重新赋值一个新的对象，原对象的字段为readonly不可写
        compoActions: reactive({ ...comObj.compoActions }) // 同上
      };
      // debugger;
      return o;
    });
  }
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
