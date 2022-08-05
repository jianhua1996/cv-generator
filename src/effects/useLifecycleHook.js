export default function (action) {
  // debugger;
  if (typeof action === 'object' && action !== null) {
    const eventList = ['useOnBeforeMount', 'useOnMounted', 'useOnUnmounted'];
    const wrapper = {};
    eventList.forEach(eventName => {
      // debugger;
      let fn;
      const oriEName = `o${eventName.slice(4)}`;
      if (action.hasOwnProperty(oriEName)) {
        fn = new Function(action[oriEName].methodString);
      }
      wrapper[eventName] = function () {
        if (fn) {
          try {
            fn(); // 用try catch包装一下
          } catch (e) {
            console.error(`组件[${action[oriEName].compoId}]的${oriEName}生命周期内部出现代码运行错误，错误信息: ${e}`); // 错误处理
          }
        }
      };
    });
    return wrapper;
  } else {
    console.warn('传入的参数不是一个对象，或为null。');
  }
}
