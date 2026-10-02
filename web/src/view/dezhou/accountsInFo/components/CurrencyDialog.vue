<template>
  <el-dialog
    width="500"
    v-model="visible"
    :title="$t('AccountsInfo.Dialogs.CurrencyTitle')"
    center
    :before-close="handleClose"
  >
    <el-form
      label-position="top"
      :model="formData"
      :rules="formRules"
      ref="formRef"
      class="demo-form-inline"
    >
      <el-form-item :label="$t('AccountsInfo.Labels.UserId')">
        <el-input v-model="formData.UserID" :placeholder="$t('AccountsInfo.Placeholders.UserId')" disabled />
      </el-form-item>
      <el-form-item :label="$t('AccountsInfo.Forms.OperationType')">
        <el-select
          v-model="formData.addOrReduce"
          :placeholder="$t('AccountsInfo.Placeholders.OperationType')"
          style="width: 100%"
        >
          <el-option :label="$t('AccountsInfo.Currency.Increase')" :value="1" />
          <el-option :label="$t('AccountsInfo.Currency.Decrease')" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('AccountsInfo.Forms.ApplyAmount')" prop="Gold">
        <el-input
          v-model.number="formData.Gold"
          :placeholder="$t('AccountsInfo.Placeholders.ApplyAmount')"
          clearable
          :min="0"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">{{ $t('AccountsInfo.Actions.SubmitApplication') }}</el-button>
        <el-button @click="handleClose"> {{ $t('AccountsInfo.Actions.CancelApplication') }} </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { changeGoldApi } from '@/api/dezhou/accountsInFo'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const visible = defineModel('visible', { type: Boolean, default: false })

const props = defineProps({
  rowData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['success', 'close'])

const formRef = ref(null)
const formData = ref({
  UserID: '',
  addOrReduce: 1,
  Gold: null
})

const formRules = computed(() => ({
  addOrReduce: [
    { required: true, message: t('AccountsInfo.Validations.OperationTypeRequired'), trigger: 'change' }
  ],
  Gold: [
    { required: true, message: t('AccountsInfo.Validations.ApplyAmountRequired'), trigger: 'blur' },
    { type: 'number', message: t('AccountsInfo.Validations.ApplyAmountNumber'), trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value <= 0) {
          callback(new Error(t('AccountsInfo.Validations.ApplyAmountGreaterThanZero')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}))

watch(() => props.rowData, async (newVal) => {
  if (newVal && newVal.UserID) {
    formData.value = {
      UserID: newVal.UserID,
      addOrReduce: 1,
      Gold: null
    }
    await nextTick()
    formRef.value?.clearValidate()
  }
}, { immediate: true, deep: true })

const handleClose = () => {
  visible.value = false
  formRef.value?.resetFields()
  formData.value = {
    UserID: '',
    addOrReduce: 1,
    Gold: null
  }
  emit('close')
}

const handleConfirm = async () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (!valid) {
      ElMessage({
        type: 'warning',
        message: t('AccountsInfo.Messages.SubmitIncomplete')
      })
      return
    }
    try {
      const goldValue =
        formData.value.addOrReduce === 1
          ? `+${formData.value.Gold}`
          : `-${formData.value.Gold}`
      const params = {
        UserID: formData.value.UserID,
        Gold: goldValue
      }
      const res = await changeGoldApi(params)
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('AccountsInfo.Messages.SubmitSuccess')
        })
        emit('success')
        visible.value = false
        formRef.value?.resetFields()
      }
    } catch (error) {
      ElMessage({
        type: 'error',
        message: error.message || t('AccountsInfo.Messages.SubmitFailed')
      })
    }
  })
}
</script>
