<template>
  <div>
    <CardSkeleton v-if="loading" :card-count="4" />
    <gva-card v-else custom-class="col-span-1 lg:col-span-2 top">
      <!-- 原标题: 保险记录 -->
      <h2 class="dashboard-title">{{ $t('InsuranceRecord.DashboardTitle') }}</h2>
      <div class="card-grid">
        <div class="stat-card">
          <!-- 原标题: 今日保险收入 -->
          <h3 class="card-title">{{ $t('InsuranceRecord.Cards.TodayIncome') }}</h3>
          <p class="card-value">{{ topValues.InsureBuy || '-' }}</p>
        </div>

        <div class="stat-card">
          <!-- 原标题: 今日保险赔付 -->
          <h3 class="card-title">{{ $t('InsuranceRecord.Cards.TodayPayout') }}</h3>
          <p class="card-value">{{ topValues.InsureWin || '-' }}</p>
        </div>
        <div class="stat-card">
          <!-- 原标题: 保险收入余额 -->
          <h3 class="card-title">{{ $t('InsuranceRecord.Cards.IncomeRemain') }}</h3>
          <p class="card-value">{{ topValues.InsureBuyRemain || '-' }}</p>
        </div>
        <div class="stat-card">
          <!-- 原标题: 保险赔付余额 -->
          <h3 class="card-title">{{ $t('InsuranceRecord.Cards.PayoutRemain') }}</h3>
          <p class="card-value">{{ topValues.InsureWinRemain || '-' }}</p>
          <el-button class="remain-edit" type="primary" @click="openDialog()">{{ $t('GlobalUniversality.Edit') }}</el-button>
        </div>
      </div>
      <div class="daLine" />
    </gva-card>

    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :search-field-count="4"
      :search-button-count="2"
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
            <!-- 原label: 时间范围 -->
            <el-form-item :label="$t('InsuranceRecord.Search.TimeRangeLabel')" prop="timeRange">
              <el-date-picker
                style="width: 350px"
                clearable
                v-model="searchInfo.timeRange"
                type="datetimerange"
                :start-placeholder="$t('InsuranceRecord.Search.TimeRangeStart')"
                :end-placeholder="$t('InsuranceRecord.Search.TimeRangeEnd')"
              />
            </el-form-item>
            <!-- 原label: 房间/牌局ID -->
            <el-form-item :label="$t('InsuranceRecord.Search.RoomIdLabel')" prop="userID">
              <el-input
                clearable
                v-model.trim="searchInfo.userID"
                :placeholder="$t('InsuranceRecord.Search.RoomIdPlaceholder')"
                style="width: 160px"
              />
            </el-form-item>
            <!-- 原label: 游戏账号 -->
            <el-form-item :label="$t('InsuranceRecord.Search.AccountLabel')" prop="orderID">
              <el-input
                clearable
                v-model.trim="searchInfo.orderID"
                :placeholder="$t('InsuranceRecord.Search.AccountPlaceholder')"
                style="width: 160px"
              />
            </el-form-item>
            <!-- 原label: 类型 -->
            <el-form-item :label="$t('InsuranceRecord.Search.TypeLabel')">
              <el-select
                v-model="searchInfo.type"
                :placeholder="$t('InsuranceRecord.Search.TypePlaceholder')"
                style="width: 120px"
              >
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <!-- 原按钮: 查询 -->
              <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
              <!-- 原按钮: 重置 -->
              <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <div class="gva-table-box">
        <div class="hz">
          <p>
            <!-- 原文: 保险收入 -->
            {{ $t('InsuranceRecord.Summary.Income') }} <span class="red">{{ hzData.income }}</span>
            {{ $t('InsuranceRecord.Summary.Unit') }}
          </p>
          <p>
            <!-- 原文: 保险赔付 -->
            {{ $t('InsuranceRecord.Summary.Outcome') }} <span class="red">{{ hzData.outcome }}</span>
            {{ $t('InsuranceRecord.Summary.Unit') }}
          </p>
          <p>
            <!-- 原文: 笔数 -->
            {{ $t('InsuranceRecord.Summary.Count') }} <span class="red">{{ hzData.number }}</span>
          </p>
        </div>
        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          height="900"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="OrderId"
          @selection-change="handleSelectionChange"
        >
          <!-- 原label: 序号 -->
          <el-table-column type="index" width="70" align="center" :label="$t('InsuranceRecord.Table.Index')" />
          <!-- 原label: 牌局时间 -->
          <el-table-column align="center" :label="$t('InsuranceRecord.Table.Time')" prop="Time" min-width="180" >
            <template #default="scope">{{ formatDate(scope.row.Time) }}</template>
          </el-table-column>
          <!-- 原label: 牌局ID -->
          <el-table-column align="center" :label="$t('InsuranceRecord.Table.RoomId')" prop="RoomID" min-width="120" />
          <!-- 原label: 用户ID -->
          <el-table-column align="center" :label="$t('InsuranceRecord.Table.UserId')" prop="UserID" min-width="120" />

          <!-- 原label: 保险收入 -->
          <el-table-column align="center" :label="$t('InsuranceRecord.Table.Income')" prop="InsureBuy" min-width="100" />
          <!-- 原label: 保险赔付 -->
          <el-table-column align="center" :label="$t('InsuranceRecord.Table.Outcome')" prop="InsureWin" min-width="100" />
          <!-- <el-table-column align="center" label="操作前-保险池" prop="Createtime" min-width="180">
            <template #default="scope">{{ formatDate(scope.row.Createtime) }}</template>
          </el-table-column>
          <el-table-column align="center" label="操作后-保险池" prop="Updatetime" min-width="180">
            <template #default="scope">{{ formatDate(scope.row.Updatetime) }}</template>
          </el-table-column> -->
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
          <span class="text-lg">{{ $t('GlobalUniversality.Edit') }}</span>
          <div>
            <!-- 原按钮: 确 定 -->
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">
              {{ $t('Common.Confirm') }}
            </el-button>
            <!-- 原按钮: 取 消 -->
            <el-button @click="closeDialog">{{ $t('Common.Cancel') }}</el-button>
          </div>
        </div>
      </template>

      <el-form :model="formData" label-position="top" ref="elFormRef" label-width="80px">

        <!-- 原label: 赔付余额: -->
        <el-form-item :label="$t('InsuranceRecord.TypeOptions.Payout')">
          <el-input
            v-model.number="formData.value"
            :clearable="true"
            :placeholder="$t('InsuranceRecord.Placeholder')"
            type="number"
          />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
  import { getInSureList, getRealtimeInSure, editInSureValue } from '@/api/dezhou/propertyRecords'
  import { formatDate } from '@/utils/format'
  import { getOneWeekTimeRange } from '@/utils/date'
  import CardSkeleton from '@/view/dezhou/transferManagement/components/CardSkeleton.vue'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'
  import { useAppStore } from '@/pinia'
  import { ref, onMounted, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ElMessage } from 'element-plus'

  defineOptions({
    name: 'insuranceRecord'
  })

  const appStore = useAppStore()
  const formData = ref({
    value: ''
  })
  const elFormRef = ref()
  const dialogFormVisible = ref(false)
  const btnLoading = ref(false)
  const openDialog = () => {
    formData.value = {
      value: topValues.value.InsureWinRemain
    }
    dialogFormVisible.value = true
  }
  const closeDialog = () => {
    dialogFormVisible.value = false
  }

  const enterDialog = async () => {
    btnLoading.value = true
    elFormRef.value?.validate(async (valid) => {
      if (!valid) return (btnLoading.value = false)
      try {
        const res = await editInSureValue(formData.value)
        if (res.code === 0) {
          ElMessage({
            type: 'success',
            message: t('InsuranceRecord.Success')
          })
          closeDialog()
          getTableData()
        }
     } finally {
        btnLoading.value = false
      }
    })
  }

  const { t } = useI18n()

  const elSearchFormRef = ref()
  const loading = ref(false)

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({
    userID: undefined,
    orderID: undefined,
    timeRange: [],
    type: null
  })

  const topValues = ref([]) //顶部看板
  const typeOptions = computed(() => [
    { label: t('InsuranceRecord.TypeOptions.Payout'), value: 1 },
    { label: t('InsuranceRecord.TypeOptions.Buy'), value: 2 },
    { label: t('InsuranceRecord.TypeOptions.All'), value: 3 },
    { label: t('InsuranceRecord.TypeOptions.Other'), value: 4 }
  ])

  const hzData = ref({
    income: 0,
    outcome: 0,
    number: 0
  })
  onMounted(() => {
    searchInfo.value.timeRange = getOneWeekTimeRange()
    getTableData()
  })

  const onReset = () => {
    searchInfo.value = {
      userID: undefined,
      orderID: undefined,
      timeRange: getOneWeekTimeRange(),
      type: null
    }
    getTableData()
  }

  const onSubmit = () => {
    elSearchFormRef.value?.validate(async (valid) => {
      if (!valid) return
      page.value = 1
      getTableData()
    })
  }

  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  const handleSelectionChange = (val) => {}
