<template>
  <n-grid :x-gap="compoStates.xGap || 0" :cols="compoStates.colsCount">
    <n-gi
      :class="['__drag-wrapper--of-container', isProd ? '--prodction-mode' : '--development-mode']"
      v-for="(item, index) in Array(compoStates.colsCount)"
      :data-index-path="indexPath"
      :data-index="index"
    >
      <component
        v-if="selfData[index]"
        :is="selfData[index].compo"
        :compoStates="selfData[index].compoStates"
        :compoActions="selfData[index].compoActions"
        :__slot__="selfData[index].__slot__"
        :indexPath="`${indexPath}-${index}`"
        @click.capture="alterSelectedCom(selfData[index])"
      ></component>
      <div v-else-if="!isProd">拖动组件到容器内</div>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { NGrid, NGi } from 'naive-ui';
import useSelectedComAction from '@/effects/useSelectedComAction';
import { ref, watchEffect, onBeforeMount, onMounted, onUnmounted, inject } from 'vue';
import useLifecycleHook from '@/effects/useLifecycleHook';

const props = defineProps({
  compoStates: {},
  compoActions: {},
  __slot__: {},
  indexPath: {}
});

const isProd = inject('isProd');
const selfData = ref([]);

watchEffect(() => {
  if (props.__slot__) {
    selfData.value = [...props.__slot__];
  }
});

const { alterSelectedCom } = useSelectedComAction();

const { useOnBeforeMount, useOnMounted, useOnUnmounted } = useLifecycleHook(props.compoActions);

onBeforeMount(() => {
  useOnBeforeMount();
});
onMounted(() => {
  useOnMounted();
});
onUnmounted(() => {
  useOnUnmounted();
});
</script>

<style lang="scss" scoped>
.__drag-wrapper--of-container {
  padding: 0.5em 0;
}
</style>
