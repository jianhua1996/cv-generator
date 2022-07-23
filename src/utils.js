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
