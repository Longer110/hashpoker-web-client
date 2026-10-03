<template>
  <div>
    <TableSkeleton
      :loading="loading"
      :show-search="true"
      :search-field-count="1"
      :search-button-count="3"
      :row-count="Math.min(limit, 50)"
      :show-pagination="false"
    >
      <template #search>
        <div class="gva-search-box">
          <el-form
            ref="elSearchFormRef"
            :inline="true"
            :model="searchInfo"
            class="demo-form-inline"
          >
            <el-form-item :label="$t('WithdrawAudit.Search.LimitLabel')" prop="limit">
              <el-input-number
                v-model="searchInfo.limit"
                :min="1"
                :max="500"
                :step="50"
                style="width: 160px"
              />
              <span style="margin-left: 6px; color: #AAAAAA; font-size: 12px;">
                {{ $t('WithdrawAudit.Search.LimitHint') }}
              </span>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="refresh" @click="getTableData">{{ $t('WithdrawAudit.Search.Refresh') }}</el-button>
              <el-button icon="refresh-left" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
              <el-button
                :type="tronWalletAddress ? 'success' : 'warning'"
                icon="Wallet"
                @click="connectTronWallet"
                :loading="tronConnecting"
              >
                {{ tronWalletButtonText }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div class="gva-table-box">
        <div class="gva-btn-list">
          <el-alert
            v-if="tronWalletAddress"
            :title="$t('WithdrawAudit.Wallet.Connected') + '：' + tronWalletAddress"
            type="success"
            :closable="false"
            show-icon
            style="margin-bottom: 12px;"
          />
          <el-alert
            v-else
            :title="$t('WithdrawAudit.Wallet.Notice')"
            type="warning"
            :closable="false"
            show-icon
            style="margin-bottom: 12px;"
          />
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:8px;">
            <el-statistic :title="$t('WithdrawAudit.Summary.TotalCount')" :value="tableData.length" />
            <el-statistic
              :title="$t('WithdrawAudit.Summary.TotalInput')"
              :value="summary.inputAmount"
              :precision="2"
              style="margin-left: 12px;"
              value-style="color:#F56C6C;"
            />
            <el-statistic
              :title="$t('WithdrawAudit.Summary.TotalNet')"
              :value="summary.netAmount"
              :precision="2"
              style="margin-left: 12px;"
              value-style="color:#E6A23C;"
            />
            <el-statistic
              :title="$t('WithdrawAudit.Summary.TotalFee')"
              :value="summary.feeAmount"
              :precision="2"
              style="margin-left: 12px;"
              value-style="color:#909399;"
            />
          </div>
        </div>

        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          height="760"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="order_id"
          :header-cell-style="{ background: '#111c30', color: '#FFFFFF' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column type="index" width="70" align="center" :label="$t('WithdrawAudit.Table.Index')" />
          <el-table-column align="center" :label="$t('WithdrawAudit.Table.OrderId')" prop="order_id" min-width="200">
            <template #default="scope">
              <span style="font-family: monospace;">{{ scope.row.order_id }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('WithdrawAudit.Table.UserId')" prop="user_id" min-width="110" />
          <el-table-column align="center" :label="$t('WithdrawAudit.Table.InputAmount')" prop="input_amount" min-width="130">
            <template #default="scope">
              <span style="color: #F56C6C; font-weight: bold;">{{ scope.row.input_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('WithdrawAudit.Table.Fee')" prop="fee" min-width="110">
            <template #default="scope">
              <span style="color: #909399;">{{ computeFee(scope.row) }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('WithdrawAudit.Table.Amount')" prop="amount" min-width="130">
            <template #default="scope">
              <span style="color: #E6A23C; font-weight: bold;">{{ scope.row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('WithdrawAudit.Table.ToAddress')" prop="to_addr" min-width="240">
            <template #default="scope">
              <span style="font-family: monospace; font-size: 12px;">{{ scope.row.to_addr }}</span>
              <el-button
                link
                type="primary"
                size="small"
                v-if="scope.row.to_addr"
                @click="copyToClipboard(scope.row.to_addr)"
              >{{ $t('WithdrawAudit.Actions.Copy') }}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('WithdrawAudit.Table.Remark')" prop="remark" min-width="160" show-overflow-tooltip />
          <el-table-column align="center" :label="$t('WithdrawAudit.Table.CreatedAt')" prop="create_time" min-width="180">
            <template #default="scope">{{ formatDate(scope.row.create_time || scope.row.createdAt || scope.row.Createtime) }}</template>
          </el-table-column>
          <el-table-column
            align="center"
            :label="$t('WithdrawAudit.Table.Actions')"
            width="220"
            fixed="right"
          >
            <template #default="scope">
              <el-button
                type="success"
                size="small"
                icon="Check"
                @click="openPassDialog(scope.row)"
              >{{ $t('WithdrawAudit.Actions.Pass') }}</el-button>
              <el-button
                type="danger"
                size="small"
                icon="Close"
                @click="openRejectDialog(scope.row)"
              >{{ $t('WithdrawAudit.Actions.Reject') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </TableSkeleton>

    <el-dialog
      v-model="passDialogVisible"
      :title="$t('WithdrawAudit.Dialog.PassTitle')"
      width="600px"
      align-center
      :close-on-click-modal="false"
    >
      <el-form :model="passForm" label-width="120px">
        <el-form-item :label="$t('WithdrawAudit.Dialog.OrderId')">
          <span style="font-family: monospace;">{{ passForm.order_id }}</span>
        </el-form-item>
        <el-form-item :label="$t('WithdrawAudit.Dialog.UserId')">
          <span>{{ passForm.user_id }}</span>
        </el-form-item>
        <el-form-item :label="$t('WithdrawAudit.Dialog.ToAddress')">
          <span style="font-family: monospace;">{{ passForm.to_addr }}</span>
          <el-button link size="small" type="primary" @click="copyToClipboard(passForm.to_addr)" v-if="passForm.to_addr">
            {{ $t('WithdrawAudit.Actions.Copy') }}
          </el-button>
        </el-form-item>
        <el-form-item :label="$t('WithdrawAudit.Dialog.InputAmount')">
          <span style="color:#F56C6C;font-weight:bold;">{{ passForm.input_amount }}</span>
        </el-form-item>
        <el-form-item :label="$t('WithdrawAudit.Dialog.Amount')">
          <span style="color:#E6A23C;font-weight:bold;">{{ passForm.amount }}</span>
          <span style="margin-left:12px;color:#909399;font-size:12px;">
            ({{ $t('WithdrawAudit.Dialog.FeeHint') }}：{{ computeFee(passForm) }})
          </span>
        </el-form-item>
        <el-form-item
          v-if="tronWalletAddress && passForm.to_addr && passForm.amount"
          :label="$t('WithdrawAudit.Dialog.QuickSend')"
        >
          <el-button type="warning" icon="Promotion" @click="buildTronSend">
            {{ $t('WithdrawAudit.Dialog.BuildTransfer') }}
          </el-button>
          <div style="margin-top:6px;color:#AAAAAA;font-size:12px;line-height:1.6;">
            {{ $t('WithdrawAudit.Dialog.BuildTransferHint') }}
          </div>
        </el-form-item>
        <el-form-item :label="$t('WithdrawAudit.Dialog.TxHash')" prop="tx_hash" required>
          <el-input
            v-model.trim="passForm.tx_hash"
            :placeholder="$t('WithdrawAudit.Dialog.TxHashPlaceholder')"
            clearable
            maxlength="128"
            show-word-limit
          />
        </el-form-item>
        <el-form-item :label="$t('WithdrawAudit.Dialog.Remark')">
          <el-input
            v-model.trim="passForm.remark"
            :placeholder="$t('WithdrawAudit.Dialog.RemarkPlaceholder')"
            type="textarea"
            :rows="2"
            maxlength="128"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="passDialogVisible = false">{{ $t('Common.Cancel') }}</el-button>
        <el-button type="primary" :loading="submitting" @click="submitPass">
          {{ $t('WithdrawAudit.Actions.ConfirmPass') }}
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="rejectDialogVisible"
      :title="$t('WithdrawAudit.Dialog.RejectTitle')"
      width="500px"
      align-center
      :close-on-click-modal="false"
    >
      <el-form :model="rejectForm" label-width="120px">
        <el-form-item :label="$t('WithdrawAudit.Dialog.OrderId')">
          <span style="font-family: monospace;">{{ rejectForm.order_id }}</span>
        </el-form-item>
        <el-form-item :label="$t('WithdrawAudit.Dialog.UserId')">
          <span>{{ rejectForm.user_id }}</span>
        </el-form-item>
        <el-form-item :label="$t('WithdrawAudit.Dialog.ToAddress')">
          <span style="font-family: monospace;">{{ rejectForm.to_addr }}</span>
        </el-form-item>
        <el-form-item :label="$t('WithdrawAudit.Dialog.InputAmount')">
          <span style="color:#F56C6C;font-weight:bold;">{{ rejectForm.input_amount }}</span>
          <span style="margin-left:12px;color:#909399;font-size:12px;">
            ({{ $t('WithdrawAudit.Dialog.NetHint') }})
          </span>
        </el-form-item>
        <el-form-item :label="$t('WithdrawAudit.Dialog.Amount')">
          <span style="color:#E6A23C;font-weight:bold;">{{ rejectForm.amount }}</span>
        </el-form-item>
        <el-alert
          :title="$t('WithdrawAudit.Dialog.RejectHint')"
          type="error"
          :closable="false"
          show-icon
          style="margin-bottom: 12px;"
        />
        <el-form-item :label="$t('WithdrawAudit.Dialog.Remark')">
          <el-input
            v-model.trim="rejectForm.remark"
            :placeholder="$t('WithdrawAudit.Dialog.RejectRemarkPlaceholder')"
            type="textarea"
            :rows="2"
            maxlength="128"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="rejectDialogVisible = false">{{ $t('Common.Cancel') }}</el-button>
        <el-button type="danger" :loading="submitting" @click="submitReject">
          {{ $t('WithdrawAudit.Actions.ConfirmReject') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getWithdrawPendingListApi, auditWithdrawApi } from '@/api/dezhou/transferManagement'
import { formatDate } from '@/utils/format'
import TableSkeleton from '@/components/tableSkeleton/index.vue'
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'

defineOptions({
  name: 'WithdrawAudit'
})

const { t } = useI18n()

const elSearchFormRef = ref()
const loading = ref(false)
const submitting = ref(false)
const limit = ref(200)
const tableData = ref([])
const searchInfo = ref({
  limit: 200
})

const tronWalletAddress = ref('')
const tronConnecting = ref(false)

const tronWalletButtonText = computed(() => {
  if (!tronWalletAddress.value) return t('WithdrawAudit.Wallet.Connect')
  const addr = tronWalletAddress.value
  if (addr.length <= 10) return addr
  return addr.substring(0, 6) + '...' + addr.substring(addr.length - 4)
})

const summary = computed(() => {
  let input = 0
  let net = 0
  for (const row of tableData.value) {
    const ia = Number(row.input_amount ?? row.InputAmount ?? row.Input_amount ?? 0)
    const na = Number(row.amount ?? row.Amount ?? 0)
    input += (!Number.isFinite(ia) || ia < 0) ? 0 : ia
    net += (!Number.isFinite(na) || na < 0) ? 0 : na
  }
  return {
    inputAmount: input,
    netAmount: net,
    feeAmount: Math.max(0, input - net)
  }
})

const passDialogVisible = ref(false)
const rejectDialogVisible = ref(false)
const passForm = ref({
  order_id: '',
  user_id: '',
  to_addr: '',
  input_amount: '',
  amount: '',
  tx_hash: '',
  remark: ''
})
const rejectForm = ref({
  order_id: '',
  user_id: '',
  to_addr: '',
  input_amount: '',
  amount: '',
  remark: ''
})

const shortTronAddress = (addr) => {
  if (!addr) return ''
  if (addr.length <= 10) return addr
  return addr.substring(0, 6) + '...' + addr.substring(addr.length - 4)
}

const isValidTronAddress = (addr) => {
  return typeof addr === 'string' && addr.length >= 30 && addr.charAt(0) === 'T'
}

const extractAddressFromResponse = (res) => {
  if (!res) return ''
  if (isValidTronAddress(res)) return res
  if (Array.isArray(res) && res.length > 0) {
    const found = res.find(a => isValidTronAddress(a))
    if (found) return found
  }
  if (typeof res === 'object') {
    const candidates = [
      res.address,
      res.base58,
      res.data,
      res.result,
      res.value,
      res.message && res.message.data,
      res.message && res.message.data && res.message.data[0]
    ]
    for (const c of candidates) {
      if (isValidTronAddress(c)) return c
      if (Array.isArray(c)) {
        const found = c.find(a => isValidTronAddress(a))
        if (found) return found
      }
    }
  }
  return ''
}

const getTronWebInstance = () => {
  if (typeof window === 'undefined') return null
  const tronLink = window.tronLink
  let tronWeb = window.tronWeb
  if (tronLink && tronLink.tronWeb) tronWeb = tronLink.tronWeb
  return tronWeb
}

const getAddressFromTronWeb = (tronWeb) => {
  if (!tronWeb) return ''
  const candidates = [
    tronWeb.defaultAddress && tronWeb.defaultAddress.base58,
    tronWeb.defaultAddress && tronWeb.defaultAddress.hex,
    tronWeb.selectedAddress,
    tronWeb.address && tronWeb.address.base58
  ]
  for (const c of candidates) {
    if (isValidTronAddress(c)) return c
  }
  return ''
}

const checkTronWebReady = () => {
  return new Promise((resolve) => {
    let times = 0
    const timer = setInterval(() => {
      times++
      const tw = getTronWebInstance()
      const addr = getAddressFromTronWeb(tw)
      if (addr) {
        clearInterval(timer)
        resolve(addr)
        return
      }
      if (times >= 40) {
        clearInterval(timer)
        resolve('')
      }
    }, 200)
  })
}

const connectTronWallet = async () => {
  if (typeof window === 'undefined') {
    ElMessage.error(t('WithdrawAudit.Wallet.EnvError'))
    return
  }

  let tronWeb = getTronWebInstance()
  const tronLink = window.tronLink

  if (!tronWeb && !tronLink) {
    ElMessage({
      type: 'warning',
      message: t('WithdrawAudit.Wallet.NotFound'),
      duration: 5000
    })
    window.open('https://www.tokenpocket.pro/', '_blank')
    return
  }

  tronConnecting.value = true
  try {
    let addr = getAddressFromTronWeb(tronWeb)
    if (addr) {
      tronWalletAddress.value = addr
      ElMessage.success(t('WithdrawAudit.Wallet.Connected') + '：' + shortTronAddress(addr))
      return
    }

    if (tronLink && typeof tronLink.request === 'function') {
      try {
        const res = await tronLink.request({ method: 'tron_requestAccounts' })
        console.log('[TronLink] tron_requestAccounts response:', res)
        const addrFromRes = extractAddressFromResponse(res)
        if (addrFromRes) {
          tronWalletAddress.value = addrFromRes
          ElMessage.success(t('WithdrawAudit.Wallet.Connected') + '：' + shortTronAddress(addrFromRes))
          return
        }
      } catch (reqErr) {
        console.warn('[TronLink] request error:', reqErr)
      }
    }

    if (tronLink && typeof tronLink.enable === 'function') {
      try {
        const res = await tronLink.enable()
        console.log('[TronLink] tronLink.enable response:', res)
        const addrFromRes = extractAddressFromResponse(res)
        if (addrFromRes) {
          tronWalletAddress.value = addrFromRes
          ElMessage.success(t('WithdrawAudit.Wallet.Connected') + '：' + shortTronAddress(addrFromRes))
          return
        }
      } catch (enErr) {
        console.warn('[TronLink] enable error:', enErr)
      }
    }

    tronWeb = getTronWebInstance()
    addr = getAddressFromTronWeb(tronWeb)
    if (addr) {
      tronWalletAddress.value = addr
      ElMessage.success(t('WithdrawAudit.Wallet.Connected') + '：' + shortTronAddress(addr))
      return
    }

    const polledAddr = await checkTronWebReady()
    if (polledAddr) {
      tronWalletAddress.value = polledAddr
      ElMessage.success(t('WithdrawAudit.Wallet.Connected') + '：' + shortTronAddress(polledAddr))
      return
    }

    if (tronWeb && typeof tronWeb.trx && typeof tronWeb.trx.getAccount === 'function') {
      try {
        const acct = await tronWeb.trx.getAccount()
        if (acct && acct.address) {
          let base58 = acct.address
          if (typeof base58 !== 'string' && acct.address.base58) base58 = acct.address.base58
          if (isValidTronAddress(base58)) {
            tronWalletAddress.value = base58
            ElMessage.success(t('WithdrawAudit.Wallet.Connected') + '：' + shortTronAddress(base58))
            return
          }
        }
      } catch (_) { /* ignore */ }
    }

    ElMessage.warning(t('WithdrawAudit.Wallet.Failed'))
  } catch (err) {
    console.error('[TronLink] 连接错误：', err)
    ElMessage.error(t('WithdrawAudit.Wallet.Error') + '：' + (err?.message || t('WithdrawAudit.Wallet.Unknown')))
  } finally {
    tronConnecting.value = false
  }
}

const buildTronSend = async () => {
  const tw = getTronWebInstance()
  if (!tw) {
    ElMessage.warning(t('WithdrawAudit.Wallet.NotFound'))
    return
  }
  if (!isValidTronAddress(passForm.value.to_addr)) {
    ElMessage.error(t('WithdrawAudit.Dialog.InvalidAddress'))
    return
  }
  const amountNum = Number(passForm.value.amount)
  if (!amountNum || amountNum <= 0) {
    ElMessage.error(t('WithdrawAudit.Dialog.InvalidAmount'))
    return
  }
  try {
    const amountSun = tw.toSun(String(amountNum))
    const tx = await tw.trx.sendTransaction(passForm.value.to_addr, amountSun)
    if (tx && tx.txID) {
      passForm.value.tx_hash = tx.txID
      ElMessage.success(t('WithdrawAudit.Dialog.SendSuccess') + tx.txID)
    } else {
      ElMessage.warning(t('WithdrawAudit.Dialog.SendNoTx'))
    }
  } catch (e) {
    console.error('[TRON] sendTransaction error:', e)
    ElMessage.error(t('WithdrawAudit.Dialog.SendFail') + '：' + (e?.message || t('WithdrawAudit.Wallet.Unknown')))
  }
}

const onReset = () => {
  searchInfo.value = {
    limit: 200
  }
  getTableData()
}

const handleSelectionChange = (val) => {}

const normalizeRow = (row) => {
  if (!row || typeof row !== 'object') return row
  const g = (keys) => {
    for (const k of keys) {
      if (row[k] !== undefined && row[k] !== null && row[k] !== '') return row[k]
    }
    return ''
  }
  return {
    ...row,
    order_id: g(['order_id', 'OrderId', 'orderId', 'OrderID']),
    user_id: g(['user_id', 'UserId', 'userId', 'UserID', 'Userid']),
    to_addr: g(['to_addr', 'ToAddr', 'toAddr', 'ToAddress']),
    input_amount: g(['input_amount', 'InputAmount', 'inputAmount']),
    amount: g(['amount', 'Amount']),
    create_time: g(['create_time', 'CreateTime', 'Createtime', 'createdAt', 'CreatedAt']),
    remark: g(['remark', 'Remark', 'msg', 'Msg', 'desc', 'Desc'])
  }
}

const computeFee = (row) => {
  if (!row) return '0'
  const input = Number(row.input_amount ?? 0)
  const net = Number(row.amount ?? 0)
  if (Number.isFinite(input) && Number.isFinite(net) && input >= net) {
    return (input - net).toFixed(2)
  }
  return '0'
}

const getTableData = async () => {
  loading.value = true
  const params = {
    limit: searchInfo.value.limit || 200
  }
  try {
    const table = await getWithdrawPendingListApi(params)
    if (table.code === 0) {
      const d = table.data || {}
      const rawList = Array.isArray(d.list) ? d.list : (Array.isArray(d) ? d : [])
      tableData.value = rawList.map(normalizeRow)
      limit.value = tableData.value.length
    } else {
      tableData.value = []
    }
  } finally {
    loading.value = false
  }
}

const copyToClipboard = async (text) => {
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
    ElMessage.success(t('WithdrawAudit.Actions.CopyOk'))
  } catch (e) {
    ElMessage.error(t('WithdrawAudit.Actions.CopyFail') + '：' + (e?.message || ''))
  }
}

const openPassDialog = (rawRow) => {
  const row = normalizeRow(rawRow)
  passForm.value = {
    order_id: row.order_id || '',
    user_id: row.user_id || '',
    to_addr: row.to_addr || '',
    input_amount: row.input_amount || '',
    amount: row.amount || '',
    tx_hash: '',
    remark: ''
  }
  passDialogVisible.value = true
}

const openRejectDialog = (rawRow) => {
  const row = normalizeRow(rawRow)
  rejectForm.value = {
    order_id: row.order_id || '',
    user_id: row.user_id || '',
    to_addr: row.to_addr || '',
    input_amount: row.input_amount || '',
    amount: row.amount || '',
    remark: ''
  }
  rejectDialogVisible.value = true
}

const submitPass = async () => {
  if (!passForm.value.order_id) {
    ElMessage.error(t('WithdrawAudit.Dialog.MissingOrderId'))
    return
  }
  if (!passForm.value.tx_hash || !passForm.value.tx_hash.trim()) {
    ElMessage.error(t('WithdrawAudit.Dialog.MissingTxHash'))
    return
  }
  try {
    await ElMessageBox.confirm(
      t('WithdrawAudit.Dialog.PassConfirm'),
      t('Common.Hint'),
      { type: 'warning', confirmButtonText: t('Common.Confirm'), cancelButtonText: t('Common.Cancel') }
    )
  } catch (_) {
    return
  }
  submitting.value = true
  try {
    const body = {
      order_id: passForm.value.order_id,
      result: 1,
      tx_hash: passForm.value.tx_hash.trim()
    }
    if (passForm.value.remark && passForm.value.remark.trim()) {
      body.remark = passForm.value.remark.trim()
    }
    const res = await auditWithdrawApi(body)
    if (res.code === 0) {
      ElMessage.success(t('WithdrawAudit.Dialog.PassSuccess'))
      passDialogVisible.value = false
      getTableData()
    } else {
      ElMessage.error(res.msg || res.message || t('WithdrawAudit.Dialog.PassFail'))
    }
  } catch (e) {
    ElMessage.error(t('WithdrawAudit.Dialog.PassFail') + '：' + (e?.message || ''))
  } finally {
    submitting.value = false
  }
}

const submitReject = async () => {
  if (!rejectForm.value.order_id) {
    ElMessage.error(t('WithdrawAudit.Dialog.MissingOrderId'))
    return
  }
  try {
    await ElMessageBox.confirm(
      t('WithdrawAudit.Dialog.RejectConfirm'),
      t('Common.Hint'),
      { type: 'error', confirmButtonText: t('Common.Confirm'), cancelButtonText: t('Common.Cancel') }
    )
  } catch (_) {
    return
  }
  submitting.value = true
  try {
    const body = {
      order_id: rejectForm.value.order_id,
      result: 2
    }
    if (rejectForm.value.remark && rejectForm.value.remark.trim()) {
      body.remark = rejectForm.value.remark.trim()
    }
    const res = await auditWithdrawApi(body)
    if (res.code === 0) {
      ElMessage.success(t('WithdrawAudit.Dialog.RejectSuccess'))
      rejectDialogVisible.value = false
      getTableData()
    } else {
      ElMessage.error(res.msg || res.message || t('WithdrawAudit.Dialog.RejectFail'))
    }
  } catch (e) {
    ElMessage.error(t('WithdrawAudit.Dialog.RejectFail') + '：' + (e?.message || ''))
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  getTableData()
})
</script>

<style scoped>
.gva-search-box {
  margin-bottom: 20px;
}

.gva-btn-list {
  margin-bottom: 10px;
}
</style>
