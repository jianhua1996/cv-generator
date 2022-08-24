import { markRaw } from 'vue';
import Compo from './index.vue';

export default {
  name: '多行布局',
  compo: markRaw(Compo),
  compoStates: {},
  defineStates: markRaw([]),
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
