<template>
  <div>
    <CardSkeleton v-if="loading" :card-count="displayTopValues.length || 3" />
    <gva-card v-else custom-class="col-span-1 lg:col-span-2 top">
      <!-- 原标题: 抽水记录 -->
      <h2 class="dashboard-title">{{ $t('PumpingRecord.DashboardTitle') }}</h2>
      <div class="card-grid">
        <div class="stat-card" v-for="item in displayTopValues" :key="item.key || item.title">
          <!-- 原标题: 抽水池当前总额 -->
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-value">{{ item.value }}</p>
        </div>
      </div>
      <div class="daLine" />
    </gva-card>
    <TableSkeleton
      :loading="loading"
      :show-search="true"
      :search-field-count="2"
      :search-button-count="2"
      :row-count="pageSize"
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
            <!-- 原label: 时间 -->
            <el-form-item :label="$t('PumpingRecord.Search.TimeLabel')" prop="timeRange">
              <el-date-picker
                style="width: 350px"
                clearable
                v-model="searchInfo.timeRange"
                type="datetimerange"
                :start-placeholder="$t('PumpingRecord.Search.TimeStart')"
                :end-placeholder="$t('PumpingRecord.Search.TimeEnd')"
              />
            </el-form-item>
            <!-- 原label: 操作人 -->
            <!-- <el-form-item :label="$t('PumpingRecord.Search.OperatorLabel')" prop="userID">
              <el-input
                clearable
                v-model.trim="searchInfo.userID"
                :placeholder="$t('PumpingRecord.Search.OperatorPlaceholder')"
                style="width: 160px"
              />
            </el-form-item> -->

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
          <!-- 原文: 抽水收入 -->
          <!-- <p>
            {{ $t('PumpingRecord.Summary.Income') }} <span class="red">{{ hzData.income }}</span>
            {{ $t('PumpingRecord.Summary.Unit') }}
          </p> -->
          <!-- 原文: 保险池转出 -->
          <!-- <p>
            {{ $t('PumpingRecord.Summary.Outcome') }} <span class="red">{{ hzData.outcome }}</span>
            {{ $t('PumpingRecord.Summary.Unit') }}
          </p> -->
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
          <el-table-column type="index" width="70" align="center" :label="$t('PumpingRecord.Table.Index')" />
          <!-- 原label: 日期 /  修正为用户ID-12.10 -->
          <el-table-column align="center" :label="$t('PumpingRecord.Table.Date')" prop="Date" min-width="120" >
            <template #default="scope">{{ formatDate(scope.row.Date) }}</template>
          </el-table-column>
          <!-- <el-table-column align="center" :label="$t('PumpingRecord.Table.UserId')" prop="Userid" min-width="120" /> -->
          <!-- 原label: 抽水总收入 -->
          <el-table-column align="center" :label="$t('PumpingRecord.Table.TotalIncome')" prop="Amount" min-width="120">
            <template #default="scope">
              <span >{{ scope.row.DayTotal }}</span>
            </template>
          </el-table-column>

          <!-- 原label: 抽水池剩余总额 -->
          <el-table-column align="center" :label="$t('PumpingRecord.Table.RemainingPool')" prop="Total" min-width="100" />
          <!-- 原label: 操作人 -->
          <!-- <el-table-column align="center" :label="$t('PumpingRecord.Table.Operator')" prop="Currency" min-width="100" /> -->
          <!-- 原label: 操作额度 -->
          <!-- <el-table-column align="center" :label="$t('PumpingRecord.Table.Amount')" prop="Channel" min-width="120" /> -->
          <!-- 原label: 操作时间 -->
          <!-- <el-table-column align="center" :label="$t('PumpingRecord.Table.OperationTime')" prop="Result" min-width="100">
            <template #default="scope">
              <el-tag :type="scope.row.Result === 0 ? 'success' : 'danger'">
                {{ scope.row.Result === 0 ? $t('PumpingRecord.Status.Success') : $t('PumpingRecord.Status.Fail') }}
              </el-tag>
            </template>
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
    </TableSkeleton>
  </div>
</template>

<script setup>
  import { getPumpList } from '@/api/dezhou/transferManagement'
  import { getOneWeekTimeRange } from '@/utils/date'
  import { formatDate } from '@/utils/format'
  import CardSkeleton from '@/view/dezhou/transferManagement/components/CardSkeleton.vue'
  import TableSkeleton from '@/components/tableSkeleton/index.vue'
  import { GvaCard } from '@/view/dashboard/components'

  import { ref, onMounted, computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  defineOptions({
    name: 'pumpingRecord'
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

  const topValues = ref([{ key: 'CurrentPool', value: '0' }]) // 顶部看板

  const displayTopValues = computed(() =>
    topValues.value.map((item) => ({
      ...item,
      title: item.key ? t(`PumpingRecord.Cards.${item.key}`) : item.title
    }))
  )

  const hzData = ref({
    income: 0,
    outcome: 0
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
    try {
      const table = await getPumpList(params)
      if (table.code === 0) {
        tableData.value = table.data.List
        total.value = table.data.Total
        page.value = table.data.Page
        pageSize.value = table.data.PageSize
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
