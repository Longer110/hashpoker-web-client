<template>
  <el-dialog
    width="600"
    v-model="visible"
    :title="$t('AccountsInfo.Dialogs.TransferTitle')"
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

      <el-form-item :label="$t('AccountsInfo.Forms.TransferAmount')">
        <el-input
          v-model.number="formData.amount"
          :placeholder="$t('AccountsInfo.Placeholders.TransferAmount')"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('AccountsInfo.Forms.Water')">
        <el-select
          v-model="formData.water"
          :placeholder="$t('AccountsInfo.Placeholders.Water')"
          style="width: 240px"
        >
          <el-option v-for="item in waterOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('AccountsInfo.Forms.Remark')">
        <el-input
          v-model="formData.remark"
          :rows="8"
          type="textarea"
          :placeholder="$t('AccountsInfo.Placeholders.Remark')"
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
import { onlineTransferApi } from '@/api/dezhou/accountsInFo'
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
  amount: null,
  water: false,
  remark: ''
})

const waterOptions = computed(() => [
  { label: t('AccountsInfo.WaterOptions.No'), value: false },
  { label: t('AccountsInfo.WaterOptions.Yes'), value: true }
])

watch(() => props.rowData, (newVal) => {
  if (newVal && newVal.UserID) {
    formData.value = {
      UserID: newVal.UserID,
      amount: null,
      water: false,
      remark: ''
    }
  }
}, { immediate: true, deep: true })

const handleClose = () => {
  visible.value = false
  emit('close')
}

const handleConfirm = async () => {
  try {
    const res = await onlineTransferApi(formData.value)
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: t('AccountsInfo.Messages.TransferSuccess')
      })
      emit('success')
      visible.value = false
    }
  } catch (error) {
    console.error('转账失败:', error)
  }
}
</script>
