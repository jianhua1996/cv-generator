import { reactive, getCurrentInstance, ref } from 'vue';
import cComList from '../components/c-components/index'; //  所有c-组件
export default function (options) {
  const { globalProperties } = getCurrentInstance().appContext.config;
  if (!globalProperties.loadCompoCache) {
    globalProperties.loadCompoCache = {};
  }

  function loadComFromCache(compoName) {
    // ;
    let compo;

    if (globalProperties.loadCompoCache[compoName]) {
      // 如果缓存过该名称对应的组件，则直接取出
      compo = globalProperties.loadCompoCache[compoName];
    } else {
      // 否则需要在所有组件里进行查询
      compo = cComList.find(item => item.name === compoName);
      globalProperties.loadCompoCache[compoName] = compo; // 然后缓存该名称对应组件
    }
    return compo;
  }

  function propertyIterator(obj, fn) {
    // 属性迭代器，根据传入的函数fn来对obj对象的每个字段进行单独处理，并进行浅拷贝，返回一个新的对象
    const tmpObj = {};
    Object.keys(obj).forEach(propName => {
      const targetVal = fn(obj, propName); // 需要返回一个处理后的值: targetVal
      tmpObj[propName] = targetVal; // 赋值
      if (propName == '__slot__') {
        // 如果对象上有__slot__字段，则递归这个方法
        tmpObj.__slot__ = ref(
          tmpObj.__slot__.map(slot => {
            const o = propertyIterator(slot, fn);
            return o;
          })
        );
      }
    });
    return tmpObj;
  }

  function saveComToStore(ls, comList) {
    const compoData = comList.map(comObj => {
      // ;
      const comObjCopy = propertyIterator(comObj, function (o, prop) {
        // 不缓存这些字段
        if (['compo', 'defineStates', 'defineActions'].includes(prop)) return null;
        return o[prop];
      });
      return comObjCopy;
    });

    return new Promise((resolve, reject) => {
      try {
        ls.setItem('compo_data', compoData);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  function loadComFromStore(ls) {
    return new Promise((resolve, reject) => {
      try {
        const compoDataSnap = ls.getItem('compo_data');
        const comList = compoDataSnap.value.map(comObj => {
          const srcCompo = loadComFromCache(comObj.name);
          // ;
          const comObjCopy = propertyIterator(comObj, function (o, prop) {
            // 从源组件中加载compo、defineStates、defineActions这三个字段
            if (['compo', 'defineStates', 'defineActions'].includes(prop)) return srcCompo[prop];
            // 将compoStates、compoActions这两个字段设置为reactive
            if (['compoStates', 'compoActions'].includes(prop)) return reactive({ ...o[prop] });

            return o[prop];
          });

          return comObjCopy;
        });
        resolve(comList);
      } catch (e) {
        console.error(`从缓存中加载compoData失败，错误信息：${e}`);
        reject(e);
      }
    });
  }
  function clearStoreCom(ls) {}
  return {
    saveComToStore,
    loadComFromStore,
    propertyIterator,
    loadComFromCache
  };
}
