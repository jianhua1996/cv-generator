<template>
  <div class="rate-container">
    <div class="rate-item-wrapper" :style="customStyle" v-for="(item, index) in compoStates.rateList" :key="index">
      <span :style="{ margin: '0 0.5em', fontWeight: 'bold', ...customStyle }" class="--suffix">
        {{ item.title }}
      </span>
      <n-rate v-model:value="item.rate" :color="compoStates.iconColor">
        <n-icon>
          <EmojiObjectsRound />
        </n-icon>
      </n-rate>
    </div>
  </div>
</template>

<script setup>
import { computed, isReadonly, onBeforeMount } from 'vue';
import { NRate, NIcon } from 'naive-ui';
import { EmojiObjectsRound } from '@vicons/material';

const props = defineProps({
  compoStates: {},
  compoActions: {}
});

const customStyle = computed(() => {
  return {
    color: props.compoStates.fontColor,
    borderColor: props.compoStates.fontColor
  };
});

onBeforeMount(() => {
  if (isReadonly(props.compoStates.rateList)) {
    props.compoStates.rateList = props.compoStates.rateList.map(item => {
      return {
        ...item
      };
    });
  }
});
</script>

<style lang="scss" scoped>
.rate-container {
  display: inline-flex;
  flex-direction: column;
}
.rate-item-wrapper {
  display: flex;
  line-height: 2em;
  align-items: center;
  border-bottom: 2px solid #000;
  justify-content: space-between;
}
</style>
