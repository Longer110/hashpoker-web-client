<template>
  <div>
    <CardSkeleton v-if="loading" :card-count="displayTopValues.length || 3" />
    <gva-card v-else custom-class="col-span-1 lg:col-span-2 top">
      <!-- 原标题: 其它合计 -->
      <h2 class="dashboard-title">{{ $t('OtherTotals.DashboardTitle') }}</h2>
      <!-- 原标题列表: 其它池总额 / 今日池减少 / 今日金币减少 -->
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
            <!-- 原label: 时间 -->
            <el-form-item :label="$t('OtherTotals.Search.TimeLabel')" prop="timeRange">
              <el-date-picker
                style="width: 350px"
                clearable
                v-model="searchInfo.timeRange"
                type="datetimerange"
                :start-placeholder="$t('OtherTotals.Search.TimeStart')"
                :end-placeholder="$t('OtherTotals.Search.TimeEnd')"
              />
            </el-form-item>
            <!-- 原label: 操作人 -->
            <el-form-item :label="$t('OtherTotals.Search.OperatorLabel')" prop="userID">
              <el-input
                clearable
                v-model.trim="searchInfo.userID"
                :placeholder="$t('OtherTotals.Search.OperatorPlaceholder')"
                style="width: 160px"
              />
            </el-form-item>

            <!-- 原label: 变化类型 -->
            <el-form-item :label="$t('OtherTotals.Search.ChangeTypeLabel')">
              <el-select
                v-model="searchInfo.sourceType"
                clearable
                :placeholder="$t('OtherTotals.Search.ChangeTypePlaceholder')"
                style="width: 120px"
              >
                <el-option v-for="item in otherTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <!-- 原label: 货币类型 -->
            <el-form-item :label="$t('OtherTotals.Search.CurrencyTypeLabel')">
              <el-select
                v-model="searchInfo.type"
                clearable
                :placeholder="$t('OtherTotals.Search.CurrencyTypePlaceholder')"
                style="width: 120px"
              >
                <el-option v-for="item in typeOptions" :key="`currency-${item.value}`" :label="item.label" :value="item.value" />
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
            <!-- 原文: 池增加 -->
            {{ $t('OtherTotals.Summary.Income') }} <span class="red">{{ hzData.income }}</span>
            {{ $t('OtherTotals.Summary.Unit') }}
          </p>
          <p>
            <!-- 原文: 池减少 -->
            {{ $t('OtherTotals.Summary.Outcome') }} <span class="red">{{ hzData.outcome }}</span>
            {{ $t('OtherTotals.Summary.Unit') }}
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
          <el-table-column type="index" width="70" align="center" :label="$t('OtherTotals.Table.Index')" />
          <!-- 原label: ID -->
          <el-table-column align="center" :label="$t('OtherTotals.Table.Id')" prop="OrderId" min-width="180" />
          <!-- 原label: 操作时间 -->
          <el-table-column align="center" :label="$t('OtherTotals.Table.OperationTime')" prop="Time" min-width="120" >
 <template #default="scope">{{ formatDate(scope.row.Time) }}</template>
</el-table-column>
          <!-- 原label: 变换额度 -->
          <el-table-column align="center" :label="$t('OtherTotals.Table.ChangeAmount')" prop="Count" min-width="120" />
          <!-- 原label: 用户ID -->
          <el-table-column align="center" :label="$t('OtherTotals.Table.UserId')" prop="UserID" min-width="120" />
          <!-- 原label: 类型 -->
          <el-table-column align="center" :label="$t('OtherTotals.Table.Type')" prop="Amount" min-width="120">
            <template #default="scope">
              <!-- 原值: 表情 / 语音 / 修改昵称 / 保险延迟 / 咪牌（没有） / 切牌 / 看公牌 / 看手牌 / 区块链验证 -->
              <span>{{ getSourceTypeLabel(scope.row.SourceType) }}</span>
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
  </div>
</template>

