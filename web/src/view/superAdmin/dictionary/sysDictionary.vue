<template>
  <div>
    <!-- 原: 获取字典且缓存方法已在前端utils/dictionary 已经封装完成 不必自己书写 使用方法查看文件内注释 -->
    <warning-bar :title="$t('Dictionary.Warning')" />
    <div class="flex gap-4 p-2">
      <div
        class="flex-none w-52 bg-white text-slate-700 dark:text-slate-400 dark:bg-slate-900 rounded p-4"
      >
        <div class="flex justify-between items-center">
          <!-- 原: 字典列表 -->
          <span class="text font-bold">{{ $t('Dictionary.ListTitle') }}</span>
          <!-- 原: 新增 -->
          <el-button type="primary" @click="openDrawer">{{ $t('Dictionary.Add') }} </el-button>
        </div>
        <div v-if="loading" class="mt-4 flex flex-col gap-2">
          <el-skeleton
            v-for="index in 6"
            :key="`dict-skeleton-${index}`"
            animated
          >
            <template #template>
              <div class="dict-skeleton-item">
                <el-skeleton-item variant="text" class="dict-skeleton-title" />
                <div class="dict-skeleton-actions">
                  <el-skeleton-item variant="text" class="dict-skeleton-icon" />
                  <el-skeleton-item variant="text" class="dict-skeleton-icon" />
                </div>
              </div>
            </template>
          </el-skeleton>
        </div>
        <el-scrollbar v-else class="mt-4" style="height: calc(100vh - 300px)">
          <div
            v-for="dictionary in dictionaryData"
            :key="dictionary.ID"
            class="rounded flex justify-between items-center px-2 py-4 cursor-pointer mt-2 hover:bg-blue-50 dark:hover:bg-blue-900 bg-gray-50 dark:bg-gray-800 gap-4"
            :class="
              selectID === dictionary.ID
                ? 'text-active'
                : 'text-slate-700 dark:text-slate-50'
            "
            @click="toDetail(dictionary)"
          >
            <span class="max-w-[160px] truncate">{{ dictionary.name }}</span>
            <div class="min-w-[40px]">
              <el-icon
                class="text-blue-500"
                @click.stop="updateSysDictionaryFunc(dictionary)"
              >
                <Edit />
              </el-icon>
              <el-icon
                class="ml-2 text-red-500"
                @click="deleteSysDictionaryFunc(dictionary)"
              >
                <Delete />
              </el-icon>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div
        class="flex-1 bg-white text-slate-700 dark:text-slate-400 dark:bg-slate-900"
      >
        <sysDictionaryDetail :sys-dictionary-i-d="selectID" />
      </div>
    </div>
    <el-drawer
      v-model="drawerFormVisible"
      :size="appStore.drawerSize"
      :show-close="false"
      :before-close="closeDrawer"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">{{ type === 'create' ? $t('Dictionary.CreateTitle') : $t('Dictionary.EditTitle') }}</span>
          <div>
            <!-- 原: 取 消 -->
            <el-button @click="closeDrawer">{{ $t('Common.Cancel') }}</el-button>
            <!-- 原: 确 定 -->
            <el-button type="primary" @click="enterDrawer">{{ $t('Common.Submit') }}</el-button>
          </div>
        </div>
      </template>
      <el-form
        ref="drawerForm"
        :model="formData"
        :rules="rules"
        label-width="110px"
      >
        <!-- 原: 字典名（中） -->
        <el-form-item :label="$t('Dictionary.NameZh')" prop="name">
          <!-- 原: 请输入字典名（中） -->
          <el-input
            v-model="formData.name"
            :placeholder="$t('Dictionary.PlaceholderNameZh')"
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <!-- 原: 字典名（英） -->
        <el-form-item :label="$t('Dictionary.NameEn')" prop="type">
          <!-- 原: 请输入字典名（英） -->
          <el-input
            v-model="formData.type"
            :placeholder="$t('Dictionary.PlaceholderNameEn')"
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <!-- 原: 状态 -->
        <el-form-item :label="$t('Dictionary.Status')" prop="status" required>
          <el-switch
            v-model="formData.status"
            :active-text="$t('Dictionary.StatusOn')"
            :inactive-text="$t('Dictionary.StatusOff')"
          />
        </el-form-item>
        <!-- 原: 描述 -->
        <el-form-item :label="$t('Dictionary.Desc')" prop="desc">
          <!-- 原: 请输入描述 -->
          <el-input
            v-model="formData.desc"
            :placeholder="$t('Dictionary.PlaceholderDesc')"
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
  import {
    createSysDictionary,
    deleteSysDictionary,
    updateSysDictionary,
    findSysDictionary,
    getSysDictionaryList
  } from '@/api/sysDictionary' // 此处请自行替换地址
  import WarningBar from '@/components/warningBar/warningBar.vue'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ElMessage, ElMessageBox } from 'element-plus'

  import sysDictionaryDetail from './sysDictionaryDetail.vue'
  import { Edit } from '@element-plus/icons-vue'
  import { useAppStore } from '@/pinia'

  defineOptions({
    name: 'SysDictionary'
  })

  const appStore = useAppStore()
  const { t } = useI18n()

  const selectID = ref(0)

  const formData = ref({
    name: null,
    type: null,
    status: true,
    desc: null
  })
  const rules = ref({
    name: [
      {
        required: true,
        message: t('Dictionary.NameZhRequired'),
        trigger: 'blur'
      }
    ],
    type: [
      {
        required: true,
        message: t('Dictionary.NameEnRequired'),
        trigger: 'blur'
      }
    ],
    desc: [
      {
        required: true,
        message: t('Dictionary.DescRequired'),
        trigger: 'blur'
      }
    ]
  })

  const dictionaryData = ref([])
  const loading = ref(false)

  // 查询
  const getTableData = async () => {
    loading.value = true
    try {
      const res = await getSysDictionaryList()
      if (res.code === 0) {
        dictionaryData.value = res.data
        selectID.value = res.data?.[0]?.ID ?? 0
      }
    } finally {
      loading.value = false
    }
  }

  getTableData()

  const toDetail = (row) => {
    selectID.value = row.ID
  }

  const drawerFormVisible = ref(false)
  const type = ref('')
  const updateSysDictionaryFunc = async (row) => {
    const res = await findSysDictionary({ ID: row.ID, status: row.status })
    type.value = 'update'
    if (res.code === 0) {
      formData.value = res.data.resysDictionary
      drawerFormVisible.value = true
    }
  }
  const closeDrawer = () => {
    drawerFormVisible.value = false
    formData.value = {
      name: null,
      type: null,
      status: true,
      desc: null
    }
  }
  const deleteSysDictionaryFunc = async (row) => {
    ElMessageBox.confirm(t('Dictionary.DeleteConfirm'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await deleteSysDictionary({ ID: row.ID })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('Dictionary.DeleteSuccess') // 删除成功
        })
        getTableData()
      }
    })
  }

  const drawerForm = ref(null)
  const enterDrawer = async () => {
    drawerForm.value.validate(async (valid) => {
      if (!valid) return
      let res
      switch (type.value) {
        case 'create':
          res = await createSysDictionary(formData.value)
          break
        case 'update':
          res = await updateSysDictionary(formData.value)
          break
        default:
          res = await createSysDictionary(formData.value)
          break
      }
      if (res.code === 0) {
        ElMessage.success(t('Dictionary.OperationSuccess')) // 操作成功
        closeDrawer()
        getTableData()
      }
    })
  }
  const openDrawer = () => {
    type.value = 'create'
    drawerForm.value && drawerForm.value.clearValidate()
    drawerFormVisible.value = true
  }
</script>

<style>
  .dict-box {
    height: calc(100vh - 240px);
  }

  .active {
    background-color: var(--el-color-primary) !important;
    color: #fff;
  }

  .dict-skeleton-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.04);
  }

  .dict-skeleton-title {
    width: 140px;
    height: 16px;
  }

  .dict-skeleton-actions {
    display: flex;
    gap: 12px;
  }

  .dict-skeleton-icon {
    width: 16px;
    height: 16px;
  }
</style>
