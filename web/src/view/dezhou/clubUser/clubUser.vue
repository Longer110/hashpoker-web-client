<template>
  <div>
    <TableSkeletonWrapper
      :loading="loading"
      :show-search="true"
      :search-field-count="2"
      :search-button-count="2"
      :show-toolbar="true"
      :toolbar-button-count="2"
      :row-count="pageSize"
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
            <!-- 玩家ID -->
            <el-form-item :label="$t('ClubUser.Search.UserIdLabel')" prop="UserId">
              <el-input
                v-model.number="searchInfo.UserId"
                clearable
                :placeholder="$t('ClubUser.Search.Placeholder')"
                style="width: 240px"
              />
            </el-form-item>

            <!-- 俱乐部ID -->
            <el-form-item :label="$t('ClubUser.Search.ClubIdLabel')" prop="ClubId">
              <el-input
                v-model.number="searchInfo.ClubId"
                clearable
                :placeholder="$t('ClubUser.Search.Placeholder')"
                style="width: 240px"
              />
            </el-form-item>

            <!-- <el-form-item label="身份，1:主席  10:管理员  20:普通成员" prop="Identify">
              <el-input v-model.number="searchInfo.Identify" placeholder="搜索条件" />
            </el-form-item> -->

            <el-form-item>
              <!-- 查询 -->
              <el-button type="primary" icon="search" @click="onSubmit">{{ $t('GlobalUniversality.Query') }}</el-button>
              <!-- 重置 -->
              <el-button icon="refresh" @click="onReset">{{ $t('GlobalUniversality.Reset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <div class="gva-table-box">
        <div class="gva-btn-list">
          <!-- 新增 -->
          <el-button type="primary" icon="plus" @click="openDialog()">{{ $t('ClubUser.Actions.Add') }}</el-button>
          <!-- 删除 -->
          <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete">{{
            $t('ClubUser.Actions.Delete')
          }}</el-button>
        </div>
        <el-table
          v-adaptive="{ bottomOffset: 100 }"
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="id"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <!-- 序号 -->
          <el-table-column align="center" type="index" width="70" :label="$t('ClubUser.Table.Index')" />
          <!-- ID -->
          <el-table-column align="center" :label="$t('ClubUser.Table.Id')" prop="id" min-width="150" />
          <!-- 玩家ID -->
          <el-table-column align="center" :label="$t('ClubUser.Table.UserId')" prop="UserId" min-width="150">
            <template #default="scope">
              <span v-copy="scope.row.UserId" style="cursor: pointer">
                <u @click="goAccountsInFo(scope.row.UserId)">{{ scope.row.UserId }}</u>
              </span>
            </template>
          </el-table-column>
          <!-- 俱乐部ID -->
          <el-table-column align="center" :label="$t('ClubUser.Table.ClubId')" prop="ClubId" min-width="150" />
          <!-- 玩家余额 -->
          <el-table-column align="center" :label="$t('ClubUser.Table.Money')" prop="Money" min-width="150" />
          <!-- 加入俱乐部的时间 -->
          <el-table-column align="center" :label="$t('ClubUser.Table.JoinTime')" prop="JoinTime" width="180">
            <template #default="scope">{{ formatDate(scope.row.JoinTime) }}</template>
          </el-table-column>
          <!-- <el-table-column
            align="left"
            label="身份，1:主席  10:管理员  20:普通成员"
            prop="Identify"
            min-width="220"
          /> -->
          <!-- 身份 -->
          <el-table-column
            :label="$t('ClubUser.Table.Identity')"
            prop="Identify"
            min-width="120"
            align="center"
            sortable
          >
            <template #default="scope">
              <div v-if="scope.row.Identify === 1" class="identity-badge identity-1">
                <i class="el-icon-s-custom"></i> {{ $t('ClubUser.Identity.President') }}
              </div>
              <div v-else-if="scope.row.Identify === 10" class="identity-badge identity-10">
                <i class="el-icon-user-solid"></i> {{ $t('ClubUser.Identity.Admin') }}
              </div>
              <div v-else-if="scope.row.Identify === 20" class="identity-badge identity-20">
                <i class="el-icon-user"></i> {{ $t('ClubUser.Identity.Member') }}
              </div>
              <div v-else class="identity-badge">
                <i class="el-icon-question"></i> {{ $t('ClubUser.Identity.Unknown') }} ({{ scope.row.Identify }})
              </div>
            </template>
          </el-table-column>

          <!-- <el-table-column
            align="left"
            label="成员管理权限 0无 1有"
            prop="MemberPower"
            min-width="120"
          /> -->
          <!-- 成员管理权限 -->
          <el-table-column
            :label="$t('ClubUser.Table.MemberPower')"
            prop="MemberPower"
            min-width="150"
            align="center"
            sortable
          >
            <template #default="scope">
              <div v-if="scope.row.MemberPower == 1">{{ $t('ClubUser.Power.HasPermission') }}</div>
              <div v-else-if="scope.row.MemberPower == 0">{{ $t('ClubUser.Power.NoPermission') }}</div>
              <div v-else>{{ $t('ClubUser.Power.Unknown') }} ({{ scope.row.MemberPower }})</div>
            </template>
          </el-table-column>
          <!-- <el-table-column
            align="left"
            label="俱乐部币管理权限  0无 1有"
            prop="ClubGoldPower"
            min-width="120"
          /> -->

          <!-- 俱乐部币管理权限 -->
          <el-table-column
            :label="$t('ClubUser.Table.ClubGoldPower')"
            prop="ClubGoldPower"
            min-width="180"
            align="center"
            sortable
          >
            <template #default="scope">
              <div v-if="scope.row.ClubGoldPower == 1">{{ $t('ClubUser.Power.HasPermission') }}</div>
              <div v-else-if="scope.row.ClubGoldPower == 0">{{ $t('ClubUser.Power.NoPermission') }}</div>
              <div v-else>{{ $t('ClubUser.Power.Unknown') }} ({{ scope.row.ClubGoldPower }})</div>
            </template>
          </el-table-column>

          <!-- <el-table-column
            align="left"
            label="桌子管理权限  0无 1有"
            prop="TablePower"
            min-width="120"
          /> -->

          <!-- 桌子管理权限 -->
          <el-table-column
            :label="$t('ClubUser.Table.TablePower')"
            prop="TablePower"
            min-width="150"
            align="center"
            sortable
          >
            <template #default="scope">
              <div v-if="scope.row.TablePower == 1">{{ $t('ClubUser.Power.HasPermission') }}</div>
              <div v-else-if="scope.row.TablePower == 0">{{ $t('ClubUser.Power.NoPermission') }}</div>
              <div v-else>{{ $t('ClubUser.Power.Unknown') }} ({{ scope.row.TablePower }})</div>
            </template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column align="center" :label="$t('ClubUser.Table.Actions')" fixed="right" min-width="220">
            <template #default="scope">
              <!-- 查看 -->
              <el-button type="primary" link class="table-button" @click="getDetails(scope.row)"
                ><el-icon style="margin-right: 5px"><InfoFilled /></el-icon>{{ $t('ClubUser.Actions.View') }}</el-button
              >
              <!-- 编辑 -->
              <el-button type="primary" link icon="edit" class="table-button" @click="updateClubUserFunc(scope.row)">{{
                $t('ClubUser.Actions.Edit')
              }}</el-button>
              <!-- 删除 -->
              <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">{{
                $t('ClubUser.Actions.Delete')
              }}</el-button>
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
          <!-- 新增/编辑 -->
          <span class="text-lg">{{
            type === 'create' ? $t('ClubUser.Drawer.TitleCreate') : $t('ClubUser.Drawer.TitleEdit')
          }}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">{{ $t('Common.Confirm') }}</el-button>
            <el-button @click="closeDialog">{{ $t('Common.Cancel') }}</el-button>
          </div>
        </div>
      </template>
      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rules" label-width="80px">
        <!-- <el-form-item label="ID字段:" prop="id">
          <el-input
            @input="handleInput(formData, 'id')"
            v-model.number="formData.id"
            :clearable="true"
            placeholder="请输入ID"
          />
        </el-form-item> -->
        <!-- 玩家ID -->
        <el-form-item :label="$t('ClubUser.Drawer.UserIdLabel')" prop="UserId">
          <el-input
            @input="handleInput(formData, 'UserId')"
            v-model.number="formData.UserId"
            :clearable="true"
            :placeholder="$t('ClubUser.Drawer.UserIdPlaceholder')"
          />
        </el-form-item>
        <!-- 俱乐部ID -->
        <el-form-item :label="$t('ClubUser.Drawer.ClubIdLabel')" prop="ClubId">
          <el-input
            @input="handleInput(formData, 'ClubId')"
            v-model.number="formData.ClubId"
            :clearable="true"
            :placeholder="$t('ClubUser.Drawer.ClubIdPlaceholder')"
          />
        </el-form-item>
        <!-- 加入俱乐部的时间 -->
        <el-form-item :label="$t('ClubUser.Drawer.JoinTimeLabel')" prop="JoinTime">
          <el-date-picker
            v-model="formData.JoinTime"
            type="date"
            style="width: 100%"
            :placeholder="$t('ClubUser.Drawer.JoinTimePlaceholder')"
            :clearable="true"
          />
        </el-form-item>
        <!-- 身份 -->
        <el-form-item :label="$t('ClubUser.Drawer.IdentityLabel')" prop="Identify">
          <el-select
            v-model.number="formData.Identify"
            :placeholder="$t('ClubUser.Drawer.SelectPlaceholder')"
            style="width: 240px"
          >
            <el-option v-for="item in identity" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- 成员管理权限 -->
        <el-form-item :label="$t('ClubUser.Drawer.MemberPowerLabel')" prop="MemberPower">
          <el-select
            v-model.number="formData.MemberPower"
            :placeholder="$t('ClubUser.Drawer.SelectPlaceholder')"
            style="width: 240px"
          >
            <el-option v-for="item in Isthere" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- 俱乐部币管理权限 -->
        <el-form-item :label="$t('ClubUser.Drawer.ClubGoldPowerLabel')" prop="ClubGoldPower">
          <el-select
            v-model.number="formData.ClubGoldPower"
            :placeholder="$t('ClubUser.Drawer.SelectPlaceholder')"
            style="width: 240px"
          >
            <el-option v-for="item in Isthere" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- 桌子管理权限 -->
        <el-form-item :label="$t('ClubUser.Drawer.TablePowerLabel')" prop="TablePower">
          <el-select
            v-model.number="formData.TablePower"
            :placeholder="$t('ClubUser.Drawer.SelectPlaceholder')"
            style="width: 240px"
          >
            <el-option v-for="item in Isthere" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 查看 -->
    <el-drawer
      destroy-on-close
      :size="appStore.drawerSize"
      v-model="detailShow"
      :show-close="true"
      :before-close="closeDetailShow"
      :title="$t('ClubUser.Detail.Title')"
    >
      <el-descriptions :column="1" border>
        <!-- ID -->
        <el-descriptions-item :label="$t('ClubUser.Detail.Id')">
          {{ detailForm.id }}
        </el-descriptions-item>
        <!-- 玩家ID -->
        <el-descriptions-item :label="$t('ClubUser.Detail.UserId')">
          {{ detailForm.UserId }}
        </el-descriptions-item>
        <!-- 俱乐部ID -->
        <el-descriptions-item :label="$t('ClubUser.Detail.ClubId')">
          {{ detailForm.ClubId }}
        </el-descriptions-item>
        <!-- 加入俱乐部的时间 -->
        <el-descriptions-item :label="$t('ClubUser.Detail.JoinTime')">
          {{ detailForm.JoinTime }}
        </el-descriptions-item>
        <!-- 身份 -->
        <el-descriptions-item :label="$t('ClubUser.Detail.Identity')">
          <span v-if="detailForm.Identify == 1">{{ $t('ClubUser.Identity.President') }}</span>
          <span v-if="detailForm.Identify == 10">{{ $t('ClubUser.Identity.Admin') }}</span>
          <span v-if="detailForm.Identify == 20">{{ $t('ClubUser.Identity.Member') }}</span>
        </el-descriptions-item>
        <!-- 成员管理权限 -->
        <el-descriptions-item :label="$t('ClubUser.Detail.MemberPower')">
          <span v-if="detailForm.MemberPower == 0">{{ $t('ClubUser.Power.NoPermission') }}</span>
          <span v-if="detailForm.MemberPower == 1">{{ $t('ClubUser.Power.HasPermission') }}</span>
        </el-descriptions-item>
        <!-- 俱乐部币管理权限 -->
        <el-descriptions-item :label="$t('ClubUser.Detail.ClubGoldPower')">
          <span v-if="detailForm.ClubGoldPower == 0">{{ $t('ClubUser.Power.NoPermission') }}</span>
          <span v-if="detailForm.ClubGoldPower == 1">{{ $t('ClubUser.Power.HasPermission') }}</span>
        </el-descriptions-item>
        <!-- 桌子管理权限 -->
        <el-descriptions-item :label="$t('ClubUser.Detail.TablePower')">
          <span v-if="detailForm.TablePower == 0">{{ $t('ClubUser.Power.NoPermission') }}</span>
          <span v-if="detailForm.TablePower == 1">{{ $t('ClubUser.Power.HasPermission') }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
  import {
    createClubUser,
    deleteClubUser,
    deleteClubUserByIds,
    updateClubUser,
    findClubUser,
    getClubUserList
  } from '@/api/dezhou/clubUser'

  // 全量引入格式化工具 请按需保留
  import { formatDate } from '@/utils/format'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ref, reactive, nextTick } from 'vue'
  import { useAppStore } from '@/pinia'
  import { useI18n } from 'vue-i18n'
  import TableSkeletonWrapper from '@/components/tableSkeleton/index.vue'

  defineOptions({
    name: 'ClubUser'
  })

  const { t } = useI18n()

  const identity = [
    { value: 1, label: t('ClubUser.Identity.President') }, // 主席
    { value: 10, label: t('ClubUser.Identity.Admin') }, // 管理员
    { value: 20, label: t('ClubUser.Identity.Member') } // 普通成员
  ]

  const Isthere = [
    { value: 0, label: t('ClubUser.Power.NoPermission') }, // 无
    { value: 1, label: t('ClubUser.Power.HasPermission') } // 有
  ]

  // 提交按钮loading
  const btnLoading = ref(false)
  const appStore = useAppStore()

  // 自动化生成的字典（可能为空）以及字段
  const formData = ref({
    id: undefined,
    UserId: undefined,
    ClubId: undefined,
    JoinTime: new Date(),
    Identify: undefined,
    MemberPower: undefined,
    ClubGoldPower: undefined,
    TablePower: undefined
  })

  // 验证规则
  const rules = reactive({
    id: [{ required: true, message: t('ClubUser.Validation.Id'), trigger: 'blur' }], // 请输入ID
    UserId: [{ required: true, message: t('ClubUser.Validation.UserId'), trigger: 'blur' }], // 请输入玩家ID
    ClubId: [{ required: true, message: t('ClubUser.Validation.ClubId'), trigger: 'blur' }], // 请输入俱乐部ID
    JoinTime: [{ required: true, message: t('ClubUser.Validation.JoinTime'), trigger: 'blur' }], // 请选择加入时间
    Identify: [{ required: true, message: t('ClubUser.Validation.Identify'), trigger: 'blur' }], // 请选择身份
    MemberPower: [{ required: true, message: t('ClubUser.Validation.MemberPower'), trigger: 'blur' }], // 请选择成员管理权限
    ClubGoldPower: [{ required: true, message: t('ClubUser.Validation.ClubGoldPower'), trigger: 'blur' }], // 请选择俱乐部币管理权限
    TablePower: [{ required: true, message: t('ClubUser.Validation.TablePower'), trigger: 'blur' }] // 请选择桌子管理权限
  })

  const elFormRef = ref()
  const elSearchFormRef = ref()

  // =========== 表格控制部分 ===========
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  const searchInfo = ref({})
  const loading = ref(false)

  const handleInput = (row, prop) => {
    nextTick(() => {
      let value = row[prop].replace(/[^-0-9]/g, '')
      row[prop] = value
    })
  }
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
    loading.value = true
    try {
      const table = await getClubUserList({
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
    ElMessageBox.confirm(
      t('ClubUser.Messages.ConfirmDelete'), // 确定要删除吗?
      t('Common.Hint'), // 提示
      {
        confirmButtonText: t('Common.Confirm'), // 确定
        cancelButtonText: t('Common.Cancel'), // 取消
        type: 'warning'
      }
    ).then(() => {
      deleteClubUserFunc(row)
    })
  }

  // 多选删除
  const onDelete = async () => {
    ElMessageBox.confirm(
      t('ClubUser.Messages.ConfirmDelete'), // 确定要删除吗?
      t('Common.Hint'), // 提示
      {
        confirmButtonText: t('Common.Confirm'), // 确定
        cancelButtonText: t('Common.Cancel'), // 取消
        type: 'warning'
      }
    ).then(async () => {
      const ids = []
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'warning',
          message: t('ClubUser.Messages.SelectDeleteWarning') // 请选择要删除的数据
        })
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map((item) => {
          ids.push(item.id)
        })
      const res = await deleteClubUserByIds({ ids })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('ClubUser.Messages.DeleteSuccess') // 删除成功
        })
        if (tableData.value.length === ids.length && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
  }

  // 行为控制标记（弹窗内部需要增还是改）
  const type = ref('')

  // 更新行
  const updateClubUserFunc = async (row) => {
    const res = await findClubUser({ id: row.id })
    type.value = 'update'
    if (res.code === 0) {
      formData.value = res.data
      dialogFormVisible.value = true
    }
  }

  // 删除行
  const deleteClubUserFunc = async (row) => {
    const res = await deleteClubUser({ id: row.id })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: t('ClubUser.Messages.DeleteSuccess') // 删除成功
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
      id: undefined,
      UserId: undefined,
      ClubId: undefined,
      JoinTime: new Date(),
      Identify: undefined,
      MemberPower: undefined,
      ClubGoldPower: undefined,
      TablePower: undefined
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
          res = await createClubUser(formData.value)
          break
        case 'update':
          res = await updateClubUser(formData.value)
          break
        default:
          res = await createClubUser(formData.value)
          break
      }
      btnLoading.value = false
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: t('ClubUser.Messages.CreateOrUpdateSuccess') // 创建/更改成功
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
    const res = await findClubUser({ id: row.id })
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
  import { useRouter } from 'vue-router'

  const router = useRouter()
  // 跳转到用户管理
  const goAccountsInFo = (row) => {
    console.log(row)

    const { href } = router.resolve({
      path: '/layout/index/accountsInFo',
      query: { UserId: row } // 查询参数
    })
    window.open(href, '_blank')
  }
</script>

<style></style>
