function regDirective(app) {
  app.directive('dragstart', {
    mounted(el, binding, vnode) {
      // ;
      el.draggable = true;
      const _target = binding.value;
      if (typeof _target === 'object' && _target !== null && typeof _target.fn === 'function') {
        el.ondragstart = function (e) {
          e.dataTransfer.effectAllowed = 'move'; // 默认move
          const { dataX, fn } = _target;
          fn(e, dataX);
        };
      } else {
        console.error('传入的不是一个对象，或者该对象的fn属性不是一个函数');
      }
    }
  });
  app.directive('drop', {
    mounted(el, binding, vnode) {
      // ;
      el.ondragover = function (e) {
        e.preventDefault();
      };
      const _target = binding.value;
      if (typeof _target === 'function') {
        el.ondrop = function (e) {
          _target(e);
        };
      } else {
        console.error('传入的不是一个函数');
      }
    }
  });
}

export default regDirective;
