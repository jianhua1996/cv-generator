import { markRaw } from 'vue';
import Compo from './index.vue';

export default {
  name: '评分',
  compo: markRaw(Compo),
  compoStates: {
    rateList: [
      {
        title: '学习能力',
        rate: 5
      }
    ],
    fontColor: '#333333FF',
    iconColor: '#4D4DE7FF'
  },
  defineStates: markRaw([
    {
      label: '评价项',
      colName: 'rateList',
      type: 'dynamicInput'
    },
    {
      label: '字体颜色',
      colName: 'fontColor',
      type: 'colorPicker'
    },
    {
      label: '图标颜色',
      colName: 'iconColor',
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
