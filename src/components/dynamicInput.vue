<template>
  <n-scrollbar style="max-height: 220px">
    <n-dynamic-input :value="selfData" :on-create="handleCreate" :on-update:value="handleChange">
      <template #create-button-default> 添加 </template>
      <template #default="{ value }">
        <div style="display: flex; align-items: center; width: 100%">
          <n-input v-model:value="value.label" :maxlength="15" type="text" class="__label-input" />
          <n-input-number
            v-model:value="value.value"
            :min="1"
            :max="5"
            :step="1"
            :precision="0"
            class="__value-input"
          />
        </div>
      </template>
    </n-dynamic-input>
  </n-scrollbar>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { NDynamicInput, NInput, NInputNumber, NScrollbar } from 'naive-ui';

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
  console.log(props.dynamicVal);
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
