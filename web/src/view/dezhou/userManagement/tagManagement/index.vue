<template>
  <div>
    <TableSkeletonWrapper :loading="tableLoading" :show-search="true">
      <template #search>
        <div class="gva-search-box">
          <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
            <!-- <el-form-item label="标签名称" prop="Remark">
              <el-input v-model="searchInfo.Remark" placeholder="请输入标签名称" clearable style="width: 240px" />
            </el-form-item> -->

            <el-form-item>
              <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
              <el-button icon="refresh" @click="onReset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <div class="gva-table-box">
        <div class="gva-btn-list" style="display: flex; justify-content: space-between">
          <el-button type="primary" icon="plus" @click="handleAdd">新增标签</el-button>
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
          <el-table-column align="center" type="index" width="70" label="序号" />

          <el-table-column align="center" label="标签ID" prop="Id" min-width="100" />

          <el-table-column align="center" label="标签名称" prop="Remark" min-width="200" />

          <el-table-column fixed="right" min-width="200" align="center" label="操作">
            <template #default="scope">
              <el-button type="primary" link icon="edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger" link icon="delete" @click="handleDelete(scope.row)">删除</el-button>
            </template>
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
    </TableSkeletonWrapper>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增标签' : '编辑标签'"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="标签名称" prop="Remark">
          <el-input v-model="formData.Remark" placeholder="请输入标签名称" clearable maxlength="50" show-word-limit />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitLoading">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { getRemarkListApi, createRemarkApi, updateRemarkApi, deleteRemarkApi } from '@/api/dezhou/tagManagement'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ref, reactive } from 'vue'

  defineOptions({
    name: 'TagManagement'
  })

  // 搜索表单
  const elSearchFormRef = ref()
  const searchInfo = ref({})

  // 表格控制
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableLoading = ref(false)
  const tableData = ref([])

  // 弹窗控制
  const dialogVisible = ref(false)
  const dialogType = ref('add') // add | edit
  const formRef = ref()
  const submitLoading = ref(false)

  // 表单数据
  const formData = reactive({
    Id: null,
    Remark: ''
  })

  // 表单验证规则
  const rules = {
    Remark: [
      { required: true, message: '请输入标签名称', trigger: 'blur' },
      { min: 1, max: 50, message: '标签名称长度在 1 到 50 个字符', trigger: 'blur' }
    ]
  }

  // 重置搜索
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

  // 获取表格数据
  const getTableData = async () => {
    tableLoading.value = true
    try {
      const params = {
        page: page.value,
        pageSize: pageSize.value,
        ...searchInfo.value
      }
      const res = await getRemarkListApi(params)
      if (res.code === 0) {
        tableData.value = res.data.list || []
        total.value = res.data.total || 0
        page.value = res.data.page || 1
        pageSize.value = res.data.pageSize || 10
      }
    } catch (error) {
      console.error('获取标签列表失败:', error)
      ElMessage.error('获取标签列表失败')
    } finally {
      tableLoading.value = false
    }
  }

  // 新增标签
  const handleAdd = () => {
    dialogType.value = 'add'
    formData.Id = null
    formData.Remark = ''
    dialogVisible.value = true
  }

  // 编辑标签
  const handleEdit = (row) => {
    dialogType.value = 'edit'
    formData.Id = row.Id
    formData.Remark = row.Remark
    dialogVisible.value = true
  }

  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return

    await formRef.value.validate(async (valid) => {
      if (!valid) return

      submitLoading.value = true
      try {
        const data = {
          Remark: formData.Remark
        }

        if (dialogType.value === 'edit') {
          data.Id = formData.Id
        }

        const api = dialogType.value === 'add' ? createRemarkApi : updateRemarkApi
        const res = await api(data)

        if (res.code === 0) {
          ElMessage.success(dialogType.value === 'add' ? '新增成功' : '编辑成功')
          dialogVisible.value = false
          getTableData()
        } else {
          ElMessage.error(res.msg || '操作失败')
        }
      } catch (error) {
        console.error('提交失败:', error)
        ElMessage.error('操作失败')
      } finally {
        submitLoading.value = false
      }
    })
  }

  // 删除标签
  const handleDelete = (row) => {
    ElMessageBox.confirm(`确定要删除标签"${row.Remark}"吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        try {
          const res = await deleteRemarkApi({ Id: row.Id })
          if (res.code === 0) {
            ElMessage.success('删除成功')
            getTableData()
          } else {
            ElMessage.error(res.msg || '删除失败')
          }
        } catch (error) {
          console.error('删除失败:', error)
          ElMessage.error('删除失败')
        }
      })
      .catch(() => {
        // 用户取消删除
      })
  }

  // 初始化加载数据
  getTableData()
</script>

<style lang="scss" scoped>
</style>
