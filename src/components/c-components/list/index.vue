<template>
  <div class="">
    <div class="list-item-wrapper" v-for="(item, index) in listData">
      <div :class="['tag-content', isTitle(index) ? '--title' : '--content']">
        <n-icon :color="compoStates.listColor" style="margin-right: 1em" v-if="isTitle(index)">
          <component :is="renderIcon" />
        </n-icon>
        <n-input
          v-if="showEdit(index)"
          type="textarea"
          :autosize="{ minRows: 1 }"
          placeholder=""
          v-model:value="item.content"
          @keydown.enter.prevent="handleEditFinish"
          @blur="handleEditFinish"
        >
        </n-input>
        <span v-else class="tag">{{ item.content }}</span>
      </div>
      <n-icon
        v-if="!showEdit(index) && !isProd"
        style="cursor: pointer; width: 1em; margin-left: 1.5em"
        @click="handleEdit(index)"
      >
        <EditFilled />
      </n-icon>
    </div>
    <div class="add-part">
      <n-input
        v-if="showAdd()"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 3 }"
        placeholder=""
        @keydown.enter.prevent="handleAddFinish"
        @blur="handleAddFinish"
      >
      </n-input>
      <n-icon v-if="!showAdd() && !isProd" size="22" style="cursor: pointer" @click="handleAdd">
        <AddCircleOutlineTwotone />
      </n-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted, inject } from 'vue';
import { NIcon, NInput } from 'naive-ui';
import {
  FilterVintageOutlined,
  EmergencyOutlined,
  GradeRound,
  HiveTwotone,
  EditFilled,
  AddCircleOutlineTwotone
} from '@vicons/material';
import useLifecycleHook from '@/effects/useLifecycleHook';

const props = defineProps({
  compoStates: {},
  compoActions: {}
});

const isProd = inject('isProd');

const listData = ref([]);
const currentItem = ref(null);
const addAction = ref(null);

const isTitle = index => {
  return index % 2 === 0;
};

const showEdit = index => {
  return currentItem.value === index;
};

const showAdd = () => {
  return addAction.value;
};

function handleEdit(index) {
  currentItem.value = index;
}

function handleEditFinish(evt) {
  currentItem.value = null;
}

function handleAdd() {
  addAction.value = true;
}

function handleAddFinish(evt) {
  const { target } = evt;
  if (addAction.value) {
    listData.value.push({
      content: target.value
    });
    addAction.value = null;
  }
}

function renderIcon() {
  const type = props.compoStates.listStyle;
  switch (type) {
    case 'type1':
      return <FilterVintageOutlined />;
    case 'type2':
      return <EmergencyOutlined />;
    case 'type3':
      return <GradeRound />;
    case 'type4':
      return <HiveTwotone />;
  }
}

const { useOnBeforeMount, useOnMounted, useOnUnmounted } = useLifecycleHook(props.compoActions);

onBeforeMount(() => {
  listData.value = props.compoStates.listData;
  useOnBeforeMount();
});
onMounted(() => {
  useOnMounted();
});
onUnmounted(() => {
  useOnUnmounted();
});
</script>

<style lang="scss" scoped>
.list-item-wrapper,
.tag-content {
  display: flex;
  align-items: center;
}
.list-item-wrapper,
.add-part {
  :deep(.n-input-wrapper) {
    padding: 0;
    .n-input__textarea-el,
    .n-input__textarea-mirror {
      padding: 0 0.5em;
      box-sizing: content-box;
      font-size: 16px;
    }
    .n-input__textarea-el {
      left: 0;
      right: 0;
      word-break: break-all;
    }
  }
}
.tag-content {
  word-break: break-all;
  &.--title {
    font-size: 18px;
    font-weight: bold;
    .tag {
      &::after {
        content: '';
        display: inline-block;
        width: 1em;
      }
    }
  }
  &.--content {
    font-size: 16px;
    line-height: 1.5em;
    text-indent: 36px;
  }
}
.add-part {
  height: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
}
</style>
