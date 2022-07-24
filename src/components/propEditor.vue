<template lang="">
  <div class="prop-editor">
    <n-tabs type="segment" animated>
      <n-tab-pane name="com-states" tab="组件状态">
        <div class="state-row">
          <div class="left">组件名称：</div>
          <div class="right">{{ activedComponent.name }}</div>
        </div>
        <div class="state-row">
          <div class="left">标题：</div>
          <input v-model="compoStates.value" />
        </div>
      </n-tab-pane>
      <n-tab-pane name="com-styles" tab="组件样式"> </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script setup>
import { defineProps, computed } from 'vue';
import { NTabs, NTabPane } from 'naive-ui';

const props = defineProps({
  activedComponent: {}
});

const compoStates = computed(() => props.activedComponent.compoStates || {});
</script>
<style lang="scss">
.state-row {
  display: flex;
  line-height: 34px;
  .left {
    width: 40%;
  }
  .right {
    flex: 1;
  }
}
</style>
