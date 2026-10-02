<template>
  <el-dialog
    v-model="visible"
    :title="$t('HallTableList.GamePlays.Title')"
    width="800px"
    destroy-on-close
    center
    @close="handleClose"
  >
    <div class="game-plays-container">
      <div class="action-bar">
        <el-button
          type="danger"
          icon="CircleCloseFilled"
          :disabled="!multipleSelection.length"
          @click="handleBatchKickOut"
        >
          {{ $t('HallTableList.GamePlays.BatchKickOut') }}
        </el-button>
      </div>

      <el-table
        ref="tableRef"
        :data="playerList"
        style="width: 100%; margin-top: 16px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          align="center"
          prop="nUserId"
          :label="$t('HallTableList.GamePlays.PlayerId')"
          min-width="120"
        />
        <el-table-column
          align="center"
          prop="sName"
          :label="$t('HallTableList.GamePlays.PlayerName')"
          min-width="150"
        >
          <template #default="scope">
            <span>{{ decodeBase64(scope.row.sName) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="nBalance"
          :label="$t('HallTableList.GamePlays.PlayerBalance')"
          min-width="120"
        />
        <el-table-column align="center" :label="$t('HallTableList.GamePlays.Actions')" min-width="120">
          <template #default="scope">
            <el-button type="danger" link icon="CircleCloseFilled" @click="handleKickOut(scope.row)">
              {{ $t('HallTableList.GamePlays.KickOut') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script setup>
  import { ref } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { kickOutUsers } from '@/api/dezhou/clubCreateTableList'
  import { decodeBase64 } from '@/utils/base64'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const visible = ref(false)
  const playerList = ref([])
  const multipleSelection = ref([])
  const currentTableInfo = ref(null)

  // 打开弹窗
  const open = (row) => {
    currentTableInfo.value = row
    try {
      const userInfo = row.sUserInfo || []
      playerList.value = Array.isArray(userInfo) ? userInfo : []
    } catch (error) {
      console.error('解析 sUserInfo 失败:', error)
      playerList.value = []
      ElMessage.error(t('HallTableList.GamePlays.ParseError'))
    }
    visible.value = true
  }

  // 关闭弹窗
  const handleClose = () => {
    visible.value = false
    playerList.value = []
    multipleSelection.value = []
    currentTableInfo.value = null
  }

  // 多选变化
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }

  // 单个踢出
  const handleKickOut = (row) => {
    ElMessageBox.confirm(
      t('HallTableList.GamePlays.KickOutConfirm', { name: decodeBase64(row.sName) }),
      t('Common.Hint'),
      {
        confirmButtonText: t('Common.Confirm'),
        cancelButtonText: t('Common.Cancel'),
        type: 'warning'
      }
    ).then(async () => {
      await kickOutPlayer([row.nUserId])
    })
  }

  // 批量踢出
  const handleBatchKickOut = () => {
    if (multipleSelection.value.length === 0) {
      ElMessage.warning(t('HallTableList.GamePlays.SelectWarning'))
      return
    }

    ElMessageBox.confirm(
      t('HallTableList.GamePlays.BatchKickOutConfirm', { count: multipleSelection.value.length }),
      t('Common.Hint'),
      {
        confirmButtonText: t('Common.Confirm'),
        cancelButtonText: t('Common.Cancel'),
        type: 'warning'
      }
    ).then(async () => {
      const userIds = multipleSelection.value.map((item) => item.nUserId)
      await kickOutPlayer(userIds)
    })
  }

  // 调用踢出接口
  const kickOutPlayer = async (userIds) => {
    try {
      const res = await kickOutUsers({
        UserIDs: JSON.stringify(userIds)
      })
      if (res.code === 0) {
        ElMessage.success(t('HallTableList.GamePlays.KickOutSuccess'))
        // 从列表中移除已踢出的玩家
        playerList.value = playerList.value.filter((player) => !userIds.includes(player.nUserId))
        multipleSelection.value = []
      }
    } catch (error) {
      console.error('踢出玩家失败:', error)
      ElMessage.error(t('HallTableList.GamePlays.KickOutFailed'))
    }
  }

  defineExpose({
    open
  })
</script>

<style scoped>
  .game-plays-container {
    padding: 0;
  }

  .action-bar {
    display: flex;
    justify-content: flex-start;
  }
</style>
