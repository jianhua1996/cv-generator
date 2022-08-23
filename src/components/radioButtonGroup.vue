<template>
  <n-radio-group :value="value" :name="name" :on-update:value="handleUpdateValue">
    <n-radio-button v-for="item in selections" :key="item.value" :value="item.value" :label="item.label" />
  </n-radio-group>
  <n-input v-model:value="spaceRate" placeholder="修改列宽比值，以'-'分割，总数24" @blur="handleConfSpace"></n-input>
</template>

<script setup>
import { NRadioGroup, NRadioButton, NInput } from 'naive-ui';
import { ref, onBeforeMount } from 'vue';
const props = defineProps({
  name: {},
  selections: {},
  value: {},
  spanList: {}
});

const emits = defineEmits(['update:value']);

const spaceRate = ref('');

function handleUpdateValue(value) {
  emits('update:value', value);
}

function handleConfSpace(e) {
  const val = (e.target.value || '').trim();

  if (!val) return;
  try {
    props.spanList.length = 0; // 先清空一下数组
    const arr = val.split('-');
    // debugger;
    props.selections.forEach((item, index) => {
      const input = arr[index];
      if (input && parseInt(input)) {
        props.spanList.push(input);
      }
    });
  } catch (e) {
    console.error(e);
  }
}

onBeforeMount(() => {
  if (props.spanList.length) spaceRate.value = props.spanList.join('-');
});
</script>

<style lang="scss" scoped></style>
