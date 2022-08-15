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
    decoration: ''
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
        min: 16,
        max: 36,
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
    },
    {
      label: '背景颜色',
      colName: 'bgColor',
      type: 'colorPicker'
    },
    {
      label: '文字修饰',
      colName: 'decoration',
      type: 'select',
      prop: {
        options: [
          {
            label: '下划线',
            value: 'underline'
          },
          {
            label: '波浪线',
            value: 'underline wavy'
          },
          {
            label: '删除线',
            value: 'line-through'
          },
          {
            label: '无效果',
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
