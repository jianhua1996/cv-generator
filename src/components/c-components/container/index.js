import { markRaw } from 'vue';
import Compo from './index.vue';

export default {
  name: '多列布局',
  compo: markRaw(Compo),
  compoStates: {
    xGap: 0,
    colsCount: 2
  },
  defineStates: markRaw([
    {
      label: '组件列数',
      colName: 'colsCount',
      type: 'select',
      prop: {
        options: [
          {
            label: '一列',
            value: 1
          },
          {
            label: '两列',
            value: 2
          },
          {
            label: '三列',
            value: 3
          }
        ]
      }
    },
    {
      label: '水平间距',
      colName: 'xGap',
      type: 'inputNumber',
      prop: {
        step: 1,
        min: 0,
        precision: 0
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
