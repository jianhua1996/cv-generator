<template>
  <div :class="['drag-wrapper--of-compo', __slot && comWithSelectedClass(__slot.id)]">
    <component
      v-if="__slot"
      :is="__slot.compo"
      :compoStates="__slot.compoStates"
      :compoActions="__slot.compoActions"
      @click="changeSelectedCom(__slot)"
    ></component>
    <div v-else>拖动组件到容器内</div>
  </div>
</template>

<script setup>
import useSelectedComAction from '@/effects/useSelectedComAction';
const props = defineProps({
  compoStates: {},
  compoActions: {},
  __slot: {}
});

const { changeSelectedCom, comWithSelectedClass } = useSelectedComAction();
</script>

<style lang="scss" scoped></style>
