// utils/throttle.js
/**
 * 节流函数
 * @param {Function} func - 需要节流的函数
 * @param {number} wait - 节流间隔时间（毫秒）
 * @param {boolean} immediate - 是否立即执行（第一次触发时立即执行，之后按间隔执行）
 * @returns {Function} 节流后的函数
 */
export function throttle(func, wait = 300, immediate = true) {
  let timer = null;
  let lastTime = 0; // 记录上一次执行时间

  return function (...args) {
    const now = Date.now();

    // 首次触发且immediate为true时，立即执行
    if (immediate && !lastTime) {
      func.apply(this, args);
      lastTime = now;
      return;
    }

    // 计算剩余时间
    const remaining = wait - (now - lastTime);

    // 剩余时间小于等于0时，执行函数并重置时间
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      func.apply(this, args);
      lastTime = now;
    } else if (!timer) {
      // 剩余时间大于0时，设置定时器延迟执行
      timer = setTimeout(() => {
        func.apply(this, args);
        lastTime = Date.now();
        timer = null;
      }, remaining);
    }
  };
}