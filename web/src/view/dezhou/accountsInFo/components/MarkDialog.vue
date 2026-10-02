<template>
  <el-dialog
    width="600"
    v-model="visible"
    :title="$t('AccountsInfo.Dialogs.MarkTitle')"
    align-center
  >
    <el-form label-position="top" :model="formData" class="demo-form-inline">
      <el-form-item :label="$t('AccountsInfo.Labels.UserId')">
        <el-input
          v-model="formData.UserID"
          :placeholder="$t('AccountsInfo.Placeholders.UserId')"
          clearable
          disabled="true"
        />
      </el-form-item>

      <el-form-item :label="$t('AccountsInfo.Forms.MarkInfo')">
        <el-input
          v-model="formData.Remark"
          :rows="8"
          type="textarea"
          :placeholder="$t('AccountsInfo.Placeholders.MarkInfo')"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">{{ $t('Common.Cancel') }}</el-button>
        <el-button type="primary" @click="handleConfirm"> {{ $t('Common.Confirm') }} </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { updateAccountsInFoFoApi } from '@/api/dezhou/accountsInFo'
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

const formData = ref({
  UserID: '',
  Remark: ''
})

watch(() => props.rowData, (newVal) => {
  if (newVal && newVal.UserID) {
    formData.value = {
      UserID: newVal.UserID,
      Remark: newVal.Remark || ''
    }
  }
}, { immediate: true, deep: true })

const handleClose = () => {
  visible.value = false
  emit('close')
}

const handleConfirm = async () => {
  try {
    const res = await updateAccountsInFoFoApi(formData.value)
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: t('AccountsInfo.Messages.MarkSuccess')
      })
      emit('success')
      visible.value = false
    }
  } catch (error) {
    console.error('标记失败:', error)
  }
}
</script>
