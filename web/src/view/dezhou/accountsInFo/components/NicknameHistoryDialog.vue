<template>
  <el-dialog
    v-model="dialogVisible"
    title="昵称修改记录"
    width="900px"
    center
    :before-close="handleClose"
  >
    <el-table :data="nicknameHistoryList" style="width: 100%" border>
      <el-table-column align="center" type="index" width="70" label="序号" />
      <el-table-column align="center" prop="UpdateTime" label="修改时间" min-width="150">
        <template #default="scope">
          {{ formatDate(scope.row.UpdateTime) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="Cost" label="花费" min-width="100" />
      <el-table-column align="center" prop="ResName" label="修改前" min-width="150">
        <template #default="scope">
          {{ decodeBase64(scope.row.ResName) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="NewName" label="修改后" min-width="150">
        <template #default="scope">
          {{ decodeBase64(scope.row.NewName) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="ModifyIP" label="修改登录时IP" min-width="150" />
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
  nicknameHistoryList: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:visible'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const decodeBase64 = (str) => {
  try {
    return decodeURIComponent(escape(atob(str)))
  } catch (e) {
    return str
  }
}

const handleClose = () => {
  emit('update:visible', false)
}
</script>
