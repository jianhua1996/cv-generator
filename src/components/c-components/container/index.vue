<template>
  <n-grid :x-gap="compoStates.xGap" :cols="compoStates.colsCount">
    <n-gi
      class="drag-wrapper--of-compo"
      @click="alterSelectedCom(selfData[index])"
      v-for="(item, index) in Array(compoStates.colsCount)"
      :data-parent-index="parentIndex"
      :data-index="index"
    >
      <component
        v-if="selfData[index]"
        :is="selfData[index].compo"
        :compoStates="selfData[index].compoStates"
        :compoActions="selfData[index].compoActions"
      ></component>
      <div v-else>拖动组件到容器内</div>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { NGrid, NGi } from 'naive-ui';
import useSelectedComAction from '@/effects/useSelectedComAction';
import { ref, watchEffect } from 'vue';

const props = defineProps({
  compoStates: {},
  compoActions: {},
  __slot__: {},
  parentIndex: {}
});

const selfData = ref([]);

watchEffect(() => {
  if (props.__slot__) {
    selfData.value = [...props.__slot__];
  }
});

const { alterSelectedCom } = useSelectedComAction();
</script>

<style lang="scss" scoped></style>
