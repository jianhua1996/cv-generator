import { markRaw } from 'vue';
import Compo from './index.vue';

export default {
  name: '标题',
  compo: markRaw(Compo),
  compoStates: {
    value: '我是Header组件',
    fontSize: 20,
    isBold: true,
    color: '#4D4DE7FF',
    bgColor: '#DDDDDD00',
    align: 'center',
    height: 0,
    useHeight: false
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
        step: 1,
        min: 20,
        max: 34,
        precision: 0
      }
    },
    {
      label: '字体颜色',
      colName: 'color',
      type: 'colorPicker'
    },
    {
      label: '是否加粗',
      colName: 'isBold',
      type: 'switch'
    },
    {
      label: '水平对齐',
      colName: 'align',
      type: 'select',
      prop: {
        options: [
          {
            label: '居左',
            value: 'flex-start'
          },
          {
            label: '居中',
            value: 'center'
          },
          {
            label: '居右',
            value: 'flex-end'
          }
        ]
      }
    },
    {
      label: '背景颜色',
      colName: 'bgColor',
      type: 'colorPicker'
    },
    {
      label: '自定义高度',
      colName: 'height',
      type: 'inputNumber',
      subType: 'switch',
      prop: {
        swithValue: 'useHeight',
        step: 1,
        min: 0,
        max: 300
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
