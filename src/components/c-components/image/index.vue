<template>
  <div>
    <img :src="imgSrc" :style="customStyle" />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  compoStates: {},
  compoActions: {}
});

const imgSrc = computed(() => {
  const [fileItem] = props.compoStates.fileList;
  return fileItem ? fileItem.thumbnailUrl : '';
});

const customStyle = computed(() => {
  return {
    width: `${props.compoStates.width}px`,
    height: `${props.compoStates.height}px`,
    objectFit: props.compoStates.fitStyle,
    borderRadius: `${props.compoStates.imageRadius}%`
  };
});
</script>

<style lang="scss" scoped></style>
