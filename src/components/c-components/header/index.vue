<template>
  <div>
    <div class="c-header" :style="headerStyle">{{ compoStates.value }}</div>
  </div>
</template>
<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted } from 'vue';
import useLifecycleHook from '@/effects/useLifecycleHook';

const props = defineProps({
  compoStates: {},
  compoActions: {}
});

const headerStyle = computed(() => {
  return {
    color: props.compoStates.color,
    textAlign: props.compoStates.align,
    fontWeight: props.compoStates.isBold ? 'bold' : 'normal',
    fontSize: `${props.compoStates.fontSize}px`,
    backgroundColor: props.compoStates.bgColor,
    textDecoration: `${props.compoStates.decoration} ${props.compoStates.color}`
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
  text-underline-position: under;
}
</style>
