import { markRaw } from 'vue';
import Compo from './index.vue';

export default {
  name: '段落',
  compo: markRaw(Compo),
  compoStates: {
    textContent:
      '这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字，这是一段特别长特别长的段落文字。',
    lineClamp: 3,
    textIndent: 2,
    lineHeight: 1.5,
    decoration: '',
    color: '#000000FF'
  },
  defineStates: markRaw([
    {
      label: '段落内容',
      colName: 'textContent',
      type: 'textarea',
      prop: {
        minRows: 2,
        maxRows: 8
      }
    },
    {
      label: '首行缩进',
      colName: 'textIndent',
      type: 'inputNumber',
      prop: {
        step: 1,
        min: 0,
        max: 4,
        precision: 0
      }
    },
    {
      label: '行高',
      colName: 'lineHeight',
      type: 'inputNumber',
      prop: {
        step: 0.1,
        min: 1.2,
        max: 3,
        precision: 1
      }
    },
    {
      label: '字体颜色',
      colName: 'color',
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
    },
    {
      label: '溢出行隐藏',
      colName: 'lineClamp',
      type: 'inputNumber',
      prop: {
        step: 1,
        min: 1,
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
