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
        <el-form-item label="商户号" prop="serialNo">
          <el-input clearable v-model.trim="searchInfo.serialNo" placeholder="搜索条件" style="width: 240px" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchInfo.State" placeholder="请选择活动状态" style="width: 240px">
            <el-option v-for="item in TypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
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
        <el-table-column type="index" width="55" align="center" />

        <el-table-column align="center" label="用户ID" prop="UserID" min-width="150" sortable />

        <el-table-column align="center" label="订单号" prop="OrderID" min-width="190" sortable />

        <el-table-column align="center" label="商户号" prop="serialNo" min-width="190" />

        <el-table-column align="center" label="转账金额" prop="Amount" min-width="150" sortable>
          <template #default="scope">
            <span :style="{ color: scope.row.Amount > 0 ? 'red' : scope.row.Amount < 0 ? 'green' : '#fff' }">
              {{ scope.row.Amount }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="账户余额" prop="balance" min-width="150" sortable />

        <el-table-column align="center" label="状态" prop="State" min-width="120" sortable>
          <!-- 使用模板自定义显示内容 -->
          <template #default="scope">
            <!-- scope.row 可以获取当前行的数据 -->
            <span v-if="scope.row.State == 0">待处理</span>
            <span v-else-if="scope.row.State == 1">成功</span>
            <span v-else-if="scope.row.State == 2">失败</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="描述" prop="remark" min-width="180" />

        <el-table-column align="center" label="转账时间" prop="updatedAt" min-width="150">
          <template #default="scope">{{ formatDate(scope.row.STime) }}</template>
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

    <el-dialog width="600" ref="unblockFormRef" v-model="unblockShow" title="解封" align-center>
      <el-form label-position="top" :model="unblockFormInline" class="demo-form-inline">
        <el-form-item label="用户ID">
          <el-input v-model="unblockFormInline.UserID" placeholder="用户ID" clearable disabled="true" />
        </el-form-item>
        <el-form-item label="解封类型">
          <el-select v-model="unblockFormInline.AType" placeholder="请选择解封类型" style="width: 240px">
            <el-option v-for="item in penaltyOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="unblockShow = false">取消</el-button>
          <el-button type="primary" @click="unblockRow"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { getBillRecordListApi } from '@/api/dezhou/transferManagement'

  // 全量引入格式化工具 请按需保留
  import { formatDate } from '@/utils/format'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  // 获取路由实例
  const router = useRouter()
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
    const table = await getBillRecordListApi({
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

  // ============== 表格控制部分结束 ===============

  // 获取需要的字典 可能为空 按需保留
  const setOptions = async () => {}

  // 获取需要的字典 可能为空 按需保留
  setOptions()

  // 多选数据
  const multipleSelection = ref([])
  // 多选
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }

  let unblockFormRef = ref()
  const penaltyOptions = [
    { label: '账号封禁', value: 1 },
    { label: '世界聊天禁言', value: 2 },
    { label: 'IP封禁', value: 3 },
    { label: 'GPS封禁', value: 4 }
  ]

  const TypeOptions = ref([
    { label: '待处理', value: 0 },

    { label: '成功', value: 1 },
    { label: '失败', value: 2 }
  ])
</script>