<script setup>
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
  import { getOtherChangeList, getOtherChangeType } from '@/api/dezhou/propertyRecords'
  import { getOneWeekTimeRange } from '@/utils/date'
  import { ref, onMounted, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import CardSkeleton from '@/view/dezhou/transferManagement/components/CardSkeleton.vue'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'
  import { GvaCard } from '@/view/dashboard/components'
  
  defineOptions({
    name: 'otherTotals'
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
    type: null,
    sourceType: null
  })

  const topValues = ref([
    { key: 'PoolTotal', value: '0', originalTitle: '其它池总额' },
    { key: 'TodayDecrease', value: '0', originalTitle: '今日池减少' },
    { key: 'TodayCoinDecrease', value: '0', originalTitle: '今日金币减少' }
  ])

  const cardTitleMap = computed(() => ({
    PoolTotal: t('OtherTotals.Cards.PoolTotal'),
    TodayDecrease: t('OtherTotals.Cards.TodayDecrease'),
    TodayCoinDecrease: t('OtherTotals.Cards.TodayCoinDecrease'),
    '其它池总额': t('OtherTotals.Cards.PoolTotal'),
    '今日池减少': t('OtherTotals.Cards.TodayDecrease'),
    '今日金币减少': t('OtherTotals.Cards.TodayCoinDecrease')
  }))

  const displayTopValues = computed(() =>
    topValues.value.map((item) => ({
      ...item,
      title: cardTitleMap.value[item.key ?? item.title] ?? item.title
    }))
  )

  const typeOptions = computed(() => [
    { label: t('OtherTotals.TypeOptions.Payout'), value: 1 },
    { label: t('OtherTotals.TypeOptions.Buy'), value: 2 },
    { label: t('OtherTotals.TypeOptions.All'), value: 3 },
    { label: t('OtherTotals.TypeOptions.Other'), value: 4 }
  ])

  const sourceTypeMap = computed(() => ({
    '22507': t('OtherTotals.SourceType.Emote'),
    '100': t('OtherTotals.SourceType.Voice'),
    '33007': t('OtherTotals.SourceType.Rename'),
    '22508': t('OtherTotals.SourceType.InsuranceDelay'),
    '': t('OtherTotals.SourceType.NoPeek'),
    '22522': t('OtherTotals.SourceType.CutCard'),
    '33009': t('OtherTotals.SourceType.ViewBoard'),
    '33010': t('OtherTotals.SourceType.ViewHand'),
    '100009': t('OtherTotals.SourceType.Blockchain'),
    default: t('OtherTotals.SourceType.Unknown')
  }))

  const getSourceTypeLabel = (sourceType) => sourceTypeMap.value[String(sourceType)] ?? sourceTypeMap.value.default

  const hzData = ref({
    income: 0,
    outcome: 0
  })
  onMounted(() => {
    searchInfo.value.timeRange = getOneWeekTimeRange()
    getOtherChangeTypeList()
    getTableData()
  })

  const otherTypeList = ref([])
  const getOtherChangeTypeList = async () => {
    const res = await getOtherChangeType()
    if (res.code === 0) {
      const resData = (res.data.List || []).map((v) => {
        return {
          label: v.name,
          value: v.typeId
        }
      })
      otherTypeList.value = resData
    }
  }

  const onReset = () => {
    searchInfo.value = {
      userID: undefined,
      orderID: undefined,
      timeRange: getOneWeekTimeRange(),
      type: null,
      sourceType: null
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

  const handleSelectionChange = (val) => {
    console.log(val)
  }
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
        // sourceType: 22507
      }

      // 将timeRange转换为startTime和endTime
      if (searchInfo.value.timeRange && searchInfo.value.timeRange.length === 2) {
        // params.startTime = toLocalISOString(searchInfo.value.timeRange[0])
        // params.endTime = toLocalISOString(searchInfo.value.timeRange[1])
        params.startTime = toBeijingUTCString(searchInfo.value.timeRange[0])
        params.endTime = toBeijingUTCString(searchInfo.value.timeRange[1])
        delete params.timeRange
      }

      const table = await getOtherChangeList(params)
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
