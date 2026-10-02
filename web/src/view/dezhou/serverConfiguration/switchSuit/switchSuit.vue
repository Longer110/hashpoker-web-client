<template>
  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :show-toolbar="true"
      :toolbar-button-count="2"
      :search-field-count="1"
      :row-count="rowCount"
      :show-pagination="false"
    >
      <template #search>
        <div class="gva-search-box">
          <el-form
            ref="elSearchFormRef"
            :inline="true"
            :model="searchInfo"
            class="demo-form-inline"
            @keyup.enter="onSubmit"
          >
            <!-- 原: 区服状态 -->
            <el-form-item :label="$t('SwitchSuit.State')">
              <el-select
                v-model="searchInfo.state"
                clearable
                :placeholder="$t('SwitchSuit.PlaceholderState')"
                style="width: 240px"
                @change="onStateChange"
              >
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
              <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div class="gva-table-box">
        <div class="gva-btn-list" style="display: flex; justify-content: space-between">
          <div>
            <!-- 原: 一键开服 -->
            <el-button type="primary" icon="Select" @click="allOpen()">{{ $t('SwitchSuit.AllOpen') }}</el-button>
            <!-- 原: 一键关服 -->
            <el-button type="danger" icon="CloseBold" @click="allClose()" style="margin-left: 10px">{{
              $t('SwitchSuit.AllClose')
            }}</el-button>

            <el-button type="info" icon="Remove" @click="allMaintenance()" style="margin-left: 10px"
              >一键维护</el-button
            >
          </div>
        </div>
        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          height="900"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="id"
        >
          <!-- <el-table-column type="selection" width="55" /> -->
          <!-- 原: 序号 -->
          <el-table-column align="center" type="index" min-width="50" :label="$t('SwitchSuit.Index')" />
          <!-- 原: 区服ID -->
          <el-table-column
            sortable
            align="center"
            key="Math.random()"
            :label="$t('SwitchSuit.ServerID')"
            prop="id"
            min-width="120"
          />
          <!-- 原: 区服名称 -->
          <el-table-column
            sortable
            align="center"
            key="Math.random()"
            :label="$t('SwitchSuit.ServerName')"
            prop="name"
            min-width="220"
          />
          <!-- 原: 区服状态 -->
          <el-table-column
            sortable
            align="center"
            key="Math.random()"
            :label="$t('SwitchSuit.State')"
            prop="state"
            min-width="220"
          >
            <template #default="scope">
              <div style="display: flex; align-items: center; justify-content: center" v-if="scope.row.state == 1">
                开启
              </div>
              <div style="display: flex; align-items: center; justify-content: center" v-if="scope.row.state == 2">
                关闭
              </div>
              <div style="display: flex; align-items: center; justify-content: center" v-if="scope.row.state == 3">
                维护
              </div>
            </template>
          </el-table-column>

          <el-table-column fixed="right" min-width="150" align="center" :label="$t('SwitchSuit.Actions')">
            <template #default="scope">
              <!-- 原: 开服 -->
              <el-button type="primary" link icon="Select" class="table-button" @click="openRow(scope.row)">{{
                $t('SwitchSuit.Open')
              }}</el-button>
              <!-- 原: 关服 -->
              <el-button type="primary" link icon="CloseBold" @click="CloseRow(scope.row)">{{
                $t('SwitchSuit.Close')
              }}</el-button>
              <!-- 维护 -->
              <el-button type="primary" link icon="Remove" @click="maintenanceRow(scope.row)">维护</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="gva-pagination"></div>
      </div>
    </TableSkeletonWrapper>
  </div>
</template>

