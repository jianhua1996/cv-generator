<template lang="">
  <div class="main-stage" v-drop="handleDropOnContainer" @dragenter="handleDragEnter" @dragleave="handleDragLeave">
    <div
      class="drag-wrapper--in-stage"
      v-for="(item, index) in compoListWillRender"
      :key="index"
      :data-index="index"
      v-dragstart="{ fn: handleDragStart, dataX: index }"
    >
      <component :is="item.compo"></component>
      <span class="debug-el">{{ index }}</span>
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue';
import cComList from './c-components/index.js'; //  所有c-组件

const compoListWillRender = inject('compoListWillRender');

function handleDragStart(e, index) {
  // debugger;
  const o = {
    type: 'move',
    data: {
      index
    }
  };
  e.dataTransfer.setData('application/json', JSON.stringify(o));
}

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
      moveCompo(e, transferData.data);
    }
  } catch (err) {
    console.error(err, 'JSON: 转换失败');
  }
}

function commonPutCompoFn(e, srcCompo, _data) {
  // debugger;
  if (e.path[0].className.includes('main-stage')) {
    // 当前容器没有放置组件

    e.path[0].classList.remove('__drag-active'); // 移除active类
    return compoListWillRender.value.push(srcCompo);
  }

  const targetEl = e.path.find(el => {
    // debugger;
    return el.className && el.className.includes('drag-wrapper--in-stage');
  }); // 目标元素

  targetEl.classList.remove('__drag-active'); // 移除active类

  // console.log(e.layerY, targetEl.offsetHeight); // e.layerY 是鼠标距离drop触发元素顶部的值；
  let index = Number(targetEl.dataset.index);

  if (typeof _data.index === 'number' && _data.index < index) {
    index = index - 1; // 由于上一步 删除元素后并没有立即更新视图，所以实际上触发元素的index是没有前移的，这里手动前移一位
  }
  // debugger;
  if (e.layerY * 2 > targetEl.offsetHeight) {
    // 鼠标偏下，应该在下一个索引的位置添加组件
    index = index + 1;
  }
  compoListWillRender.value.splice(index, 0, srcCompo);
}

function addCompoToStage(e, _data) {
  const srcCompo = cComList.find(item => item.name === _data.name); // 找到源组件
  commonPutCompoFn(e, srcCompo, _data);
}

function moveCompo(e, _data) {
  const srcCompo = compoListWillRender.value.splice(_data.index, 1)[0];
  commonPutCompoFn(e, srcCompo, _data);
}

function commonToggleDragActiveClass(e) {
  let targetEl;
  if (e.path[0].className.includes('main-stage')) {
    targetEl = e.path[0];
  } else {
    // debugger;
    targetEl = e.path.find(el => {
      return el.className && el.className.includes('drag-wrapper--in-stage');
    });
  }

  targetEl.classList.toggle('__drag-active');
}

function handleDragEnter(e) {
  commonToggleDragActiveClass(e);
}

function handleDragLeave(e) {
  commonToggleDragActiveClass(e);
}
</script>
<style lang="scss">
.main-stage {
  height: 100%;
  .drag-wrapper--in-stage {
    border: 1px dashed gray;
    position: relative;
    .debug-el {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}

.__drag-active {
  box-shadow: inset 2px 2px rgb(215, 37, 37), inset -2px -2px rgb(215, 37, 37);
}
</style>
