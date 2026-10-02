<template>
  <div class="dashboard-container">
    <DashboardSkeleton v-if="loading" :top-card-count="4" :bottom-card-count="18" />
    <template v-else>
      <gva-card custom-class="col-span-1 lg:col-span-2 ">
        <h2 class="dashboard-title">
          <!-- 平台看板 -->
          {{ $t('Home.Title') }}
        </h2>
        <p class="default-tip">
          <!-- 默认均值为当前一天 -->
          {{ $t('Home.DefaultTip') }}
        </p>

        <div class="search-bar">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item :label="$t('GlobalUniversality.TimeSelection')">
              <el-date-picker
                style="width: 350px"
                v-model="selectedDate"
                type="date"
                placeholder="选择日期"
                :clearable="false"
                @change="handleDateChange"
              />
            </el-form-item>

            <template v-if="showAllQuery">
              <!-- 将需要控制显示状态的查询条件添加到此范围内 -->
            </template>
            <el-form-item>
              <el-button type="primary" icon="search" @click="onClickGetAllDataFn">
                <!-- 搜索 -->
                {{ $t('GlobalUniversality.Query') }}
              </el-button>
              <el-button icon="refresh" @click="onReset">
                <!-- 重置 -->
                {{ $t('GlobalUniversality.Reset') }}
              </el-button>
              <!-- <el-button link type="primary" icon="arrow-down" @click="showAllQuery = true" v-if="!showAllQuery"
              >
              展开
              </el-button>
            <el-button link type="primary" icon="arrow-up" @click="showAllQuery = false" v-else>收起</el-button> -->
            </el-form-item>
          </el-form>
        </div>

        <div class="card-grid">
          <el-tooltip :content="$t('Home.Description1')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- 总抽水 -->
                {{ $t('Home.TotalPumping') }}
              </h3>
              <p class="card-value">{{ PlatformKanbanData.TotalWater || '-' }}</p>
              <p class="card-average">
                <!-- 抽水均值： -->
                {{ $t('Home.MeanPumpingRate') }}:
                {{ PlatformKanbanData.AvgWater || '-' }}
              </p>
            </div>
          </el-tooltip>
          <div class="stat-card">
            <h3 class="card-title">
              <!-- 总下注 -->
              {{ $t('Home.TotalBet') }}
            </h3>
            <p class="card-value">{{ PlatformKanbanData.TotalBet || '-' }}</p>
            <p class="card-average">
              <!-- 下注均值： -->
              {{ $t('Home.AverageBettingValue') }}:
              {{ PlatformKanbanData.AvgBet || '-' }}
            </p>
          </div>

          <div class="stat-card">
            <h3 class="card-title">
              <!-- 平均同时在线用户数 -->
              {{ $t('Home.AverageNumberOfOnlineUsers') }}
            </h3>
            <p class="card-value">{{ avgOnlineUserData || '-' }}</p>
            <p class="card-average"></p>
          </div>

          <div class="stat-card">
            <h3 class="card-title">
              <!-- 最高同时在线用户数 -->
              {{ $t('Home.MaximumNumberOfSimultaneousOnlineUsers') }}
            </h3>
            <p class="card-value">{{ maxOnlineUserData || '-' }}</p>
            <p class="card-average"></p>
          </div>
        </div>
      </gva-card>

      <gva-card custom-class="col-span-1 lg:col-span-2 ">
        <h2 class="dashboard-title"></h2>
        <p class="default-tip"></p>

        <div class="card-grid">
          <el-tooltip :content="$t('Home.Description2')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- TG注册用户数 -->
                {{ $t('Home.NumberOfTGRegisteredUsers') }}
              </h3>
              <p class="card-value">{{ PlatformKanbanData.TGRegister || '-' }}</p>
              <p class="card-average">
                <!-- TG注册用户数均值： -->
                {{ $t('Home.AverageNumberOfTGRegisteredUsers') }}: {{ PlatformKanbanData.AvgTGRegister || '-' }}
              </p>
            </div>
          </el-tooltip>
          <el-tooltip :content="$t('Home.Description3')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- 活跃用户数 -->
                {{ $t('Home.NumberOfActiveUsers') }}
              </h3>
              <p class="card-value">{{ PlatformKanbanData.ActiveUser || '-' }}</p>
              <p class="card-average">
                <!-- 活跃用户数量均值： -->
                {{ $t('Home.AverageNumberOfActiveUsers') }}:
                {{ PlatformKanbanData.AvgActiveUser || '-' }}
              </p>
            </div>
          </el-tooltip>
          <!-- 同时在线最高人数 -->
          <!-- <el-tooltip :content="$t('Home.Description4')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                {{ $t('Home.TheHighestNumberOfConcurrentOnlineUsers') }}
              </h3>
              <p class="card-value">{{ PlatformKanbanData.MaxOnlineUser || '-' }}</p>
              <p class="card-average">
                {{ $t('Home.MeanOfTheHighestNumberOfConcurrentOnlineUsers') }}:
                {{ PlatformKanbanData.AvgMaxOnlineUser || '-' }}
              </p>
            </div>
          </el-tooltip> -->
          <el-tooltip :content="$t('Home.Description5')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- 总牌局数 -->
                {{ $t('Home.TotalNumberOfGamesPlayed') }}
              </h3>
              <p class="card-value">
                {{ PlatformKanbanData.TotalRound || '-' }}
              </p>
              <p class="card-average">
                <!-- 牌局数均值: -->
                {{ $t('Home.MeanNumberOfGamesPlayed') }}:
                {{ PlatformKanbanData.AvgTotalRound || '-' }}
              </p>
            </div>
          </el-tooltip>
          <el-tooltip :content="$t('Home.Description6')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">UV</h3>
              <p class="card-value">{{ PlatformKanbanData.UV || '-' }}</p>
              <p class="card-average">
                <!-- UV均值： -->
                {{ $t('Home.UVMean') }}:
                {{ PlatformKanbanData.AvgUV || '-' }}
              </p>
            </div>
          </el-tooltip>
          <el-tooltip :content="$t('Home.Description7')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- 累计付费玩家数 -->
                {{ $t('Home.AccumulatedNumberOfPayingPlayers') }}
              </h3>
              <p class="card-value">{{ PlatformKanbanData.CumulativePay || '-' }}</p>
              <p class="card-average"></p>
            </div>
          </el-tooltip>
          <el-tooltip :content="$t('Home.Description8')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- DAU付费玩家数 -->
                {{ $t('Home.NumberOfDAUPayingPlayers') }}
              </h3>
              <p class="card-value">{{ PlatformKanbanData.DAUPay || '-' }}</p>
              <p class="card-average">
                <!-- DAU付费玩家均值: -->
                {{ $t('Home.AverageOfDAUPayingPlayers') }}:
                {{ PlatformKanbanData.AvgDAUPay || '-' }}
              </p>
            </div>
          </el-tooltip>
          <el-tooltip :content="$t('Home.Description9')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- 新增付费玩家数 -->
                {{ $t('Home.NewNumberOfPayingPlayersAdded') }}
              </h3>
              <p class="card-value">{{ PlatformKanbanData.NewPayUser || '-' }}</p>
              <p class="card-average">
                <!-- 新增付费玩家均值： -->
                {{ $t('Home.AverageOfNewlyAddedPayingPlayers') }}:
                {{ PlatformKanbanData.AvgNewPayUser || '-' }}
              </p>
            </div>
          </el-tooltip>
          <el-tooltip :content="$t('Home.Description10')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- 保险收入 -->
                {{ $t('Home.InsuranceRevenue') }}
              </h3>

              <p class="card-value">{{ PlatformKanbanData.InSureBuy || '-' }}</p>
              <p class="card-average">
                <!-- 每日保险收入均值： -->
                {{ $t('Home.AverageDailyInsuranceIncome') }}:
                {{ PlatformKanbanData.AvgInSureBuy || '-' }}
              </p>
            </div>
          </el-tooltip>

          <el-tooltip :content="$t('Home.Description11')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- 保险赔付 -->
                {{ $t('Home.InsuranceClaimPayment') }}
              </h3>

              <p class="card-value">{{ PlatformKanbanData.InSureWin || '-' }}</p>
              <p class="card-average">
                <!-- 平均每日保险赔付： -->
                {{ $t('Home.DailyAverageInsurancePayout') }}:
                {{ PlatformKanbanData.AvgInSureWin || '-' }}
              </p>
            </div>
          </el-tooltip>

          <el-tooltip :content="$t('Home.Description12')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">ARPU</h3>
              <p class="card-value">{{ PlatformKanbanData.ARPU || '-' }}</p>
              <p class="card-average"></p>
            </div>
          </el-tooltip>
          <el-tooltip :content="$t('Home.Description13')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- UV转化率 -->
                {{ $t('Home.UVConversionRate') }}
              </h3>
              <p class="card-value">{{ PlatformKanbanData.UVTurnRate || '-' }}</p>
              <p class="card-average"></p>
            </div>
          </el-tooltip>
          <el-tooltip :content="$t('Home.Description14')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">ACU</h3>
              <p class="card-value">{{ PlatformKanbanData.ACU || '-' }}</p>
              <p class="card-average"></p>
            </div>
          </el-tooltip>
          <el-tooltip :content="$t('Home.Description15')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- 帐号注册转化率 -->
                {{ $t('Home.AccountRegistrationConversionRate') }}
              </h3>
              <p class="card-value">{{ PlatformKanbanData.RegTurnRate || '-' }}</p>
              <p class="card-average"></p>
            </div>
          </el-tooltip>
          <el-tooltip :content="$t('Home.Description16')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- 新增ARPU -->
                {{ $t('Home.AddARPU') }}
              </h3>
              <p class="card-value">{{ PlatformKanbanData.NewARPU || '-' }}</p>
              <p class="card-average"></p>
            </div>
          </el-tooltip>
          <el-tooltip :content="$t('Home.Description17')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">ARPPU</h3>
              <p class="card-value">{{ PlatformKanbanData.ARPPU || '-' }}</p>
              <p class="card-average"></p>
            </div>
          </el-tooltip>
          <el-tooltip :content="$t('Home.Description18')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- DAU付费率 -->
                {{ $t('Home.DAUPaymentRate') }}
              </h3>
              <p class="card-value">{{ PlatformKanbanData.DAUPayRate || '-' }}</p>
              <p class="card-average"></p>
            </div>
          </el-tooltip>
          <el-tooltip :content="$t('Home.Description19')" placement="top">
            <div class="stat-card">
              <h3 class="card-title">
                <!-- 新增付费率 -->
                {{ $t('Home.NewPaidRate') }}
              </h3>
              <p class="card-value">{{ PlatformKanbanData.NewPayRate || '-' }}</p>
              <p class="card-average"></p>
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

  import { getStatisticsDashboardApi, getAvgOnlineUserApi, getMaxOnlineUserApi } from '@/api/home'
  import { isUTC8 } from '@/utils/date'

  import { ref, onMounted } from 'vue'

  const avgOnlineUserData = ref('')
  const maxOnlineUserData = ref('')
  const loading = ref(false)

  const selectedDate = ref()
  // 用于API请求的时间范围
  const selectTime = ref()
  const showAllQuery = ref(false)
  // 在组件挂载后执行
  onMounted(() => {
    resetTime()
    onClickGetAllDataFn()
  })
  const getStatisticsDashboardFn = () => {
    console.log('查询时间范围（UTC+8）：', selectTime.value[0], selectTime.value[1])
    return getStatisticsDashboardApi({
      startTime: selectTime.value[0],
      endTime: selectTime.value[1]
    }).then((res) => {
      console.log(res)
      PlatformKanbanData.value = res.data
    })
  }

  const getAvgOnlineUserFn = () => {
    return getAvgOnlineUserApi({
      startTime: selectTime.value[0],
      endTime: selectTime.value[1]
    }).then((res) => {
      if (res.code === 0) {
        avgOnlineUserData.value = res.data?.List?.[0]?.OnlineCount || '-'
      }
    })
  }

  const getMaxOnlineUserFn = () => {
    return getMaxOnlineUserApi({
      startTime: selectTime.value[0],
      endTime: selectTime.value[1]
    }).then((res) => {
      if (res.code === 0) {
        maxOnlineUserData.value = res.data?.List?.[0]?.OnlineCount || '-'
      }
    })
  }

  const onClickGetAllDataFn = async () => {
    loading.value = true
    try {
      await Promise.all([getStatisticsDashboardFn(), getAvgOnlineUserFn(), getMaxOnlineUserFn()])
    } finally {
      loading.value = false
    }
  }

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
