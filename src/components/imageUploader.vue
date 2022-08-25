<template>
  <n-upload
    ref="imgUploader"
    accept=".jpg,.jpeg,.png"
    :default-upload="false"
    v-model:file-list="files"
    :max="1"
    @change="handleChange"
    @remove="handleRemove"
  >
    <n-button>选择文件</n-button>
  </n-upload>
</template>

<script setup>
import { NUpload, NButton } from 'naive-ui';
import { file2url } from '@/utils';

const props = defineProps({
  files: {}
});
const emits = defineEmits(['update:files']);

async function handleChange(data) {
  const promiseList = data.fileList.map(item => {
    return new Promise((resolve, reject) => {
      file2url(item.file)
        .then(r => {
          resolve({
            ...item,
            file: null,
            thumbnailUrl: r
          });
        })
        .catch(e => reject(e));
    });
  });
  Promise.all(promiseList).then(list => {
    emits('update:files', list);
  });
}

function handleRemove(data) {}
</script>

<style lang="scss" scoped></style>
