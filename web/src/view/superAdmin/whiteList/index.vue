<template>
  <div>
    <TableSkeleton
      :loading="loading"
      :show-search="false"
      :search-field-count="2"
      :search-button-count="2"
      :show-pagination="true"
    >
      <!-- <template #search>
        <div class="gva-search-box">
          <el-form ref="elSearchFormRef" :inline="true" :model="queryForm" class="demo-form-inline" @keyup.enter="onSubmit">
            <el-form-item :label="$t('Whitelist.Form.UserNameLabel')">
              <el-input class="wid-240" v-model="queryForm.username" :placeholder="$t('Whitelist.Form.UserNamePlaceholder')" clearable />
            </el-form-item>
            <el-form-item :label="$t('Whitelist.Form.UserAccountLabel')">
              <el-input class="wid-240" v-model="queryForm.account" :placeholder="$t('Whitelist.Form.UserAccountPlaceholder')" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="search" @click="getTableData">{{ $t('GlobalUniversality.Query') }}</el-button>
              <el-button icon="refresh" @click="handleReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template> -->

      <div class="gva-table-box">
        <div class="gva-btn-list">
          <el-button type="primary" icon="plus" @click="openDialog()">{{ $t('Whitelist.Actions.Add') }}</el-button>
          <!-- 白名单开关 -->
          <!-- <div>
            白名单功能：<el-switch v-model="whiteListSwitch" @change="handleSwitchChange"></el-switch>
          </div> -->
        </div>
        <el-table
          :data="tableData"
          v-adaptive="{ bottomOffset: 100 }"
          height="900"
          ref="multipleTable"
          style="width: 100%"
          row-key="id"
        >
          <el-table-column type="index" :label="$t('Whitelist.Table.Index')" width="80" align="center" />
          <!-- 用户ID -->
          <el-table-column prop="UserID" :label="$t('Whitelist.Table.UserId')" align="center" />
          <!-- 用户昵称 -->
          <el-table-column prop="NickName" :label="$t('Whitelist.Table.NickName')" align="center" />
          <!-- 用户账号 -->
          <el-table-column prop="UserAccount" :label="$t('Whitelist.Table.UserAccount')" align="center" />
          <!-- 添加账号 -->
          <el-table-column prop="OperateAccount" :label="$t('Whitelist.Table.AddAccount')" align="center" />
          <!-- 添加时间 -->
          <el-table-column prop="CreateTime" :label="$t('Whitelist.Table.CreateTime')" align="center" />
          <el-table-column :label="$t('Whitelist.Table.Actions')" width="200" align="center">
            <template #default="{ row }">
              <el-button type="primary" link icon="delete" @click="handleDelete(row)">{{ $t('Whitelist.Actions.Delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="gva-pagination">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :current-page="pagination.page"
            @size-change="
              (size) => {
                pagination.pageSize = size
                getTableData()
              }
            "
            @current-change="
              (page) => {
                pagination.page = page
                getTableData()
              }
            "
          />
        </div>
      </div>
    </TableSkeleton>

    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="dialogFormVisible"
      :show-close="false"
      :before-close="closeDialog"  
    > 
      <template #header>
        <div class="flex justify-between items-center">
          <!-- 新增/编辑 -->
          <span class="text-lg">{{ type === 'create' ? $t('Whitelist.Actions.Add') : '编辑' }}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">{{ $t('Common.Confirm') }}</el-button>
            <el-button @click="closeDialog">{{ $t('Common.Cancel') }}</el-button>
          </div>
        </div>
      </template>
      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rules" label-width="80px">
        <el-form-item :label="$t('Whitelist.Form.UserIdLabel')" prop="UserID">
          <el-input
            v-model="formData.UserID"
            :clearable="true"
            :placeholder="$t('Whitelist.Form.UserIdPlaceholder')"
          />
        </el-form-item>
        <!-- <el-form-item label="账号:" prop="account">
          <el-input
            v-model="formData.account"
            :clearable="true"
            placeholder="请输入账号"
          />
        </el-form-item> -->
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '@/pinia'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import TableSkeleton from '@/components/tableSkeleton/index.vue'
import { getWhiteList, addWhiteList, deleteWhiteList } from '@/api/whiteList'

defineOptions({
  name: 'WhiteList'
})

const { t } = useI18n()
const loading = ref(false)
const appStore = useAppStore()
const queryForm = ref({
  username: '',
  account: '',
})
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
})
// 查询列表
const getTableData = async () => {
  loading.value = true
  try {
    const res = await getWhiteList({
      page: pagination.value.page,
      pageSize: pagination.value.pageSize
    })
    tableData.value = res.data.List
    pagination.value.total = res.data.Total || res.data.List.length
    loading.value = false
  } catch (error) {
    loading.value = false
    ElMessage.error(error.message || '获取数据失败')
  }
}

// 重置
const handleReset = () => {
  queryForm.value = {
    username: '',
    account: '',
  }
  pagination.value.page = 1
  getTableData()
}

const elSearchFormRef = ref()
// 查询
const onSubmit = () => {
  elSearchFormRef.value?.validate(async (valid) => {
    if (!valid) return
    pagination.value.page = 1
    getTableData()
  })
}
// 状态变更
// const whiteListSwitch = ref(false)
// const handleSwitchChange = async (row) => {
//   const statusText = row.status === 1 ? '启用' : '禁用'
//   ElMessageBox.confirm(`确定要${statusText}白名单吗?`, '提示', {
//       confirmButtonText: '确定',
//       cancelButtonText: '取消',
//       type: 'warning'
//     }).then(async () => {
//       // 确认操作
//       // TODO: 调用实际的API接口
//       // await updateWhiteListStatus({
//       //   id: row.id,
//       //   status: row.status
//       // })
//       ElMessage.success('状态更新成功')
//     }).catch(() => {
//       // 取消操作，恢复原状态
//       whiteListSwitch.value = !whiteListSwitch.value
//     })
// }

// 删除
const handleDelete = async (row) => { 
  ElMessageBox.confirm(t('Whitelist.Messages.ConfirmDelete', { name: row.UserAccount }), t('Common.Hint'), {
    confirmButtonText: t('Common.Confirm'),
    cancelButtonText: t('Common.Cancel'),
    type: 'warning'
  })
  .then(async () => {
    // 确认操作
    await deleteWhiteList({ UserID: row.UserID })
    ElMessage.success(t('Whitelist.Messages.DeleteSuccess')) // 删除成功
    getTableData()
  })
}

// 新增/编辑逻辑
const dialogFormVisible = ref(false)
const type = ref('create')
const formData = ref({
  UserID: ''
})
const btnLoading = ref(false)
const elFormRef = ref()
const rules = computed(() => ({
  UserID: [
    { required: true, message: t('Whitelist.Form.UserIdPlaceholder'), trigger: 'blur' }
  ],
}))
const openDialog = () => {
  dialogFormVisible.value = true
  type.value = 'create'
}
const closeDialog = () => {
  dialogFormVisible.value = false
  btnLoading.value = false
}
const enterDialog = async () => { 
  btnLoading.value = true
    elFormRef.value?.validate(async (valid) => {
      if (!valid) return (btnLoading.value = false)
      try {
        let res = await addWhiteList({ ...formData.value })
        if (res.code === 0) {
          ElMessage({
            type: 'success',
            message: t('Whitelist.Messages.AddSuccess') // 创建/更改成功
          })
          getTableData()
        }
      } finally {
        closeDialog()
      }
    })
}

onMounted(() => {
  getTableData()
})
</script>

<style scoped lang="scss">
.gva-search-box {
  margin-bottom: 20px;

  .wid-240 {
    width: 240px;
  }
}

.gva-btn-list {
  margin-bottom: 10px;
}
</style>