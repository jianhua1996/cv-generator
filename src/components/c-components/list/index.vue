<template>
  <div class="">
    <div class="list-item-wrapper" v-for="(item, index) in listData">
      <div :class="['tag-content', item.isTitle ? '--title' : '--content']">
        <n-icon :color="compoStates.listColor" style="margin-right: 1em" v-if="item.isTitle">
          <component :is="renderIcon" />
        </n-icon>
        <n-input
          v-if="showEdit(index)"
          type="textarea"
          :autosize="{ minRows: 1 }"
          placeholder=""
          :default-value="item.content"
          @keydown.enter.prevent="handleEditFinish"
          @blur="handleEditFinish"
        >
        </n-input>
        <span v-else class="tag --suffix">{{ item.content }}</span>
      </div>
      <n-icon
        :class="showEdit(index) || isProd ? '--invalid-mode' : ''"
        style="cursor: pointer; width: 1em; margin-left: 1.5em"
        @click="handleEdit(index)"
      >
        <EditFilled />
      </n-icon>
    </div>
    <div class="add-part">
      <template v-if="showAdd()">
        <n-radio-group v-model:value="addType" name="添加内容类型" size="small">
          <n-radio label="添加标题" value="addTitle" />
          <n-radio label="添加段落" value="addContent" />
        </n-radio-group>
        <n-input
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 3 }"
          placeholder="输入内容，按回车键进行确认，按Esc键取消"
          @keydown="handleAddFinish"
        >
        </n-input>
      </template>
      <n-icon :class="showAdd() || isProd ? '--invalid-mode' : ''" size="22" style="cursor: pointer" @click="handleAdd">
        <AddCircleOutlineTwotone />
      </n-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted, inject } from 'vue';
import { NIcon, NInput, NRadioGroup, NRadio } from 'naive-ui';
import {
  EcoTwotone,
  EmergencyTwotone,
  GradeTwotone,
  ApiTwotone,
  AutoAwesomeTwotone,
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

const addType = ref('addTitle');

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
  if (typeof currentItem.value === 'number') {
    listData.value[currentItem.value].content = evt.target.value;
    currentItem.value = null;
  }
}

function handleAdd() {
  addAction.value = true;
}

function handleAddFinish(evt) {
  const { target, key } = evt;
  if (addAction.value && ['Enter', 'Escape'].includes(key)) {
    if (key === 'Enter') {
      listData.value.push({
        isTitle: addType.value === 'addTitle',
        content: target.value
      });
    }

    addAction.value = null;
    evt.preventDefault();
  }
}

function renderIcon() {
  const type = props.compoStates.listStyle;
  switch (type) {
    case 'type1':
      return <EcoTwotone />;
    case 'type2':
      return <EmergencyTwotone />;
    case 'type3':
      return <GradeTwotone />;
    case 'type4':
      return <ApiTwotone />;
    case 'type5':
      return <AutoAwesomeTwotone />;
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
    .n-input__placeholder {
      padding: 0;
      font-size: 16px;
      color: #917f7f85;
    }
  }
}
.tag-content {
  word-break: break-all;
  &.--title {
    font-size: 18px;
    font-weight: bold;
    line-height: 1.5em;
    margin: 1em 0;
    .tag {
      color: v-bind('props.compoStates.listTitleColor');
    }
  }
  &.--content {
    font-size: 16px;
    line-height: 1.55em;
    text-indent: 36px;
    .tag {
      color: v-bind('props.compoStates.listContentColor');
    }
  }
}
.add-part {
  display: flex;
  flex-direction: column;
  line-height: 30px;
  padding-bottom: 0.5em;
}
</style>
