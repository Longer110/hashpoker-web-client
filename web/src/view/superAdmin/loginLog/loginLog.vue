<template>
  <div>
    <TableSkeletonWrapper :loading="loading" :show-search="true">
      <template #search>
        <div class="gva-search-box">
          <el-form :inline="true" :model="searchInfo">
            <!-- 登录IP -->
            <el-form-item :label="$t('LoginLog.LoginIp')">
              <el-input v-model="searchInfo.LogonIP" placeholder="请输入" style="width: 240px"  clearable/>
            </el-form-item>
            <!-- 登录地点 -->
            <el-form-item :label="$t('LoginLog.LoginLocation')">
              <el-input v-model="searchInfo.LogonLocation" placeholder="请输入" style="width: 240px"  clearable/>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="search" @click="onSubmit">
                <!-- 查询 -->
                {{ $t('GlobalUniversality.Query') }}
              </el-button>
              <el-button icon="refresh" @click="onReset">
                <!-- 重置 -->
                {{ $t('GlobalUniversality.Reset') }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <div class="gva-table-box">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          tooltip-effect="dark"
          row-key="ID"
          @selection-change="handleSelectionChange"
        >
        <!-- 序号 -->
        <el-table-column align="center" :label="$t('LoginLog.Sort')" type="index" width="70" />
        <!-- 登录地点 -->
        <el-table-column align="center" :label="$t('LoginLog.LoginLocation')" prop="LogonLocation" min-width="50" />
        <!-- 登录次数 -->
        <el-table-column align="center" :label="$t('LoginLog.LoginTimes')" prop="LoginCount" min-width="50" />
        <!-- 用户ID -->
        <el-table-column align="center" :label="$t('LoginLog.UserId')" prop="UserID" min-width="50"> </el-table-column>
        <!-- 登陆IP -->
        <el-table-column align="center" :label="$t('LoginLog.LoginIp')" prop="LogonIP" min-width="50" > </el-table-column>
        <!-- 登陆渠道 -->
        <el-table-column align="center" :label="$t('LoginLog.LoginChannel')" prop="LogonChannel" min-width="50"> </el-table-column>
        <!-- 机器码 -->
        <el-table-column align="center" :label="$t('LoginLog.MachineCode')" prop="LogonModels" min-width="80"> </el-table-column>
        <!-- 登陆时间 -->
        <el-table-column align="center" :label="$t('LoginLog.LoginTime')" prop="LogonTime" min-width="80">
          <template #default="scope">
            {{ formatDate(scope.row.LogonTime) }}
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
  import { deleteSysOperationRecord } from '@/api/sysOperationRecord' // 此处请自行替换地址

  import { getUserLogonRecordListApi } from '@/api/sysLoginLog'
  import { formatDate } from '@/utils/format'
  import { ref } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  defineOptions({
    name: 'SysOperationRecord'
  })

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({})
  const loading = ref(false)
  const onReset = () => {
    searchInfo.value = {}
    getTableData()
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
      const table = await getUserLogonRecordListApi({
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
