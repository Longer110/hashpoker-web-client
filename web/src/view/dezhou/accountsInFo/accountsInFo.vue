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
            <el-form-item :label="$t('AccountsInfo.Search.UserIdLabel')" prop="UserID">
              <el-input
                v-model.number="searchInfo.UserID"
                :placeholder="$t('AccountsInfo.Search.UserIdPlaceholder')"
                clearable
                style="width: 240px"
              />
            </el-form-item>
            <!-- 原标签：用户账号 -->
            <el-form-item :label="$t('AccountsInfo.Search.AccountsLabel')" prop="Accounts">
              <el-input
                v-model.number="searchInfo.Accounts"
                :placeholder="$t('AccountsInfo.Search.AccountsPlaceholder')"
                clearable
                style="width: 240px"
              />
            </el-form-item>
            <!-- 原标签：用户昵称 -->
            <el-form-item :label="$t('AccountsInfo.Search.NickNameLabel')" prop="NickName">
              <el-input
                v-model.number="searchInfo.NickName"
                :placeholder="$t('AccountsInfo.Search.NickNamePlaceholder')"
                clearable
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item>
              <!-- 原按钮：查询 -->
              <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
              <!-- 原按钮：重置 -->
              <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
              <!-- 原按钮：导出xlsx -->
              <el-button type="primary" icon="download" @click="exportFnXlsx" :loading="loadingXlsx">{{
                $t('AccountsInfo.Actions.ExportXlsx')
              }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div class="gva-table-box">
        <div class="gva-btn-list"></div>
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
                  v-for="item in columnOptions"
                  :key="item.key"
                  :label="item.key"
                  :value="item.key"
                >
                  {{ columnLabel(item.key) }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-popover>
        </el-icon>
        <!-- 数字示例 -->
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
          <!-- <el-table-column type="selection" width="55" /> -->
          <!-- 原列：序号 -->
          <el-table-column align="center" type="index" width="70" :label="$t('AccountsInfo.Table.Index')" />
          <!-- 原列：用户ID -->
          <el-table-column
            sortable
            v-if="colData[0].istrue"
            align="center"
            key="Math.random()"
            :label="$t('AccountsInfo.Table.UserId')"
            prop="UserID"
            min-width="120"
          >
            <template #default="scope">
              <span v-copy="scope.row.UserID"> {{ scope.row.UserID }}</span>
            </template>
          </el-table-column>

          <!-- 原列：用户账号 -->
          <el-table-column
            v-if="colData[1].istrue"
            align="center"
            key="Math.random()"
            :label="$t('AccountsInfo.Table.Accounts')"
            prop="Accounts"
            min-width="120"
          >
            <template #default="scope">
              <span v-copy="desensitize('name', scope.row.Accounts)">
                {{ desensitize('name', scope.row.Accounts) }}
                <!-- ||
                {{ scope.row.Accounts }} -->
              </span>
            </template>
          </el-table-column>
          <!-- 原列：用户余额 -->
          <el-table-column
            v-if="colData[1].istrue"
            align="center"
            key="Math.random()"
            :label="$t('AccountsInfo.Table.Balance')"
            prop="Money"
            min-width="120"
          >
            <template #default="scope">
              <span
                style="color: #409eff; cursor: pointer; text-decoration: underline"
                @click="goToPropertyRecords(scope.row)"
              >
                {{ scope.row.Money }}
              </span>
            </template>
          </el-table-column>
          <!-- 原列：昵称 -->
          <el-table-column
            v-if="colData[2].istrue"
            align="center"
            key="Math.random()"
            :label="$t('AccountsInfo.Table.NickName')"
            prop="NickName"
            min-width="120"
          >
            <template #default="scope">
              <div style="display: flex; align-items: center; justify-content: center">
                <span
                  style="color: #409eff; cursor: pointer; text-decoration: underline"
                  @click="goToNicknameHistory(scope.row)"
                  >{{ decodeBase64(scope.row.NickName) }}</span
                >
                <el-icon v-auth="btnAuth.edit" style="cursor: pointer; margin-left: 5px" @click="handleEdit(scope.row)">
                  <Edit />
                </el-icon>
              </div>
            </template>
          </el-table-column>
          <!-- 原列：平台ID -->
          <el-table-column
            v-if="colData[3].istrue"
            align="center"
            key="Math.random()"
            :label="$t('AccountsInfo.Table.ChannelID')"
            prop="ChannelID"
            min-width="120"
          />

          <el-table-column
            v-if="colData[4].istrue"
            align="center"
            key="Math.random()"
            prop="AccountType"
            min-width="170"
          >
            <template #header>
              <!-- 原列：账号类型 -->
              <span>{{ $t('AccountsInfo.Table.AccountType') }}</span>
              <el-tooltip :content="$t('AccountsInfo.Tooltips.AccountType')" placement="top" effect="light">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </template>
            <template #default="scope">{{ getAccountType(scope.row.AccountType) }}</template>
          </el-table-column>
          <!-- 原列：历史登录 -->
          <el-table-column
            v-if="colData[5].istrue"
            align="center"
            key="Math.random()"
            :label="$t('AccountsInfo.Table.LoginIP')"
            prop="LogongIP"
            min-width="120"
          >
            <template #default="scope">
              <span
                style="color: #409eff; cursor: pointer; text-decoration: underline"
                @click="goToLoginLog(scope.row)"
              >
                {{ scope.row.LogongIP }}
              </span>
            </template>
          </el-table-column>
          <!-- 最近登陆的时间，另外这个变化可以在用户登陆日志（后台可查）中查出最近3个月的登陆记录或者最近100条登陆记录（ID，昵称，登入渠道，登入机型，机器码，IP，时间） -->
          <!-- 原列：注册IP -->
          <el-table-column
            v-if="colData[6].istrue"
            align="center"
            key="Math.random()"
            :label="$t('AccountsInfo.Table.RegisterIP')"
            prop="RegistIP"
            min-width="120"
          />
          <!-- 原列：注册时间 -->
          <el-table-column
            v-if="colData[7].istrue"
            align="center"
            key="Math.random()"
            :label="$t('AccountsInfo.Table.RegisterTime')"
            prop="RegisTime"
            min-width="120"
          >
            <template #default="scope">{{ formatDate(scope.row.RegisTime) }}</template>
          </el-table-column>
          <!-- 原列：登入时间 -->
          <el-table-column
            v-if="colData[8].istrue"
            align="center"
            key="Math.random()"
            :label="$t('AccountsInfo.Table.LoginTime')"
            prop="RegisTime"
            min-width="120"
          >
            <template #default="scope">{{ formatDate(scope.row.LogonTime) }}</template>
          </el-table-column>
          <!-- 原列：标记 -->
          <el-table-column
            v-if="colData[9].istrue"
            align="center"
            key="Math.random()"
            :label="$t('AccountsInfo.Table.Remark')"
            prop="Remark"
            min-width="150"
          >
            <template #default="scope">
              <el-select
                v-model="scope.row.Remark"
                :placeholder="$t('AccountsInfo.Table.Remark')"
                @change="handleRemarkChange($event, scope.row)"
                style="width: 100%"
              >
                <el-option v-for="item in remarkOptions" :key="item.Id" :label="item.Remark" :value="item.Remark" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column fixed="right" min-width="400" align="center" :label="$t('AccountsInfo.Table.Actions')">
            <template #default="scope">
              <!-- 原操作按钮：查看 -->
              <el-button type="primary" link class="table-button" @click="getDetails(scope.row)"
                ><el-icon style="margin-right: 5px"><InfoFilled /></el-icon
                >{{ $t('AccountsInfo.Actions.View') }}</el-button
              >
              <!-- 原操作按钮：处罚 -->
              <el-button type="primary" link icon="WarnTriangleFilled" @click="penaltyFn(scope.row)">
                {{ $t('AccountsInfo.Actions.Penalty') }}
              </el-button>

              <!-- 原操作按钮：解封 -->
              <el-button type="primary" link icon="Filter" @click="unblockFn(scope.row)">
                {{ $t('AccountsInfo.Actions.Unblock') }}
              </el-button>
              <!-- 原操作按钮：增减货币 -->
              <el-button
                v-if="isShowZengJHuobi"
                type="primary"
                link
                icon="Sort"
                @click="fluctuateCurrency(scope.row)"
                >{{ $t('AccountsInfo.Actions.AdjustCurrency') }}</el-button
              >
              <!-- 原操作按钮：标记 -->
              <!-- <el-button type="primary" link icon="Flag" @click="markFn(scope.row)">
                {{ $t('AccountsInfo.Actions.Mark') }}
              </el-button> -->
              <!-- 新增操作按钮：充值记录 -->
              <el-button type="primary" link icon="Wallet" @click="goToPayList(scope.row)"> 充值记录 </el-button>
              <!-- 新增操作按钮：提现记录 -->
              <el-button type="primary" link icon="Money" @click="goToWithdrawList(scope.row)"> 提现记录 </el-button>
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
    <!-- 详情抽屉 -->
    <DetailDrawer v-model:visible="detailShow" :detail-data="detailForm" @close="closeDetailShow" />
    <!-- 处罚弹窗 -->
    <PenaltyDialog v-model:visible="penaltyShow" :row-data="penaltyRowData" @success="handlePenaltySuccess" />
    <!-- 解封弹窗 -->
    <UnblockDialog v-model:visible="unblockShow" :row-data="unblockRowData" @success="handleUnblockSuccess" />
    <!-- 增减货币弹窗 -->
    <CurrencyDialog v-model:visible="currencyShow" :row-data="currencyRowData" @success="handleCurrencySuccess" />
    <!-- 标记用户弹窗 -->
    <MarkDialog v-model:visible="markShow" :row-data="markRowData" @success="handleMarkSuccess" />
    <!-- 转账弹窗 -->
    <TransferDialog v-model:visible="transferFormShow" :row-data="transferRowData" @success="handleTransferSuccess" />
    <!-- 修改昵称弹窗 -->
    <EditNicknameDialog v-model:visible="editShow" :row-data="editRowData" @success="handleEditSuccess" />
    <!-- 历史登录弹窗 -->
    <HistoryLoginDialog v-model:visible="historyLoginShow" :history-login-list="historyLoginList" />
    <!-- 昵称历史弹窗 -->
    <NicknameHistoryDialog v-model:visible="nicknameHistoryShow" :nickname-history-list="nicknameHistoryList" />
  </div>
</template>

<script setup>
  import {
    findAccountsInFo,
    getAccountsInFoList,
    historyLoginApi,
    nickNameHistoryApi,
    updateAccountsInFoFoApi
  } from '@/api/dezhou/accountsInFo'
  import { getRemarkListApi } from '@/api/dezhou/tagManagement'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'
  import DetailDrawer from './components/DetailDrawer.vue'
  import PenaltyDialog from './components/PenaltyDialog.vue'
  import UnblockDialog from './components/UnblockDialog.vue'
  import CurrencyDialog from './components/CurrencyDialog.vue'
  import MarkDialog from './components/MarkDialog.vue'
  import TransferDialog from './components/TransferDialog.vue'
  import EditNicknameDialog from './components/EditNicknameDialog.vue'
  import HistoryLoginDialog from './components/HistoryLoginDialog.vue'
  import NicknameHistoryDialog from './components/NicknameHistoryDialog.vue'

  // 全量引入格式化工具 请按需保留
  import { formatDate } from '@/utils/format'
  import { ElMessage } from 'element-plus'
  import { QuestionFilled } from '@element-plus/icons-vue'
  import { ref, reactive, computed, onMounted } from 'vue'
  import router from '@/router'
  import { useBtnAuth } from '@/utils/btnAuth'
  import { useI18n } from 'vue-i18n'
  const btnAuth = useBtnAuth()
  const { t } = useI18n()
  // 引入脱敏
  import { desensitize } from '@/utils/desensitize'
  defineOptions({
    name: 'AccountsInFo'
  })
  import { useRoute } from 'vue-router'
  const route = useRoute() // 获取当前路由信息

  // 提交按钮loading
  const elSearchFormRef = ref()

  // =========== 表格控制部分 ===========
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableLoading = ref(false)
  const tableData = ref([])
  const searchInfo = ref({})

  // 标记选项列表
  const remarkOptions = ref([])

  // 获取标记选项列表
  const getRemarkOptions = async () => {
    try {
      const res = await getRemarkListApi()
      if (res.code === 0) {
        remarkOptions.value = res.data.list || []
      }
    } catch (error) {
      console.error('获取标记选项失败:', error)
    }
  }

  const filename = ref('')

  // 和后端约定，只要返回的btns有值 就显示增减货币
  const isShowZengJHuobi = computed(
    () => router.currentRoute.value.meta.btns && Object.keys(router.currentRoute.value.meta.btns).length > 0
  )

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

  // 导出相关状态
  const loadingXlsx = ref(false)
  const xlsxPath = ref('') // 从后端获取的xlsx文件路径

  // 导出 Excel
  const exportFnXlsx = async () => {
    loadingXlsx.value = true
    try {
      searchInfo.value.isExport = 1
      // searchInfo.value.exportType = 'xlsx' // 指定导出格式
      await getTableData()

      xlsxPath.value = `${import.meta.env.VITE_BASE_URl}${filename.value}`

      window.open(xlsxPath.value)
      ElMessage.success(t('AccountsInfo.Messages.ExportExcelSuccess')) // Excel 文件导出成功
    } catch (error) {
      console.error(t('AccountsInfo.Messages.ExportExcelError'), error)
      ElMessage.error(t('AccountsInfo.Messages.ExportExcelFailed')) // 导出Excel失败
    } finally {
      // 重置导出标志
      delete searchInfo.value.isExport
      // delete searchInfo.value.exportType
      loadingXlsx.value = false
    }
  }

  const decodeBase64 = (str) => {
    try {
      return decodeURIComponent(escape(atob(str)))
    } catch (e) {
      return str
    }
  }

  const accountTypeMap = computed(() => ({
    1: t('AccountsInfo.AccountType.Normal'),
    2: t('AccountsInfo.AccountType.Test'),
    0: t('AccountsInfo.AccountType.Guest'),
    4: t('AccountsInfo.AccountType.Observer'),
    7: t('AccountsInfo.AccountType.Telegram')
  }))

  const getAccountType = (accountType) => accountTypeMap.value[accountType] || accountType

  const sexMap = computed(() => ({
    0: t('AccountsInfo.Sex.Male'),
    1: t('AccountsInfo.Sex.Female'),
    2: t('AccountsInfo.Sex.Unknown')
  }))

  const getSex = (sexId) => sexMap.value[sexId] || sexId

  const isAndroidMap = computed(() => ({
    0: t('AccountsInfo.BooleanText.No'),
    1: t('AccountsInfo.BooleanText.Yes')
  }))

  const getIsAndroid = (isAndroid) => isAndroidMap.value[isAndroid] || isAndroid

  const getRealName = (realName) => {
    if (realName === 0 || realName === '0') {
      return t('AccountsInfo.RealName.Unverified')
    }
    if (Number(realName) > 0) {
      return t('AccountsInfo.RealName.Verified')
    }
    return realName
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
      const table = await getAccountsInFoList({
        page: page.value,
        pageSize: pageSize.value,
        ...searchInfo.value
      })
      if (table.code === 0) {
        tableData.value = table.data.list
        total.value = table.data.total
        page.value = table.data.page
        pageSize.value = table.data.pageSize
        filename.value = table.data.filename || ''
      }
    } finally {
      tableLoading.value = false
    }
  }

  // 处理标记选择变化
  const handleRemarkChange = async (remarkValue, row) => {
    try {
      const res = await updateAccountsInFoFoApi({
        UserID: row.UserID,
        Remark: remarkValue
      })
      if (res.code === 0) {
        ElMessage.success('标记成功')
        row.Remark = remarkValue
      } else {
        ElMessage.error(res.msg || '标记失败')
        // 如果失败,恢复原来的值，通过重新赋值触发视图更新
        const originalRemark = row.Remark
        row.Remark = ''
        setTimeout(() => {
          row.Remark = originalRemark
        }, 0)
      }
    } catch (error) {
      console.error('标记失败:', error)
      ElMessage.error('标记失败,请重试')
      const originalRemark = row.Remark
      row.Remark = ''
      setTimeout(() => {
        row.Remark = originalRemark
      }, 0)
    }
  }

  // 初始化数据
  getTableData()
  getRemarkOptions()

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

  // 行为控制标记（弹窗内部需要增还是改）
  const type = ref('')

  // ============== 详情抽屉 ==============
  const detailShow = ref(false)
  const detailForm = ref({})

  const getDetails = async (row) => {
    const res = await findAccountsInFo({ UserID: row.UserID })
    if (res.code === 0) {
      detailForm.value = res.data
      detailShow.value = true
    }
  }

  const closeDetailShow = () => {
    detailShow.value = false
    detailForm.value = {}
  }

  // ============== 处罚弹窗 ==============
  const penaltyShow = ref(false)
  const penaltyRowData = ref({})

  const penaltyFn = (row) => {
    penaltyRowData.value = row
    penaltyShow.value = true
  }

  const handlePenaltySuccess = () => {
    getTableData()
  }

  // ============== 解封弹窗 ==============
  const unblockShow = ref(false)
  const unblockRowData = ref({})

  const unblockFn = (row) => {
    unblockRowData.value = row
    unblockShow.value = true
  }

  const handleUnblockSuccess = () => {
    getTableData()
  }

  // ============== 增减货币弹窗 ==============
  const currencyShow = ref(false)
  const currencyRowData = ref({})

  const fluctuateCurrency = (row) => {
    currencyRowData.value = row
    currencyShow.value = true
  }

  const handleCurrencySuccess = () => {
    getTableData()
  }

  // ============== 标记用户弹窗 ==============
  const markShow = ref(false)
  const markRowData = ref({})

  const markFn = (row) => {
    markRowData.value = row
    markShow.value = true
  }

  const handleMarkSuccess = () => {
    getTableData()
  }

  // ============== 转账弹窗 ==============
  const transferFormShow = ref(false)
  const transferRowData = ref({})

  const transferFn = (row) => {
    transferRowData.value = row
    transferFormShow.value = true
  }

  const handleTransferSuccess = () => {
    getTableData()
  }

  // ============== 修改昵称弹窗 ==============
  const editShow = ref(false)
  const editRowData = ref({})

  const handleEdit = (row) => {
    editRowData.value = row
    editShow.value = true
  }

  const handleEditSuccess = () => {
    getTableData()
  }

  // ============== 历史登录弹窗 ==============
  const historyLoginShow = ref(false)
  const historyLoginList = ref([])
  const goToLoginLog = async (row) => {
    const params = {
      userId: row.UserID,
      orderField: 'LoginTime',
      orderType: 'desc',
      page: 1,
      pageSize: 5
    }
    try {
      const res = await historyLoginApi(params)
      if (res.code === 0) {
        // 处理接口返回的数据格式，可能是数组或对象
        historyLoginList.value = Array.isArray(res.data) ? res.data : res.data?.list || []
        historyLoginShow.value = true
      }
    } catch (error) {
      console.error('获取历史登录记录失败:', error)
      ElMessage.error('获取历史登录记录失败')
    }
  }

  // ============== 昵称历史修改弹窗 ==============
  const nicknameHistoryShow = ref(false)
  const nicknameHistoryList = ref([])
  const goToNicknameHistory = async (row) => {
    const params = {
      userId: row.UserID,
      page: 1,
      pageSize: 10
    }
    try {
      const res = await nickNameHistoryApi(params)
      if (res.code === 0) {
        // 处理接口返回的数据格式，可能是数组或对象
        nicknameHistoryList.value = res.data?.list || []
        nicknameHistoryShow.value = true
      }
    } catch (error) {
      console.error('获取昵称修改记录失败:', error)
      ElMessage.error('获取昵称修改记录失败')
    }
  }

  // 跳转到财产记录页面
  const goToPropertyRecords = (row) => {
    router.push({
      path: '/layout/gameRecords/propertyRecords',
      query: { UserID: row.UserID }
    })
  }

  // 跳转到充值列表页面
  const goToPayList = (row) => {
    router.push({
      path: '/layout/transferManagement/fundPool/transferPayList',
      query: { userID: row.UserID }
    })
  }

  // 跳转到提现列表页面
  const goToWithdrawList = (row) => {
    router.push({
      path: '/layout/transferManagement/fundPool/transferWithDrowList',
      query: { userID: row.UserID }
    })
  }

  //用于存放随机数用于key属性的绑定
  var reload = ref()

  const columnOptions = [
    // 原列标题：用户ID
    { key: 'UserID', titleKey: 'AccountsInfo.Table.UserId' },
    // 原列标题：用户账号
    { key: 'Accounts', titleKey: 'AccountsInfo.Table.Accounts' },
    // 原列标题：昵称
    { key: 'NickName', titleKey: 'AccountsInfo.Table.NickName' },
    // 原列标题：平台ID
    { key: 'ChannelID', titleKey: 'AccountsInfo.Table.ChannelID' },
    // 原列标题：账号类型
    { key: 'AccountType', titleKey: 'AccountsInfo.Table.AccountType' },
    // 原列标题：登入IP
    { key: 'LoginIP', titleKey: 'AccountsInfo.Table.LoginIP' },
    // 原列标题：注册IP
    { key: 'RegisterIP', titleKey: 'AccountsInfo.Table.RegisterIP' },
    // 原列标题：注册时间
    { key: 'RegisterTime', titleKey: 'AccountsInfo.Table.RegisterTime' },
    // 原列标题：登入时间
    { key: 'LoginTime', titleKey: 'AccountsInfo.Table.LoginTime' },
    // 原列标题：标记
    { key: 'Remark', titleKey: 'AccountsInfo.Table.Remark' }
  ]

  // 多选框的列表，列出表格的每一列
  const defaultColumnKeys = columnOptions.map((item) => item.key)

  // 当前选中的多选框，代表当前展示的列
  const checkedColumns = ref([...defaultColumnKeys])

  // colData中列出表格中的每一列，默认都展示
  const colData = reactive(columnOptions.map((item) => ({ ...item, istrue: true })))

  const columnLabel = (key) => {
    const option = columnOptions.find((item) => item.key === key)
    return option ? t(option.titleKey) : key
  }

  // 监听checkedColumns的变化，当checkedColumns发生变化时，重新渲染表格
  const watchCheckedColumns = () => {
    colData.forEach((item) => {
      item.istrue = checkedColumns.value.includes(item.key)
    })
    localStorage.setItem('accountsInfo', JSON.stringify(checkedColumns.value))
    // 重新渲染表格
    reload.value = Math.random()
  }
  onMounted(() => {
    const config = localStorage.getItem('accountsInfo')
    if (config) {
      try {
        const parsed = JSON.parse(config)
        if (Array.isArray(parsed)) {
          if (parsed.length && typeof parsed[0] === 'string') {
            checkedColumns.value = parsed
          } else if (parsed.length && typeof parsed[0] === 'object' && parsed[0] !== null) {
            checkedColumns.value = colData
              .map((item, index) => (parsed[index]?.istrue ? item.key : null))
              .filter(Boolean)
          }
        }
      } catch (error) {
        console.warn('Failed to parse accountsInfo column config', error)
      }
    }
    if (!checkedColumns.value.length) {
      checkedColumns.value = [...defaultColumnKeys]
    }
    watchCheckedColumns()
    // 从俱乐部过来直接搜索
    const UserId = route.query.UserId
    // 若需要根据参数请求数据
    if (UserId) {
      console.log('传递的ID有值:', UserId) // 输出传递的 row 值

      searchInfo.value.UserID = UserId
      getTableData()
    }
    getTableData()
  })
</script>

<style scoped lang="scss">
  .label-with-tooltip {
    display: flex;
    align-items: center;
    gap: 6px;

    .el-icon {
      color: #909399;
      cursor: help;
      &:hover {
        color: #409eff;
      }
    }
  }
</style>
