<template>
  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :search-field-count="3"
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
            label-width="80px"
          >
            <!-- 原: 用户ID -->
            <el-form-item :label="$t('PaiJuWinLoseRecord.UserID')" prop="userId">
              <!-- 原: 请输入用户ID -->
              <el-input
                v-model="searchInfo.userId"
                clearable
                :placeholder="$t('PaiJuWinLoseRecord.PlaceholderUserID')"
                style="width: 240px"
              />
            </el-form-item>

            <!-- 原: 牌局ID -->
            <el-form-item :label="$t('PaiJuWinLoseRecord.PaiJuID')" prop="paiJuId">
              <!-- 原: 请输入牌局ID -->
              <el-input
                v-model="searchInfo.paiJuId"
                clearable
                :placeholder="$t('PaiJuWinLoseRecord.PlaceholderPaiJuID')"
                style="width: 240px"
              />
            </el-form-item>

            <!-- 原: 玩家ID -->
            <el-form-item :label="$t('PaiJuWinLoseRecord.PlayerID')" prop="playerId">
              <!-- 原: 请选择玩家ID -->
              <el-select
                v-model="searchInfo.playerId"
                :placeholder="$t('PaiJuWinLoseRecord.PlaceholderUserID')"
                style="width: 240px"
              >
                <el-option
                  v-for="(item, index) in gameOptions"
                  :key="index"
                  :label="`${item.label}(${item.value})`"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <!-- 原: 时间 -->
            <el-form-item :label="$t('PaiJuWinLoseRecord.Time')">
              <el-date-picker
                v-model="searchInfo.createdAtRange"
                style="width: 350px"
                type="datetimerange"
                :range-separator="$t('PaiJuWinLoseRecord.RangeSeparator')"
                :start-placeholder="$t('PaiJuWinLoseRecord.StartTime')"
                :end-placeholder="$t('PaiJuWinLoseRecord.EndTime')"
                :clearable="false"
              />
            </el-form-item>
            <template v-if="showAllQuery">
              <!-- 将需要控制显示状态的查询条件添加到此范围内 -->
            </template>

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
          <!-- <el-button type="primary" icon="plus" @click="openDialog()">新增</el-button> -->
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
          <!-- 原: 序号 -->
          <el-table-column align="center" :label="$t('PaiJuWinLoseRecord.Index')" type="index" width="70" />
          <!-- 原: 记录ID -->
          <el-table-column align="center" :label="$t('PaiJuWinLoseRecord.RecordID')" prop="id" :min-width="150" />
          <!-- 原: 牌局ID -->
          <el-table-column align="center" :label="$t('PaiJuWinLoseRecord.PaiJuID')" prop="CreatetTime" :min-width="150">
            <template #default="scope">
              <span v-copy="scope.row.PaiJuId" style="cursor: pointer">
                <u @click="goToPaiJuRecord(scope.row.PaiJuId)">{{ scope.row.PaiJuId }}</u>
              </span>
              <!-- <el-icon @click="goToPaiJuRecord(scope.row.PaiJuId)" style="cursor: pointer; margin-left: 5px"
              ><Pointer
            /></el-icon> -->
            </template>
          </el-table-column>

          <!-- 原: 玩家ID -->
          <el-table-column align="center" :label="$t('PaiJuWinLoseRecord.PlayerID')" prop="UserID" :min-width="150">
            <template #default="scope">
              <span v-copy="scope.row.UserID"> {{ scope.row.UserID }}</span>
            </template>
          </el-table-column>

          <!-- 原: 游戏类型 -->
          <el-table-column align="center" :label="$t('PaiJuWinLoseRecord.GameType')" prop="GameType" :min-width="150">
            <template #default="scope">{{
              gameOptions.find((item) => item.value === scope.row.GameType)?.label
            }}</template>
          </el-table-column>

          <!-- 原: 场次 -->
          <el-table-column align="center" :label="$t('PaiJuWinLoseRecord.Session')" prop="Session" :min-width="150">
            <template #default="scope">{{ formateSession(scope.row.Session) }}</template>
          </el-table-column>

          <!-- 原: 输赢情况 -->
          <el-table-column
            align="center"
            :label="$t('PaiJuWinLoseRecord.WinLose')"
            prop="WinLose"
            :min-width="150"
            sortable
          >
            <template #default="scope">
              <span :style="{ color: scope.row.WinLose > 0 ? 'red' : scope.row.WinLose < 0 ? 'green' : '#fff' }">
                {{ Math.round(scope.row.WinLose * 100) / 100 }}
              </span>
            </template>
          </el-table-column>

          <!-- 原: 抽水 -->
          <el-table-column
            align="center"
            :label="$t('PaiJuWinLoseRecord.DrawWater')"
            prop="DrawWater"
            :min-width="150"
            sortable
          >
          </el-table-column>
          <!-- 抽水类型 -->
          <el-table-column
            align="center"
            :label="$t('PaiJuWinLoseRecord.PumpingType')"
            prop="ChouShuiType"
            :min-width="150"
            sortable
          >
            <template #default="scope">
              {{ formatModeType(scope.row.ChouShuiType) }}
            </template>
          </el-table-column>

          <!-- 原: 下注金额 -->
          <el-table-column
            align="center"
            :label="$t('PaiJuWinLoseRecord.BetAmount')"
            prop="XiaZhu"
            :min-width="150"
            sortable
          >
            <template #default="scope">
              <span :style="{ color: scope.row.XiaZhu > 0 ? 'red' : scope.row.XiaZhu < 0 ? 'green' : '#fff' }">
                {{ scope.row.XiaZhu }}
              </span>
            </template>
          </el-table-column>

          <!-- 原: 有效投注额 -->
          <el-table-column
            align="center"
            :label="$t('PaiJuWinLoseRecord.ValidBet')"
            prop="Valid"
            :min-width="150"
            sortable
          >
            <template #default="scope">
              <span :style="{ color: scope.row.Valid > 0 ? 'red' : scope.row.Valid < 0 ? 'green' : '#fff' }">
                {{ scope.row.Valid }}
              </span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="结算类型" prop="nLumpSumType" :min-width="150">
            <template #default="scope">{{ scope.row.nLumpSumType }}</template>
          </el-table-column>
          <!-- 原: 时间 -->
          <el-table-column align="center" :label="$t('PaiJuWinLoseRecord.Time')" prop="CreatetTime" :min-width="150">
            <template #default="scope">{{ formatDate(scope.row.CreatetTime) }}</template>
          </el-table-column>

          <!-- 原: 操作 -->
          <el-table-column
            align="right"
            header-align="center"
            :label="$t('PaiJuWinLoseRecord.Actions')"
            fixed="right"
            :min-width="80"
          >
            <template #default="scope">
              <!-- 原: 查看 -->
              <el-button type="primary" link class="table-button" @click="getDetails(scope.row)">
                <el-icon style="margin-right: 5px"><InfoFilled /></el-icon
                >{{ $t('PaiJuWinLoseRecord.View') }}</el-button
              >
              <!-- <el-button
              type="primary"
              link
              icon="edit"
              class="table-button"
              @click="updatePaiJuWinLoseRecordFunc(scope.row)"
              >编辑</el-button
            >
            <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el-button> -->
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
          <span class="text-lg">{{ type === 'create' ? '新增' : '编辑' }}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">确 定</el-button>
            <el-button @click="closeDialog">取 消</el-button>
          </div>
        </div>
      </template>

      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rule" label-width="80px">
        <el-form-item label="id字段:" prop="id">
          <el-input v-model.number="formData.id" :clearable="true" placeholder="请输入id字段" />
        </el-form-item>
        <el-form-item label="UserID字段:" prop="UserID">
          <el-input v-model.number="formData.UserID" :clearable="true" placeholder="请输入UserID字段" />
        </el-form-item>
        <el-form-item label="游戏类型:" prop="GameType">
          <el-input v-model.number="formData.GameType" :clearable="true" placeholder="请输入游戏类型" />
        </el-form-item>
        <el-form-item label="场次：免费   新手 初级 中级 高级:" prop="Session">
          <el-input
            v-model.number="formData.Session"
            :clearable="true"
            placeholder="请输入场次：免费   新手 初级 中级 高级"
          />
        </el-form-item>
        <el-form-item label="输赢情况:" prop="WinLose">
          <el-input-number v-model="formData.WinLose" style="width: 100%" :precision="2" :clearable="true" />
        </el-form-item>
        <el-form-item label="抽水:" prop="DrawWater">
          <el-input-number v-model="formData.DrawWater" style="width: 100%" :precision="2" :clearable="true" />
        </el-form-item>
        <el-form-item label="下注金额:" prop="XiaZhu">
          <el-input-number v-model="formData.XiaZhu" style="width: 100%" :precision="2" :clearable="true" />
        </el-form-item>
        <el-form-item label="有效投注额:" prop="Valid">
          <el-input-number v-model="formData.Valid" style="width: 100%" :precision="2" :clearable="true" />
        </el-form-item>
        <el-form-item label="牌局ID:" prop="PaiJuId">
          <el-input v-model="formData.PaiJuId" :clearable="true" placeholder="请输入牌局ID" />
        </el-form-item>
        <el-form-item label="CreatetTime字段:" prop="CreatetTime">
          <el-date-picker
            v-model="formData.CreatetTime"
            type="date"
            style="width: 100%"
            placeholder="选择日期"
            :clearable="true"
          />
        </el-form-item>
        <el-form-item
          label="记录类型   0普通,1庄家标志
