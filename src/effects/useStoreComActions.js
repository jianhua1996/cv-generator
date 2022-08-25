import { reactive, getCurrentInstance } from 'vue';
import originComList from '../components/c-components/index'; //  所有c-组件
export default function (options) {
  const { globalProperties } = getCurrentInstance().appContext.config;
  if (!globalProperties.loadCompoCache) {
    globalProperties.loadCompoCache = {};
  }

  function loadComFromCache(compoName) {
    if (globalProperties.loadCompoCache[compoName]) {
      // 如果loadCompoCache中有缓存这个源组件内容，则直接取出
      return globalProperties.loadCompoCache[compoName];
    }
    // 否则在源组件列表里查询
    const compo = originComList.find(item => item.name === compoName);
    // 然后缓存该名称和对应组件
    globalProperties.loadCompoCache[compoName] = compo;
    return compo;
  }

  function propertyIterator(obj, fn) {
    try {
      // 属性迭代器，根据传入的函数fn来对obj对象的每个字段进行单独处理和浅拷贝，返回一个新对象;
      const tmpObj = {};

      Object.keys(obj).forEach(propName => {
        const targetVal = fn(obj, propName); // fn函数需要返回一个处理后的值 targetVal
        tmpObj[propName] = targetVal; // 赋新值
        if (propName == '__slot__') {
          // 如果对象上有__slot__字段，说明组件是容器类型的组件，__slot__对应的值将是一个数组，需要对数组进行遍历，然后将数组内的每个对象调用propertyIterator进行递归处理
          const slotList = tmpObj.__slot__.map(slot => {
            if (slot) {
              const o = propertyIterator(slot, fn);
              return o;
            }
          });
          tmpObj.__slot__ = slotList;
        }
      });
      return tmpObj;
    } catch (e) {
      console.error(e);
    }
  }

  function saveComToStore(ls, comList) {
    const compoData = comList.map(comObj => {
      const comObjCopy = propertyIterator(comObj, function (o, prop) {
        // defineStates、defineActions等字段是组件固定的配置对象，不需要进行缓存。compo字段是组件的引用信息，为了降低保存的复杂度，同样不缓存。
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
        if (!compoDataSnap.value) {
          reject(console.warn('未读取到compo_data缓存'));
          return;
        }
        const comList = compoDataSnap.value.map(comObj => {
          const comObjCopy = propertyIterator(comObj, function (o, prop) {
            // 从源组件中加载compo、defineStates、defineActions这三个字段
            if (['compo', 'defineStates', 'defineActions'].includes(prop)) {
              const srcCompo = loadComFromCache(o.name);
              return srcCompo[prop];
            }
            // 将compoStates、compoActions这两个字段设置为reactive
            if (['compoStates', 'compoActions'].includes(prop)) return reactive({ ...o[prop] });
            return o[prop];
          });

          return comObjCopy;
        });
        resolve(comList);
      } catch (e) {
        console.error(`loadComFromStore函数执行错误，错误信息：${e}`);
        reject(e);
      }
    });
  }
  function clearStoreCom(ls) {
    return new Promise((resolve, reject) => {
      try {
        ls.removeItem('compo_data');
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
  return {
    saveComToStore,
    loadComFromStore,
    clearStoreCom
  };
}
