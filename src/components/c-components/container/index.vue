<template>
  <n-grid :x-gap="compoStates.xGap" :cols="compoStates.colsCount">
    <n-gi
      class="drag-wrapper--of-compo"
      @click="alterSelectedCom(currentSlot(index))"
      v-for="(item, index) in Array(compoStates.colsCount)"
      :data-parent-index="parentIndex"
      :data-index="index"
    >
      <component
        v-if="currentSlot(index)"
        :is="currentSlot(index).compo"
        :compoStates="currentSlot(index).compoStates"
        :compoActions="currentSlot(index).compoActions"
      ></component>
      <div v-else>拖动组件到容器内</div>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { NGrid, NGi } from 'naive-ui';
import useSelectedComAction from '@/effects/useSelectedComAction';
import { computed } from 'vue';
const props = defineProps({
  compoStates: {},
  compoActions: {},
  __slot__: {
    default() {
      return [];
    }
  },
  parentIndex: {}
});

// const

const { alterSelectedCom } = useSelectedComAction();

const currentSlot = function (index) {
  // ;
  return props.__slot__[index];
};
</script>

<style lang="scss" scoped></style>
