<template>
  <div class="paragraph">
    <p :style="customStyle">
      {{ compoStates.textContent }}
    </p>
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
  > p {
    padding: 8px 0.75em;
    margin: 0;
    font-size: 15px;
    word-break: break-all;
  }
}
</style>
