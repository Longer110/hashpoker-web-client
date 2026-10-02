<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="searchForm" :inline="true" :model="searchInfo">
        <!-- 牌桌名称 -->
        <el-form-item :label="$t('HallTableConfig.Search.TableName')">
          <!-- 请输入牌桌名称 -->
          <el-input
            v-model="searchInfo.sTableName"
            clearable
            :placeholder="$t('HallTableConfig.Search.TableNamePlaceholder')"
            style="width: 240px"
          />
        </el-form-item>
        <!-- 游戏名称 -->
        <el-form-item :label="$t('HallTableConfig.Search.Game')">
          <!-- 请选择游戏名称 -->
          <el-select
            v-model="searchInfo.gameId"
            :placeholder="$t('HallTableConfig.Search.GamePlaceholder')"
            clearable
            style="width: 240px"
          >
            <el-option v-for="(item, index) in gameOptions" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- 分组 -->
        <el-form-item :label="$t('HallTableConfig.Search.Group')">
          <!-- 请选择分组 -->
          <el-select
            v-model="searchInfo.groupId"
            :placeholder="$t('HallTableConfig.Search.GroupPlaceholder')"
            clearable
            style="width: 240px"
          >
            <el-option v-for="item in groupOptions" :key="item.GroupId" :label="item.GroupName" :value="item.GroupId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
          <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list" style="display: flex; justify-content: flex-end">
        <!-- <el-button type="primary" icon="plus" @click="openDialog('addApi')">
          新增
        </el-button>
        <el-button icon="delete" :disabled="!apis.length" @click="onDelete"> 删除 </el-button>-->
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
        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          :data="tableData"
          @sort-change="sortChange"
          @selection-change="handleSelectionChange"
        >
          <!-- 序号 -->
          <el-table-column align="center" type="index" width="70" :label="$t('HallTableList.Table.Index')" />
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
              <span v-if="value.prop === 'nModeType'">{{ formatModeType(scope.row.nModeType) }}</span>
              <span v-else-if="value.prop === 'nComputeMode'">{{ formatComputeMode(scope.row.nComputeMode) }}</span>
              <span v-else>{{ scope.row[value.prop] }}</span>
            </template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column align="center" fixed="right" header-align="center" :label="$t('HallTableList.Table.Actions')" :min-width="230">
            <template #default="scope">
              <el-button icon="view" type="primary" link @click="handleDetail(scope.row)">
                {{ $t('HallTableList.Actions.ViewDetail') }}
              </el-button>
              <el-button icon="edit" type="primary" link @click="editApiFunc(scope.row)">
                {{ $t('GlobalUniversality.Edit') }}
              </el-button>
              <el-button icon="delete" type="primary" link @click="deleteApiFunc(scope.row)">
                {{ $t('HallTableConfig.Actions.Delete') }}
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

    <!-- 编辑抽屉 -->
    <AddEditConfigDialog
      ref="editDialogRef"
      v-model="dialogFormVisible"
      :title="dialogTitle"
      @confirm="handleDialogConfirm"
      @close="handleDialogClose"
    />

    <DetailConfigDialog
      ref="detailDialogRef"
      v-model="detailDialogVisible"
      :title="detailDialogTitle"
      :group-options="groupOptions"
      @close="handleDetailDialogClose"
    />
  </div>
</template>

