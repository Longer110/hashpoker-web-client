<template>
  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :search-field-count="2"
      :search-button-count="2"
      :show-toolbar="true"
      :toolbar-button-count="2"
      :show-pagination="true"
    >
      <template #search>
        <div class="gva-search-box">
          <el-form
            ref="elSearchFormRef"
            :inline="true"
            :model="searchInfo"
            class="demo-form-inline"
            @keyup.enter="onSubmit"
          >
            <el-form-item label="任务名称" prop="name">
              <el-input v-model="searchInfo.name" placeholder="请输入任务名称" clearable style="width: 240px"/>
            </el-form-item>
            <el-form-item label="任务状态" prop="status">
              <el-select clearable v-model="searchInfo.status" placeholder="请选择状态" style="width: 240px">
                <el-option label="开启" :value="1" />
                <el-option label="关闭" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
              <el-button icon="refresh" @click="onReset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div class="gva-table-box">
        <div class="gva-btn-list">
          <el-button type="primary" icon="plus" @click="openDialog()">新增任务</el-button>
          <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete">批量删除</el-button>
        </div>
        <el-icon :size="20" style="float: right; font-size: 33px" class="show-col-btn">
          <el-popover placement="bottom" trigger="hover" width="80">
            <template #reference>
              <el-icon :size="20"><Operation /></el-icon>
            </template>
            <div>
              <el-checkbox-group v-model="checkedColumns" @change="watchCheckedColumns" class="checkbox-wrap">
                <el-checkbox
                  size="large"
                  style="display: block"
                  v-for="item in checkBoxGroup"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-popover>
        </el-icon>

        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="id"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="30" />
          <el-table-column align="center" type="index" width="70" label="序号" />
          <el-table-column
            v-if="colData[0].istrue"
            sortable
            align="center"
            key="Math.random()"
            label="ID"
            prop="id"
            min-width="80"
          />
          <el-table-column
            v-if="colData[1].istrue"
            sortable
            align="center"
            key="Math.random()"
            label="任务名称"
            prop="name"
            min-width="160"
            show-overflow-tooltip
          />
          <el-table-column
            v-if="colData[2].istrue"
            sortable
            align="center"
            key="Math.random()"
            label="执行方法"
            prop="methodName"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column
            v-if="colData[3].istrue"
            align="center"
            key="Math.random()"
            label="方法参数"
            prop="methodParams"
            min-width="200"
            show-overflow-tooltip
          >
            <template #default="scope">
              <el-tag v-if="scope.row.methodParams" size="small" type="info">{{ scope.row.methodParams }}</el-tag>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="colData[4].istrue"
            sortable
            align="center"
            key="Math.random()"
            label="Cron表达式"
            prop="cronExpression"
            min-width="160"
          >
            <template #default="scope">
              <el-tag size="small" type="warning">{{ scope.row.cronExpression }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            v-if="colData[5].istrue"
            sortable
            align="center"
            key="Math.random()"
            label="状态"
            prop="status"
            width="100"
          >
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="2"
                @change="(val) => handleToggleStatus(scope.row, val)"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="colData[6].istrue"
            sortable
            align="center"
            key="Math.random()"
            label="执行次数"
            prop="execCount"
            width="100"
          />
          <el-table-column
            v-if="colData[7].istrue"
            sortable
            align="center"
            key="Math.random()"
            label="最后执行时间"
            prop="lastExecTime"
            min-width="180"
          >
            <template #default="scope">{{ formatDate(scope.row.lastExecTime) }}</template>
          </el-table-column>
          <el-table-column
            v-if="colData[8].istrue"
            sortable
            align="center"
            key="Math.random()"
            label="创建时间"
            prop="createdAt"
            min-width="180"
          >
            <template #default="scope">{{ formatDate(scope.row.createdAt) }}</template>
          </el-table-column>
          <el-table-column
            v-if="colData[9].istrue"
            sortable
            align="center"
            key="Math.random()"
            label="备注"
            prop="remark"
            min-width="150"
            show-overflow-tooltip
          />
          <el-table-column align="center" label="操作" fixed="right" :min-width="appStore.operateMinWith">
            <template #default="scope">
              <el-button type="primary" link class="table-button" @click="getDetails(scope.row)">
                <el-icon style="margin-right: 5px"><InfoFilled /></el-icon>详情
              </el-button>
              <el-button type="success" link class="table-button" @click="handleExecNow(scope.row)">
                <el-icon style="margin-right: 5px"><VideoPlay /></el-icon>立即执行
              </el-button>
              <el-button type="primary" link icon="edit" class="table-button" @click="updateFunc(scope.row)">编辑</el-button>
              <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="gva-pagination">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
    </TableSkeletonWrapper>

    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="dialogFormVisible"
      :show-close="false"
      :before-close="closeDialog"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">{{ type === 'create' ? '新增定时任务' : '编辑定时任务' }}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">确定</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </div>
        </div>
      </template>
      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rule" label-width="80px">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="formData.name" clearable placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item label="执行方法" prop="methodName">
          <el-input v-model="formData.methodName" clearable placeholder="请输入执行方法名，如：PrintLogDemo" />
        </el-form-item>
        <el-form-item label="方法参数" prop="methodParams">
          <el-input
            v-model="formData.methodParams"
            type="textarea"
            :rows="3"
            clearable
            placeholder='请输入方法参数(JSON格式)，如：{"message":"Hello"}'
          />
        </el-form-item>
        <el-form-item label="Cron表达式" prop="cronExpression">
          <el-input v-model="formData.cronExpression" clearable placeholder="请输入Cron表达式，如：0 * * * * * (每分钟)" />
          <div style="font-size: 12px; color: #909399; margin-top: 5px">
            格式：秒 分 时 日 月 周 &nbsp;&nbsp;示例：0 0 2 * * ? (每天凌晨2点)
          </div>
        </el-form-item>
        <el-form-item label="是否开启" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">开启</el-radio>
            <el-radio :value="2">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" :rows="2" clearable placeholder="请输入备注信息" />
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="detailShow"
      :show-close="true"
      :before-close="closeDetailShow"
      title="任务详情"
    >
      <el-descriptions :column="1" border>
        <el-descriptions-item label="ID">
          {{ detailForm.id }}
        </el-descriptions-item>
        <el-descriptions-item label="任务名称">
          {{ detailForm.name }}
        </el-descriptions-item>
        <el-descriptions-item label="执行方法">
          {{ detailForm.methodName }}
        </el-descriptions-item>
        <el-descriptions-item label="方法参数">
          {{ detailForm.methodParams || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="Cron表达式">
          {{ detailForm.cronExpression }}
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          {{ detailForm.status == 1 ? '开启' : '关闭' }}
        </el-descriptions-item>
        <el-descriptions-item label="执行次数">
          {{ detailForm.execCount || 0 }}
        </el-descriptions-item>
        <el-descriptions-item label="最后执行时间">
          {{ formatDate(detailForm.lastExecTime) }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ formatDate(detailForm.createdAt) }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">
          {{ formatDate(detailForm.updatedAt) }}
        </el-descriptions-item>
        <el-descriptions-item label="备注">
          {{ detailForm.remark || '-' }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  createScheduledTask,
  deleteScheduledTask,
  deleteScheduledTaskByIds,
  updateScheduledTask,
  findScheduledTask,
  getScheduledTaskList,
  toggleTaskStatus,
  execTaskNow
} from '@/api/dezhou/scheduledTask'

import { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/pinia'
import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

defineOptions({
  name: 'ScheduledTask'
})
const { t } = useI18n()

const loading = ref(false)
const btnLoading = ref(false)
const appStore = useAppStore()

const formData = ref({
  id: undefined,
  name: '',
  methodName: '',
  methodParams: '',
  cronExpression: '',
  status: 1,
  remark: ''
})

const rule = computed(() => ({
  name: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  methodName: [{ required: true, message: '请输入执行方法名', trigger: 'blur' }],
  cronExpression: [{ required: true, message: '请输入Cron表达式', trigger: 'blur' }]
}))

const elFormRef = ref()
const elSearchFormRef = ref()

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

const onReset = () => {
  searchInfo.value = {}
  getTableData()
}

const onSubmit = () => {
  elSearchFormRef.value?.validate(async (valid) => {
    if (!valid) return
    page.value = 1
    getTableData()
  })
}

const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

const getTableData = async () => {
  loading.value = true
  try {
    const table = await getScheduledTaskList({
      page: page.value,
      pageSize: pageSize.value,
      ...searchInfo.value
    })
    if (table.code === 0) {
      tableData.value = table.data.list
      total.value = table.data.total
      page.value = table.data.page
      pageSize.value = table.data.pageSize
    }
  } finally {
    loading.value = false
  }
}

getTableData()

const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const deleteRow = (row) => {
  ElMessageBox.confirm('确认删除该定时任务？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteFunc(row)
  })
}

const onDelete = async () => {
  ElMessageBox.confirm('确认批量删除选中的定时任务？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const ids = []
    if (multipleSelection.value.length === 0) {
      ElMessage({ type: 'warning', message: '请选择要删除的数据' })
      return
    }
    multipleSelection.value &&
      multipleSelection.value.map((item) => {
        ids.push(item.id)
      })
    const res = await deleteScheduledTaskByIds({ ids })
    if (res.code === 0) {
      ElMessage({ type: 'success', message: '批量删除成功' })
      if (tableData.value.length === ids.length && page.value > 1) {
        page.value--
      }
      getTableData()
    }
  })
}

const type = ref('')
const updateFunc = async (row) => {
  const res = await findScheduledTask({ id: row.id })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = {
      id: res.data.id,
      name: res.data.name || '',
      methodName: res.data.methodName || '',
      methodParams: res.data.methodParams || '',
      cronExpression: res.data.cronExpression || '',
      status: res.data.status != null ? Number(res.data.status) : 1,
      remark: res.data.remark || ''
    }
  }
  dialogFormVisible.value = true
}

const deleteFunc = async (row) => {
  const res = await deleteScheduledTask({ id: row.id })
  if (res.code === 0) {
    ElMessage({ type: 'success', message: '删除成功' })
    if (tableData.value.length === 1 && page.value > 1) {
      page.value--
    }
    getTableData()
  }
}

const dialogFormVisible = ref(false)
const openDialog = () => {
  formData.value = {
    id: undefined,
    name: '',
    methodName: '',
    methodParams: '',
    cronExpression: '',
    status: 1,
    remark: ''
  }
  type.value = 'create'
  dialogFormVisible.value = true
}

const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    id: undefined,
    name: '',
    methodName: '',
    methodParams: '',
    cronExpression: '',
    status: 1,
    remark: ''
  }
}

