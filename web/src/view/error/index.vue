<template>
  <div>
    <div class="w-full h-screen bg-gray-50 flex items-center justify-center">
      <div class="flex flex-col items-center text-2xl gap-4">
        <img class="w-1/3" src="../../assets/404.png" />
        <!-- 页面被神秘力量吸走了 -->
        <p class="text-lg">{{ $t('ErrorPage.PageMissing') }}</p>
        <!-- 常见问题为无当前页面权限，如果确定要使用本路由，请联系管理员进行页面权限分配！ -->
        <p class="text-lg">
          {{ $t('ErrorPage.PermissionHintPrefix') }}<span style="color: red">
            {{ $t('ErrorPage.PermissionHintHighlight') }}</span
          >
        </p>

        <!-- 返回首页 -->
        <el-button @click="toDashboard">{{ $t('ErrorPage.BackHome') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { useUserStore } from '@/pinia/modules/user'
  import { useRouter } from 'vue-router'
  import { emitter } from '@/utils/bus'

  defineOptions({
    name: 'Error'
  })

  const { t } = useI18n()
  const userStore = useUserStore()
  const router = useRouter()
  const toDashboard = () => {
    try {
      router.push({ name: userStore.userInfo.authority.defaultRouter })
    } catch (error) {
      emitter.emit('show-error', {
        code: '401',
        message: t('ErrorPage.PermissionChangedMessage'),
        fn: () => {
          userStore.ClearStorage()
          router.push({ name: 'Login', replace: true })
        }
      })
    }
  }
</script>
