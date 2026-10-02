<template>
  <el-drawer v-model="visible" :size="drawerSize" :before-close="handleClose" :show-close="false">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg">{{ headerTitle }}</span>
        <div>
          <!-- 关闭 -->
          <el-button @click="handleClose">{{ $t('Common.Close') }}</el-button>
        </div>
      </div>
    </template>

    <el-descriptions :column="2" border>
      <!-- 牌桌名称 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.TableName')" label-class-name="detail-label">
        {{ detailData.sTableName || '-' }}
      </el-descriptions-item>
      <!-- 分组 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.GroupId')" label-class-name="detail-label">
        {{ getGroupName(detailData.nGroupId) || '-' }}
      </el-descriptions-item>
      <!-- 游戏 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.Game')" label-class-name="detail-label">
        {{ getGameName(detailData.nGameId) || '-' }}
      </el-descriptions-item>
      <!-- 金币类型 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.GoldType')" label-class-name="detail-label">
        {{ formatGoldType(detailData.nGoldType) }}
      </el-descriptions-item>
      <!-- 开桌数量 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.OpenCount')" label-class-name="detail-label">
        {{ detailData.nOpenCount || 0 }}
      </el-descriptions-item>
      <!-- 房间时长 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.KeepTime')" label-class-name="detail-label">
        {{ formatKeepTime(detailData.nKeepTime) }}
      </el-descriptions-item>
      <!-- 超时自动续开 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.AutoContinue')" label-class-name="detail-label">
        <el-tag :type="detailData.isAutomatic ? 'success' : 'info'" size="small">
          <!-- 是/否 -->
          {{ detailData.isAutomatic ? $t('HallTableDialog.Switch.Yes') : $t('HallTableDialog.Switch.No') }}
        </el-tag>
      </el-descriptions-item>
      <!-- 自动开始 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.AutoStart')" label-class-name="detail-label">
        <el-tag :type="detailData.IsOpen ? 'success' : 'info'" size="small">
          <!-- 是/否 -->
          {{ detailData.IsOpen ? $t('HallTableDialog.Switch.Yes') : $t('HallTableDialog.Switch.No') }}
        </el-tag>
      </el-descriptions-item>
      <!-- 实时音视频 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.RealtimeAV')" label-class-name="detail-label">
        <el-tag :type="detailData.isVideoFee ? 'success' : 'info'" size="small">
          <!-- 开启/关闭 -->
          {{ detailData.isVideoFee ? $t('HallTableDialog.Switch.Enable') : $t('HallTableDialog.Switch.Disable') }}
        </el-tag>
      </el-descriptions-item>
      <!-- 语音收费(U/分钟) -->
      <el-descriptions-item
        :label="$t('HallTableDetail.Fields.VoiceFee')"
        label-class-name="detail-label"
        v-if="detailData.isVideoFee"
      >
        {{ detailData.nVideoFee || 0 }}
      </el-descriptions-item>
      <!-- 私人房(密码房) -->
      <el-descriptions-item :label="$t('HallTableDialog.Fields.PrivateRoom.Label')" label-class-name="detail-label">
        <el-tag :type="detailData.nIsPerson === 1 ? 'success' : 'info'" size="small">
          {{ detailData.nIsPerson === 1 ? $t('HallTableDialog.Switch.Yes') : $t('HallTableDialog.Switch.No') }}
        </el-tag>
      </el-descriptions-item>
      <!-- 大厅可见 -->
      <el-descriptions-item
        :label="$t('HallTableDialog.Fields.PrivateRoom.ShowInLobby')"
        label-class-name="detail-label"
        v-if="detailData.nIsPerson === 1"
      >
        <el-tag :type="detailData.nIsShow === 1 ? 'success' : 'info'" size="small">
          {{ detailData.nIsShow === 1 ? $t('HallTableDialog.Switch.Yes') : $t('HallTableDialog.Switch.No') }}
        </el-tag>
      </el-descriptions-item>
      <!-- 进房密码 -->
      <el-descriptions-item
        :label="$t('HallTableDialog.Fields.PrivateRoom.Password')"
        label-class-name="detail-label"
        v-if="detailData.nIsPerson === 1"
      >
        {{ detailData.sPassWord || '-' }}
      </el-descriptions-item>
    </el-descriptions>

    <el-divider content-position="center">
      <!-- 德州配置 -->
      <p class="text-center font-medium">{{ $t('HallTableDetail.Sections.TexasConfig') }}</p>
    </el-divider>

    <el-descriptions :column="2" border>
      <!-- 庄家倍数 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.DealerMultiple')" label-class-name="detail-label">
        {{ detailData.preAnteOdd || 0 }}
      </el-descriptions-item>
      <!-- 前注 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.PreAnte')" label-class-name="detail-label">
        {{ detailData.nPreAnte || 0 }}
      </el-descriptions-item>
      <!-- 小盲 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.SmallBlind')" label-class-name="detail-label">
        {{ detailData.nSmallBlind || 0 }}
      </el-descriptions-item>
      <!-- 大盲 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.BigBlind')" label-class-name="detail-label">
        {{ detailData.nBigBlind || 0 }}
      </el-descriptions-item>
      <!-- 牌桌人数 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.Capacity')" label-class-name="detail-label">
        {{ detailData.nCapacity || 0 }} {{ $t('HallTableDetail.Unit.Person') }}
      </el-descriptions-item>
      <!-- 自动开始人数 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.AutoStartPlayers')" label-class-name="detail-label">
        {{ detailData.nPlayerCnt || 0 }} {{ $t('HallTableDetail.Unit.Person') }}
      </el-descriptions-item>
      <!-- 最小买入 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.MinBuyIn')" label-class-name="detail-label">
        {{ detailData.nMinTabkeInBB || 0 }}
      </el-descriptions-item>
      <!-- 最大买入 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.MaxBuyIn')" label-class-name="detail-label">
        {{ detailData.nMaxTabkeInBB || 0 }}
      </el-descriptions-item>
      <!-- 入池率 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.PoolEntryRate')" label-class-name="detail-label">
        {{ detailData.nPoolEntryRate || 0 }}%
      </el-descriptions-item>
      <!-- 入池率忽略手数 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.PoolEntryRateHands')" label-class-name="detail-label">
        {{ detailData.nPoolEntryRateHands || 0 }}
      </el-descriptions-item>
      <!-- 止损上限 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.StopLoss')" label-class-name="detail-label">
        <el-tag :type="detailData.nLoseMaxAmount > 0 ? 'success' : 'info'" size="small">
          <!-- 开启/关闭 -->
          {{ detailData.nLoseMaxAmount > 0 ? $t('HallTableDialog.Switch.Enable') : $t('HallTableDialog.Switch.Disable') }}
        </el-tag>
      </el-descriptions-item>
      <!-- 输钱限制金额 -->
      <el-descriptions-item
        :label="$t('HallTableDetail.Fields.LossAmount')"
        label-class-name="detail-label"
        v-if="detailData.nLoseMaxAmount > 0"
      >
        {{ detailData.nLoseMaxAmount || 0 }}
      </el-descriptions-item>
      <!-- 是否可撤码 -->
      <el-descriptions-item
        :label="$t('HallTableDetail.Fields.AllowTakeOut')"
        label-class-name="detail-label"
        v-if="detailData.nGameId === 175"
      >
        <el-tag :type="detailData.isTabkeOut ? 'success' : 'info'" size="small">
          <!-- 开启/关闭 -->
          {{ detailData.isTabkeOut ? $t('HallTableDialog.Switch.Enable') : $t('HallTableDialog.Switch.Disable') }}
        </el-tag>
      </el-descriptions-item>
      <!-- 撤码倍数 -->
      <el-descriptions-item
        :label="$t('HallTableDetail.Fields.TakeOutMultiplier')"
        label-class-name="detail-label"
        v-if="detailData.isTabkeOut && detailData.nGameId === 175"
      >
        {{ detailData.nTabkeOutOdd || 0 }}
      </el-descriptions-item>
      <!-- 手数限制 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.HandLimit')" label-class-name="detail-label">
        <el-tag :type="detailData.nPoolHands > 0 ? 'success' : 'info'" size="small">
          <!-- 开启/关闭 -->
          {{ detailData.nPoolHands > 0 ? $t('HallTableDialog.Switch.Enable') : $t('HallTableDialog.Switch.Disable') }}
        </el-tag>
      </el-descriptions-item>
      <!-- 手数限制值 -->
      <el-descriptions-item
        :label="$t('HallTableDetail.Fields.HandLimitValue')"
        label-class-name="detail-label"
        v-if="detailData.nPoolHands > 0"
      >
        {{ detailData.nPoolHands || 0 }}
      </el-descriptions-item>
      <!-- 强制抓头 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.ForceBlind')" label-class-name="detail-label" v-if="showForceZhuaTou">
        <el-tag :type="detailData.isForceBlind ? 'success' : 'info'" size="small">
          <!-- 是/否 -->
          {{ detailData.isForceBlind ? $t('HallTableDialog.Switch.Yes') : $t('HallTableDialog.Switch.No') }}
        </el-tag>
      </el-descriptions-item>
      <!-- 抓头数额 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.ZhuaTouAmount')" label-class-name="detail-label">
        {{ detailData.nZhuaTou || 0 }}
      </el-descriptions-item>
    </el-descriptions>

    <el-divider content-position="center">
      <!-- 抽水设置 -->
      <p class="text-center font-medium">{{ $t('HallTableDetail.Sections.RakeSettings') }}</p>
    </el-divider>

    <el-descriptions :column="2" border>
      <!-- 抽水方式 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.RakeMethod')" label-class-name="detail-label">
        {{ formatModeType(detailData.nComputeMode) }}
      </el-descriptions-item>
      <!-- 抽水类型 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.RakeType')" label-class-name="detail-label">
        {{ formatComputeMode(detailData.nModeType) }}
      </el-descriptions-item>
      <!-- 服务费比例 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.ServiceRate')" label-class-name="detail-label">
        {{ detailData.nTaxRate || 0 }}%
      </el-descriptions-item>
      <!-- 每手抽佣封顶 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.TopLimit')" label-class-name="detail-label">
        {{ detailData.nTopLimitBB || 0 }}
      </el-descriptions-item>
      <!-- 触发抽佣底池 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.TriggerPot')" label-class-name="detail-label">
        {{ detailData.nLimitBB || 0 }}
      </el-descriptions-item>
    </el-descriptions>

    <el-divider content-position="center">
      <!-- 看牌设置 -->
      <p class="text-center font-medium">{{ $t('HallTableDetail.Sections.CardSettings') }}</p>
    </el-divider>

    <el-descriptions :column="2" border>
      <!-- 付费看公牌 -->
      <el-descriptions-item :label="$t('HallTableDialog.CardConfig.Public')" label-class-name="detail-label">
        <el-tag :type="getCardConfigOpen(0) ? 'success' : 'info'" size="small">
          <!-- 开启/关闭 -->
          {{ getCardConfigOpen(0) ? $t('HallTableDialog.Switch.Enable') : $t('HallTableDialog.Switch.Disable') }}
        </el-tag>
      </el-descriptions-item>
      <!-- 付费看公牌额度 -->
      <el-descriptions-item
        :label="$t('HallTableDialog.CardConfig.PublicCost')"
        label-class-name="detail-label"
        v-if="getCardConfigOpen(0)"
      >
        {{ getCardConfigCost(0) || 0 }}
      </el-descriptions-item>
      <!-- 付费看手牌 -->
      <el-descriptions-item :label="$t('HallTableDialog.CardConfig.Hand')" label-class-name="detail-label">
        <el-tag :type="getCardConfigOpen(1) ? 'success' : 'info'" size="small">
          <!-- 开启/关闭 -->
          {{ getCardConfigOpen(1) ? $t('HallTableDialog.Switch.Enable') : $t('HallTableDialog.Switch.Disable') }}
        </el-tag>
      </el-descriptions-item>
      <!-- 付费看手牌额度 -->
      <el-descriptions-item
        :label="$t('HallTableDialog.CardConfig.HandCost')"
        label-class-name="detail-label"
        v-if="getCardConfigOpen(1)"
      >
        {{ getCardConfigCost(1) || 0 }}
      </el-descriptions-item>
      <!-- 付费切牌 -->
      <el-descriptions-item :label="$t('HallTableDialog.CardConfig.Cut')" label-class-name="detail-label">
        <el-tag :type="getCardConfigOpen(2) ? 'success' : 'info'" size="small">
          <!-- 开启/关闭 -->
          {{ getCardConfigOpen(2) ? $t('HallTableDialog.Switch.Enable') : $t('HallTableDialog.Switch.Disable') }}
        </el-tag>
      </el-descriptions-item>
      <!-- 付费切牌额度 -->
      <el-descriptions-item
        :label="$t('HallTableDialog.CardConfig.CutCost')"
        label-class-name="detail-label"
        v-if="getCardConfigOpen(2)"
      >
        {{ getCardConfigCost(2) || 0 }}
      </el-descriptions-item>
      <!-- 延迟看牌 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.DelayLook')" label-class-name="detail-label">
        <el-tag :type="detailData.isDelayLook ? 'success' : 'info'" size="small">
          <!-- 是/否 -->
          {{ detailData.isDelayLook ? $t('HallTableDialog.Switch.Yes') : $t('HallTableDialog.Switch.No') }}
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </el-drawer>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAppStore } from '@/pinia'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    groupOptions: {
      type: Array,
      default: () => []
    }
  })

  const emit = defineEmits(['update:modelValue', 'close'])

  const appStore = useAppStore()
  const { t } = useI18n()

  const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })

  const drawerSize = computed(() => appStore.drawerSize)
  const headerTitle = computed(() => props.title || t('HallTableConfig.Dialog.DetailTitle'))

  const detailData = ref({})

  const showForceZhuaTou = computed(() => {
    // 短牌且前注开启时不显示
    if (detailData.value.nGameId === 175 && detailData.value.nPreAnte !== 0) {
      return false
    }
    return true
  })

  const getGroupName = (groupId) => {
    const group = props.groupOptions.find((item) => item.GroupId === groupId)
    return group ? group.GroupName : groupId
  }

  const getGameName = (gameId) => {
    const gameMap = {
      125: 'HallTableDialog.Options.Game.Texas',
      175: 'HallTableDialog.Options.Game.Short'
    }
    const key = gameMap[gameId]
    return key ? t(key) : gameId
  }

  const formatGoldType = (type) => {
    const typeMap = {
      1: 'USDT'
    }
    return typeMap[type] || type
  }

  const keepTimeKeyMap = {
    '-1': 'Forever',
    300: 'Minutes5',
    1800: 'Hours0_5',
    3600: 'Hours1',
    5400: 'Hours1_5',
    7200: 'Hours2',
    9000: 'Hours2_5',
    10800: 'Hours3',
    12600: 'Hours3_5',
    14400: 'Hours4',
    16200: 'Hours4_5',
    18000: 'Hours5'
  }

  const formatKeepTime = (time) => {
    const key = keepTimeKeyMap[time]
    if (key) {
      return t(`HallTableDetail.KeepTime.${key}`)
    }
    if (time === -1) {
      return t('HallTableDetail.KeepTime.Forever')
    }
    return t('HallTableDetail.KeepTime.Seconds', { value: time })
  }

  const formatModeType = (type) => {
    const keyMap = {
      0: 'HallTableList.ComputeMode.Pot',
      1: 'HallTableList.ComputeMode.Profit'
    }
    const key = keyMap[type]
    return key ? t(key) : type
  }

  const formatComputeMode = (mode) => {
    const modeMap = {
      0: 'HallTableList.ModeType.None',
      1: 'HallTableList.ModeType.Hand',
      3: 'HallTableList.ModeType.Round'
    }
    const key = modeMap[mode]
    return key ? t(key) : mode
  }

  // 获取看牌配置的开启状态
  const getCardConfigOpen = (index) => {
    if (!detailData.value.nTableCost || !Array.isArray(detailData.value.nTableCost)) {
      return false
    }
    return detailData.value.nTableCost[index]?.open === 1
  }

  // 获取看牌配置的费用
  const getCardConfigCost = (index) => {
    if (!detailData.value.nTableCost || !Array.isArray(detailData.value.nTableCost)) {
      return 0
    }
    return detailData.value.nTableCost[index]?.nCost || 0
  }

  const handleClose = () => {
    emit('update:modelValue', false)
    emit('close')
  }

  const open = (row) => {
    if (row && row.value) {
      try {
        // 解析 value 字段
        const data = typeof row.value === 'string' ? JSON.parse(row.value) : row.value

        // 合并基础信息和配置信息
        detailData.value = {
          sTableName: row.name,
          nGroupId: row.nGroupId,
          nGameId: row.nGameId,
          nOpenCount: data.nOpenCount,
          nGoldType: data.tRoomConfig?.nGoldType,
          nKeepTime: data.tRoomConfig?.nKeepTime,
          isAutomatic: data.isAutomatic,
          nSmallBlind: data.tRoomConfig?.nSmallBlind,
          nBigBlind: data.tRoomConfig?.nBigBlind,
          nPreAnte: data.tRoomConfig?.nPreAnte,
          nCapacity: data.tRoomConfig?.nCapacity,
          IsOpen: data.tRoomConfig?.tAutostart?.IsOpen,
          nPlayerCnt: data.tRoomConfig?.tAutostart?.nPlayerCnt,
          nMinTabkeInBB: data.tRoomConfig?.nMinTabkeInBB,
          nMaxTabkeInBB: data.tRoomConfig?.nMaxTabkeInBB,
          nPoolEntryRate: data.tRoomConfig?.nPoolEntryRate,
          nPoolEntryRateHands: data.tRoomConfig?.nPoolEntryRateHands,
          nLoseMaxAmount: data.tRoomConfig?.nLoseMaxAmount,
          nZhuaTou: data.tRoomConfig?.nZhuaTou,
          nModeType: data.tRoomConfig?.tDrawWaterMode?.nModeType,
          nTaxRate: data.tRoomConfig?.tDrawWaterMode?.nTaxRate,
          nTopLimitBB: data.tRoomConfig?.tDrawWaterMode?.nTopLimitBB,
          nLimitBB: row.nLimitBB,
          nComputeMode: data.tRoomConfig?.tDrawWaterMode?.nComputeMode,
          isDPreAnte: data.tRoomConfig?.isDPreAnte,
          isForceBlind: data.tRoomConfig?.nZhuaTou > 0,
          nTabkeOutOdd: data.tRoomConfig?.nTabkeOutOdd || 0,
          isTabkeOut: data.tRoomConfig?.isTabkeOut || false,
          isVideoFee: data.tRoomConfig?.nVideoFee > 0,
          nVideoFee: data.tRoomConfig?.nVideoFee || 0,
          nPoolHands: data.tRoomConfig?.nPoolHands || 0,
          nTableCost: data.tRoomConfig?.nTableCost || [],
          isDelayLook: data.tRoomConfig?.isDelayLook || false,
          preAnteOdd: data.tRoomConfig?.preAnteOdd || 0,
          nIsPerson: data.tRoomConfig?.nIsPerson || 0,
          sPassWord: (() => { try { return data.tRoomConfig?.sPassWord && data.tRoomConfig.sPassWord !== '' ? decodeURIComponent(escape(atob(data.tRoomConfig.sPassWord))) : (data.tRoomConfig?.sPassWord || '') } catch(e) { return data.tRoomConfig?.sPassWord || '' } })(),
          nIsShow: data.tRoomConfig?.nIsShow !== undefined ? data.tRoomConfig.nIsShow : 1
        }
      } catch (error) {
        console.error(t('HallTableDialog.Messages.DataParseError'), error)
      }
    }
    visible.value = true
  }

  defineExpose({
    open
  })
</script>

<style scoped lang="scss">
  :deep(.detail-label) {
    width: 200px;
    background-color: #f5f7fa;
    font-weight: 500;
  }

  :deep(.el-descriptions__label) {
    width: 200px;
  }

  :deep(.el-descriptions__content) {
    font-size: 14px;
  }
</style>
