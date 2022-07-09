<template lang="">
  <div class="compo-box">
    <div
      class="compo-alias"
      v-for="(item, index) in cComList"
      :key="item.name"
      v-dragstart="{ dataX: item.name, fn: handleDragStart }"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script setup>
import cComList from './c-components/index.js'; //  所有c-组件

function handleDragStart(e, name) {
  // debugger;
  const o = {
    type: 'add',
    data: {
      name
    }
  };
  e.dataTransfer.setData('application/json', JSON.stringify(o));
}
</script>
<style lang="scss">
.compo-box {
}
</style>
