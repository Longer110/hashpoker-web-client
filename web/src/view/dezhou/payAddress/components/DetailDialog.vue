<template>
  <el-drawer v-model="visible" size="60%" :before-close="handleClose">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg">{{ t('PayAddress.Dialog.DetailTitle') }}</span>
        <div>
          <el-button @click="handleClose">{{ $t('Common.Close') }}</el-button>
        </div>
      </div>
    </template>

    <div v-loading="loading">
      <el-divider content-position="center">
        <span class="divider-title">{{ t('PayAddress.Detail.Sections.BasicInfo') }}</span>
      </el-divider>

      <el-descriptions :column="2" border>
        <el-descriptions-item :label="t('PayAddress.Table.Id')">{{ detail?.id }}</el-descriptions-item>
        <el-descriptions-item :label="t('PayAddress.Table.Idx')">{{ detail?.idx }}</el-descriptions-item>
        <el-descriptions-item :label="t('PayAddress.Table.Address')" :span="2">
          <code style="word-break: break-all">{{ detail?.address }}</code>
        </el-descriptions-item>
        <el-descriptions-item :label="t('PayAddress.Table.Source')">{{ sourceText }}</el-descriptions-item>
        <el-descriptions-item :label="t('PayAddress.Table.State')">
          <el-tag :type="stateTagType">{{ stateText }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item :label="t('PayAddress.Table.Chargeable')">
          {{ detail?.chargeable ? t('PayAddress.YesNo.Yes') : t('PayAddress.YesNo.No') }}
        </el-descriptions-item>
        <el-descriptions-item :label="t('PayAddress.Table.UserId')">{{ detail?.userId || '-' }}</el-descriptions-item>
        <el-descriptions-item :label="t('PayAddress.Table.UserText')" :span="2">{{ detail?.userText || '-' }}</el-descriptions-item>
        <el-descriptions-item :label="t('PayAddress.Table.AssignTime')">{{ detail?.assignTime || '-' }}</el-descriptions-item>
        <el-descriptions-item :label="t('PayAddress.Table.ExpireTime')">{{ detail?.expireTime || '-' }}</el-descriptions-item>
        <el-descriptions-item :label="t('PayAddress.Table.CreateTime')" :span="2">{{ detail?.createTime || '-' }}</el-descriptions-item>
      </el-descriptions>

      <el-divider content-position="center">
        <span class="divider-title">{{ t('PayAddress.Detail.Sections.Leases') }}</span>
      </el-divider>

      <el-table :data="leases" border stripe style="width: 100%">
        <el-table-column type="index" :label="t('PayAddress.Table.Index')" width="70" align="center" />
        <el-table-column prop="id" :label="t('PayAddress.Detail.Leases.Id')" min-width="100" align="center" />
        <el-table-column prop="userId" :label="t('PayAddress.Detail.Leases.UserId')" min-width="100" align="center" />
        <el-table-column prop="leaseStart" :label="t('PayAddress.Detail.Leases.LeaseStart')" min-width="180" align="center" />
        <el-table-column prop="leaseEnd" :label="t('PayAddress.Detail.Leases.LeaseEnd')" min-width="180" align="center" />
        <el-table-column prop="createdAt" :label="t('PayAddress.Detail.Leases.CreatedAt')" min-width="180" align="center" />
        <template #empty>
          <el-empty description="" />
        </template>
      </el-table>
    </div>
  </el-drawer>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'
  import { findPayAddressApi } from '@/api/dezhou/payAddress'
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    rowId: {
      type: Number,
      default: null
    }
  })

  const emit = defineEmits(['update:modelValue', 'close'])
  const { t } = useI18n()

  const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })

  const loading = ref(false)
  const detail = ref(null)
  const leases = ref([])

  const stateText = computed(() => {
    const s = detail.value?.state
    const map = {
      0: t('PayAddress.State.Idle'),
      1: t('PayAddress.State.Occupied'),
      2: t('PayAddress.State.Cooling'),
      3: t('PayAddress.State.ToRecycle')
    }
    return map[s] ?? '-'
  })

  const stateTagType = computed(() => {
    const s = detail.value?.state
    const map = {
      0: 'success',
      1: 'warning',
      2: 'info',
      3: 'danger'
    }
    return map[s] ?? 'info'
  })

  const sourceText = computed(() => {
    const s = detail.value?.source
    if (s === 'import') return t('PayAddress.AddForm.SourceOptions.Import')
    if (s === 'legacy') return t('PayAddress.AddForm.SourceOptions.Legacy')
    return detail.value?.source || '-'
  })

  const fetchDetail = async () => {
    if (!props.rowId) return
    loading.value = true
    try {
      const res = await findPayAddressApi({ id: props.rowId })
      if (res.code === 0) {
        detail.value = res.data?.item || null
        leases.value = res.data?.item?.leases || []
      }
    } finally {
      loading.value = false
    }
  }

  const handleClose = () => {
    detail.value = null
    leases.value = []
    emit('update:modelValue', false)
    emit('close')
  }

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        fetchDetail()
      }
    }
  )

  defineExpose({ fetchDetail })
</script>

<style lang="scss" scoped>
  .flex {
    display: flex;
  }
  .justify-between {
    justify-content: space-between;
  }
  .items-center {
    align-items: center;
  }
  .text-lg {
    font-size: 18px;
  }
  .divider-title {
    color: #409eff;
    font-size: 16px;
    font-weight: 600;
  }
</style>
