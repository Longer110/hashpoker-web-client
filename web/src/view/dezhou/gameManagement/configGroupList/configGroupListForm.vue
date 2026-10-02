
<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="群组ID:" prop="GroupId">
    <el-input v-model.number="formData.GroupId" :clearable="true" placeholder="请输入群组ID" />
</el-form-item>
        <el-form-item label="群组名称:" prop="GroupName">
    <el-input v-model="formData.GroupName" :clearable="true" placeholder="请输入群组名称" />
</el-form-item>
        <el-form-item label="创建所属:" prop="BranchShop">
    <el-input v-model.number="formData.BranchShop" :clearable="true" placeholder="请输入创建所属" />
</el-form-item>
        <el-form-item>
          <el-button :loading="btnLoading" type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {
  createConfigGroupList,
  updateConfigGroupList,
  findConfigGroupList
} from '@/api/dezhou/configGroupList'

defineOptions({
    name: 'ConfigGroupListForm'
})

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'


const route = useRoute()
const router = useRouter()

// 提交按钮loading
const btnLoading = ref(false)

const type = ref('')
const formData = ref({
            GroupId: undefined,
            GroupName: '',
            BranchShop: undefined,
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findConfigGroupList({ GroupId: Number(route.query.id) })
      if (res.code === 0) {
        formData.value = {
          ...res.data,
          GroupId: res.data.GroupId !== undefined && res.data.GroupId !== '' ? Number(res.data.GroupId) : undefined,
          BranchShop: res.data.BranchShop !== undefined && res.data.BranchShop !== '' ? Number(res.data.BranchShop) : undefined
        }
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
}

init()
// 保存按钮
const save = async() => {
      btnLoading.value = true
      elFormRef.value?.validate( async (valid) => {
         if (!valid) return btnLoading.value = false
            const submitData = {
              ...formData.value,
              GroupId: formData.value.GroupId !== undefined && formData.value.GroupId !== '' ? Number(formData.value.GroupId) : undefined,
              BranchShop: formData.value.BranchShop !== undefined && formData.value.BranchShop !== '' ? Number(formData.value.BranchShop) : undefined
            }
            let res
           switch (type.value) {
             case 'create':
               res = await createConfigGroupList(submitData)
               break
             case 'update':
               res = await updateConfigGroupList(submitData)
               break
             default:
               res = await createConfigGroupList(submitData)
               break
           }
           btnLoading.value = false
           if (res.code === 0) {
             ElMessage({
               type: 'success',
               message: '创建/更改成功'
             })
           }
       })
}

// 返回按钮
const back = () => {
    router.go(-1)
}

</script>

<style>
</style>
