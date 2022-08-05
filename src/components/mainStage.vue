<template>
  <div class="main-stage-wrapper">
    <div class="main-stage" v-drop="handleDropOnContainer" @dragenter="handleDragEnter" @dragleave="handleDragLeave">
      <div
        :class="['drag-wrapper--in-stage', comWithSelectedClass(item.id)]"
        v-for="(item, index) in compoListWillRender"
        :key="item.id"
        :data-index="index"
      >
        <component
          :is="item.compo"
          :compoStates="item.compoStates"
          :compoActions="item.compoActions"
          :__slot="item.__slot"
          :data-index="index"
          @click="changeSelectedCom(item)"
        ></component>
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
      <propEditor />
    </div>
  </div>
</template>
<script setup>
import { inject, ref } from 'vue';
import cComList from './c-components/index.js'; //  所有c-组件
import propEditor from './propEditor.vue';
import { NIcon, NTooltip } from 'naive-ui';
import { DeleteFilled } from '@vicons/material';
import useDragActions from '@/effects/useDragActions';
import useSelectedComAction from '@/effects/useSelectedComAction';

const compoListWillRender = inject('compoListWillRender');

const { activatedDragClass, putDragElement } = useDragActions();
const { selectedCom, changeSelectedCom, comWithSelectedClass } = useSelectedComAction();

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

  putDragElement(e, srcCompo, compoListWillRender.value);
}

function handleDragEnter(e) {
  activatedDragClass(e.path);
}

function handleDragLeave(e) {
  activatedDragClass(e.path);
}

/**
 * 移除舞台上的组件
 * @param {*} index
 */
function removeCompo(index) {
  compoListWillRender.value.splice(index, 1);
}
</script>
<style lang="scss" scoped>
.main-stage-wrapper {
  height: 100%;
  display: flex;
}
.main-stage {
  height: 100%;
  overflow: auto;
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
  height: 100%;
  overflow: auto;
}

.__drag-active {
  box-shadow: inset 2px 2px rgb(215, 37, 37), inset -2px -2px rgb(215, 37, 37);
}
</style>
