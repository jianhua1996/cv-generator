<template>
  <n-dynamic-input v-model:value="selfData" :on-create="handleCreate" :on-update:value="handleChange">
    <template #create-button-default> 添加 </template>
    <template #default="{ value }">
      <div style="display: flex; align-items: center; width: 100%">
        <n-input v-model:value="value.label" type="text" class="__label-input" />
        <n-input-number v-model:value="value.value" class="__value-input" />
      </div>
    </template>
  </n-dynamic-input>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { NDynamicInput, NInput, NInputNumber } from 'naive-ui';

const props = defineProps({
  dynamicVal: {}
});

const emits = defineEmits(['update:dynamicVal']);

const selfData = ref([]);

function handleCreate(index) {
  return {
    label: '学习能力',
    value: 5
  };
}

function handleChange(value) {
  emits('update:dynamicVal', value);
}

watchEffect(() => {
  selfData.value = props.dynamicVal;
});
</script>

<style lang="scss" scoped>
:deep(.n-dynamic-input-item) {
  flex-direction: column;
  .n-dynamic-input-item__action {
    margin: 5px 0 0;
  }
}
.__label-input {
  flex: 2;
}
.__value-input {
  flex: 1;
}
</style>
