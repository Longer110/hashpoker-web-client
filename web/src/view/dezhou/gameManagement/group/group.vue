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
        <template v-if="showAllQuery">
          <!-- 将需要控制显示状态的查询条件添加到此范围内 -->
        </template>

        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
          <el-button link type="primary" icon="arrow-down" @click="showAllQuery = true" v-if="!showAllQuery"
            >展开</el-button
          >
          <el-button link type="primary" icon="arrow-up" @click="showAllQuery = false" v-else>收起</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog()">新增</el-button>
        <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete"
          >删除</el-button
        >
      </div>
      <el-table
        v-adaptive="{ bottomOffset: 100 }"
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="Id"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column align="left" label="分店下的用户" prop="Id" width="120" />

        <el-table-column align="left" label="代理商名称" prop="GroupName" width="120" />

        <el-table-column align="left" label="渠道号" prop="ChannelMark" width="120" />

        <el-table-column align="left" label="分店ID" prop="ParentId" width="120" />

        <el-table-column align="left" label="分店的Appid" prop="AppID" min-width="220" />

        <el-table-column align="left" label="分店的Appid" prop="AppKey" min-width="220" />

        <el-table-column align="left" label="PrivateKey字段" prop="PrivateKey" min-width="220" />

        <el-table-column align="left" label="PublicKey字段" prop="PublicKey" width="120" />

        <el-table-column align="left" label="IV字段" prop="IV" min-width="220" />

        <el-table-column align="left" label="限制访问次数" prop="VisitNum" width="120" />

        <el-table-column align="left" label="是否开启 1：关闭  0：开启" prop="IsDelete" width="120">
          <template #default="scope">{{ formatBoolean(scope.row.IsDelete) }}</template>
        </el-table-column>
        <el-table-column align="left" label="CreateTime字段" prop="CreateTime" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreateTime) }}</template>
        </el-table-column>
        <el-table-column align="left" label="分店登陆入口" prop="ShopUrl" min-width="220" />

        <el-table-column align="left" label="ip ip ip" prop="WhiteList" width="120" />

        <el-table-column align="left" label="所属分组" prop="GroupId" width="120" />

        <el-table-column align="left" label="ChannelKey字段" prop="ChannelKey" min-width="220" />

        <el-table-column
          align="right"
          header-align="center"
          label="操作"
          fixed="right"
          :min-width="appStore.operateMinWith"
        >
          <template #default="scope">
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)"
              ><el-icon style="margin-right: 5px"><InfoFilled /></el-icon>查看</el-button
            >
            <el-button type="primary" link icon="edit" class="table-button" @click="updateGroupFunc(scope.row)"
              >编辑</el-button
            >
            <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el-button>
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

      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rule" label-width="80px">
        <el-form-item label="分店下的用户:" prop="Id">
          <el-input v-model.number="formData.Id" :clearable="true" placeholder="请输入分店下的用户" />
        </el-form-item>
        <el-form-item label="代理商名称:" prop="GroupName">
          <el-input v-model="formData.GroupName" :clearable="true" placeholder="请输入代理商名称" />
        </el-form-item>
        <el-form-item label="渠道号:" prop="ChannelMark">
          <el-input v-model="formData.ChannelMark" :clearable="true" placeholder="请输入渠道号" />
        </el-form-item>
        <el-form-item label="分店ID:" prop="ParentId">
          <el-input v-model.number="formData.ParentId" :clearable="true" placeholder="请输入分店ID" />
        </el-form-item>
        <el-form-item label="分店的Appid:" prop="AppID">
          <el-input v-model="formData.AppID" :clearable="true" placeholder="请输入分店的Appid" />
        </el-form-item>
        <el-form-item label="分店的Appid:" prop="AppKey">
          <el-input v-model="formData.AppKey" :clearable="true" placeholder="请输入分店的Appid" />
        </el-form-item>
        <el-form-item label="PrivateKey字段:" prop="PrivateKey">
          <el-input v-model="formData.PrivateKey" :clearable="true" placeholder="请输入PrivateKey字段" />
        </el-form-item>
        <el-form-item label="PublicKey字段:" prop="PublicKey">
          <el-input v-model="formData.PublicKey" :clearable="true" placeholder="请输入PublicKey字段" />
        </el-form-item>
        <el-form-item label="IV字段:" prop="IV">
          <el-input v-model="formData.IV" :clearable="true" placeholder="请输入IV字段" />
        </el-form-item>
        <el-form-item label="限制访问次数:" prop="VisitNum">
          <el-input v-model.number="formData.VisitNum" :clearable="true" placeholder="请输入限制访问次数" />
        </el-form-item>
        <el-form-item label="是否开启 1：关闭  0：开启:" prop="IsDelete">
          <el-switch
            v-model="formData.IsDelete"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            clearable
          ></el-switch>
        </el-form-item>
        <el-form-item label="CreateTime字段:" prop="CreateTime">
          <el-date-picker
            v-model="formData.CreateTime"
            type="date"
            style="width: 100%"
            placeholder="选择日期"
            :clearable="true"
          />
        </el-form-item>
        <el-form-item label="分店登陆入口:" prop="ShopUrl">
          <el-input v-model="formData.ShopUrl" :clearable="true" placeholder="请输入分店登陆入口" />
        </el-form-item>
        <el-form-item label="ip ip ip:" prop="WhiteList">
          <el-input v-model="formData.WhiteList" :clearable="true" placeholder="请输入ip ip ip" />
        </el-form-item>
        <el-form-item label="所属分组:" prop="GroupId">
          <el-input v-model.number="formData.GroupId" :clearable="true" placeholder="请输入所属分组" />
        </el-form-item>
        <el-form-item label="ChannelKey字段:" prop="ChannelKey">
          <el-input v-model="formData.ChannelKey" :clearable="true" placeholder="请输入ChannelKey字段" />
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="detailShow"
      :show-close="true"
      :before-close="closeDetailShow"
      title="查看"
    >
      <el-descriptions :column="1" border>
        <el-descriptions-item label="分店下的用户">
          {{ detailForm.Id }}
        </el-descriptions-item>
        <el-descriptions-item label="代理商名称">
          {{ detailForm.GroupName }}
        </el-descriptions-item>
        <el-descriptions-item label="渠道号">
          {{ detailForm.ChannelMark }}
        </el-descriptions-item>
        <el-descriptions-item label="分店ID">
          {{ detailForm.ParentId }}
        </el-descriptions-item>
        <el-descriptions-item label="分店的Appid">
          {{ detailForm.AppID }}
        </el-descriptions-item>
        <el-descriptions-item label="分店的Appid">
          {{ detailForm.AppKey }}
        </el-descriptions-item>
        <el-descriptions-item label="PrivateKey字段">
          {{ detailForm.PrivateKey }}
        </el-descriptions-item>
        <el-descriptions-item label="PublicKey字段">
          {{ detailForm.PublicKey }}
        </el-descriptions-item>
        <el-descriptions-item label="IV字段">
          {{ detailForm.IV }}
        </el-descriptions-item>
        <el-descriptions-item label="限制访问次数">
          {{ detailForm.VisitNum }}
        </el-descriptions-item>
        <el-descriptions-item label="是否开启 1：关闭  0：开启">
          {{ detailForm.IsDelete }}
        </el-descriptions-item>
        <el-descriptions-item label="CreateTime字段">
          {{ detailForm.CreateTime }}
        </el-descriptions-item>
        <el-descriptions-item label="分店登陆入口">
          {{ detailForm.ShopUrl }}
        </el-descriptions-item>
        <el-descriptions-item label="ip ip ip">
          {{ detailForm.WhiteList }}
        </el-descriptions-item>
        <el-descriptions-item label="所属分组">
          {{ detailForm.GroupId }}
        </el-descriptions-item>
        <el-descriptions-item label="ChannelKey字段">
          {{ detailForm.ChannelKey }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
  import { createGroup, deleteGroup, deleteGroupByIds, updateGroup, findGroup, getGroupList } from '@/api/dezhou/group'

  // 全量引入格式化工具 请按需保留
  import {
    getDictFunc,
    formatDate,
    formatBoolean,
    filterDict,
    filterDataSource,
    returnArrImg,
    onDownloadFile
  } from '@/utils/format'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ref, reactive } from 'vue'
  import { useAppStore } from '@/pinia'

  defineOptions({
    name: 'Group'
  })

  // 提交按钮loading
  const btnLoading = ref(false)
  const appStore = useAppStore()

  // 控制更多查询条件显示/隐藏状态
  const showAllQuery = ref(false)

  // 自动化生成的字典（可能为空）以及字段
  const formData = ref({
    Id: undefined,
    GroupName: '',
    ChannelMark: '',
    ParentId: undefined,
    AppID: '',
    AppKey: '',
    PrivateKey: '',
    PublicKey: '',
    IV: '',
    VisitNum: undefined,
    IsDelete: false,
    CreateTime: new Date(),
    ShopUrl: '',
    WhiteList: '',
    GroupId: undefined,
    ChannelKey: ''
  })

  // 验证规则
  const rule = reactive({})

  const elFormRef = ref()
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
      if (searchInfo.value.IsDelete === '') {
        searchInfo.value.IsDelete = null
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
    const table = await getGroupList({
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

  // 删除行
  const deleteRow = (row) => {
    ElMessageBox.confirm('确定要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      deleteGroupFunc(row)
    })
  }

  // 多选删除
  const onDelete = async () => {
    ElMessageBox.confirm('确定要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const Ids = []
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'warning',
          message: '请选择要删除的数据'
        })
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map((item) => {
          Ids.push(item.Id)
        })
      const res = await deleteGroupByIds({ Ids })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        if (tableData.value.length === Ids.length && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }

  // 行为控制标记（弹窗内部需要增还是改）
  const type = ref('')

  // 更新行
  const updateGroupFunc = async (row) => {
    const res = await findGroup({ Id: row.Id })
    type.value = 'update'
    if (res.code === 0) {
      formData.value = res.data
      dialogFormVisible.value = true
    }
  }

  // 删除行
  const deleteGroupFunc = async (row) => {
    const res = await deleteGroup({ Id: row.Id })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      if (tableData.value.length === 1 && page.value > 1) {
        page.value--
      }
      getTableData()
    }
  }

  // 弹窗控制标记
  const dialogFormVisible = ref(false)

  // 打开弹窗
  const openDialog = () => {
    type.value = 'create'
    dialogFormVisible.value = true
  }

  // 关闭弹窗
  const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {
      Id: undefined,
      GroupName: '',
      ChannelMark: '',
      ParentId: undefined,
      AppID: '',
      AppKey: '',
      PrivateKey: '',
      PublicKey: '',
      IV: '',
      VisitNum: undefined,
      IsDelete: false,
      CreateTime: new Date(),
      ShopUrl: '',
      WhiteList: '',
      GroupId: undefined,
      ChannelKey: ''
    }
  }
  // 弹窗确定
  const enterDialog = async () => {
    btnLoading.value = true
    elFormRef.value?.validate(async (valid) => {
      if (!valid) return (btnLoading.value = false)
      let res
      switch (type.value) {
        case 'create':
          res = await createGroup(formData.value)
          break
        case 'update':
          res = await updateGroup(formData.value)
          break
        default:
          res = await createGroup(formData.value)
          break
      }
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

  const detailForm = ref({})

  // 查看详情控制标记
  const detailShow = ref(false)

  // 打开详情弹窗
  const openDetailShow = () => {
    detailShow.value = true
  }

  // 打开详情
  const getDetails = async (row) => {
    // 打开弹窗
    const res = await findGroup({ Id: row.Id })
    if (res.code === 0) {
      detailForm.value = res.data
      openDetailShow()
    }
  }

  // 关闭详情弹窗
  const closeDetailShow = () => {
    detailShow.value = false
    detailForm.value = {}
  }
</script>

<style></style>
