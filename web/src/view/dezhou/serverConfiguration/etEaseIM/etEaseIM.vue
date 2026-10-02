<template>
  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-toolbar="true"
      :toolbar-button-count="1"
      :row-count="pageSize"
    >
      <div class="gva-table-box">
        <div class="gva-btn-list">
          <!-- 原: 新增 -->
          <el-button type="primary" icon="plus" @click="openDialog()">{{ $t('NetEaseIM.Add') }}</el-button>
          <!-- <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete"
          >{{ $t('NetEaseIM.Delete') }}</el-button
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
        <!-- 原: 序号 -->
        <el-table-column type="index" :label="$t('NetEaseIM.Index')" width="70" />

        <!-- 原: IM后端请求 -->
        <el-table-column align="left" :label="$t('NetEaseIM.Url')" prop="url" min-width="150" />
        <!-- 原: 语音房URL -->
        <el-table-column align="left" :label="$t('NetEaseIM.RoomURL')" prop="RoomURL" min-width="150" />

        <!-- 原: IM地址 -->
        <el-table-column align="left" :label="$t('NetEaseIM.IMUrl')" prop="IMUrl" min-width="150" />

        <!-- 原: appKey -->
        <el-table-column align="left" :label="$t('NetEaseIM.AppKey')" prop="appKey" min-width="150" />

        <!-- 原: appSecret -->
        <el-table-column align="left" :label="$t('NetEaseIM.AppSecret')" prop="appSecret" min-width="150" />

        <!-- 原: 充值请求 -->
        <el-table-column align="left" :label="$t('NetEaseIM.PayUrl')" prop="sPayUrl" min-width="150" />

        <!-- 原: 提现请求 -->
        <el-table-column align="left" :label="$t('NetEaseIM.WithdrawUrl')" prop="sWithDrowUrl" min-width="150" />

        <!-- 原: 获取用户金币额度 -->
        <el-table-column align="left" :label="$t('NetEaseIM.ClubWithdrawGoldUrl')" prop="sClubWithDrawGoldUrl" min-width="150" />

        <!-- 原: 手动转账充值/提现 -->
        <el-table-column align="left" :label="$t('NetEaseIM.ManualTransferUrl')" prop="sManualTransferUrl" min-width="150" />

        <!-- 原: 短信/邮箱 -->
        <el-table-column align="left" :label="$t('NetEaseIM.PhoneUrl')" prop="sPhoneUrl" min-width="150" />

        <!-- 原: 分享/推荐地址 -->
        <el-table-column align="left" :label="$t('NetEaseIM.RecommendShareUrl')" prop="sRecommendShareUrl" min-width="150" />

        <el-table-column align="right" header-align="center" :label="$t('NetEaseIM.Actions')" fixed="right" :min-width="80">
          <template #default="scope">
            <el-button type="primary" link icon="edit" class="table-button" @click="updateNetEaseIMFunc(scope.row)">
              {{ $t('NetEaseIM.Edit') }}</el-button
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
    </TableSkeletonWrapper>
    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="dialogFormVisible"
      :show-close="false"
      :before-close="closeDialog"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <!-- 原: 新增 / 编辑 -->
          <span class="text-lg">{{ type === 'create' ? $t('NetEaseIM.Add') : $t('NetEaseIM.Edit') }}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">{{ $t('Common.Confirm') }}</el-button>
            <el-button @click="closeDialog">{{ $t('Common.Cancel') }}</el-button>
          </div>
        </div>
      </template>

      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rule" label-width="180px">
        <!-- 原: IM后端请求 -->
        <el-form-item :label="$t('NetEaseIM.Url')" prop="url">
          <el-input v-model="formData.url" :clearable="true" :placeholder="$t('NetEaseIM.PlaceholderUrl')" />
        </el-form-item>
        <!-- 原: 语音房URL -->
        <el-form-item :label="$t('NetEaseIM.RoomURL')" prop="RoomURL">
          <el-input v-model="formData.RoomURL" :clearable="true" :placeholder="$t('NetEaseIM.PlaceholderRoomURL')" />
        </el-form-item>
        <!-- 原: IM地址 -->
        <el-form-item :label="$t('NetEaseIM.IMUrl')" prop="IMUrl">
          <el-input v-model="formData.IMUrl" :clearable="true" :placeholder="$t('NetEaseIM.PlaceholderIMUrl')" />
        </el-form-item>

        <!-- 原: appSecret -->
        <el-form-item :label="$t('NetEaseIM.AppSecret')" prop="appSecret">
          <el-input v-model="formData.appSecret" :clearable="true" :placeholder="$t('NetEaseIM.PlaceholderAppSecret')" />
        </el-form-item>

        <!-- 原: appKey -->
        <el-form-item :label="$t('NetEaseIM.AppKey')" prop="appKey">
          <el-input v-model="formData.appKey" :clearable="true" :placeholder="$t('NetEaseIM.PlaceholderAppKey')" />
        </el-form-item>

        <!-- 原: 充值请求 -->
        <el-form-item :label="$t('NetEaseIM.PayUrl')" prop="sPayUrl">
          <el-input v-model="formData.sPayUrl" :clearable="true" :placeholder="$t('NetEaseIM.PlaceholderPayUrl')" />
        </el-form-item>

        <!-- 原: 提现请求 -->
        <el-form-item :label="$t('NetEaseIM.WithdrawUrl')" prop="sWithDrowUrl">
          <el-input v-model="formData.sWithDrowUrl" :clearable="true" :placeholder="$t('NetEaseIM.PlaceholderWithdrawUrl')" />
        </el-form-item>

        <!-- 原: 获取用户金币额度 -->
        <el-form-item :label="$t('NetEaseIM.ClubWithdrawGoldUrl')" prop="sClubWithDrawGoldUrl">
          <el-input
            v-model="formData.sClubWithDrawGoldUrl"
            :clearable="true"
            :placeholder="$t('NetEaseIM.PlaceholderClubWithdrawGoldUrl')"
          />
        </el-form-item>

        <!-- 原: 手动转账充值/提现 -->
        <el-form-item :label="$t('NetEaseIM.ManualTransferUrl')" prop="sManualTransferUrl">
          <el-input v-model="formData.sManualTransferUrl" :clearable="true" :placeholder="$t('NetEaseIM.PlaceholderManualTransferUrl')" />
        </el-form-item>

        <!-- 原: 短信/邮箱 -->
        <el-form-item :label="$t('NetEaseIM.PhoneUrl')" prop="sPhoneUrl">
          <el-input v-model="formData.sPhoneUrl" :clearable="true" :placeholder="$t('NetEaseIM.PlaceholderPhoneUrl')" />
        </el-form-item>

        <!-- 原: 分享/推荐地址 -->
        <el-form-item :label="$t('NetEaseIM.RecommendShareUrl')" prop="sRecommendShareUrl">
          <el-input v-model="formData.sRecommendShareUrl" :clearable="true" :placeholder="$t('NetEaseIM.PlaceholderRecommendShareUrl')" />
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
  import { useI18n } from 'vue-i18n'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  const { t } = useI18n()

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
    // 请输入IM后端请求地址
    url: [{ required: true, message: t('NetEaseIM.PlaceholderUrl'), trigger: 'blur' }],
    // 请输入语音房URL
    RoomURL: [{ required: true, message: t('NetEaseIM.PlaceholderRoomURL'), trigger: 'blur' }],
    // 请输入IM地址
    IMUrl: [{ required: true, message: t('NetEaseIM.PlaceholderIMUrl'), trigger: 'blur' }],
    // 请输入appSecret
    appSecret: [{ required: true, message: t('NetEaseIM.PlaceholderAppSecret'), trigger: 'blur' }],
    // 请输入appKey
    appKey: [{ required: true, message: t('NetEaseIM.PlaceholderAppKey'), trigger: 'blur' }],
    // 请输入充值请求地址
    sPayUrl: [{ required: true, message: t('NetEaseIM.PlaceholderPayUrl'), trigger: 'blur' }],
    // 请输入提现请求地址
    sWithDrowUrl: [{ required: true, message: t('NetEaseIM.PlaceholderWithdrawUrl'), trigger: 'blur' }]
  })

  const elFormRef = ref()

  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const loading = ref(false)

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
    loading.value = true
    try {
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
    } finally {
      loading.value = false
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
          message: t('NetEaseIM.CreateOrUpdateSuccess') // 创建/更改成功
        })
        closeDialog()
        getTableData()
      }
    })
  }
</script>

<style></style>
