<template>
  <el-drawer v-model="visible" size="60%" :before-close="handleClose" :show-close="false">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg">{{ title }}</span>
        <div>
          <el-button :loading="btnLoading" type="primary" @click="handleConfirm">{{ $t('Common.Confirm') }}</el-button>
          <el-button @click="handleClose">{{ $t('Common.Cancel') }}</el-button>
        </div>
      </div>
    </template>

    <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px">
      <template v-if="type === 'add'">
        <el-form-item :label="t('PayAddress.AddForm.Addresses')" prop="addressText">
          <el-input
            v-model="formData.addressText"
            type="textarea"
            :rows="8"
            :placeholder="t('PayAddress.AddForm.AddressesPlaceholder')"
          />
          <div class="mt-2" style="font-size: 12px; color: #909399">
            {{ t('PayAddress.AddForm.AddressesTip') }}
          </div>
          <div v-if="addressValidateInfo.total > 0" class="mt-2" style="font-size: 13px">
            {{
              t('PayAddress.Messages.AddressFormat', {
                total: addressValidateInfo.total,
                valid: addressValidateInfo.valid,
                invalid: addressValidateInfo.invalid
              })
            }}
          </div>
        </el-form-item>

        <el-form-item :label="t('PayAddress.AddForm.Source')" prop="source">
          <el-select
            v-model="formData.source"
            :placeholder="t('PayAddress.AddForm.SourcePlaceholder')"
            style="width: 100%"
            clearable
          >
            <el-option
              :label="t('PayAddress.AddForm.SourceOptions.Import')"
              value="import"
            />
            <el-option
              :label="t('PayAddress.AddForm.SourceOptions.Legacy')"
              value="legacy"
            />
          </el-select>
        </el-form-item>
      </template>

      <template v-else-if="type === 'edit'">
        <el-form-item :label="t('PayAddress.Table.Idx')" prop="idx">
          <el-input-number
            v-model="formData.idx"
            :min="0"
            :placeholder="t('PayAddress.EditForm.IdxPlaceholder')"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item :label="t('PayAddress.Table.Address')">
          <el-input v-model="formData.address" disabled />
        </el-form-item>
      </template>
    </el-form>
  </el-drawer>
</template>

<script setup>
  import { ref, reactive, computed } from 'vue'
  import { ElMessage } from 'element-plus'
  import { createPayAddressApi, updatePayAddressApi } from '@/api/dezhou/payAddress'
  import { useI18n } from 'vue-i18n'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'add'
    },
    rowData: {
      type: Object,
      default: () => ({})
    }
  })

  const emit = defineEmits(['update:modelValue', 'confirm', 'close'])
  const { t } = useI18n()

  const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })

  const formRef = ref(null)
  const btnLoading = ref(false)

  const formData = reactive({
    addressText: '',
    source: 'import',
    id: null,
    idx: 0,
    address: ''
  })

  const addressValidateInfo = computed(() => {
    if (!formData.addressText) return { total: 0, valid: 0, invalid: 0 }
    const lines = formData.addressText
      .split(/[\n,，]/)
      .map((s) => s.trim())
      .filter(Boolean)
    let valid = 0
    let invalid = 0
    lines.forEach((addr) => {
      if (addr.startsWith('T') && addr.length >= 30) {
        valid++
      } else {
        invalid++
      }
    })
    return { total: lines.length, valid, invalid }
  })

  const rules = computed(() => {
    if (props.type === 'add') {
      return {
        addressText: [
          {
            required: true,
            message: t('PayAddress.Messages.AddressesRequired'),
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              const info = addressValidateInfo.value
              if (info.valid === 0) {
                callback(new Error(t('PayAddress.Messages.AddressInvalid')))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
    return {
      idx: [
        {
          required: true,
          message: t('PayAddress.EditForm.IdxPlaceholder'),
          trigger: 'blur'
        }
      ]
    }
  })

  const resetForm = () => {
    formData.addressText = ''
    formData.source = 'import'
    formData.id = null
    formData.idx = 0
    formData.address = ''
    formRef.value?.resetFields()
  }

  const handleClose = () => {
    resetForm()
    emit('update:modelValue', false)
    emit('close')
  }

  const handleConfirm = async () => {
    if (!formRef.value) return
    try {
      await formRef.value.validate()
      btnLoading.value = true

      if (props.type === 'add') {
        const lines = formData.addressText
          .split(/[\n,，]/)
          .map((s) => s.trim())
          .filter(Boolean)
        const addresses = lines.filter((addr) => addr.startsWith('T') && addr.length >= 30)
        const data = { addresses }
        if (formData.source) data.source = formData.source
        const res = await createPayAddressApi(data)
        btnLoading.value = false
        if (res.code === 0) {
          const created = res.data?.created || 0
          const existed = res.data?.existed || 0
          const invalid = res.data?.invalid || 0
          ElMessage.success(t('PayAddress.Messages.AddSuccess', { created, existed, invalid }))
          handleClose()
          emit('confirm')
        }
      } else {
        const res = await updatePayAddressApi({ id: formData.id, idx: formData.idx })
        btnLoading.value = false
        if (res.code === 0) {
          ElMessage.success(t('PayAddress.Messages.UpdateSuccess'))
          handleClose()
          emit('confirm')
        }
      }
    } catch (error) {
      btnLoading.value = false
    }
  }

  const open = (row) => {
    resetForm()
    if (props.type === 'edit' && row) {
      formData.id = row.id
      formData.idx = row.idx || 0
      formData.address = row.address || ''
    }
    visible.value = true
  }

  defineExpose({ open, resetForm })
</script>

<style lang="scss" scoped>
  .mt-2 {
    margin-top: 8px;
  }
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
