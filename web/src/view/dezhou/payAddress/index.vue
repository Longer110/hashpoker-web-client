<template>
  <div>
    <warning-bar :title="t('PayAddress.Warning')" />

    <TableSkeleton
      :loading="tableLoading"
      :show-search="true"
      :search-field-count="4"
      :search-button-count="2"
      :row-count="pageSize"
      :show-pagination="true"
      :show-toolbar="true"
      :toolbar-button-count="5"
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
            <el-form-item :label="t('PayAddress.Search.AddressLabel')">
              <el-input
                v-model="searchInfo.address"
                :placeholder="t('PayAddress.Search.AddressPlaceholder')"
                clearable
                style="width: 240px"
              />
            </el-form-item>

            <el-form-item :label="t('PayAddress.Search.KeywordLabel')">
              <el-input
                v-model="searchInfo.keyword"
                :placeholder="t('PayAddress.Search.KeywordPlaceholder')"
                clearable
                style="width: 200px"
              />
            </el-form-item>

            <el-form-item :label="t('PayAddress.Search.StateLabel')">
              <el-select
                v-model="searchInfo.state"
                :placeholder="t('PayAddress.Search.StatePlaceholder')"
                clearable
                style="width: 160px"
              >
                <el-option :label="t('PayAddress.State.Idle')" :value="0" />
                <el-option :label="t('PayAddress.State.Occupied')" :value="1" />
                <el-option :label="t('PayAddress.State.Cooling')" :value="2" />
                <el-option :label="t('PayAddress.State.ToRecycle')" :value="3" />
              </el-select>
            </el-form-item>

            <el-form-item :label="t('PayAddress.Search.SourceLabel')">
              <el-select
                v-model="searchInfo.source"
                :placeholder="t('PayAddress.Search.SourcePlaceholder')"
                clearable
                style="width: 140px"
              >
                <el-option :label="t('PayAddress.AddForm.SourceOptions.Import')" value="import" />
                <el-option :label="t('PayAddress.AddForm.SourceOptions.Legacy')" value="legacy" />
              </el-select>
            </el-form-item>

            <el-form-item :label="t('PayAddress.Search.UserIdLabel')">
              <el-input
                v-model="searchInfo.userId"
                :placeholder="t('PayAddress.Search.UserIdPlaceholder')"
                clearable
                style="width: 180px"
              />
            </el-form-item>

            <el-form-item :label="t('PayAddress.Search.IdxStartLabel')">
              <el-input-number
                v-model="searchInfo.idxStart"
                :min="0"
                :placeholder="t('PayAddress.Search.IdxStartPlaceholder')"
                controls-position="right"
                style="width: 140px"
              />
            </el-form-item>

            <el-form-item :label="t('PayAddress.Search.IdxEndLabel')">
              <el-input-number
                v-model="searchInfo.idxEnd"
                :min="0"
                :placeholder="t('PayAddress.Search.IdxEndPlaceholder')"
                controls-position="right"
                style="width: 140px"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="search" @click="onSubmit">
                {{ $t('GlobalUniversality.Query') }}
              </el-button>
              <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <div class="gva-table-box">
        <div class="stats-panel mb-4" v-if="stats">
          <el-row :gutter="16">
            <el-col :span="4" v-for="(item, key) in statCards" :key="key">
              <div class="stat-card" :class="item.type">
                <div class="stat-label">{{ item.label }}</div>
                <div class="stat-value">{{ item.value }}</div>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="gva-btn-list" style="display: flex; justify-content: space-between">
          <div>
            <el-button type="primary" icon="plus" @click="openAddDialog">
              {{ t('PayAddress.Actions.Add') }}
            </el-button>
            <el-button
              type="danger"
              icon="delete"
              @click="handleBatchDelete"
              :disabled="selectedIds.length === 0"
            >
              {{ t('PayAddress.Actions.BatchDelete') }}
            </el-button>
            <el-button type="success" icon="setting" @click="openConfigDialog">
              {{ t('PayAddress.Actions.Config') }}
            </el-button>
            <el-button type="warning" icon="check" @click="handleVerify">
              {{ t('PayAddress.Actions.Verify') }}
            </el-button>
          </div>
        </div>

        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          height="550"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="id"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column align="center" type="index" min-width="70" :label="t('PayAddress.Table.Index')" />
          <el-table-column
            align="center"
            min-width="80"
            :label="t('PayAddress.Table.Id')"
            prop="id"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            min-width="80"
            :label="t('PayAddress.Table.Idx')"
            prop="idx"
            show-overflow-tooltip
          />
          <el-table-column
            align="left"
            min-width="320"
            :label="t('PayAddress.Table.Address')"
            prop="address"
            show-overflow-tooltip
          >
            <template #default="scope">
              <code style="font-size: 12px">{{ scope.row.address }}</code>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            min-width="90"
            :label="t('PayAddress.Table.Source')"
            prop="source"
            show-overflow-tooltip
          >
            <template #default="scope">
              <el-tag v-if="scope.row.source === 'import'">{{ t('PayAddress.AddForm.SourceOptions.Import') }}</el-tag>
              <el-tag v-else-if="scope.row.source === 'legacy'" type="info">
                {{ t('PayAddress.AddForm.SourceOptions.Legacy') }}
              </el-tag>
              <span v-else>{{ scope.row.source }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            min-width="100"
            :label="t('PayAddress.Table.State')"
            prop="state"
            show-overflow-tooltip
          >
            <template #default="scope">
              <el-tag :type="stateTagType(scope.row.state)">
                {{ stateText(scope.row.state) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            min-width="80"
            :label="t('PayAddress.Table.Chargeable')"
            prop="chargeable"
          >
            <template #default="scope">
              <el-tag :type="scope.row.chargeable ? 'success' : 'info'" size="small">
                {{ scope.row.chargeable ? t('PayAddress.YesNo.Yes') : t('PayAddress.YesNo.No') }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            min-width="100"
            :label="t('PayAddress.Table.UserId')"
            prop="userId"
            show-overflow-tooltip
          >
            <template #default="scope">
              <span v-if="scope.row.userId">{{ scope.row.userId }}</span>
              <span v-else style="color: #aaa">-</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            min-width="160"
            :label="t('PayAddress.Table.AssignTime')"
            prop="assignTime"
            show-overflow-tooltip
          >
            <template #default="scope">
              <span v-if="scope.row.assignTime">{{ scope.row.assignTime }}</span>
              <span v-else style="color: #aaa">-</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            min-width="160"
            :label="t('PayAddress.Table.CreateTime')"
            prop="createTime"
            show-overflow-tooltip
          />

          <el-table-column
            align="center"
            fixed="right"
            header-align="center"
            :label="t('PayAddress.Table.Actions')"
            :min-width="260"
          >
            <template #default="scope">
              <el-button icon="view" type="primary" link @click="openDetailDialog(scope.row)">
                {{ t('PayAddress.Actions.Detail') }}
              </el-button>
              <el-button icon="edit" type="primary" link @click="openEditDialog(scope.row)">
                {{ t('PayAddress.Actions.Edit') }}
              </el-button>
              <el-button
                icon="refresh-left"
                type="warning"
                link
                @click="handleRelease(scope.row)"
                v-if="scope.row.state === 1"
              >
                {{ t('PayAddress.Actions.Release') }}
              </el-button>
              <el-button icon="delete" type="danger" link @click="handleDelete(scope.row)">
                {{ t('PayAddress.Actions.Delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="gva-pagination">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100, 200]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
    </TableSkeleton>

    <AddEditDialog
      ref="addEditDialogRef"
      v-model="addEditDialogVisible"
      :title="addEditTitle"
      :type="dialogType"
      :row-data="currentRow"
      @confirm="getTableData"
      @close="addEditDialogVisible = false"
    />

    <DetailDialog
      ref="detailDialogRef"
      v-model="detailDialogVisible"
      :row-id="currentRowId"
      @close="detailDialogVisible = false"
    />

    <ConfigDialog
      ref="configDialogRef"
      v-model="configDialogVisible"
      @confirm="getStats"
      @close="configDialogVisible = false"
    />
  </div>
</template>

<script setup>
  import WarningBar from '@/components/warningBar/warningBar.vue'
  import TableSkeleton from '@/components/tableSkeleton/index.vue'
  import AddEditDialog from './components/AddEditDialog.vue'
  import DetailDialog from './components/DetailDialog.vue'
  import ConfigDialog from './components/ConfigDialog.vue'
  import {
    getPayAddressListApi,
    getPayAddressStatsApi,
    deletePayAddressApi,
    deletePayAddressByIdsApi,
    releasePayAddressApi,
    verifyPayAddressPoolApi
  } from '@/api/dezhou/payAddress'
  import { ref, computed, onMounted, reactive } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { useI18n } from 'vue-i18n'

  defineOptions({
    name: 'PayAddress'
  })

  const { t } = useI18n()

  const elSearchFormRef = ref()
  const addEditDialogRef = ref(null)
  const detailDialogRef = ref(null)
  const configDialogRef = ref(null)
  const multipleTable = ref(null)

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const tableLoading = ref(false)

  const searchInfo = reactive({
    address: '',
    keyword: '',
    state: null,
    source: '',
    userId: '',
    idxStart: null,
    idxEnd: null
  })

  const selectedIds = ref([])
  const stats = ref(null)

  const addEditDialogVisible = ref(false)
  const detailDialogVisible = ref(false)
  const configDialogVisible = ref(false)
  const dialogType = ref('add')
  const currentRow = ref(null)
  const currentRowId = ref(null)

  const addEditTitle = computed(() =>
    dialogType.value === 'add' ? t('PayAddress.Dialog.AddTitle') : t('PayAddress.Dialog.EditTitle')
  )

  const statCards = computed(() => {
    const s = stats.value || {}
    return {
      total: { label: t('PayAddress.Stats.Total'), value: s.total || 0, type: 'default' },
      idle: { label: t('PayAddress.Stats.Idle'), value: s.idle || 0, type: 'success' },
      occupied: { label: t('PayAddress.Stats.Occupied'), value: s.occupied || 0, type: 'warning' },
      cooling: { label: t('PayAddress.Stats.Cooling'), value: s.cooling || 0, type: 'info' },
      toRecycle: { label: t('PayAddress.Stats.ToRecycle'), value: s.toRecycle || 0, type: 'danger' }
    }
  })

  const stateText = (s) => {
    const map = {
      0: t('PayAddress.State.Idle'),
      1: t('PayAddress.State.Occupied'),
      2: t('PayAddress.State.Cooling'),
      3: t('PayAddress.State.ToRecycle')
    }
    return map[s] ?? '-'
  }

  const stateTagType = (s) => {
    const map = {
      0: 'success',
      1: 'warning',
      2: 'info',
      3: 'danger'
    }
    return map[s] ?? 'info'
  }

  const onReset = () => {
    searchInfo.address = ''
    searchInfo.keyword = ''
    searchInfo.state = null
    searchInfo.source = ''
    searchInfo.userId = ''
    searchInfo.idxStart = null
    searchInfo.idxEnd = null
    page.value = 1
    getTableData()
  }

  const onSubmit = () => {
    page.value = 1
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
    selectedIds.value = val.map((v) => v.id)
  }

  const getTableData = async () => {
    tableLoading.value = true
    try {
      const params = {
        page: page.value,
        pageSize: pageSize.value
      }
      if (searchInfo.address) params.address = searchInfo.address
      if (searchInfo.keyword) params.keyword = searchInfo.keyword
      if (searchInfo.state !== null && searchInfo.state !== undefined && searchInfo.state !== '') {
        params.state = searchInfo.state
      }
      if (searchInfo.source) params.source = searchInfo.source
      if (searchInfo.userId) params.userId = searchInfo.userId
      if (searchInfo.idxStart !== null && searchInfo.idxStart !== undefined) {
        params.idxStart = searchInfo.idxStart
      }
      if (searchInfo.idxEnd !== null && searchInfo.idxEnd !== undefined) {
        params.idxEnd = searchInfo.idxEnd
      }
      const res = await getPayAddressListApi(params)
      if (res.code === 0) {
        tableData.value = res.data?.list || []
        total.value = res.data?.total || 0
        page.value = res.data?.page || 1
        pageSize.value = res.data?.pageSize || 10
      }
    } finally {
      tableLoading.value = false
    }
  }

  const getStats = async () => {
    try {
      const res = await getPayAddressStatsApi()
      if (res.code === 0) {
        stats.value = res.data || null
      }
    } catch (e) {
      console.error('get stats error', e)
    }
  }

  const openAddDialog = () => {
    dialogType.value = 'add'
    currentRow.value = null
    addEditDialogRef.value?.open()
  }

  const openEditDialog = (row) => {
    dialogType.value = 'edit'
    currentRow.value = row
    addEditDialogRef.value?.open(row)
  }

  const openDetailDialog = (row) => {
    currentRowId.value = row.id
    detailDialogVisible.value = true
  }

  const openConfigDialog = () => {
    configDialogRef.value?.open()
  }

  const handleDelete = async (row) => {
    ElMessageBox.confirm(t('PayAddress.Messages.DeleteConfirm'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    })
      .then(async () => {
        const res = await deletePayAddressApi({ id: row.id })
        if (res.code === 0) {
          ElMessage.success(t('PayAddress.Messages.DeleteSuccess'))
          if (tableData.value.length === 1 && page.value > 1) {
            page.value--
          }
          getTableData()
          getStats()
        }
      })
      .catch(() => {})
  }

  const handleBatchDelete = async () => {
    if (selectedIds.value.length === 0) {
      ElMessage.warning(t('PayAddress.Messages.SelectDeleteWarning'))
      return
    }
    ElMessageBox.confirm(t('PayAddress.Messages.BatchDeleteConfirm'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    })
      .then(async () => {
        const res = await deletePayAddressByIdsApi({ ids: selectedIds.value })
        if (res.code === 0) {
          ElMessage.success(t('PayAddress.Messages.BatchDeleteSuccess'))
          multipleTable.value?.clearSelection()
          if (tableData.value.length === selectedIds.value.length && page.value > 1) {
            page.value--
          }
          getTableData()
          getStats()
        }
      })
      .catch(() => {})
  }

  const handleRelease = async (row) => {
    ElMessageBox.confirm(t('PayAddress.Messages.ReleaseConfirm'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    })
      .then(async () => {
        const res = await releasePayAddressApi({ id: row.id })
        if (res.code === 0) {
          ElMessage.success(t('PayAddress.Messages.ReleaseSuccess'))
          getTableData()
          getStats()
        }
      })
      .catch(() => {})
  }

  const handleVerify = async () => {
    try {
      const res = await verifyPayAddressPoolApi()
      if (res.code === 0) {
        ElMessage.success(t('PayAddress.Messages.VerifySuccess'))
      }
    } catch (e) {
      console.error(e)
    }
  }

  onMounted(() => {
    getTableData()
    getStats()
  })
</script>

<style lang="scss" scoped>
  .mb-4 {
    margin-bottom: 16px;
  }
  .stats-panel {
    .stat-card {
      padding: 16px 20px;
      border-radius: 8px;
      background: #1f2937;
      border: 1px solid #374151;
      transition: all 0.2s;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }
      .stat-label {
        font-size: 13px;
        color: #9ca3af;
        margin-bottom: 8px;
      }
      .stat-value {
        font-size: 24px;
        font-weight: 600;
        color: #ffffff;
      }
      &.success .stat-value {
        color: #55cc88;
      }
      &.warning .stat-value {
        color: #f0b429;
      }
      &.info .stat-value {
        color: #60a5fa;
      }
      &.danger .stat-value {
        color: #ef4444;
      }
    }
  }
</style>
