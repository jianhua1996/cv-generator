<template>
  <div>
    <n-dynamic-tags
      v-model:value="tags"
      :input-props="inputProps"
      input-style="line-height: 1.5em;"
      :render-tag="renderTag"
    >
    </n-dynamic-tags>
  </div>
</template>

<script setup>
import { ref, reactive, computed, Fragment, onBeforeMount, onMounted, onUnmounted } from 'vue';
import { NDynamicTags, NTag, NIcon, NInput } from 'naive-ui';
import { FilterVintageOutlined, EmergencyOutlined, GradeRound, HiveTwotone, EditFilled } from '@vicons/material';
import useLifecycleHook from '@/effects/useLifecycleHook';

const props = defineProps({
  compoStates: {},
  compoActions: {}
});

const tags = ref([]);

const inputProps = reactive({
  type: 'textarea',
  autosize: {
    minRows: 1,
    maxRows: 3
  }
});

const currentIndex = ref(null);

const handleEdit = index => {
  currentIndex.value = index;
};

const formattedText = computed(() => {
  return tags.value[currentIndex.value].trim();
});

const handleEditFinish = e => {
  // console.log(e);
  const { type, target, keyCode } = e;

  if ((type === 'keydown' && keyCode === 13) || type === 'blur') {
    console.log(currentIndex.value);
    tags.value[currentIndex.value] = target.value;
    currentIndex.value = null;
    return false;
  }
};

function renderTag(tag, index) {
  const isTitle = index % 2 === 0;
  return (
    <NTag>
      <div class={isTitle ? 'header' : 'paragraph'}>
        {isTitle && (
          <NIcon style="margin-right: 0.5em;" color={props.compoStates.listColor}>
            {renderIcon()}
          </NIcon>
        )}
        {index === currentIndex.value ? (
          <NInput
            defaultValue={formattedText.value}
            type="textarea"
            placeholder=""
            autosize={{
              minRows: 1
            }}
            onKeydown={handleEditFinish}
            onBlur={handleEditFinish}
          ></NInput>
        ) : (
          <Fragment>
            <span>{tag}</span>
            <NIcon
              style="margin-left: 1.25em; cursor: pointer; font-weight: normal;"
              size="16"
              onClick={handleEdit.bind(null, index)}
            >
              <EditFilled style="position: absolute; right: 0;" />
            </NIcon>
          </Fragment>
        )}
      </div>
    </NTag>
  );
}

function renderIcon() {
  switch (props.compoStates.listStyle) {
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
:deep(.n-dynamic-tags) {
  flex-direction: column !important;
}
:deep(.n-tag) {
  background-color: transparent;
  word-break: break-all;
  white-space: normal;
  height: auto;
  line-height: 1.5em;
  .header,
  .paragraph {
    display: flex;
    align-items: center;
  }
  .header {
    font-weight: bold;
    font-size: 18px;
    line-height: 1.5em;
  }
  .paragraph {
    text-indent: calc(18px * 1.5 + 2px);
  }

  .n-input-wrapper {
    padding: 0;
  }
  .n-input__textarea {
    min-width: 80px;
  }
  .n-input__textarea-el,
  .n-input__textarea-mirror,
  .n-input__placeholder {
    padding: 0;
    left: 0;
    line-height: 1.5em;
  }
  .header {
    .n-input__textarea {
      font-size: 18px;
    }
  }
}
</style>
