<template>
  <div>
    <TableSkeleton
      :loading="loading"
      :show-search="true"
      :search-field-count="3"
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
            <!-- 原label: 用户ID -->
            <el-form-item :label="$t('TransferWithdrawList.Search.UserIdLabel')" prop="userID">
              <el-input
                clearable
                v-model.trim="searchInfo.userID"
                :placeholder="$t('TransferWithdrawList.Search.UserIdPlaceholder')"
                style="width: 240px"
              />
            </el-form-item>
            <!-- 原label: 订单ID -->
            <el-form-item :label="$t('TransferWithdrawList.Search.OrderIdLabel')" prop="orderID">
              <el-input
                clearable
                v-model.trim="searchInfo.orderID"
                :placeholder="$t('TransferWithdrawList.Search.OrderIdPlaceholder')"
                style="width: 240px"
              />
            </el-form-item>
            <!-- 原label: 时间范围 -->
            <el-form-item :label="$t('TransferWithdrawList.Search.TimeRangeLabel')" prop="timeRange">
              <el-date-picker
                style="width: 400px"
                clearable
                v-model="searchInfo.timeRange"
                type="datetimerange"
                :range-separator="$t('TransferWithdrawList.Search.RangeSeparator')"
                :start-placeholder="$t('TransferWithdrawList.Search.TimeStart')"
                :end-placeholder="$t('TransferWithdrawList.Search.TimeEnd')"
                format="YYYY-MM-DD HH:mm:ss"
              />
              <!-- value-format="YYYY-MM-DD HH:mm:ss"：控制绑定值的格式，影响数据传递给后端的形式 -->
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
        <div class="gva-btn-list"></div>

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
          <el-table-column type="index" width="70" align="center" :label="$t('TransferWithdrawList.Table.Index')" />
          <!-- 原label: 订单ID -->
          <el-table-column align="center" :label="$t('TransferWithdrawList.Table.OrderId')" prop="OrderId" min-width="180" />
          <!-- 原label: 用户ID -->
          <el-table-column align="center" :label="$t('TransferWithdrawList.Table.UserId')" prop="Userid" min-width="120" />
          <!-- 原label: 实际到账金额 -->
          <el-table-column align="center" :label="$t('TransferWithdrawList.Table.ActualAmount')" prop="Amount" min-width="120">
            <template #default="scope">
              <span style="color: #67C23A; font-weight: bold;">{{ scope.row.Amount }}</span>
            </template>
          </el-table-column>
          <!-- 提U地址 -->
          <el-table-column align="center" :label="$t('TransferWithdrawList.Table.ToAddress')" prop="ToAddr" min-width="200" />
          <!-- TxHash -->
          <el-table-column align="center" :label="$t('TransferWithdrawList.Table.TxHash')" prop="TxHash" min-width="260">
            <template #default="scope">
              <span v-if="getTxHash(scope.row)" style="font-family: monospace; font-size: 12px;">
                {{ truncateHash(getTxHash(scope.row)) }}
              </span>
              <span v-else style="color: #909399;">-</span>
              <div v-if="getTxHash(scope.row)" style="margin-top: 4px;">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="copyTxHash(getTxHash(scope.row))"
                >{{ $t('TransferWithdrawList.Actions.Copy') }}</el-button>
                <el-button
                  link
                  type="success"
                  size="small"
                  @click="openTxOnExplorer(getTxHash(scope.row))"
                >{{ $t('TransferWithdrawList.Actions.ViewOnChain') }}</el-button>
              </div>
            </template>
          </el-table-column>
          <!-- 原label: 状态 -->
          <el-table-column align="center" :label="$t('TransferWithdrawList.Table.Status')" prop="Result" min-width="100">
            <template #default="scope">
              <el-tag :type="scope.row.Result === 0 ? 'success' : 'danger'">
                {{ scope.row.Result === 0 ? $t('TransferWithdrawList.Status.Success') : $t('TransferWithdrawList.Status.Fail') }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- 原label: 备注 -->
          <el-table-column align="center" :label="$t('TransferWithdrawList.Table.Remark')" prop="Remark" min-width="120" />
          <!-- 原label: 创建时间 -->
          <el-table-column align="center" :label="$t('TransferWithdrawList.Table.CreatedAt')" prop="Createtime" min-width="180">
            <template #default="scope">{{ formatDate(scope.row.Createtime) }}</template>
          </el-table-column>
          <!-- 原label: 更新时间 -->
          <el-table-column align="center" :label="$t('TransferWithdrawList.Table.UpdatedAt')" prop="Updatetime" min-width="180">
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
    </TableSkeleton>
  </div>
</template>

<script setup>
import { getWithdrawListApi } from '@/api/dezhou/transferManagement'
import { formatDate } from '@/utils/format'
import TableSkeleton from '@/components/tableSkeleton/index.vue'
import { ref, onMounted, watch, onActivated } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'TransferPayList'
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
  timeRange: []
})

onMounted(() => {
  getTableData()
})

const onReset = () => {
  searchInfo.value = {
    userID: undefined,
    orderID: undefined,
    timeRange: []
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
  if (!searchInfo.value.userID) delete searchInfo.value.userID
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
    const table = await getWithdrawListApi(params)
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

// 外部跳转过来的查询逻辑
// 读取当前路由参数，赋值给搜索条件的id
import { useRoute } from 'vue-router'
const route = useRoute()
const syncFromQuery = () => {
  if (route.query.userID) {
    searchInfo.value.userID = route.query.userID
    getTableData()
  }
}

syncFromQuery()             // 首次进入时跑一次

watch(() => route.query.id, () => {
  syncFromQuery()           // 参数变化时触发
})

onActivated(() => {
  syncFromQuery()           // keep-alive 恢复时也再检查一次
})

const getTxHash = (row) => {
  if (!row || typeof row !== 'object') return ''
  const candidates = [
    row.TxHash,
    row.tx_hash,
    row.Txhash,
    row.txHash,
    row.TX_HASH,
    row.TxId,
    row.tx_id,
    row.TxID,
    row.transaction_hash,
    row.TransactionHash
  ]
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim() !== '') return c.trim()
  }
  return ''
}

const truncateHash = (hash) => {
  if (!hash || typeof hash !== 'string') return ''
  if (hash.length <= 16) return hash
  return hash.substring(0, 8) + '...' + hash.substring(hash.length - 8)
}

const copyTxHash = async (text) => {
  try {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    ElMessage.success(t('TransferWithdrawList.Actions.CopyOk'))
  } catch (e) {
    ElMessage.error(t('TransferWithdrawList.Actions.CopyFail') + '：' + (e?.message || ''))
  }
}

const openTxOnExplorer = (hash) => {
  if (!hash) return
  const url = `https://tronscan.io/#/transaction/${encodeURIComponent(hash)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
.gva-search-box {
  margin-bottom: 20px;
}

.gva-btn-list {
  margin-bottom: 10px;
}
</style>
