import { ref, getCurrentInstance } from 'vue';
import { findTargetEl } from './useDragActions';
export default function (options = {}) {
  const { globalProperties } = getCurrentInstance().appContext.config;
  if (!globalProperties.selectedCom) {
    globalProperties.selectedCom = ref({});
  }

  let lastSelectedComArr;
  // 保存当前选中的组件对象
  function alterSelectedCom(item) {
    if (!item) return;
    globalProperties.selectedCom.value = item;
  }

  // 在主舞台内进行点击时，给当前点击的元素添加点击样式
  function handleSelectedClass(e) {
    const { targetEl } = findTargetEl(e.path);

    // 如果是容器本身，则不进行操作
    if (targetEl.classList.contains('main-stage')) return;
    // 如果已经添加过类名，则不进行操作
    if (targetEl.classList.contains('__drag-select')) return;
    // 去除上一个元素的点击样式，保证容器内最多只有一个元素有点击样式
    if (lastSelectedComArr) lastSelectedComArr.classList.remove('__drag-select');
    // 添加class
    targetEl.classList.add('__drag-select');
    lastSelectedComArr = targetEl; // 记录这次的添加
  }

  return {
    selectedCom: globalProperties.selectedCom,
    alterSelectedCom,
    handleSelectedClass
  };
}