const enterDialog = async () => {
  btnLoading.value = true
  elFormRef.value?.validate(async (valid) => {
    if (!valid) return (btnLoading.value = false)
    let res
    let params = JSON.parse(JSON.stringify(formData.value))
    params.status = Number(params.status)
    switch (type.value) {
      case 'create':
        res = await createScheduledTask(params)
        break
      case 'update':
        res = await updateScheduledTask(params)
        break
      default:
        res = await createScheduledTask(params)
        break
    }
    btnLoading.value = false
    if (res.code === 0) {
      ElMessage({ type: 'success', message: type.value === 'create' ? '创建成功' : '更新成功' })
      closeDialog()
      getTableData()
    }
  })
}

const detailForm = ref({})
const detailShow = ref(false)

const openDetailShow = () => {
  detailShow.value = true
}

const getDetails = async (row) => {
  const res = await findScheduledTask({ id: row.id })
  if (res.code === 0) {
    detailForm.value = res.data
    openDetailShow()
  }
}

const closeDetailShow = () => {
  detailShow.value = false
  detailForm.value = {}
}

const handleToggleStatus = async (row, val) => {
  try {
    const res = await toggleTaskStatus({ id: row.id, status: val })
    if (res.code === 0) {
      ElMessage({ type: 'success', message: val === 1 ? '已开启' : '已关闭' })
    } else {
      row.status = val === 1 ? 2 : 1
      ElMessage({ type: 'error', message: '操作失败' })
    }
  } catch (e) {
    row.status = val === 1 ? 2 : 1
    ElMessage({ type: 'error', message: '操作异常' })
  }
}

