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
      <!-- 模板名称 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.TemplateName')" label-class-name="detail-label">
        {{ detailData.name || '-' }}
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
      <!-- 补开数量 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.ContinuedNum')" label-class-name="detail-label">
        {{ detailData.nContinuedNum || 0 }}
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
      <!-- 输钱金额倍数 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.LossAmount')" label-class-name="detail-label">
        {{ detailData.nLoseMaxAmount || 0 }}
      </el-descriptions-item>
      <!-- 撤码倍数 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.TakeOutMultiplier')" label-class-name="detail-label">
        {{ detailData.nTabkeOutOdd || 0 }}
      </el-descriptions-item>
      <!-- 强制抓头 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.ForceBlind')" label-class-name="detail-label">
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
      <!-- 抽水模式 -->
      <p class="text-center font-medium">{{ $t('HallTableDetail.Sections.RakeSettings') }}</p>
    </el-divider>

    <el-descriptions :column="2" border>
      <!-- 抽水方式 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.RakeMethod')" label-class-name="detail-label">
        {{ formatComputeMode(detailData.nComputeMode) }}
      </el-descriptions-item>
      <!-- 抽水类型 -->
      <el-descriptions-item :label="$t('HallTableDetail.Fields.RakeType')" label-class-name="detail-label">
        {{ formatModeType(detailData.nModeType) }}
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
    1800: 'Minutes30',
    3600: 'Hours1',
    7200: 'Hours2',
    14400: 'Hours4',
    21600: 'Hours6',
    43200: 'Hours12',
    86400: 'Hours24'
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
    const modeMap = {
      0: 'HallTableList.ModeType.None',
      1: 'HallTableList.ModeType.Hand',
      3: 'HallTableList.ModeType.Round'
    }
    const key = modeMap[type]
    return key ? t(key) : type
  }

  const formatComputeMode = (mode) => {
    const computeMap = {
      0: 'HallTableList.ComputeMode.Pot',
      1: 'HallTableList.ComputeMode.Profit'
    }
    const key = computeMap[mode]
    return key ? t(key) : mode
  }

  const handleClose = () => {
    emit('update:modelValue', false)
    emit('close')
  }

  const open = (data = {}) => {
    detailData.value = { ...data }
    visible.value = true
  }

  defineExpose({
    open
  })
</script>

<style scoped lang="scss">
:deep(.detail-label) {
  width: 180px;
  background-color: #f5f7fa;
  font-weight: 500;
}

:deep(.el-descriptions__label) {
  width: 180px;
}

:deep(.el-descriptions__content) {
  font-size: 14px;
}
</style>

