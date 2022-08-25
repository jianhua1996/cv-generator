<template>
  <n-radio-group :value="value" :name="name" :on-update:value="handleUpdateValue">
    <n-radio-button v-for="item in selections" :key="item.value" :value="item.value" :label="item.label" />
  </n-radio-group>
  <n-input v-model:value="spaceRate" placeholder="修改列宽比值，以'-'分割，总数24" @blur="handleConfSpace"></n-input>
</template>

<script setup>
import { NRadioGroup, NRadioButton, NInput } from 'naive-ui';
import { ref, onBeforeMount, watchEffect } from 'vue';
const props = defineProps({
  name: {},
  selections: {},
  value: {},
  spanList: {}
});

const emits = defineEmits(['update:value', 'update:spanList']);

const spaceRate = ref('');

function handleUpdateValue(value) {
  emits('update:value', value);
}

function handleConfSpace(e) {
  const val = (e.target.value || '').trim();

  if (!val) return;
  try {
    const arr = val.split('-');
    const spanList = [];
    props.selections.forEach((item, index) => {
      const input = arr[index];
      if (input && parseInt(input)) {
        spanList.push(input);
      }
    });
    emits('update:spanList', spanList);
  } catch (e) {
    console.error(e);
  }
}

watchEffect(() => {
  spaceRate.value = props.spanList.length ? props.spanList.join('-') : '';
});
</script>

<style lang="scss" scoped></style>
