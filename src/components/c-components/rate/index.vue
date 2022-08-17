<template>
  <div class="rate-container">
    <div class="rate-item-wrapper" v-for="(item, index) in compoStates.rateList" :key="index">
      <span style="margin-right: 10px; font-weight: bold">{{ item.label }}</span>
      <n-rate v-model:value="item.value" />
    </div>
  </div>
</template>

<script setup>
import { NRate } from 'naive-ui';

const props = defineProps({
  compoStates: {},
  compoActions: {}
});
</script>

<style lang="scss" scoped>
.rate-item-wrapper {
  display: flex;
  line-height: 2em;
  align-items: center;
  border-bottom: 2px solid #000;
}
</style>
