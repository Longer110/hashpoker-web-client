
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  mounted(el, binding) {
    const func = binding.value;
    let timer;
    el.addEventListener('click', (e) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => func(e), 300); // 300ms 是延迟时间，可以根据需要调整
    });
  },
  unmounted(el) {
    el.removeEventListener('click', () => {});
  }
};

