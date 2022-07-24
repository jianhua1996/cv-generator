<template lang="">
  <div class="header-1">{{ compoStates.value }}</div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  compoStates: {}
});
</script>
<style lang="scss">
.header-1 {
  font-size: 28px;
  color: #ce5252;
  margin: 20px 0;
}
</style>
