<template>
  <el-dialog
    width="600"
    v-model="visible"
    :title="$t('AccountsInfo.Dialogs.PenaltyTitle')"
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
      <el-form-item :label="$t('AccountsInfo.Forms.PenaltyType')">
        <el-select
          v-model="formData.AType"
          :placeholder="$t('AccountsInfo.Placeholders.PenaltyType')"
          style="width: 240px"
        >
          <el-option v-for="item in penaltyOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('AccountsInfo.Forms.PenaltyAutoUnblock')">
        <el-date-picker
          v-model="formData.EndTime"
          type="datetime"
          :placeholder="$t('AccountsInfo.Placeholders.AutoUnblock')"
          clearable
        />
      </el-form-item>

      <el-form-item :label="$t('AccountsInfo.Forms.PenaltyReason')">
        <el-input
          v-model="formData.Reason"
          :rows="8"
          type="textarea"
          :placeholder="$t('AccountsInfo.Placeholders.PenaltyReason')"
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
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { penaltyAccountsInFoApi } from '@/api/dezhou/accountsInFo'
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
  AType: 1,
  Reason: '',
  EndTime: ''
})

const penaltyOptions = computed(() => [
  { label: t('AccountsInfo.PenaltyOptions.AccountBan'), value: 1 },
  { label: t('AccountsInfo.PenaltyOptions.WorldChatMute'), value: 2 },
  { label: t('AccountsInfo.PenaltyOptions.IPBan'), value: 3 },
  { label: t('AccountsInfo.PenaltyOptions.GPSBan'), value: 4 }
])

watch(() => props.rowData, (newVal) => {
  if (newVal && newVal.UserID) {
    formData.value = {
      UserID: newVal.UserID,
      AType: newVal.AType || 1,
      Reason: newVal.Reason || t('AccountsInfo.Forms.PenaltyDefaultReason'),
      EndTime: newVal.EndTime
    }
  }
}, { immediate: true, deep: true })

const handleClose = () => {
  visible.value = false
  emit('close')
}

const handleConfirm = async () => {
  try {
    const res = await penaltyAccountsInFoApi(formData.value)
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: t('AccountsInfo.Messages.PenaltySuccess')
      })
      emit('success')
      visible.value = false
    }
  } catch (error) {
    console.error('处罚失败:', error)
  }
}
</script>
