<template>
  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :show-toolbar="true"
      :toolbar-button-count="1"
      :search-field-count="3"
      :row-count="pageSize"
    >
      <template #search>
        <div class="gva-search-box">
          <el-form :inline="true" :model="searchInfo">
            <!-- 原: 请求方法 -->
            <el-form-item :label="$t('Operation.Method')">
              <el-input v-model="searchInfo.method" :placeholder="$t('Operation.PlaceholderSearch')" style="width: 240px"  clearable />
            </el-form-item>
            <!-- 原: 请求路径 -->
            <el-form-item :label="$t('Operation.Path')">
              <el-input v-model="searchInfo.path" :placeholder="$t('Operation.PlaceholderSearch')" style="width: 240px"  clearable/>
            </el-form-item>
            <!-- 原: 结果状态码 -->
            <el-form-item :label="$t('Operation.StatusCode')">
              <el-input v-model="searchInfo.status" :placeholder="$t('Operation.PlaceholderSearch')" style="width: 240px"  clearable/>
            </el-form-item>
            <el-form-item>
              <!-- 原: 查询 / 重置 -->
              <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
              <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div class="gva-table-box">
        <div class="gva-btn-list">
          <!-- 原: 删除 -->
          <el-button icon="delete" :disabled="!multipleSelection.length" @click="onDelete">{{ $t('Operation.DeleteSelected') }}</el-button>
        </div>
        <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
        row-key="ID"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="left" type="selection" width="55" />
        <!-- 原: 操作人 -->
        <el-table-column align="left" :label="$t('Operation.Operator')" width="140">
          <template #default="scope">
            <div>{{ scope.row.user.userName }}({{ scope.row.user.nickName }})</div>
          </template>
        </el-table-column>
        <!-- 原: 日期 -->
        <el-table-column align="left" :label="$t('Operation.Date')" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <!-- 原: 状态码 -->
        <el-table-column align="left" :label="$t('Operation.StatusCode')" prop="status" width="120">
          <template #default="scope">
            <div>
              <el-tag type="success">{{ scope.row.status }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 原: 请求IP -->
        <el-table-column align="left" :label="$t('Operation.IP')" prop="ip" min-width="120" />
        <!-- 原: 请求方法 -->
        <el-table-column align="left" :label="$t('Operation.Method')" prop="method" width="120" />
        <!-- 操作详情 -->
        <el-table-column align="left" :label="$t('Operation.PathName')" prop="pathName" min-width="200">
          <template #default="scope">
            {{ scope.row.apis ? scope.row.apis.description : '' }}
          </template>
        </el-table-column>
        <!-- 原: 请求路径 -->
        <el-table-column align="left" :label="$t('Operation.Path')" prop="path" width="240" />
        <!-- 原: 请求 -->
        <el-table-column align="left" :label="$t('Operation.RequestBody')" prop="path" width="100">
          <template #default="scope">
            <div>
              <el-popover v-if="scope.row.body" placement="left-start" :width="444">
                <div class="popover-box">
                  <pre>{{ fmtBody(scope.row.body) }}</pre>
                </div>
                <template #reference>
                  <el-icon style="cursor: pointer"><warning /></el-icon>
                </template>
              </el-popover>

              <span v-else>{{ $t('Operation.None') }}</span>
            </div>
          </template>
        </el-table-column>
        <!-- 原: 响应 -->
        <el-table-column align="left" :label="$t('Operation.Response')" prop="path" width="100">
          <template #default="scope">
            <div>
              <el-popover v-if="scope.row.resp" placement="left-start" :width="444">
                <div class="popover-box">
                  <pre>{{ fmtBody(scope.row.resp) }}</pre>
                </div>
                <template #reference>
                  <el-icon style="cursor: pointer"><warning /></el-icon>
                </template>
              </el-popover>
              <span v-else>{{ $t('Operation.None') }}</span>
            </div>
          </template>
        </el-table-column>
        <!-- 原: 操作 -->
        <el-table-column align="center" header-align="center" :label="$t('Operation.Actions')" :min-width="100">
          <template #default="scope">
            <el-button icon="delete" type="primary" link @click="deleteSysOperationRecordFunc(scope.row)">
              {{ $t('Operation.Delete') }}
            </el-button>
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
  </div>
</template>

<script setup>
  import {
    deleteSysOperationRecord,
    getSysOperationRecordList,
    deleteSysOperationRecordByIds
  } from '@/api/sysOperationRecord' // 此处请自行替换地址
  import { formatDate } from '@/utils/format'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  defineOptions({
    name: 'SysOperationRecord'
  })

  const { t } = useI18n()

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({})
  const loading = ref(false)
  const onReset = () => {
    searchInfo.value = {}
  }
  // 条件搜索前端看此方法
  const onSubmit = () => {
    page.value = 1
    if (searchInfo.value.status === '') {
      searchInfo.value.status = null
    }
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

  // 查询
  const getTableData = async () => {
    loading.value = true
    try {
      const table = await getSysOperationRecordList({
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

  const multipleSelection = ref([])
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }
  const onDelete = async () => {
    ElMessageBox.confirm(t('Operation.ConfirmDelete'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const ids = []
      multipleSelection.value &&
        multipleSelection.value.forEach((item) => {
          ids.push(item.ID)
        })
      const res = await deleteSysOperationRecordByIds({ ids })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('Operation.DeleteSuccess') // 删除成功
        })
        if (tableData.value.length === ids.length && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }
  const deleteSysOperationRecordFunc = async (row) => {
    ElMessageBox.confirm(t('Operation.ConfirmDelete'), t('Common.Hint'), {
      confirmButtonText: t('Common.Confirm'),
      cancelButtonText: t('Common.Cancel'),
      type: 'warning'
    }).then(async () => {
      const res = await deleteSysOperationRecord({ ID: row.ID })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('Operation.DeleteSuccess') // 删除成功
        })
        if (tableData.value.length === 1 && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }
  const fmtBody = (value) => {
    try {
      return JSON.parse(value)
    } catch (_) {
      return value
    }
  }
</script>

<style lang="scss">
  .table-expand {
    padding-left: 60px;
    font-size: 0;
    label {
      width: 90px;
      color: #99a9bf;
      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }
  }
  .popover-box {
    background: #112435;
    color: #f08047;
    height: 600px;
    width: 420px;
    overflow: auto;
  }
  .popover-box::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
</style>
