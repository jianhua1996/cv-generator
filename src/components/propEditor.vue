<template>
  <div class="prop-editor">
    <n-tabs type="segment" animated>
      <n-tab-pane name="com-states" tab="组件状态">
        <div class="state-row">
          <div class="top">组件名称：</div>
          <div class="bottom" style="padding: 0 0.5em">{{ activedComponent.name }}</div>
        </div>
        <div class="state-row">
          <div class="top">组件ID：</div>
          <div class="bottom" style="padding: 0 0.5em">{{ activedComponent.id }}</div>
        </div>
        <div class="state-row" v-for="item in defineStates">
          <div class="top">{{ item.label }} ：</div>
          <div class="bottom">
            <n-input v-model:value="compoStates[`${item.colName}`]" />
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { NTabs, NTabPane, NInput } from 'naive-ui';

const props = defineProps({
  activedComponent: {}
});

const compoStates = computed(() => props.activedComponent.compoStates || {}); // 组件内部接收到的状态
const defineStates = computed(() => props.activedComponent.defineStates || []); // compoStates中暴露给编辑器交互的状态
</script>
<style lang="scss">
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
</style>
