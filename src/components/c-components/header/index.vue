<template>
  <div class="c-header" :style="headerStyle">{{ compoStates.value }}</div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  compoStates: {}
});

const headerStyle = computed(() => {
  return {
    color: props.compoStates.color,
    textAlign: props.compoStates.align,
    fontWeight: props.compoStates.isBold ? 'bold' : 'normal',
    fontSize: `${props.compoStates.fontSize}px`
  };
});
</script>
<style lang="scss" scoped>
.c-header {
  //
  margin: 0.55em 0;
}
</style>
