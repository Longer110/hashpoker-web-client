import { nextTick } from 'vue' // 引入 nextTick


export default {
  mounted(el, binding) {
    // 异步执行，等待 DOM 挂载完成
    nextTick(async () => {
      // 1. 校验复制内容类型
      let copyContent = binding.value
      if (typeof copyContent !== 'string' && typeof copyContent !== 'number') {
        console.warn('v-copy指令仅支持字符串/数字类型的内容')
        return
      }
      copyContent = String(copyContent)

      // 2. 检查 el.parentNode 是否存在（表格单元格）
      if (!el.parentNode) {
        console.warn('目标元素的父节点不存在，无法插入复制图标')
        return
      }

      // 3. 创建图标容器（保持原有逻辑）
      const iconContainer = document.createElement('span')
      iconContainer.style.display = 'inline-block'
      iconContainer.style.marginLeft = '6px'
       iconContainer.style.marginTop = '2px'
      iconContainer.style.cursor = 'pointer'
      iconContainer.style.verticalAlign = 'middle'
      iconContainer.title = '点击复制'
      iconContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `

      // 插入图标到目标元素后方（改为 el.after() 更兼容）
      el.after(iconContainer) // 替代 el.parentNode.insertBefore(iconContainer, el.nextSibling)

      // 4. 定义复制函数（保持原有逻辑）
      const copyHandler = async () => {
        try {
          await navigator.clipboard.writeText(copyContent)
          iconContainer.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4e80ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `
          setTimeout(() => {
            iconContainer.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            `
          }, 1000)

        } catch (err) {
          // 兼容旧浏览器逻辑（保持不变）
          const textarea = document.createElement('textarea')
          textarea.value = copyContent
          textarea.style.position = 'fixed'
          textarea.style.opacity = 0
          document.body.appendChild(textarea)
          textarea.select()
          document.execCommand('copy')
          document.body.removeChild(textarea)
          iconContainer.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4e80ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `
          setTimeout(() => {
            iconContainer.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            `
          }, 1000)

        }
      }

      // 5. 绑定事件（保持不变）
      iconContainer.addEventListener('click', copyHandler)
      el.addEventListener('click', copyHandler)

      // 6. 缓存元素（保持不变）
      el.__copyIcon__ = iconContainer
      el.__copyHandler__ = copyHandler
    })
  },
  // unmounted 和 updated 钩子保持不变
  unmounted(el) {
    nextTick(() => {
      // 异步清理
      const iconContainer = el.__copyIcon__
      if (iconContainer) {
        iconContainer.removeEventListener('click', el.__copyHandler__)
        iconContainer.remove()
      }
      el.removeEventListener('click', el.__copyHandler__)
      delete el.__copyIcon__
      delete el.__copyHandler__
    })
  },
  updated(el, binding) {
    nextTick(() => {
      // 异步更新内容
      el.__copyContent__ = String(binding.value)
      // 若图标已存在，同步复制内容
      if (el.__copyIcon__) {
        el.__copyHandler__ = async () => {
          try {
            await navigator.clipboard.writeText(el.__copyContent__)
            // 省略图标切换和提示逻辑（同mounted）
          } catch (err) {
            // 兼容逻辑（同mounted）
          }
        }
      }
    })
  }
}