<script setup>
  import { getServerStateApi, closeOpenServerApi } from '@/api/dezhou/switchSuit'

  import { ref, onMounted } from 'vue'

  import { ElMessageBox, ElMessage } from 'element-plus'
  import { useI18n } from 'vue-i18n'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  defineOptions({
    name: 'switchSuit'
  })
  const elSearchFormRef = ref()
  const { t } = useI18n()
  const page = ref(1)

  const tableData = ref([])
  const loading = ref(false)
  const rowCount = ref(12)
  const searchInfo = ref({})
  const options = [
    {
      value: 1,
      label: '开启'
    },
    {
      value: 2,
      label: '关闭'
    },
    {
      value: 3,
      label: '维护'
    }
  ]
  // 在组件挂载后执行
  onMounted(() => {})
  // 重置
  const onReset = () => {
    searchInfo.value = {}
    getTableData()
  }
  const onStateChange = (v) => {
    console.log(v)
    searchInfo.value.state = v
  }
  // 搜索
  const onSubmit = () => {
    elSearchFormRef.value?.validate(async (valid) => {
      if (!valid) return
      page.value = 1
      if (searchInfo.value.AccountType === '') {
        searchInfo.value.AccountType = null
      }
      getTableData()
    })
  }
  // 查询
  const getTableData = async () => {
    loading.value = true
    try {
      const table = await getServerStateApi({
        ...searchInfo.value
      })
      if (table.code === 0) {
        // 将对象转换为数组（每个元素包含id、name、state）
        const result = Object.entries(table.data).map(([id, info]) => ({
          id, // 服务ID（如301）
          name: info.name, // 服务名称
          state: info.state // 服务状态
        }))
        tableData.value = result
        rowCount.value = Math.max(result.length, 6)
      }
    } finally {
      loading.value = false
    }
  }
  getTableData()

  const openRow = async (row) => {
    console.log(row.name)
    // 确认开启xx吗
    ElMessageBox.confirm(t('SwitchSuit.ConfirmOpen', { name: row.name }), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await closeOpenServerApi({
        serverId: row.id,

        state: 1
      })
      if (res.code === 0) {
        ElMessage({ type: 'success', message: t('GlobalUniversality.OperationSuccessful') }) // 操作成功

        getTableData()
      }
    })
  }
  const CloseRow = async (row) => {
    console.log(row.id)
    // 确认关闭xx吗
    ElMessageBox.confirm(t('SwitchSuit.ConfirmClose', { name: row.name }), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await closeOpenServerApi({
        serverId: row.id,
        state: 2
      })
      if (res.code === 0) {
        ElMessage({ type: 'success', message: t('GlobalUniversality.OperationSuccessful') }) // 操作成功

        getTableData()
      }
    })
  }

  const maintenanceRow = async (row) => {
    console.log(row.id)
    // 确认维护xx吗
    ElMessageBox.confirm(`确认维护${row.name}吗？`, t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await closeOpenServerApi({
        serverId: row.id,
        state: 3
      })
      if (res.code === 0) {
        ElMessage({ type: 'success', message: t('GlobalUniversality.OperationSuccessful') }) // 操作成功

        getTableData()
      }
    })
  }
  // 一键开服
  const allOpen = async () => {
    // 确认开启所有区服吗
    ElMessageBox.confirm(t('SwitchSuit.ConfirmAllOpen'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await closeOpenServerApi({
        serverId: 0,
        state: 1
      })
      if (res.code === 0) {
        ElMessage({ type: 'success', message: t('GlobalUniversality.OperationSuccessful') }) // 操作成功
        getTableData()
      }
    })
  }
  // 一键关服
  const allClose = async () => {
    ElMessageBox.confirm(t('SwitchSuit.ConfirmAllClose'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await closeOpenServerApi({
        serverId: 0,
        state: 2
      })
      if (res.code === 0) {
        ElMessage({ type: 'success', message: t('GlobalUniversality.OperationSuccessful') })

        getTableData()
      }
    })
  }

  // 一键维护
  const allMaintenance = async () => {
    ElMessageBox.confirm('确认将所有区服设置为维护状态吗？', t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await closeOpenServerApi({
        serverId: 0,
        state: 3
      })
      if (res.code === 0) {
        ElMessage({ type: 'success', message: t('GlobalUniversality.OperationSuccessful') })

        getTableData()
      }
    })
  }
</script>

<style lang="scss" scoped>
  :deep(.customInput) {
    --el-input-focus-border-color: #3b82f6;
    --el-input-border-color: transparent;
    --el-input-hover-border-color: transparent;
    background: transparent;
  }
</style>
