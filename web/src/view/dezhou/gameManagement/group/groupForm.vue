
<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="分店下的用户:" prop="Id">
    <el-input v-model.number="formData.Id" :clearable="true" placeholder="请输入分店下的用户" />
</el-form-item>
        <el-form-item label="代理商名称:" prop="GroupName">
    <el-input v-model="formData.GroupName" :clearable="true" placeholder="请输入代理商名称" />
</el-form-item>
        <el-form-item label="渠道号:" prop="ChannelMark">
    <el-input v-model="formData.ChannelMark" :clearable="true" placeholder="请输入渠道号" />
</el-form-item>
        <el-form-item label="分店ID:" prop="ParentId">
    <el-input v-model.number="formData.ParentId" :clearable="true" placeholder="请输入分店ID" />
</el-form-item>
        <el-form-item label="分店的Appid:" prop="AppID">
    <el-input v-model="formData.AppID" :clearable="true" placeholder="请输入分店的Appid" />
</el-form-item>
        <el-form-item label="分店的Appid:" prop="AppKey">
    <el-input v-model="formData.AppKey" :clearable="true" placeholder="请输入分店的Appid" />
</el-form-item>
        <el-form-item label="PrivateKey字段:" prop="PrivateKey">
    <el-input v-model="formData.PrivateKey" :clearable="true" placeholder="请输入PrivateKey字段" />
</el-form-item>
        <el-form-item label="PublicKey字段:" prop="PublicKey">
    <el-input v-model="formData.PublicKey" :clearable="true" placeholder="请输入PublicKey字段" />
</el-form-item>
        <el-form-item label="IV字段:" prop="IV">
    <el-input v-model="formData.IV" :clearable="true" placeholder="请输入IV字段" />
</el-form-item>
        <el-form-item label="限制访问次数:" prop="VisitNum">
    <el-input v-model.number="formData.VisitNum" :clearable="true" placeholder="请输入限制访问次数" />
</el-form-item>
        <el-form-item label="是否开启 1：关闭  0：开启:" prop="IsDelete">
    <el-switch v-model="formData.IsDelete" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
</el-form-item>
        <el-form-item label="CreateTime字段:" prop="CreateTime">
    <el-date-picker v-model="formData.CreateTime" type="date" style="width:100%" placeholder="选择日期" :clearable="true" />
</el-form-item>
        <el-form-item label="分店登陆入口:" prop="ShopUrl">
    <el-input v-model="formData.ShopUrl" :clearable="true" placeholder="请输入分店登陆入口" />
</el-form-item>
        <el-form-item label="ip ip ip:" prop="WhiteList">
    <el-input v-model="formData.WhiteList" :clearable="true" placeholder="请输入ip ip ip" />
</el-form-item>
        <el-form-item label="所属分组:" prop="GroupId">
    <el-input v-model.number="formData.GroupId" :clearable="true" placeholder="请输入所属分组" />
</el-form-item>
        <el-form-item label="ChannelKey字段:" prop="ChannelKey">
    <el-input v-model="formData.ChannelKey" :clearable="true" placeholder="请输入ChannelKey字段" />
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
  createGroup,
  updateGroup,
  findGroup
} from '@/api/dezhou/group'

defineOptions({
    name: 'GroupForm'
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
            Id: undefined,
            GroupName: '',
            ChannelMark: '',
            ParentId: undefined,
            AppID: '',
            AppKey: '',
            PrivateKey: '',
            PublicKey: '',
            IV: '',
            VisitNum: undefined,
            IsDelete: false,
            CreateTime: new Date(),
            ShopUrl: '',
            WhiteList: '',
            GroupId: undefined,
            ChannelKey: '',
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findGroup({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data
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
            let res
           switch (type.value) {
             case 'create':
               res = await createGroup(formData.value)
               break
             case 'update':
               res = await updateGroup(formData.value)
               break
             default:
               res = await createGroup(formData.value)
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