<script setup>
  import { getClubTableConfListApi, clubTableConfigDeleteApi } from '@/api/dezhou/tableConfiguration'
  import { getGlobalGroupingApi } from '@/api/dezhou/global'
  import { toSQLLine } from '@/utils/stringFun'
  import { parseAndFlattenJSONValue } from '@/utils/format'
  import { ref, onMounted, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import AddEditConfigDialog from './components/AddEditConfigDialog.vue'
  import DetailConfigDialog from './components/DetailConfigDialog.vue'

  defineOptions({
    name: 'tableConfiguration'
  })

  const { t, locale } = useI18n()

  const tableConfigSource = [
    { labelKey: 'HallTableList.Table.GroupId', prop: 'nGroupId', show: true, width: 80, sortable: true },
    { labelKey: 'HallTableList.Table.GameId', prop: 'nGameId', show: true, width: 80, sortable: true },
    { labelKey: 'HallTableDialog.Fields.Game.Label', prop: 'nGameName', show: true, width: 100, sortable: true },
    { labelKey: 'HallTableDetail.Fields.TableName', prop: 'name', show: true, width: 150, sortable: false },
    { labelKey: 'HallTableList.Table.SmallBlind', prop: 'nSmallBlind', show: true, width: 80, sortable: true },
    { labelKey: 'HallTableList.Table.BigBlind', prop: 'nBigBlind', show: true, width: 80, sortable: true },
    { labelKey: 'HallTableList.Table.PreAnte', prop: 'nPreAnte', show: true, width: 80, sortable: true },
    { labelKey: 'HallTableList.Table.ModeType', prop: 'nModeType', show: true, width: 150, sortable: true },
    { labelKey: 'HallTableList.Table.ComputeMode', prop: 'nComputeMode', show: true, width: 150, sortable: false },
    { labelKey: 'HallTableConfig.Table.CreateTime', prop: 'createTime', show: true, width: 200, sortable: false }
  ]

  const findLabelKey = (prop) => tableConfigSource.find((source) => source.prop === prop)?.labelKey || ''

  const applyTableConfigLabels = (items) =>
    items.map((item) => ({
      ...item,
      lable: t(findLabelKey(item.prop))
    }))

  const tableConfig = ref(applyTableConfigLabels(tableConfigSource.map((item) => ({ ...item }))))
  const tableConfigReal = ref([])

  const persistTableConfigSelection = (selectedProps) => {
    localStorage.setItem('tableConfig', JSON.stringify(selectedProps))
  }

  const updateTableConfigSelection = () => {
    tableConfig.value = applyTableConfigLabels(tableConfig.value.map((item) => ({ ...item })))
    const selected = tableConfig.value.filter((val) => val.show)
    tableConfigReal.value = applyTableConfigLabels(selected.map((item) => ({ ...item })))
    persistTableConfigSelection(selected.map((item) => item.prop))
  }

  // 筛选配置
  const boxValueChange = () => {
    updateTableConfigSelection()
  }

  const apis = ref([])

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({})
  const editDialogRef = ref(null)
  const detailDialogRef = ref(null)
  const groupOptions = ref([])

  const detailDialogVisible = ref(false)
  const detailDialogTitle = ref(t('HallTableConfig.Dialog.DetailTitle'))

  const dialogTitle = ref(t('HallTableConfig.Dialog.EditTitle'))
  const dialogFormVisible = ref(false)

  const gameOptionSource = [
    { value: 125, labelKey: 'HallTableDialog.Options.Game.Texas' },
    { value: 175, labelKey: 'HallTableDialog.Options.Game.Short' }
  ]

  const gameOptions = ref([])

  const translateGameOptions = () => {
    gameOptions.value = gameOptionSource.map((item) => ({
      ...item,
      label: t(item.labelKey)
    }))
  }

  translateGameOptions()

  // 在组件挂载后执行
  onMounted(() => {
    const config = localStorage.getItem('tableConfig')
    if (config) {
      try {
        const parsed = JSON.parse(config)
        let storedProps = []
        if (Array.isArray(parsed)) {
          if (parsed.length && typeof parsed[0] === 'object') {
            storedProps = parsed.map((item) => item.prop).filter(Boolean)
          } else {
            storedProps = parsed
          }
        }
        if (storedProps.length) {
          tableConfig.value = applyTableConfigLabels(
            tableConfig.value.map((item) => ({
              ...item,
              show: storedProps.includes(item.prop)
            }))
          )
        }
      } catch (error) {
        console.error('Failed to parse tableConfig from localStorage:', error)
      }
    }

    updateTableConfigSelection()

    getTableData()
    getGroupOptions()
  })

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

  const onReset = () => {
    searchInfo.value = {}
    getTableData()
  }

  const onSubmit = () => {
    page.value = 1
    getTableData()
  }

  // 分页
  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  const handleDetail = (row) => {
    detailDialogTitle.value = t('HallTableConfig.Dialog.DetailTitle')
    detailDialogRef.value?.open(row)
  }

  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  const formatModeType = (type) => {
    if (type === 0) {
      return t('HallTableList.ModeType.None')
    }
    if (type === 1) {
      return t('HallTableList.ModeType.Hand')
    }
    if (type === 3) {
      return t('HallTableList.ModeType.Round')
    }
    return type
  }

  const formatComputeMode = (mode) => {
    if (mode === 0) {
      return t('HallTableList.ComputeMode.Pot')
    }
    if (mode === 1) {
      return t('HallTableList.ComputeMode.Profit')
    }
    return mode
  }

  // 排序
  const sortChange = ({ prop, order }) => {
    if (prop) {
      if (prop === 'ID') {
        prop = 'id'
      }
      searchInfo.value.orderKey = toSQLLine(prop)
      searchInfo.value.desc = order === 'descending'
    }
    getTableData()
  }

  // 查询
  const getTableData = async () => {
    const table = await getClubTableConfListApi({
      page: page.value,
      pageSize: pageSize.value,
      ...searchInfo.value
    })
    if (table.code === 0) {
      tableData.value = parseAndFlattenJSONValue(table.data.list || [])
      total.value = table.data.total
      page.value = table.data.page
      pageSize.value = table.data.pageSize
    }
  }

  getTableData()

  // 批量操作
  const handleSelectionChange = (val) => {
    apis.value = val
  }

  const editApiFunc = (row) => {
    dialogTitle.value = t('HallTableConfig.Dialog.EditTitle')
    editDialogRef.value?.open(row)
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

  const deleteApiFunc = async (row) => {
    ElMessageBox.confirm(t('HallTableConfig.Messages.ConfirmDelete'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const RadisKey = row.redisKey
      const key = row.key
      const res = await clubTableConfigDeleteApi({ RadisKey, key })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('HallTableConfig.Messages.DeleteSuccess')
        })
        if (tableData.value.length === 1 && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }

  watch(
    () => locale.value,
    () => {
      translateGameOptions()
      updateTableConfigSelection()
      detailDialogTitle.value = t('HallTableConfig.Dialog.DetailTitle')
      dialogTitle.value = t('HallTableConfig.Dialog.EditTitle')
    }
  )
</script>
