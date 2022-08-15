<template>
  <div class="paragraph">
    <n-ellipsis expand-trigger="click" :line-clamp="compoStates.lineClamp" :tooltip="false" :style="customStyle">
      {{ compoStates.textContent }}
    </n-ellipsis>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted } from 'vue';
import { NEllipsis } from 'naive-ui';
import useLifecycleHook from '@/effects/useLifecycleHook';
const props = defineProps({
  compoStates: {},
  compoActions: {}
});

const customStyle = computed(() => {
  return {
    textIndent: `${props.compoStates.textIndent}em`,
    lineHeight: `${props.compoStates.lineHeight}em`,
    color: props.compoStates.color,
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
.paragraph {
}
</style>
