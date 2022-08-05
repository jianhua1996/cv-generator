<template>
  <div class="drag-wrapper--of-compo">
    <component
      v-if="__slot"
      :is="__slot.compo"
      :compoStates="__slot.compoStates"
      :compoActions="__slot.compoActions"
    ></component>
    <div v-else>拖动组件到容器内</div>
  </div>
</template>

<script setup>
const props = defineProps({
  compoStates: {},
  compoActions: {},
  __slot: {}
});
</script>

<style lang="scss" scoped></style>
