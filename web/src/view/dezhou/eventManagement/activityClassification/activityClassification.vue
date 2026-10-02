<template>
  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :search-field-count="2"
      :search-button-count="2"
      :row-count="pageSize"
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
            <!-- 活动分类名称: -->
            <el-form-item :label="$t('ActivityClassification.NameLabel')" prop="name">
              <el-input  v-model="searchInfo.name" :placeholder="$t('ActivityClassification.NamePlaceholder')"   style="width: 240px" clearable/>
            </el-form-item>

            <!-- <el-form-item label="排序:" prop="sort">
              <el-input-number v-model.number="searchInfo.sort" :min="1" :max="10" />
            </el-form-item> -->

            <!-- 状态 -->
            <el-form-item :label="$t('ActivityClassification.StatusLabel')">
              <el-select
                v-model="searchInfo.state"
                :placeholder="$t('ActivityClassification.StatusPlaceholder')"
                style="width: 240px"
                clearable
              >
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
              <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <div class="gva-table-box">
        <div class="gva-btn-list">
          <!-- 新增 -->
          <el-button type="primary" icon="plus" @click="openDialog()">{{ $t('ActivityClassification.Add') }}</el-button>
          <!-- 删除 -->
          <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete">
            {{ $t('ActivityClassification.Delete') }}
          </el-button>
        </div>
        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="id"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <!-- 序号 -->
          <el-table-column align="center" type="index" width="70" :label="$t('ActivityClassification.Index')" />
          <!-- 活动分类名称: -->
          <el-table-column align="center" :label="$t('ActivityClassification.NameColumn')" prop="name" width="150" />
          <!-- 排序: -->
          <el-table-column align="center" :label="$t('ActivityClassification.Sort')" prop="sort" min-width="150" sortable />
          <!-- 状态: -->
          <el-table-column align="center" :label="$t('ActivityClassification.StatusColumn')" prop="state" min-width="150" sortable>
            <!-- 使用模板自定义显示内容 -->
            <template #default="scope">
              <!-- scope.row 可以获取当前行的数据 -->
              <!-- 关闭 -->
              <span v-if="scope.row.state == 0">{{ $t('ActivityClassification.StatusDisabled') }}</span>
              <!-- 开启 -->
              <span v-else-if="scope.row.state == 1">{{ $t('ActivityClassification.StatusEnabled') }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="id字段" prop="id" min-width="120" /> -->
          <!-- 活动分类id: -->
          <el-table-column align="center" :label="$t('ActivityClassification.CategoryId')" prop="id" min-width="150" />
          <!-- 创建时间: -->
          <el-table-column align="center" :label="$t('ActivityClassification.CreatedAt')" prop="createdAt" min-width="150">
            <template #default="scope">{{ formatDate(scope.row.createdAt) }}</template>
          </el-table-column>
          <!-- 更新时间: -->
          <el-table-column align="center" :label="$t('ActivityClassification.UpdatedAt')" prop="updatedAt" min-width="150">
            <template #default="scope">{{ formatDate(scope.row.updatedAt) }}</template>
          </el-table-column>
          <!-- 操作: -->
          <el-table-column align="center" :label="$t('ActivityClassification.Actions')" fixed="right" min-width="150">
            <template #default="scope">
              <!-- 编辑 -->
              <el-button
                type="primary"
                link
                icon="edit"
                class="table-button"
                @click="updateActivityDefineFunc(scope.row)"
                >{{ $t('ActivityClassification.Edit') }}</el-button>
                <!-- 删除 -->
              <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">
                {{ $t('ActivityClassification.Delete') }}
              </el-button>
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
          <!-- 新增/编辑 -->
          <span class="text-lg">{{ type === 'create' ? $t('ActivityClassification.Add') : $t('ActivityClassification.Edit') }}</span>
          <div>
            <!-- 确定/取消 -->
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">{{ $t('Common.Confirm') }}</el-button>
            <el-button @click="closeDialog">{{ $t('Common.Cancel') }}</el-button>
          </div>
        </div>
      </template>
      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rules" label-width="180px">
        <!-- 活动名: -->
        <el-form-item :label="$t('ActivityClassification.FormNameLabel')" prop="name">
          <el-input
            style="width: 300px"
            v-model="formData.name"
            :clearable="true"
            :placeholder="$t('ActivityClassification.FormNamePlaceholder')"
            :maxlength="6"
          />
        </el-form-item>

        <!-- 排序: -->
        <el-form-item :label="$t('ActivityClassification.SortLabel')" prop="sort">
          <el-input-number
            v-model.number="formData.sort"
            :placeholder="$t('ActivityClassification.SortPlaceholder')"
            :min="1"
            :max="10"
          />
        </el-form-item>

        <!-- 状态 -->
        <el-form-item :label="$t('ActivityClassification.StatusLabel')" prop="state">
          <el-select
            v-model="formData.state"
            :placeholder="$t('ActivityClassification.StatusSelectPlaceholder')"
            style="width: 240px"
          >
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
  import {
    getActivityTypeListApi,
    deleteActivityTypeApi,
    createActivityTypeApi,
    updateActivityTypeApi,
    deleteActivityTypeByIdsApi
  } from '@/api/dezhou/activityClassification'

  // 全量引入格式化工具 请按需保留
  import { formatDate } from '@/utils/format'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ref, computed } from 'vue'
  import { useAppStore } from '@/pinia'
  import { useI18n } from 'vue-i18n'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  // 活动分类
  defineOptions({
    name: 'activityClassification'
  })

  const { t } = useI18n()
  // 状态选项（原文：开启/关闭）
  const statusOptions = computed(() => [
    { label: t('ActivityClassification.StatusEnabled'), value: 1 }, // 开启
    { label: t('ActivityClassification.StatusDisabled'), value: 0 } // 关闭
  ])

  // 提交按钮loading
  const btnLoading = ref(false)
  const appStore = useAppStore()

  // 自动化生成的字典（可能为空）以及字段
  const formData = ref({
    createdAt: new Date(), // 创建时间
    updatedAt: new Date(), // 更新时间
    deletedAt: new Date(), // 删除时间

    name: '', // 活动分类名称
    state: 1, // 状态
    sort: 1 // 排序
  })

  // 验证规则
  const rules = computed(() => ({
    name: [{ required: true, message: t('ActivityClassification.ValidateName'), trigger: 'blur' }], // 请输入活动分类名称
    sort: [{ required: true, message: t('ActivityClassification.ValidateSort'), trigger: 'blur' }], // 请输入排序
    state: [{ required: true, message: t('ActivityClassification.ValidateStatus'), trigger: 'blur' }] // 请选择活动状态
  }))

  const elFormRef = ref()
  const elSearchFormRef = ref()

  // =========== 表格控制部分 ===========
  const loading = ref(false)
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({
    name: '', // 活动分类名称
    state: undefined, // 状态
    sort: 1 // 排序
  })
  // 重置
  const onReset = () => {
    searchInfo.value = {}
    getTableData()
  }

  // 搜索
  const onSubmit = () => {
    elSearchFormRef.value?.validate(async (valid) => {
      if (!valid) return
      page.value = 1
      getTableData()
    })
  }

  // 分页
  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  // 修改页面容量
  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  // 查询
  const getTableData = async () => {
    loading.value = true
    try {
      const table = await getActivityTypeListApi({
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

  // ============== 表格控制部分结束 ===============

  // 获取需要的字典 可能为空 按需保留
  const setOptions = async () => {}

  // 获取需要的字典 可能为空 按需保留
  setOptions()

  // 多选数据
  const multipleSelection = ref([])
  // 多选
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }

  // 删除行
  const deleteRow = (row) => {
    ElMessageBox.confirm(t('ActivityClassification.ConfirmDelete'), // 确定要删除吗?
      t('Common.Hint'), // 提示
      {
      confirmButtonText: t('Common.Confirm'), // 确认
      cancelButtonText: t('Common.Cancel'), // 取消
      type: 'warning'
    }).then(() => {
      deleteActivityDefineFunc(row)
    })
  }

  // 多选删除
  const onDelete = async () => {
    ElMessageBox.confirm(t('ActivityClassification.ConfirmDelete'), // 确定要删除吗?
      t('Common.Hint'), // 提示
      {
      confirmButtonText: t('Common.Confirm'), // 确认
      cancelButtonText: t('Common.Cancel'), // 取消
      type: 'warning'
    }).then(async () => {
      const ids = []
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'warning',
          message: t('ActivityClassification.SelectDeleteWarning') // 请选择要删除的项
        })
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map((item) => {
          ids.push(item.id)
        })
      const res = await deleteActivityTypeByIdsApi({ ids })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('ActivityClassification.DeleteSuccess') // 删除成功
        })
        if (tableData.value.length === ids.length && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }

  // 行为控制标记（弹窗内部需要增还是改）
  const type = ref('')

  // 更新行
  const updateActivityDefineFunc = async (row) => {
    type.value = 'update'

    formData.value.name = row.name
    formData.value.state = row.state
    formData.value.sort = row.sort
    formData.value.id = row.id
    dialogFormVisible.value = true
  }

  // 删除行
  const deleteActivityDefineFunc = async (row) => {
    const res = await deleteActivityTypeApi({ id: row.id })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: t('ActivityClassification.DeleteSuccess') // 删除成功
      })
      if (tableData.value.length === 1 && page.value > 1) {
        page.value--
      }
      getTableData()
    }
  }

  // 弹窗控制标记
  const dialogFormVisible = ref(false)

  // 打开弹窗
  const openDialog = () => {
    type.value = 'create'
    dialogFormVisible.value = true
  }

  // 关闭弹窗
  const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {}
  }
  // 弹窗确定
  const enterDialog = async () => {
    btnLoading.value = true
    elFormRef.value?.validate(async (valid) => {
      if (!valid) return (btnLoading.value = false)
      let res
      switch (type.value) {
        case 'create':
          res = await createActivityTypeApi(formData.value)
          break
        case 'update':
          res = await updateActivityTypeApi(formData.value)
          break
        default:
          break
      }
      btnLoading.value = false
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('ActivityClassification.CreateOrUpdateSuccess') // 创建/更改成功
        })
        closeDialog()
        getTableData()
      }
    })
  }
</script>

<style></style>
