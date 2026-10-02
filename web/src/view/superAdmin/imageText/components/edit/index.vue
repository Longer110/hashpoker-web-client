<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="state.editorVal"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>
<script setup>
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  import { reactive } from 'vue'
  import { onBeforeUnmount, shallowRef } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { ElLoading } from 'element-plus'
  import { uploadLocalFile } from '@/api/menu'

  const props = defineProps({
    // 是否禁用
    disable: {
      type: Boolean,
      default: () => false
    },
    // 内容框默认 placeholder
    placeholder: {
      type: String,
      default: () => '请输入内容...'
    },
    // https://www.wangeditor.com/v5/getting-started.html#mode-%E6%A8%A1%E5%BC%8F
    // 模式，可选 <default|simple>，默认 default
    mode: {
      type: String,
      default: () => 'default'
    },
    // 高度
    height: {
      type: String,
      default: () => '700px'
    },
    // 双向绑定，用于获取 editor.getHtml()
    getHtml: String,
    // 双向绑定，用于获取 editor.getText()
    getText: String
  })

  const editorConfig = {
    MENU_CONF: {
      uploadImage: {
        customUpload: uploadImages
      }
    }
  }

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef()
  const state = reactive({
    editorVal: props.getHtml
  })

  // 模拟 ajax 异步获取内容

  const toolbarConfig = {}

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
  })

  const emit = defineEmits(['update:getHtml', 'update:getText'])

  const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
  }

  function uploadImages(file, insertFn) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'news')
    const loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })

    uploadLocalFile(formData)
      .then((res) => {
        insertFn(res.data.msg, '', '')
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        loading.close()
      })
  }
  // 编辑器内容改变时
  const handleChange = (editor) => {
    emit('update:getHtml', editor.getHtml())
    emit('update:getText', editor.getText())
  }
</script>

<style scoped lang="scss"></style>
