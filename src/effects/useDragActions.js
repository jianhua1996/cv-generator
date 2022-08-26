import { reactive } from 'vue';
import { getRandomString } from '@/utils';

const dragClassList = [
  '__drag-wrapper--of-container-row',
  '__drag-wrapper--of-container',
  '__drag-wrapper--on-stage',
  'main-stage'
];

const activeClass = '__drag-active';

//  查找符合传入classList类名列表的元素
export function findTargetEl(ePath, options = {}) {
  const { classList = dragClassList, findAll, filterRoot } = options;

  let targetEl; // Element | Array
  // 遍历事件的触发元素列表（冒泡的顺序）
  for (let i = 0; i < ePath.length; i++) {
    // 遍历传入的类名列表
    for (let j = 0; j < classList.length; j++) {
      // 判断当前元素是否包含classList中的这一类名
      if (ePath[i].classList.contains(classList[j])) {
        // 根据传入的查找模式，判断是否需要继续查询ePath中所有符合条件的元素
        if (findAll) {
          Array.isArray(targetEl) ? targetEl.push(ePath[i]) : (targetEl = [ePath[i]]);
          break;
        } else {
          targetEl = ePath[i];
          return {
            wrapType: j,
            targetEl
          };
        }
      }
    }
    // 当查找模式为查找全部时，也只匹配到main-stage这个元素为止，不再向上匹配
    if (ePath[i].classList.contains('main-stage')) break;
  }
  if (filterRoot) {
    targetEl.pop();
  }
  return {
    targetEl // 此时返回的是一个数组
  };
}

export function resolveElIndexPath(indexPathList, targetList) {
  if (!indexPathList.length) return [];
  let targetCompo;
  indexPathList.forEach(index => {
    targetCompo = targetList[index];
    targetList = targetCompo.__slot__ || [];
  });
  return [targetList, targetCompo];
}

export default function (options = {}) {
  function putDragElement(e, srcCompo, compoList) {
    // wrapType是classList的索引值，用来区分目标元素的类型
    const { targetEl, wrapType } = findTargetEl(e.path);
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

    // targetElIndexPath 和 targetElIndex 两个变量主要用于标记元素在深层次嵌套中的位置，targetElIndex是元素在当前容器中的索引，targetElIndexPath是容器在容器中的索引
    let targetElIndexPath, targetElIndex;

    if (targetEl.dataset.indexPath) {
      const indexPathList = targetEl.dataset.indexPath.split('-');
      targetElIndex = indexPathList.pop();
      targetElIndexPath = indexPathList;
    }

    // 区分目标类型进行放置
    switch (wrapType) {
      case 0:
      case 1:
        putInCompo();
        break;
      case 2:
        putOnStageWrapper();
        break;
      case 3:
        putOnMainStage();
        break;
    }

    // 放置到容器内的包装元素里
    function putInCompo() {
      const [targetList, targetCompo] = resolveElIndexPath(targetElIndexPath, compoList);

      if (wrapType === 0) {
        if (['多行布局', '多列布局'].includes(tmpObj.name)) {
          window.$message.warning('多行布局组件无法嵌套其他容器类型的组件');
        } else {
          targetList.push(tmpObj);
        }
      } else {
        if (tmpObj.name === '多列布局') {
          window.$message.warning('多列布局组件无法嵌套多列布局组件');
        } else {
          targetList[targetElIndex] = tmpObj;
        }
      }
      targetCompo.__slot__ = targetList;
    }
    // 放置到舞台上的包装元素里
    function putOnStageWrapper() {
      // 判断鼠标在目标元素偏上还是偏下的位置，如果偏下，放置在当前目标元素的后面位置
      if (e.offsetY * 2 > targetEl.offsetHeight) {
        targetElIndex = +targetElIndex + 1;
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
