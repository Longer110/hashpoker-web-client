<template>
  <div>
    <div class="gva-search-box">
      <el-form
        ref="elSearchFormRef"
        :inline="true"
        :model="searchInfo"
        class="demo-form-inline"
        @keyup.enter="onSubmit"
      >
        <el-form-item label="用户ID" prop="UserID">
          <el-input clearable v-model.number="searchInfo.UserID" placeholder="搜索条件" style="width: 240px" />
        </el-form-item>
        <el-form-item label="订单号" prop="OrderID">
          <el-input clearable v-model.trim="searchInfo.OrderID" placeholder="搜索条件" style="width: 240px" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list"></div>

      <el-table
        v-adaptive="{ bottomOffset: 100 }"
        height="900"
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="UserID"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" width="70" align="center" label="序号" />
        <el-table-column align="center" label="用户Id" prop="UserId" min-width="120" />
        <el-table-column align="center" label="操作者账号" prop="Name" min-width="120" />
        <el-table-column align="center" label="订单号" prop="OrderId" min-width="180" sortable />

        <el-table-column align="center" label="转账金额" prop="Amount" min-width="150" sortable>
          <template #default="scope">
            <span :style="{ color: scope.row.Amount > 0 ? 'red' : scope.row.Amount < 0 ? 'green' : '#fff' }">
              {{ scope.row.Amount }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="流水编号" prop="id" min-width="150" sortable />
        <el-table-column align="center" label="描述" prop="Msg" min-width="150" />
        <el-table-column align="center" label="时间" prop="CreateTime" min-width="150">
          <template #default="scope">{{ formatDate(scope.row.CreateTime) }}</template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { getTransferLogListApi } from '@/api/dezhou/transferManagement'

  // 全量引入格式化工具 请按需保留
  import { formatDate } from '@/utils/format'
  import { ref } from 'vue'

  defineOptions({
    name: 'bannedList'
  })
  const elSearchFormRef = ref()

  // =========== 表格控制部分 ===========
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({})
  // 重置
  const onReset = () => {
    searchInfo.value = {}
    getTableData()
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

  // 分页
  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  // 修改页面容量
  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  // 查询
  const getTableData = async () => {
    const table = await getTransferLogListApi({
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
  }

  getTableData()

  // 获取需要的字典 可能为空 按需保留
  const setOptions = async () => {}

  // 获取需要的字典 可能为空 按需保留
  setOptions()
</script>

<style></style>
