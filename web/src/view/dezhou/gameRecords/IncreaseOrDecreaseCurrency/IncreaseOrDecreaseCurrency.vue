<template>
  <!-- 增减货币记录 -->

  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :search-field-count="5"
      :search-button-count="3"
      :row-count="pageSize"
      :show-toolbar="false"
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
            <!-- 查询区域 -->
            <!-- 原: 玩家ID -->
            <el-form-item :label="$t('PropertyRecords.PlayerID')" prop="UserID">
              <!-- 原: 请输入玩家ID -->
              <el-input
                v-model="searchInfo.UserID"
                :placeholder="$t('PropertyRecords.PlaceholderPlayerID')"
                clearable
                style="width: 240px"
              />
            </el-form-item>

            <!-- 原: 平台UserID -->
            <el-form-item :label="$t('PropertyRecords.PlatformUserID')" prop="ChannelID">
              <!-- 原: 请输入平台UserID -->
              <el-input
                v-model="searchInfo.ChannelID"
                :placeholder="$t('PropertyRecords.PlaceholderPlatformUserID')"
                clearable
                style="width: 240px"
              />
            </el-form-item>

            <!-- 原: 道具类型 -->
            <el-form-item :label="$t('PropertyRecords.ItemType')" prop="ItemID">
              <!-- 原: 请选择道具类型 -->
              <el-select
                v-model="searchInfo.ItemID"
                :placeholder="$t('PropertyRecords.PlaceholderItemType')"
                clearable
                style="width: 240px"
              >
                <el-option v-for="(item, index) in itemList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <!-- 原: 变动类型 -->
            <el-form-item :label="$t('PropertyRecords.ChangeType')" prop="SourceType">
              <!-- 原: 请选择变动类型 -->
              <el-select
                v-model="searchInfo.SourceType"
                :placeholder="$t('PropertyRecords.PlaceholderChangeType')"
                clearable
                style="width: 240px"
              >
                <el-option v-for="(item, index) in gameTypeList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <!-- 原: 时间 -->
            <el-form-item :label="$t('PropertyRecords.Time')">
              <el-date-picker
                v-model="searchInfo.createdAtRange"
                style="width: 350px"
                type="datetimerange"
                :start-placeholder="$t('PropertyRecords.StartTime')"
                :end-placeholder="$t('PropertyRecords.EndTime')"
                :clearable="false"
              />
            </el-form-item>

            <el-form-item>
              <!-- 原: 查询 -->
              <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
              <!-- 原: 重置 -->
              <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
              <!-- 原: 导出 -->
              <el-button type="primary" icon="download" @click="exportFn">{{
                $t('GlobalUniversality.Export')
              }}</el-button>
              <!-- <el-button link type="primary" icon="arrow-down" @click="showAllQuery = true" v-if="!showAllQuery"
                >展开</el-button
              >
              <el-button link type="primary" icon="arrow-up" @click="showAllQuery = false" v-else>收起</el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </template>

      <div class="gva-table-box">
        <div class="gva-btn-list">
          <!-- <el-button type="primary" icon="plus" @click="openDialog()">新增</el-button>
          <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete"
            >删除</el-button
          > -->
        </div>

        <!-- 表格部分 -->
        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="id"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column type="selection" width="55" /> -->
          <!-- 原: 序号 -->
          <el-table-column align="center" :label="$t('PropertyRecords.Index')" type="index" width="70" />
          <!-- 原: 玩家ID -->
          <el-table-column align="center" :label="$t('PropertyRecords.PlayerID')" prop="UserID" width="150">
            <template #default="scope">
              <span v-copy="scope.row.UserID"> {{ scope.row.UserID }}</span>
            </template>
          </el-table-column>

          <!-- 原: 操作人ID -->
          <el-table-column align="center" :label="$t('PropertyRecords.OperatorId')" prop="OperatorId" width="150" />
          <!-- 原: 操作人 -->
          <el-table-column align="center" :label="$t('PropertyRecords.Operator')" prop="Operator" width="150" />
          <!-- <el-table-column align="center" label="平台UserID" prop="ChannelID" width="180" /> -->
          <!-- 牌局ID -->
          <el-table-column align="center" :label="$t('PropertyRecords.PaiJuId')" prop="PaiJuId" width="150">
            <template #default="scope">
              <span> {{ scope.row.ExtraData ? scope.row.ExtraData.sPaiJuId : '' }}</span>
            </template>
          </el-table-column>
          <!-- 原: 道具类型 -->
          <el-table-column align="center" :label="$t('PropertyRecords.ItemType')" prop="ItemID" min-width="150">
            <template #default="scope">{{ itemList.find((item) => item.value === scope.row.ItemID)?.label }}</template>
          </el-table-column>

          <!-- 原: 起始数额 -->
          <el-table-column
            align="center"
            :label="$t('PropertyRecords.StartAmount')"
            prop="XiaZhu"
            min-width="150"
            sortable
          >
            <template #default="scope">
              <span :style="{ color: scope.row.AgoData > 0 ? 'red' : scope.row.AgoData < 0 ? 'green' : '#fff' }">
                {{ scope.row.AgoData }}
              </span>
            </template>
          </el-table-column>

          <!-- 原: 变动数额 -->
          <el-table-column
            align="center"
            :label="$t('PropertyRecords.ChangeAmount')"
            prop="UpdateCount"
            min-width="150"
            sortable
          >
            <template #default="scope">
              <span
                :style="{ color: scope.row.UpdateCount > 0 ? 'red' : scope.row.UpdateCount < 0 ? 'green' : '#fff' }"
              >
                {{ scope.row.UpdateCount }}
              </span>
            </template>
          </el-table-column>

          <!-- 原: 结束数额 -->
          <el-table-column
            align="center"
            :label="$t('PropertyRecords.EndAmount')"
            prop="LaterData"
            min-width="150"
            sortable
          >
            <template #default="scope">
              <span :style="{ color: scope.row.LaterData > 0 ? 'red' : scope.row.LaterData < 0 ? 'green' : '#fff' }">
                {{ scope.row.LaterData }}
              </span>
            </template>
          </el-table-column>
          <!-- 变动模块 -->
          <el-table-column
            align="center"
            :label="$t('PropertyRecords.changeModule')"
            prop="OperationName"
            min-width="150"
            sortable
          >
            <!-- <template #default="scope">{{ gameTypeObject[scope.row.GameType] }}</template> -->
          </el-table-column>
          <!-- 原: 变动类型 -->
          <el-table-column
            align="center"
            :label="$t('PropertyRecords.ChangeType')"
            prop="TypeName"
            min-width="150"
            sortable
          >
            <!-- <template #default="scope">{{ gameTypeObject[scope.row.SourceType] }}</template> -->
          </el-table-column>
          <!-- <el-table-column align="center" label="房间号" prop="RoomId" width="120" /> -->
          <!-- 原: 时间 -->
          <el-table-column align="center" :label="$t('PropertyRecords.Time')" prop="UpdateTime" min-width="180">
            <template #default="scope">{{ formatDate(scope.row.UpdateTime) }}</template>
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

    <!-- 详情抽屉 -->
    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="detailShow"
      :show-close="true"
      :before-close="closeDetailShow"
      :title="$t('PropertyRecords.ViewDetail')"
    >
      <el-descriptions :column="1" border>
        <el-descriptions-item :label="$t('PropertyRecords.PlayerID')">{{ detailForm.UserID }}</el-descriptions-item>
        <!-- <el-descriptions-item :label="$t('PropertyRecords.PlatformUserID')">{{ detailForm.ChannelID }}</el-descriptions-item> -->
        <el-descriptions-item :label="$t('PropertyRecords.ItemType')">{{ detailForm.ItemID }}</el-descriptions-item>
        <el-descriptions-item :label="$t('PropertyRecords.StartAmount')">{{ detailForm.AgoData }}</el-descriptions-item>
        <el-descriptions-item :label="$t('PropertyRecords.ChangeAmount')">{{
          detailForm.UpdateCount
        }}</el-descriptions-item>
        <el-descriptions-item :label="$t('PropertyRecords.EndAmount')">{{ detailForm.LaterData }}</el-descriptions-item>
        <el-descriptions-item :label="$t('PropertyRecords.ChangeType')">{{
          gameTypeObject[detailForm.SourceType]
        }}</el-descriptions-item>
        <!-- <el-descriptions-item :label="$t('PropertyRecords.RoomId')">{{ detailForm.RoomId }}</el-descriptions-item> -->
        <el-descriptions-item :label="$t('PropertyRecords.OperateTime')">{{
          formatDate(detailForm.UpdateTime)
        }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
  import { ref, reactive, watch, onActivated } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { useI18n } from 'vue-i18n'
  import { useAppStore } from '@/pinia'
  import { formatDate } from '@/utils/format'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  import {
    createClubUser,
    deleteClubUser,
    deleteClubUserByIds,
    updateClubUser,
    findClubUser
  } from '@/api/dezhou/clubUser'
  import { getUserTreasureRecordList, getChangeType } from '@/api/dezhou/propertyRecords'

  defineOptions({ name: 'PropertyRecord' })

  const { t } = useI18n()

  // 控制更多查询条件显示/隐藏状态
  const showAllQuery = ref(false)

  const appStore = useAppStore()
  const btnLoading = ref(false)
  const dialogFormVisible = ref(false)
  const detailShow = ref(false)
  const type = ref('')

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const loading = ref(false)
  const multipleSelection = ref([])
  const filename = ref('')

  const formData = ref({
    id: undefined,
    UserID: undefined,
    ChannelID: undefined,
    ItemID: undefined,
    UpdateCount: 0,
    AgoData: 0,
    LaterData: 0,
    SourceType: undefined,
    UpdateTime: new Date(),
    RoomId: undefined
  })

  const itemList = ref([
    { label: t('PropertyRecords.Gold'), value: 1 }
    // { label: t('PropertyRecords.BankBalance'), value: 2 }
  ])

  const searchInfo = ref({
    UserID: undefined,
    ChannelID: undefined,
    ItemID: undefined,
    SourceType: undefined,
    UpdateTime: []
  })

  const elFormRef = ref()
  const elSearchFormRef = ref()
  const detailForm = ref({})

  const exportFn = async () => {
    searchInfo.value.isExport = 1
    await getTableData()
    window.open(`${import.meta.env.VITE_BASE_URl}${filename.value}`)
  }

  const getTableData = async () => {
    loading.value = true
    try {
      const res = await getUserTreasureRecordList({
        page: page.value,
        pageSize: pageSize.value,
        ...searchInfo.value
      })
      if (res.code === 0) {
        tableData.value = res.data.list.map((item) => ({
          ...item,
          ExtraData: typeof item.ExtraData === 'string' ? JSON.parse(item.ExtraData) : item.ExtraData
        }))
        total.value = res.data.total
        filename.value = res.data.filename || ''
      }
      return res
    } finally {
      loading.value = false
    }
  }
  getTableData()

  const gameTypeList = ref([])
  const gameTypeObject = ref([])
  const getChangeTypeList = async () => {
    const res = await getChangeType()
    if (res.code === 0) {
      const resData = (res.data.List || []).map((v) => {
        return {
          label: v.name,
          value: v.typeId
        }
      })
      gameTypeList.value = resData
      gameTypeObject.value = resData.reduce((acc, cur) => {
        acc[cur.value] = cur.label
        return acc
      }, {})
    }
  }
  getChangeTypeList()

  const onSubmit = () => getTableData()
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
  const handleSelectionChange = (val) => (multipleSelection.value = val)

  const openDialog = () => {
    type.value = 'create'
    dialogFormVisible.value = true
  }
  const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {
      id: undefined,
      UserID: undefined,
      ChannelID: undefined,
      ItemID: undefined,
      UpdateCount: 0,
      AgoData: 0,
      LaterData: 0,
      SourceType: undefined,
      UpdateTime: new Date(),
      RoomId: undefined
    }
  }

  const enterDialog = async () => {
    btnLoading.value = true
    let res = type.value === 'update' ? await updateClubUser(formData.value) : await createClubUser(formData.value)
    btnLoading.value = false
    if (res.code === 0) {
      ElMessage.success(t('PropertyRecords.OperationSuccess'))
      closeDialog()
      getTableData()
    }
  }

  const getDetails = async (row) => {
    const res = await findClubUser({ id: row.id })
    if (res.code === 0) {
      detailForm.value = res.data
      detailShow.value = true
    }
  }
  const closeDetailShow = () => (detailShow.value = false)

  const updateRow = async (row) => {
    const res = await findClubUser({ id: row.id })
    if (res.code === 0) {
      formData.value = res.data
      type.value = 'update'
      dialogFormVisible.value = true
    }
  }

  const deleteRow = (row) => {
    ElMessageBox.confirm(t('PropertyRecords.ConfirmDeleteOne'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await deleteClubUser({ id: row.id })
      if (res.code === 0) {
        ElMessage.success(t('PropertyRecords.DeleteSuccess'))
        getTableData()
      }
    })
  }

  const onDelete = async () => {
    if (!multipleSelection.value.length) {
      return ElMessage.warning(t('PropertyRecords.SelectDeleteData'))
    }
    ElMessageBox.confirm(t('PropertyRecords.ConfirmDeleteSelected'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const ids = multipleSelection.value.map((v) => v.id)
      const res = await deleteClubUserByIds({ ids })
      if (res.code === 0) {
        ElMessage.success(t('PropertyRecords.DeleteBatchSuccess'))
        getTableData()
      }
    })
  }

  // 外部跳转过来的查询逻辑
  // 读取当前路由参数，赋值给搜索条件的id
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const syncFromQuery = () => {
    if (route.query.UserID) {
      searchInfo.value.UserID = route.query.UserID
      getTableData()
    }
  }

  syncFromQuery() // 首次进入时跑一次

  watch(
    () => route.query.id,
    () => {
      syncFromQuery() // 参数变化时触发
    }
  )

  onActivated(() => {
    syncFromQuery() // keep-alive 恢复时也再检查一次
  })
</script>

<style scoped>
  .gva-search-box {
    margin-bottom: 20px;
  }
  .gva-btn-list {
    margin-bottom: 10px;
  }
</style>
