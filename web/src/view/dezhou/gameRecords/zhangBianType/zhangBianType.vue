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
        <!-- <el-form-item label="账变类型" prop="typeId">
          <el-input v-model.number="searchInfo.typeId" placeholder="请输入账变类型" clearable />
        </el-form-item>

        <el-form-item label="账变名称" prop="name">
          <el-input v-model="searchInfo.name" placeholder="请输入账变名称" clearable />
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="gva-table-box">
      <!-- 表格部分 -->
      <el-table
        v-adaptive="{ bottomOffset: 100 }"
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="typeId"
      >
        <el-table-column align="center" label="序号" type="index" width="70" />
        <el-table-column align="center" label="账变类型" prop="typeId" width="200" />
        <el-table-column align="center" label="账变名称" prop="name" min-width="200" />
      </el-table>

      <!-- <div class="gva-pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div> -->
    </div>
  </div>
</template>

<script setup>
  import { getZhangBianTypeApi } from '@/api/dezhou/zhangBianType'
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'

  defineOptions({
    name: 'ZhangBianType'
  })

  const searchInfo = ref({
    typeId: undefined,
    name: undefined
  })

  const tableData = ref([])

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)

  // 表单引用
  const elSearchFormRef = ref()

  // 获取表格数据
  const getTableData = async () => {
    try {
      const res = await getZhangBianTypeApi({
        page: page.value,
        pageSize: pageSize.value,
        ...searchInfo.value
      })

      if (res.code === 0) {
        tableData.value = res.data?.List || res.data?.list || []
        total.value = res.data?.total || tableData.value.length
      } else {
        ElMessage.error(res.msg || '获取数据失败')
      }
    } catch (error) {
      ElMessage.error('获取数据失败')
      console.error('获取账变类型数据失败:', error)
    }
  }

  const onSubmit = () => {
    page.value = 1
    getTableData()
  }

  const onReset = () => {
    searchInfo.value = {
      typeId: undefined,
      name: undefined
    }
    page.value = 1
    getTableData()
  }

  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  getTableData()
</script>

<style lang="scss" scoped>
  .gva-search-box {
    margin-bottom: 20px;
  }
</style>
