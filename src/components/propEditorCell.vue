<template>
  <template v-if="item.type === 'input'">
    <n-input v-model:value="compoStates[`${item.colName}`]" />
  </template>
  <template v-else-if="item.type === 'switch'">
    <n-switch v-model:value="compoStates[`${item.colName}`]" />
  </template>
  <template v-else-if="item.type === 'select'">
    <n-select v-model:value="compoStates[`${item.colName}`]" :options="item.prop.options" />
  </template>
  <template v-else-if="item.type === 'inputNumber'">
    <n-switch v-if="item.subType === 'switch'" v-model:value="compoStates[`${item.prop.swithValue}`]" />
    <n-input-number
      v-model:value="compoStates[`${item.colName}`]"
      :disabled="item.prop.swithValue ? !compoStates[`${item.prop.swithValue}`] : false"
      :step="item.prop.step"
      :min="item.prop.min"
      :max="item.prop.max"
      :precision="item.prop.precision"
    />
  </template>
  <template v-else-if="item.type === 'textarea'">
    <n-input
      v-model:value="compoStates[`${item.colName}`]"
      type="textarea"
      :autosize="{
        minRows: item.prop.minRows,
        maxRows: item.prop.maxRows
      }"
    />
  </template>
  <template v-else-if="item.type === 'range'">
    <n-slider
      v-model:value="compoStates[`${item.colName}`]"
      :step="item.prop.step"
      :min="item.prop.min"
      :max="item.prop.max"
    />
    <n-input-number
      v-model:value="compoStates[`${item.colName}`]"
      :step="item.prop.step"
      :min="item.prop.min"
      :max="item.prop.max"
      :precision="item.prop.precision"
      size="small"
    />
  </template>
  <template v-else-if="item.type === 'colorPicker'">
    <n-color-picker v-model:value="compoStates[`${item.colName}`]" :modes="['hex']" :show-preview="true" />
  </template>
  <template v-else-if="item.type === 'radioButton'">
    <radioButtonGroup
      v-model:value="compoStates[`${item.colName}`]"
      :name="item.prop.groupName"
      :selections="item.prop.selections"
      v-model:spanList="compoStates[`${item.prop.spanList}`]"
    />
  </template>
  <template v-else-if="item.type === 'imageUploader'">
    <imageUploader v-model:files="compoStates[`${item.colName}`]" />
  </template>
  <template v-else-if="item.type === 'dynamicInput'">
    <dynamicInput v-model:dynamicVal="compoStates[`${item.colName}`]" />
  </template>
</template>

<script setup>
import { NInput, NColorPicker, NSelect, NSwitch, NSlider, NInputNumber } from 'naive-ui';
import imageUploader from './imageUploader.vue';
import dynamicInput from './dynamicInput.vue';
import radioButtonGroup from './radioButtonGroup.vue';
const props = defineProps({
  item: {},
  compoStates: {}
});
</script>

<style lang="scss" scoped></style>
