import { markRaw } from 'vue';
import Compo from './index.vue';

export default {
  name: '图片',
  compo: markRaw(Compo),
  compoStates: {
    fileList: [],
    width: 100,
    height: 100,
    fitStyle: ''
  },
  defineStates: markRaw([
    {
      label: '选择图片',
      colName: 'fileList',
      type: 'imageUploader'
    },
    {
      label: '图片宽度',
      colName: 'width',
      type: 'inputNumber',
      prop: {
        step: 1,
        min: 100,
        precision: 0
      }
    },
    {
      label: '图片高度',
      colName: 'height',
      type: 'inputNumber',
      prop: {
        step: 1,
        min: 100,
        precision: 0
      }
    },
    {
      label: '图片样式',
      colName: 'fitStyle',
      type: 'select',
      prop: {
        options: [
          {
            label: '铺满',
            value: 'cover'
          },
          {
            label: '缩放',
            value: 'contain'
          },
          {
            label: '拉伸',
            value: ''
          }
        ]
      }
    }
  ]),
  compoActions: {},
  defineActions: markRaw([
    {
      label: '元素挂载前',
      key: 'onBeforeMount'
    },
    {
      label: '元素挂载后',
      key: 'onMounted'
    },
    {
      label: '元素取消挂载后',
      key: 'onUnmounted'
    }
  ])
};
