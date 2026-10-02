<template>
  <el-drawer size="60%" v-model="drawer" :before-close="close">
    <div>
      <el-form label-width="120" :rules="rules" ref="formRef" :model="ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入标题"> </el-input>
        </el-form-item>
        <el-form-item label="简介" prop="briefIntroduction">
          <el-input v-model="ruleForm.briefIntroduction" placeholder="请输入简介"></el-input>
        </el-form-item>
        <el-form-item label="封面图">
          <el-col :span="10">
            <el-upload
              class="avatar-uploader"
              :action="upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-col>

          <el-col :span="10">
            <div style="display: flex; flex-direction: column; gap: 20px">
              <el-form-item label="来源" prop="source">
                <el-input v-model="ruleForm.source" placeholder="请输入来源"></el-input>
              </el-form-item>
              <el-form-item label="点赞">
                <el-input-number v-model="ruleForm.likesNumber"></el-input-number>
              </el-form-item>
              <el-form-item label="浏览量">
                <el-input-number v-model="ruleForm.viewNumber"></el-input-number>
              </el-form-item>
              <el-form-item label="排序">
                <el-input-number v-model="ruleForm.sort"></el-input-number>
              </el-form-item>
              <el-form-item label="状态">
                <el-switch
                  v-model="ruleForm.type"
                  class="mb-2"
                  :active-value="0"
                  :inactive-value="1"
                  active-text="上架"
                  inactive-text="下架"
                />
              </el-form-item>
            </div>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <EditVue v-model:get-html="context"></EditVue>
    </div>
    <template #footer>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
  import EditVue from '@/view/superAdmin/imageText/components/edit/index.vue'
  import '@wangeditor/editor/dist/css/style.css' // 引入 css
  import { onBeforeUnmount, ref, shallowRef } from 'vue'
  import { Plus } from '@element-plus/icons-vue'
  import { saveStrategicGraphics } from '@/api/menu'
  import { ElMessage } from 'element-plus'

  const upload = import.meta.env.VITE_API_URL + 'util/file/oss/single'
  const ruleForm = ref({
    briefIntroduction: '',
    detailImage: '',
    graphicsId: '',
    graphicsImages: '',
    likesNumber: 0,
    sort: 0,
    source: '',
    title: '',
    type: 0,
    viewNumber: 0
  })

  const drawer = ref(false)

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef()
  const context = ref('')
  const imageUrl = ref('')

  const rules = {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    briefIntroduction: [{ required: true, message: '请输入简介', trigger: 'blur' }],
    source: [{ required: true, message: '请输入来源', trigger: 'blur' }]
  }

  function openDrawer(row) {
    if (row) {
      Object.assign(ruleForm.value, row)
      imageUrl.value = row.graphicsImages
      context.value = row.detailImage
    }

    drawer.value = true
  }

  defineExpose({
    openDrawer
  })
  const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
  }

  function handleAvatarSuccess(e) {
    imageUrl.value = e.msg
  }

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
  })

  const formRef = ref(null)

  function close() {
    ruleForm.value.briefIntroduction = ''
    ruleForm.value.source = ''
    ruleForm.value.title = ''
    ruleForm.value.briefIntroduction = ''
    ruleForm.value.graphicsImages = ''
    ruleForm.value.likesNumber = 0
    ruleForm.value.sort = 0
    ruleForm.value.graphicsId = ''
    ruleForm.value.title = ''
    ruleForm.value.type = 0
    ruleForm.value.viewNumber = 0
    imageUrl.value = ''
    context.value = ''
    drawer.value = false
  }

  const emit = defineEmits(['success'])
  function save() {
    if (!imageUrl.value.trim().length) {
      ElMessage({
        message: '请上传封面图',
        type: 'warning'
      })
      return
    }
    ruleForm.value.graphicsImages = imageUrl.value
    ruleForm.value.detailImage = context.value
    formRef.value.validate((valid, fields) => {
      if (valid) {
        saveStrategicGraphics(ruleForm.value).then(() => {
          emit('success')
          close()
        })
      } else {
        console.log('error submit!', fields)
      }
    })

    //
  }
</script>

<style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>
