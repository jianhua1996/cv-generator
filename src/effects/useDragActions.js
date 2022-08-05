import { reactive } from 'vue';
import { getRandomString } from '@/utils';

export default function (options = {}) {
  const classMap = {
    wrapperClassOfCompo: options.wrapperClassOfCompo || 'drag-wrapper--of-compo',
    wrapperClassInStage: options.wrapperClassInStage || 'drag-wrapper--in-stage',
    mainStageClass: options.mainStageClass || 'main-stage'
  };
  const activeClass = options.activeClass || '__drag-active';
  const classList = Object.values(classMap);

  function findTargetElement(ePath) {
    // debugger;
    let targetEl;
    for (let i = 0; i < ePath.length; i++) {
      // 先循环drag事件的触发列表: epath
      for (let j = 0; j < classList.length; j++) {
        // 然后再按照目标元素（的类名）从内到外的顺序，判断epath触发的是否是该元素
        if (ePath[i].className.includes(classList[j])) {
          // 如果是，则不再向下遍历
          targetEl = ePath[i];
          return {
            deep: j,
            targetEl
          };
        }
      }
    }
  }

  function activatedDragClass(ePath) {
    const { targetEl } = findTargetElement(ePath);
    targetEl.classList.toggle(activeClass);
  }

  function deactivatedDragClass(targetEl) {
    targetEl.classList.remove(activeClass);
  }

  function putDragElement(e, srcCompo, compoList) {
    const { targetEl, deep } = findTargetElement(e.path);
    // deep用来区分触发元素的类型，主要有上面classMap提到的三种

    deactivatedDragClass(targetEl); // 先移除active效果

    // 浅拷贝一下组件数据，保证每个渲染组件的compoStates都是独立且是响应式的
    const tmpObj = {
      ...srcCompo,
      compoStates: reactive({
        ...srcCompo.compoStates
      }),
      compoActions: reactive({ ...srcCompo.compoActions })
    };
    tmpObj.id = getRandomString({ type: 'mixed' }); // 给组件初始化一个id

    if (deep === 0) {
      // 组件内部的wrapper类
    }
    if (deep === 1) {
      // 舞台上单个组件的wrapper类
      let targetElIndex = +targetEl.dataset.index; // 目标元素绑定的index

      if (e.layerY * 2 > targetEl.offsetHeight) {
        targetElIndex += 1;
      }

      compoList.splice(targetElIndex, 0, tmpObj);
    }
    if (deep === 2) {
      // 主舞台的类
      compoList.push(tmpObj);
    }
  }

  return {
    activatedDragClass,
    deactivatedDragClass,
    putDragElement
  };
}
