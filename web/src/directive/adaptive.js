// directives/adaptive.js
import { nextTick } from 'vue';

// 存储监听器引用的 WeakMap，防止内存泄漏
const listenerMap = new WeakMap();

export const vAdaptive = {
  mounted(el, binding) {
    // 使用 nextTick 确保 DOM 已更新
    nextTick(() => {
      // 获取配置参数，如底部偏移量
      const { bottomOffset = 64 } = binding.value || {};
      // 初始计算高度
      updateTableHeight(el, bottomOffset);

      // 定义 resize 监听函数，并添加防抖优化性能
      const handleResize = debounce(() => {
        updateTableHeight(el, bottomOffset);
      }, 100);

      // 存储监听器引用以便后续移除
      listenerMap.set(el, handleResize);
      // 监听窗口 resize 事件
      window.addEventListener('resize', handleResize);
    });
  },
  unmounted(el) {
    // 移除监听器
    const handleResize = listenerMap.get(el);
    if (handleResize) {
      window.removeEventListener('resize', handleResize);
      listenerMap.delete(el);
    }
  }
};

// 更新表格高度的函数
function updateTableHeight(el, bottomOffset) {
  // 计算表格距离视口顶部的距离
  const topOffset = el.getBoundingClientRect().top;
  // 计算并设置表格高度
  const height = window.innerHeight - topOffset - bottomOffset;
  el.style.height = `${height}px`;
  el.style.overflowY = 'auto'; // 确保内容超出时显示滚动条

  // 如果 el-table 已渲染，触发其内部布局更新
  const tableInstance = el.__vue__?.componentProxy; // 尝试获取 Vue 组件实例
  if (tableInstance && tableInstance.doLayout) {
    tableInstance.doLayout();
  }
}

// 防抖函数
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}