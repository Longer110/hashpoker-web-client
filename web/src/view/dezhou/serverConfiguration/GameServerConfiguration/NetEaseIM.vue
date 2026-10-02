<template>
  <div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog()">新增</el-button>
        <!-- <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete"
          >删除</el-button
        > -->
      </div>
      <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="id"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="70" />

        <el-table-column align="left" label="IM后端请求" prop="url" min-width="150" />

        <el-table-column align="left" label="IM地址" prop="IMUrl" min-width="150" />

        <el-table-column align="left" label="appKey" prop="appKey" min-width="150" />

        <el-table-column align="left" label="appSecret" prop="appSecret" min-width="150" />

        <el-table-column align="left" label="充值请求" prop="sPayUrl" min-width="150" />

        <el-table-column align="left" label="提现请求" prop="sWithDrowUrl" min-width="150" />

        <el-table-column align="left" label="获取用户金币额度" prop="sClubWithDrawGoldUrl" min-width="150" />

        <el-table-column align="left" label="手动转账充值/提现" prop="sManualTransferUrl" min-width="150" />

        <el-table-column align="left" label="短信/邮箱" prop="sPhoneUrl" min-width="150" />

        <el-table-column align="left" label="分享/推荐地址" prop="sRecommendShareUrl" min-width="150" />

        <el-table-column
          align="right"
          header-align="center"
          label="操作"
          fixed="right"
          :min-width="appStore.operateMinWith"
        >
          <template #default="scope">
            <el-button type="primary" link icon="edit" class="table-button" @click="updateNetEaseIMFunc(scope.row)"
              >编辑</el-button
            >
            <!-- <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el-button> -->
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
    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="dialogFormVisible"
      :show-close="false"
      :before-close="closeDialog"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">{{ type === 'create' ? '新增' : '编辑' }}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">确 定</el-button>
            <el-button @click="closeDialog">取 消</el-button>
          </div>
        </div>
      </template>

      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rule" label-width="180px">
        <el-form-item label="IM后端请求:" prop="url">
          <el-input v-model="formData.url" :clearable="true" placeholder="请输入IM后端请求地址" />
        </el-form-item>

        <el-form-item label="IM地址:" prop="IMUrl">
          <el-input v-model="formData.IMUrl" :clearable="true" placeholder="请输入IM地址" />
        </el-form-item>

        <el-form-item label="appSecret:" prop="appSecret">
          <el-input v-model="formData.appSecret" :clearable="true" placeholder="请输入appSecret" />
        </el-form-item>

        <el-form-item label="appKey:" prop="appKey">
          <el-input v-model="formData.appKey" :clearable="true" placeholder="请输入appKey" />
        </el-form-item>

        <el-form-item label="充值请求:" prop="sPayUrl">
          <el-input v-model="formData.sPayUrl" :clearable="true" placeholder="请输入充值请求地址" />
        </el-form-item>

        <el-form-item label="提现请求:" prop="sWithDrowUrl">
          <el-input v-model="formData.sWithDrowUrl" :clearable="true" placeholder="请输入提现请求地址" />
        </el-form-item>

        <el-form-item label="获取用户金币额度:" prop="sClubWithDrawGoldUrl">
          <el-input
            v-model="formData.sClubWithDrawGoldUrl"
            :clearable="true"
            placeholder="请输入获取用户金币额度地址"
          />
        </el-form-item>

        <el-form-item label="手动转账充值/提现:" prop="sManualTransferUrl">
          <el-input v-model="formData.sManualTransferUrl" :clearable="true" placeholder="请输入手动转账充值/提现地址" />
        </el-form-item>

        <el-form-item label="短信/邮箱:" prop="sPhoneUrl">
          <el-input v-model="formData.sPhoneUrl" :clearable="true" placeholder="请输入短信/邮箱地址" />
        </el-form-item>

        <el-form-item label="分享/推荐地址:" prop="sRecommendShareUrl">
          <el-input v-model="formData.sRecommendShareUrl" :clearable="true" placeholder="请输入分享/推荐地址" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
  import { getNetEaseIMList, createOrUpdateNetEaseIM } from '@/api/dezhou/NetEaseIM'

  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ref, reactive } from 'vue'
  import { useAppStore } from '@/pinia'

  defineOptions({
    name: 'NetEaseIM'
  })

  const btnLoading = ref(false)
  const appStore = useAppStore()

  const formData = ref({
    url: '',
    IMUrl: '',
    appSecret: '',
    appKey: '',
    sPayUrl: '',
    sWithDrowUrl: '',
    sClubWithDrawGoldUrl: '',
    sManualTransferUrl: '',
    sPhoneUrl: '',
    sRecommendShareUrl: ''
  })

  // 验证规则
  const rule = reactive({
    url: [{ required: true, message: '请输入IM后端请求地址', trigger: 'blur' }],
    IMUrl: [{ required: true, message: '请输入IM地址', trigger: 'blur' }],
    appSecret: [{ required: true, message: '请输入appSecret', trigger: 'blur' }],
    appKey: [{ required: true, message: '请输入appKey', trigger: 'blur' }],
    sPayUrl: [{ required: true, message: '请输入充值请求地址', trigger: 'blur' }],
    sWithDrowUrl: [{ required: true, message: '请输入提现请求地址', trigger: 'blur' }]
  })

  const elFormRef = ref()

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])

  // 分页
  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }

  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }

  // 查询列表
  const getTableData = async () => {
    const table = await getNetEaseIMList({
      page: page.value,
      pageSize: pageSize.value
    })
    if (table.code === 0) {
      tableData.value = table.data.list
      total.value = table.data.total
      page.value = table.data.page
      pageSize.value = table.data.pageSize
    }
  }

  getTableData()
  // 多选数据
  const multipleSelection = ref([])
  // 多选
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }

  // 删除行
  const deleteRow = (row) => {
    // ElMessageBox.confirm('确定要删除吗?', '提示', {
    //   confirmButtonText: '确定',
    //   cancelButtonText: '取消',
    //   type: 'warning'
    // }).then(() => {
    //   deleteNetEaseIMFunc(row)
    // })
  }

  // 多选删除
  const onDelete = async () => {
    // ElMessageBox.confirm('确定要删除吗?', '提示', {
    //   confirmButtonText: '确定',
    //   cancelButtonText: '取消',
    //   type: 'warning'
    // }).then(async () => {
    //   const ids = []
    //   if (multipleSelection.value.length === 0) {
    //     ElMessage({
    //       type: 'warning',
    //       message: '请选择要删除的数据'
    //     })
    //     return
    //   }
    //   multipleSelection.value &&
    //     multipleSelection.value.map((item) => {
    //       ids.push(item.id)
    //     })
    //   const res = await deleteNetEaseIMByIds({ ids })
    //   if (res.code === 0) {
    //     ElMessage({
    //       type: 'success',
    //       message: '删除成功'
    //     })
    //     if (tableData.value.length === ids.length && page.value > 1) {
    //       page.value--
    //     }
    //     getTableData()
    //   }
    // })
  }

  const type = ref('')

  // 编辑
  const updateNetEaseIMFunc = async (row) => {
    type.value = 'edit'
    formData.value = {
      id: row.id,
      url: row.url,
      IMUrl: row.IMUrl,
      appSecret: row.appSecret,
      appKey: row.appKey,
      sPayUrl: row.sPayUrl,
      sWithDrowUrl: row.sWithDrowUrl,
      sClubWithDrawGoldUrl: row.sClubWithDrawGoldUrl,
      sManualTransferUrl: row.sManualTransferUrl,
      sPhoneUrl: row.sPhoneUrl,
      sRecommendShareUrl: row.sRecommendShareUrl
    }
    dialogFormVisible.value = true
  }

  // 删除行
  const deleteNetEaseIMFunc = async (row) => {
    // const res = await deleteNetEaseIM({ id: row.id })
    // if (res.code === 0) {
    //   ElMessage({
    //     type: 'success',
    //     message: '删除成功'
    //   })
    //   if (tableData.value.length === 1 && page.value > 1) {
    //     page.value--
    //   }
    //   getTableData()
    // }
  }

  const dialogFormVisible = ref(false)

  // 打开弹窗
  const openDialog = () => {
    type.value = 'create'
    formData.value = {
      url: '',
      IMUrl: '',
      appSecret: '',
      appKey: '',
      sPayUrl: '',
      sWithDrowUrl: '',
      sClubWithDrawGoldUrl: '',
      sManualTransferUrl: '',
      sPhoneUrl: '',
      sRecommendShareUrl: ''
    }
    dialogFormVisible.value = true
  }

  // 关闭弹窗
  const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {
      url: '',
      IMUrl: '',
      appSecret: '',
      appKey: '',
      sPayUrl: '',
      sWithDrowUrl: '',
      sClubWithDrawGoldUrl: '',
      sManualTransferUrl: '',
      sPhoneUrl: '',
      sRecommendShareUrl: ''
    }
  }

  // 弹窗确定
  const enterDialog = async () => {
    btnLoading.value = true
    elFormRef.value?.validate(async (valid) => {
      if (!valid) return (btnLoading.value = false)
      let res = await createOrUpdateNetEaseIM(formData.value)
      btnLoading.value = false
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '创建/更改成功'
        })
        closeDialog()
        getTableData()
      }
    })
  }
</script>

<style></style>
