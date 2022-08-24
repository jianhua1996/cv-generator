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
import { ref, onBeforeMount, watchEffect, watch } from 'vue';
import { NInput, NInputNumber, NScrollbar, NButton, NIcon } from 'naive-ui';
import { AddFilled, MinusFilled } from '@vicons/material';
import diff from 'deep-diff';

const props = defineProps({
  dynamicVal: {}
});

const emits = defineEmits(['update:dynamicVal']);

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

watch(
  selfData,
  val => {
    // debugger;
    // 这里emit会触发watchEffect里观察的props.dynamicVal数据变更，为了防止循环触发，需要在watchEffect里比较一下数据是否实在改变
    emits('update:dynamicVal', val);
  },
  {
    deep: true
  }
);

watchEffect(() => {
  const differences = diff(selfData.value, props.dynamicVal);
  // debugger;
  // 因为传进来的值是一个对象数组，所以为了确保数据的独立性，我们应该浅拷贝这个数组里的每个对象
  if (differences) selfData.value = props.dynamicVal.map(v => ({ ...v }));
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
