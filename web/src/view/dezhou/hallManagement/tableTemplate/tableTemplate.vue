<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="searchForm" :inline="true" :model="searchInfo">
        <el-form-item :label="$t('HallTableDialog.Fields.TemplateName.Label')">
          <el-input
            v-model="searchInfo.name"
            clearable
            :placeholder="$t('HallTableDialog.Fields.TemplateName.Placeholder')"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
          <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list" style="display: flex; justify-content: space-between">
        <div>
          <!-- 原按钮文案：新增模板 -->
          <el-button type="primary" icon="plus" @click="handleAdd">{{ $t('HallTableTemplate.Actions.Add') }}</el-button>
          <el-button
            style="margin-left: 15px"
            icon="delete"
            :disabled="!multipleSelection.length"
            @click="handleBatchDelete"
            >{{ $t('HallTableTemplate.Actions.BatchDelete') }}</el-button
          >
        </div>

        <el-dropdown :hide-on-click="false" style="margin-right: 10px">
          <span class="el-dropdown-link">
            <el-icon :size="20"><Operation /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu style="max-height: 400px">
              <el-dropdown-item v-for="value in tableConfig" :key="value.prop">
                <el-checkbox v-model="value.show" @change="boxValueChange" :label="value.lable" size="small" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-table v-adaptive="{ bottomOffset: 100 }" :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" :label="$t('HallTableList.Table.Index')" width="70" />

          <el-table-column
            align="center"
            :sortable="value.sortable"
            :min-width="value.width"
            :prop="value.prop"
            :key="value.prop"
            :label="value.lable"
            v-for="value in tableConfigReal"
          >
            <template #default="scope">
              <span v-if="value.prop === 'nGoldType'">{{ formatGoldType(scope.row.nGoldType) }}</span>
              <span v-else-if="value.prop === 'nKeepTime'">{{ formatKeepTime(scope.row.nKeepTime) }}</span>
              <span v-else-if="value.prop === 'nModeType'">{{ formatModeType(scope.row.nModeType) }}</span>
              <span v-else-if="value.prop === 'nComputeMode'">{{ formatComputeMode(scope.row.nComputeMode) }}</span>
              <span v-else>{{ scope.row[value.prop] }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" fixed="right" :label="$t('HallTableList.Table.Actions')" min-width="220">
            <template #default="scope">
              <!-- 原按钮文案：编辑 -->
              <el-button icon="edit" type="primary" link @click="handleEdit(scope.row)">
                {{ $t('HallTableTemplate.Actions.Edit') }}
              </el-button>
              <!-- 原按钮文案：删除 -->
              <el-button icon="delete" type="primary" link @click="handleDelete(scope.row)">
                {{ $t('HallTableTemplate.Actions.Delete') }}
              </el-button>
              <!-- 原按钮文案：查看详情 -->
              <el-button icon="view" type="primary" link @click="handleDetail(scope.row)">
                {{ $t('HallTableTemplate.Actions.Detail') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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

    <AddEditTemplateDialog
      ref="addEditDialogRef"
      v-model="dialogFormVisible"
      :title="dialogTitle"
      :type="dialogType"
      :group-options="groupOptions"
      @confirm="handleDialogConfirm"
      @close="handleDialogClose"
    />

    <DetailTemplateDialog
      ref="detailDialogRef"
      v-model="detailDialogVisible"
      :title="detailDialogTitle"
      :group-options="groupOptions"
      @close="handleDetailDialogClose"
    />
  </div>
</template>

<script setup>
  import {
    getDeskTemplateListApi,
    deleteDeskTemplateApi,
    deleteMultipleDeskTemplateApi
  } from '@/api/dezhou/tableTemplate'
  import { getGlobalGroupingApi } from '@/api/dezhou/global'
  import { ref, onMounted, watch } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { useI18n } from 'vue-i18n'
  import AddEditTemplateDialog from './components/AddEditTemplateDialog.vue'
  import DetailTemplateDialog from './components/DetailTemplateDialog.vue'

  defineOptions({
    name: 'TableTemplate'
  })

  const { t, locale } = useI18n()

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({})

  const multipleSelection = ref([])

  const dialogFormVisible = ref(false)
  const dialogTitle = ref('')
  const dialogType = ref('add')
  const addEditDialogRef = ref(null)
  const groupOptions = ref([])

  const detailDialogVisible = ref(false)
  const detailDialogTitle = ref('')
  const detailDialogRef = ref(null)
  const baseTableConfig = [
    { labelKey: 'HallTableDetail.Fields.TemplateName', prop: 'name', show: true, width: 150, sortable: false }, // 原列名：模板名称
    { labelKey: 'HallTableList.Table.GameId', prop: 'nGameId', show: true, width: 100, sortable: false }, // 原列名：游戏ID
    { labelKey: 'HallTableDetail.Fields.GoldType', prop: 'nGoldType', show: true, width: 120, sortable: false }, // 原列名：货币类型
    { labelKey: 'HallTableDetail.Fields.KeepTime', prop: 'nKeepTime', show: true, width: 120, sortable: true }, // 原列名：保留时长
    { labelKey: 'HallTableDetail.Fields.SmallBlind', prop: 'nSmallBlind', show: true, width: 80, sortable: true }, // 原列名：小盲
    { labelKey: 'HallTableDetail.Fields.BigBlind', prop: 'nBigBlind', show: true, width: 80, sortable: true }, // 原列名：大盲
    { labelKey: 'HallTableDetail.Fields.PreAnte', prop: 'nPreAnte', show: true, width: 80, sortable: true }, // 原列名：前注
    { labelKey: 'HallTableDetail.Fields.Capacity', prop: 'nCapacity', show: true, width: 90, sortable: false }, // 原列名：座位数
    { labelKey: 'HallTableDetail.Fields.MinBuyIn', prop: 'nMinTabkeInBB', show: true, width: 160, sortable: true }, // 原列名：最小带入
    { labelKey: 'HallTableDetail.Fields.MaxBuyIn', prop: 'nMaxTabkeInBB', show: true, width: 160, sortable: true }, // 原列名：最大带入
    { labelKey: 'HallTableDetail.Fields.RakeType', prop: 'nModeType', show: true, width: 120, sortable: true }, // 原列名：抽水类型
    { labelKey: 'HallTableDetail.Fields.RakeMethod', prop: 'nComputeMode', show: true, width: 120, sortable: true } // 原列名：抽水方式
  ]

  const tableConfig = ref(baseTableConfig.map((item) => ({ ...item, lable: '' })))

  const tableConfigReal = ref([])

  const updateTableConfigLabels = () => {
    tableConfig.value.forEach((item) => {
      const base = baseTableConfig.find((baseItem) => baseItem.prop === item.prop)
      if (base) {
        item.lable = t(base.labelKey)
      }
    })
    tableConfigReal.value = tableConfig.value.filter((val) => val.show)
  }

  const goldTypeKeyMap = {
    1: 'HallTableTemplate.Options.GoldType.USDT'
  }

  const keepTimeKeyMap = {
    '-1': 'HallTableTemplate.KeepTime.Forever',
    1800: 'HallTableTemplate.KeepTime.Minutes30',
    3600: 'HallTableTemplate.KeepTime.Hours1',
    7200: 'HallTableTemplate.KeepTime.Hours2',
    14400: 'HallTableTemplate.KeepTime.Hours4',
    21600: 'HallTableTemplate.KeepTime.Hours6',
    43200: 'HallTableTemplate.KeepTime.Hours12',
    86400: 'HallTableTemplate.KeepTime.Hours24'
  }

  updateTableConfigLabels()

  const getGroupOptions = async () => {
    try {
      const res = await getGlobalGroupingApi()
      if (res.code === 0) {
        groupOptions.value = res.data.list || []
      }
    } catch (error) {
      console.error('获取分组列表失败:', error)
    }
  }

  // 获取列表数据
  const getTableData = async () => {
    const params = {
      page: page.value,
      pageSize: pageSize.value,
      ...searchInfo.value
    }
    const res = await getDeskTemplateListApi(params)
    if (res.code === 0) {
      tableData.value = res.data.list || []
      total.value = res.data.total || 0
      page.value = res.data.page || 1
      pageSize.value = res.data.pageSize || 10
    }
  }

  const onSubmit = () => {
    page.value = 1
    getTableData()
  }

  const onReset = () => {
    searchInfo.value = {}
    getTableData()
  }

  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }

  const handleAdd = () => {
    dialogTitle.value = t('HallTableTemplate.Dialog.CreateTitle') // 原标题：新增牌桌模板
    dialogType.value = 'add'
    addEditDialogRef.value?.open()
  }

  const handleEdit = (row) => {
    dialogTitle.value = t('HallTableTemplate.Dialog.EditTitle') // 原标题：编辑牌桌模板
    dialogType.value = 'edit'
    addEditDialogRef.value?.open(row)
  }

  const handleDetail = (row) => {
    detailDialogTitle.value = t('HallTableTemplate.Dialog.DetailTitle') // 原标题：查看牌桌模板详情
    detailDialogRef.value?.open(row)
  }

  const handleDialogConfirm = () => {
    getTableData()
  }

  const handleDialogClose = () => {
    dialogFormVisible.value = false
  }

  const handleDetailDialogClose = () => {
    detailDialogVisible.value = false
  }

  const handleDelete = async (row) => {
    ElMessageBox.confirm(t('HallTableTemplate.Messages.DeleteConfirmSingle'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'), // 原按钮：确定
      cancelButtonText: t('Common.Cancel'), // 原按钮：取消
      type: 'warning'
    })
      .then(async () => {
        const res = await deleteDeskTemplateApi({ id: row.id })
        if (res.code === 0) {
          ElMessage.success(t('HallTableTemplate.Messages.DeleteSuccess')) // 原提示：删除成功!
          if (tableData.value.length === 1 && page.value > 1) {
            page.value--
          }
          getTableData()
        }
      })
      .catch(() => {
        ElMessage.info(t('HallTableTemplate.Messages.DeleteCanceled')) // 原提示：已取消删除
      })
  }

  const handleBatchDelete = async () => {
    ElMessageBox.confirm(t('HallTableTemplate.Messages.DeleteConfirmBatch'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'), // 原按钮：确定
      cancelButtonText: t('Common.Cancel'), // 原按钮：取消
      type: 'warning'
    })
      .then(async () => {
        const ids = multipleSelection.value.map((item) => item.id)
        const res = await deleteMultipleDeskTemplateApi({ ids })
        if (res.code === 0) {
          ElMessage.success(t('HallTableTemplate.Messages.DeleteSuccess')) // 原提示：删除成功!
          if (tableData.value.length === multipleSelection.value.length && page.value > 1) {
            page.value--
          }
          getTableData()
        }
      })
      .catch(() => {
        ElMessage.info(t('HallTableTemplate.Messages.DeleteCanceled')) // 原提示：已取消删除
      })
  }

  const formatGoldType = (type) => {
    const key = goldTypeKeyMap[type]
    return key ? t(key) : type
  }

  const formatKeepTime = (time) => {
    const key = keepTimeKeyMap[time]
    if (key) {
      return t(key)
    }
    const minutes = Number(time) / 60
    const displayMinutes = Number.isFinite(minutes) ? minutes : time
    return t('HallTableTemplate.Format.KeepTimeMinutes', { minutes: displayMinutes })
  }

  const formatModeType = (type) => {
    const modeMap = {
      0: 'HallTableList.ModeType.None',
      1: 'HallTableList.ModeType.Hand',
      3: 'HallTableList.ModeType.Round'
    }
    const key = modeMap[type]
    return key ? t(key) : type
  }

  const formatComputeMode = (mode) => {
    const modeMap = {
      0: 'HallTableList.ComputeMode.Pot',
      1: 'HallTableList.ComputeMode.Profit'
    }
    const key = modeMap[mode]
    return key ? t(key) : mode
  }

  onMounted(() => {
    const config = localStorage.getItem('tableTemplate')
    if (config) {
      const parsedConfig = JSON.parse(config)
      tableConfig.value.forEach((item) => {
        item.show = parsedConfig.some((stored) => stored.prop === item.prop)
      })
      updateTableConfigLabels()
    } else {
      boxValueChange()
    }

    getTableData()
    getGroupOptions()
  })
  // 筛选配置
  const boxValueChange = () => {
    updateTableConfigLabels()
    localStorage.setItem('tableTemplate', JSON.stringify(tableConfigReal.value))
  }

  watch(
    () => locale.value,
    () => {
      updateTableConfigLabels()
      localStorage.setItem('tableTemplate', JSON.stringify(tableConfigReal.value))
    }
  )
</script>

<style lang="scss" scoped></style>
