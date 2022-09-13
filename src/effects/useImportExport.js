import { getCurrentInstance, reactive } from 'vue';
import { propertyIterator, loadComFromCache } from './useStoreComActions';
import { saveAs } from 'file-saver';

export default function (options) {
  const { globalProperties } = getCurrentInstance().appContext.config;
  if (!globalProperties.loadCompoCache) {
    globalProperties.loadCompoCache = {};
  }

  function exportCompoData(compoData) {
    return new Promise((resolve, reject) => {
      try {
        const filteredData = compoData.map(comObj => {
          const comObjCopy = propertyIterator(comObj, function (o, prop) {
            // defineStates、defineActions等字段是组件固定的配置对象，不需要进行缓存。compo字段是组件的引用信息，为了降低保存的复杂度，同样不缓存。
            if (['compo', 'defineStates', 'defineActions'].includes(prop)) return null;
            return o[prop];
          });
          return comObjCopy;
        });
        const file = new File([JSON.stringify(filteredData)], 'compoData.json', { type: 'application/json' });
        saveAs(file);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  function importCompoData(dataString) {
    return new Promise((resolve, reject) => {
      try {
        const data = JSON.parse(dataString);
        if (!data) {
          reject();
          return;
        }
        const result = data.map(comObj => {
          const comObjCopy = propertyIterator(comObj, function (o, prop) {
            // 从源组件中加载compo、defineStates、defineActions这三个字段
            if (['compo', 'defineStates', 'defineActions'].includes(prop)) {
              const srcCompo = loadComFromCache(o.name, globalProperties.loadCompoCache);
              return srcCompo[prop];
            }
            // 将compoStates、compoActions这两个字段设置为reactive
            if (['compoStates', 'compoActions'].includes(prop)) return reactive({ ...o[prop] });
            return o[prop];
          });

          return comObjCopy;
        });
        resolve(result);
      } catch (e) {
        console.warn('导入失败，请检查格式是否正确!');
        reject(e);
      }
    });
  }

  return {
    exportCompoData,
    importCompoData
  };
}
