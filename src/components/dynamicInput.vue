<template>
  <n-scrollbar style="max-height: 220px">
    <div class="dynamic-input-custom-wrapper" v-if="selfData.length" v-for="(item, index) in selfData" :key="index">
      <div class="dynamic-input-custom-item">
        <n-input placeholde="" v-model:value="item.title" :maxlength="15"></n-input>
        <n-input-number
          placeholde=""
          v-model:value="item.rate"
          :step="1"
          :min="1"
          :max="5"
          :precision="0"
        ></n-input-number>
      </div>
      <div class="action-part">
        <n-button circle size="small" style="margin-right: 5px" @click="minusItem(index)">
          <template #icon>
            <n-icon>
              <MinusFilled />
            </n-icon>
          </template>
        </n-button>
        <n-button circle size="small" @click="addItem(index)">
          <template #icon>
            <n-icon>
              <AddFilled />
            </n-icon>
          </template>
        </n-button>
      </div>
    </div>
    <n-button v-else @click="addContent"> 添加内容 </n-button>
  </n-scrollbar>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { NInput, NInputNumber, NScrollbar, NButton, NIcon } from 'naive-ui';
import { AddFilled, MinusFilled } from '@vicons/material';

const props = defineProps({
  dynamicVal: {}
});

const selfData = ref([]);

function minusItem(index) {
  selfData.value.splice(index, 1);
}
function addItem(index) {
  selfData.value.splice(index + 1, 0, {
    title: '学习能力',
    rate: 5
  });
}

function addContent() {
  selfData.value.push({
    title: '学习能力',
    rate: 5
  });
}

onBeforeMount(() => {
  selfData.value = props.dynamicVal;
});
</script>

<style lang="scss" scoped>
.dynamic-input-custom-item {
  display: flex;
}
.action-part {
  display: flex;
  align-items: center;
  padding: 5px;
}
</style>
