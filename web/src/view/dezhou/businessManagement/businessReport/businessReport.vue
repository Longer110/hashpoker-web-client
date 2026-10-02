<template>
  <div class="dashboard-container">
    <DashboardSkeleton v-if="dashboardLoading" :show-bottom-section="false" />
    <template v-else>
      <!-- 柱状图图区域 -->
      <!-- <div style="display: flex">
          <bar-chart :data="barData1" />
          <bar-chart :data="barData2" />
        </div> -->
      <!-- 饼状图区域 -->

      <!-- <div style="display: flex">
          <pie-chart :data="pieData1" />
          <pie-chart :data="pieData2" />
        </div> -->

      <gva-card custom-class="col-span-1 lg:col-span-2 ">
      <!-- 原标题：业务看板 -->
      <h2 class="dashboard-title">{{ $t('BusinessReport.Title') }}</h2>
      <!-- 原提示：默认均值为当前一天 -->
      <p class="default-tip">{{ $t('BusinessReport.DefaultTip') }}</p>

      <div class="search-bar">
        <el-form :inline="true" class="demo-form-inline">
          <!-- 原标签：时间选择 -->
          <el-form-item :label="$t('GlobalUniversality.TimeSelection')">
            <el-date-picker
              style="width: 350px"
              v-model="selectedDate"
              type="date"
              :placeholder="$t('BusinessReport.Form.DatePlaceholder')"
              :clearable="false"
              @change="handleDateChange"
            />
          </el-form-item>

          <template v-if="showAllQuery">
            <!-- 将需要控制显示状态的查询条件添加到此范围内 -->
          </template>
          <el-form-item>
            <!-- 原按钮：查询 -->
            <el-button type="primary" icon="search" @click="onClickGetAllDataFn">{{ $t('GlobalUniversality.Query') }}</el-button>
            <!-- 原按钮：重置 -->
            <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
            <!-- <el-button link type="primary" icon="arrow-down" @click="showAllQuery = true" v-if="!showAllQuery"
            >
            展开
            </el-button
          >
          <el-button link type="primary" icon="arrow-up" @click="showAllQuery = false" v-else>收起</el-button> -->
          </el-form-item>
        </el-form>
      </div>

      <div class="card-grid">
        <el-tooltip :content="$t('BusinessReport.Tooltips.TotalPay')" placement="top">
          <div class="stat-card">
            <!-- 原卡片标题：入款（充值）总额 -->
            <h3 class="card-title">{{ $t('BusinessReport.Cards.TotalPay.Title') }}</h3>
            <p class="card-value">{{ PlatformKanbanData.TotalPay }}</p>
            <p class="card-average">{{ $t('BusinessReport.Cards.TotalPay.AveragePrefix') }}{{ PlatformKanbanData.AvgPay }}</p>
          </div>
        </el-tooltip>
        <el-tooltip :content="$t('BusinessReport.Tooltips.TotalPayCount')" placement="top">
          <div class="stat-card">
            <!-- 原卡片标题：入款笔数 -->
            <h3 class="card-title">{{ $t('BusinessReport.Cards.TotalPayCount.Title') }}</h3>
            <p class="card-value">{{ PlatformKanbanData.TotalPayCount }}</p>
            <p class="card-average">{{ $t('BusinessReport.Cards.TotalPayCount.AveragePrefix') }}{{ PlatformKanbanData.AvgPayCount }}</p>
          </div>
        </el-tooltip>
        <el-tooltip :content="$t('BusinessReport.Tooltips.GasFee')" placement="top">
          <div class="stat-card">
            <!-- 原卡片标题：Gas费用 -->
            <h3 class="card-title">{{ $t('BusinessReport.Cards.GasFee.Title') }}</h3>
            <p class="card-value">{{ PlatformKanbanData.TotalGas }}</p>
            <p class="card-average">{{ $t('BusinessReport.Cards.GasFee.AveragePrefix') }}{{ PlatformKanbanData.AvgGas }}</p>
          </div>
        </el-tooltip>
        <el-tooltip :content="$t('BusinessReport.Tooltips.WaterRemain')" placement="top">
          <div class="stat-card">
            <!-- 原卡片标题：抽水池余额 -->
            <h3 class="card-title">{{ $t('BusinessReport.Cards.WaterRemain.Title') }}(敬请期待)</h3>
            <p class="card-value">{{ PlatformKanbanData.WaterRemain }}</p>
            <p class="card-average">{{ $t('BusinessReport.Cards.WaterRemain.PreviousPrefix') }}{{ PlatformKanbanData.PreWaterRemain }}</p>
          </div>
        </el-tooltip>

        <el-tooltip :content="$t('BusinessReport.Tooltips.FreezeFee')" placement="top">
          <div class="stat-card">
            <!-- 原卡片标题：冻结资金 -->
            <h3 class="card-title">{{ $t('BusinessReport.Cards.FreezeFee.Title') }}(敬请期待)</h3>
            <p class="card-value">{{ PlatformKanbanData.FreezeFee }}</p>
            <p class="card-average">{{ $t('BusinessReport.Cards.FreezeFee.TotalPrefix') }}{{ PlatformKanbanData.FreezeFee }}</p>
          </div>
        </el-tooltip>

        <el-tooltip :content="$t('BusinessReport.Tooltips.TotalWithdraw')" placement="top">
          <div class="stat-card">
            <!-- 原卡片标题：总提现 -->
            <h3 class="card-title">{{ $t('BusinessReport.Cards.TotalWithdraw.Title') }}</h3>
            <p class="card-value">{{ PlatformKanbanData.TotalWithdraw }}</p>
            <p class="card-average">{{ $t('BusinessReport.Cards.TotalWithdraw.AveragePrefix') }}{{ PlatformKanbanData.AvgWithdraw }}</p>
          </div>
        </el-tooltip>
        <el-tooltip :content="$t('BusinessReport.Tooltips.TotalWithdrawCount')" placement="top">
          <div class="stat-card">
            <!-- 原卡片标题：提现笔数 -->
            <h3 class="card-title">{{ $t('BusinessReport.Cards.TotalWithdrawCount.Title') }}</h3>
            <p class="card-value">{{ PlatformKanbanData.TotalWithdrawCount }}</p>
            <p class="card-average">{{ $t('BusinessReport.Cards.TotalWithdrawCount.AveragePrefix') }}{{ PlatformKanbanData.AvgWithdrawCount }}</p>
          </div>
        </el-tooltip>
        <el-tooltip :content="$t('BusinessReport.Tooltips.TotalEarn')" placement="top">
          <div class="stat-card">
            <!-- 原卡片标题：净营收 -->
            <h3 class="card-title">{{ $t('BusinessReport.Cards.TotalEarn.Title') }}</h3>
            <p class="card-value">{{ PlatformKanbanData.TotalEarn }}</p>
            <p class="card-average">{{ $t('BusinessReport.Cards.TotalEarn.AveragePrefix') }}{{ PlatformKanbanData.AvgEarn }}</p>
          </div>
        </el-tooltip>
        <el-tooltip :content="$t('BusinessReport.Tooltips.InnerTransfer')" placement="top">
          <div class="stat-card">
            <!-- 原卡片标题：运营内转金额（增减） -->
            <h3 class="card-title">{{ $t('BusinessReport.Cards.InnerTransfer.Title') }}(敬请期待)</h3>
            <p class="card-value">{{ PlatformKanbanData.AddInnerTransfer }}</p>
            <p class="card-average">{{ $t('BusinessReport.Cards.InnerTransfer.AveragePrefix') }}{{ PlatformKanbanData.AvgInnerTransfer }}</p>
          </div>
        </el-tooltip>
        <el-tooltip :content="$t('BusinessReport.Tooltips.WithdrawFee')" placement="top">
          <div class="stat-card">
            <!-- 原卡片标题：提现手续费 -->
            <h3 class="card-title">{{ $t('BusinessReport.Cards.WithdrawFee.Title') }}</h3>
            <p class="card-value">{{ PlatformKanbanData.TotalWithdrawFee }}</p>
            <p class="card-average">{{ $t('BusinessReport.Cards.WithdrawFee.AveragePrefix') }}{{ PlatformKanbanData.AvgWithdrawFee }}</p>
          </div>
        </el-tooltip>
      </div>
    </gva-card>
  </template>
  </div>
