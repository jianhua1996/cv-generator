import { markRaw } from 'vue';
import Compo from './index.vue';

export default {
  name: '评分',
  compo: markRaw(Compo),
  compoStates: {
    rateList: [
      {
        label: '学习能力',
        value: 5
      }
    ]
  },
  defineStates: markRaw([
    {
      label: '评价项',
      colName: 'rateList',
      type: 'dynamicInput'
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
