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
    textAlign: props.compoStates.align
  };
});
</script>
<style lang="scss">
.c-header {
  font-size: 28px;
  margin: 20px 0;
}
</style>
