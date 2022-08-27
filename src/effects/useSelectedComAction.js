import { ref, getCurrentInstance } from 'vue';
import { findTargetEl, resolveElIndexPath } from './useDragActions';
import { getRandomString } from '@/utils';
export default function (options = {}) {
  const { globalProperties } = getCurrentInstance().appContext.config;
  if (!globalProperties.selectedCom) {
    globalProperties.selectedCom = ref({});
  }

  // clickMarkNumberBefore 记录上次点击的元素（通过属性值）; targetElList 记录上次点击事件匹配到的所有相关wrap元素; targetElIndex 记录上次在wrap元素列表中进行操作的元素索引

  let clickMarkNumberBefore, targetElList, targetElIndex;

  function alterSelectedCom(indexPath, compoList) {
    // debugger;
    const [_noUse, targetCompo] = resolveElIndexPath(indexPath.split('-'), compoList);
    if (targetCompo) globalProperties.selectedCom.value = targetCompo;
  }

  function handleSelectedClass(e, compoList) {
    const { target } = e;
    // clickMarkNumber属性，用来标记网页中的元素，可以当作唯一值
    let clickMarkNumber = target.getAttribute('clickMarkNumber');
    if (!clickMarkNumber) {
      // 如果没有添加过这个属性，则设置为16位随机数
      clickMarkNumber = getRandomString({ len: 16, type: 'number' });
      target.setAttribute('clickMarkNumber', clickMarkNumber);
    }

    // 判断当前的clickMarkNumber是否和上次点击过的相同
    if (clickMarkNumber === clickMarkNumberBefore) {
      // 相同，说明为同一元素
      // debugger;
      if (targetElList) {
        // 判断上次点击的索引是否为列表最后一个，如果是，则此次操作的索引值应重置为0，否则，将上次操作的索引加1取后面一位。
        const index = targetElIndex === targetElList.length - 1 ? 0 : targetElIndex + 1;
        // 移除上次的效果
        targetElList[targetElIndex].classList.remove('__drag-select');
        // 添加本次的效果
        targetElList[index].classList.add('__drag-select');
        alterSelectedCom(targetElList[index].dataset.indexPath, compoList);
        // 将操作后的索引赋值
        targetElIndex = index;
      }
    } else {
      // 不同，说明不是同一元素
      // 重新查询wrap元素列表
      const elList = findTargetEl(e.path, { findAll: true, filterRoot: true }).targetEl;
      // debugger;
      if (elList) {
        // 重新查询后依然从第一个元素开始操作
        const el = elList[0];

        // 判断之前是否有添加过效果，如果有则移除
        if (targetElList) {
          targetElList[targetElIndex].classList.remove('__drag-select');
        }
        // 添加本次的效果
        el.classList.add('__drag-select');
        alterSelectedCom(el.dataset.indexPath, compoList);
        // 赋值新的 targetElList 和 targetElIndex
        targetElList = elList;
        targetElIndex = 0;
        // 记录这次点击的元素标识
        clickMarkNumberBefore = clickMarkNumber;
      }
    }
  }

  return {
    selectedCom: globalProperties.selectedCom,
    handleSelectedClass
  };
}
