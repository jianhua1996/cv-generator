import { markRaw } from 'vue';
import Compo from './index.vue';

export default {
  name: 'CHeader1',
  compo: markRaw(Compo),
  compoStates: {
    value: '这是header1组件'
  },
  defineStates: markRaw([
    {
      label: '标题名',
      colName: 'value',
      type: 'input'
    }
  ])
};
