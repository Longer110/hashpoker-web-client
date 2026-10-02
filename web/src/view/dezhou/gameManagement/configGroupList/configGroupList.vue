<template>
  <div>
    <!-- <div class="gva-search-box">
      <el-form
        ref="elSearchFormRef"
        :inline="true"
        :model="searchInfo"
        class="demo-form-inline"
        @keyup.enter="onSubmit"
      >
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="false"
      :row-count="pageSize"
      :show-toolbar="true"
      :toolbar-button-count="2"
      :show-pagination="true"
    >
      <div class="gva-table-box">
        <div class="gva-btn-list">
          <!-- 原文按钮: 新增 -->
          <el-button type="primary" icon="plus" @click="openDialog()">{{ $t('ConfigGroupList.Add') }}</el-button>
          <!-- 原文按钮: 删除 -->
          <el-button
            icon="delete"
            style="margin-left: 10px"
            :disabled="!multipleSelection.length"
            @click="onDelete"
          >
            {{ $t('ConfigGroupList.Delete') }}
          </el-button>
        </div>
        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="GroupId"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <!-- 原label: 序号 -->
          <el-table-column align="center" type="index" width="70" :label="$t('ConfigGroupList.Index')" />
          <!-- 原label: 群组ID -->
          <el-table-column align="center" :label="$t('ConfigGroupList.GroupId')" prop="GroupId" min-width="150" />

          <!-- 原label: 群组名称 -->
          <el-table-column align="center" :label="$t('ConfigGroupList.GroupName')" prop="GroupName" min-width="150" />

          <!-- 原label: 创建所属 -->
          <el-table-column align="center" :label="$t('ConfigGroupList.BranchShop')" prop="BranchShop" min-width="150" />

          <!-- 原label: 操作 -->
          <el-table-column align="center" header-align="center" :label="$t('ConfigGroupList.Actions')" fixed="right" width="250">
            <template #default="scope">
              <!-- 原按钮: 查看 -->
              <el-button type="primary" link class="table-button" @click="getDetails(scope.row)">
                <el-icon style="margin-right: 5px"><InfoFilled /></el-icon>{{ $t('ConfigGroupList.View') }}
              </el-button>
              <el-button
                type="primary"
                link
                icon="edit"
                class="table-button"
                @click="updateConfigGroupListFunc(scope.row)"
                >{{ $t('ConfigGroupList.Edit') }}</el-button
              >
              <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">
                {{ $t('ConfigGroupList.Delete') }}
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
          <!-- 原标题: 新增/编辑 -->
          <span class="text-lg">{{ dialogTitle }}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">
              {{ $t('Common.Confirm') }}
            </el-button>
            <el-button @click="closeDialog">{{ $t('Common.Cancel') }}</el-button>
          </div>
        </div>
      </template>

      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rules" label-width="80px">
        <!-- 原label: 群组ID: -->
        <el-form-item :label="$t('ConfigGroupList.GroupIdLabel')" prop="GroupId">
          <el-input
            @input="handleInput(formData, 'GroupId')"
            v-model.number="formData.GroupId"
            :clearable="true"
            :placeholder="$t('ConfigGroupList.GroupIdPlaceholder')"
          />
        </el-form-item>
        <!-- 原label: 群组名称: -->
        <el-form-item :label="$t('ConfigGroupList.GroupNameLabel')" prop="GroupName">
          <el-input
            v-model="formData.GroupName"
            :clearable="true"
            :placeholder="$t('ConfigGroupList.GroupNamePlaceholder')"
          />
        </el-form-item>
        <!-- 原label: 创建所属: -->
        <el-form-item :label="$t('ConfigGroupList.BranchShopLabel')" prop="BranchShop">
          <el-input
            @input="handleInput(formData, 'BranchShop')"
            v-model.number="formData.BranchShop"
            :clearable="true"
            :placeholder="$t('ConfigGroupList.BranchShopPlaceholder')"
          />
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="detailShow"
      :show-close="true"
      :before-close="closeDetailShow"
      :title="$t('ConfigGroupList.View')"
    >
      <el-descriptions :column="1" border>
        <!-- 原label: 群组ID -->
        <el-descriptions-item :label="$t('ConfigGroupList.GroupId')">
          {{ detailForm.GroupId }}
        </el-descriptions-item>
        <!-- 原label: 群组名称 -->
        <el-descriptions-item :label="$t('ConfigGroupList.GroupName')">
          {{ detailForm.GroupName }}
        </el-descriptions-item>
        <!-- 原label: 创建所属 -->
        <el-descriptions-item :label="$t('ConfigGroupList.BranchShop')">
          {{ detailForm.BranchShop }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
  import {
    createConfigGroupList,
    deleteConfigGroupList,
    deleteConfigGroupListByIds,
    updateConfigGroupList,
    findConfigGroupList,
    getConfigGroupListList
  } from '@/api/dezhou/configGroupList'

  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ref, computed, nextTick } from 'vue'
  import { useAppStore } from '@/pinia'
  import { useI18n } from 'vue-i18n'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  defineOptions({
    name: 'ConfigGroupList'
  })

  // 提交按钮loading
  const btnLoading = ref(false)
  const appStore = useAppStore()
  const { t, locale } = useI18n()

  // 自动化生成的字典（可能为空）以及字段
  const formData = ref({
    GroupId: undefined,
    GroupName: '',
    BranchShop: undefined
  })

  // 验证规则
  const rules = computed(() => {
    locale.value
    return {
      GroupId: [{ required: true, message: t('ConfigGroupList.ValidateGroupId'), trigger: 'blur' }],
      GroupName: [{ required: true, message: t('ConfigGroupList.ValidateGroupName'), trigger: 'blur' }],
      BranchShop: [{ required: true, message: t('ConfigGroupList.ValidateBranchShop'), trigger: 'blur' }]
    }
  })

  const elFormRef = ref()
  const elSearchFormRef = ref()

  // =========== 表格控制部分 ===========
  const loading = ref(false)
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({})

  const handleInput = (row, prop) => {
    nextTick(() => {
      const raw = row[prop] ?? ''
      let value = String(raw).replace(/[^-0-9]/g, '')
      if (value === '' || value === '-') {
        row[prop] = value === '' ? undefined : value
      } else {
        row[prop] = Number(value)
      }
    })
  }
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
      const table = await getConfigGroupListList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    ElMessageBox.confirm(t('ConfigGroupList.ConfirmDelete'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(() => {
      deleteConfigGroupListFunc(row)
    })
  }

  // 多选删除
  const onDelete = async () => {
    ElMessageBox.confirm(t('ConfigGroupList.ConfirmDelete'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const GroupIds = []
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'warning',
          message: t('ConfigGroupList.SelectDeleteWarning')
        })
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map((item) => {
          GroupIds.push(Number(item.GroupId))
        })
      const res = await deleteConfigGroupListByIds({ GroupIds })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('ConfigGroupList.DeleteSuccess')
        })
        if (tableData.value.length === GroupIds.length && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }

  // 行为控制标记（弹窗内部需要增还是改）
  const type = ref('create')
  const dialogTitle = computed(() => (type.value === 'create' ? t('ConfigGroupList.Add') : t('ConfigGroupList.Edit')))

  // 更新行
  const updateConfigGroupListFunc = async (row) => {
    const res = await findConfigGroupList({ GroupId: Number(row.GroupId) })
    type.value = 'update'
    if (res.code === 0) {
      formData.value = {
        ...res.data,
        GroupId: res.data.GroupId !== undefined && res.data.GroupId !== '' ? Number(res.data.GroupId) : undefined,
        BranchShop: res.data.BranchShop !== undefined && res.data.BranchShop !== '' ? Number(res.data.BranchShop) : undefined
      }
      dialogFormVisible.value = true
    }
  }

  // 删除行
  const deleteConfigGroupListFunc = async (row) => {
    const res = await deleteConfigGroupList({ GroupId: Number(row.GroupId) })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: t('ConfigGroupList.DeleteSuccess')
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
    formData.value = {
      GroupId: undefined,
      GroupName: '',
      BranchShop: undefined
    }
    type.value = 'create'
  }
  // 弹窗确定
  const enterDialog = async () => {
    btnLoading.value = true
    elFormRef.value?.validate(async (valid) => {
      if (!valid) return (btnLoading.value = false)
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
          message: t('ConfigGroupList.CreateOrUpdateSuccess')
        })
        closeDialog()
        getTableData()
      }
    })
  }

  const detailForm = ref({})

  // 查看详情控制标记
  const detailShow = ref(false)

  // 打开详情弹窗
  const openDetailShow = () => {
    detailShow.value = true
  }

  // 打开详情
  const getDetails = async (row) => {
    // 打开弹窗
    const res = await findConfigGroupList({ GroupId: Number(row.GroupId) })
    if (res.code === 0) {
      detailForm.value = res.data
      openDetailShow()
    }
  }

  // 关闭详情弹窗
  const closeDetailShow = () => {
    detailShow.value = false
    detailForm.value = {}
  }
</script>

<style></style>
