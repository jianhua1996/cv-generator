import { markRaw, ref } from 'vue';
import Compo from './index.vue';

export default {
  name: '列表',
  compo: markRaw(Compo),
  compoStates: {
    listStyle: 'type3',
    listColor: '#4D4DE7FF',
    listData: [
      { isTitle: true, content: '这是标题' },
      { isTitle: false, content: '这是一段正文这是一段正文这是一段正文这是一段正文这是一段正文' }
    ]
  },
  defineStates: markRaw([
    {
      label: '列表图标样式',
      colName: 'listStyle',
      type: 'select',
      prop: {
        options: [
          {
            label: '样式一',
            value: 'type1'
          },
          {
            label: '样式二',
            value: 'type2'
          },
          {
            label: '样式三',
            value: 'type3'
          },
          {
            label: '样式四',
            value: 'type4'
          }
        ]
      }
    },
    {
      label: '列表图标颜色',
      colName: 'listColor',
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
