<template>
  <el-drawer
    destroy-on-close
    :size="appStore.drawerSize"
    v-model="visible"
    :show-close="true"
    :before-close="handleClose"
    :title="$t('AccountsInfo.DetailDrawer.Title')"
  >
    <el-descriptions :column="1" border>
      <el-descriptions-item :label="$t('AccountsInfo.DetailDrawer.UserId')">
        {{ detailData.UserID }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('AccountsInfo.DetailDrawer.Accounts')">
        {{ detailData.Accounts }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('AccountsInfo.DetailDrawer.Password')">
        {{ detailData.Password }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('AccountsInfo.DetailDrawer.NickName')">
        {{ decodeBase64(detailData.NickName) }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="label-with-tooltip">
            <span>{{ $t('AccountsInfo.DetailDrawer.Sex') }}</span>
            <el-tooltip :content="$t('AccountsInfo.Tooltips.Sex')" placement="top" effect="light">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
        {{ getSex(detailData.Sex) || '-' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="label-with-tooltip">
            <span>{{ $t('AccountsInfo.DetailDrawer.AccountType') }}</span>
            <el-tooltip :content="$t('AccountsInfo.Tooltips.AccountType')" placement="top" effect="light">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
        {{ getAccountType(detailData.AccountType) }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('AccountsInfo.DetailDrawer.PhoneType')">
        {{ detailData.PhoneType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="label-with-tooltip">
            <span>{{ $t('AccountsInfo.DetailDrawer.MachineCode') }}</span>
            <el-tooltip :content="$t('AccountsInfo.Tooltips.MachineCode')" placement="top" effect="light">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
        {{ detailData.Models }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="label-with-tooltip">
            <span>{{ $t('AccountsInfo.DetailDrawer.LoginIP') }}</span>
            <el-tooltip :content="$t('AccountsInfo.Tooltips.LoginInfo')" placement="top" effect="light">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
        {{ detailData.LogongIP }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('AccountsInfo.DetailDrawer.RegisterIP')">
        {{ detailData.RegistIP }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('AccountsInfo.DetailDrawer.RegisterTime')">
        {{ formatDate(detailData.RegisTime) }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('AccountsInfo.DetailDrawer.Remark')">
        {{ detailData.Remark }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="label-with-tooltip">
            <span>{{ $t('AccountsInfo.DetailDrawer.LoginTime') }}</span>
            <el-tooltip :content="$t('AccountsInfo.Tooltips.LoginInfo')" placement="top" effect="light">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
        {{ formatDate(detailData.LogonTime) }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="label-with-tooltip">
            <span>{{ $t('AccountsInfo.DetailDrawer.RealName') }}</span>
            <el-tooltip :content="$t('AccountsInfo.Tooltips.RealName')" placement="top" effect="light">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
        {{ getRealName(detailData.RealName) || '-' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="label-with-tooltip">
            <span>{{ $t('AccountsInfo.DetailDrawer.IsRobot') }}</span>
            <el-tooltip :content="$t('AccountsInfo.Tooltips.IsRobot')" placement="top" effect="light">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </div>
        </template>
        {{ getIsAndroid(detailData.IsAndroid) || '-' }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('AccountsInfo.DetailDrawer.ClientVersion')">
        {{ detailData.ClientVersion }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('AccountsInfo.DetailDrawer.ServerVersion')">
        {{ detailData.ServerVersion }}
      </el-descriptions-item>
      <el-descriptions-item :label="$t('AccountsInfo.DetailDrawer.DeviceModel')">
        {{ detailData.DeviceModel }}
      </el-descriptions-item>
    </el-descriptions>
  </el-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { QuestionFilled } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/format'
import { useAppStore } from '@/pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const appStore = useAppStore()

const visible = defineModel('visible', { type: Boolean, default: false })

defineProps({
  detailData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close'])

const handleClose = () => {
  visible.value = false
  emit('close')
}

const decodeBase64 = (str) => {
  try {
    return decodeURIComponent(escape(atob(str)))
  } catch (e) {
    return str
  }
}

const accountTypeMap = computed(() => ({
  1: t('AccountsInfo.AccountType.Normal'),
  2: t('AccountsInfo.AccountType.Test'),
  0: t('AccountsInfo.AccountType.Guest'),
  4: t('AccountsInfo.AccountType.Observer'),
  7: t('AccountsInfo.AccountType.Telegram')
}))

const getAccountType = (accountType) => accountTypeMap.value[accountType] || accountType

const sexMap = computed(() => ({
  0: t('AccountsInfo.Sex.Male'),
  1: t('AccountsInfo.Sex.Female'),
  2: t('AccountsInfo.Sex.Unknown')
}))

const getSex = (sexId) => sexMap.value[sexId] || sexId

const isAndroidMap = computed(() => ({
  0: t('AccountsInfo.BooleanText.No'),
  1: t('AccountsInfo.BooleanText.Yes')
}))

const getIsAndroid = (isAndroid) => isAndroidMap.value[isAndroid] || isAndroid

const getRealName = (realName) => {
  if (realName === 0 || realName === '0') {
    return t('AccountsInfo.RealName.Unverified')
  }
  if (Number(realName) > 0) {
    return t('AccountsInfo.RealName.Verified')
  }
  return realName
}
</script>

<style scoped lang="scss">
.label-with-tooltip {
  display: flex;
  align-items: center;
  gap: 6px;

  .el-icon {
    color: #909399;
    cursor: help;
    &:hover {
      color: #409eff;
    }
  }
}
</style>
