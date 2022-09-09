export function getRandomString({ len = 12, type = 'string' }) {
  const _str = `aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ`;
  const _num = `012345987601234598760123459876`;
  const baseStr = {
    string: _str,
    number: _num,
    mixed: `${_str.slice(26)}${_num.slice(0, 10)}${_str.slice(0, 26)}${_num.slice(0, 10)}`
  };
  let i = 0;
  let arr = [];
  while (i < len) {
    const ori = baseStr[type];
    const ranNum = parseInt(Math.random() * ori.length);
    arr.push(ori[ranNum]);
    i++;
  }
  return arr.join('');
}

export function file2url(file) {
  return new Promise((resolve, reject) => {
    if (!file instanceof File) {
      return reject(new Error('不是file类型的文件'));
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = res => {
      resolve(res.target.result);
    };
  });
}

export function cropImage(options = {}) {
  const { url, x = 0, y = 0, width, height, scale } = options;

  return new Promise((resolve, reject) => {
    // 加载图片
    const image = new Image();
    image.src = url;
    image.onload = function () {
      // 创建canvas元素
      const canvas = document.createElement('canvas');
      // 设置canvas宽高
      canvas.width = width * scale;
      canvas.height = height * scale;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, x * scale, y * scale, width * scale, height * scale, 0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL('image/jpeg', 1.0));
    };
    image.onerror = function () {
      reject(new Error('图片加载错误!'));
    };
  });
}

export function debounce(fn, between = 1500) {
  let executeTime;
  return function (...params) {
    if (executeTime && Date.now() - executeTime < between) return;
    fn.apply(null, params);
    executeTime = Date.now();
  };
}