飞行棋游戏： 1 经典玩法，2 赏金玩法，3 待续:"
          prop="nType"
        >
          <el-input
            v-model.number="formData.nType"
            :clearable="true"
            placeholder="请输入记录类型   0普通,1庄家标志
飞行棋游戏： 1 经典玩法，2 赏金玩法，3 待续"
          />
        </el-form-item>
        <el-form-item
          label="该玩家本局的游戏特色数据(json格式存放:
注: 百人游戏记录真人：

百人金花： nArea: 0-2代表：红，幸运，黑
百家乐：'和'=1,'闲'=2,'闲对'=3,'闲天王'=4,'庄'=5,'庄对'=6,'庄天王'=7;
{
tBet = {
[nArea=投注区域1， nBet=投注区域1筹码, nProfit=區域1盈利}，
[nArea=投注区域2， nBet=投注区域2筹码, nProfit=區域2盈利}，
tUserInfo = ｛
 {nUserId = , nSitId=, sName=昵称, nGold = 身上金币，sUrl = 头像, bZhuan = } ,{}...｝
 }

飞行棋游戏： json格式：
sUserBill={nOrderId='账单id',sInfo=账单类型,sBillInfo='账单内容',nCoin=金币变化, nCurCoin=当前金币， }:"
          prop="ElseInfo"
        >
          <el-input
            v-model="formData.ElseInfo"
            :clearable="true"
            placeholder="请输入该玩家本局的游戏特色数据(json格式存放:
注: 百人游戏记录真人：

百人金花： nArea: 0-2代表：红，幸运，黑
百家乐：'和'=1,'闲'=2,'闲对'=3,'闲天王'=4,'庄'=5,'庄对'=6,'庄天王'=7;
{
tBet = {
[nArea=投注区域1， nBet=投注区域1筹码, nProfit=區域1盈利}，
[nArea=投注区域2， nBet=投注区域2筹码, nProfit=區域2盈利}，
tUserInfo = ｛
 {nUserId = , nSitId=, sName=昵称, nGold = 身上金币，sUrl = 头像, bZhuan = } ,{}...｝
 }

飞行棋游戏： json格式：
sUserBill={nOrderId='账单id',sInfo=账单类型,sBillInfo='账单内容',nCoin=金币变化, nCurCoin=当前金币， }"
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
      title="查看"
    >
      <el-descriptions :column="1" border>
        <!-- 原: 记录ID -->
        <el-descriptions-item :label="$t('PaiJuWinLoseRecord.RecordID')">
          {{ detailForm.id }}
        </el-descriptions-item>
        <!-- 原: 用户ID -->
        <el-descriptions-item :label="$t('PaiJuWinLoseRecord.UserID')">
          {{ detailForm.UserID }}
        </el-descriptions-item>
        <!-- 原: 游戏类型 -->
        <el-descriptions-item :label="$t('PaiJuWinLoseRecord.GameType')">
          {{ detailForm.GameType }}
        </el-descriptions-item>
        <!-- 原: 场次 -->
        <el-descriptions-item :label="$t('PaiJuWinLoseRecord.Session')">
          {{ formateSession(detailForm.Session) }}
        </el-descriptions-item>
        <!-- 原: 输赢情况 -->
        <el-descriptions-item :label="$t('PaiJuWinLoseRecord.WinLose')">
          {{ Math.round(detailForm.WinLose * 100) / 100 }}
        </el-descriptions-item>
        <!-- 原: 抽水 -->
        <el-descriptions-item :label="$t('PaiJuWinLoseRecord.DrawWater')">
          {{ detailForm.DrawWater }}
        </el-descriptions-item>
        <!-- 原: 下注金额 -->
        <el-descriptions-item :label="$t('PaiJuWinLoseRecord.BetAmount')">
          {{ detailForm.XiaZhu }}
        </el-descriptions-item>
        <!-- 原: 有效投注额 -->
        <el-descriptions-item :label="$t('PaiJuWinLoseRecord.ValidBet')">
          {{ detailForm.Valid }}
        </el-descriptions-item>
        <!-- 原: 牌局ID -->
        <el-descriptions-item :label="$t('PaiJuWinLoseRecord.PaiJuID')">
          <span style="cursor: pointer" @click="goToPaiJuRecord(detailForm.PaiJuId)">
            <u>{{ detailForm.PaiJuId }}</u>
          </span>
          <!-- <el-icon @click="goToPaiJuRecord(detailForm.PaiJuId)" style="cursor: pointer; margin-left: 5px"
            ><Pointer
          /></el-icon> -->
        </el-descriptions-item>

        <!-- 原: 时间 -->
        <el-descriptions-item :label="$t('PaiJuWinLoseRecord.Time')">
          {{ formatDate(detailForm.CreatetTime) }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>
<script setup>
  import {
    createPaiJuWinLoseRecord,
    deletePaiJuWinLoseRecord,
    deletePaiJuWinLoseRecordByIds,
    updatePaiJuWinLoseRecord,
    findPaiJuWinLoseRecord,
    getPaiJuWinLoseRecordList
  } from '@/api/dezhou/paiJuWinLoseRecord'

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
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'
  import { Pointer } from '@element-plus/icons-vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ref, reactive } from 'vue'
  import { useAppStore } from '@/pinia'
  defineOptions({
    name: 'PaiJuWinLoseRecord'
  })
  // 提交按钮loading
  const btnLoading = ref(false)
  const appStore = useAppStore()
  // 控制更多查询条件显示/隐藏状态
  const showAllQuery = ref(false)
  // 自动化生成的字典（可能为空）以及字段
  const formData = ref({
    id: undefined,
    UserID: undefined,
    GameType: undefined,
    Session: undefined,
    WinLose: 0,
    DrawWater: 0,
    XiaZhu: 0,
    Valid: 0,
    PaiJuId: '',
    CreatetTime: new Date(),
    nType: undefined,
    ElseInfo: ''
  })

  // 验证规则
  const rule = reactive({})
  const elFormRef = ref()
  const elSearchFormRef = ref()
  // =========== 表格控制部分 ===========
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({
    userId: undefined,
    paiJuId: undefined,
    gameId: undefined
  })
  const filename = ref('')
  const gameOptions = ref([
    { label: '德州', value: 125 },
    { label: '短牌', value: 175 }
  ])

  const formateSession = (val) => {
    let des = ''
    switch (val) {
      case 1:
        des = '免费'
        break
      case 2:
        des = '新手'
        break
      case 3:
        des = '初级'
        break
      case 4:
        des = '中级'
        break
      case 5:
        des = '高级'
        break
      default:
        des = '未知'
        break
    }
    return des
  }
  // 重置
  const onReset = () => {
    searchInfo.value = {}
    getTableData()
  }

  const formatModeType = (type) => {
    const typeMap = {
      0: '不抽水',
      1: '把抽',
      3: '局抽'
    }
    return typeMap[type] || type
  }

  // 搜索
  const onSubmit = () => {
    elSearchFormRef.value?.validate(async (valid) => {
      if (!valid) return
      page.value = 1
      getTableData()
    })
  }
  const exportFn = async () => {
    searchInfo.value.isExport = 1
    await getTableData()
    window.open(`${import.meta.env.VITE_BASE_URl}${filename.value}`)
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
  const loading = ref(false)

  const getTableData = async () => {
    loading.value = true
    try {
      const table = await getPaiJuWinLoseRecordList({
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
      return table
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
    ElMessageBox.confirm('确定要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      deletePaiJuWinLoseRecordFunc(row)
    })
  }
  // 行为控制标记（弹窗内部需要增还是改）
  const type = ref('')
  // 更新行
  const updatePaiJuWinLoseRecordFunc = async (row) => {
    const res = await findPaiJuWinLoseRecord({ id: row.id })
    type.value = 'update'
    if (res.code === 0) {
      formData.value = res.data
      dialogFormVisible.value = true
    }
  }

  // 删除行
  const deletePaiJuWinLoseRecordFunc = async (row) => {
    const res = await deletePaiJuWinLoseRecord({ id: row.id })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '删除成功'
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
      id: undefined,
      UserID: undefined,
      GameType: undefined,
      Session: undefined,
      WinLose: 0,
      DrawWater: 0,
      XiaZhu: 0,
      Valid: 0,
      PaiJuId: '',
      CreatetTime: new Date(),
      nType: undefined,
      ElseInfo: ''
    }
  }
  // 弹窗确定
  const enterDialog = async () => {
    btnLoading.value = true
    elFormRef.value?.validate(async (valid) => {
      if (!valid) return (btnLoading.value = false)
      let res
      switch (type.value) {
        case 'create':
          res = await createPaiJuWinLoseRecord(formData.value)
          break
        case 'update':
          res = await updatePaiJuWinLoseRecord(formData.value)
          break
        default:
          res = await createPaiJuWinLoseRecord(formData.value)
          break
      }
      btnLoading.value = false
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '创建/更改成功'
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
    const res = await findPaiJuWinLoseRecord({ id: row.id })
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
  import { useRouter } from 'vue-router'

  const router = useRouter()
  // 跳转到牌局记录
  const goToPaiJuRecord = (row) => {
    console.log(row)

    const { href } = router.resolve({
      path: '/layout/gameRecords/gameRecord',
      query: { PaiJuId: row } // 查询参数
    })
    window.open(href, '_blank')
  }
</script>

<style></style>
