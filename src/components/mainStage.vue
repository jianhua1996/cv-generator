<template lang="">
  <div class="main-stage" v-drop="handleDropOnContainer">
    <div class="drag-wrapper--in-stage" v-for="(item, index) in compoListWillRender" :key="index" :data-index="index">
      <component :is="item.compo"></component>
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue';
import cComList from './c-components/index.js'; //  所有c-组件

const compoListWillRender = inject('compoListWillRender');

// function handleDragStart(e, index) {}

function handleDropOnContainer(e) {
  // drop事件触发
  const transferJSON = e.dataTransfer.getData('application/json');
  try {
    const transferData = JSON.parse(transferJSON);
    if (transferData.type === 'add') {
      // 从左侧拖拽，也就是添加元素
      addCompoToStage(e, transferData.data);
    } else {
      // 从右侧拖拽，移动元素
    }
  } catch (err) {
    console.error(err, 'JSON: 转换失败');
  }
}

function addCompoToStage(e, _data) {
  const srcCompo = cComList.find(item => item.name === _data.name); // 找到源组件

  if (e.path[0].className === 'main-stage') {
    // 当前容器没有放置组件
    return compoListWillRender.value.push(srcCompo);
  }

  const targetEl = e.path.find(el => {
    // debugger;
    return el.className && el.className.includes('drag-wrapper--in-stage');
  }); // 目标元素

  // console.log(e);
  // console.log(e.offsetY, targetEl.offsetHeight); // e.offsetY 是鼠标距离drop触发元素顶部的值；
  let { index } = targetEl.dataset;
  if (e.offsetY * 2 > targetEl.offsetHeight) {
    // 鼠标偏下，应该在下一个索引的位置添加组件
    index = Number(index) + 1;
  }
  // debugger;
  compoListWillRender.value.splice(index, 0, srcCompo);
}
</script>
<style lang="scss">
.main-stage {
  height: 100%;
  .drag-wrapper--in-stage {
    border: 1px dashed gray;
  }
}
</style>
