<template>
  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :search-field-count="1"
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
            <!-- 原: 时间 -->
            <el-form-item :label="$t('NewUserStatistics.TimeSelection')">
              <!-- 原: 开始时间 / 结束时间 -->
              <el-date-picker
                v-model="selectTime"
                style="width: 350px"
                type="datetimerange"
                :start-placeholder="$t('NewUserStatistics.StartTime')"
                :end-placeholder="$t('NewUserStatistics.EndTime')"
                :clearable="false"
              />
            </el-form-item>
            <el-form-item>
              <!-- 原: 查询 -->
              <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
              <!-- 原: 重置 -->
              <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div class="gva-table-box">
        <!-- 原: 当前周期内总注册: -->
        <p class="registerNum">{{ $t('NewUserStatistics.CurrentPeriodTotalRegister') }}<span>{{ totalRegisterNum }}</span></p>

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
          <!-- 原: 序号 -->
          <el-table-column type="index" width="70" align="center" :label="$t('NewUserStatistics.Index')" />

          <!-- 原: 注册人数 -->
          <el-table-column align="center" :label="$t('NewUserStatistics.Registered')" prop="NewUsers" min-width="150" sortable />
          <!-- 原: 第一天 -->
          <el-table-column align="center" :label="$t('NewUserStatistics.D1')" prop="D1Rate" min-width="120" sortable>
            <template #default="scope">
              <span>{{ getDayDifference(scope.row.StatDate) >= 1 ? `${scope.row.D1Rate}%` : '' }}</span>
            </template>
          </el-table-column>

          <!-- 原: 第三天 -->
          <el-table-column align="center" :label="$t('NewUserStatistics.D3')" prop="D3Rate" min-width="120" sortable>
            <template #default="scope">
              <span>{{ getDayDifference(scope.row.StatDate) >= 3 ? `${scope.row.D3Rate}%` : '' }}</span>
            </template>
          </el-table-column>
          <!-- 原: 第七天 -->
          <el-table-column align="center" :label="$t('NewUserStatistics.D7')" prop="D7Rate" min-width="120" sortable>
            <template #default="scope">
              <span>{{ getDayDifference(scope.row.StatDate) >= 7 ? `${scope.row.D7Rate}%` : '' }}</span>
            </template>
          </el-table-column>
          <!-- 原: 第15天 -->
          <el-table-column align="center" :label="$t('NewUserStatistics.D15')" prop="D15Rate" min-width="120" sortable>
            <template #default="scope">
              <span>{{ getDayDifference(scope.row.StatDate) >= 15 ? `${scope.row.D15Rate}%` : '' }}</span>
            </template>
          </el-table-column>
          <!-- 原: 第30天 -->
          <el-table-column align="center" :label="$t('NewUserStatistics.D30')" prop="D30Rate" min-width="120" sortable>
            <template #default="scope">
              <span>{{ getDayDifference(scope.row.StatDate) >= 30 ? `${scope.row.D30Rate}%` : '' }}</span>
            </template>
          </el-table-column>
          <!-- 原: 注册时间 -->
          <el-table-column align="center" :label="$t('NewUserStatistics.RegisterTime')" prop="StatDate" min-width="200" sortable>
            <template #default="scope">{{ formatDate(scope.row.StatDate) }}</template>
          </el-table-column>
        </el-table>
        <!-- 没做分页，先注释 -->
        <!-- <div class="gva-pagination">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div> -->
      </div>
    </TableSkeletonWrapper>
  </div>
</template>

