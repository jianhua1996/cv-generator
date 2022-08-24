<template>
  <div style="">
    <div
      :class="['__drag-wrapper--of-container-row', isProd ? '--prodction-mode' : '--development-mode']"
      v-for="(item, index) in rowsCompo"
      :data-index-path="indexPath"
      :data-index="index"
    >
      <template v-if="item.compo">
        <component
          :is="item.compo"
          :compoStates="item.compoStates"
          :compoActions="item.compoActions"
          @click.capture="alterSelectedCom(item)"
        ></component>
        <span class="--actions">
          <n-tooltip :show-arrow="false" trigger="hover">
            <template #trigger>
              <span class="info">组件id</span>
            </template>
            {{ item.id }}
          </n-tooltip>
          <n-icon class="delete" @click="removeCompo(index)">
            <DeleteFilled />
          </n-icon>
        </span>
      </template>
      <div v-else-if="!isProd">拖拽到多行容器内</div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watchEffect } from 'vue';
import { NIcon, NTooltip } from 'naive-ui';
import { DeleteFilled } from '@vicons/material';
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
  // debugger;
  if (props.__slot__) {
    rowsCompo.value = props.__slot__.length ? [...props.__slot__] : [{}];
  }
});

const { alterSelectedCom } = useSelectedComAction();

function removeCompo(index) {
  props.__slot__.splice(index, 1);
}
</script>

<style lang="scss" scoped>
.__drag-wrapper--of-container-row {
  position: relative;
}
.--actions {
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  height: 16px;
  align-items: center;
  overflow: hidden;
  .info,
  .delete {
    font-size: 12px;
    display: block;
    height: 100%;
    background-color: rgb(77, 77, 231);
    color: #fff;
    border-radius: 2px;
  }
  .info {
    padding: 0 2px;
    margin-right: 5px;
  }
  .delete {
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
