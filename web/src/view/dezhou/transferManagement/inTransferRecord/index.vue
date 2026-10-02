<template>
  <div>
    <CardSkeleton v-if="loading" :card-count="displayTopValues.length || 3" />
    <gva-card v-else custom-class="col-span-1 lg:col-span-2 top">
      <!-- 原标题: 内转记录 -->
      <h2 class="dashboard-title">{{ $t('InTransferRecord.DashboardTitle') }}</h2>
      <!-- 原标题列表: 内转池剩余 / 收款（用户提现） / 转出（用户充值） -->
      <div class="card-grid">
        <div class="stat-card" v-for="item in displayTopValues" :key="item.key || item.title">
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-value">{{ item.value }}</p>
        </div>
      </div>
      <div class="daLine" />
    </gva-card>
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :search-field-count="3"
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
            <!-- 原label: 操作时间 -->
            <el-form-item :label="$t('InTransferRecord.Search.TimeLabel')" prop="timeRange">
              <el-date-picker
                style="width: 350px"
                clearable
                v-model="searchInfo.timeRange"
                type="datetimerange"
                :start-placeholder="$t('InTransferRecord.Search.TimeStart')"
                :end-placeholder="$t('InTransferRecord.Search.TimeEnd')"
              />
            </el-form-item>
            <!-- 原label: 操作人 -->
            <el-form-item :label="$t('InTransferRecord.Search.OperatorLabel')" prop="userID">
              <el-input
                clearable
                v-model.trim="searchInfo.userID"
                :placeholder="$t('InTransferRecord.Search.OperatorPlaceholder')"
                style="width: 160px"
              />
            </el-form-item>
            <!-- 原label: 游戏账号 -->
            <el-form-item :label="$t('InTransferRecord.Search.AccountLabel')" prop="orderID">
              <el-input
                clearable
                v-model.trim="searchInfo.orderID"
                :placeholder="$t('InTransferRecord.Search.AccountPlaceholder')"
                style="width: 160px"
              />
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
            <!-- 原文: 减少金额 -->
            {{ $t('InTransferRecord.Summary.Decrease') }} <span class="red">{{ hzData.income }}</span>
            {{ $t('InTransferRecord.Summary.Unit') }}
          </p>
          <p>
            <!-- 原文: 增加金额 -->
            {{ $t('InTransferRecord.Summary.Increase') }} <span class="red">{{ hzData.outcome }}</span>
            {{ $t('InTransferRecord.Summary.Unit') }}
          </p>
          <p>
            <!-- 原文: 笔数 -->
            {{ $t('InTransferRecord.Summary.Count') }} <span class="red">{{ hzData.number }}</span>
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
          <el-table-column type="index" width="70" align="center" :label="$t('InTransferRecord.Table.Index')" />
          <!-- 原label: ID -->
          <el-table-column align="center" :label="$t('InTransferRecord.Table.Id')" prop="OrderId" min-width="180" />
          <!-- 原label: 操作时间 -->
          <el-table-column align="center" :label="$t('InTransferRecord.Table.OperationTime')" prop="Userid" min-width="120" />
          <!-- 原label: 操作人昵称 -->
          <el-table-column align="center" :label="$t('InTransferRecord.Table.OperatorNickname')" prop="Amount" min-width="120">
            <template #default="scope">
              <span style="color: #67c23a; font-weight: bold">{{ scope.row.Amount }}</span>
            </template>
          </el-table-column>

          <!-- 原label: 操作人ID -->
          <el-table-column align="center" :label="$t('InTransferRecord.Table.OperatorId')" prop="Free" min-width="100" />
          <!-- 原label: 游戏账号 -->
          <el-table-column align="center" :label="$t('InTransferRecord.Table.GameAccount')" prop="Currency" min-width="100" />
          <!-- 原label: 货币数额 -->
          <el-table-column align="center" :label="$t('InTransferRecord.Table.Amount')" prop="Channel" min-width="120" />
          <!-- 原label: 操作原因 -->
          <el-table-column align="center" :label="$t('InTransferRecord.Table.Reason')" prop="Result" min-width="100">
            <template #default="scope">
              <el-tag :type="scope.row.Result === 0 ? 'success' : 'danger'">
                {{ scope.row.Result === 0 ? $t('InTransferRecord.Status.Success') : $t('InTransferRecord.Status.Fail') }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- 原label: 操作前-内转池 -->
          <el-table-column align="center" :label="$t('InTransferRecord.Table.BeforePool')" prop="Createtime" min-width="180">
            <template #default="scope">{{ formatDate(scope.row.Createtime) }}</template>
          </el-table-column>
          <!-- 原label: 操作后-内转池 -->
          <el-table-column align="center" :label="$t('InTransferRecord.Table.AfterPool')" prop="Updatetime" min-width="180">
            <template #default="scope">{{ formatDate(scope.row.Updatetime) }}</template>
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
  </div>
</template>

<script setup>
  import { getPayListApi } from '@/api/dezhou/transferManagement'
  import { formatDate } from '@/utils/format'
  import { getOneWeekTimeRange } from '@/utils/date'
  import CardSkeleton from '@/view/dezhou/transferManagement/components/CardSkeleton.vue'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'
  import { GvaCard } from '@/view/dashboard/components'

  import { ref, onMounted, computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  defineOptions({
    name: 'inTransferRecord'
  })

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

  const topValues = ref([
    { key: 'PoolRemain', title: '内转池剩余', value: '0' },
    { key: 'Income', title: '收款（用户提现）', value: '0' },
    { key: 'Outcome', title: '转出（用户充值）', value: '0' }
  ])

  const cardTitleMap = computed(() => ({
    PoolRemain: t('InTransferRecord.Cards.PoolRemain'),
    Income: t('InTransferRecord.Cards.Income'),
    Outcome: t('InTransferRecord.Cards.Outcome'),
    '内转池剩余': t('InTransferRecord.Cards.PoolRemain'),
    '收款（用户提现）': t('InTransferRecord.Cards.Income'),
    '转出（用户充值）': t('InTransferRecord.Cards.Outcome')
  }))

  const displayTopValues = computed(() =>
    topValues.value.map((item) => ({
      ...item,
      title: cardTitleMap.value[item.key ?? item.title] ?? item.title
    }))
  )

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
        ...searchInfo.value
      }

      // 将timeRange转换为startTime和endTime
      if (searchInfo.value.timeRange && searchInfo.value.timeRange.length === 2) {
        // params.startTime = toLocalISOString(searchInfo.value.timeRange[0])
        // params.endTime = toLocalISOString(searchInfo.value.timeRange[1])
        params.startTime = toBeijingUTCString(searchInfo.value.timeRange[0])
        params.endTime = toBeijingUTCString(searchInfo.value.timeRange[1])
        delete params.timeRange
      }

      const table = await getPayListApi(params)
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
    margin-left: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    .stat-card {
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
