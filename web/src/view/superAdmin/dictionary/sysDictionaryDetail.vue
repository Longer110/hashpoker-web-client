<template>
  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-toolbar="true"
      :toolbar-button-count="1"
      :row-count="pageSize"
    >
      <div class="gva-table-box">
        <div class="gva-btn-list justify-between">
          <!-- 原: 字典详细内容 -->
          <span class="text font-bold">{{ $t('Dictionary.DetailTitle') }}</span>
          <!-- 原: 新增字典项 -->
          <el-button type="primary" icon="plus" @click="openDrawer">{{ $t('Dictionary.AddItem') }} </el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData" style="width: 100%" tooltip-effect="dark" row-key="ID">
        <el-table-column type="selection" width="55" />
        <!-- 原: 日期 -->
        <el-table-column align="left" :label="$t('Dictionary.ColumnDate')" width="180">
          <template #default="scope">
            {{ formatDate(scope.row.CreatedAt) }}
          </template>
        </el-table-column>

        <!-- 原: 展示值 -->
        <el-table-column align="left" :label="$t('Dictionary.ColumnLabel')" prop="label" />

        <!-- 原: 字典值 -->
        <el-table-column align="left" :label="$t('Dictionary.ColumnValue')" prop="value" />

        <!-- 原: 扩展值 -->
        <el-table-column align="left" :label="$t('Dictionary.ColumnExtend')" prop="extend" />

        <!-- 原: 启用状态 -->
        <el-table-column align="left" :label="$t('Dictionary.ColumnStatus')" prop="status" width="120">
          <template #default="scope">
            {{ formatBoolean(scope.row.status) }}
          </template>
        </el-table-column>

        <!-- 原: 排序标记 -->
        <el-table-column align="left" :label="$t('Dictionary.ColumnSort')" prop="sort" width="120" />

        <!-- 原: 操作 -->
        <el-table-column align="right" header-align="center" :label="$t('Dictionary.Actions')" :min-width="120">
          <template #default="scope">
            <!-- 原: 变更 -->
            <el-button type="primary" link icon="edit" @click="updateSysDictionaryDetailFunc(scope.row)">{{ $t('Dictionary.Change') }}</el-button>
            <!-- 原: 删除 -->
            <el-button type="primary" link icon="delete" @click="deleteSysDictionaryDetailFunc(scope.row)">{{ $t('Dictionary.Delete') }}</el-button>
          </template>
        </el-table-column>
        </el-table>

        <div class="gva-pagination">
          <el-pagination
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
    </TableSkeletonWrapper>

    <el-drawer v-model="drawerFormVisible" :size="appStore.drawerSize" :show-close="false" :before-close="closeDrawer">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">{{ type === 'create' ? $t('Dictionary.CreateItemTitle') : $t('Dictionary.EditItemTitle') }}</span>
          <div>
            <!-- 原: 取 消 -->
            <el-button @click="closeDrawer">{{ $t('Common.Cancel') }}</el-button>
            <!-- 原: 确 定 -->
            <el-button type="primary" @click="enterDrawer">{{ $t('Common.Submit') }}</el-button>
          </div>
        </div>
      </template>
      <el-form ref="drawerForm" :model="formData" :rules="rules" label-width="110px">
        <!-- 原: 展示值 -->
        <el-form-item :label="$t('Dictionary.ColumnLabel')" prop="label">
          <!-- 原: 请输入展示值 -->
          <el-input v-model="formData.label" :placeholder="$t('Dictionary.PlaceholderLabel')" clearable :style="{ width: '100%' }" />
        </el-form-item>
        <!-- 原: 字典值 -->
        <el-form-item :label="$t('Dictionary.ColumnValue')" prop="value">
          <!-- 原: 请输入字典值 -->
          <el-input v-model="formData.value" :placeholder="$t('Dictionary.PlaceholderValue')" clearable :style="{ width: '100%' }" />
        </el-form-item>
        <!-- 原: 扩展值 -->
        <el-form-item :label="$t('Dictionary.ColumnExtend')" prop="extend">
          <!-- 原: 请输入扩展值 -->
          <el-input v-model="formData.extend" :placeholder="$t('Dictionary.PlaceholderExtend')" clearable :style="{ width: '100%' }" />
        </el-form-item>
        <!-- 原: 启用状态 -->
        <el-form-item :label="$t('Dictionary.ColumnStatus')" prop="status" required>
          <el-switch v-model="formData.status" :active-text="$t('Dictionary.StatusOn')" :inactive-text="$t('Dictionary.StatusOff')" />
        </el-form-item>
        <!-- 原: 排序标记 -->
        <el-form-item :label="$t('Dictionary.ColumnSort')" prop="sort">
          <el-input-number v-model.number="formData.sort" :placeholder="$t('Dictionary.PlaceholderSort')" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
  import {
    createSysDictionaryDetail,
    deleteSysDictionaryDetail,
    updateSysDictionaryDetail,
    findSysDictionaryDetail,
    getSysDictionaryDetailList
  } from '@/api/sysDictionaryDetail' // 此处请自行替换地址
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { formatBoolean, formatDate } from '@/utils/format'
  import { useAppStore } from '@/pinia'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  defineOptions({
    name: 'SysDictionaryDetail'
  })

  const appStore = useAppStore()
  const { t } = useI18n()

  const props = defineProps({
    sysDictionaryID: {
      type: Number,
      default: 0
    }
  })

  const formData = ref({
    label: null,
    value: null,
    status: true,
    sort: null
  })
  const rules = ref({
    label: [
      {
        required: true,
        message: t('Dictionary.LabelRequired'), // 请输入展示值
        trigger: 'blur'
      }
    ],
    value: [
      {
        required: true,
        message: t('Dictionary.ValueRequired'), // 请输入字典值
        trigger: 'blur'
      }
    ],
    sort: [
      {
        required: true,
        message: t('Dictionary.SortRequired'), // 排序标记
        trigger: 'blur'
      }
    ]
  })

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const loading = ref(false)

  // 分页
  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  // 查询
  const getTableData = async () => {
    if (!props.sysDictionaryID) return
    loading.value = true
    try {
      const table = await getSysDictionaryDetailList({
        page: page.value,
        pageSize: pageSize.value,
        sysDictionaryID: props.sysDictionaryID
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

  const type = ref('')
  const drawerFormVisible = ref(false)
  const updateSysDictionaryDetailFunc = async (row) => {
    drawerForm.value && drawerForm.value.clearValidate()
    const res = await findSysDictionaryDetail({ ID: row.ID })
    type.value = 'update'
    if (res.code === 0) {
      formData.value = res.data.reSysDictionaryDetail
      drawerFormVisible.value = true
    }
  }

  const closeDrawer = () => {
    drawerFormVisible.value = false
    formData.value = {
      label: null,
      value: null,
      status: true,
      sort: null,
      sysDictionaryID: props.sysDictionaryID
    }
  }
  const deleteSysDictionaryDetailFunc = async (row) => {
    ElMessageBox.confirm(t('Dictionary.DeleteConfirm'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await deleteSysDictionaryDetail({ ID: row.ID })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('Dictionary.DeleteSuccess') // 删除成功
        })
        if (tableData.value.length === 1 && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }

  const drawerForm = ref(null)
  const enterDrawer = async () => {
    drawerForm.value.validate(async (valid) => {
      formData.value.sysDictionaryID = props.sysDictionaryID
      if (!valid) return
      let res
      switch (type.value) {
        case 'create':
          res = await createSysDictionaryDetail(formData.value)
          break
        case 'update':
          res = await updateSysDictionaryDetail(formData.value)
          break
        default:
          res = await createSysDictionaryDetail(formData.value)
          break
      }
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('Dictionary.CreateOrUpdateSuccess') // 创建/更改成功
        })
        closeDrawer()
        getTableData()
      }
    })
  }
  const openDrawer = () => {
    type.value = 'create'
    drawerForm.value && drawerForm.value.clearValidate()
    drawerFormVisible.value = true
  }

  watch(
    () => props.sysDictionaryID,
    () => {
      getTableData()
    }
  )
</script>

<style></style>
