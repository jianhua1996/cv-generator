import { reactive, ref } from 'vue';
import { getRandomString } from '@/utils';

export default function (options = {}) {
  const classMap = {
    wrapperClassOfCompo: options.wrapperClassOfCompo || 'drag-wrapper--of-compo',
    wrapperClassInStage: options.wrapperClassInStage || 'drag-wrapper--on-stage',
    mainStageClass: options.mainStageClass || 'main-stage'
  };
  const activeClass = options.activeClass || '__drag-active';
  const classList = Object.values(classMap);

  function findTargetElement(ePath) {
    // ;
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
    // deep用来区分触发(容器)的元素类型，主要有上面classMap提到的三种

    let targetElIndex = +targetEl.dataset.index; // 目标元素本身绑定的index，只有前两种类型有这个数据
    let parentElIndex; // 目标元素父元素绑定的index，只有第一种类型有这个数据

    deactivatedDragClass(targetEl); // 先移除active效果

    // 浅拷贝一下源组件的组件数据，保证每个渲染组件的compoStates、compoActions都是独立且是响应式的
    const tmpObj = {
      ...srcCompo,
      compoStates: reactive({
        ...srcCompo.compoStates
      }),
      compoActions: reactive({ ...srcCompo.compoActions })
    };

    tmpObj.id = getRandomString({ type: 'mixed' }); // 给组件初始化一个id
    // ;
    switch (deep) {
      // 区分目标类型进行放置
      case 0:
        parentElIndex = +targetEl.dataset.parentIndex;
        // 判断目标组件是否可使用slot插槽，否则按照下一case类型进行处理
        if (compoList[parentElIndex].__slot__) {
          putInCompo();
          break;
        } else {
          targetElIndex = parentElIndex;
        }
      case 1:
        putOnStageWrapper();
        break;
      case 2:
        putOnMainStage();
        break;
    }

    function putInCompo() {
      // 放置到组件内部
      // ;
      const targetCompo = compoList[parentElIndex]; //
      let slotList = targetCompo.__slot__ || [];

      slotList[targetElIndex] = tmpObj;
      const targetObj = {
        ...targetCompo,
        __slot__: slotList
      };
      // ;
      compoList.splice(parentElIndex, 1, targetObj);
    }
    function putOnStageWrapper() {
      // 放置到舞台每个容器的wrapper上
      // ;
      if (e.offsetY * 2 > targetEl.offsetHeight) {
        targetElIndex += 1;
      }
      compoList.splice(targetElIndex, 0, tmpObj);
    }
    function putOnMainStage() {
      // 放置到主舞台上
      compoList.push(tmpObj);
    }
  }

  return {
    activatedDragClass,
    deactivatedDragClass,
    putDragElement
  };
}
