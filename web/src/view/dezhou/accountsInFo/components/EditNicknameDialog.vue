<template>
  <el-dialog width="500" v-model="visible" :title="$t('AccountsInfo.Dialogs.EditTitle')" center>
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
      <el-form-item :label="$t('AccountsInfo.Forms.NickName')" prop="NickName">
        <el-input
          v-model="formData.NickName"
          :placeholder="$t('AccountsInfo.Placeholders.NickName')"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('AccountsInfo.Forms.EditReason')" prop="reason">
        <el-input type="textarea" v-model="formData.reason" :placeholder="$t('AccountsInfo.Placeholders.EditReason')" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">{{ $t('Common.Confirm') }}</el-button>
        <el-button @click="handleClose"> {{ $t('Common.Cancel') }} </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { updateAccountsInFo } from '@/api/dezhou/accountsInFo'
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
  NickName: '',
  reason: ''
})

const formRules = computed(() => ({
  NickName: [
    { required: true, message: t('AccountsInfo.Validations.NickNameRequired'), trigger: 'blur' }
  ],
  reason: [
    { required: true, message: t('AccountsInfo.Validations.EditReasonRequired'), trigger: 'blur' }
  ]
}))

const decodeBase64 = (str) => {
  try {
    return decodeURIComponent(escape(atob(str)))
  } catch (e) {
    return str
  }
}

watch(() => props.rowData, async (newVal) => {
  if (newVal && newVal.UserID) {
    formData.value = {
      UserID: newVal.UserID,
      NickName: decodeBase64(newVal.NickName),
      reason: ''
    }
    await nextTick()
    formRef.value?.clearValidate()
  }
}, { immediate: true, deep: true })

const handleClose = () => {
  visible.value = false
  emit('close')
}

const handleConfirm = async () => {
  formRef.value?.validate(async (valid) => {
    if (!valid) return
    try {
      const res = await updateAccountsInFo(formData.value)
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('AccountsInfo.Messages.EditSuccess')
        })
        emit('success')
        visible.value = false
      }
    } catch (error) {
      console.error('修改昵称失败:', error)
    }
  })
}
</script>
