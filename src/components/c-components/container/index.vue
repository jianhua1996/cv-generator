<template>
  <div style="display: flex; flex-wrap: wrap">
    <div
      :class="['__drag-wrapper--of-container', isProd ? '--prodction-mode' : '--development-mode']"
      v-for="(item, index) in Array(compoStates.colsCount)"
      :data-index-path="`${indexPath}-${index}`"
      :style="{
        width: resolveWidth(index),
        marginLeft: index === 0 ? '' : `${singleGap}px`
      }"
    >
      <component
        v-if="selfData[index]"
        :is="selfData[index].compo"
        :compoStates="selfData[index].compoStates"
        :compoActions="selfData[index].compoActions"
        :__slot__="selfData[index].__slot__"
        :indexPath="`${indexPath}-${index}`"
      ></component>
      <div v-else-if="!isProd">拖拽到多列容器内</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onBeforeMount, onMounted, onUnmounted, inject, computed, isReadonly } from 'vue';
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

const singleGap = computed(() => {
  return props.compoStates.xGap || 0;
});

const resolveWidth = index => {
  const gap = (props.compoStates.colsCount - 1) * singleGap.value;
  const itemSpan = props.compoStates.spanList[index] || 24 / props.compoStates.colsCount;
  return `calc((100% - ${gap}px) / 24 * ${itemSpan})`;
};

const { useOnBeforeMount, useOnMounted, useOnUnmounted } = useLifecycleHook(props.compoActions);

onBeforeMount(() => {
  if (isReadonly(props.compoStates.spanList)) {
    props.compoStates.spanList = props.compoStates.spanList.map(item => item);
  }
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
