<template>
  <el-drawer v-model="visible" size="50%" :before-close="handleClose" :show-close="false">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg">{{ t('PayAddress.Dialog.ConfigTitle') }}</span>
        <div>
          <el-button :loading="btnLoading" type="primary" @click="handleConfirm">{{ $t('Common.Confirm') }}</el-button>
          <el-button @click="handleClose">{{ $t('Common.Cancel') }}</el-button>
        </div>
      </div>
    </template>

    <el-form ref="formRef" :model="formData" label-width="180px" v-loading="loading">
      <el-form-item :label="t('PayAddress.Config.LeaseDuration')">
        <el-input-number
          v-model="formData.leaseDuration"
          :min="0"
          :placeholder="t('PayAddress.Config.LeaseDurationPlaceholder')"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item :label="t('PayAddress.Config.CoolDownDuration')">
        <el-input-number
          v-model="formData.coolDownDuration"
          :min="0"
          :placeholder="t('PayAddress.Config.CoolDownDurationPlaceholder')"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item :label="t('PayAddress.Config.MinIdleRatio')">
        <el-input-number
          v-model="formData.minIdleRatio"
          :min="0"
          :max="1"
          :step="0.01"
          :placeholder="t('PayAddress.Config.MinIdleRatioPlaceholder')"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item :label="t('PayAddress.Config.VerifyInterval')">
        <el-input-number
          v-model="formData.verifyInterval"
          :min="0"
          :placeholder="t('PayAddress.Config.VerifyIntervalPlaceholder')"
          style="width: 100%"
        />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
  import { ref, reactive, computed, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  import { getPayAddressConfigApi, updatePayAddressConfigApi } from '@/api/dezhou/payAddress'
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue', 'confirm', 'close'])
  const { t } = useI18n()

  const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })

  const loading = ref(false)
  const btnLoading = ref(false)
  const formRef = ref(null)

  const formData = reactive({
    leaseDuration: 0,
    coolDownDuration: 0,
    minIdleRatio: 0,
    verifyInterval: 0
  })

  const fetchConfig = async () => {
    loading.value = true
    try {
      const res = await getPayAddressConfigApi()
      if (res.code === 0 && res.data) {
        Object.assign(formData, res.data)
      }
    } finally {
      loading.value = false
    }
  }

  const resetForm = () => {
    formData.leaseDuration = 0
    formData.coolDownDuration = 0
    formData.minIdleRatio = 0
    formData.verifyInterval = 0
  }

  const handleClose = () => {
    resetForm()
    emit('update:modelValue', false)
    emit('close')
  }

  const handleConfirm = async () => {
    btnLoading.value = true
    try {
      const res = await updatePayAddressConfigApi({ ...formData })
      if (res.code === 0) {
        ElMessage.success(t('PayAddress.Messages.ConfigUpdateSuccess'))
        handleClose()
        emit('confirm')
      }
    } finally {
      btnLoading.value = false
    }
  }

  const open = () => {
    resetForm()
    fetchConfig()
    visible.value = true
  }

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        fetchConfig()
      }
    }
  )

  defineExpose({ open })
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
</style>
