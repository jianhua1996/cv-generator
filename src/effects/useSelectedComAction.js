import { ref, getCurrentInstance } from 'vue';
export default function (options = {}) {
  const { globalProperties } = getCurrentInstance().appContext.config;
  if (!globalProperties.selectedCom) {
    globalProperties.selectedCom = ref({});
  }

  function changeSelectedCom(item) {
    debugger;
    globalProperties.selectedCom.value = item;
  }

  function comWithSelectedClass(srcId) {
    let flag = false;
    try {
      flag = srcId === globalProperties.selectedCom.value.id;
    } catch (e) {}
    return flag ? '__drag-select' : '';
  }
  return {
    selectedCom: globalProperties.selectedCom,
    changeSelectedCom,
    comWithSelectedClass
  };
}
