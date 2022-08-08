<template>
  <div class="prop-editor">
    <n-tabs type="segment" animated>
      <n-tab-pane name="com-states" tab="组件状态">
        <n-card size="small" embedded :title="'当前组件'" v-show="selectedCom.id">
          <div>组件名：{{ selectedCom.name }}</div>
          <div>组件ID：{{ selectedCom.id }}</div>
        </n-card>
        <div class="state-row" v-for="item in defineStates">
          <div class="top">{{ item.label }} ：</div>
          <div class="bottom">
            <template v-if="item.type === 'input'">
              <n-input v-model:value="compoStates[`${item.colName}`]" />
            </template>
            <template v-if="item.type === 'switch'">
              <n-switch v-model:value="compoStates[`${item.colName}`]" />
            </template>
            <template v-if="item.type === 'select'">
              <n-select v-model:value="compoStates[`${item.colName}`]" :options="item.prop.options" />
            </template>
            <template v-if="item.type === 'inputNumber'">
              <n-input-number
                v-model:value="compoStates[`${item.colName}`]"
                :step="item.prop.step"
                :min="item.prop.min"
                :max="item.prop.max"
              />
            </template>
            <template v-if="item.type === 'range'">
              <n-slider
                v-model:value="compoStates[`${item.colName}`]"
                :step="item.prop.step"
                :min="item.prop.min"
                :max="item.prop.max"
              />
              <n-input-number
                v-model:value="compoStates[`${item.colName}`]"
                :step="item.prop.step"
                :min="item.prop.min"
                :max="item.prop.max"
                size="small"
              />
            </template>
            <template v-if="item.type === 'colorPicker'">
              <n-color-picker v-model:value="compoStates[`${item.colName}`]" :modes="['hex']" />
            </template>
          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="com-actions" tab="组件行为">
        <n-list bordered>
          <n-list-item v-for="item in defineActions">
            {{ item.label }}
            <template #suffix>
              <EditNoteRound @click="showCodeMirror(item.key)" />
            </template>
          </n-list-item>
        </n-list>
      </n-tab-pane>
    </n-tabs>
    <n-modal v-model:show="showModal" :preset="'card'" class="card-modal--prop_editor">
      <Codemirror v-model:modelValue="codeString" />
      <template #footer>
        <n-button type="primary" @click="createFunction"> 确定 </n-button>
      </template>
    </n-modal>
  </div>
</template>
<script setup>
import { EditNoteRound } from '@vicons/material';
import { computed, ref } from 'vue';
import {
  NTabs,
  NTabPane,
  NInput,
  NColorPicker,
  NSelect,
  NCard,
  NSwitch,
  NSlider,
  NInputNumber,
  NList,
  NListItem,
  NModal,
  NButton
} from 'naive-ui';
import useSelectedComAction from '@/effects/useSelectedComAction';

const { selectedCom } = useSelectedComAction();

const compoStates = computed(() => selectedCom.value.compoStates || {}); // 组件内部接收到的状态
const defineStates = computed(() => selectedCom.value.defineStates || []); // compoStates中暴露给编辑器交互的状态
const compoActions = computed(() => selectedCom.value.compoActions || {}); // 实际添加的事件对象
const defineActions = computed(() => selectedCom.value.defineActions || []); // 定义的可添加的事件列表

const showModal = ref(false);
const currentActionKey = ref('');
const codeString = ref('');

function showCodeMirror(key) {
  currentActionKey.value = key; // 保存点击的事件key
  const oldMethod = compoActions.value[currentActionKey.value]; // 看之前是否有添加该事件的处理程序
  if (oldMethod) {
    codeString.value = oldMethod.methodString;
  } else {
    codeString.value = '';
  }
  showModal.value = true;
}

function createFunction() {
  // ;
  compoActions.value[currentActionKey.value] = {
    methodString: codeString.value,
    compoId: selectedCom.value.id
  };
  showModal.value = false;
}
</script>
<style lang="scss" scoped>
.state-row {
  display: flex;
  flex-direction: column;
  line-height: 36px;

  .top {
    &:nth-of-type(2n-1) {
      background-color: #e8e8ef;
    }
    padding: 0 0.5em;
    font-weight: bold;
  }
}
.prop-editor {
  :deep(.n-card-header__main) {
    font-weight: bold;
    color: rgb(51, 54, 57);
  }
  :deep(.n-list-item__suffix) {
    flex: unset;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.card-modal--prop_editor {
  width: 750px;
  height: 550px;
  overflow: auto;
  .n-card__footer {
    text-align: right;
  }
}
</style>