<script setup>
  import { getRetain2 } from '@/api/dezhou/activeReport'
  import { isUTC8 } from '@/utils/date'

  // 全量引入格式化工具 请按需保留
  import { formatDate } from '@/utils/format'
  import { ref, onMounted } from 'vue'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  defineOptions({
    name: 'activeReport'
  })
  // 在组件挂载后执行
  onMounted(() => {
    setIntSearchCondation()
    getTableData()
  })
  const selectTime = ref([])
  const loading = ref(false)

  const elSearchFormRef = ref()

  // =========== 表格控制部分 ===========
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({
    channel: 0,
    startTime: new Date(),
    endTime: new Date()
  })

  const totalRegisterNum = ref(0)

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

  // 将时间转换为 UTC+8 时区对应的 UTC 时间
  const convertToUTC8Time = (localDate) => {
    // 如果已经是 UTC+8 时区，直接使用本地时间
    if (isUTC8()) {
      return formatUTCTime(localDate)
    }

    // 不是 UTC+8 时区，需要转换
    // 获取用户选择的本地时间的年月日时分秒
    const year = localDate.getFullYear()
    const month = localDate.getMonth()
    const day = localDate.getDate()
    const hours = localDate.getHours()
    const minutes = localDate.getMinutes()
    const seconds = localDate.getSeconds()
    const milliseconds = localDate.getMilliseconds()

    // 将这个时间视为 UTC+8 时区的时间，转换为 UTC
    // UTC+8 时间 - 8小时 = UTC 时间
    const utc8Time = new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds) - 8 * 60 * 60 * 1000)

    return formatUTCTime(utc8Time)
  }

  const setIntSearchCondation = () => {
    // 1. 获取当前日期（本地时间）
    const currentDate = new Date()

    // 2. 计算最近一周的起始和结束日期
    const lastWeekMonday = new Date(currentDate)
    lastWeekMonday.setDate(currentDate.getDate() - 7)

    const lastWeekEndDay = new Date(lastWeekMonday)
    lastWeekEndDay.setDate(lastWeekMonday.getDate() + 7)

    // 3. 转换为 UTC+8 时区对应的时间
    const lastWeekTimeRange = [convertToUTC8Time(lastWeekMonday), convertToUTC8Time(lastWeekEndDay)]
    selectTime.value = lastWeekTimeRange
  }

  // 重置
  const onReset = () => {
    setIntSearchCondation()
    getTableData()
  }

  // 处理用户选择的时间范围，转换为 UTC+8 时区
  const processSelectedTimeRange = () => {
    if (!selectTime.value || selectTime.value.length !== 2) {
      return [null, null]
    }

    const startTime = new Date(selectTime.value[0])
    const endTime = new Date(selectTime.value[1])

    return [convertToUTC8Time(startTime), convertToUTC8Time(endTime)]
  }

  // 搜索
  const onSubmit = () => {
    elSearchFormRef.value?.validate(async (valid) => {
      if (!valid) return
      page.value = 1
      if (searchInfo.value.AccountType === '') {
        searchInfo.value.AccountType = null
      }

      // 转换为 UTC+8 时区
      const [startTimeUTC8, endTimeUTC8] = processSelectedTimeRange()
      console.log('查询时间范围（UTC+8）：', startTimeUTC8, endTimeUTC8)

      searchInfo.value.startTime = startTimeUTC8
      searchInfo.value.endTime = endTimeUTC8

      const table = await getRetain2({
        page: page.value,
        pageSize: pageSize.value,
        startTime: startTimeUTC8,
        endTime: endTimeUTC8
      })
      if (table.code === 0) {
        tableData.value = table.data.List
        total.value = table.data.total
        page.value = table.data.page
        pageSize.value = table.data.pageSize
      }
    })
  }

  // 查询
  const getTableData = async () => {
    loading.value = true
    try {
      // 使用已经转换好的时间
      const table = await getRetain2({
        page: page.value,
        pageSize: pageSize.value,
        startTime: selectTime.value[0],
        endTime: selectTime.value[1]
      })
      if (table.code === 0) {
        tableData.value = table.data.List
        total.value = table.data.total
        page.value = table.data.page
        pageSize.value = table.data.pageSize

        totalRegisterNum.value = table.data.List.reduce(
          (accumulator, currentValue) => accumulator + currentValue.NewUsers,
          0
        )
      }
    } finally {
      loading.value = false
    }
  }

  function getDayDifference(date1) {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1 // 月份从0开始，所以要加1
    const day = date.getDate()
    // 补零
    const formattedMonth = month < 10 ? '0' + month : month
    const formattedDay = day < 10 ? '0' + day : day
    const d1 = new Date(date1)
    const d2 = new Date(`${year}-${formattedMonth}-${formattedDay}`)
    // 获取毫秒差的绝对值
    const timeDiff = Math.abs(d1.getTime() - d2.getTime())
    // 将毫秒差转换为天数并向下取整
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    return days
  }
</script>

<style scoped>
  .demo-datetime-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
  }

  .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
    min-width: 300px;
  }

  .block:last-child {
    border-right: none;
  }

  .block .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    .block {
      flex: 100%;
      border-right: none;
      border-bottom: solid 1px var(--el-border-color);
    }

    .block:last-child {
      border-bottom: none;
    }

    :deep(.el-date-editor.el-input) {
      width: 100%;
    }

    :deep(.el-date-editor.el-input__wrapper) {
      width: 100%;
      max-width: 300px;
    }
  }

  .registerNum {
    line-height: 50px;
    font-size: 16px;
    text-align: right;
    padding-right: 20px;
    span {
      font-weight: bold;
      color: red;
    }
  }
</style>