</template>

<script setup>
  import { GvaCard } from '@/view/dashboard/components'
  import DashboardSkeleton from '@/components/dashboardSkeleton/index.vue'

  import { getStatisticsDashboardApi } from '@/api/dezhou/businessReport'
  import { isUTC8 } from '@/utils/date'

  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const barData1 = ref({}) //第一个柱状图
  const barData2 = ref({}) //
  const pieData1 = ref({}) // 第一个饼状图
  const pieData2 = ref({}) //

  const selectedDate = ref()
  // 用于API请求的时间范围
  const selectTime = ref()
  const dashboardLoading = ref(false)

  // 在组件挂载后执行
  onMounted(() => {
    resetTime()
    onClickGetAllDataFn()
  })

  // 格式化为 UTC 时间字符串（ISO 8601 格式，末尾带 Z）
  const formatUTCTime = (date) => {
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    const seconds = String(date.getUTCSeconds()).padStart(2, '0')
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`
  }

  // 将选择的日期转换为 UTC+8 时区的时间范围
  const convertToUTC8TimeRange = (selectedDate) => {
    // 如果已经是 UTC+8 时区，直接处理
    if (isUTC8()) {
      const startOfDay = new Date(selectedDate)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(selectedDate)
      endOfDay.setHours(23, 59, 59, 999)
      return [formatUTCTime(startOfDay), formatUTCTime(endOfDay)]
    }

    // 不是 UTC+8 时区，需要转换
    // 将选择的日期视为 UTC+8 时区的日期
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const day = selectedDate.getDate()

    // 构建 UTC+8 时区的开始时间：YYYY-MM-DD 00:00:00 UTC+8
    // 转换为 UTC 时间：减去 8 小时
    const startOfDayUTC8 = new Date(Date.UTC(year, month, day, 0, 0, 0, 0) - 8 * 60 * 60 * 1000)

    // 构建 UTC+8 时区的结束时间：YYYY-MM-DD 23:59:59.999 UTC+8
    const endOfDayUTC8 = new Date(Date.UTC(year, month, day, 23, 59, 59, 999) - 8 * 60 * 60 * 1000)

    return [formatUTCTime(startOfDayUTC8), formatUTCTime(endOfDayUTC8)]
  }

  const getStatisticsDashboardFn = () => {
    dashboardLoading.value = true
    console.log('查询时间（UTC+8）：', selectTime.value[0])
    getStatisticsDashboardApi({
      time: selectTime.value[0]
    })
      .then((res) => {
      console.log('接口返回的数据', res.data)

      const formatData = (data) => {
        if (typeof data === 'object' && data !== null) {
          if (Array.isArray(data)) {
            return data.map((item) => formatData(item))
          } else {
            const formattedObj = {}
            for (const key in data) {
              formattedObj[key] = formatData(data[key])
            }
            return formattedObj
          }
        }
        // 如果值为0（包括数字0和字符串'0'），替换为'-'
        return data === 0 || data === '0' ? '-' : data
      }

      PlatformKanbanData.value = formatData(res.data)
      })
      .finally(() => {
        dashboardLoading.value = false
      })
  }

  const onClickGetAllDataFn = () => {
    getStatisticsDashboardFn()

    setEchart()
  }

  // 设置时间 - 默认为当前日期
  const resetTime = () => {
    const currentDate = new Date()
    selectedDate.value = currentDate
    // 使用统一的 UTC+8 时区转换方法
    selectTime.value = convertToUTC8TimeRange(currentDate)
  }

  // 处理日期选择变化，将选中的日期转换为该日期的 0:00:00 到 23:59:59（UTC+8时区）
  const handleDateChange = (value) => {
    if (value) {
      const selectedDay = new Date(value)
      // 使用统一的 UTC+8 时区转换方法
      selectTime.value = convertToUTC8TimeRange(selectedDay)
    }
  }

  const onReset = () => {
    resetTime()
    onClickGetAllDataFn()
  }
  // 看板顶部数据
  let PlatformKanbanData = ref({})

  // 柱状图数据
  const setEchart = () => {
    barData1.value = {
      topTitle: '2015-10-27 - 2015-10-30 ',
      xTitle: t('BusinessReport.Charts.ProfitXAxis'), // 盈利额度
      yTitle: t('BusinessReport.Charts.PeopleYAxis'), // 人数
      color: 'red',
      data: [
        { title: t('BusinessReport.Charts.ProfitBuckets.Range1'), value: 100 }, // 0<盈利<10
        { title: t('BusinessReport.Charts.ProfitBuckets.Range2'), value: 90 }, // 10<盈利<50
        { title: t('BusinessReport.Charts.ProfitBuckets.Range3'), value: 70 }, // 50<盈利<100
        { title: t('BusinessReport.Charts.ProfitBuckets.Range4'), value: 120 } // 盈利>100
      ]
    }

    barData2.value = {
      topTitle: '2015-10-27 - 2015-10-30 ',
      xTitle: t('BusinessReport.Charts.LossXAxis'), // 亏损额度
      yTitle: t('BusinessReport.Charts.PeopleYAxis'), // 人数
      color: '#65df2e',
      data: [
        { title: t('BusinessReport.Charts.ProfitBuckets.Range1'), value: 120 }, // 0<盈利<10
        { title: t('BusinessReport.Charts.ProfitBuckets.Range2'), value: 70 }, // 10<盈利<50
        { title: t('BusinessReport.Charts.ProfitBuckets.Range3'), value: 50 }, // 50<盈利<100
        { title: t('BusinessReport.Charts.ProfitBuckets.Range4'), value: 150 } // 盈利>100
      ]
    }

    // 饼状图数据
    pieData1.value = {
      title: t('BusinessReport.Charts.ProfitPie.Title'), // 长牌德州VS短牌德州流水
      timeRange: '2015-10-25 - 2015-10-27',
      data: [
        {
          title: t('BusinessReport.Charts.LongDeckRake'), // 长牌抽水
          value: 580,
          subTitle: '70%',
          subColor: '#524df2'
        },
        {
          title: t('BusinessReport.Charts.ShortDeckRake'), // 短牌抽水
          value: 480,
          subTitle: '30%',
          subColor: '#524df2'
        }
      ]
    }

    pieData2.value = {
      title: t('BusinessReport.Charts.RakePie.Title'), // 长牌德州VS短牌德州抽水
      timeRange: '2015-10-27 - 2015-10-30',
      data: [
        {
          title: t('BusinessReport.Charts.LongDeckRake'), // 长牌抽水
          value: 280,
          subTitle: '20%',
          subColor: '#524df2'
        },
        {
          title: t('BusinessReport.Charts.ShortDeckRake'), // 短牌抽水
          value: 480,
          subTitle: '80%',
          subColor: '#524df2'
        }
      ],
      rightList: [
        {
          title: t('BusinessReport.Charts.RightList.Total'), // 总抽水
          value: '335801U'
        },
        {
          title: t('BusinessReport.Charts.RightList.Long'), // 长牌抽水
          value: '335801U'
        },
        {
          title: t('BusinessReport.Charts.RightList.Short'), // 短牌抽水
          value: '335801U'
        }
      ]
    }
  }
</script>

<style scoped>
  .dashboard-container {
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: 10px;
    /* background-color: burlywood; */
  }

  .dashboard-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }

  .default-tip {
    text-align: right;
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .search-bar {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  .date-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
  }

  .search-btn {
    padding: 8px 16px;
    background-color: #0095ff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .stat-card {
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 4px;
  }

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

  .card-average {
    font-size: 14px;
    color: #666;
  }

  /* 饼状图 */
  .pie-chart {
    width: 100%;
    height: 2600px;
    background-color: #f0f0f0;
    border-radius: 4px;
  }
</style>
