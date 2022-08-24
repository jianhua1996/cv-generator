<template>
  <div style="">
    <div
      :class="['__drag-wrapper--of-container-row', isProd ? '--prodction-mode' : '--development-mode']"
      v-for="(item, index) in rowsCompo"
      :data-index-path="indexPath"
      :data-index="index"
    >
      <component
        v-if="item.compo"
        :is="item.compo"
        :compoStates="item.compoStates"
        :compoActions="item.compoActions"
        @click.capture="alterSelectedCom(item)"
      ></component>
      <div v-else-if="!isProd">拖动组件到容器内</div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watchEffect } from 'vue';
import useSelectedComAction from '@/effects/useSelectedComAction';

const props = defineProps({
  compoStates: {},
  compoActions: {},
  __slot__: {},
  indexPath: {}
});

const isProd = inject('isProd');
const rowsCompo = ref([{}]);

watchEffect(() => {
  if (props.__slot__ && props.__slot__.length) {
    rowsCompo.value = [...props.__slot__];
  }
});

const { alterSelectedCom } = useSelectedComAction();
</script>

<style lang="scss" scoped></style>
