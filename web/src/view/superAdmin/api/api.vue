<template>
  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :show-toolbar="true"
      :toolbar-button-count="5"
      :search-field-count="4"
      :row-count="pageSize"
    >
      <template #search>
        <div class="gva-search-box">
          <el-form ref="searchForm" :inline="true" :model="searchInfo">
            <!-- 原: 路径 -->
            <el-form-item :label="$t('Api.Path')">
              <!-- 原: 路径 -->
              <el-input v-model="searchInfo.path" :placeholder="$t('Api.PlaceholderPath')" style="width: 240px"  clearable/>
            </el-form-item>
            <!-- 原: 描述 -->
            <el-form-item :label="$t('Api.Description')">
              <!-- 原: 描述 -->
              <el-input v-model="searchInfo.description" :placeholder="$t('Api.PlaceholderDescription')" style="width: 240px"  clearable/>
            </el-form-item>
            <!-- 原: API分组 -->
            <el-form-item :label="$t('Api.ApiGroup')">
              <!-- 原: 请选择 -->
              <el-select v-model="searchInfo.apiGroup" clearable :placeholder="$t('Api.PlaceholderApiGroup')" style="width: 240px"  >
                <el-option v-for="item in apiGroupOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <!-- 原: 请求 -->
            <el-form-item :label="$t('Api.Method')">
              <!-- 原: 请选择 -->
              <el-select v-model="searchInfo.method" clearable :placeholder="$t('Api.PlaceholderMethod')" style="width: 240px"  >
                <el-option
                  v-for="item in methodOptions"
                  :key="item.value"
                  :label="`${item.label}(${item.value})`"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <!-- 原: 查询 -->
              <el-button type="primary" icon="search" @click="onSubmit"> {{ $t('GlobalUniversality.Query') }} </el-button>
              <!-- 原: 重置 -->
              <el-button icon="refresh" @click="onReset"> {{ $t('GlobalUniversality.Reset') }} </el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div class="gva-table-box">
        <div class="gva-btn-list">
          <!-- 原: 新增 -->
          <el-button type="primary" icon="plus" @click="openDialog('addApi')"> {{ $t('Api.Add') }} </el-button>
          <!-- 原: 删除 -->
          <el-button icon="delete" :disabled="!apis.length" @click="onDelete"> {{ $t('Api.Delete') }} </el-button>
          <!-- 原: 刷新缓存 -->
          <el-button icon="Refresh" @click="onFresh"> {{ $t('Api.RefreshCache') }} </el-button>
          <!-- 原: 同步API -->
          <el-button icon="Compass" @click="onSync"> {{ $t('Api.SyncApi') }} </el-button>
          <ExportTemplate template-id="api" />
          <ExportExcel template-id="api" :limit="9999" />
          <ImportExcel template-id="api" @on-success="getTableData" />
        </div>
        <el-table :data="tableData" @sort-change="sortChange" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <!-- 原: id -->
        <el-table-column align="left" :label="$t('Api.ID')" min-width="60" prop="ID" sortable="custom" />
        <!-- 原: API路径 -->
        <el-table-column align="left" :label="$t('Api.ApiPath')" min-width="150" prop="path" sortable="custom" />
        <!-- 原: API分组 -->
        <el-table-column align="left" :label="$t('Api.ApiGroupColumn')" min-width="150" prop="apiGroup" sortable="custom" />
        <!-- 原: API简介 -->
        <el-table-column align="left" :label="$t('Api.ApiDescription')" min-width="150" prop="description" sortable="custom" />
        <!-- 原: 请求 -->
        <el-table-column align="left" :label="$t('Api.MethodColumn')" min-width="150" prop="method" sortable="custom">
          <template #default="scope">
            <div>{{ scope.row.method }} / {{ methodFilter(scope.row.method) }}</div>
          </template>
        </el-table-column>

        <!-- 原: 操作 -->
        <el-table-column align="right" fixed="right" header-align="center" :label="$t('Api.Actions')" :min-width="120">
          <template #default="scope">
            <!-- 原: 编辑 -->
            <el-button icon="edit" type="primary" link @click="editApiFunc(scope.row)"> {{ $t('Api.Edit') }} </el-button>
            <!-- 原: 删除 -->
            <el-button icon="delete" type="primary" link @click="deleteApiFunc(scope.row)"> {{ $t('Api.Delete') }} </el-button>
          </template>
        </el-table-column>
      </el-table>
        <div class="gva-pagination">
          <el-pagination
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
    </TableSkeletonWrapper>

    <el-drawer v-model="syncApiFlag" :size="appStore.drawerSize" :before-close="closeSyncDialog" :show-close="false">
      <!-- 原: 同步API, 不输入路由分组将不会被自动同步, 如果api不需要参与鉴权, 可以按忽略按钮进行忽略 -->
      <warning-bar :title="$t('Api.SyncApiWarning')" />
      <template #header>
        <div class="flex justify-between items-center">
          <!-- 原: 同步路由 -->
          <span class="text-lg">{{ $t('Api.SyncRoute') }}</span>
          <div>
            <el-button :loading="apiCompletionLoading" @click="closeSyncDialog"> 取 消 </el-button>
            <el-button type="primary" :loading="syncing || apiCompletionLoading" @click="enterSyncDialog">
              确 定
            </el-button>
          </div>
        </div>
      </template>

      <h4>
        <!-- 原: 新增路由 -->
        {{ $t('Api.NewRoute') }}
        <!-- 原: 存在于当前路由中，但是不存在于api表 -->
        <span class="text-xs text-gray-500 mx-2 font-normal">{{ $t('Api.NewRouteNote') }}</span>
        <el-button type="primary" size="small" @click="apiCompletion">
          <el-icon size="18">
            <ai-gva />
          </el-icon>
          <!-- 原: 自动填充 -->
          {{ $t('Api.AutoFill') }}
        </el-button>
      </h4>
      <el-table
        v-loading="syncing || apiCompletionLoading"
        element-loading-text="小淼正在思考..."
        :data="syncApiData.newApis"
      >
        <!-- 原: API路径 -->
        <el-table-column align="left" :label="$t('Api.ApiPath')" min-width="150" prop="path" />
        <!-- 原: API分组 -->
            <el-table-column align="left" :label="$t('Api.ApiGroupColumn')" min-width="150" prop="apiGroup">
          <template #default="{ row }">
            <!-- 原: 请选择或新增 -->
            <el-select v-model="row.apiGroup" :placeholder="$t('Api.PlaceholderSelectOrCreate')" allow-create filterable default-first-option>
              <el-option v-for="item in apiGroupOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <!-- 原: API简介 -->
        <el-table-column align="left" :label="$t('Api.ApiDescription')" min-width="150" prop="description">
          <template #default="{ row }">
            <el-input v-model="row.description" autocomplete="off" />
          </template>
        </el-table-column>
        <!-- 原: 请求 -->
        <el-table-column align="left" :label="$t('Api.MethodColumn')" min-width="150" prop="method">
          <template #default="scope">
            <div>{{ scope.row.method }} / {{ methodFilter(scope.row.method) }}</div>
          </template>
        </el-table-column>
        <!-- 原: 操作 -->
        <el-table-column header-align="center" :label="$t('Api.Actions')" min-width="150" fixed="right">
          <template #default="{ row }">
            <!-- 原: 单条新增 -->
            <el-button icon="plus" type="primary" link @click="addApiFunc(row)"> {{ $t('Api.SingleAdd') }} </el-button>
            <!-- 原: 忽略 -->
            <el-button icon="sunrise" type="primary" link @click="ignoreApiFunc(row, true)"> {{ $t('Api.Ignore') }} </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 原: 已删除路由 -->
      <h4>
        {{ $t('Api.DeletedRoute') }}
        <!-- 原: 已经不存在于当前项目的路由中，确定同步后会自动从apis表删除 -->
        <span class="text-xs text-gray-500 ml-2 font-normal">{{ $t('Api.DeletedRouteNote') }}</span>
      </h4>
      <el-table :data="syncApiData.deleteApis">
        <!-- 原: API路径 -->
        <el-table-column align="left" :label="$t('Api.ApiPath')" min-width="150" prop="path" />
        <!-- 原: API分组 -->
        <el-table-column align="left" :label="$t('Api.ApiGroupColumn')" min-width="150" prop="apiGroup" />
        <!-- 原: API简介 -->
        <el-table-column align="left" :label="$t('Api.ApiDescription')" min-width="150" prop="description" />
        <!-- 原: 请求 -->
        <el-table-column align="left" :label="$t('Api.MethodColumn')" min-width="150" prop="method">
          <template #default="scope">
            <div>{{ scope.row.method }} / {{ methodFilter(scope.row.method) }}</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 原: 忽略路由 -->
      <h4>
        {{ $t('Api.IgnoreRoute') }}
        <!-- 原: 忽略路由不参与api同步，常见为不需要进行鉴权行为的路由 -->
        <span class="text-xs text-gray-500 ml-2 font-normal">{{ $t('Api.IgnoreRouteNote') }}</span>
      </h4>
      <el-table :data="syncApiData.ignoreApis">
        <!-- 原: API路径 -->
        <el-table-column align="left" :label="$t('Api.ApiPath')" min-width="150" prop="path" />
        <!-- 原: API分组 -->
        <el-table-column align="left" :label="$t('Api.ApiGroupColumn')" min-width="150" prop="apiGroup" />
        <!-- 原: API简介 -->
        <el-table-column align="left" :label="$t('Api.ApiDescription')" min-width="150" prop="description" />
        <!-- 原: 请求 -->
        <el-table-column align="left" :label="$t('Api.MethodColumn')" min-width="150" prop="method">
          <template #default="scope">
            <div>{{ scope.row.method }} / {{ methodFilter(scope.row.method) }}</div>
          </template>
        </el-table-column>
        <!-- 原: 操作 -->
        <el-table-column header-align="center" :label="$t('Api.Actions')" min-width="150" fixed="right">
          <template #default="{ row }">
            <!-- 原: 取消忽略 -->
            <el-button icon="sunny" type="primary" link @click="ignoreApiFunc(row, false)"> {{ $t('Api.CancelIgnore') }} </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

    <el-drawer v-model="dialogFormVisible" :size="appStore.drawerSize" :before-close="closeDialog" :show-close="false">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">{{ dialogTitle }}</span>
          <div>
            <!-- 原: 取 消 -->
            <el-button @click="closeDialog"> {{ $t('Common.Cancel') }} </el-button>
            <!-- 原: 确 定 -->
            <el-button type="primary" @click="enterDialog"> {{ $t('Common.Submit') }} </el-button>
          </div>
        </div>
      </template>

      <!-- 原: 新增API, 需要在角色管理内配置权限才可使用 -->
      <warning-bar :title="$t('Api.AddApiWarning')" />
      <el-form ref="apiForm" :model="form" :rules="rules" label-width="80px">
        <!-- 原: 路径 -->
        <el-form-item :label="$t('Api.Path')" prop="path">
          <el-input v-model="form.path" autocomplete="off" />
        </el-form-item>
        <!-- 原: 请求 -->
        <el-form-item :label="$t('Api.Method')" prop="method">
          <!-- 原: 请选择 -->
          <el-select v-model="form.method" :placeholder="$t('Api.PlaceholderMethod')" style="width: 100%">
            <el-option
              v-for="item in methodOptions"
              :key="item.value"
              :label="`${item.label}(${item.value})`"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 原: api分组 -->
        <el-form-item :label="$t('Api.ApiGroup')" prop="apiGroup">
          <!-- 原: 请选择或新增 -->
          <el-select v-model="form.apiGroup" :placeholder="$t('Api.PlaceholderSelectOrCreate')" allow-create filterable default-first-option>
            <el-option v-for="item in apiGroupOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- 原: api简介 -->
        <el-form-item :label="$t('Api.ApiDescription')" prop="description">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
  import {
    getApiById,
    getApiList,
    createApi,
    updateApi,
    deleteApi,
    deleteApisByIds,
    freshCasbin,
    syncApi,
    getApiGroups,
    ignoreApi,
    enterSyncApi
  } from '@/api/api'
  import { toSQLLine } from '@/utils/stringFun'
  import WarningBar from '@/components/warningBar/warningBar.vue'
  import { ref, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import ExportExcel from '@/components/exportExcel/exportExcel.vue'
  import ExportTemplate from '@/components/exportExcel/exportTemplate.vue'
  import ImportExcel from '@/components/exportExcel/importExcel.vue'
  import { butler } from '@/api/autoCode'
  import { useAppStore } from '@/pinia'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  defineOptions({
    name: 'Api'
  })

  const appStore = useAppStore()
  const { t } = useI18n()

  // 原: methodOptions - 请求方法选项
  const methodOptions = computed(() => [
    {
      value: 'POST',
      label: t('Api.CreateLabel'),
      type: 'success'
    },
    {
      value: 'GET',
      label: t('Api.ReadLabel'),
      type: ''
    },
    {
      value: 'PUT',
      label: t('Api.UpdateLabel'),
      type: 'warning'
    },
    {
      value: 'DELETE',
      label: t('Api.DeleteLabel'),
      type: 'danger'
    }
  ])

  const methodFilter = (value) => {
    const target = methodOptions.value.filter((item) => item.value === value)[0]
    return target && `${target.label}`
  }

  const apis = ref([])
  const form = ref({
    path: '',
    apiGroup: '',
    method: '',
    description: ''
  })

  const type = ref('')
  // 原: 表单验证规则 - 包含中文错误消息
  const rules = computed(() => ({
    path: [{ required: true, message: t('Api.PathRequired'), trigger: 'blur' }],
    apiGroup: [{ required: true, message: t('Api.GroupRequired'), trigger: 'blur' }],
    method: [{ required: true, message: t('Api.MethodRequired'), trigger: 'blur' }],
    description: [{ required: true, message: t('Api.DescriptionRequired'), trigger: 'blur' }]
  }))

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({})
  const loading = ref(false)
  const apiGroupOptions = ref([])
  const apiGroupMap = ref({})

  const getGroup = async () => {
    const res = await getApiGroups()
    if (res.code === 0) {
      const groups = res.data.groups
      apiGroupOptions.value = groups.map((item) => ({
        label: item,
        value: item
      }))
      apiGroupMap.value = res.data.apiGroupMap
    }
  }

  const ignoreApiFunc = async (row, flag) => {
    const res = await ignoreApi({ path: row.path, method: row.method, flag })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: res.msg
      })
      if (flag) {
        syncApiData.value.newApis = syncApiData.value.newApis.filter(
          (item) => !(item.path === row.path && item.method === row.method)
        )
        syncApiData.value.ignoreApis.push(row)
        return
      }
      syncApiData.value.ignoreApis = syncApiData.value.ignoreApis.filter(
        (item) => !(item.path === row.path && item.method === row.method)
      )
      syncApiData.value.newApis.push(row)
    }
  }

  const addApiFunc = async (row) => {
    if (!row.apiGroup) {
      ElMessage({
        type: 'error',
        message: t('Api.SelectApiGroupError')
      })
      return
    }
    if (!row.description) {
      ElMessage({
        type: 'error',
        message: t('Api.FillDescriptionError')
      })
      return
    }
    const res = await createApi(row)
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: t('Api.AddSuccessManageRole'),
        showClose: true
      })
      syncApiData.value.newApis = syncApiData.value.newApis.filter(
        (item) => !(item.path === row.path && item.method === row.method)
      )
    }
    getTableData()
    getGroup()
  }

  const closeSyncDialog = () => {
    syncApiFlag.value = false
  }

  const syncing = ref(false)

  const enterSyncDialog = async () => {
    if (syncApiData.value.newApis.some((item) => !item.apiGroup || !item.description)) {
      ElMessage({
        type: 'error',
        message: t('Api.GroupOrDescriptionError')
      })
      return
    }

    syncing.value = true
    const res = await enterSyncApi(syncApiData.value)
    syncing.value = false
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: res.msg
      })
      syncApiFlag.value = false
      getTableData()
    }
  }

  const onReset = () => {
    searchInfo.value = {}
    getTableData()
  }
  // 搜索

  const onSubmit = () => {
    page.value = 1
    getTableData()
  }

  // 分页
  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  // 排序
  const sortChange = ({ prop, order }) => {
    if (prop) {
      if (prop === 'ID') {
        prop = 'id'
      }
      searchInfo.value.orderKey = toSQLLine(prop)
      searchInfo.value.desc = order === 'descending'
    }
    getTableData()
  }

  // 查询
  const getTableData = async () => {
    loading.value = true
    try {
      const table = await getApiList({
        page: page.value,
        pageSize: pageSize.value,
        ...searchInfo.value
      })
      if (table.code === 0) {
        tableData.value = table.data.list
        total.value = table.data.total
        page.value = table.data.page
        pageSize.value = table.data.pageSize
      }
    } finally {
      loading.value = false
    }
  }

  getTableData()
  getGroup()
  // 批量操作
  const handleSelectionChange = (val) => {
    apis.value = val
  }

  const onDelete = async () => {
    ElMessageBox.confirm(t('Api.ConfirmDelete'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const ids = apis.value.map((item) => item.ID)
      const res = await deleteApisByIds({ ids })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: res.msg
        })
        if (tableData.value.length === ids.length && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }
  const onFresh = async () => {
    ElMessageBox.confirm(t('Api.ConfirmRefreshCache'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await freshCasbin()
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: res.msg
        })
      }
    })
  }

  const syncApiData = ref({
    newApis: [],
    deleteApis: [],
    ignoreApis: []
  })

  const syncApiFlag = ref(false)

  const onSync = async () => {
    const res = await syncApi()
    if (res.code === 0) {
      res.data.newApis.forEach((item) => {
        item.apiGroup = apiGroupMap.value[item.path.split('/')[1]]
      })

      syncApiData.value = res.data
      syncApiFlag.value = true
    }
  }

  // 弹窗相关
  const apiForm = ref(null)
  const initForm = () => {
    apiForm.value.resetFields()
    form.value = {
      path: '',
      apiGroup: '',
      method: '',
      description: ''
    }
  }

  const dialogTitle = ref('新增Api')
  const dialogFormVisible = ref(false)
  const openDialog = (key) => {
    switch (key) {
      case 'addApi':
        // 原: 新增Api
        dialogTitle.value = t('Api.AddApi')
        break
      case 'edit':
        // 原: 编辑Api
        dialogTitle.value = t('Api.EditApi')
        break
      default:
        break
    }
    type.value = key
    dialogFormVisible.value = true
  }
  const closeDialog = () => {
    initForm()
    dialogFormVisible.value = false
  }

  const editApiFunc = async (row) => {
    const res = await getApiById({ id: row.ID })
    form.value = res.data.api
    openDialog('edit')
  }

  const enterDialog = async () => {
    apiForm.value.validate(async (valid) => {
      if (valid) {
        switch (type.value) {
          case 'addApi':
            {
              const res = await createApi(form.value)
              if (res.code === 0) {
                ElMessage({
                  type: 'success',
                  message: t('Api.AddSuccess'),
                  showClose: true
                })
              }
              getTableData()
              getGroup()
              closeDialog()
            }

            break
          case 'edit':
            {
              const res = await updateApi(form.value)
              if (res.code === 0) {
                ElMessage({
                  type: 'success',
                  message: t('Api.EditSuccess'),
                  showClose: true
                })
              }
              getTableData()
              closeDialog()
            }
            break
          default:
            {
              ElMessage({
                type: 'error',
                message: t('Api.UnknownOperation'),
                showClose: true
              })
            }
            break
        }
      }
    })
  }

  const deleteApiFunc = async (row) => {
    ElMessageBox.confirm(t('Api.ConfirmDeleteAllRoles'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await deleteApi(row)
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('Api.DeleteSuccess')
        })
        if (tableData.value.length === 1 && page.value > 1) {
          page.value--
        }
        getTableData()
        getGroup()
      }
    })
  }
  const apiCompletionLoading = ref(false)
  const apiCompletion = async () => {
    apiCompletionLoading.value = true
    const routerPaths = syncApiData.value.newApis
      .filter((item) => !item.apiGroup || !item.description)
      .map((item) => item.path)
    const res = await butler({ data: routerPaths, command: 'apiCompletion' })
    apiCompletionLoading.value = false
    if (res.code === 0) {
      try {
        const data = JSON.parse(res.data)
        syncApiData.value.newApis.forEach((item) => {
          const target = data.find((d) => d.path === item.path)
          if (target) {
            if (!item.apiGroup) {
              item.apiGroup = target.apiGroup
            }
            if (!item.description) {
              item.description = target.description
            }
          }
        })
      } catch (_) {
        ElMessage({
          type: 'error',
          message: t('Api.AiAutoFillFailed')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .warning {
    color: #dc143c;
  }
</style>
