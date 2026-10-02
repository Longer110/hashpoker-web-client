<template>
  <el-dialog
    v-model="dialogVisible"
    title="历史登录记录"
    width="800px"
    center
    :before-close="handleClose"
  >
    <el-table :data="historyLoginList" style="width: 100%" border>
      <el-table-column align="center" type="index" width="70" label="序号" />
      <el-table-column align="center" prop="LogonTime" label="登录时间" min-width="150">
        <template #default="scope">
          {{ formatDate(scope.row.LogonTime) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="DeviceModel" label="登录设备" min-width="120" />
      <el-table-column align="center" prop="LogonIP" label="登录IP" min-width="150" />
      <el-table-column align="center" prop="LogonLocation" label="登录地区" min-width="120" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleClose">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { formatDate } from '@/utils/format'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  historyLoginList: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:visible'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const handleClose = () => {
  emit('update:visible', false)
}
</script>
