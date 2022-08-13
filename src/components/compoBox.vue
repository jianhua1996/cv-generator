<template>
  <h4 style="text-align: center">组件列表</h4>
  <div class="compo-box">
    <n-tag
      class="compo-alias"
      v-for="(item, index) in originComList"
      :key="item.name"
      v-dragstart="{
        dataX: {
          target: {
            name: item.name
          }
        },
        fn: handleDragStart
      }"
    >
      {{ `${item.name}组件` }}
    </n-tag>
  </div>
</template>
<script setup>
import { NTag } from 'naive-ui';
import originComList from './c-components/index.js'; //  所有c-组件

function handleDragStart(e, dataX) {
  e.dataTransfer.setData('application/json', JSON.stringify(dataX));
}
</script>
<style lang="scss">
.compo-box {
  display: flex;
  flex-wrap: wrap;
  line-height: 32px;
  justify-content: space-between;
  .compo-alias {
    width: 46%;
    justify-content: center;
    margin-bottom: 0.75em;
  }
}
</style>
