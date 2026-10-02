<template>
  <div>
    <TableSkeletonWrapper :loading="tableLoading" :show-search="true">
      <template #search>
        <div class="gva-search-box">
          <el-form
            ref="elSearchFormRef"
            :inline="true"
            :model="searchInfo"
            class="demo-form-inline"
            @keyup.enter="onSubmit"
          >
            <!-- 原标签：用户ID -->
            <el-form-item :label="$t('BannedList.Search.UserIdLabel')" prop="UserID">
              <el-input
                v-model.number="searchInfo.UserID"
                :placeholder="$t('BannedList.Search.UserIdPlaceholder')"
                clearable
                style="width: 240px"
              />
            </el-form-item>

            <!-- 原标签：封禁类型 -->
            <el-form-item :label="$t('BannedList.Search.BanTypeLabel')" prop="AType">
              <el-select v-model="searchInfo.AType" clearable :placeholder="$t('BannedList.Search.BanTypePlaceholder')">
                <el-option v-for="item in penaltyOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <template v-if="showAllQuery">
              <!-- 将需要控制显示状态的查询条件添加到此范围内 -->
            </template>

            <el-form-item>
              <!-- 原按钮：查询 -->
              <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
              <!-- 原按钮：重置 -->
              <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
              <!-- 原按钮：展开 -->
              <el-button link type="primary" icon="arrow-down" @click="showAllQuery = true" v-if="!showAllQuery"
                >{{ $t('BannedList.Actions.Expand') }}</el-button
              >
              <!-- 原按钮：收起 -->
              <el-button link type="primary" icon="arrow-up" @click="showAllQuery = false" v-else
                >{{ $t('BannedList.Actions.Collapse') }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div class="gva-table-box">
        <div class="gva-btn-list">
          <!-- <el-button type="primary" icon="plus" @click="openDialog()"
            >新增</el-button
          >
          <el-button
            icon="delete"
            style="margin-left: 10px"
            :disabled="!multipleSelection.length"
            @click="onDelete"
            >删除</el-button
          > -->
        </div>

        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          height="900"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="UserID"
          @selection-change="handleSelectionChange"
        >
          <!-- 原列：序号 -->
          <el-table-column align="center" type="index" width="70" :label="$t('BannedList.Table.Index')" />

          <!-- 原列：用户ID -->
          <el-table-column align="center" :label="$t('BannedList.Table.UserId')" prop="UserID" min-width="150">
            <template #default="scope">
              <span v-copy="scope.row.UserID"> {{ scope.row.UserID }}</span>
            </template>
          </el-table-column>
          <!-- 原列：封禁类型 -->
          <el-table-column align="center" :label="$t('BannedList.Table.BanType')" prop="ConfineType" min-width="120">
            <!-- 使用模板自定义显示内容 -->
            <template #default="scope">
              {{ getBanTypeLabel(scope.row.ConfineType) }}
            </template>
          </el-table-column>

          <!-- 原列：封禁信息 -->
          <el-table-column align="center" :label="$t('BannedList.Table.BanInfo')" prop="ConfineInfo" min-width="150" />
          <!-- 原列：其他封禁信息 -->
          <el-table-column align="center" :label="$t('BannedList.Table.OtherBanInfo')" prop="Other" min-width="150" />
          <!-- 原列：操作人ID -->
          <el-table-column align="center" :label="$t('BannedList.Table.OperatorId')" prop="OperatorID" min-width="150" />

          <!-- 原列：操作人名称 -->
          <el-table-column align="center" :label="$t('BannedList.Table.OperatorName')" prop="OperatorName" min-width="180" />
          <!-- 原列：封禁自动解除时间 -->
          <el-table-column align="center" :label="$t('BannedList.Table.AutoUnblockTime')" prop="EndTime" min-width="220">
            <template #default="scope">{{ formatDate(scope.row.EndTime) }}</template>
          </el-table-column>

          <!-- 原列：操作 -->
          <el-table-column min-width="100" align="center" :label="$t('BannedList.Table.Actions')" fixed="right">
            <template #default="scope">
              <!-- 原操作按钮：解封 -->
              <el-button type="primary" link icon="Filter" @click="unblockFn(scope.row)">
                {{ $t('BannedList.Actions.Unblock') }}
              </el-button>

              <!-- <el-button
                type="primary"
                link
                class="table-button"
                @click="getDetails(scope.row)"
                ><el-icon style="margin-right: 5px"><InfoFilled /></el-icon
                >查看</el-button
              >
              <el-button
                type="primary"
                link
                icon="edit"
                class="table-button"
                @click="updateAccountsInFoFunc(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="primary"
                link
                icon="delete"
                @click="deleteRow(scope.row)"
                >删除</el-button
              >

              <el-button
                type="primary"
                link
                icon="Flag"
                @click="unblockFn(scope.row)"
                >解封</el-button
              > -->
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

    <!-- 原弹窗：解封 -->
    <el-dialog
      width="600"
      ref="unblockFormRef"
      v-model="unblockShow"
      :title="$t('BannedList.Dialogs.UnblockTitle')"
      align-center
    >
      <el-form label-position="top" :model="unblockFormInline" class="demo-form-inline">
        <!-- 原字段：用户ID -->
        <el-form-item :label="$t('BannedList.Table.UserId')">
          <el-input
            v-model="unblockFormInline.UserID"
            :placeholder="$t('BannedList.Placeholders.UserId')"
            clearable
            disabled="true"
          />
        </el-form-item>
        <!-- 原字段：解封类型 -->
        <el-form-item :label="$t('BannedList.Dialogs.UnblockType')">
          <el-select
            v-model="unblockFormInline.AType"
            :placeholder="$t('BannedList.Placeholders.UnblockType')"
            style="width: 240px"
          >
            <el-option v-for="item in penaltyOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <!-- 原按钮：取消 -->
          <el-button @click="unblockShow = false">{{ $t('Common.Cancel') }}</el-button>
          <!-- 原按钮：确认 -->
          <el-button type="primary" @click="unblockRow"> {{ $t('Common.Confirm') }} </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import {
    createAccountsInFo,
    deleteAccountsInFo,
    deleteAccountsInFoByIds,
    updateAccountsInFo,
    findAccountsInFo,
    getAccountsInFoList,
    penaltyAccountsInFoApi,
    unblockAccountsInFoApi,
    getPunishmentUserListApi
  } from '@/api/dezhou/accountsInFo'

  // 全量引入格式化工具 请按需保留
  import {
    getDictFunc,
    formatDate,
    formatBoolean,
    filterDict,
    filterDataSource,
    returnArrImg,
    onDownloadFile
  } from '@/utils/format'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ref, reactive, onMounted, computed } from 'vue'
  import { useAppStore } from '@/pinia'
  import { useI18n } from 'vue-i18n'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  defineOptions({
    name: 'bannedList'
  })

  const { t } = useI18n()

  onMounted(() => {
    console.log('DOM 已挂载：')
    getTableData()
  })
  // 提交按钮loading
  const btnLoading = ref(false)
  const appStore = useAppStore()

  // 控制更多查询条件显示/隐藏状态
  const showAllQuery = ref(false)

  // 自动化生成的字典（可能为空）以及字段
  const formData = ref({
    UserID: undefined,
    Accounts: '',
    Password: '',
    NickName: '',
    FaceID: '',
    Sex: undefined,
    AccountType: false,
    PhoneType: '',
    SysVersion: '',
    Models: '',
    RegistChannel: '',
    LogonChannel: '',
    ShopID: undefined,
    LogongIP: '',
    RegistIP: '',
    RegisTime: new Date(),
    LogonTime: new Date(),
    BinDingPHone: '',
    RealName: '',
    WeiXinOpenID: '',
    WeiXinUnionID: '',
    HeadUrl: '',
    IsAndroid: undefined,
    SafePassWord: '',
    ShopAccount: '',
    ChannelID: undefined,
    UserMark: undefined,
    LogonPos: '',
    ClientVersion: '',
    ServerVersion: '',
    DeviceModel: '',
    LogonRealIP: '',
    InviteCode: '',
    Mail: ''
  })

  // 验证规则
  const rule = reactive({})

  const elFormRef = ref()
  const elSearchFormRef = ref()

  // =========== 表格控制部分 ===========
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableLoading = ref(false)
  const tableData = ref([])
  const searchInfo = ref({})

  const banTypeMap = computed(() => ({
    // 原封禁类型：账号封禁
    1: t('BannedList.BanTypeOptions.AccountBan'),
    // 原封禁类型：世界聊天禁言
    2: t('BannedList.BanTypeOptions.WorldChatMute'),
    // 原封禁类型：IP封禁
    3: t('BannedList.BanTypeOptions.IPBan'),
    // 原封禁类型：GPS封禁
    4: t('BannedList.BanTypeOptions.GPSBan')
  }))

  const getBanTypeLabel = (type) => banTypeMap.value[type] || type
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
      if (searchInfo.value.AccountType === '') {
        searchInfo.value.AccountType = null
      }
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
    tableLoading.value = true
    try {
      const table = await getPunishmentUserListApi({
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
      tableLoading.value = false
    }
  }

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
    ElMessageBox.confirm(t('BannedList.Messages.DeleteConfirm'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(() => {
      deleteAccountsInFoFunc(row)
    })
  }

  // 多选删除
  const onDelete = async () => {
    ElMessageBox.confirm(t('BannedList.Messages.DeleteConfirm'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const UserIDs = []
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'warning',
          message: t('BannedList.Messages.DeleteWarning')
        })
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map((item) => {
          UserIDs.push(item.UserID)
        })
      const res = await deleteAccountsInFoByIds({ UserIDs })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('BannedList.Messages.DeleteSuccess')
        })
        if (tableData.value.length === UserIDs.length && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }

  // 行为控制标记（弹窗内部需要增还是改）
  const type = ref('')

  // 更新行
  const updateAccountsInFoFunc = async (row) => {
    const res = await findAccountsInFo({ UserID: row.UserID })
    type.value = 'update'
    if (res.code === 0) {
      formData.value = res.data
      dialogFormVisible.value = true
    }
  }

  // 删除行
  const deleteAccountsInFoFunc = async (row) => {
    const res = await deleteAccountsInFo({ UserID: row.UserID })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: t('BannedList.Messages.DeleteSuccess')
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
          res = await createAccountsInFo(formData.value)
          break
        case 'update':
          res = await updateAccountsInFo(formData.value)
          break
        default:
          res = await createAccountsInFo(formData.value)
          break
      }
      btnLoading.value = false
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('BannedList.Messages.CreateOrUpdateSuccess')
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
    const res = await findAccountsInFo({ UserID: row.UserID })
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

  let penaltyFormRef = ref()
  let unblockFormRef = ref()

  const penaltyFormInline = ref({})
  const penaltyOptions = computed(() => [
    { label: t('BannedList.BanTypeOptions.AccountBan'), value: 1 },
    { label: t('BannedList.BanTypeOptions.WorldChatMute'), value: 2 },
    { label: t('BannedList.BanTypeOptions.IPBan'), value: 3 },
    { label: t('BannedList.BanTypeOptions.GPSBan'), value: 4 }
  ])

  // 确认处罚
  const penaltyRow = async () => {
    penaltyAccountsInFoApi(penaltyFormInline.value).then((res) => {
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('BannedList.Messages.PenaltySuccess')
        })
        penaltyShow.value = false
      }
    })
  }

  const unblockShow = ref(false)
  const unblockFormInline = ref({})
  const unblockFn = async (row) => {
    console.log(row)
    unblockFormInline.value.UserID = row.UserID
    unblockFormInline.value.AType = row.ConfineType
    unblockShow.value = true
  }

  // 确认解封
  const unblockRow = async () => {
    unblockAccountsInFoApi(unblockFormInline.value).then((res) => {
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('BannedList.Messages.UnblockSuccess')
        })
        getTableData()
        unblockShow.value = false
      }
    })
  }
  // 解封
</script>

<style></style>
