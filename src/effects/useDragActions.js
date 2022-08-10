import { reactive } from 'vue';
import { getRandomString } from '@/utils';

export default function (options = {}) {
  // 配置三种目标元素对应的类名： wrapperClassOfCompo对应容器内的包装元素类名、wrapperClassOnStage对应舞台上的包装元素类名、mainStageClass对应主舞台的类名
  const classMap = {
    wrapperClassOfContainer: 'drag-wrapper--of-container',
    wrapperClassOnStage: 'drag-wrapper--on-stage',
    mainStageClass: 'main-stage'
  };
  // 元素拖拽过程中的激活类名
  const activeClass = '__drag-active';

  const classList = Object.values(classMap);

  // 在drop事件的触发列表(元素)中，查找匹配classList数组类名的元素，classList的匹配顺序是从前向后匹配
  function findTargetEl(ePath) {
    let targetEl;
    for (let i = 0; i < ePath.length; i++) {
      // 循环drag事件的触发列表
      for (let j = 0; j < classList.length; j++) {
        // 按照classList从前向后的顺序，判断触发列表中是否有目标类名
        if (ePath[i].classList.contains(classList[j])) {
          // 如果有，则返回该元素
          targetEl = ePath[i];
          return {
            deep: j,
            targetEl
          };
        }
      }
    }
  }

  function putDragElement(e, srcCompo, compoList) {
    // deep是classList的索引值，用来区分目标元素的类型
    const { targetEl, deep } = findTargetEl(e.path);
    // 移除active效果
    deactivatedDragClass(targetEl);
    // 浅拷贝一下源组件的组件数据，保证每个渲染组件的compoStates、compoActions都是独立且响应式的
    const tmpObj = {
      ...srcCompo,
      compoStates: reactive({
        ...srcCompo.compoStates
      }),
      compoActions: reactive({ ...srcCompo.compoActions })
    };
    // 给组件初始化一个id
    tmpObj.id = getRandomString({ type: 'mixed' });

    //  targetElIndexPath只有第一种元素有
    let targetElIndexPath;
    // targetElIndex 前两种元素有，当类型为第一种时，表示当前元素在slot列表中的index、当类型为第二种时，表示当前元素在组件列表中的index
    let targetElIndex = +targetEl.dataset.index;

    // 区分目标类型进行放置
    // debugger;
    switch (deep) {
      case 0:
        targetElIndexPath = targetEl.dataset.indexPath.split('-');
        putInCompo();
        break;
      case 1:
        putOnStageWrapper();
        break;
      case 2:
        putOnMainStage();
        break;
    }

    // 放置到容器内的包装元素里
    function putInCompo() {
      let targetList = compoList;
      let targetCompo;
      targetElIndexPath.forEach(index => {
        targetCompo = targetList[index];
        targetList = targetCompo.__slot__ || [];
      });
      // debugger;
      targetList[targetElIndex] = tmpObj;
      targetCompo.__slot__ = targetList;
    }
    // 放置到舞台上的包装元素里
    function putOnStageWrapper() {
      // 判断鼠标在目标元素偏上还是偏下的位置，如果偏下，放置在当前目标元素的后面位置
      if (e.offsetY * 2 > targetEl.offsetHeight) {
        targetElIndex += 1;
      }
      compoList.splice(targetElIndex, 0, tmpObj);
    }
    // 放置到主舞台上
    function putOnMainStage() {
      compoList.push(tmpObj);
    }
  }

  function toggleDragClass(ePath) {
    const { targetEl } = findTargetEl(ePath);
    targetEl.classList.toggle(activeClass);
  }

  function deactivatedDragClass(targetEl) {
    targetEl.classList.remove(activeClass);
  }

  return {
    toggleDragClass,
    putDragElement
  };
}
