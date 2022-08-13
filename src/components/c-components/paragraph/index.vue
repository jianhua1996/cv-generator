<template>
  <div class="paragraph">
    <n-ellipsis expand-trigger="click" :line-clamp="compoStates.lineClamp" :tooltip="false" :style="customStyle">
      {{ compoStates.textContent }}
    </n-ellipsis>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { NEllipsis } from 'naive-ui';
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
</script>

<style lang="scss" scoped>
.paragraph {
}
</style>