const handleExecNow = async (row) => {
  ElMessageBox.confirm(`确认立即执行任务「${row.name}」一次？`, '提示', {
    confirmButtonText: '确认执行',
    cancelButtonText: '取消',
    type: 'info'
  }).then(async () => {
    const res = await execTaskNow({ id: row.id })
    if (res.code === 0) {
      ElMessage({ type: 'success', message: '执行成功' })
      getTableData()
    }
  })
}

const checkBoxGroup = ref([
  'ID',
  '任务名称',
  '执行方法',
  '方法参数',
  'Cron表达式',
  '状态',
  '执行次数',
  '最后执行时间',
  '创建时间',
  '备注'
])

const checkedColumns = ref([
  'ID',
  '任务名称',
  '执行方法',
  '方法参数',
  'Cron表达式',
  '状态',
  '执行次数',
  '最后执行时间',
  '创建时间',
  '备注'
])

const colData = reactive([
  { title: 'ID', istrue: true },
  { title: '任务名称', istrue: true },
  { title: '执行方法', istrue: true },
  { title: '方法参数', istrue: true },
  { title: 'Cron表达式', istrue: true },
  { title: '状态', istrue: true },
  { title: '执行次数', istrue: true },
  { title: '最后执行时间', istrue: true },
  { title: '创建时间', istrue: true },
  { title: '备注', istrue: true }
])

const watchCheckedColumns = () => {
  colData.forEach((item) => {
    item.istrue = false
  })
  checkedColumns.value.forEach((item) => {
    colData.forEach((col) => {
      if (item === col.title) {
        col.istrue = true
      }
    })
  })
}
</script>

<style lang="scss">
</style>