function toLocalISOString(dateStr) {
    // 处理参数：无参数则用当前时间，有参数则解析为Date对象
    const date = dateStr ? new Date(dateStr) : new Date();

    // 校验日期是否有效
    if (isNaN(date.getTime())) {
        throw new Error('传入的参数不是有效的日期格式，请传入类似 "2025-12-10T16:00:00.000Z" 的ISO字符串');
    }

    // 补零工具函数
    const pad = n => String(n).padStart(2, "0");

    // 提取本地时间的年/月/日/时/分/秒
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());

    // 计算本地时区偏移（转换为±HH:MM格式）
    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const offsetHour = pad(Math.floor(Math.abs(offset) / 60));
    const offsetMin = pad(Math.abs(offset) % 60);

    // 拼接成本地时区的ISO格式字符串
    return `${year}-${month}-${day}T${hour}:${minute}:${second}${sign}${offsetHour}:${offsetMin}`;
}
  // Interpret the picked time as Beijing local time and output the equivalent UTC string (Z-suffix).
  const toBeijingUTCString = (value) => {
    const date = value ? new Date(value) : new Date()
    if (Number.isNaN(date.getTime())) {
      throw new Error('传入的参数不是有效的日期格式，请传入类似 "2025-12-10T16:00:00.000Z" 的ISO字符串')
    }

    const pad = (n) => String(n).padStart(2, '0')
    const padMs = (n) => String(n).padStart(3, '0')

    const beijingUtcMillis =
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      ) -
      8 * 60 * 60 * 1000

    const utcDate = new Date(beijingUtcMillis)

    const year = utcDate.getUTCFullYear()
    const month = pad(utcDate.getUTCMonth() + 1)
    const day = pad(utcDate.getUTCDate())
    const hour = pad(utcDate.getUTCHours())
    const minute = pad(utcDate.getUTCMinutes())
    const second = pad(utcDate.getUTCSeconds())
    const millisecond = padMs(utcDate.getUTCMilliseconds())

    return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`
  }
  const getTableData = async () => {
    loading.value = true
    try {
      const params = {
        page: page.value,
        pageSize: pageSize.value,
        ...searchInfo.value,
        isExport: 0, // 0: 不导出 1: 导出  默认不导出，页面有导出按钮点击后才修改为导出
        userID: undefined,
        roomID: undefined,
        sourceType: 22507
      }

      // 将timeRange转换为startTime和endTime
      if (searchInfo.value.timeRange && searchInfo.value.timeRange.length === 2) {
        // params.startTime = toLocalISOString(searchInfo.value.timeRange[0])
        // params.endTime = toLocalISOString(searchInfo.value.timeRange[1])
        params.startTime = toBeijingUTCString(searchInfo.value.timeRange[0])
        params.endTime = toBeijingUTCString(searchInfo.value.timeRange[1])
        delete params.timeRange
      }

      const table = await getInSureList(params)
      if (table.code === 0) {
        tableData.value = table.data.List
        total.value = table.data.Total
        page.value = table.data.Page
        pageSize.value = table.data.PageSize
      }

      const InsuranceSignboard = await getRealtimeInSure()
      console.log(InsuranceSignboard, 'insurance dashboard')
      topValues.value = InsuranceSignboard.data.Data || []
    } finally {
      loading.value = false
    }
  }
</script>

<style lang="scss" scoped>
  .gva-search-box {
    margin-bottom: 20px;
  }

  .daLine {
    border-bottom: 1px dashed #ccc;
    width: 100%;
    margin: 30px 0;
  }
  .dashboard-title {
    margin-left: 10px;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-left: 10px;
    .stat-card {
      position: relative;
      background-color: #f0f0f0;
      padding: 15px;
      border-radius: 4px;

      .card-title {
        font-size: 16px;
        margin-bottom: 10px;
        font-weight: bold;
      }

      .card-value {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 15px;
      }

      .remain-edit {
        position: absolute;
        bottom: 15px;
        right: 15px;
      }
    }
  }
  .hz {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    font-weight: bold;
    p {
      margin-left: 30px;
      font-size: 16px;
    }
    .red {
      color: red;
    }
  }
</style>
