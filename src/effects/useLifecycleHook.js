export default function (action) {
  if (typeof action === 'object' && action !== null) {
    // 定义暴露出去的事件名称列表
    const eventList = ['useOnBeforeMount', 'useOnMounted', 'useOnUnmounted'];
    const wrapper = {}; // 包装对象
    eventList.forEach(eventName => {
      let fn;
      const oriEName = `o${eventName.slice(4)}`;
      // 匹配compoActions上的事件名称
      if (action.hasOwnProperty(oriEName)) {
        fn = new Function(action[oriEName].methodString);
      }
      wrapper[eventName] = function () {
        if (fn) {
          try {
            fn(); // 用try...catch处理一下
          } catch (e) {
            console.error(`组件[${action[oriEName].compoId}]的${oriEName}生命周期内代码运行错误，错误信息: ${e}`); // 错误处理
          }
        }
      };
    });
    return wrapper;
  } else {
    console.error('传入的参数不是一个对象，或为null。');
  }
}
