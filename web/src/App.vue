<template>
  <div id="app" class="bg-gray-50 text-slate-700 dark:text-slate-500 dark:bg-slate-800">
    <el-config-provider :locale="elementLocale">
      <router-view />
      <Application />
    </el-config-provider>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import Application from '@/components/application/index.vue'
import { useAppStore } from '@/pinia'

useAppStore()

const { locale } = useI18n()

const elementLocales = {
  'zh-CN': zhCn,
  en
}

const elementLocale = computed(() => elementLocales[locale.value] || zhCn)

defineOptions({
  name: 'App'
})
</script>
<style lang="scss">
// 引入初始化样式
#app {
  height: 100vh;
  overflow: hidden;
  font-weight: 400 !important;
}

.el-button {
  font-weight: 400 !important;
}

.gva-body-h {
  min-height: calc(100% - 3rem);
}

.gva-container {
  height: calc(100% - 2.5rem);
}

.gva-container2 {
  height: calc(100% - 4.5rem);
}
</style>
