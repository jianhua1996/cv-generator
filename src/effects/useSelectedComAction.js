import { ref, getCurrentInstance, isRef } from 'vue';
export default function (options = {}) {
  const { globalProperties } = getCurrentInstance().appContext.config;
  if (!globalProperties.selectedCom) {
    globalProperties.selectedCom = ref({});
  }
  let lastSelectedComArr;

  function alterSelectedCom(item) {
    // ;
    if (!item) return;

    globalProperties.selectedCom.value = item;
    console.log(globalProperties.selectedCom.value, 'selectedCom');
  }

  function handleSelectedClass(e) {
    const el = e.target;
    // ;
    if (el.className.includes('main-stage')) return; // 如果是容器本身，则不进行操作
    if (el.className.includes('__drag-select')) return; // 如果已经添加过class则不进行操作
    if (lastSelectedComArr) lastSelectedComArr.classList.remove('__drag-select');
    el.classList.add('__drag-select'); // 添加class
    lastSelectedComArr = el; // 记录这次的添加
  }

  return {
    selectedCom: globalProperties.selectedCom,
    alterSelectedCom,
    handleSelectedClass
  };
}
