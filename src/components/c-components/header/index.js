import { markRaw } from 'vue';
import Compo from './index.vue';

export default {
  name: '标题',
  compo: markRaw(Compo),
  compoStates: {
    value: '我是Header组件',
    fontSize: 28,
    isBold: true,
    color: '#BE4005FF',
    align: 'left'
  },
  defineStates: markRaw([
    {
      label: '标题内容',
      colName: 'value',
      type: 'input'
    },
    {
      label: '字体大小',
      colName: 'fontSize',
      type: 'range',
      prop: {
        step: 2,
        min: 16,
        max: 36
      }
    },
    {
      label: '是否加粗',
      colName: 'isBold',
      type: 'switch'
    },
    {
      label: '字体颜色',
      colName: 'color',
      type: 'colorPicker'
    },
    {
      label: '水平对齐',
      colName: 'align',
      type: 'select',
      prop: {
        options: [
          {
            label: '居左',
            value: 'left'
          },
          {
            label: '居中',
            value: 'center'
          },
          {
            label: '居右',
            value: 'right'
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
  // useSlot: true
};
