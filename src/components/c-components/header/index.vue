<template>
  <div class="drag-wrapper--of-compo" :data-parent-index="parentIndex">
    <div class="c-header" :style="headerStyle">{{ compoStates.value }}</div>
  </div>
</template>
<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted } from 'vue';
import useLifecycleHook from '@/effects/useLifecycleHook';

const props = defineProps({
  compoStates: {},
  compoActions: {},
  parentIndex: {}
});

const headerStyle = computed(() => {
  return {
    color: props.compoStates.color,
    textAlign: props.compoStates.align,
    fontWeight: props.compoStates.isBold ? 'bold' : 'normal',
    fontSize: `${props.compoStates.fontSize}px`
  };
});

// useOnBeforeMount, useOnMounted, useOnUnmounted

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
.c-header {
  //
  margin: 0.55em 0;
}
</style>
