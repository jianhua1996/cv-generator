import { markRaw } from 'vue';
import Compo from './index.vue';

export default {
  name: '多行布局',
  compo: markRaw(Compo),
  compoStates: {
    align: 'stretch',
    bgColor: '#FFFFFF00'
  },
  defineStates: markRaw([
    {
      label: '纵向对齐',
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
          },
          {
            label: '不设置',
            value: 'stretch'
          }
        ]
      }
    },
    {
      label: '背景色',
      colName: 'bgColor',
      type: 'colorPicker'
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
