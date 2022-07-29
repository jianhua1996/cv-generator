<template>
  <div class="main-stage-wrapper">
    <div class="main-stage" v-drop="handleDropOnContainer" @dragenter="handleDragEnter" @dragleave="handleDragLeave">
      <div
        :class="['drag-wrapper--in-stage', item.id === activedComponent.id ? '__drag-select' : '']"
        v-for="(item, index) in compoListWillRender"
        :key="item.id"
        :data-index="index"
        @click="activeCompo(item, $event)"
      >
        <component :is="item.compo" :compoStates="item.compoStates"></component>
        <span class="--actions">
          <n-tooltip :show-arrow="false" trigger="hover">
            <template #trigger>
              <span class="info">组件id</span>
            </template>
            {{ item.id }}
          </n-tooltip>

          <n-icon class="delete" @click="removeCompo(index)">
            <DeleteFilled />
          </n-icon>
        </span>
      </div>
    </div>
    <div class="prop-editor-wrapper">
      <propEditor :activedComponent="activedComponent" />
    </div>
  </div>
</template>
<script setup>
import { inject, ref, reactive } from 'vue';
import cComList from './c-components/index.js'; //  所有c-组件
import propEditor from './propEditor.vue';
import { getRandomString } from '@/utils';
import { NIcon, NTooltip } from 'naive-ui';
import { DeleteFilled } from '@vicons/material';

const compoListWillRender = inject('compoListWillRender');

let activedComponent = ref({});

/**
 * drop事件处理器
 * @param {*} e
 */
function handleDropOnContainer(e) {
  // drop事件触发
  const transferJSON = e.dataTransfer.getData('application/json');
  // debugger;
  try {
    const transferData = JSON.parse(transferJSON);
    commonPutCompoFn(e, transferData);
  } catch (err) {
    console.error(err, 'JSON: 转换失败');
  }
}

/**
 * 通用放置函数
 * @param {*} e
 * @param {*} transferData
 */
function commonPutCompoFn(e, transferData) {
  const { target } = transferData; // 解构参数
  let srcCompo = cComList.find(item => item.name === target.name); // 找到源组件

  if (e.path[0].className.includes('main-stage')) {
    // 被激活的是主舞台
    e.path[0].classList.remove('__drag-active'); // 先移除active效果
    // 浅拷贝一下组件数据，保证每个渲染组件的compoStates都是独立且是响应式的
    const tmpObj = {
      ...srcCompo,
      compoStates: reactive({
        ...srcCompo.compoStates
      })
    };
    tmpObj.id = getRandomString({ type: 'mixed' }); // 给组件初始化一个id
    compoListWillRender.push(tmpObj); // 如果被激活的是主舞台直接把组件放到舞台最后面
  } else {
    // 被激活的不是主舞台
    const targetEl = e.path.find(el => {
      return el.className && el.className.includes('drag-wrapper--in-stage');
    }); // 找一下被激活的目标元素，注意这里找的是容器drag-wrapper--in-stage并不是渲染的组件本身

    targetEl.classList.remove('__drag-active'); // 移除active效果
    // 同样浅拷贝一下组件数据，保证每个渲染组件的compoStates都是独立且响应式
    const tmpObj = {
      ...srcCompo,
      compoStates: reactive({
        ...srcCompo.compoStates
      })
    };

    tmpObj.id = getRandomString({ type: 'mixed' }); // 添加id
    let targetElIndex = +targetEl.dataset.index; // 目标元素绑定的index
    // debugger;

    // 判断鼠标在容器内的垂直位置是否超过了容器高度的一半
    if (e.layerY * 2 > targetEl.offsetHeight) {
      targetElIndex += 1;
    }

    compoListWillRender.splice(targetElIndex, 0, tmpObj);
  }
}

/**
 * 拖动过程中添加样式
 * @param {*} e
 */
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

/**
 * 选中组件时的处理事件
 * @param {*} item
 */
function activeCompo(item, e) {
  // debugger;
  activedComponent.value = item;
}

/**
 * 移除舞台上的组件
 * @param {*} index
 */
function removeCompo(index) {
  compoListWillRender.splice(index, 1);
}
</script>
<style lang="scss" scoped>
.main-stage-wrapper {
  height: 100%;
  display: flex;
}
.main-stage {
  // height: 100%;
  flex: 1;
  .drag-wrapper--in-stage {
    border: 1px dotted rgb(155, 143, 143);
    box-sizing: border-box;
    padding: 2px;
    position: relative;
    .--actions {
      position: absolute;
      top: 0;
      right: 0;
      display: none;
      height: 16px;
      align-items: center;
      overflow: hidden;
      .info,
      .delete {
        font-size: 12px;
        display: block;
        height: 100%;
        background-color: rgb(77, 77, 231);
        color: #fff;
        border-radius: 2px;
      }
      .info {
        padding: 0 2px;
        margin-right: 5px;
      }
      .delete {
        font-size: 16px;
        cursor: pointer;
      }
    }
  }
}

.prop-editor-wrapper {
  width: 240px;
  background-color: #fff;
}

.__drag-select {
  box-shadow: inset 2px 2px rgb(77, 77, 231), inset -2px -2px rgb(77, 77, 231);
  .--actions {
    display: flex !important;
  }
}
.__drag-active {
  box-shadow: inset 2px 2px rgb(215, 37, 37), inset -2px -2px rgb(215, 37, 37);
}
</style>
