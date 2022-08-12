<template>
  <div class="main-stage-wrapper">
    <div
      class="main-stage"
      v-drop="handleDropOnContainer"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      @click="handleSelectedClass"
    >
      <div
        class="__drag-wrapper--on-stage"
        v-for="(item, index) in compoListWillRender"
        :key="item.id"
        :data-index="index"
      >
        <!-- 当渲染的组件是容器组件时，才需要__slot__和parentIndex这两个字段。 -->
        <component
          :is="item.compo"
          :compoStates="item.compoStates"
          :compoActions="item.compoActions"
          :__slot__="item.__slot__"
          :indexPath="index"
          @click.capture="alterSelectedCom(item)"
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
import { inject } from 'vue';
import originComList from './c-components/index.js'; //  所有c-组件
import propEditor from './propEditor.vue';
import { NIcon, NTooltip } from 'naive-ui';
import { DeleteFilled } from '@vicons/material';
import useDragActions from '@/effects/useDragActions';
import useSelectedComAction from '@/effects/useSelectedComAction';

// 注入组件列表数据
const compoListWillRender = inject('compoListWillRender');

const { toggleDragClass, putDragElement } = useDragActions();
const { alterSelectedCom, handleSelectedClass } = useSelectedComAction();

/**
 * drop事件处理器
 * @param {*} e
 */
function handleDropOnContainer(e) {
  // drop事件触发
  const transferJSON = e.dataTransfer.getData('application/json');
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
  // 解构传递的参数
  const { target } = transferData;
  let srcCompo = originComList.find(item => item.name === target.name); // 找到源组件

  putDragElement(e, srcCompo, compoListWillRender.value);
}

function handleDragEnter(e) {
  toggleDragClass(e.path);
}

function handleDragLeave(e) {
  toggleDragClass(e.path);
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
  flex: 1;
  .__drag-wrapper--on-stage {
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
}
</style>
<style lang="scss">
.__drag-wrapper--on-stage,
.__drag-wrapper--of-container {
  border: 1px dotted rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}
.__drag-active {
  box-shadow: inset 2px 2px rgb(215, 37, 37), inset -2px -2px rgb(215, 37, 37);
}
.__drag-select {
  box-shadow: inset 2px 2px rgb(77, 77, 231), inset -2px -2px rgb(77, 77, 231);
  .--actions {
    display: flex !important;
  }
}
</style>
