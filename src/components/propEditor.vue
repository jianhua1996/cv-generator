<template>
  <div class="prop-editor">
    <n-tabs type="segment" animated>
      <n-tab-pane name="com-states" tab="组件状态">
        <n-card size="small" embedded :title="'当前组件'" v-show="activedComponent.id">
          <div>组件名：{{ activedComponent.name }}</div>
          <div>组件ID：{{ activedComponent.id }}</div>
        </n-card>
        <div class="state-row" v-for="item in defineStates">
          <div class="top">{{ item.label }} ：</div>
          <div class="bottom">
            <template v-if="item.type === 'input'">
              <n-input v-model:value="compoStates[`${item.colName}`]" />
            </template>
            <template v-if="item.type === 'select'">
              <n-select v-model:value="compoStates[`${item.colName}`]" :options="item.prop.options" />
            </template>
            <template v-if="item.type === 'colorPicker'">
              <n-color-picker :modes="['hex']" v-model:value="compoStates[`${item.colName}`]" />
            </template>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { NTabs, NTabPane, NInput, NColorPicker, NSelect, NCard } from 'naive-ui';

const props = defineProps({
  activedComponent: {}
});

const compoStates = computed(() => props.activedComponent.compoStates || {}); // 组件内部接收到的状态
const defineStates = computed(() => props.activedComponent.defineStates || []); // compoStates中暴露给编辑器交互的状态
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
  .bottom {
  }
}
.prop-editor {
  :deep(.n-card-header__main) {
    font-weight: bold;
    color: rgb(51, 54, 57);
  }
}
</style>
