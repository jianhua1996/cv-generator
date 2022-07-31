import { markRaw } from 'vue';
import Compo from './index.vue';

export default {
  name: 'Header',
  compo: markRaw(Compo),
  compoStates: {
    value: '我是Header组件',
    color: '#ce5252ff',
    align: 'left'
  },
  defineStates: markRaw([
    {
      label: '标题名',
      colName: 'value',
      type: 'input'
    },
    {
      label: '字体颜色',
      colName: 'color',
      type: 'colorPicker'
    },
    {
      label: '水平排列',
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
  ])
};
