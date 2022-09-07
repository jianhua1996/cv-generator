<template>
  <div>
    <div class="c-header" :style="customStyle">{{ compoStates.value }}</div>
  </div>
</template>
<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted } from 'vue';
import useLifecycleHook from '@/effects/useLifecycleHook';

const props = defineProps({
  compoStates: {},
  compoActions: {}
});

const customStyle = computed(() => {
  return {
    color: props.compoStates.color,
    justifyContent: props.compoStates.align,
    fontWeight: props.compoStates.isBold ? 'bold' : 'normal',
    fontSize: `${props.compoStates.fontSize}px`,
    backgroundColor: props.compoStates.bgColor,
    height: props.compoStates.useHeight ? (props.compoStates.height ? `${props.compoStates.height}px` : 'auto') : 'auto'
  };
});

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
  margin: 0.55em 0;
  word-break: break-all;
  display: flex;
  align-items: center;
}
</style>
